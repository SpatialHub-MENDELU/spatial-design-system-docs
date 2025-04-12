---
title: follow-element
---

# follow-element

The `follow-element` component makes an entity follow a target entity's position with an offset. This is useful for creating UI elements, labels, or controls that need to stay near another object in the scene.

## Props

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| *place* | vec3 | `{x: 1, y: 0, z: 0}` | Direction vector from target to position the entity. Values: -1, 0, or 1 for each axis |
| *offset* | number | 1 | Distance from the target's border in the direction specified by `place` |
| *target* | selector | null | Target entity to follow (must be specified) |
| *duration* | number | 0 | Duration of position animation in milliseconds (0 means immediate) |

## How It Works

1. The component calculates the proper offset position based on the target's current position and size
2. When the target moves or changes size, the following entity smoothly animates to the new position
3. The `place` property determines which side of the target the entity will follow:
   - `{x: 1, y: 0, z: 0}` positions to the right of the target
   - `{x: -1, y: 0, z: 0}` positions to the left of the target
   - `{x: 0, y: 1, z: 0}` positions above the target
   - Multiple axes can be combined (e.g., `{x: 1, y: 1, z: 0}` for top-right)

## Examples

### Basic Usage

This example positions a label to the right of a box:

```html


```

### Multiple Following Elements

You can have multiple entities follow the same target from different positions:

```html










```

### Smooth Animation

Add animation duration for smoother transitions:

```html


```

## Use Cases

- **UI Elements**: Attach buttons, sliders, or controls to objects in the scene
- **Labels**: Create labels that stay next to objects as they move
- **Tooltips**: Show information about objects when needed
- **Contextual Menus**: Position context menus relative to selected objects
- **Grouping Objects**: Create visual relationships between related entities

## Notes

- The component automatically handles changes to the target's size (e.g., when models are loaded)
- If the target is not found, a warning is logged to the console
- For dynamic objects, the component will continuously update the follower's position during the `tick` function
