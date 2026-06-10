---
title: Table
---

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ComponentExample from "../vue/ComponentExample.vue";

const renderScene = ref(false);

onMounted(async () => {
  try {
    await import("spatial-design-system/primitives/ar-table");
    renderScene.value = true;
  } catch (e) {
    console.error(e);
  }
});
</script>

# {{ $frontmatter.title }}
The table component displays structured data in rows and columns within an AR scene. It can be used to present information such as schedules, lists, key–value pairs, or small datasets.

## Examples

### Basic Table
Below is an example of the table component displaying a simple schedule.  
The `header` property defines the column titles, while the `rows` property provides the table data.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
    <a-ar-table 
        position="0 1.9 -1"
        header="Date, Event, Location, Status"
        rows="2026-03-10, Meeting, Office, Scheduled |
            2026-03-11, Client Call, Online, Confirmed |
            2026-03-12, Meeting, Office, Pending |
            2026-03-13, Workshop, Lab Room, Cancelled"
        color="white"
    ></a-ar-table>
</template>

<template #code>

```js
import "spatial-design-system/primitives/ar-table.js";
```

```html
<a-ar-table 
    position="0 1.9 -1"
    header="Date, Event, Location, Status"
    rows="2026-03-10, Meeting, Office, Scheduled |
          2026-03-11, Client Call, Online, Confirmed |
          2026-03-12, Meeting, Office, Pending |
          2026-03-13, Workshop, Lab Room, Cancelled"
    color="white"
  ></a-ar-table>
```

</template>

</ComponentExample>
</br>

### Compact Table
Following example demonstrates the `compact` density option.  
Using `density="compact"` reduces the vertical spacing between rows, allowing more information to fit into a smaller area.

Also, if a row contains fewer values than the number of columns, the missing cells are automatically filled with `"-"` to preserve the table structure.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
    <a-ar-table 
        position="0 1.8 -1"
        header="Name, Role, Team"
        rows='[
            "Alex, Designer, UX Team",
            "Sam, Manager",
            "Nina, QA Engineer, Testing",
            "Marc, Developer, AR Team"
        ]'
        density="compact"
        color="#FFFFFF"
    ></a-ar-table>
</template>

<template #code>

```js
import "spatial-design-system/primitives/ar-table.js";
```

```html
<a-ar-table 
    position="0 1.8 -1"
    header="Name, Role, Team"
    rows='[
      "Alex, Designer, UX Team",
      "Sam, Manager",
      "Nina, QA Engineer, Testing",
      "Marc, Developer, AR Team"
    ]'
    density="compact"
    color="#FFFFFF"
></a-ar-table>
```
::: tip Note
The `rows` property accepts **multiple input formats**.

In the first example, rows are provided as a **pipe-separated string**, where `|` separates rows and commas separate individual cell values.

In this example, rows are passed as a **JSON array of strings**. Each string represents a row, and the values inside the row are still separated by commas.

Both formats produce the same result, so you can choose the one that best fits your workflow or data source.
:::

</template>

</ComponentExample>
</br>

### Table Without Header
Tables can also be created without the header.  
When the `header` property is not provided, the component determines the number of columns automatically based on the longest row in the `rows` data.
The `color` property can also be used to customize the appearance of the table text and divider lines.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
    <a-ar-table 
        position="0 2 -1"
        rows="Username, Marc |
            Role, Developer |
            Project, AR Framework |
            Status, Active"
        color="#03FCC6"
    ></a-ar-table>
</template>

<template #code>

```js
import "spatial-design-system/primitives/ar-table.js";
```

```html
<a-ar-table 
    position="0 2 -1"
    rows="Username, Marc |
          Role, Developer |
          Project, AR Framework |
          Status, Active"
    color="#03FCC6"
></a-ar-table>
```

</template>

</ComponentExample>

## Props

| Property    | Type                        | Default | Description                                                                                       |
|-------------|-----------------------------|---------|---------------------------------------------------------------------------------------------------|
| _visible_   | boolean                     | true    | Determines whether the table is visible in the scene. |
| _position_  | number[]                    | 0 0 0   | Defines the 3D position of the table in the format `[x, y, z]`. | 
| _opacity_   | number                      | 1       | Sets the transparency level of the table, where `0` is fully transparent and `1` is fully opaque. |      
| _color_     | string                      | "black" | Defines the color of the table text and divider lines. Accepts any valid color value supported by A-Frame (e.g., `"black"`, `"white"`, `"#FF0000"`). |
| _header_   | array                       | []      | Defines the header labels for the table columns. Each item represents the title of a column. The number of titles determines the number of columns __if__ provided. | 
| _rows_      | array/string               | ""      | Defines the table data. Each row represents one table row and contains values for each column. Rows can be provided either as a JSON array of row strings (`["A,B", "C,D"]`) or as a pipe-separated string (`"A,B \| C,D"`). | 
| _density_   | string (default, compact)   |"default"| Controls the vertical spacing between rows. `compact` reduces row height to display more rows in a smaller space, while `default` uses larger spacing for better readability. |
