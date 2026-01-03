---
title: follow-element
---

# follow-element

The `follow-element` component makes an entity dynamically follow another target entity's position with a configurable offset. This is useful for creating UI elements, labels, or controls that need to stay positioned relative to objects in your scene.

## Props

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| *place* | vec3 | `{x: 1, y: 0, z: 0}` | Direction vector from target. Values can be -1 (behind/below/left), 0 (centered), or 1 (ahead/above/right) |
| *offset* | number | 1 | Distance in meters from target's border in the direction specified by `place` |
| *target* | selector | null | Target entity to follow (required) |
| *duration* | number | 0 | Duration of position animation in milliseconds (0 for immediate movement) |

## Example

Basic usage to position a label to the right of a model:

```html
<a-entity id="product-model" gltf-model="#model" position="0 1.5 -3"></a-entity>

<a-plane
  text="value: Product Info; align: center"
  color="#03FCC6"
  width="0.5"
  height="0.3"
  follow-element="
    target: #product-model;
    place: 1 0 0;
    offset: 0.3;
    duration: 300"
></a-plane>
```

## How It Works

The `follow-element` component:

1. Tracks the position and size of the target entity
2. Calculates the appropriate position based on the target's bounding box
3. Automatically handles changes to the target entity's size or position
4. Animates to the new position when the target moves or loads

## Dynamic Calculation

The component performs these calculations in real-time:

1. Gets the target's current position
2. Calculates the target's bounding box to determine its size
3. Applies the `place` vector to determine which side to position on
4. Adds the `offset` distance from the target's border
5. Updates position with animation if the distance changed significantly

## Advanced Usage

### Multiple Following Elements

Place UI elements around a central object:

```html
<a-entity id="central-object" gltf-model="#model" position="0 1.5 -3"></a-entity>

<!-- Above the object -->
<a-entity
  follow-element="target: #central-object; place: 0 1 0; offset: 0.2"
  text="value: Top Label; align: center">
</a-entity>

<!-- To the right of the object -->
<a-entity
  follow-element="target: #central-object; place: 1 0 0; offset: 0.2"
  text="value: Right Label; align: center">
</a-entity>

<!-- Below the object -->
<a-entity
  follow-element="target: #central-object; place: 0 -1 0; offset: 0.2"
  text="value: Bottom Label; align: center">
</a-entity>
```

### Corner Positioning

You can combine multiple directions in the `place` vector:

```html
<!-- Position in the top-right corner -->
<a-entity
  follow-element="target: #central-object; place: 1 1 0; offset: 0.2"
  text="value: Top-Right Corner; align: center">
</a-entity>
```

### Smooth Animation

Add animation duration for smoother transitions:

```html
<a-entity
  follow-element="
    target: #moving-object;
    place: 1 0 0;
    offset: 0.3;
    duration: 500"
  text="value: Smooth Follow; align: center">
</a-entity>
```

## Model Loading Support

The component automatically handles model loading events:

1. Listens for the target's `model-loaded` event
2. Recalculates position when the model loads
3. Updates to account for the model's actual dimensions

This ensures proper placement even when models load after the follower is initialized.

## Implementation Notes

- The component updates every frame in the `tick` method
- Small position changes are ignored to improve performance
- Animations use A-Frame's animation system with the specified duration
- The component cleans up event listeners when removed
