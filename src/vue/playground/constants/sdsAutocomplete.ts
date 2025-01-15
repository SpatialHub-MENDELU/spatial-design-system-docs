export const sdsComponentsAndPrimitives = [
  "a-ar-button", "a-ar-checkbox", "a-ar-menu", "a-ar-row", "a-ar-switch", "a-ar-textbox",
  "auto-position", "auto-scale", "billboard", "circle", "fit-into-fov", "flexbox", "follow-camera",
  "grid"
].map(name => ({ type: "component", value: name }));

export const sdsProperties = [
  "hAlign", "vAlign", "factor", "spacing", "margin", "useFrontFace", "direction", "gap", "mainAlign",
  "secondaryAlign", "wrap", "angle", "distance", "columns", "rows"
].map(name => ({ type: "property", value: name }));

export const sdsEvents = [
  "fit"
].map(name => ({ type: "event", value: name }));
