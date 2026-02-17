---
title: Dialog
---

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import ComponentExample from "../vue/ComponentExample.vue";

const renderScene = ref(false);

// Logic to handle dialog interaction within the documentation
const setupDialog = (dialogId, buttonId) => {
  const dialog = document.getElementById(dialogId);
  const button = document.getElementById(buttonId);

  if (!dialog || !button) return;

  const onClosed = () => {
    setTimeout(() => {
      button.setAttribute("visible", "true");
      button.classList.add("clickable");
    }, 100);
  };

  button.addEventListener("click", () => {
    // Call the internal component method
    if (dialog.components && dialog.components.dialog) {
      dialog.components.dialog.openDialog();
      button.setAttribute("visible", "false");
      button.classList.remove("clickable");
    }
  });

  dialog.addEventListener("dialogClosed", onClosed);
};

onMounted(async () => {
    try {
      await import("spatial-design-system/primitives/ar-dialog");
      await import("spatial-design-system/primitives/ar-button");
      
      renderScene.value = true;
      
      nextTick(() => {
        setupDialog("dialogBasic", "btnBasic");
        setupDialog("dialogCustom", "btnCustom");
      });
    } catch (e) {
      console.error("Initialization Error:", e);
    }
});
</script>

# {{ $frontmatter.title }}

The dialog component deliveres specific information to the users or requires a specific action from them. The information can be critical, while the actions can involve making one or multiple decisions, or realizing one or more tasks.

The dialog component is intended for quick actions and should be used thoughtfully to avoid disrupting the user's flow.

## Dialog Usage Setup
Unlike static components, the Dialog must be triggered programmatically. To display the dialog, you should **emit the `open-dialog` event** on the dialog entity. You can also listen for actions emitted by the buttons.

### Initial Setup Example
This is an example of how you could initialize a dialog and a trigger button in your project.

```js
scene.addEventListener("loaded", () => {
    // Get references to the elements
    const button = document.getElementById("openDialogButton");
    const dialog = document.getElementById("dialogBox");

    // Open the dialog on button click
    button.addEventListener("click", () => {
        openDialog(dialog, button);
    });

    // Handle dialog actions
    dialog.addEventListener("dialogAction", (e) => {
        console.log("Dialog action:", e.detail.action);
        // Logic for custom actions like 'confirm', 'cancel', etc.
    });
});

function openDialog(dialog, button) {
    dialog.emit("open-dialog");

    button.setAttribute("visible", false);
    button.classList.remove("clickable");

    // Attach event to re-enable button
    dialog.addEventListener("dialogClosed", () => {
        enableButton(button);
    }); 
}

// Function to show the button again and re-enable interaction
function enableButton(button) {
    setTimeout(() => {
    button.setAttribute("visible", true);
    button.classList.add("clickable");
    }, 100);
}
```

## Example

### Basic Dialog

The first example demonstrates a standard dialog with a title, content, and the default "Close" button.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
    <a-entity id="mouseRaycaster" raycaster="objects: .clickable"
              cursor="rayOrigin: mouse; fuse: false;">
    </a-entity>
    <a-ar-dialog
      id="dialogBasic"
      position="0 1.5 -3"
      title="Basic Dialog"
      content="This is the default look of the dialog component."
    ></a-ar-dialog>
    <a-ar-button
      id="btnBasic"
      class="clickable"
      position="0 1.5 -3"
      content="Open Basic Dialog"
      rounded="true"
    ></a-ar-button>
</template>

<template #code>

```js
import "spatial-design-system/primitives/ar-dialog.js";
import "spatial-design-system/primitives/ar-button.js";
```

```html
<a-ar-dialog
  id="dialogBox"
  position="0 1.5 -3"
  title="Basic Info"
  content="This is a simple dialog used for providing non-critical information."
></a-ar-dialog>
<a-ar-button
  id="openDialogButton"
  class="clickable"
  position="0 1.5 -3"
  content="Open Basic Dialog"
  rounded="true"
></a-ar-button>
```

### Opening Dialog
```js
const dialog = document.getElementById("dialogBox");
const button = document.getElementById("openDialogButton");

button.addEventListener("click", () => {
    // Use emit to trigger the opening sequence
    dialog.emit("open-dialog");
    button.setAttribute("visible", false);
});
```

</template>

</ComponentExample>

</br>

### Customized Actions and Style

This example demonstrates a dialog with customized buttons (save/cancel), a prependicon, and a specific background color. It also uses a transition to animate from the bottom. As can be seen from the output, eventhough the tect color is set to white, it is changed to black, for better contrast with the background.

<ComponentExample :fixed="true">

<template #output v-if="renderScene">
    <a-entity id="mouseRaycaster" raycaster="objects: .clickable"
              cursor="rayOrigin: mouse; fuse: false;">
    </a-entity>
    <a-ar-dialog 
        id="dialogCustom"
        position="0 1.5 -3" 
        title="Save Changes?" 
        content="Are you sure you want to save your current progress?" 
        buttons='[{"label": "save", "action": "save"}, {"label": "cancel", "action": "cancel"}]' 
        color="#aeffe8" 
        textcolor="black" 
        prependicon="/content-save.png" 
        transition="bottom-top" 
    ></a-ar-dialog>
    <a-ar-button
        id="btnCustom"
        class="clickable"
        position="0 1.5 -3"
        content="Open Custom Dialog"
        rounded="true"
        textcolor="black"
    ></a-ar-button>
</template>

<template #code>

```js
import "spatial-design-system/primitives/ar-dialog.js";
import "spatial-design-system/primitives/ar-button.js";
```

```html
<a-ar-dialog
  id="dialogBox"
  position="0 1.5 -3" 
  title="Save Changes?" 
  content="Are you sure you want to save your current progress?" 
  buttons='[{"label": "save", "action": "save"}, {"label": "cancel", "action": "cancel"}]' 
  color="#aeffe8" 
  textcolor="white" 
  prependicon="/content-save.png" 
  transition="bottom-top" 
></a-ar-dialog>
<a-ar-button
    id="openDialogButton"
    class="clickable"
    position="0 1.5 -3"
    content="Open Custom Dialog"
    rounded="true"
    textcolor="black"
></a-ar-button>
```

### Opening Dialog
```js
const dialog = document.getElementById("dialogBox");
const button = document.getElementById("openDialogButton");

button.addEventListener("click", () => {
    // Use emit to trigger the opening sequence
    dialog.emit("open-dialog");
    button.setAttribute("visible", false);
});
```

</template>

</ComponentExample>

## Props

| Property    | Type                        | Default | Description                                                                                       |
|-------------|-----------------------------|---------|--------------------------------------------------------------------------------------------------|
| _visible_   | boolean                     | true    | Controls the dialog's visibility.         |
| _position_  | number[]                    | 0 0 0   | Specifies the dialog's position in 3D space.          |
| _opacity_   | number                      | 1       | Specifies the opacity of the component.   |
| _color_     | string (blue, #fff)         | "" | Defines the primary color of the dialog, affecting elements such as text. |
| _textcolor_ | string                      | black   | Specifies the color of the dialog's text. If the contrast with the background is insufficient, the text color will __not__ be applied. |
| _mode_      | string (light, dark)        | "light" | Specifies the color scheme of the dialog, supporting either a `light` or `dark` mode. |
| _prependicon_ | string                    | ""      | Displays an icon before the dialog title. |
| _closingicon_ | boolean                   | false   | Determines whether a closing (X) icon is displayed. |
| _title_     | string                      | "Dialog Title" | Sets the title text displayed at the top of the dialog. |
| _content_   | string                      | "This is an example of the basic dialog component." | Sets the main body text of the dialog. | 
| _buttons_   | array                       | [{ label: "Close", action: "close" }]  | Defines the action buttons displayed at the bottom of the dialog. Supports up to two buttons. Buttons emit a `dialogAction` event containing their action string. | 
| _transition_ | string (bottom-top, top-bottom) | ""  | Specifies the enter animation direction, either sliding in from the bottom or from the top. |
