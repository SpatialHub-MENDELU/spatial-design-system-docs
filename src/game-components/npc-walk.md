---
title: npc-walk
---

<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import ComponentExample from "../vue/ComponentExample.vue";
  import SpaceDefender from './demo-games/space-defender/SpaceDefender.vue';
  import ForestFlight from './demo-games/forest-flight/ForestFlight.vue';

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

::: warning ⚠️ Project setup required
The `npc-walk` component relies on A-Frame, ammo.js and the physics system, which must be loaded as UMD globals before use. Follow [Game components — Setup](/game-components/setup) to prepare a fresh project before continuing.
:::

## Import

Once the [project setup](/game-components/setup) is in place, side-effect import the component so it self-registers on `AFRAME`:

```js
import "spatial-design-system/components/game/npcWalk.js";
```

## Example: `points` type
NPC follows a path defined by array of points. 

<ForestFlight /> 

```html
<a-entity
  npc-walk="
    type: points;
    points: 0 1 5, 5 1 5, 5 1 0;
  "
></a-entity>
```

- See [Quick Start](#quick-start-how-it-works) section for all movement customization options.
- See [Scene setup](#scene-setup) section for how to set up the scene and entities.

## Example: `randomMoving` type
NPC moves randomly within a defined area.

<SpaceDefender /> 

```html
<a-entity
  npc-walk="
    type: randomMoving;
    xMin: -5;
    xMax: 5;
    zMin: -5;
    zMax: 5;
  "
></a-entity>
```

- See [Quick Start](#quick-start-how-it-works) section for all movement customization options.
- See [Scene setup](#scene-setup) section for how to set up the scene and entities.

## Quick start (How it works)
### **Movement Type (`type`):**
- Defines the movement behavior mode (default value: `points`).
   - `points`: Follows a defined path of coordinates.
   - `randomMoving`: Wanders randomly within a defined boundary area.
```html
<a-entity
  npc-walk="
    type: points;
  "
></a-entity>
```

### **Path Configuration (`points` type):**
- `points`: Comma-separated list of 3D coordinates for the NPC to follow (default value: `0 2 5, 5 5 5, 5 10 0`).
```html
<a-entity
  npc-walk="
    type: points;
    points: 0 1 5, 5 1 5, 5 1 0;
  "
></a-entity>
```

### **Path Traversal Rules (`points` type):**
- `cyclePath`: Loops back to the first point after reaching the last one (default value: `true`).
  - When set to `false`, the NPC walks back through the points in reverse order.
```html
<a-entity
  npc-walk="
    type: points;
    cyclePath: true;
  "
></a-entity>
```
- `randomizePointsOrder`: Visits defined points in a random sequence (default value: `false`).
```html
<a-entity
  npc-walk="
    type: points;
    randomizePointsOrder: true;
  "
></a-entity>
```
- `stopAtLastPoint`: Stops moving permanently after reaching the final point (default value: `false`).
```html
<a-entity
  npc-walk="
    type: points;
    stopAtLastPoint: true;
  "
></a-entity>
```

### **Area Bounds (`randomMoving` type):**
- `xMin` / `xMax`: Minimum and maximum X-axis boundaries (default values: `-5` / `5`).
- `zMin` / `zMax`: Minimum and maximum Z-axis boundaries (default values: `-5` / `5`).
```html
<a-entity
  npc-walk="
    type: randomMoving;
    
    xMin: -5;
    xMax: 5;
    
    zMin: -5;
    zMax: 5;
  "
></a-entity> 
```
- `yMin` / `yMax`: Minimum and maximum Y-axis vertical boundaries (default values: `0` / `5`).
  - NOTE: `yMin` and `yMax` are only applied if `altitude` is set to `true` (default value: `false`).
```html
<a-entity
  npc-walk="
    type: randomMoving;
    xMin: -5;
    xMax: 5;
    yMin: 0;
    yMax: 5;
    
    altitude: true;
    
    zMin: -5;
    zMax: 5;
  "
></a-entity>
```

### **Vertical movement and gravity:**
- `allowGravity`: Applies gravity to the NPC (default value: `true`). When disabled, the NPC can fly.
```html
<a-entity
  npc-walk="
    allowGravity: false;
  "
></a-entity>
```
- `altitude`: Enables vertical movement (default value: `false`).
  - NOTE: When set to `true`, `allowGravity` is automatically disabled. 
```html
<a-entity
  npc-walk="
    altitude: true;
  "
></a-entity>
```
### **Speed and rotation:**
- `speed`: Movement speed (default value: `4`).
```html
<a-entity
  npc-walk="
    speed: 4;
  "
></a-entity>
```
- `rotationSpeed`: Speed at which the NPC rotates (default value: `500`).
```html
<a-entity
  npc-walk="
    rotationSpeed: 500;
  "
></a-entity>
```
- `allowRotation`: Enables smooth rotation toward the target point (default value: `true`).
```html
<a-entity
  npc-walk="
    allowRotation: false;
  "
></a-entity>
```
### **Animations:**
- `walkClipName`: Animation name for walking (default value: `Walk`).
```html
<a-entity
  npc-walk="
    walkClipName: Walk;
  "
></a-entity>
```
- `idleClipName`: Animation name for idle/waiting (default value: `Idle`).
```html
<a-entity
  npc-walk="
    idleClipName: Idle;
  "
></a-entity>
```
- `crossFadeDuration`: Duration of the animation crossfade in seconds (default value: `0.2`).
```html
<a-entity
  npc-walk="
    crossFadeDuration: 0.5;
  "
></a-entity>
```
### **Timing & Delays:**
- `waitBeforeStart`: Delay in seconds before the NPC begins moving (default value: `0`).
```html
<a-entity
  npc-walk="
    waitBeforeStart: 1;
  "
></a-entity>
```
- `pauseAtPoints`: Rest duration in seconds the NPC waits after reaching each point (default value: `0`).
```html
<a-entity
  npc-walk="
    pauseAtPoints: 1;
  "
></a-entity>
```

### **Target Tolerance:**
- `horizontalPointTolerance`: Horizontal distance to consider the target position reached (default value: `0.1`).
```html
<a-entity
  npc-walk="
    horizontalPointTolerance: 0.1;
  "
></a-entity>
```
- `verticalPointTolerance`: Vertical distance to consider the target position reached (default value: `0.1`).
```html
<a-entity
  npc-walk="
    verticalPointTolerance: 0.1;
  "
></a-entity>
```
### **Movement Smoothing:**
- `slowDownRadius`: Distance from the target at which the NPC starts to slow down (default value: `1.5`).
```html
<a-entity
  npc-walk="
    slowDownRadius: 1.5;
  "
></a-entity>
```
- `minSlowdownSpeed`: Minimum speed when slowing down (default value: `0.5`).
```html
<a-entity
  npc-walk="
    minSlowdownSpeed: 0.5;
  "
></a-entity>
```

## Scene setup 
Use parent (logic) and child (visual) structure. Read more about the [parent-child structure](#parent-child-structure-).

```js
import "spatial-design-system/components/game/npcWalk";
```

```html
<a-scene physics="driver: ammo;">
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


## points
The `points` mode makes the NPC follow predefined positions such as `0 1 5, 5 1 5, 5 1 0`. 
```html
<a-entity
  npc-walk="
    type: points;
    points: 0 1 5, 5 1 5, 5 1 0;
  "
></a-entity>
```

### Options
- `cyclePath` (`true` by default) → loop path (when `false`, NPC goes back to the first point in reverse order)

``` javascript
cyclePath: false;
```

- `randomizePointsOrder` → random order
``` javascript
randomizePointsOrder: true;
```

- `stopAtLastPoint` → stop at end
``` javascript
randomizePointsOrder: true;
```

## randomMoving
In `randomMoving` mode, the NPC wanders randomly within a defined area. You can set the boundaries of this area using the `xMin`, `xMax`, `yMin`, `yMax`, `zMin`, and `zMax` properties.
```html
<a-entity
  npc-walk="
    type: randomMoving;
    xMin: -5;
    xMax: 5;
    zMin: -5;
    zMax: 5;
  "
></a-entity>
```
The `yMin` and `yMax` properties are only applied if the `altitude` property is set to `true`. If `altitude` is `false`, the NPC simply maintains its current height.
```html
  <a-entity
  npc-walk="
    type: randomMoving;
    altitude: true;
    xMin: -5;
    xMax: 5;
    yMin: -5;
    yMax: 5;
    zMin: -5;
    zMax: 5;
  "
></a-entity>
```

## Features 
- add `walkClipName` and `idleClipName` for animations
``` javascript
walkClipName: Walk;
idleClipName: Idle;
```
- adjust movement speed with `speed`
``` javascript
speed: 10;
```
- enable smooth rotation with `allowRotation` and control rotation speed with `rotationSpeed`
``` javascript
allowRotation: true;
rotationSpeed: 500;
```
- enable vertical movement with `altitude`
``` javascript
altitude: true;
```
- set delay before starting movement with `waitBeforeStart`
``` javascript
waitBeforeStart: 3;
```
- set pause duration at each point with `pauseAtPoints`
``` javascript
pauseAtPoints: 2;
```
- configure point reach tolerance with `horizontalPointTolerance` and `verticalPointTolerance`
``` javascript
horizontalPointTolerance: 0.5;
verticalPointTolerance: 0.5;
```

## Parent-child structure
To create a functional NPC character, we strongly recommend using a parent-child structure. This separates the physics calculations from the visual representation, giving you precise control over the character's pivot point and interaction with the ground.

**Parent Entity (The Logic):** The main container holds the `npc-walk` component and the physics body (`ammo-body`). It represents the character's physical presence in the world.
- Set `angularFactor: 0 0 0` to prevent the NPC from tipping over or rolling unpredictably.
- Use `activationState: disableDeactivation` to ensure the physics engine never puts the character to "sleep" when it pauses at a point or waits to start moving.

**Child Entity (The Visual):** This entity contains the 3D model (`gltf-model`) and the physics shape (`ammo-shape`).
- You will often need to adjust the child's vertical position (e.g., `position="0 -1.5 0"`) to ensure the model's feet touch the ground properly, as the parent physics body is usually centered at its middle point.

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

## Events

The `npcWalk` component emits the following events as the NPC progresses along its path,
so other components can react to its behavior:

| Event                | Parameters                                        | Description                                                      |
| -------------------- | ------------------------------------------------- | ---------------------------------------------------------------- |
| _npc-point-reached_  | `{ index: number, position: { x, y, z } }`        | Emitted whenever the NPC reaches its current target point. `index` is the point index (in `points` mode). |
| _npc-pause-start_    | `{ index: number }`                               | Emitted when the NPC starts pausing at a point (requires `pauseAtPoints`). |
| _npc-pause-end_      | `{ index: number }`                               | Emitted when the NPC finishes pausing and resumes moving.       |
| _npc-path-completed_ | `{ index: number }`                               | Emitted when the NPC reaches the final point of its path (requires `stopAtLastPoint`). |

::: tip Note
You can listen to these events to trigger dialogue, spawn objects, or update game state as the NPC moves.

```js
el.addEventListener("npc-point-reached", (event) => {
  console.log(event.detail.index, event.detail.position);
});
```
:::

## Credits & 3D Models Attribution
The project utilizes 3D assets from [Poly.pizza](https://poly.pizza/). Below is the attribution for each model used in the games.

### Creative Commons Attribution (CC BY)
*The following models require attribution to the original creator as per the [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) license.*

| Model Name | Author |
| :--- | :--- |
| [**Earth**](https://poly.pizza/m/1I5ip-3VOfv), **Mercury**, [**Mars**](https://poly.pizza/m/5_IXgyZ8cz_), [**Venus**](https://poly.pizza/m/6V99ow0chMd), [**Paper airplane**](https://poly.pizza/m/75WQH5E29tF) | Poly by Google |
| [**Tree Assets**](https://poly.pizza/m/eLqmfpqu_Ig) | Ben Desai |
| [**Spaceship**](https://poly.pizza/m/5nWeu4IQXVX) | Liz Reddington |
| [**Sun**](https://poly.pizza/m/7diieNtphvD) | Zoe XR |

### Public Domain (CC0)
*The following models are provided under the [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) license (Public Domain).*

| Model Name | Author |
| :--- | :--- |
| [**Dock**](https://poly.pizza/m/XViKoBh2UN), [**Fox**](https://poly.pizza/m/Bc97C66HKi), [**Rock**](https://poly.pizza/m/4MUaQTcDdc), **Spaceship Enemy**, [**Planet** (Saturn)](https://poly.pizza/m/IVnmauIgWX), [**Planet** (Jupiter)](https://poly.pizza/m/9g1aIbfR9Y) | Quaternius |
