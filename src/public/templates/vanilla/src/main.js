import "spatial-design-system/components/position.js";
  const app = document.getElementById("app");
  const scene = document.createElement("a-scene");

  const autoPosition = `
    <a-plane width="5" height="5" position="0 1.5 -5" color="#018A6C" >
      <a-box color="#03FCC6" auto-position> </a-box>
    </a-plane>
  `;

scene.innerHTML = autoPosition;
app.appendChild(scene);
