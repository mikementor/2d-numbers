import { elementToSVG } from "dom-to-svg";

export const to_svg = () => {
  const svgDocument = elementToSVG(document.querySelector("#default-grid-view"));
  const svgString = new XMLSerializer().serializeToString(svgDocument);
  return svgString;
};
window.to_svg = to_svg;