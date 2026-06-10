// Routes `import ... from "aframe"` to the global AFRAME loaded by the CDN
// <script> tag in config.mts head. Prevents bundling a second copy of aframe
// (which would re-register the `<a-node>` custom element and break the scene).
const A = typeof window !== "undefined" && window.AFRAME ? window.AFRAME : {};

export const registerComponent = (...args) => window.AFRAME.registerComponent(...args);
export const registerPrimitive = (...args) => window.AFRAME.registerPrimitive(...args);
export const components = A.components;
export const AEntity = A.AEntity;
export const THREE = A.THREE;
export default A;
