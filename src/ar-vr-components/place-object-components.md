---
title: Placing objects in AR
---

# {{ $frontmatter.title }}

The `place-object` components provide a complete system for placing virtual objects in AR environments. The components work together to create an intuitive and consistent object placement experience with advanced features like preview, surface detection, and object management.

## Component Structure

The system consists of three main parts:

1. [**place-object**](/ar-vr-components/place-object) - Component applied to individual objects that users can place
2. [**place-object-manager**](/ar-vr-components/place-object-manager) - Scene-level component that manages all placed objects
3. [**ar-placement-utils**](/ar-vr-components/ar-placement-utils) - Core utility library that handles surface detection, validation, and placement logic

This modular design provides a consistent placement experience while allowing flexibility in how the system is used.

## Basic Example

Here's a simple example of the complete AR placement system:

```html
<a-scene webxr="optionalFeatures: hit-test">
  <!-- Place object manager to handle hit testing and object tracking -->
  <a-entity place-object-manager="maxObjects: 10; showPreview: true"></a-entity>

  <!-- Placeable object template -->
  <a-entity
    id="chair-template"
    gltf-model="#chair-model"
    place-object="
      surfaceTypes: horizontal;
      scale: 0.5;
      faceCamera: true"
    visible="false">
  </a-entity>
</a-scene>
```

## End-to-End Placement Flow

1. **Setup**:
   - `place-object-manager` initializes AR hit testing
   - `place-object` components are applied to template objects (usually hidden)

2. **Detection**:
   - User points device at real-world surfaces
   - WebXR hit test API detects surfaces
   - `place-object-manager` shows hit test marker at detected points

3. **Preview**:
   - Manager creates semi-transparent copy of template object
   - Preview follows hit test position
   - `ARPlacementUtils` positions preview correctly based on surface type

4. **Placement**:
   - User taps to place (triggers WebXR "select" event)
   - `place-object` validates surface and creates a copy of the template
   - `ARPlacementUtils` handles proper positioning and orientation
   - `place-object-manager` adds object to its tracking list

5. **Management**:
   - `place-object-manager` provides methods to remove objects
   - Enforces maximum object limit
   - Fires events when objects are placed or removed

## Supported Surface Types

The system can detect and place objects on three types of surfaces:

- **Horizontal** (floors, tables): Detected when surface normal points upward
- **Wall** (vertical surfaces): Detected when surface normal is near-horizontal
- **Ceiling** (overhead surfaces): Detected when surface normal points downward

## Special Placement Modes

### Regular Object Placement

Standard 3D models are positioned appropriately for each surface:
- On floors: Upright, optionally facing the camera
- On walls: "Standing" on the wall, facing outward
- On ceilings: Attached upside-down

## Advanced Features

### Custom Rotation

After basic placement, you can apply custom rotation in degrees:

```html
<a-entity
  place-object="customRotation: 0 45 0"
  visible="false">
</a-entity>
```

### Multi-Surface Support

Allow placement on multiple surface types:

```html
<a-entity
  place-object="surfaceTypes: horizontal, wall"
  visible="false">
</a-entity>
```

### Object Management

Access and manage placed objects programmatically:

```javascript
const manager = document.querySelector('[place-object-manager]').components['place-object-manager'];

// Clear all objects
manager.removeAllObjects();

// Remove most recent object
manager.removeLastObject();

// Check how many objects have been placed
console.log(manager.placedObjects.length);
```

## Technical Implementation

The system uses a shared utility (`ARPlacementUtils`) to ensure consistent placement behavior across components. This approach:

- Maintains consistent positioning logic
- Centralizes complex calculations
- Makes the system easier to extend
- Ensures the preview matches the final placement

## Usage Tips

1. **Template Setup**: Keep template objects hidden (`visible="false"`)
2. **Scene Configuration**: Ensure WebXR is configured with `hit-test` feature
3. **Surface Filtering**: Use `surfaceTypes` to restrict where objects can be placed
4. **Preview**: Enable `showPreview` for better user experience
5. **Object Limits**: Set appropriate `maxObjects` to manage scene complexity
6. **Event Handling**: Listen for `object-placed` and `object-managed` events

For more detailed information on each component, see their individual documentation pages.
