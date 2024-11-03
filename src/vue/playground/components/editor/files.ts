/** @satisfies {import('@webcontainer/api').FileSystemTree} */

export const files = {
  "index.html": {
    file: {
      contents: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>A-Frame Project</title>
        <!-- Load A-Frame from CDN -->
        <script src="https://aframe.io/releases/1.6.0/aframe.min.js" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/gh/c-frame/aframe-extras@7.4.0/dist/aframe-extras.min.js" crossorigin="anonymous"></script>
        <script src="https://pisarovic.cz/dist/spatial-design-system.umd.js" crossorigin="anonymous"></script>
        <!-- <script src="components.js"></script> -->
      </head>
      <body>
        
        <div id="app"></div>
      
        <script type="module">
          const app = document.getElementById("app");
          const scene = document.createElement("a-scene");
      
          // Define items for the menu
          const items = [
            { color: "white", title: "Games", textColor: "black" },
            { color: "white", title: "Films", textColor: "black" },
            { color: "white", title: "Books", textColor: "black" },
            { color: "white", title: "Paintings", textColor: "black" }
          ];
      
          // Convert items array to a format suitable for the a-ar-menu
          const itemsString = JSON.stringify(items);
      
          // Construct the AR menu HTML
          const menu = \`
          <a-plane width="5" height="5" position="0 1.5 -5" color="#018A6C">
        <a-box color="#03FCC6" auto-position></a-box>
      
        <a-box color="#03FCC6" position="0 1.5 -2.5" auto-scale></a-box>
        <a-box color="#03FCC6" position="0 1.5 -2.5" auto-scale></a-box>
      </a-plane>
      
      <a-box color="#03FCC6" position="0 1.5 -2.5" auto-scale></a-box>
      \`;
      
          scene.innerHTML = menu;
          app.appendChild(scene);
        </script>
      </body>
      </html>
      
      `,
    },
  },
  "package.json": {
    file: {
      contents: `
{
  "name": "example-app",
  "version": "1.0.0",
  "type": "module",
  "dependencies": {
    "nodemon": "^2.0.0"
  },
  "devDependencies": {
    "vite": "5.4.9" 
  },
  "scripts": {
    "start": "nodemon index.js"
  }
}`,
    },
  },
};
