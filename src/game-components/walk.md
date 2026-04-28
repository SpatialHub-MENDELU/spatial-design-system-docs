---
title: walk
---

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import ComponentExample from '../vue/ComponentExample.vue';
  import ZombieMaze from './demo-games/z-maze/ZombieMaze.vue';
  import VixensInstinct from './demo-games/vixens-instinct/VixensInstinct.vue';

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

The `walk` component controls character movement and animations.  
It supports walking, sprinting, turning styles, auto-walk, and point-and-click movement.

::: warning ⚠️ PHYSICS ENGINE
The _walk_ component relies on the Ammo.js physics engine. Ensure that Ammo.js is installed in your project for proper
functionality.
:::

## Example: `smoothTurn` turn type 
The character rotates smoothly while moving.

<ZombieMaze />

```html

<a-entity
  walk="
    turnType: smoothTurn;
  ">
</a-entity>
```
- See [Quick Start](#quick-start-how-it-works) section for all movement customization options.
- See [Scene setup](#scene-setup) section for how to set up the scene and entities.

## Example: `stepTurnDiagonal` turn type 
The character rotates to 8 directions (↑, ↗, →, ↘, ↓, ↙, ←, ↖) before moving.

<VixensInstinct />

```html

<a-entity
  walk="
    turnType: stepTurnDiagonal;
  ">
</a-entity>
```
- See [Quick Start](#quick-start-how-it-works) section for all movement customization options.
- See [Scene setup](#scene-setup) section for how to set up the scene and entities.

## Quick start (How it works)
### **Movement Type (`turnType`):**
   - `smoothTurn`: Smooth rotation while moving.
   - `stepTurnCardinal`: Rotation to 4 directions (↑, →, ↓, ←)
   - `stepTurnDiagonal`: Rotation to 8 directions (↑, ↗, →, ↘, ↓, ↙, ←, ↖)
   - default value: `smoothTurn`
```html
<a-entity
  walk="
    turnType: smoothTurn;
  ">
</a-entity>
```

### **Point-and-click movement:**
- `targetWalk`: Moves the character to the clicked location (default value: `false`).
```html
<a-entity
  walk="
    targetWalk: true;
  ">
</a-entity>
```
### **Auto-walk:**
- `autoWalk`: Automatically starts walking forward without input (default value: `false`).
  - It can be combined with any movement types.
```html
<a-entity
  walk="
    autoWalk: true;
  ">
</a-entity>
```

### **Sprint:**
- `sprint`: Enables sprinting (default value: `false`).
- `sprintSpeed`: Speed while sprinting (default value: `6`).
- `keySprint`: Key for sprinting (default value: `shift`).
```html
<a-entity
  walk="
    sprint: true;
    sprintSpeed: 6;
    keySprint: shift;
  ">
```

### **Animations:**
   - `walkClipName`: Animation name for walking (default value: `Walk`)
   - `idleClipName`: Animation name for idle (default value: `Idle`)
```html
<a-entity
  walk="
    walkClipName: Walk;
    idleClipName: Idle;
  ">
</a-entity>
```
- `sprintClipName`: Animation name for sprinting (default value: `Gallop`)
  - NOTE: you need to enable `sprint` (default value is `false`)
```html
<a-entity
  walk="
    sprintClipName: Gallop;
    sprint: true;
  ">
</a-entity>
```
### **Speed:**
- `speed`: Movement (default value: `3`)
- `rotationSpeed`: Turning speed
  - default value: `90` (optimal for `smoothTurn`)
  - recommended value: `450` (optimal for `targetWalk`)
  - recommended value: `600` (optimal for `stepTurnCardinal` and `stepTurnDiagonal`)
```html
<a-entity
  walk="
    speed: 3;
    rotationSpeed: 90;
  ">
</a-entity>
```

### **Controls:** 
- `keyUp`: Key for moving forward (default value: `w`)
- `keyDown`: Key for moving backward (default value: `s`)
- `keyLeft`: Key for moving left (default value: `a`)
- `keyRight`: Key for moving right (default value: `d`)
```html
<a-entity
  walk="
    keyUp: w;
    keyDown: s;
    keyLeft: a;
    keyRight: d;
  ">
</a-entity>
```
### **Fix Orientation:**
- [forwardOffsetAngle](#forwardoffsetangle): Applies an angle correction to fix the model's forward orientation (default value: `0`).
```html
  
<a-entity
  walk="
    forwardOffsetAngle: 90;
  ">
</a-entity>
```

## Scene setup
- Use parent (logic) + child (visual) structure.
    - Parent → walk + physics 
    - Child → model + shape
    - See [Parent + Child Structure](#parent-and-child-structure) section for more details. 
- **Camera usage**:
  - Use the `id` for camera targeting (see [game-view](game-view.md) documentation).

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
    <a-entity gltf-model="#fox" ammo-shape="type: hull;" position="0 -1.3 0.2" scale="1 1 1"></a-entity>
  </a-entity>
</a-scene>
```

## forwardOffsetAngle

In some 3D models, the visual forward direction (the way the model appears to face) may not align with its logical
forward axis (the direction considered "forward" in the game world).
This misalignment can lead to confusion when controlling the character, as the movement direction may not match the
player's expectations based on the model's appearance.
To fix this, you can use the `forwardOffsetAngle` property.

The `forwardOffsetAngle` property allows you to specify an angular offset (in degrees) that defines how much the model’s
logical forward direction differs from its visual forward axis.
By setting this property, you can ensure that when the player moves the character forward, it moves in the direction
that visually makes sense based on the model's orientation.

For example, imagine you have a fox model placed in the game world.
When you press the forward movement key, you expect the fox to walk in the direction it’s visually facing.
However, it moves backward, behind the tail instead.
To fix this, set the `forwardOffsetAngle` to 180 degrees to align the logical forward movement with the fox’s visual
direction.

```html

<a-entity
  walk="
    forwardOffsetAngle: 90;
  ">
</a-entity>
```

## Props

| Property               | Type                                                 | Default    | Description                                                                                                                                                                                                                                                                                                                                   |
|------------------------|------------------------------------------------------|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| _walkClipName_         | string                                               | Walk       | Name of the animation clip used when the character is walking.                                                                                                                                                                                                                                                                                |
| _idleClipName_         | string                                               | Idle       | Name of the animation clip used when the character is idle.                                                                                                                                                                                                                                                                                   |
| _sprintClipName_       | string                                               | Gallop     | Name of the animation clip used when the character is sprinting.                                                                                                                                                                                                                                                                              |
| _turnType_             | enum(smoothTurn, stepTurnCardinal, stepTurnDiagonal) | smoothTurn | Defines the walking mode and how the player turns and moves.                                                                                                                                                                                                                                                                                  |
| _autoWalk_             | boolean                                              | false      | If true, the player will automatically start walking forward without input.                                                                                                                                                                                                                                                                   |
| _targetWalk_           | boolean                                              | false      | If true, enables point-and-click movement: the character walks toward the location where the player clicks.                                                                                                                                                                                                                                   |
| _speed_                | number                                               | 5.0        | Defines the player's base walking speed.                                                                                                                                                                                                                                                                                                      |
| _rotationSpeed_        | number                                               | 90.0       | Defines the turning speed for smoothTurn mode.                                                                                                                                                                                                                                                                                                |
| _sprint_               | boolean                                              | false      | If true, the player can sprint when holding the keySprint, increasing their speed to sprintSpeed.                                                                                                                                                                                                                                             |
| _keySprint_            | string                                               | shift      | Key used to sprint with the character.                                                                                                                                                                                                                                                                                                        |
| _sprintSpeed_          | number                                               | 8.0        | Defines the sprinting speed when the sprint mode is active.                                                                                                                                                                                                                                                                                   |
| _keyUp_                | string                                               | w          | Key used to move the character forward.                                                                                                                                                                                                                                                                                                       |
| _keyDown_              | string                                               | s          | Key used to move the character backward.                                                                                                                                                                                                                                                                                                      |
| _keyLeft_              | string                                               | a          | Key used to move the character left.                                                                                                                                                                                                                                                                                                          |
| _keyRight_             | string                                               | d          | Key used to move the character right.                                                                                                                                                                                                                                                                                                         |
| _startMovingDirection_ | enum (up, down, left, right)                         | down       | Defines the initial logical direction for step turns. Important for alignment in grid-based movement.                                                                                                                                                                                                                                         |
| _forwardOffsetAngle_   | number                                               | 0          | The angular offset (in degrees) that defines how much the model’s logical forward direction differs from its visual or model-space forward axis. In other words, it specifies how far the character’s or object’s “forward” (as understood by the user or game logic) is rotated relative to the model’s default orientation in the 3D scene. |

## Parent and Child Structure
To create a functional character controller, we recommend using a parent-child structure. This separates the physics
calculations from the visual representation, allowing for better control over the character's pivot point and grounding.

**Parent Entity (The Logic)**: The main container holds the walk component and the physics body (ammo-body). It
represents the character's physical presence in the world.

- We set `angularFactor`: 0 0 0 to prevent the character from tipping over or rolling like a ball.
- We use `activationState: disableDeactivation` to ensure the physics engine never puts the character to "sleep" when
  standing still.
- Type `dynamic` allows the character to be affected by forces and collisions, making it responsive to the environment.
- The `mass` value refer to the character's weight, which affects how it interacts with physics. 
- **Camera usage**: Assign a unique id (e.g., `id="fox-character"`). This ID is required for the camera to identify and
  follow the player. For more details on setting up the follow behavior of the camera, please refer to
  the [game-view](game-view.md) documentation.

**Child Entity (The Visual)**: This entity contains the 3D model (gltf-model) and the physics shape (`ammo-shape`).
- You often need to adjust the child's position (e.g., `y: -1.3`) to ensure the model's feet touch the ground, as the
  parent physics body is usually centered at its middle point.

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
    <a-entity gltf-model="#fox" ammo-shape="type: hull;" position="0 -1.3 0.2" scale="1 1 1"></a-entity>
  </a-entity>
</a-scene>
```


## Credits & 3D Models Attribution

The project utilizes 3D assets from [Poly.pizza](https://poly.pizza/). Below is the attribution for each model used in the games.

### Creative Commons Attribution (CC BY)
*The following model requires attribution to the original creator as per the [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) license.*

| Model Name | Author |
| :--- | :--- |
| [**Zombie**](https://poly.pizza/m/xqEzosAVYX) | bachosoftdesign |
| [**Tree**](https://poly.pizza/m/6Yjt8nIwLsD), [**Tree-2**](https://poly.pizza/m/cRipmFHCEVU) | Marc Solà |
| [**Cave Scene**](https://poly.pizza/m/0nFBQD9-gfu) | Brandon Jones (Toji) |
| [**Mountain**](https://poly.pizza/m/6qp53W5djC5) | Servin Nissen |
| [**Pond**](https://poly.pizza/m/cYUMQWc-BOV) | jeremy |
| [**Jeep**](https://poly.pizza/m/AcSdGGrgYP) | Zsky |
| [**Rabbit**](https://poly.pizza/m/Km89u3twcR) | Sherkiz |
| [**Bush**](https://poly.pizza/m/d6STyhH76Qe) | Jarlan Perez |
| [**Pine Tree**](https://poly.pizza/m/2Qo-fmVKuSG) | Danni Bittman |

### Public Domain (CC0)
*The following model is provided under the [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) license (Public Domain).*

| Model Name | Author |
| :--- | :--- |
| [**Adventurer**](https://poly.pizza/m/5EGWBMpuXq), [**Frog**](https://poly.pizza/m/9Z2V8fpazF), [**Stag**](https://poly.pizza/m/tQdzbZ1Cmw), [**Rocks**](https://poly.pizza/m/OQvi8PIZ40), [**Shiba Inu**](https://poly.pizza/m/y4wdQpg767), [**Bear Trap**](https://poly.pizza/m/UTau9hyAnm) | Quaternius |