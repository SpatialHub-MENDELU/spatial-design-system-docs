---
title: npc-walk
---

<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import ComponentExample from "../vue/ComponentExample.vue";

  const renderScene = ref(false);

  onMounted(async () => {
    try {
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
The _npc-walk_ component relies on the Ammo.js physics engine. Ensure that Ammo.js is installed in your project for proper functionality.
:::

## How it works
1. **Animations:** Set the `walkClipName` and `idleClipName` properties to match your character's glTF animations.
2. **Movement Type:** Define how the character moves by setting the `type` property to either [points](#points) or [randomMoving](#randommoving).
3. **Movement Behavior:** Adjust the core movement using `speed`, and control the turning smoothness with [`allowRotation`](#allowrotation) and `rotationSpeed`. If your character needs to move vertically (e.g., flying or climbing), enable [`altitude`](#altitude).
4. **Timing & Delays:** Fine-tune the flow by setting a delay before moving with [`waitBeforeStart`](#waitbeforestart), or add rest periods using [`pauseAtPoints`](#pauseatpoints).
5. **Path Configuration (`points` mode):** Set the target path using the `points` array. Control the sequence with `cyclePath`, `randomizePointsOrder`, or `stopAtLastPoint`. You can also adjust how precise the character needs to be to reach a point using `horizontalPointTolerance` and `verticalPointTolerance`.
6. **Area Bounds (`randomMoving` mode):** Limit the roaming area using the `xMin`, `xMax`, `zMin`, and `zMax` properties. If `altitude` is enabled, remember to also set `yMin` and `yMax`.

## Setting up the scene 
To create a functional NPC character, we strongly recommend using a parent-child structure. This separates the physics calculations from the visual representation, giving you precise control over the character's pivot point and interaction with the ground.

**Parent Entity (The Logic):** The main container holds the `npc-walk` component and the physics body (`ammo-body`). It represents the character's physical presence in the world.
- Set `angularFactor: 0 0 0` to prevent the NPC from tipping over or rolling unpredictably.
- Use `activationState: disableDeactivation` to ensure the physics engine never puts the character to "sleep" when it pauses at a point or waits to start moving.

**Child Entity (The Visual):** This entity contains the 3D model (`gltf-model`) and the physics shape (`ammo-shape`).
- You will often need to adjust the child's vertical position (e.g., `position="0 -1.5 0"`) to ensure the model's feet touch the ground properly, as the parent physics body is usually centered at its middle point.

```js
import "spatial-design-system/components/game/npcWalk";
```

```html
<a-scene physics="driver: ammo;">
  <a-assets>
    <a-asset-item id="dog" src="/models/Dog.glb"></a-asset-item>
  </a-assets>

  <a-entity
    npc-walk="
        walkClipName: Walk; 
        idleClipName: Idle; 
        type: points; 
        points: 0 1 5, 5 1 5, 5 1 0; 
        speed: 5;"
    id="dog-character"
    ammo-body="type: dynamic; angularFactor: 0 0 0; mass: 20; activationState: disableDeactivation"
    position="5 1.8 5" >
    <a-entity gltf-model="#dog" ammo-shape="type: hull;" position="0 -1.5 0" scale="3 3 3"></a-entity>
  </a-entity>
</a-scene>
```

## Props
| Property               | Type                        | Default                           | Description                                                                                                                                                                                              | Used In      |
| ---------------------- |-----------------------------| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| _walkClipName_         | string                      | Walk                              | Name of the animation clip used when the NPC is walking.                                                                                                                                                 | All types    |
| _idleClipName_         | string                      | Idle                              | Name of the animation clip used when the NPC is idle.                                                                                                                                                    | All types    |
| _speed_                | number                      | 4                                 | Movement speed of the NPC in units per second.                                                                                                                                                           | All types    |
| _altitude_           | boolean                     | false                             | If `altitude` is true, the character adjusts its height to reach the target’s exact position.                                      | All types    |
| _pauseAtPoints_        | number                      | 0                                 | Duration (in seconds) the NPC waits after reaching each point.                                                                                                                                           | All types    |
| _waitBeforeStart_      | number                      | 0                                 | Delay (in seconds) before the NPC begins moving when initialized.                                                                                                                                        | All types    |
| _horizontalPointTolerance_ | number                      | 0.1                               | Tolerance distance on the X and Z axes to consider the NPC has reached the target position. Used when altitude is false. | All types    |
| _verticalPointTolerance_   | number                      | 0.1                               | 3D tolerance distance (X, Y, Z) to consider the NPC has reached the target position. Used when altitude is true.         | All types    |
| _allowRotation_        | boolean                     | true                              | When true, it allows the NPC to rotate smoothly in the direction of movement.                                                                                                                            | All types    |
| _rotationSpeed_        | number                      | 500                               | Speed at which the NPC rotates toward its walking direction (degrees per second).                                                                                                                        | All types    |
| _type_                 | enum (randomMoving, points) | points                      | Defines how the character moves.  |    |
| _points_               | string                      | "0 2 5, 5 5 5, 5 2 0" | Array of positions the NPC walks through in order.                                                                                                                                                       | points       |
| _cyclePath_            | boolean                     | true                              | If true, the NPC loops back to the first point after reaching the last one, forming a continuous cycle.         | points       |
| _randomizePointsOrder_ | boolean                     | false                             | If true, the NPC visits defined points in a random sequence instead of the defined order.                                                                                                                | points       |
| _stopAtLastPoint_      | boolean                     | false                             | If true, the NPC stops moving after reaching the last point in the sequence. Forces `randomizePointsOrder` to false.                                                                     | points       |
| _xMin_                 | number                      | -5                                | Minimum allowed position along the X-axis.                                                 | randomMoving |
| _xMax_                 | number                      | 5                                 | Maximum allowed position along the X-axis.                                           | randomMoving |
| _zMin_                 | number                      | -5                                | Minimum allowed position along the Z-axis.                                    | randomMoving |
| _zMax_                 | number                      | 5                                 | Maximum allowed position along the Z-axis.                                      | randomMoving |
| _yMin_                 | number                      | 0                                 | Minimum allowed position along the Y-axis. Applied only when `altitude` is true.                                | randomMoving |
| _yMax_                 | number                      | 5                                 | Maximum allowed position along the Y-axis. Applied only when `altitude` is true.                                     | randomMoving |

### altitude
The `altitude` property is defined to control whether the character should adjust its height while moving toward a target. 
When set to `true`, the character moves vertically as well, matching the target’s height. 
When set to `false`, the character moves only horizontally and keeps its current height.
The default value is `false`.
```html
<a-entity
  npc-walk="
    walkClipName: Walk;
    type: points;
    points: 0 0 5, 5 5 5, 5 0 0;
    altitude: true;
  "
>
</a-entity>
```

### pauseAtPoints
The `pauseAtPoints` property specifies the duration (in seconds) that the NPC will wait after reaching each point in its path.
```html
<a-entity
  npc-walk="
    walkClipName: Walk;
    idleClipName: Idle;
    type: points;
    points: 0 1 5, 5 1 5, 5 1 0;
    pauseAtPoints: 2;
  "
>
</a-entity>
```

### waitBeforeStart
The `waitBeforeStart` property defines the duration (in seconds) before the NPC begins moving when it is initialized.
```html
<a-entity
  npc-walk="
    walkClipName: Walk;
    idleClipName: Idle;
    type: points;
    points: 0 1 5, 5 1 5, 5 1 0;
    waitBeforeStart: 3;
  "
>
</a-entity>
```
### horizontalPointTolerance
The `horizontalPointTolerance` property defines the acceptable distance required for the NPC to consider it has successfully reached its target position. This tolerance is calculated purely on the horizontal plane (X and Z axes, ignoring height). The default value is `0.1`.
```html
<a-entity
  npc-walk="
    walkClipName: Walk;
    type: points;
    points: 0 1 5, 5 1 5, 5 1 0;
    horizontalPointTolerance: 0.5;
  "
>
</a-entity>
```

### verticalPointTolerance
The `verticalPointTolerance` property defines the 3D distance (X, Y, and Z axes) required for the NPC to consider it has successfully reached its target position. This precise spherical tolerance is used **only** when the [`altitude`](#altitude) property is set to `true`. The default value is `0.1`.
```html
<a-entity
  npc-walk="
    walkClipName: Walk;
    type: points;
    points: 0 5 5, 5 5 5, 5 2 0;
    altitude: true;
    verticalPointTolerance: 0.5;
  "
>
</a-entity>
```

### allowRotation
The `allowRotation` property determines whether the NPC is allowed to rotate smoothly in the direction of movement. 
When set to `true`, the NPC will rotate to face the direction it is moving toward.
You can adjust the speed of this rotation using the `rotationSpeed` property.
```html
<a-entity
  npc-walk="
    walkClipName: Walk;
    type: points;
    points: 0 1 5, 5 1 5, 5 1 0;
    allowRotation: true;
    rotationSpeed: 300;
  "
>
</a-entity>
```

## points
The `points` mode makes the NPC follow a predefined path made up of specific positions. These positions are set using the points property, which takes an array of coordinates such as `0 1 5, 5 1 5, 5 1 0`. The first number in each triplet represents the X coordinate, the second represents the Y coordinate, and the third represents the Z coordinate. The coordinates are separated by commas.
```html
<a-entity
  npc-walk="
    walkClipName: Walk;
    idleClipName: Idle;
    type: points;
    points: 0 1 5, 5 1 5, 5 1 0;
  "
>
</a-entity>
```
You can control how the NPC moves along this path with two additional properties: `cyclePath` and `randomizePointsOrder`.

The `cyclePath` property controls whether the NPC loops back to the first point after reaching the last one.
When set to `true`, the NPC continuously loops through the points in order. When set to `false`, the NPC moves back to the first point by following the same path in reverse.
By default, `cyclePath` is set to `true`.
```html
<a-entity
  npc-walk="
    walkClipName: Walk;
    idleClipName: Idle;
    type: points;
    points: 0 1 5, 5 1 5, 5 1 0;
    cyclePath: false;
  "
>
</a-entity>
```


The `randomizePointsOrder` property lets the NPC visit the points in a random order instead of following the original sequence.
When set to `true`, the NPC will choose points randomly from the list. The default value is `false`.
```html
<a-entity
  npc-walk="
    walkClipName: Walk;
    idleClipName: Idle;
    type: points;
    points: 0 1 5, 5 1 5, 5 1 0;
    randomizePointsOrder: true;
  "
>
</a-entity>
```

The `stopAtLastPoint` property determines whether the NPC stops its movement entirely after reaching the final point in the defined path.
When set to `true`, the NPC finishes its sequence at the last point, stops moving, and switches to its idle animation. Please note that enabling this property automatically forces `randomizePointsOrder` to `false`.
The default value is `false`.

```html
<a-entity
  npc-walk="
    walkClipName: Walk;
    idleClipName: Idle;
    type: points;
    points: 0 1 5, 5 1 5, 5 1 0;
    stopAtLastPoint: true;
  "
>
</a-entity>
```

## randomMoving
In `randomMoving` mode, the NPC wanders randomly within a defined area. You can set the boundaries of this area using the `xMin`, `xMax`, `yMin`, `yMax`, `zMin`, and `zMax` properties.
```html
<a-entity
  npc-walk="
    walkClipName: Walk;
    type: randomMoving;
    xMin: -5;
    xMax: 5;
    zMin: -5;
    zMax: 5;
  "
>
</a-entity>
```
The `yMin` and `yMax` properties are only applied if the `altitude` property is set to `true`. If `altitude` is `false`, the NPC simply maintains its current height.
```html
  <a-entity
  npc-walk="
    walkClipName: Walk;
    type: randomMoving;
    altitude: true;
    xMin: -5;
    xMax: 5;
    yMin: -5;
    yMax: 5;
    zMin: -5;
    zMax: 5;
  "
>
</a-entity>
```
