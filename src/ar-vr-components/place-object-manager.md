---
title: place-object-manager
---

# place-object-manager

The `place-object-manager` component provides scene-level management for AR object placement. It handles hit test visualization, object previewing, and manages the collection of placed objects in the scene.

## Props

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| *enabled* | boolean | true | Whether the manager is currently active |
| *maxObjects* | number | 10 | Maximum number of objects that can be placed |
| *showHitTestMarker* | boolean | true | Whether to display the hit test marker |
| *hitTestMarker* | string | `"#ar-hit-test-marker"` | Selector for a custom hit test marker |
| *showPreview* | boolean | true | Whether to show a preview of the object before placement |

## Methods

| Method | Description |
| --- | --- |
| *removeAllObjects()* | Removes all placed objects from the scene |
| *removeLastObject()* | Removes the most recently placed object |

## Events

| Event | Properties | Description |
| --- | --- | --- |
| *object-managed* | `{ action, entity, totalObjects }` | Fired when an object is placed, removed, or all objects are cleared |

## Key Features

### Hit Test Visualization

The component creates a visual marker that shows where AR hit tests intersect with real-world surfaces:

```html
<!-- Custom hit test marker (optional) -->
<a-entity id="ar-hit-test-marker" visible="false">
  <!-- Marker content defined in place-object-manager component -->
</a-entity>

<!-- Manager with custom marker reference -->
<a-entity place-object-manager="hitTestMarker: #ar-hit-test-marker"></a-entity>
```

The default marker consists of:
- A red circular ring
- A center dot
- Automatic orientation to match the detected surface

### Object Previewing

When `showPreview` is enabled, the manager:

1. Creates a semi-transparent ghost copy of the object to be placed
2. Updates its position and orientation as the user moves
3. Shows exactly how the object will look when placed
4. Uses the same placement logic as the final placement

This provides immediate visual feedback before the user taps to place the object.

### Object Management

The manager keeps track of all objects placed in the scene:

```javascript
// Access the list of placed objects
const placedObjects = document.querySelector('[place-object-manager]').components['place-object-manager'].placedObjects;

// Remove all objects
document.querySelector('[place-object-manager]').components['place-object-manager'].removeAllObjects();

// Remove most recently placed object
document.querySelector('[place-object-manager]').components['place-object-manager'].removeLastObject();
```

It also automatically enforces the `maxObjects` limit, preventing further placements when the limit is reached.

## Implementation Details

The manager handles several responsibilities:

1. **WebXR Setup**: Configures the scene for AR hit testing
2. **Hit Test Visualization**: Creates and updates the hit test marker
3. **Preview Creation**: Generates ghost copies for placement preview
4. **Object Tracking**: Maintains the list of placed objects
5. **Placement Coordination**: Works with `place-object` components via events

It uses the shared [`ARPlacementUtils`](/ar-vr-components/ar-placement-utils) to ensure consistent placement behavior across the entire AR system.

## Object Update Process

For each frame (tick):

1. Gets the current AR hit test result from the scene
2. Updates the hit test marker position and orientation
3. If preview is enabled, updates the preview object to match
4. Both updates use `ARPlacementUtils.placeObject()` for consistent positioning

## Example Setup

```html
<a-scene webxr="optionalFeatures: hit-test">
  <!-- Place object manager configured with options -->
  <a-entity place-object-manager="
    maxObjects: 5;
    showHitTestMarker: true;
    showPreview: true;">
  </a-entity>

  <!-- Placeable object templates -->
  <a-entity
    id="chair"
    gltf-model="#chair-model"
    place-object="surfaceTypes: horizontal"
    visible="false">
  </a-entity>

  <a-entity
    id="poster"
    material="src: #poster-texture"
    geometry="primitive: plane; width: 1; height: 1.4"
    place-object="surfaceTypes: wall, horizontal; isPoster: true"
    visible="false">
  </a-entity>
</a-scene>
```

## Events Usage

Listen for object management events:

```javascript
document.querySelector('[place-object-manager]').addEventListener('object-managed', function(e) {
  console.log('Action:', e.detail.action);
  console.log('Object count:', e.detail.totalObjects);

  // If an object was placed or removed, reference it
  if (e.detail.entity) {
    console.log('Affected entity:', e.detail.entity);
  }
});
```
