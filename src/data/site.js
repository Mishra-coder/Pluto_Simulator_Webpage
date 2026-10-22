/* Page content in one place. Facts follow PLUTOSIM_DESIGN_SYSTEM.md (lessons §5.3, missions §5.4, drones §2). */

export const VERSION = "0.8.0";

/* releasing a new version: update VERSION, the sizes and replace the files in downloads/ */
export const DOWNLOADS = {
  mac: { os: "macOS", label: "Download for Mac", href: `/downloads/PlutoSim-${VERSION}-macOS.dmg`, size: "293 MB", detail: "Universal · Apple Silicon & Intel", icon: "i-apple" },
  win: { os: "Windows", label: "Download for Windows", href: `/downloads/PlutoSim-${VERSION}-Windows-Setup.exe`, size: "181 MB", detail: "Windows 10 / 11 · 64 bit", icon: "i-win" },
};

export const NAV_LINKS = [
  ["why", "Why sim"],
  ["basics", "Basics"],
  ["school", "Flight School"],
  ["missions", "Missions"],
  ["faq", "FAQ"],
];

const IMG = "/assets/images/missions/";

export const LESSON_BLOCKS = [
  { key: "ground", name: "Ground Handling", range: "Lessons 1 to 4", icon: "i-drone" },
  { key: "attitude", name: "Attitude", range: "Lessons 5 to 8", icon: "i-target" },
  { key: "circuits", name: "Circuits", range: "Lessons 9 to 12", icon: "i-trend" },
  { key: "nav", name: "Navigation", range: "Lessons 13 to 15", icon: "i-layers" },
];

export const LESSONS = [
  ["ground", "Arm & Take Off", "Wake the motors and lift off smoothly"],
  ["ground", "Land & Disarm", "Touch down gently then cut the motors"],
  ["ground", "Throttle Up & Down", "Climb and descend under control"],
  ["ground", "Yaw Control", "Turn on the spot without drifting"],
  ["attitude", "Pitch Control", "Fly forward and back"],
  ["attitude", "Roll Control", "Slide left and right"],
  ["attitude", "Straight Flight", "Hold a line height and heading"],
  ["attitude", "Diagonal Run", "Mix pitch and roll together"],
  ["circuits", "Square Circuit", "Four sides four clean corners"],
  ["circuits", "Square Circuit using Yaw", "Turn the nose at every corner"],
  ["circuits", "Triangle Circuit", "Sharper angles same control"],
  ["circuits", "Full Circle", "A smooth continuous turn"],
  ["nav", "Your First Route", "Follow a path from point to point"],
  ["nav", "Three Gates in Order", "Plan the line then fly it"],
  ["nav", "The Whole Flight", "Take off navigate and land"],
].map(([block, title, goal], i) => ({ n: i + 1, block, title, goal }));

export const MAPS = [
  { key: "all", name: "All missions", icon: "i-grid" },
  { key: "city", name: "New York City", icon: "i-city" },
  { key: "forest", name: "Forest", icon: "i-tree" },
  { key: "construction", name: "Construction", icon: "i-crane" },
  { key: "supermarket", name: "Supermarket", icon: "i-cart" },
];

/* missions without their own artwork reuse their map's image; `look` restyles the reuse so cards don't repeat exactly */
export const MISSIONS = [
  { map: "city", title: "Precision Delivery", where: "New York City", time: "8:00", img: "precision-delivery-1.webp", alt: "Delivery zone on a New York street" },
  { map: "forest", title: "Forest Fire Emergency", where: "Forest", time: "7:00", img: "forest-fire-2.webp", alt: "Drone carrying a water tank towards a fire in the forest" },
  { map: "city", title: "Multi Point Delivery", where: "New York City", time: "11:00", img: "multi-point-delivery-hero.webp", alt: "Drone carrying a first aid kit above a city street" },
  { map: "city", title: "Logistics Drones", where: "New York City", time: "8:00", img: "search-rescue-hero.webp", alt: "Drone carrying a food box between buildings by the sea" },
  { map: "forest", title: "Animal Rescue", where: "Forest · dusk", time: "3:00", img: "forest-fire-hero.webp", alt: "Drone flying between forest trees" },
  { map: "forest", title: "Search and Rescue", where: "Forest · dusk", time: "3:00", img: "forest-fire-hero.webp", alt: "Forest at dusk", look: "alt-crop" },
  { map: "construction", title: "Construction Material Delivery", where: "Construction Site", time: "5:00", img: "construction-material-delivery-1.jpg", alt: "Drone dispatch point at a construction material store" },
  { map: "construction", title: "Night Shift Inspection", where: "Construction Site · night", time: "7:00", img: "night-shift-inspection-1.jpg", alt: "Drone inspecting a wall at night" },
  { map: "supermarket", title: "Truck Loading", where: "Supermarket", time: "12:00", img: "supermarket-delivery-1.jpg", alt: "Glowing drop zone between store shelves" },
  { map: "supermarket", title: "Truck Unloading", where: "Supermarket", time: "12:00", img: "supermarket-delivery-1.jpg", alt: "Store pallets and boxes", look: "flip" },
].map((m, i) => ({ ...m, n: i + 1, img: IMG + m.img }));

export const HERO_CARDS = [
  { map: "city", label: "City", title: "Multi point delivery", img: IMG + "multi-point-delivery-hero.webp" },
  { map: "forest", label: "Forest", title: "Forest fire emergency", img: IMG + "forest-fire-hero.webp" },
  { map: "construction", label: "Construction", title: "Material delivery", img: IMG + "construction-material-delivery-1.jpg" },
  { map: "supermarket", label: "Supermarket", title: "Truck loading", img: IMG + "supermarket-delivery-1.jpg" },
];

export const DRONES = [
  { id: "pluto", name: "Pluto", img: "/assets/images/drones/pluto.webp", size: [1400, 726], alt: "Pluto drone with prop guards and camera", text: "160 mm trainer Stable and forgiving", specs: [["Mass", "54 g"], ["Battery", "1S 300 mAh"], ["Max tilt", "22°"]] },
  { id: "guru", name: "Pluto Guru", tag: "For experienced pilots", img: "/assets/images/drones/pluto-guru.webp", size: [1022, 461], alt: "Pluto Guru drone", text: "230 mm trainer with more power", specs: [["Mass", "130 g"], ["Battery", "4S 2200 mAh"], ["Max tilt", "32°"]] },
];

export const FAQ = [
  ["Do I need a real drone to use PlutoSim?", "No Everything runs on your computer"],
  ["Do I need a game controller?", "No the keyboard works A gamepad or RC transmitter is detected automatically"],
  ["Which drones can I fly?", "Pluto Pluto Guru and a 5″ Racing Drone"],
  ["Where do I get an activation key?", "From Drona Aviation with your purchase"],
  ["Does it work offline?", "Yes after signing in online once"],
];
