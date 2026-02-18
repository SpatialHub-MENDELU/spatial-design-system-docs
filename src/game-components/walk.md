---
title: walk
---

<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import ComponentExample from "../vue/ComponentExample.vue";

  const renderScene = ref(false);

  onMounted(async () => {
    try {
      // Here import Spatial Design System components that you need
      await import("spatial-design-system/components/position.js");
      renderScene.value = true;
    } catch (e) {
      console.error(e);
    }
  });
</script>

# {{ $frontmatter.title }}
The `walk` component defines the movement and animation behavior of a character in a game. It allows customization of walking, sprinting, and turning styles, including key bindings and speed settings. The component also supports auto-walk and point-and-click movement options.

::: warning ⚠️ PHYSICS ENGINE
The _walk_ component relies on the Ammo.js physics engine. Ensure that Ammo.js is installed in your project for proper functionality.
:::

## How it works 
1. **Animations:** Set the `walkClipName` and `idleClipName` properties. If you want to use sprinting, define `sprintClipName`.
2. **Movement Mode:** Choose your `turnType`. The default is [smoothTurn](#smoothturn), you can switch to [stepTurnCardinal](#stepturncardinal) or [stepTurnDiagonal](#stepturndiagonal).
3. **Controls:** Customize key bindings using `keyUp`, `keyDown`, `keyLeft`, and `keyRight`.
4. **Speed:** Adjust `speed` for base movement and `rotationSpeed` for turning sensitivity.
5. **Advanced Modes:** 
   - Enable **Sprinting** by setting [sprint](#sprint) to `true`. Adjust `sprintSpeed` and `keySprint` as needed.
   - Enable **Point-and-Click** by setting [targetWalk](#targetwalk) to `true`.
   - Enable **Auto-Walk** (continuous movement) by setting [autoWalk](#autowalk) to `true`.
6. **Orientation:** If your model faces the wrong way, fix it using [forwardOffsetAngle](#forwardoffsetangle).

## Setting up the scene
To create a functional character controller, we recommend using a parent-child structure. This separates the physics calculations from the visual representation, allowing for better control over the character's pivot point and grounding.

**Parent Entity (The Logic)**: The main container holds the walk component and the physics body (ammo-body). It represents the character's physical presence in the world.
- We set `angularFactor`: 0 0 0 to prevent the character from tipping over or rolling like a ball.
- We use `activationState: disableDeactivation` to ensure the physics engine never puts the character to "sleep" when standing still.
- **Camera usage**: Assign a unique id (e.g., `id="fox-character"`). This ID is required for the camera to identify and follow the player. For more details on setting up the follow behavior of the camera, please refer to the [game-view](game-view.md) documentation.

**Child Entity (The Visual)**: This entity contains the 3D model (gltf-model) and the physics shape (ammo-shape).
- You often need to adjust the child's position (e.g., `y: -1.3`) to ensure the model's feet touch the ground, as the parent physics body is usually centered at its middle point.


```js
import "spatial-design-system/components/game/walk.js";
```

```html
<a-scene>
   <a-entity 
        walk="
          walkClipName: Walk; 
          idleClipName: Idle; 
        " 
        id="fox-character" 
        ammo-body="type: dynamic; angularFactor: 0 0 0; mass: 20; activationState: disableDeactivation" 
        position="0 1.8 0">
            <a-entity gltf-model="#fox" ammo-shape="type: hull;" position="0 -1.3 0.2" scale="1 1 1" ></a-entity>
    </a-entity>
</a-scene>
```

## Props

| Property      | Type                                            | Default    | Description                                                                                                                                                                                                                                                                                                                                   |
|---------------|-------------------------------------------------|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|_walkClipName_| string                                          | Walk       | Name of the animation clip used when the character is walking.                                                                                                                                                                                                                                                                                |
|_idleClipName_| string                                          | Idle       | Name of the animation clip used when the character is idle.                                                                                                                                                                                                                                                                                   |
|_sprintClipName_| string                                          | Gallop     | Name of the animation clip used when the character is sprinting.                                                                                                                                                                                                                                                                              |
|_turnType_| enum(smoothTurn, stepTurnCardinal, stepTurnDiagonal) | smoothTurn | Defines the walking mode and how the player turns and moves.                                                                                                                                                                                                                                                                                  |
|_autoWalk_| boolean                                         | false      | If true, the player will automatically start walking forward without input.                                                                                                                                                                                                                                                                   |
|_targetWalk_| boolean                                         | false      | If true, enables point-and-click movement: the character walks toward the location where the player clicks.                                                                                                                                                                                                                                   |
|_speed_| float                                           | 5.0        | Defines the player's base walking speed.                                                                                                                                                                                                                                                                                                      |
|_rotationSpeed_| float                                           | 90.0       | Defines the turning speed for smoothTurn mode.                                                                                                                                                                                                                                                                                                |
|_sprint_| boolean                                         | false      | If true, the player can sprint when holding the keySprint, increasing their speed to sprintSpeed.                                                                                                                                                                                                                                             |
|_keySprint_| string                                          | shift      | Key used to sprint with the character.                                                                                                                                                                                                                                                                                                        |
|_sprintSpeed_| float                                           | 8.0        | Defines the sprinting speed when the sprint mode is active.                                                                                                                                                                                                                                                                                   |
|_keyUp_| string                                          | w          | Key used to move the character forward.                                                                                                                                                                                                                                                                                                       |
|_keyDown_| string                                          | s          | Key used to move the character backward.                                                                                                                                                                                                                                                                                                      |
|_keyLeft_| string                                          | a          | Key used to move the character left.                                                                                                                                                                                                                                                                                                          |
|_keyRight_| string                                          | d          | Key used to move the character right.                                                                                                                                                                                                                                                                                                         |
| _startMovingDirection_|enum (up, down, left, right)| down       |        Defines the initial logical direction for step turns. Important for alignment in grid-based movement.                                                                                                                                                                                                                                                                                                                                   |
|_forwardOffsetAngle_| number                                          | 0          | The angular offset (in degrees) that defines how much the model’s logical forward direction differs from its visual or model-space forward axis. In other words, it specifies how far the character’s or object’s “forward” (as understood by the user or game logic) is rotated relative to the model’s default orientation in the 3D scene. |

## smoothTurn
This is the standard movement style for most 3D adventure games. The character rotates smoothly while moving. You can adjust the responsiveness using `rotationSpeed`.

```html
<a-entity
  walk="
    turnType: smoothTurn;
    speed: 5;
    rotationSpeed: 90;
    walkClipName: Run;
    idleClipName: Idle;
  ">
</a-entity>
```

## stepTurnCardinal
The character snaps/rotates to 90° angles (Up, Down, Left, Right) before moving. It prevents diagonal movement and enables 4-directional movement.

Use the `startMovingDirection` property to define the character's initial orientation (`up`, `right`, `left`, `down`). This ensures the movement logic aligns with the model's visual rotation from the very first keypress.
```html
<a-entity
  walk="
    turnType: stepTurnCardinal;
    speed: 5;
    rotationSpeed: 600;
    walkClipName: Run;
    idleClipName: Idle;
  ">
</a-entity>
```

## stepTurnDiagonal
Works the same way as `stepTurnCardinal`, but also allows movement in diagonal directions (↗, ↘, ↙, ↖) by turning 45° before moving. It enables 8-directional movement

Use the `startMovingDirection` property to define the character's initial orientation (`up`, `right`, `left`, `down`). This ensures the movement logic aligns with the model's visual rotation from the very first keypress.
```html
<a-entity
  walk="
    turnType: stepTurnDiagonal;
    speed: 5;
    rotationSpeed: 600;
    walkClipName: Run;
    idleClipName: Idle;
  ">
</a-entity>
```

## sprint
Sprinting allows the player to move faster while holding a specific key. You can change the key using `keySprint` property. The default value is `shift`. You must enable it explicitly and provide a sprint animation.
```html
<a-entity
  walk="
    sprint: true;
    sprintSpeed: 10;
    sprintClipName: Sprint;
    walkClipName: Run;
    idleClipName: Idle;
  ">
</a-entity>
```

## autoWalk
If the `autoWalk` property is set to true, the player will automatically start walking forward without input. It works with all [turn types](#turntype). 
```html
<a-entity
  walk="
    autoWalk: true;
    speed: 6;
    rotationSpeed: 90;
    walkClipName: Walk;
    idleClipName: Idle;
  ">
</a-entity>
```

## targetWalk 
If the `targetWalk` property is set to true, it enables point-and-click movement: the character walks toward the location where the player clicks. You can adjust the turning speed by `rotationSpeed` property. 
```html
<a-entity
  walk="
    targetWalk: true;
    speed: 6;
    rotationSpeed: 450;
    walkClipName: Walk;
    idleClipName: Idle;
  ">
</a-entity>
```

## forwardOffsetAngle
In some 3D models, the visual forward direction (the way the model appears to face) may not align with its logical forward axis (the direction considered "forward" in the game world).
This misalignment can lead to confusion when controlling the character, as the movement direction may not match the player's expectations based on the model's appearance.
To fix this, you can use the `forwardOffsetAngle` property.

The `forwardOffsetAngle` property allows you to specify an angular offset (in degrees) that defines how much the model’s logical forward direction differs from its visual forward axis.
By setting this property, you can ensure that when the player moves the character forward, it moves in the direction that visually makes sense based on the model's orientation.

For example, imagine you have a fox model placed in the game world.
When you press the forward movement key, you expect the fox to walk in the direction it’s visually facing.
However, it moves backward, behind the tail instead.
To fix this, set the `forwardOffsetAngle` to 180 degrees to align the logical forward movement with the fox’s visual direction.
```html
<a-entity
  walk="
    forwardOffsetAngle: 90;
  ">
</a-entity>
```