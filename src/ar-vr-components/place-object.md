---
title: place-object
---

# place-object

The `place-object` component enables objects to be placed in an AR environment. It's applied to template objects that users can place by tapping on detected real-world surfaces.

## Props

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| *heightRange* | vec2 | `{ x: 0.3, y: 2.0 }` | Minimum and maximum height range for valid placement (in meters) |
| *surfaceTypes* | array | `["horizontal"]` | Valid surface types for placement: "horizontal", "wall", "ceiling" |
| *adjustOrientation* | boolean | true | Whether to adjust the orientation based on the surface |
| *distanceRange* | vec2 | `{ x: 0.5, y: 5.0 }` | Minimum and maximum distance from camera for valid placement |
| *scale* | number | 1.0 | Scale applied to the placed object |
| *isPoster* | boolean | false | When true, places the object flat against surfaces (like a poster) |

## Events

| Event | Properties | Description |
| --- | --- | --- |
| *object-placed* | `{ entity, position, orientation }` | Fired when an object is successfully placed |

## How It Works

1. When a user taps on an AR surface (a select event in WebXR):
   - The component checks if the hit surface meets the validation criteria
   - If valid, it creates a copy of the template object
   - The copy is positioned and oriented at the hit location
   - The copy is added to the scene and an event is fired

2. The original entity with the `place-object` component:
   - Typically has `visible="false"` to hide it
   - Acts as a template for the placed copies
   - Original object deletion is not currently handled !! When using, it is currently necessary to remove the object, or remove place-object manually. (TODO fix)

## Surface Types

The component can validate and place objects on different surface types:

- **horizontal**: Flat surfaces like floors and tables
- **wall**: Vertical surfaces like walls
- **ceiling**: Upside-down horizontal surfaces

## Placement Modes

Two placement modes are available:

### Standard Placement

Default mode for most 3D objects. Objects maintain their original orientation with minor adjustments:
- On horizontal surfaces: Object is placed with its original orientation
- On vertical surfaces: Object is rotated to face outward from the wall

### Poster Placement (`isPoster: true`)

Ideal for UI elements, menus, images, or any object that should lie flat against a surface:
- On floors: Laid flat with orientation toward the camera
- On walls: Flat against the wall with top pointing up
- On ceilings: Flat against the ceiling with orientation toward the camera

## Working with place-object-manager

For advanced features like placement preview, visual hit-test markers, and managing multiple placed objects, use the `place-object` component in conjunction with the [place-object-manager](/ar-vr-components/place-object-manager) component.
