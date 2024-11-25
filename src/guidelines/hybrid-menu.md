---
title: Hybrid menu
---

# {{ $frontmatter.title }}

A special combination of the 3D menu and the 2D menu. First, a 3D menu is displayed in the AR scene.
Later, when the user looks away from the menu, it is replaced by a bottom sheet. Alternatively,
the user may trigger the switch by tapping on a button.

### Use cases

- Immersion is required but not crucial.
- You have technically advanced users capable of switching between 3D and 2D interfaces.
- Users should have option to choose what they prefer.
- Benefits of bottom sheet are crucial for you app, but you do not want to lose immersion.

### Risks

- The transition between 3D and 2D may be very confusing for inexperienced users. <span style="color: red">(bad)</span>
- Some users may want to switch back from bottom sheet to 3D menu, but it may be visually confusing. <span style="color: orange">(not so bad)</span>

### Example

A user points the AR device at a smart light bulb. The AR menu appears with options to change the color, brightness, and
turn the light on and off. The user looks away from the light bulb, and the AR menu is replaced by a bottom sheet with
the same options. It is comfortable for the users because they do not have to hold the device in the air all the time.
However, the transition between the AR menu and the bottom sheet may be confusing for inexperienced users.

### Implementation

We have an experimental component for that. The setup below hides the AR menu when the angle between the AR menu and FOV
is larger than 25 degrees, and shows a bottom sheet with id `bottom-sheet-menu` instead.

```js
import "spatial-design-system/components/experiments.js";
```

```html
<a-ar-menu
  hide-when-leaves-fov="thresholdAngle: 25; switchToBottomSheet: true; bottomSheet: #bottom-sheet-menu;"
  ...
></a-ar-menu>
```
