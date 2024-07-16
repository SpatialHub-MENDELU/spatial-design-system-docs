---
title: 2D menu
---

# {{ $frontmatter.title }}

This menu type represents a standard 2D element covering most of the screen or the entire screen. 

### Use cases

- The process of working with your app can be divided into two stages: The first part requires AR but the second part 
does not. In this case, the user can switch between AR and 2D mode.
- For example, a user detect a physical object and then the app shows a 2D menu to interact with the object.
- Your app does not need immersive AR experience, but you want to provide some AR features.
- You need to display an extensive amount of information or options that would be difficult to display in AR.
- Your menu includes a complex multi-level structure that would be difficult to display in AR.
- You want to have a fallback for devices that do not support AR at all.

### Risks

- Menu significantly reduces the immersion and breaks AR experience. <span style="color: red">(bad)</span> 
- Users have tendency to forget about AR because 2D is more familiar for them. <span style="color: orange">(not so bad)</span>
- It is difficult to switch between AR and 2D mode. <span style="color: orange">(not so bad)</span>

### Example

A user wants to add a new 3D model to the scene. The app shows a 2D menu with a list of available models. It is a large collections
with many categories and subcategories. It would be difficult to display all this information in AR.

### Implementation

There is no specific implementation for 2D menu. You can use any UI framework or library for your platform to create a 2D menu.

