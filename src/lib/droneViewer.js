import { prefersReducedMotion } from "../hooks.js";

/* Hero: the real Pluto CAD model, props spinning, drag to rotate a full 360° */
const MODEL_URL = "/assets/models/pluto.glb";
const HOME_YAW = -0.6;
const HOME_PITCH = 0.22;

function addLights(THREE, scene) {
  const key = new THREE.DirectionalLight(0xffe2c4, 2.4); key.position.set(2, 3, 2); scene.add(key);
  const rim = new THREE.DirectionalLight(0xff7a1a, 3); rim.position.set(-2, 1, -2.5); scene.add(rim);
  scene.add(new THREE.HemisphereLight(0xffd0b0, 0x120a14, 0.8));
  const top = new THREE.DirectionalLight(0xffffff, 1.2); top.position.set(-0.5, 4, 0.5); scene.add(top);
}

/* dark fully-metallic CAD parts render as black mirrors; make them read as plastic */
function fixDarkMetals(model) {
  model.traverse((o) => {
    const m = o.isMesh && o.material;
    if (m && m.metalness >= 0.9 && !m.map && 0.2126 * m.color.r + 0.7152 * m.color.g + 0.0722 * m.color.b < 0.35) m.metalness = 0.15;
  });
}

/* re-parent each outermost PROP_ node to a pivot at its own centre so it spins in place */
function buildPropPivots(THREE, model, holder) {
  const props = [];
  model.traverse((o) => {
    if (!o.name.startsWith("PROP_")) return;
    for (let p = o.parent; p; p = p.parent) if (p.name.startsWith("PROP_")) return;
    props.push(o);
  });
  return props.map((o, i) => {
    const c = new THREE.Box3().setFromObject(o).getCenter(new THREE.Vector3());
    const pivot = new THREE.Group();
    holder.add(pivot);
    pivot.position.copy(holder.worldToLocal(c.clone()));
    pivot.updateMatrixWorld(true);
    pivot.attach(o);
    pivot.userData.dir = i % 2 ? 1 : -1;
    return pivot;
  });
}

/* Mounts the model into canvas; resolves to a dispose() that stops rendering and frees the GL context */
export async function mountDrone(stage, canvas) {
  const THREE = await import("three");
  const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader.js");
  const { MeshoptDecoder } = await import("three/examples/jsm/libs/meshopt_decoder.module.js");
  const { RoomEnvironment } = await import("three/examples/jsm/environments/RoomEnvironment.js");

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture;
  const camera = new THREE.PerspectiveCamera(28, 1, 0.01, 50);
  camera.position.set(0, 0.55, 2.2);
  camera.lookAt(0, 0, 0);
  addLights(THREE, scene);

  const gltf = await new GLTFLoader().setMeshoptDecoder(MeshoptDecoder).loadAsync(MODEL_URL);
  const model = gltf.scene;
  fixDarkMetals(model);

  /* centre it and scale to unit width; tilt (outer) pitches, rig (inner) spins */
  const box = new THREE.Box3().setFromObject(model);
  const size = box.getSize(new THREE.Vector3());
  model.position.sub(box.getCenter(new THREE.Vector3()));
  const holder = new THREE.Group(); holder.add(model);
  holder.scale.setScalar(1 / Math.max(size.x, size.z));
  const rig = new THREE.Group(); rig.add(holder);
  const tilt = new THREE.Group(); tilt.add(rig); scene.add(tilt);
  scene.updateMatrixWorld(true);
  const pivots = buildPropPivots(THREE, model, holder);

  function resize() {
    const w = stage.clientWidth, h = stage.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.position.z = w < 700 ? 2.6 : 2.1;
    camera.updateProjectionMatrix();
  }
  const ro = new ResizeObserver(resize);
  ro.observe(stage);
  resize();

  /* drag sideways to spin, up/down to pitch; it drifts back to a slow turntable */
  const reduce = prefersReducedMotion();
  let yaw = HOME_YAW, pitch = HOME_PITCH, vYaw = 0, vPitch = 0, dragging = false, lastX = 0, lastY = 0;
  let hover = false, spin = 0, rpm = 9, px = 0, py = 0;

  const listeners = [
    [canvas, "pointerdown", (e) => { dragging = true; lastX = e.clientX; lastY = e.clientY; vYaw = vPitch = 0; canvas.setPointerCapture(e.pointerId); }],
    [canvas, "pointermove", (e) => {
      if (!dragging) return;
      vYaw = (e.clientX - lastX) * 0.01; vPitch = (e.clientY - lastY) * 0.01;
      yaw += vYaw; pitch += vPitch; lastX = e.clientX; lastY = e.clientY;
    }],
    [canvas, "pointerup", () => { dragging = false; }],
    [canvas, "pointercancel", () => { dragging = false; }],
    [canvas, "pointerenter", () => { hover = true; }],
    [canvas, "pointerleave", () => { hover = false; }],
    [window, "pointermove", (e) => { px = e.clientX / innerWidth - 0.5; py = e.clientY / innerHeight - 0.5; }],
  ];
  listeners.forEach(([el, type, fn]) => el.addEventListener(type, fn));

  const clock = new THREE.Clock();
  let raf = 0;
  function frame() {
    const dt = Math.min(clock.getDelta(), 0.05), t = clock.elapsedTime;
    if (!dragging) {
      yaw += vYaw; pitch += vPitch; vYaw *= 0.95; vPitch *= 0.95;
      pitch += (HOME_PITCH - pitch) * Math.min(1, dt * 0.8);
      if (!reduce) yaw += dt * 0.25;
    }
    tilt.rotation.x = pitch + py * 0.12;
    tilt.rotation.z = -0.12 - px * 0.1;
    rig.rotation.y = yaw;
    tilt.position.y = reduce ? 0 : Math.sin(t * 1.4) * 0.025;
    rpm += ((hover || dragging ? 60 : 30) - rpm) * Math.min(1, dt * 2.5);
    spin += rpm * dt;
    pivots.forEach((p) => { p.rotation.y = spin * p.userData.dir; });
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }
  frame();

  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    listeners.forEach(([el, type, fn]) => el.removeEventListener(type, fn));
    renderer.dispose();
    renderer.forceContextLoss();
  };
}
