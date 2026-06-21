---
title: fly
---

<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import SpaceDefender from './demo-games/space-defender/SpaceDefender.vue';
import DragonsQuest from './demo-games/dragons-quest/DragonsQuest.vue';
import ForestFlight from './demo-games/forest-flight/ForestFlight.vue';

  const renderScene = ref(false);

  onMounted(async () => {
    try {
      // Here import Spatial Design System components that you need
      // await import("spatial-design-system/components/game/fly.js");
      // await import("spatial-design-system/components/game/gameview.js");
      // await import("spatial-design-system/components/game/npcWalk.js");
      renderScene.value = true;
    } catch (e) {
      console.error(e);
    }
  });
</script>

# {{ $frontmatter.title }}

The `fly` component controls flying movement and animations.  
It supports different flight styles, speed control, and realistic pitch/roll behavior.

::: warning ⚠️ Project setup required
The `fly` component relies on A-Frame, ammo.js and the physics system, which must be loaded as UMD globals before use. Follow [Game components — Setup](/game-components/setup) to prepare a fresh project before continuing.
:::

## Import

Once the [project setup](/game-components/setup) is in place, side-effect import the component so it self-registers on `AFRAME`:

```js
import "spatial-design-system/components/game/fly.js";
```

## Example: freeDirectionalFlight type 
Fly in any direction. 

<DragonsQuest/>

```html
<a-entity
   fly="
      type: freeDirectionalFlight;
   "
></a-entity>
```
- See [Quick Start](#quick-start-how-it-works) section for all movement customization options.
- See [Scene setup](#scene-setup) section for how to set up the scene and entities.

## Example: autoForward type
Automatically flies forward, player steers. 

<SpaceDefender/>

```html
<a-entity
  fly="
     type: autoForward;
  "
></a-entity>
```
- See [Quick Start](#quick-start-how-it-works) section for all movement customization options.
- See [Scene setup](#scene-setup) section for how to set up the scene and entities.


## Example: autoForwardFixedDirection type
Automatically moves forward in fixed direction. 

<ForestFlight/>

```html
<a-entity
  fly="
     type: autoForwardFixedDirection;
  "
></a-entity>
```
- See [Quick Start](#quick-start-how-it-works) section for all movement customization options.
- See [Scene setup](#scene-setup) section for how to set up the scene and entities.


## Quick start (How it works)
### **Flight Type (`type`):**
- Defines the flying mode (default value: `freeDirectionalFlight`).
   - `freeDirectionalFlight`: Free movement in all 3D directions.
   - `autoForward`: Automatic continuous forward movement.
   - `autoForwardFixedDirection`: Automatic forward movement in a fixed direction.
```html
<a-entity
   fly="
      type: freeDirectionalFlight;
   "
></a-entity>
```
### **Speed:**
- `speed`: Base flying speed (default value: `4`).
- `rotationSpeed`: Turning speed (default value: `40`).
```html
<a-entity
  fly="
    speed: 4; 
    rotationSpeed: 40;
  "
></a-entity>
```

### **Controls:**
- `keyUp`: Key for moving forward/up (default value: `w`).
- `keyDown`: Key for moving backward/down (default value: `s`).
- `keyLeft`: Key for moving left (default value: `a`).
- `keyRight`: Key for moving right (default value: `d`).
```html
<a-entity
  fly="
    keyUp: w;
    keyDown: s;
    keyLeft: a;
    keyRight: d;
 "
></a-entity>
```
Only for `freeDirectionalFlight` type:
- `keyAscend`: Key for moving upward while flying (default value: ` `).
- `keyDescend`: Key for moving downward while flying (default value: `c`).
```html
<a-entity
  fly="
    keyAscend: space;
    keyDescend: c;
 "
></a-entity>
```

### **Sprint:**
- `sprint`: Enables sprinting (default value: `false`).
- `sprintSpeed`: Speed while sprinting (default value: `10`).
- `keySprint`: Key for sprinting (default value: `shift`).
```html
<a-entity
  fly="
    sprint: true;
    keySprint: shift;
    sprintSpeed: 10;
 "
></a-entity>
```

### **Animations:**
- `flyClipName`: Animation name for flying (default value: `*Flying*`).
- `idleClipName`: Animation name for idle (default value: `*Flying_Idle*`).
```html
<a-entity
  fly="
    flyClipName: Flying;
    idleClipName: Flying_Idle;   
 "
></a-entity>
```
- `sprintClipName`: Animation name for sprinting (default value: `*Fast_Flying*`).
   - NOTE: You need to enable `sprint` (default value is `false`).
```html
<a-entity
  fly="
    sprint: true;
    sprintClipName: Fast_Flying;
 "
></a-entity>
```
### **Flight Dynamics (Pitch & Roll):**
#### Pitch
- `allowPitch`: Enables tilting up/down (default value: `true`).
```html
<a-entity
  fly="
    allowPitch: true;
 "
></a-entity>
```
- `maxPitchDeg`: Maximum pitch angle in degrees (default value: `20`).
- `pitchSpeed`: How fast the pitch angle changes (default value: `60`).
```html
<a-entity
  fly="
    maxPitchDeg: 20;
    pitchSpeed: 60;
 "
></a-entity>
```
- `autoLevelPitch`: Automatically returns pitch to a neutral position (default value: `true`).
  - NOTE: Only `autoForward` flight type can have the false value for `autoLevelPitch`. For other flight types, the auto-leveling is always enabled.
```html
<a-entity
  fly="
    type: autoForward;
    autoLevelPitch: false; 
 "
></a-entity>
```
#### Roll
- `allowRoll`: Enables banking left/right (default value: `true`).
```html
<a-entity
  fly="
    allowRoll: true;
 "
></a-entity>
```
- `maxRollDeg`: Maximum roll angle in degrees (default value: `20`).
- `rollSpeed`: How fast the roll angle changes (default value: `60`).
```html
<a-entity
  fly="
    maxRollDeg: 25;
    rollSpeed: 80;
 "
></a-entity>
```
- `autoLevelRoll`: Automatically returns roll to a neutral position (default value: `true`).
  - NOTE: Only `autoForward` flight type can have the false value for `autoLevelRoll`. For other flight types, the auto-leveling is always enabled.
```html
<a-entity
  fly="
    type: autoForward;
    autoLevelRoll: false;
 "
></a-entity>
```
### **Gravity:**
- `allowGravity`: Applies gravity when the character is not actively flying (default value: `false`).
   - NOTE: Specific to `freeDirectionalFlight` type.
```html
<a-entity
  fly="
    type: freeDirectionalFlight;
    allowGravity: true;
 "
></a-entity>
```

### **Restrict Movement:**
- `canMoveVertically`: Allows the character to move up and down (default value: `true`).
  - Applies to all flight types. When `false`: `freeDirectionalFlight` disables ascend/descend, `autoForward` holds altitude (no pitch climb), and `autoForwardFixedDirection` disables up/down dodging.
```html
<a-entity
  fly="
    type: autoForwardFixedDirection;
    canMoveVertically: false; 
 "
></a-entity>
```
- `canMoveHorizontally`: Allows the character to move/turn left and right (default value: `true`).
   - Applies to all flight types. When `false`: `freeDirectionalFlight` and `autoForward` disable left/right turning, and `autoForwardFixedDirection` disables left/right dodging. Forward locomotion is preserved.
```html
<a-entity
  fly="
    type: autoForwardFixedDirection;
    canMoveHorizontally: false; 
 "
></a-entity>
```

### **Fix Orientation:**
- `forwardOffsetAngle`: Applies an angle correction to fix the model's forward orientation (default value: `0`).
```html
<a-entity
  fly="
    forwardOffsetAngle: 90;
 "
></a-entity>
```

## Scene setup
Use parent (logic) + child (visual). Read more about the [parent-child structure](#parent-child-structure-).

```js
import "spatial-design-system/components/game/fly.js";
```

```html
<a-scene>
   <a-entity
      id="dragon-character"
      
      fly="
         type: freeDirectionalFlight;
         rotationSpeed: 60;
         flyClipName: Flying;
         idleClipName: Flying_Idle;   
      "
      
      position="0 0.2 0"
      rotation="0 180 0"
      ammo-body="type: dynamic; angularFactor: 0 0 0; mass: 20; activationState: disableDeactivation">
      <a-entity
              gltf-model="#dragon"
              ammo-shape="type: hull;"
              position="0 -1.7 0"
              scale="1 1 1">
      </a-entity>
   </a-entity>
</a-scene>
```
Tip: Use id for camera targeting ([game-view](game-view.md)).

## freeDirectionalFlight
The `freeDirectionalFlight` mode is designed to simulate freely flying creatures, such as birds or dragons, by allowing movement in all directions. Horizontal navigation is defined by the `keyUp`, `keyDown`, `keyLeft`, and `keyRight` properties.
Vertical movement is explicitly controlled through the `keyAscend` and `keyDescend` properties, allowing the player to climb or dive.

By setting the `allowGravity` property to `true`, the character will be affected by gravity and sink when no upward input is provided. Additionally, the player can increase flight velocity by setting the `sprint` property to `true` and defining the boost behavior via the `keySprint` and `sprintSpeed` properties.

```html
<a-entity
   fly="
      type: freeDirectionalFlight;
   "
></a-entity>
```

You can customize the movement controls using the `keyUp`, `keyDown`, `keyLeft`, `keyRight`, `keyAscend`, and `keyDescend` properties. The default values are `w`, `s`, `a`, `d`, `space`, and `c`, respectively.
```html
<a-entity
  fly="
    type: freeDirectionalFlight;
    keyUp: arrowup;
    keyDown: arrowdown;
    keyLeft: arrowleft;
    keyRight: arrowright;
    keyAscend: space;
    keyDescend: shift;
 "
></a-entity>
```

The base flying speed is defined by the `speed` property, while the turning speed can be adjusted using `rotationSpeed`.
```html
<a-entity
  fly="
    type: freeDirectionalFlight;
    speed: 5; 
    rotationSpeed: 60;
 "
></a-entity>
```

Sprinting can be enabled by setting `sprint` to true, allowing the character to move faster while holding the sprint key (`keySprint`). The sprint speed is controlled by the `sprintSpeed` property.
```html
<a-entity
  fly="
    type: freeDirectionalFlight;
    sprint: true;
    keySprint: shift;
    sprintSpeed: 10;
 "
></a-entity>
```

This mode also supports optional gravity. When `allowGravity` is set to true, the character will be affected by gravity while not flying. Gravity is disabled by default.
```html
<a-entity
  fly="
    type: freeDirectionalFlight;
    allowGravity: true;
 "
></a-entity>
```

For more realistic flight behavior, **pitch** and **roll** are enabled by default. You can adjust their limits and speed using the `maxPitchDeg`, `pitchSpeed`, `maxRollDeg`, and `rollSpeed` properties.
The pitch and roll are in this flying mode automatically leveled back to neutral position. The pitch and roll is enabled by default, but you can disable them by setting the `allowPitch` and `allowRoll` properties to `false`.
```html
<a-entity
  fly="
    type: freeDirectionalFlight;
    allowPitch: true;
    maxPitchDeg: 30;
    pitchSpeed: 120;
    allowRoll: true;
    maxRollDeg: 25;
    rollSpeed: 80;
 "
></a-entity>
```

You can restrict movement directions with `canMoveVertically` and `canMoveHorizontally`. In this mode, setting `canMoveVertically: false` disables ascend/descend, and `canMoveHorizontally: false` disables left/right turning (forward/backward movement is preserved).
```html
<a-entity
  fly="
    type: freeDirectionalFlight;
    canMoveVertically: false;
    canMoveHorizontally: false;
 "
></a-entity>
```

## autoForward
The `autoForward` mode simulates aircraft-style flight where the character moves forward automatically at a constant speed defined by the `speed` property, while the player controls pitch and roll to steer.


```html
<a-entity
  fly="
     type: autoForward;
  "
></a-entity>
```

You can customize the control keys using the `keyUp`, `keyDown`, `keyLeft` and `keyRight` properties.
```html
<a-entity
  fly="
    type: autoForward;
    keyUp: arrowup;
    keyDown: arrowdown;
    keyLeft: arrowleft;
    keyRight: arrowright;
 "
></a-entity>
```

The forward flight speed is set with the `speed` property, and the turning speed can be adjusted using `rotationSpeed`.
```html
<a-entity
  fly="
    type: autoForward;
    speed: 5; 
    rotationSpeed: 500;
 "
></a-entity>
```

Pitch and roll behavior is enabled by default to make flight feel more realistic. You can fine-tune it using the `maxPitchDeg`, `pitchSpeed`, `maxRollDeg`, and `rollSpeed` properties. If needed, you can disable pitch and/or roll entirely by setting `allowPitch` and `allowRoll` to `false`.
```html
<a-entity
  fly="
    type: autoForward;
    allowPitch: true;
    maxPitchDeg: 30;
    pitchSpeed: 120;
    allowRoll: true;
    maxRollDeg: 25;
    rollSpeed: 80;
 "
></a-entity>
```

By default, the character automatically levels back to a neutral pitch and roll over time. This auto-leveling can be disabled using the `autoLevelPitch` and `autoLevelRoll` properties. If the auto-leveling is disabled, the character will maintain its pitch and roll angle until the player changes it again.
```html
<a-entity
  fly="
    type: autoForward;
    allowPitch: true;
    maxPitchDeg: 30;
    pitchSpeed: 120;
    allowRoll: true;
    maxRollDeg: 25;
    rollSpeed: 80;
    autoLevelPitch: false; 
    autoLevelRoll: false;
 "
></a-entity>
```

You can restrict movement directions with `canMoveVertically` and `canMoveHorizontally`. Setting `canMoveVertically: false` keeps the character at a constant altitude (no pitch climb), and `canMoveHorizontally: false` disables left/right turning, so the character keeps flying straight forward.
```html
<a-entity
  fly="
    type: autoForward;
    canMoveVertically: false;
    canMoveHorizontally: false;
 "
></a-entity>
```

## autoForwardFixedDirection
The `autoForwardFixedDirection` mode is similar to autoForward, but the character always flies forward in a fixed direction. The player can only make minor horizontal or vertical adjustments (dodging left/right or up/down), but the character’s orientation does not change.

```html
<a-entity
  fly="
     type: autoForwardFixedDirection;
     forwardOffsetAngle: 0;
     maxRollDeg: 15;
     rollSpeed: 60;
     canMoveVertically: false;
  "
></a-entity>
```

You can customize the control keys using the `keyUp`, `keyDown`, `keyLeft` and `keyRight` properties.
```html
<a-entity
  fly="
    type: autoForwardFixedDirection;
    keyUp: arrowup;
    keyDown: arrowdown;
    keyLeft: arrowleft;
    keyRight: arrowright;
 "
></a-entity>
```

The forward speed is set with the `speed` property.
```html
<a-entity
  fly="
    type: autoForwardFixedDirection;
    speed: 5; 
 "
></a-entity>
```

Pitch and roll are enabled by default for a more dynamic feel, and can be configured using `maxPitchDeg`, `pitchSpeed`, `maxRollDeg`, and `rollSpeed`. When the player releases the movement keys, the pitch and roll automatically return to a neutral position. If you don’t want pitch or roll to be applied, you can disable them using the `allowPitch` and `allowRoll` properties.
```html
<a-entity
  fly="
    type: autoForwardFixedDirection;
    maxPitchDeg: 30;
    pitchSpeed: 120;
    maxRollDeg: 25;
    rollSpeed: 80;
 "
></a-entity>
```

You can also restrict movement entirely on one axis:
- Set `canMoveHorizontally` to `false` to disable left/right dodging.
- Set `canMoveVertically` to `false` to disable up/down movement.
```html
<a-entity
  fly="
    type: autoForwardFixedDirection;
    canMoveVertically: false; 
 "
></a-entity>
```

## allowPitch and allowRoll
To make the flight feel more natural, the `fly` component includes pitch and roll mechanics.

**Pitch** controls the up-and-down tilt of the character. 
It is enabled by default, but you can disable it by setting the `allowPitch` property to false. 
Use the `maxPitchDeg` property to define the maximum pitch angle, and `pitchSpeed` to control how quickly the pitch changes.
```html
<a-entity
  fly="
    maxPitchDeg: 30;
    pitchSpeed: 120;
 "
></a-entity>
```

**Roll** controls the left-and-right banking motion. 
It is also enabled by default, but you can disable it by setting the `allowRoll` property to false. 
Use the `maxRollDeg` property to set the maximum roll angle, and `rollSpeed` to adjust how fast the roll responds.
```html
<a-entity
  fly="
    maxRollDeg: 25;
    rollSpeed: 80;
 "
></a-entity>
```

By default, when the player releases the movement keys, both pitch and roll automatically return to a neutral position. 
In the `autoForward` flying type, you can turn off this auto-leveling behavior by setting the `autoLevelPitch` and `autoLevelRoll` properties to `false`. 
When auto-leveling is disabled, the character will keep its current pitch and roll angles until the player changes them again using the control keys.
```html
<a-entity
  fly="
    autoLevelPitch: false; 
    autoLevelRoll: false;
 "
></a-entity>
```

## forwardOffsetAngle
In some 3D models, the visual forward direction (the way the model appears to face) may not align with its logical forward axis (the direction considered "forward" in the game world). 
This misalignment can lead to confusion when controlling the character, as the movement direction may not match the player's expectations based on the model's appearance. 
To fix this, you can use the `forwardOffsetAngle` property.

The `forwardOffsetAngle` property allows you to specify an angular offset (in degrees) that defines how much the model’s logical forward direction differs from its visual forward axis. 
By setting this property, you can ensure that when the player moves the character forward, it moves in the direction that visually makes sense based on the model's orientation. 

For example, imagine you have a plane model placed in the game world. 
When you press the forward movement key, you expect the plane to fly in the direction it’s visually facing. 
However, it moves sideways, behind the left wing instead. 
To fix this, set the `forwardOffsetAngle` to 90 (or -270) degrees to align the logical forward movement with the plane’s visual direction.
```html
<a-entity
  fly="
    forwardOffsetAngle: 90;
 "
></a-entity>
```

## Parent-child structure 
To ensure stable flight and proper physics interaction, we recommend using a parent-child entity structure. This separates the physics "hitbox" from the visual model and its rotations.

**Parent Entity (The Logic)**:
- Holds the `fly` component and the `ammo-body`.
- Set `angularFactor: 0 0 0` to prevent the physics engine from causing the character to tumble or roll upon collision.
- Use `activationState: disableDeactivation` to ensure the character remains responsive even when hovering in place.
- - **Camera usage**: Assign a unique id (e.g., `id="fox-character"`). This ID is required for the camera to identify and follow the player. For more details on setting up the follow behavior of the camera, please refer to the [game-view](game-view.md) documentation.

**Child Entity (The Visual)**:
- Contains the `gltf-model` and the `ammo-shape`.
- Adjust the child's position to ensure the model is centered correctly within the parent's physics body.


```html
<a-scene>
   <a-entity
      id="dragon-character"
      fly="
         type: freeDirectionalFlight;
         rotationSpeed: 60;
         flyClipName: Flying;
         idleClipName: Flying_Idle;   
      "
      position="0 0.2 0"
      rotation="0 180 0"
      ammo-body="type: dynamic; angularFactor: 0 0 0; mass: 20; activationState: disableDeactivation">
      <a-entity
              gltf-model="#dragon"
              ammo-shape="type: hull;"
              position="0 -1.7 0"
              scale="1 1 1">
      </a-entity>
   </a-entity>
</a-scene>
```

## Props

| Property | Type                                                                 | Default | Description                                                                                                                                                                                                                                                                                                                                   | Flying type                        |
| :--- |:---------------------------------------------------------------------| :--- |:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:-----------------------------------|
| _idleClipName_ | string                                                               | Flying_Idle | Name of the animation clip used when the character is idle.                                                                                                                                                                                                                                                                                   | All types                          |
| _flyClipName_ | string                                                               | Flying | Name of the animation clip used when the character is flying.                                                                                                                                                                                                                                                                                 | All types                          |
| _sprintClipName_ | string                                                               | Fast_Flying | Name of the animation clip used when the character is sprinting.                                                                                                                                                                                                                                                                              | All types                          |
| _keyUp_ | string                                                               | w | Key used to move the character forward/up.                                                                                                                                                                                                                                                                                                    | All types                          |
| _keyDown_ | string                                                               | s | Key used to move the character backward/down.                                                                                                                                                                                                                                                                                                 | All types                          |
| _keyLeft_ | string                                                               | a | Key used to move the character left.                                                                                                                                                                                                                                                                                                          | All types                          |
| _keyRight_ | string                                                               | d | Key used to move the character right.                                                                                                                                                                                                                                                                                                         | All types                          |
| _keyAscend_ | string                                                               | Space | Key used to move the character upward while flying.                                                                                                                                                                                                                                                                                           | freeDirectionalFlight              |
| _keyDescend_ | string                                                               | c | Key used to move the character downward while flying.                                                                                                                                                                                                                                                                                         | freeDirectionalFlight              |
| _allowGravity_ | boolean                                                              | false | If true, gravity affects the character when not flying.                                                                                                                                                                                                                                                                                       | freeDirectionalFlight              |
| _speed_ | number                                                               | 4 | Defines the player's base flying speed.                                                                                                                                                                                                                                                                                                       | All types                          |
| _rotationSpeed_ | number                                                               | 40 | Defines the turning speed.                                                                                                                                                                                                                                                                                                                    | freeDirectionalFlight, autoForward |
| _sprint_ | boolean                                                              | false | If true, the player can sprint when holding the sprintKey, increasing their speed to sprintSpeed.                                                                                                                                                                                                                                             |  All types              |
| _keySprint_ | string                                                               | shift | Key used to sprint with the character.                                                                                                                                                                                                                                                                                                        |  All types              |
| _sprintSpeed_ | number                                                               | 10 | Defines the sprinting speed when the sprint mode is active.                                                                                                                                                                                                                                                                                   |  All types              |
| _type_ | enum (freeDirectionalFlight, autoForward, autoForwardFixedDirection) | freeDirectionalFlight | freeDirectionalFlight, autoForward, autoForwardFixedDirection. Defines the flying mode and how the player turns the character.                                                                                                                                                                                                                | All types                          |
| _allowPitch_ | boolean                                                              | true | If true, the player can tilt the model up and down (change pitch).                                                                                                                                                                                                                                                                            | All types                          |
| _autoLevelPitch_ | boolean                                                              | true | Determines whether the model automatically returns its pitch to a neutral (level) position after being tilted up or down. Only autoForward flight type can have the false value.                                                                                                                                                              | autoForward                        |
| _maxPitchDeg_ | number                                                               | 20 | Maximum pitch angle in degrees the character can tilt up or down.                                                                                                                                                                                                                                                                             | All types                          |
| _pitchSpeed_ | number                                                               | 60 | How fast the pitch angle changes when the player tilts up or down.                                                                                                                                                                                                                                                                            | All types                          |
| _allowRoll_ | boolean                                                              | true | If true, the player can roll the model left or right (bank sideways).                                                                                                                                                                                                                                                                         | All types                          |
| _autoLevelRoll_ | boolean                                                              | true | Determines whether the model automatically returns its roll (bank angle) to a neutral, level position after being tilted left or right. Only autoForward flight type can have the false value.                                                                                                                                                | autoForward                        |
| _maxRollDeg_ | number                                                               | 20 | Maximum roll angle in degrees the character can tilt left or right.                                                                                                                                                                                                                                                                           | All types                          |
| _rollSpeed_ | number                                                               | 60 | How fast the roll angle changes when the player banks left or right.                                                                                                                                                                                                                                                                          | All types                          |
| _forwardOffsetAngle_ | number                                                               | 0 | The angular offset (in degrees) that defines how much the model’s logical forward direction differs from its visual or model-space forward axis. In other words, it specifies how far the character’s or object’s “forward” (as understood by the user or game logic) is rotated relative to the model’s default orientation in the 3D scene. | All types                          |
| _canMoveVertically_ | boolean                                                              | true | If false, the character cannot move up/down (ascend/descend, pitch climb, or vertical dodging).                                                                                                                                                                                                                                              | All types                          |
| _canMoveHorizontally_ | boolean                                                              | true | If false, the character cannot move/turn left and right.                                                                                                                                                                                                                                                                                     | All types                          |


## Events

The `fly` component emits the following events on key movement interactions, so other
components can react to flight:

| Event              | Parameters                                                  | Description                                                      |
| ------------------ | ---------------------------------------------------------- | ---------------------------------------------------------------- |
| _fly-move-start_   | `{ direction: string, speed: number, rotationSpeed?: number }` | Emitted when the character starts moving. `direction` is one of `forward`, `backward`, `left`, `right`, `ascend`, or `descend`. `rotationSpeed` is included when turning (`left` / `right`). |
| _fly-move-stop_    | `{ direction: string }`                                    | Emitted when movement in a given direction stops.               |
| _fly-sprint-start_ | `{ speed: number }`                                        | Emitted when sprinting begins. Returns the sprint speed.        |
| _fly-sprint-stop_  | -                                                          | Emitted when sprinting ends.                                    |

::: tip Note
You can listen to these events to drive animations, sounds, or UI from flight movement.

```js
el.addEventListener("fly-move-start", (event) => {
  console.log(event.detail.direction, event.detail.speed);
});
```
:::

## Credits & 3D Models Attribution

The project utilizes 3D assets from [Poly.pizza](https://poly.pizza/). Below is the attribution for each model used in the games.

### Creative Commons Attribution (CC BY)
*The following models require attribution to the original creator as per the [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) license.*

| Model Name | Author |
| :--- | :--- |
| [**Earth**](https://poly.pizza/m/1I5ip-3VOfv), [**Venus**](https://poly.pizza/m/6V99ow0chMd), [**Moon**](https://poly.pizza/m/9OPocAqXM0u), [**Mars**](https://poly.pizza/m/5_IXgyZ8cz_), [**Island**](https://poly.pizza/m/bzLVwG4AzvA), [**Volcano**](https://poly.pizza/m/dwSigTeSMCo), [**Paper airplane**](https://poly.pizza/m/75WQH5E29tF) | Poly by Google |
| [**Spaceship**](https://poly.pizza/m/5nWeu4IQXVX) | Liz Reddington |
| [**Sun**](https://poly.pizza/m/7diieNtphvD) | Zoe XR |
| [**Island**](https://poly.pizza/m/C03O8OQq6O) | J-Toastie |
| [**Mountain**](https://poly.pizza/m/6qp53W5djC5) | Servin Nissen |
| [**Tree Assets**](https://poly.pizza/m/eLqmfpqu_Ig) | Ben Desai |

### Public Domain (CC0)
*The following models are provided under the [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) license (Public Domain).*

| Model Name | Author |
| :--- | :--- |
| [**Spaceship**](https://poly.pizza/m/uCeLfsdmNP), [**Planet** (Jupiter)](https://poly.pizza/m/9g1aIbfR9Y), [**Planet** (Saturn)](https://poly.pizza/m/IVnmauIgWX), [**Demon**](https://poly.pizza/m/Mo2ky6vkf8), [**Tribal**](https://poly.pizza/m/t91lDHaqRW), [**Yeti**](https://poly.pizza/m/xtMYEVzyw0), [**Dragon**](https://poly.pizza/m/VBvzjFIYws), [**Dock**](https://poly.pizza/m/XViKoBh2UN), [**Fox**](https://poly.pizza/m/Bc97C66HKi), [**Rock**](https://poly.pizza/m/4MUaQTcDdc) | Quaternius |