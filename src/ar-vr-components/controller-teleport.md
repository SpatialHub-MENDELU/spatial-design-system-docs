---
title: controller-teleport
---

# {{ $frontmatter.title }}

The `controller-teleport` component enables instant teleportation in VR by pointing at a destination and pressing a controller button. This provides a comfortable locomotion method that minimizes motion sickness for many users.

## Example

Below is an example of a basic teleportation setup.

```js
import "spatial-design-system/components/controllers.js";
import "spatial-design-system/components/controllerTeleport.js";
```

```html
<a-scene>
  <!-- Simple environment with teleportable surface -->
  <a-sky color="#ECECEC"></a-sky>
  <a-plane position="0 0 0" rotation="-90 0 0" width="20" height="20" 
           color="#7BC8A4" class="interactive"></a-plane>
  
  <!-- Camera rig with controllers and teleport -->
  <a-entity id="rig" position="0 1.6 0" controllers>
    <a-camera></a-camera>
    <a-entity controller-teleport="
      hand: right;
      button: trigger;
      cameraHeight: 1.6;
    "></a-entity>
  </a-entity>
</a-scene>
```

## Props

| Property           | Type    | Default       | Description                                                       |
|--------------------|---------|---------------|-------------------------------------------------------------------|
| _hand_             | string  | "right"       | Which controller to use for teleporting ("left" or "right")       |
| _button_           | string  | "trigger"     | Controller button to activate teleport                            |
| _cameraHeight_     | number  | 1             | Height offset applied after teleporting (in meters)               |
| _interactionClass_ | string  | "interactive" | CSS class that defines teleportable surfaces                      |

## Events

The `controller-teleport` component emits the following event:

| Event        | Parameters                                            | Description                                                      |
| ------------ | ----------------------------------------------------- | ---------------------------------------------------------------- |
| _teleported_ | `{ from: object, to: object, intersection: object }`  | Emitted after a teleport completes. Returns the previous position (`from`), the new position (`to`), and the raycaster `intersection` that was teleported to. |

::: tip Note
Listen for `teleported` to react whenever the player moves to a new location.

```js
el.addEventListener("teleported", (event) => {
  console.log(event.detail.to);
});
```
:::

## Controller Buttons

The following buttons can be configured for teleportation:

| Button Value | Description                       |
|--------------|-----------------------------------|
| "trigger"    | Main trigger button (index finger)|
| "grip"       | Side grip button (middle finger)  |
| "a" / "b"    | Primary buttons on right controller |
| "x" / "y"    | Primary buttons on left controller  |

## Usage Tips

### Making Surfaces Teleportable

For teleportation to work, surfaces must be detectable by the controller's raycaster. Make sure surfaces have the "interactive" class or [vr-interactive](/ar-vr-components/vr-interactive) component:

```html
<a-plane position="0 0 0" rotation="-90 0 0" width="20" height="20" class="interactive"></a-plane>
```

If you want to use a different class name for teleportable surfaces, you can specify it using the `interactionClass` property:

```html
<a-entity controller-teleport="hand: right; interactionClass: teleportable"></a-entity>
<a-plane position="0 0 0" rotation="-90 0 0" width="20" height="20" class="teleportable"></a-plane>
```

### Listening for Teleport Events

You can listen for teleport events to trigger actions when the user teleports:

```js
document.querySelector('[controller-teleport]').addEventListener('teleported', ()=>{
    // Perform actions based on the interaction
});
```

## Combining with Other Movement Options

For maximum accessibility, combine teleportation with smooth locomotion using the [controller-movement](/ar-vr-components/controller-movement) component:

```html
<a-entity id="rig" position="0 1.6 0" controllers>
  <a-camera></a-camera>
  <!-- Smooth movement with left hand -->
  <a-entity controller-movement="mainHand: left"></a-entity>
  <!-- Teleportation with right hand -->
  <a-entity controller-teleport="hand: right"></a-entity>
</a-entity>
```

This allows users to choose their preferred movement method based on comfort preferences.