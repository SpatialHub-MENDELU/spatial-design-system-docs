// Game components self-register on the global AFRAME instance, so a
// side-effect import is enough. A-Frame, ammo.js and the physics system are
// loaded as UMD globals from index.html (see the <script> tags there).
import "spatial-design-system/components/game/walk.js";
import "spatial-design-system/components/game/fly.js";
import "spatial-design-system/components/game/npcWalk.js";
import "spatial-design-system/components/game/gameview.js";

const app = document.getElementById("app");

// INSTRUCTIONS:
// Click into the preview and use WASD to move your character (the red cube).
app.innerHTML = `
  <a-scene physics="driver: ammo; debug: true;">
    <!-- Ground -->
    <a-box
      width="20" height="0.2" depth="20" position="0 0 0"
      ammo-body="type: static;" ammo-shape="type: box;"
      color="green"
    ></a-box>

    <!-- Player -->
    <a-entity
      walk
      id="player"
      position="0 3.8 0"
      ammo-body="type: dynamic; angularFactor: 0 0 0; activationState: disableDeactivation;"
      ammo-shape="type: box; fit: manual; halfExtents: 0.5 0.5 0.5;"
    >
      <a-box color="tomato"></a-box>
    </a-entity>

    <!-- Camera following the player from behind -->
    <a-entity camera game-view="target: #player; type: thirdPersonFollow;"></a-entity>
  </a-scene>
`;
