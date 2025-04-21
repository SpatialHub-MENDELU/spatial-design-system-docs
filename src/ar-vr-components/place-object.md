---
title: place-object
---

# place-object

The `place-object` component enables objects to be placed in AR environments by tapping on detected real-world surfaces. It uses the shared AR placement utilities to ensure consistent positioning and orientation across different surface types.

## Props

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| *heightRange* | vec2 | `{ x: 0.3, y: 2.0 }` | Min/max height range for valid placement (meters) |
| *surfaceTypes* | array | `["horizontal"]` | Valid surface types: "horizontal", "wall", "ceiling" |
| *distanceRange* | vec2 | `{ x: 0.5, y: 5.0 }` | Min/max distance from camera for valid placement |
| *scale* | number | 1.0 | Scale applied to the placed object |
| *isPoster* | boolean | false | When true, places object flat against surfaces |
| *adjustOrientation* | boolean | true | Adjust orientation based on surface type (Object will be placed the same relatively to the surface angle) |
| *customRotation* | vec3 | `{ x: 0, y: 0, z: 0 }` | Custom rotation in degrees applied after placement |
| *faceCamera* | boolean | true | Orient the object toward the camera |

## Events

| Event | Properties | Description |
| --- | --- | --- |
| *object-placed* | `{ entity, position, orientation }` | Fired when an object is successfully placed |

## Usage

Apply the component to an object that you want users to be able to place in AR:

```html
<a-entity
  gltf-model="#chair-model"
  place-object="
    surfaceTypes: horizontal;
    isPoster: false;
    scale: 0.5;
    faceCamera: true;
    customRotation: 0 45 0"
  visible="false">
</a-entity>
```

The original entity acts as a template and should typically be hidden (`visible="false"`).

## How It Works

1. When a user taps on an AR surface (a "select" event in WebXR):
   - The component checks if the hit surface is valid using `ARPlacementUtils.isSurfaceValid()`
   - It validates height and distance constraints
   - If valid, it creates a copy of the template object
   - The copy is positioned and oriented using `ARPlacementUtils.placeObject()`
   - The copy is added to the scene and an event is fired

## Surface Types and Orientation

The component supports different surface types with appropriate orientation for each:

### Horizontal Surfaces (Floors/Tables)

- Regular objects: Placed upright, optionally facing the camera
- Posters: Laid flat, optionally oriented toward the camera's position

### Wall Surfaces

- Regular objects: "Standing" on the wall, facing outward
- Posters: Mounted flat against the wall with top pointing upward

### Ceiling Surfaces

- Regular objects: Attached to ceiling, upside-down
- Posters: Attached flat against the ceiling

## Custom Rotation

After basic placement, you can apply custom rotation using the `customRotation` property:

```html
<!-- Place a chair rotated 45 degrees around the Y axis -->
<a-entity
  gltf-model="#chair-model"
  place-object="customRotation: 0 45 0"
  visible="false">
</a-entity>
```

## Working with place-object-manager

This component works best with the [`place-object-manager`](/ar-vr-components/place-object-manager) component, which provides:

- Visual hit test markers
- Object placement previews
- Management of multiple placed objects

## Example with Preview and Hit Test Marker

```html
<!-- Scene setup with manager -->
<a-scene webxr="optionalFeatures: hit-test">
  <a-entity place-object-manager="maxObjects: 5; showPreview: true"></a-entity>

  <!-- Placeable chair -->
  <a-entity
    id="chair-template"
    gltf-model="#chair-model"
    place-object="surfaceTypes: horizontal"
    visible="false">
  </a-entity>
</a-scene>
```

## Implementation Details

The `place-object` component uses the shared [`ARPlacementUtils`](/ar-vr-components/ar-placement-utils) to handle surface validation and object placement logic, ensuring consistent behavior across the AR placement system.
