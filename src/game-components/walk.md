---
title: walk
---

<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import ComponentExample from "../vue/ComponentExample.vue";

  const renderScene = ref(false);

  onMounted(async () => {
    try {
      // Here import Spatial Design System components that you need
      await import("spatial-design-system/components/position.js");
      renderScene.value = true;
    } catch (e) {
      console.error(e);
    }
  });
</script>

# {{ $frontmatter.title }}
Walk component defines the movement and animation behavior of a character in a game. It allows customization of walking, sprinting, and turning styles, including key bindings and speed settings. The component also supports auto-walk and point-and-click movement options.

## Props

| Property      | Type    | Default    | Description                                                 |
|---------------|---------|------------|-------------------------------------------------------------|
|walkClipName|string|Walk|Name of the animation clip used when the character is walking.|
|idleClipName|string|Idle|Name of the animation clip used when the character is idle.|
|sprintClipName|string|Gallop|Name of the animation clip used when the character is sprinting.|
|keyUp|string|w|Key used to move the character forward.|
|keyDown|string|s|Key used to move the character backward.|
|keyLeft|string|a|Key used to move the character left.|
|keyRight|string|d|Key used to move the character right.|
|speed|float|5.0|Defines the player's base walking speed. |
|sprint|boolean|false|If true, the player can sprint when holding the sprintKey, increasing their speed to sprintSpeed.|
|sprintKey|string|shift|Key used to sprint with the character.|
|rotationSpeed|float|90.0|Defines the turning speed for smoothTurn mode.|
|sprintSpeed|float|8.0|Defines the sprinting speed when the sprint mode is active. |
|turnType|enum(smoothTurn, stepTurnCardinal, stepTurnDiagonal)|smoothTurn|Defines the walking mode and how the player turns and moves.|
|autoWalk|boolean|false|If true, the player will automatically start walking forward without input.|
|targetWalk|boolean|false|If true, enables point-and-click movement: the character walks toward the location where the player clicks.|

### turnType
- smoothTurn: The player turns smoothly while the key is held. The player can move while turning.
- stepTurnCardinal: When pressing a key, the player instantly turn 90° in the selected direction (toward, backward, left, or right) and then moves. It enables 4-directional movement. 
- stepTurnDiagonal:  Works the same way as stepTurnCardinal, but also allows movement in a diagonal directions (↗, ↘, ↙, ↖) by turning 45° before moving. It enables 8-directional movement. 