import spriteSvg from "../assets/sprite.svg?raw";

/* Renders the SVG sprite once; it stays in the layout (not display:none) so its gradients keep working */
export function Sprite() {
  return <div style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }} aria-hidden="true" dangerouslySetInnerHTML={{ __html: spriteSvg }} />;
}

/* <Icon id="i-dl" /> draws a symbol from the sprite; pass viewBox for the larger drawings */
export function Icon({ id, className, viewBox, label }) {
  return (
    <svg className={className} viewBox={viewBox} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      <use href={`#${id}`} />
    </svg>
  );
}
