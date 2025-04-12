---
title: place-object-manager
---

# place-object-manager

The `place-object-manager` component provides scene-level management for AR object placement. It tracks placed objects, shows placement previews, visualizes hit test results, and offers methods to manage the objects.

## Props

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| *enabled* | boolean | true | Whether the manager is currently active |
| *maxObjects* | number | 10 | Maximum number of objects that can be placed |
| *showHitTestMarker* | boolean | true | Whether to display the hit test marker |
| *hitTestMarker* | string | `"#ar-hit-test-marker"` | Selector for a custom hit test marker |
| *showPreview* | boolean | true | Whether to show a preview of the object before placement |

## Methods

| Method | Parameters | Description |
| --- | --- | --- |
| *removeAllObjects()* | - | Removes all placed objects from the scene |
| *removeLastObject()* | - | Removes the most recently placed object |

## Events

| Event | Properties | Description |
| --- | --- | --- |
| *object-managed* | `{ action, entity, totalObjects }` | Fired when an object is placed, removed, or all objects are cleared |

## Key Features

### Hit Test Visualization

The component creates a visual marker that shows where AR surfaces are detected:

- A red circular marker appears at hit test locations
- The marker adapts to the orientation of the detected surface
- Customize or disable with `showHitTestMarker` and `hitTestMarker` properties

### Placement Preview

When `showPreview` is enabled:

- A semi-transparent copy of the object to be placed follows the hit test marker
- Shows exactly how the object will be oriented when placed
- Updates in real-time as the user moves around the environment

### Object Management

The component maintains a list of all placed objects and provides:

- Automatic enforcement of `maxObjects` limit
- Methods to remove specific objects or clear all
- Events to notify other components about object management actions

## Usage with place-object

This component is designed to work with the [place-object](/ar-vr-components/place-object) component. While `place-object` handles individual object placement, the manager:

1. Listens for `object-placed` events from `place-object` components
2. Tracks all placed objects in the scene
3. Provides centralized management functions
4. Creates visual feedback for AR hit testing and placement

For a complete AR placement system, use both components together as shown in the [place-object-components](/ar-vr-components/place-object-components) overview.
