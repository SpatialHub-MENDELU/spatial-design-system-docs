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
The _walk_ component rely on the Ammo.js physics engine. Ensure that Ammo.js is installed in your project for proper functionality.
:::

## How it works 
1. Set the `walkClipName` and `idleClipName` properties (or `sprintClipName` if you enabled sprinting). Without the correct animation names, the character will not move.
2. To enable sprinting (disabled by default), set `sprint` to true.
3. Set your `turnType` (default: `smoothTurn`). Learn more about turn types [here](#turntype).
4. To make the character move automatically without user input, set `autoWalk` to true. Learn more about autoWalk [here](#autowalk).
5. To control the character with your mouse, set `targetWalk` to true. Learn more about targetWalk [here](#targetwalk).
6. Customize movement by adjusting the `speed`, `sprintSpeed`, `keyUp`, `keyDown`, `keyLeft`, `keyRight`, and `sprintKey` properties.

## Example
<ComponentExample :fixed="false">
<template #code>

```js
import "spatial-design-system/components/game/walk.js";
```

```html
<a-scene>
   <a-entity 
        walk="walkClipName: Walk; idleClipName: Idle; sprint: true; turnType: stepTurnDiagonal;" 
        id="fox-character" 
        ammo-body="type: dynamic; angularFactor: 0 0 0; mass: 20; activationState: disableDeactivation" 
        position="0 1.8 0">
            <a-entity gltf-model="#fox" ammo-shape="type: hull;" position="0 -1.3 0.2" scale="1 1 1" ></a-entity>
    </a-entity>
</a-scene>
```
</template>

</ComponentExample>


## Props

| Property      | Type                                                 | Default    | Description                                                                                                 |
|---------------|------------------------------------------------------|------------|-------------------------------------------------------------------------------------------------------------|
|_walkClipName_| string                                               | Walk       | Name of the animation clip used when the character is walking.                                              |
|_idleClipName_| string                                               | Idle       | Name of the animation clip used when the character is idle.                                                 |
|_sprintClipName_| string                                               | Gallop     | Name of the animation clip used when the character is sprinting.                                            |
|_turnType_| enum(smoothTurn, stepTurnCardinal, stepTurnDiagonal) | smoothTurn | Defines the walking mode and how the player turns and moves.                                                |
|_autoWalk_| boolean                                              | false      | If true, the player will automatically start walking forward without input.                                 |
|_targetWalk_| boolean                                              | false      | If true, enables point-and-click movement: the character walks toward the location where the player clicks. |
|_speed_| float                                                | 5.0        | Defines the player's base walking speed.                                                                    |
|_rotationSpeed_| float                                                | 90.0       | Defines the turning speed for smoothTurn mode.                                                              |
|_sprint_| boolean                                              | false      | If true, the player can sprint when holding the sprintKey, increasing their speed to sprintSpeed.           |
|_sprintKey_| string                                               | shift      | Key used to sprint with the character.                                                                      |
|_sprintSpeed_| float                                                | 8.0        | Defines the sprinting speed when the sprint mode is active.                                                 |
|_keyUp_| string                                               | w          | Key used to move the character forward.                                                                     |
|_keyDown_| string                                               | s          | Key used to move the character backward.                                                                    |
|_keyLeft_| string                                               | a          | Key used to move the character left.                                                                        |
|_keyRight_| string                                               | d          | Key used to move the character right.                                                                       |
|_forwardOffsetAngle_| number                                               | 0          |  The angular offset (in degrees) that defines how much the model’s logical forward direction differs from its visual or model-space forward axis. In other words, it specifies how far the character’s or object’s “forward” (as understood by the user or game logic) is rotated relative to the model’s default orientation in the 3D scene.                                                                    |


### turnType
- `smoothTurn`: The player turns smoothly while the key is held. The player can move while turning. You can adjust the speed of rotation by the `rotationSpeed` property. 
- `stepTurnCardinal`: When pressing a key, the player instantly turn 90° in the selected direction (toward, backward, left, or right) and then moves. It enables 4-directional movement. 
- `stepTurnDiagonal`:  Works the same way as stepTurnCardinal, but also allows movement in a diagonal directions (↗, ↘, ↙, ↖) by turning 45° before moving. It enables 8-directional movement. 

### autoWalk
If the `autoWalk` property is set to true, the player will automatically start walking forward without input. It works with all [turn types](#turntype). 

### targetWalk 
If the `targetWalk` property is set to true, it enables point-and-click movement: the character walks toward the location where the player clicks. The `rotationSpeed` property is set automatically and cannot be changed. 

### forwardOffsetAngle
In some 3D models, the visual forward direction (the way the model appears to face) may not align with its logical forward axis (the direction considered "forward" in the game world).
This misalignment can lead to confusion when controlling the character, as the movement direction may not match the player's expectations based on the model's appearance.
To fix this, you can use the `forwardOffsetAngle` property.

The `forwardOffsetAngle` property allows you to specify an angular offset (in degrees) that defines how much the model’s logical forward direction differs from its visual forward axis.
By setting this property, you can ensure that when the player moves the character forward, it moves in the direction that visually makes sense based on the model's orientation.

For example, imagine you have a fox model placed in the game world.
When you press the forward movement key, you expect the fox to walk in the direction it’s visually facing.
However, it moves backward, behind the tail instead.
To fix this, set the `forwardOffsetAngle` to 180 degrees to align the logical forward movement with the fox’s visual direction.