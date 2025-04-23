---
title: ar-placement-utils
---

# ar-placement-utils

The `ar-placement-utils.js` file provides a comprehensive set of utility functions for AR object placement. It handles surface detection, validation, orientation, and placement of objects in augmented reality experiences.

## Overview

This utility is designed to work with the A-Frame AR ecosystem, particularly with the `place-object` and `place-object-manager` components. It provides consistent handling of:

- Surface type detection (floor, wall, ceiling)
- Surface validation
- Object orientation and rotation
- Placement logistics for different surface types

## Core Functions

### Surface Detection

```javascript
// Detect the type of surface from a hit test result
const surfaceType = ARPlacementUtils.detectSurfaceType(hitMesh);
// Returns: "floor", "wall", "ceiling", or "unknown"
```

The detection uses surface normal to determine the type:
- **floor**: Surfaces with normal pointing upward (y > 0.85)
- **wall**: Surfaces with near-horizontal normal (|y| < 0.15)
- **ceiling**: Surfaces with normal pointing downward (y < -0.85)

### Surface Validation

```javascript
// Check if a surface is valid for placement
const isValid = ARPlacementUtils.isSurfaceValid(
  hitMesh,
  ["horizontal", "wall"]  // Allowed surface types
);

// Validate height constraints
const isHeightValid = ARPlacementUtils.isHeightValid(
  hitMesh,
  { x: 0.3, y: 2.0 }  // Min/max height range
);

// Validate distance from camera
const isDistanceValid = ARPlacementUtils.isDistanceValid(
  hitMesh,
  camera,
  { x: 0.5, y: 5.0 }  // Min/max distance range
);
```

### Placement

The main placement function handles all the complexity of placing objects on different surface types:

```javascript
ARPlacementUtils.placeObject(entity, hitMesh, {
  isPoster: false,           // Is it a flat object like a poster/image?
  adjustOrientation: true,   // Should orientation be adjusted to surface?
  faceCamera: true,          // Should object face the camera?
  scale: 1.0,                // Scale factor
  camera: cameraEntity,      // Camera reference
  customRotation: { x: 0, y: 45, z: 0 }  // Custom rotation in degrees
});
```

## Placement Behavior By Surface Type

The utility handles different placement scenarios based on surface type:

### Floor Placement

- **Regular Objects**: Placed upright on the floor
- **Posters**: Laid flat on the floor, optionally oriented toward the camera

### Wall Placement

- **Regular Objects**: Placed "standing" on the wall, facing outward
- **Posters**: Mounted flat against the wall with top pointing up

### Ceiling Placement

- **Regular Objects**: Attached to ceiling, facing downward
- **Posters**: Attached flat to ceiling, optionally oriented toward the camera

## Implementation Details

### Surface Normal Calculation

```javascript
// Get the surface normal from a hit mesh
const normal = ARPlacementUtils.getSurfaceNormal(hitMesh);
```

The normal vector is crucial for determining surface type and orientation.

### Rotation Handling

```javascript
// Reset rotation to identity
ARPlacementUtils.resetRotation(entity);

// Apply custom rotation in degrees
ARPlacementUtils.applyCustomRotation(entity, { x: 0, y: 90, z: 0 });
```

## Usage Example

```javascript
// When an AR hit test result is available
function onHitResult(hitTestResult) {
  // First validate the surface
  if (ARPlacementUtils.isSurfaceValid(hitTestResult, ["horizontal", "wall"]) &&
      ARPlacementUtils.isHeightValid(hitTestResult, { x: 0.3, y: 1.8 })) {

    // Get surface type
    const surfaceType = ARPlacementUtils.detectSurfaceType(hitTestResult);

    // Place the object
    ARPlacementUtils.placeObject(myEntity, hitTestResult, {
      isPoster: surfaceType === "wall",  // Treat as poster on walls
      faceCamera: true,
      camera: sceneCamera,
      customRotation: { x: 0, y: 0, z: 0 }
    });
  }
}
```

## Integration with place-object Components

This utility is used internally by both:

- [`place-object`](/ar-vr-components/place-object): For individual object placement
- [`place-object-manager`](/ar-vr-components/place-object-manager): For managing placed objects

The shared utility ensures consistent placement behavior across the entire AR placement system.
