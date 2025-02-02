import { ILessonVariants } from '../../types/courses/Lessons';

export enum LanguageEnum {
  HTML = 'html',
  CSS = 'css',
  JS = 'js',
  MARKUP = 'markup'
}

export const codeLanguage = {
  [LanguageEnum.MARKUP]: {
    code: LanguageEnum.MARKUP,
    label: LanguageEnum.HTML
  },
  [LanguageEnum.CSS]: {
    code: LanguageEnum.CSS,
    label: LanguageEnum.CSS
  },
  [LanguageEnum.JS]: {
    code: LanguageEnum.JS,
    label: LanguageEnum.JS
  },
  [LanguageEnum.HTML]: {
    code: LanguageEnum.MARKUP,
    label: LanguageEnum.HTML
  },
}

export const lessonsData: ILessonVariants[] = [
  {
    id: 1,
    title: 'Getting started',
    vueVariant: {
      content: `<div>
      <p>Welcome to the <span>Spatial Design System Course in Vue!</span> This course is designed to equip you with the essential skills and knowledge to create immersive augmented and virtual reality experiences using the <span>Spatial Design System</span> library. Whether you're a developer looking to expand your expertise or a designer eager to bring your AR/VR concepts to life, this course offers a comprehensive guide to mastering the components and functionalities of the <span>Spatial Design System</span>.</p>
      <p>Throughout the course, you’ll explore the key components that make up the <span>Spatial Design System</span>. Each lesson is thoughtfully designed to introduce new features and concepts, gradually building your expertise. Additionally, the lessons will include practical exercises to help you apply what you’ve learned and deepen your understanding.</p>
      <p>By the end of this course, you will have a strong grasp of how to use the <span>Spatial Design System</span> to create advanced AR/VR projects. You’ll be able to implement core components, tailor them to your specific needs, and confidently deploy your applications.</p>
      </div>`    },
    vanillaJSVariant: {
      content: `<div>
      <p>Welcome to the <span>Spatial Design System Course in Vanilla JS!</span> This course is designed to equip you with the essential skills and knowledge to create immersive augmented and virtual reality experiences using the <span>Spatial Design System</span> library. Whether you're a developer looking to expand your expertise or a designer eager to bring your AR/VR concepts to life, this course offers a comprehensive guide to mastering the components and functionalities of the <span>Spatial Design System</span>.</p>
      <p>Throughout the course, you’ll explore the key components that make up the <span>Spatial Design System</span>. Each lesson is thoughtfully designed to introduce new features and concepts, gradually building your expertise. Additionally, the lessons will include practical exercises to help you apply what you’ve learned and deepen your understanding.</p>
      <p>By the end of this course, you will have a strong grasp of how to use the <span>Spatial Design System</span> to create advanced AR/VR projects. You’ll be able to implement core components, tailor them to your specific needs, and confidently deploy your applications.</p>
      </div>`,
    },
  },
  {
    id: 2,
    title: 'Menu',
    vueVariant: {
      content: `
      <div>
          <div class="bordered-section">
          <p>
            Menu is a crucial part of any application that allows users to quickly achieve their goals. It must be simple and easy to use, which is why we have a dedicated component that you can embed anywhere in your app.
          </p>
          </div>
          <h2 tabindex="-1">
            Example
            <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a>
          </h2>
          <p>
            Below is an example with a <a href="/ar-vr-components/circle.html">circle</a> layout.
          </p>

          <div id="placeholder"></div>
          <div>
          <h2 id="props" tabindex="-1">
            Props
            <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a>
          </h2>
          <table tabindex="0">
            <thead>
              <tr>
                <th>Property</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><em>visible</em></td>
                <td>boolean</td>
                <td>true</td>
                <td>Shows or hides the menu.</td>
              </tr>
              <tr>
                <td><em>size</em></td>
                <td>enum (small, medium, large)</td>
                <td>medium</td>
                <td>Influences the compactness of the menu (paddings, font sizes, etc.).</td>
              </tr>
              <tr>
                <td><em>position</em></td>
                <td>number[]</td>
                <td>[0, 0, 0]</td>
                <td>Sets menu position.</td>
              </tr>
              <tr>
                <td><em>primary</em></td>
                <td>string (e.g., blue, #fff)</td>
                <td>#0091E3</td>
                <td>Alters menu color (text, background, icon background).</td>
              </tr>
              <tr>
                <td><em>items</em></td>
                <td>string (JSON)</td>
                <td>""</td>
                <td>
                  Decorates menu using title, color, or icon. Format:
                  <code>{ icon: "home.svg", title: "", color: "red" }</code>. Icon is a URL or asset ID with a hashtag. Default color is white.
                </td>
              </tr>
              <tr>
                <td><em>variant</em></td>
                <td>enum (filled, transparent)</td>
                <td>filled</td>
                <td>Alters the overall menu look.</td>
              </tr>
              <tr>
                <td><em>logoicon</em></td>
                <td>image URL or asset ID (string)</td>
                <td>""</td>
                <td>Sets a menu prepend icon based on the image's URL or asset ID with a hashtag.</td>
              </tr>
              <tr>
                <td><em>layout</em></td>
                <td>string (circle, grid)</td>
                <td>grid</td>
                <td>Sets menu layout.</td>
              </tr>
              <tr>
                <td><em>highlighted</em></td>
                <td>string (e.g., red, #fff)</td>
                <td>#C1080C</td>
                <td>Sets the color of elements when clicked.</td>
              </tr>
              <tr>
                <td><em>backbutton</em></td>
                <td>boolean</td>
                <td>false</td>
                <td>Displays a back button in the middle of the menu.</td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
      contentOutput:`
      <a-ar-menu
        position="0 1.5 -3"
        visible="true"
        primary="#018A6C"
        items="[
                {'color':'white','icon':'/content-save','title':'Save','textColor':'black'},
                {'color':'white','icon':'/close-circle','title':'Quit','textColor':'black'},
                {'color':'white','icon':'/settings','title':'Settings','textColor':'black'},
                {'color':'white','icon':'/file-plus','title':'New file','textColor':'black'}
            ]"
        variant="filled"
        layout="circle"
      ></a-ar-menu>`,
      contentCode: [
        {
          lang: LanguageEnum.JS,
          content: `import "spatial-design-system/primitives/ar-menu.js

const items = [
  {'color':'white','icon':'/content-save','title':'Save','textColor':'black'},
  {'color':'white','icon':'/close-circle','title':'Quit','textColor':'black'},
  {'color':'white','icon':'/settings','title':'Settings','textColor':'black'},
  {'color':'white','icon':'/file-plus','title':'New file','textColor':'black'}
]
          
<a-ar-menu
  position="0 1.5 -3"
  visible="true"
  primary="#018A6C"
  :items="items"
  variant="filled"
  layout="circle"
></a-ar-menu>`
        },
      ],
      task: {
        id: 1,
        prompt: 'Create a filled circular 3D menu with the items listed below using the a-ar-menu component. The menu will be at position [3 2 -7].',
        codes: [
          {
            lang: LanguageEnum.JS,
            content: `const items = [
  {color:'white',icon:'/content-save',title:'Save',textColor:'black'},
  {color:'white',icon:'/close-circle',title:'Quit',textColor:'black'},
  {color:'white',icon:'/settings', title:'Settings',textColor:'black'},
  {color:'white',icon:'/file-plus',title:'New file',textColor:'black'}
]`
}],
        hint: {
          lang: LanguageEnum.HTML,
          imports: `import "spatial-design-system/primitives/ar-menu.js";
import "spatial-design-system/components/position.js";
import { stringifyForHTML } from "spatial-design-system/utils/utils.js";`,
          content: `
<a-ar-menu
  position="3 2 -7"
  visible="true"
  primary="lightblue"
  :items="\stringifyForHTML(items)"
  variant="filled"
  layout="circle"
  fit-info-fov
  follow-camera="angle: 20"
  billboard
></a-ar-menu>`
        },        
        test: 
          `  
          const sceneElement = document.querySelector('a-scene');
          if (!sceneElement) {
            throw new Error('Scene is not found');
          }

          const menu = sceneElement.querySelector('a-ar-menu');
          if (!menu) throw new Error('Menu is not found');
          
          const position = menu.getAttribute('position');
          if (!position || position != "3 2 -7") {
            throw new Error('Position is incorrect');
          }
          
          const menuVariant = menu.getAttribute('variant');
          if (menuVariant !== "filled") throw new Error('Variant is incorrect');
          
          const menuItems = menu.getAttribute('items');

          const defaultItems = [
            "{'color':'white','icon':'/content-save','title':'Save','textColor':'black'}",
            "{'color':'white','icon':'/close-circle','title':'Quit','textColor':'black'}",
            "{'color':'white','icon':'/settings','title':'Settings','textColor':'black'}",
            "{'color':'white','icon':'/file-plus','title':'New file','textColor':'black'}"
          ];

          defaultItems.forEach(i => {
            if (!menuItems.includes(i)) throw new Error('Items are incorrect');
          })
          
          const menuVisibility = menu.getAttribute('visible');
          if (menuVisibility !== "true") throw new Error('Visibility is incorrect');
          
          const menuLayout = menu.getAttribute('layout');
          if (menuLayout !== "circle") throw new Error('Layout is incorrect');
          `
      }
    },
    vanillaJSVariant: {
      content: `
        <div>
          <div class="bordered-section">
          <p>
            Menu is a crucial part of any application that allows users to quickly achieve their goals. It must be simple and easy to use, which is why we have a dedicated component that you can embed anywhere in your app.
          </p>
          </div>
          <h2 tabindex="-1">
            Example
            <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a>
          </h2>
          <p>
            Below is an example with a <a href="/ar-vr-components/circle.html">circle</a> layout.
          </p>

          <div id="placeholder"></div>
          <div>
          <h2 id="props" tabindex="-1">
            Props
            <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a>
          </h2>
          <table tabindex="0">
            <thead>
              <tr>
                <th>Property</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><em>visible</em></td>
                <td>boolean</td>
                <td>true</td>
                <td>Shows or hides the menu.</td>
              </tr>
              <tr>
                <td><em>size</em></td>
                <td>enum (small, medium, large)</td>
                <td>medium</td>
                <td>Influences the compactness of the menu (paddings, font sizes, etc.).</td>
              </tr>
              <tr>
                <td><em>position</em></td>
                <td>number[]</td>
                <td>[0, 0, 0]</td>
                <td>Sets menu position.</td>
              </tr>
              <tr>
                <td><em>primary</em></td>
                <td>string (e.g., blue, #fff)</td>
                <td>#0091E3</td>
                <td>Alters menu color (text, background, icon background).</td>
              </tr>
              <tr>
                <td><em>items</em></td>
                <td>string (JSON)</td>
                <td>""</td>
                <td>
                  Decorates menu using title, color, or icon. Format:
                  <code>{ icon: "home.svg", title: "", color: "red" }</code>. Icon is a URL or asset ID with a hashtag. Default color is white.
                </td>
              </tr>
              <tr>
                <td><em>variant</em></td>
                <td>enum (filled, transparent)</td>
                <td>filled</td>
                <td>Alters the overall menu look.</td>
              </tr>
              <tr>
                <td><em>logoicon</em></td>
                <td>image URL or asset ID (string)</td>
                <td>""</td>
                <td>Sets a menu prepend icon based on the image's URL or asset ID with a hashtag.</td>
              </tr>
              <tr>
                <td><em>layout</em></td>
                <td>string (circle, grid)</td>
                <td>grid</td>
                <td>Sets menu layout.</td>
              </tr>
              <tr>
                <td><em>highlighted</em></td>
                <td>string (e.g., red, #fff)</td>
                <td>#C1080C</td>
                <td>Sets the color of elements when clicked.</td>
              </tr>
              <tr>
                <td><em>backbutton</em></td>
                <td>boolean</td>
                <td>false</td>
                <td>Displays a back button in the middle of the menu.</td>
              </tr>
            </tbody>
          </table>
        </div>
      `,
      contentOutput:`
      <a-ar-menu
        position="0 1.5 -3"
        visible="true"
        primary="#018A6C"
        items="[
                {'color':'white','icon':'/content-save','title':'Save','textColor':'black'},
                {'color':'white','icon':'/close-circle','title':'Quit','textColor':'black'},
                {'color':'white','icon':'/settings','title':'Settings','textColor':'black'},
                {'color':'white','icon':'/file-plus','title':'New file','textColor':'black'}
            ]"
        variant="filled"
        layout="circle"
      ></a-ar-menu>`,
    contentCode: [
        {
          lang: LanguageEnum.JS,
          content: `import "spatial-design-system/primitives/ar-menu.js

<a-ar-menu
  position="0 1.5 -3"
  visible="true"
  primary="#018A6C"
  items="[
    {'color':'white','icon':'/content-save','title':'Save','textColor':'black'},
    {'color':'white','icon':'/close-circle','title':'Quit','textColor':'black'},
    {'color':'white','icon':'/settings','title':'Settings','textColor':'black'},
    {'color':'white','icon':'/file-plus','title':'New file','textColor':'black'}
  ]"
  variant="filled"
  layout="circle"
></a-ar-menu>`
        },
      ],
      task: {
        id: 1,
        prompt: 'Create a filled circular 3D menu with the items listed below using the a-ar-menu component. The menu will be at position [3 2 -7].',
        codes: [
          {
            lang: LanguageEnum.JS,
            content: `const items=[
    {color:'white',icon:'/content-save',title:'Save',textColor:'black'},
    {color:'white',icon:'/close-circle',title:'Quit',textColor:'black'},
    {color:'white',icon:'/settings', title:'Settings',textColor:'black'},
    {color:'white',icon:'/file-plus',title:'New file',textColor:'black'}
  ]`
          }
        ],
        hint: {
          lang: LanguageEnum.JS,
          imports: `import "spatial-design-system/primitives/ar-menu.js";
import "spatial-design-system/components/position.js";
import { stringifyForHTML } from "spatial-design-system/utils/utils.js";`,
          content: `const menu = \`
<a-ar-menu
  position="3 2 -7"
  visible="true"
  primary="lightblue"
  :items="\${stringifyForHTML(items)}"
  variant="filled"
  layout="circle"
  fit-info-fov
  follow-camera="angle: 20"
  billboard
></a-ar-menu>\`;
            
scene.innerHTML = menu;
app.appendChild(scene);`
        },        
        test: 
          `  
          const sceneElement = document.querySelector('a-scene');
          if (!sceneElement) {
            throw new Error('Scene is not found');
          }

          const menu = sceneElement.querySelector('a-ar-menu');
          if (!menu) throw new Error('Menu is not found');
          
          const position = menu.getAttribute('position');
          if (!position || position != "3 2 -7") {
            throw new Error('Position is incorrect');
          }
          
          const menuVariant = menu.getAttribute('variant');
          if (menuVariant !== "filled") throw new Error('Variant is incorrect');
          
          const menuItems = menu.getAttribute('items');

          const defaultItems = [
            "{'color':'white','icon':'/content-save','title':'Save','textColor':'black'}",
            "{'color':'white','icon':'/close-circle','title':'Quit','textColor':'black'}",
            "{'color':'white','icon':'/settings','title':'Settings','textColor':'black'}",
            "{'color':'white','icon':'/file-plus','title':'New file','textColor':'black'}"
          ];

          defaultItems.forEach(i => {
            if (!menuItems.includes(i)) throw new Error('Items are incorrect');
          })
          
          const menuVisibility = menu.getAttribute('visible');
          if (menuVisibility !== "true") throw new Error('Visibility is incorrect');
          
          const menuLayout = menu.getAttribute('layout');
          if (menuLayout !== "circle") throw new Error('Layout is incorrect');
          `
      }
    },
  },
  {
    id: 3,
    title: 'Row, Column',
    vueVariant: {
      content: `
        <div>
          <div class="bordered-section">
            <p>If you need a one dimensional layout, you can use row or column container. Both use <a href="/ar-vr-components/grid.html">grid</a> component.</p>
          </div>
          <h2 tabindex="-1">
            Example
            <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">&ZeroWidthSpace;</a>
          </h2>
          <p>Below is an example of using row layout, <code>a-ar-row</code>. The column layout differs in direction (it is vertical) and it has tag name <code>a-ar-column</code>, <a href="#props">props</a> are the same.</p>
          <div id="placeholder"></div>
          <div>
            <h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">&ZeroWidthSpace;</a></h2>
            <table tabindex="0"><thead><tr><th>Property</th><th>Type</th><th>Default</th><th>Description</th></tr></thead><tbody><tr><td><em>visible</em></td><td>boolean</td><td>true</td><td>Shows or hides the container.</td></tr><tr><td><em>width</em></td><td>number</td><td>1</td><td>Container's width.</td></tr><tr><td><em>height</em></td><td>number</td><td>1</td><td>Container's height.</td></tr><tr><td><em>position</em></td><td>number[]</td><td>0 0 0</td><td>Sets container position.</td></tr><tr><td><em>spacing</em></td><td>number</td><td>0</td><td>Sets spacing between items.</td></tr><tr><td><em>opacity</em></td><td>number</td><td>1</td><td>Sets container's opacity.</td></tr></tbody></table>
            </div>
          </div>
      `,
      contentOutput: `
      <a-ar-row width="3" position="0 1.5 -3">
  <a-box color="#018A6C"></a-box>
  <a-box color="#00C170"></a-box>
  <a-box color="#03FCC6"></a-box>
</a-ar-row>`,
      contentCode: [
        {
          lang: LanguageEnum.JS,
          content: `import "spatial-design-system/primitives/ar-menu.js";
import "spatial-design-system/primitives/ar-list.js";

<a-ar-row width="3" position="0 1.5 -3">
  <a-box color="#018A6C"></a-box>
  <a-box color="#00C170"></a-box>
  <a-box color="#03FCC6"></a-box>
</a-ar-row>
          `
        },
      ],
      task: {
        id: 3,
        prompt: 'Create a row with the boxes listed below using the a-ar-row component. The row will be positioned at [0 1 -3], with a size of 4x4 and a spacing of 0 between the boxes.',
        codes: [
          {
            lang: LanguageEnum.HTML,
            content: `
            /*<a-box color="#018A6C"></a-box>
            <a-box color="#00C170"></a-box>
            <a-box color="#03FCC6"></a-box>*/`
          }
        ],
        hint: {
          lang: LanguageEnum.HTML,
          imports: `import "spatial-design-system/primitives/ar-menu.js";
import "spatial-design-system/primitives/ar-list.js";`,
          content: `<a-ar-row
width="4" height="4" position="0 1 -3" spacing="0">
  <a-box color="#018A6C"></a-box>
  <a-box color="#00C170"></a-box>
  <a-box color="#03FCC6"></a-box>
</a-ar-row>
`
        },
        test: `const sceneElement = document.querySelector('a-scene');
if (!sceneElement) {
  throw new Error('Scene is not found');
}

const row = sceneElement.querySelector('a-ar-row');
if (!row) throw new Error('Row is not found');
        
const position = row.getAttribute('position');
if (!position || position != "0 1 -3") {
  throw new Error('Position is incorrect');
}
        
const rowHeight = row.getAttribute('height');
if (rowHeight !== "4") throw new Error('Height is incorrect');

const rowWidth = row.getAttribute('width');
if (rowWidth !== "4") throw new Error('Width is incorrect');
        
const rowSpacing = row.getAttribute('spacing');
if (rowSpacing !== "0") throw new Error('Spacing is incorrect');

const boxes = document.querySelectorAll('a-box');
if (boxes.length !== 3) throw new Error('All the boxes are not found');

if (boxes[0].getAttribute('color') !== "#018A6C") throw new Error("First box's color is incorrenct");
if (boxes[1].getAttribute('color') !== "#00C170") throw new Error("Second box's color is incorrenct");
if (boxes[2].getAttribute('color') !== "#03FCC6") throw new Error("Third box's color is incorrenct");

const boxesPosition = row.querySelectorAll('a-box');
if (boxesPosition.length !== 3) throw new Error('All boxes must be inside the row');

`
      }
    },
    vanillaJSVariant: {
      content: `
        <div>
          <div class="bordered-section">
            <p>If you need a one dimensional layout, you can use row or column container. Both use <a href="/ar-vr-components/grid.html">grid</a> component.</p>
          </div>
          <h2 tabindex="-1">
            Example
            <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">&ZeroWidthSpace;</a>
          </h2>
          <p>Below is an example of using row layout, <code>a-ar-row</code>. The column layout differs in direction (it is vertical) and it has tag name <code>a-ar-column</code>, <a href="#props">props</a> are the same.</p>
          <div id="placeholder"></div>
          <div>
            <h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">&ZeroWidthSpace;</a></h2>
            <table tabindex="0"><thead><tr><th>Property</th><th>Type</th><th>Default</th><th>Description</th></tr></thead><tbody><tr><td><em>visible</em></td><td>boolean</td><td>true</td><td>Shows or hides the container.</td></tr><tr><td><em>width</em></td><td>number</td><td>1</td><td>Container's width.</td></tr><tr><td><em>height</em></td><td>number</td><td>1</td><td>Container's height.</td></tr><tr><td><em>position</em></td><td>number[]</td><td>0 0 0</td><td>Sets container position.</td></tr><tr><td><em>spacing</em></td><td>number</td><td>0</td><td>Sets spacing between items.</td></tr><tr><td><em>opacity</em></td><td>number</td><td>1</td><td>Sets container's opacity.</td></tr></tbody></table>
            </div>
          </div>
      `,
      contentOutput: `
      <a-ar-row width="3" position="0 1.5 -3">
  <a-box color="#018A6C"></a-box>
  <a-box color="#00C170"></a-box>
  <a-box color="#03FCC6"></a-box>
</a-ar-row>`,
      contentCode: [
        {
          lang: LanguageEnum.JS,
          content: `import "spatial-design-system/primitives/ar-menu.js";
import "spatial-design-system/primitives/ar-list.js";

<a-ar-row width="3"
  position="0 1.5 -3">
  <a-box color="#018A6C"></a-box>
  <a-box color="#00C170"></a-box>
  <a-box color="#03FCC6"></a-box>
</a-ar-row>
          `
        },
      ],
      task: {
        id: 2,
        prompt: 'Create a row with the boxes listed below using the a-ar-row component. The row will be positioned at [0 1 -3], with a size of 4x4 and a spacing of 0 between the boxes.',
        codes: [
          {
            lang: LanguageEnum.JS,
            content: `
            /*<a-box color="#018A6C"></a-box>
            <a-box color="#00C170"></a-box>
            <a-box color="#03FCC6"></a-box>*/`
          }
        ],
        hint: {
          lang: LanguageEnum.JS,
          imports: `import "spatial-design-system/primitives/ar-menu.js";
import "spatial-design-system/primitives/ar-list.js";`,
          content: `const row = \`<a-ar-row
  width="4" height="4" position="0 1 -3" spacing="0">
  <a-box color="#018A6C"></a-box>
  <a-box color="#00C170"></a-box>
  <a-box color="#03FCC6"></a-box>
</a-ar-row>\`
          
scene.innerHTML = row
app.appendChild(scene)
`
        },
        test: `const sceneElement = document.querySelector('a-scene');
if (!sceneElement) {
  throw new Error('Scene is not found');
}

const row = sceneElement.querySelector('a-ar-row');
if (!row) throw new Error('Row is not found');
        
const position = row.getAttribute('position');
if (!position || position != "0 1 -3") {
  throw new Error('Position is incorrect');
}
        
const rowHeight = row.getAttribute('height');
if (rowHeight !== "4") throw new Error('Height is incorrect');

const rowWidth = row.getAttribute('width');
if (rowWidth !== "4") throw new Error('Width is incorrect');
        
const rowSpacing = row.getAttribute('spacing');
if (rowSpacing !== "0") throw new Error('Spacing is incorrect');

const boxes = document.querySelectorAll('a-box');
if (boxes.length !== 3) throw new Error('All the boxes are not found');

if (boxes[0].getAttribute('color') !== "#018A6C") throw new Error("First box's color is incorrenct");
if (boxes[1].getAttribute('color') !== "#00C170") throw new Error("Second box's color is incorrenct");
if (boxes[2].getAttribute('color') !== "#03FCC6") throw new Error("Third box's color is incorrenct");

const boxesPosition = row.querySelectorAll('a-box');
if (boxesPosition.length !== 3) throw new Error('All boxes must be inside the row');

`
      }
    },
  }
];
