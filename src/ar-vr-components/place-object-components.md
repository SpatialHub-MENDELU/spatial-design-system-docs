---
title: place-object-components
---

# {{ $frontmatter.title }}

The place-object components provide a complete system for placing virtual objects in AR environments. The system consists of two main components and a shared utility library that work together to enable intuitive and consistent object placement.

## System Overview

- [**place-object**](/ar-vr-components/place-object) - Applies to individual objects that can be placed in AR
- [**place-object-manager**](/ar-vr-components/place-object-manager) - Scene-level component that manages all placed objects

Both components use a shared utilities library (`ar-placement-utils`) that provides consistent surface detection, validation, and object positioning.

## Basic Example

Here's a simple example of the place-object components working together:

```js
import "spatial-design-system/components/ar/place-object.js";
import "spatial-design-system/components/ar/place-object-manager.js";
```

```html



```

## How It Works

1. **Surface Detection**: The system uses AR hit testing to detect real-world surfaces
2. **Validation**: Surfaces are validated based on type (horizontal, wall, ceiling), height, and distance
3. **Preview**: A semi-transparent preview shows where the object will be placed
4. **Placement**: When a user taps, a copy of the template object is created and placed at the hit location
5. **Management**: The manager keeps track of all placed objects and provides methods to remove them

## Shared Utility: ar-placement-utils

Both components use a shared utility library that provides:

- **Surface detection**: Determines if a surface is a floor, wall, or ceiling
- **Validation**: Checks if a surface meets the placement criteria
- **Placement logic**: Positions and orients objects consistently on different surface types

This ensures that objects are placed with the same logic whether placed individually or managed as a group.

## Component Relationship

- `place-object`: Applied to template objects that users can place
- `place-object-manager`: Applied to the scene to manage all placed objects
- When a user taps to place an object:
  1. `place-object` creates a copy of its entity
  2. The utility positions and orients the copy
  3. `place-object-manager` tracks the new object and updates the preview

## Detailed Documentation

For more details on individual components:

- [place-object](/ar-vr-components/place-object) - Component for individual placeable objects
- [place-object-manager](/ar-vr-components/place-object-manager) - Manager for placed objects
