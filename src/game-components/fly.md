---
title: fly
---

<script setup lang="ts">
  import { ref, onMounted } from "vue";

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
The `fly` component defines the flying behavior of a character in a game. It allows customization of flying styles, including key bindings, speed settings, and flight types. The component also supports realistic flight dynamics through pitch and roll adjustments.

::: warning ⚠️ PHYSICS ENGINE
The _fly_ component relies on the Ammo.js physics engine. Ensure that Ammo.js is installed in your project for proper functionality.
:::

## How it works
1. **Animations:** Set the `flyClipName` and `idleClipName` properties. If you enable sprint, define `sprintClipName`.
2. **Flight Mode:** Choose a `type` that fits your needs: [freeDirectionalFlight](#freedirectionalflight), [autoForward](#autoforward), or [autoForwardFixedDirection](#autoforwardfixeddirection).
3. **Movement Speed**: Control the movement speed and rotation with `speed` and `rotationSpeed`.
4. **Controls:** Customize movement keys `keyUp`, `keyDown`, `keyLeft`, and `keyRight`. For `freeDirectionalFlight`, use `keyAscend` and `keyDescend` to control altitude.
5. **Dynamics:** For more realistic flight, tweak the pitch and roll properties: `maxPitchDeg`, `pitchSpeed`, `maxRollDeg` and `rollSpeed`. When using the `autoForward` type, you can disable `autoLevelPitch` and `autoLevelRoll`.
6. **Sprinting:** Enable `sprint` to allow the character to boost speed using the `keySprint`. Set the sprint speed with `sprintSpeed`.
7. **Gravity**: To let gravity affect the character when not flying, set `allowGravity` to `true`. This works only with the `freeDirectionalFlight` type.
8. **Orientation:** If the model’s visual forward direction doesn’t match its logical forward axis, fix it using [forwardOffsetAngle](#forwardoffsetangle).
9. **Restrict Movement**: In `autoForwardFixedDirection` type, you can restrict vertical or horizontal movement by setting `canMoveVertically` or `canMoveHorizontally` properties to `false`.

## Setting up the scene 
To ensure stable flight and proper physics interaction, we recommend using a parent-child entity structure. This separates the physics "hitbox" from the visual model and its rotations.

**Parent Entity (The Logic)**:
- Holds the `fly` component and the `ammo-body`.
- Set `angularFactor: 0 0 0` to prevent the physics engine from causing the character to tumble or roll upon collision.
- Use `activationState: disableDeactivation` to ensure the character remains responsive even when hovering in place.
- - **Camera usage**: Assign a unique id (e.g., `id="fox-character"`). This ID is required for the camera to identify and follow the player. For more details on setting up the follow behavior of the camera, please refer to the [game-view](game-view.md) documentation.

**Child Entity (The Visual)**:
- Contains the `gltf-model` and the `ammo-shape`.
- Adjust the child's position to ensure the model is centered correctly within the parent's physics body.

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

# Props

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
| _canMoveVertically_ | boolean                                                              | true | When using AutoForwardFixedDirection movement, this property allows the character to move up and down                                                                                                                                                                                                                                         | autoForwardFixedDirection          |
| _canMoveHorizontally_ | boolean                                                              | true | When using AutoForwardFixedDirection movement, this property allows the character to move left and right.                                                                                                                                                                                                                                     | autoForwardFixedDirection          |

## freeDirectionalFlight
The `freeDirectionalFlight` mode is designed to simulate freely flying creatures, such as birds or dragons, by allowing movement in all directions. Horizontal navigation is defined by the `keyUp`, `keyDown`, `keyLeft`, and `keyRight` properties.
Vertical movement is explicitly controlled through the `keyAscend` and `keyDescend` properties, allowing the player to climb or dive.

By setting the `allowGravity` property to `true`, the character will be affected by gravity and sink when no upward input is provided. Additionally, the player can increase flight velocity by setting the `sprint` property to `true` and defining the boost behavior via the `keySprint` and `sprintSpeed` properties.

```html
<a-entity
   fly="
      type: freeDirectionalFlight;
   >
</a-entity>
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
>
</a-entity>
```

The base flying speed is defined by the `speed` property, while the turning speed can be adjusted using `rotationSpeed`.
```html
<a-entity
  fly="
    type: freeDirectionalFlight;
    speed: 5; 
    rotationSpeed: 60;
 "
>
</a-entity>
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
>
</a-entity>
```

This mode also supports optional gravity. When `allowGravity` is set to true, the character will be affected by gravity while not flying. Gravity is disabled by default.
```html
<a-entity
  fly="
    type: freeDirectionalFlight;
    allowGravity: true;
 "
>
</a-entity>
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
>
</a-entity>
```

## autoForward
The `autoForward` mode simulates aircraft-style flight where the character moves forward automatically at a constant speed defined by the `speed` property, while the player controls pitch and roll to steer.


```html
<a-entity
  id="dragon-character"
  fly="
     type: autoForward;
  ">
</a-entity>
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
>
</a-entity>
```

The forward flight speed is set with the `speed` property, and the turning speed can be adjusted using `rotationSpeed`.
```html
<a-entity
  fly="
    type: autoForward;
    speed: 5; 
    rotationSpeed: 500;
 "
>
</a-entity>
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
>
</a-entity>
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
>
</a-entity>
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
>
</a-entity>
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
>
</a-entity>
```

The forward speed is set with the `speed` property.
```html
<a-entity
  fly="
    type: autoForwardFixedDirection;
    speed: 5; 
 "
>
</a-entity>
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
>
</a-entity>
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
>
</a-entity>
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
>
</a-entity>
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
>
</a-entity>
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
>
</a-entity>
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
>
</a-entity>
```