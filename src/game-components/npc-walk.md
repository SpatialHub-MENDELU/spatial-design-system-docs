---
title: npc-walk
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
The `npc-walk` component controls the movement and animation of a non-player character (NPC). 
It lets you customize how the NPC moves — either by walking randomly within a defined area or by following a set of predefined points. 
The component also provides properties to fine-tune speed, rotation, and path behavior.

::: warning ⚠️ PHYSICS ENGINE
The _walk_ component rely on the Ammo.js physics engine. Ensure that Ammo.js is installed in your project for proper functionality.
:::

## How it works
1. If the character has animations, set them with the `walkClipName` and `idleClipName` properties.
2. Define how the character moves by setting the `type` property. Learn more about movement types [here](#type).
3. Adjust movement behavior with the `speed`, [`checkHeight`](#checkheight), [`pauseAtPoints`](#pauseatpoints), [`waitBeforeStart`](#waitbeforestart), [`allowRotation`](#allowrotation), and `rotationSpeed` properties.
4. In `points` mode, set the path using the `points` property and control how the NPC follows it with `cyclePath` and `randomizePointsOrder`. Learn more about `points` mode [here](#points).
5. In `randomMoving` mode, limit the movement area using the `xMin`, `xMax`, `yMin`, `yMax`, zMin, and `zMax` properties. Learn more about `randomMoving` mode [here](#randommoving).

## Example
<ComponentExample :fixed="false">
<template #code>

```js
import "spatial-design-system/components/game/npcWalk";
```

```html
<a-scene>
  <a-entity
    npc-walk="walkClipName: Walk; idleClipName: Idle; type: points; points: 0 1 5, 5 1 5, 5 1 0; speed: 2; pauseAtPoints: 2; waitBeforeStart: 3;"
    id="dog-character"
    ammo-body="type: dynamic; angularFactor: 0 0 0; mass: 20; activationState: disableDeactivation"
    position="5 1.8 5" >
    <a-entity gltf-model="#dog" ammo-shape="type: hull;" position="0 -1.5 0" scale="3 3 3" ></a-entity>
  </a-entity>
</a-scene>
```
</template>

</ComponentExample>


## Props
| Property               | Type                        | Default                           | Description                                                                                                                                                                                                  | Used In      |
| ---------------------- |-----------------------------| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------ |
| _walkClipName_         | string                      | Walk                              | Name of the animation clip used when the NPC is walking.                                                                                                                                                     | All types    |
| _idleClipName_         | string                      | Idle                              | Name of the animation clip used when the NPC is idle.                                                                                                                                                        | All types    |
| _speed_                | number                      | 4                                 | Movement speed of the NPC in units per second.                                                                                                                                                               | All types    |
| _checkHeigh_           | boolean                     | false                             | If `checkHeight` is true, the character adjusts its height to reach the target’s exact position; if false, it only moves horizontally and keeps its current height.                                          | All types    |
| _pauseAtPoints_        | number                      | 0                                 | Duration (in seconds) the NPC waits after reaching each point.                                                                                                                                               | All types    |
| _waitBeforeStart_      | number                      | 0                                 | Delay (in seconds) before the NPC begins moving when initialized.                                                                                                                                            | All types    |
| _allowRotation_        | boolean                     | true                              | When true, it allows the NPC to rotate smoothly in the direction of movement.                                                                                                                                | All types    |
| _rotationSpeed_        | number                      | 500                               | Speed at which the NPC rotates toward its walking direction (degrees per second).                                                                                                                            | All types    |
| _type_                 | enum (randomMoving, points) | randomMoving                      | Defines how the character moves. It can be set to:<br>– `randomMoving`: enables random walking within the defined range area.<br>– `points`: walking through defined points listed in the `points` property. |    |
| _points_               | array                       | [(0, 0, 0), (5, 0, 0), (5, 0, 5)] | Array of positions the NPC walks through in order.                                                                                                                                                           | points       |
| _cyclePath_            | boolean                     | true                              | If true, the NPC loops back to the first point after reaching the last one, forming a continuous cycle. If false, the NPC returns to the first point by traversing the points in reverse order.              | points       |
| _randomizePointsOrder_ | boolean                     | false                             | If true, the NPC visits defined points in a random sequence instead of the defined order.                                                                                                                    | points       |
| _xMin_                 | number                      | -5                                | Minimum allowed position along the X-axis (left boundary). Prevents the entity from moving too far left. Only used when `type` is set to `randomMoving`.                                                     | randomMoving |
| _xMax_                 | number                      | 5                                 | Maximum allowed position along the X-axis (right boundary). Prevents the entity from moving too far right. Only used when `type` is set to `randomMoving`.                                                   | randomMoving |
| _zMin_                 | number                      | -5                                | Minimum allowed position along the Z-axis (backward boundary). Prevents the entity from moving too far backward. Only used when `type` is set to `randomMoving`.                                             | randomMoving |
| _zMax_                 | number                      | 5                                 | Maximum allowed position along the Z-axis (forward boundary). Prevents the entity from moving too far forward. Only used when `type` is set to `randomMoving`.                                               | randomMoving |
| _yMin_                 | number                      | 0                                 | Minimum allowed position along the Y-axis (bottom boundary). Prevents the entity from going too low (e.g., below ground). Only used when `type` is set to `randomMoving`.                                    | randomMoving |
| _yMax_                 | number                      | 5                                 | Maximum allowed position along the Y-axis (top boundary). Prevents the entity from going too high (e.g., flying up). Only used when `type` is set to `randomMoving`.                                         | randomMoving |

### checkHeight
The `checkHeight` property is defined to control whether the character should adjust its height while moving toward a target. 
When set to `true`, the character moves vertically as well, matching the target’s height. 
When set to `false`, the character moves only horizontally and keeps its current height.
The default value is `false`.

### pauseAtPoints
The `pauseAtPoints` property specifies the duration (in seconds) that the NPC will wait after reaching each point in its path.

### waitBeforeStart
The `waitBeforeStart` property defines the duration (in seconds) before the NPC begins moving when it is initialized.

### allowRotation
The `allowRotation` property determines whether the NPC is allowed to rotate smoothly in the direction of movement. 
When set to `true`, the NPC will rotate to face the direction it is moving toward.
You can adjust the speed of this rotation using the `rotationSpeed` property.

## type
- `randomMoving`: enables random walking within the defined range area.
- `points`: walking through defined points listed in the `points` property.

### points
The `points` mode makes the NPC follow a predefined path made up of specific positions. These positions are set using the points property, which takes an array of coordinates such as `0 1 5, 5 1 5, 5 1 0`. The first number in each triplet represents the X coordinate, the second represents the Y coordinate, and the third represents the Z coordinate. The coordinates are separated by commas.
You can control how the NPC moves along this path with two additional properties: `cyclePath` and `randomizePointsOrder`. 

The `cyclePath` property controls whether the NPC loops back to the first point after reaching the last one.
When set to `true`, the NPC continuously loops through the points in order. When set to `false`, the NPC moves back to the first point by following the same path in reverse.
By default, `cyclePath` is set to `true`.

The `randomizePointsOrder` property lets the NPC visit the points in a random order instead of following the original sequence.
When set to `true`, the NPC will choose points randomly from the list. The default value is `false`.

### randomMoving
In `randomMoving` mode, the NPC wanders randomly within a defined area. You can set the boundaries of this area using the `xMin`, `xMax`, `yMin`, `yMax`, `zMin`, and `zMax` properties.

