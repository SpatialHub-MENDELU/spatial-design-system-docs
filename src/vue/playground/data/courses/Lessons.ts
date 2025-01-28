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
  }
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
      content: `<div><h1 id="frontmatter-title" tabindex="-1">Menu <a class="header-anchor" href="#frontmatter-title" aria-label="Permalink to &quot;{{ $frontmatter.title }}&quot;">​</a></h1><p>Menu is a crucial part of any application that allows users quickly achieve their goals. It must be simple and easy to use and that is why we have a dedicated component that you can embed anywhere in your app.</p><h2 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a></h2><p>Below is an example with <a href="/ar-vr-components/circle.html">circle</a> layout.</p><section class="tabs"><div class="tabs__row"><button class="tabs__button_selected tabs__button" type="button">Output</button><button class="tabs__button" type="button">Code</button></div><div class="tabs__content"><a-scene xr-mode-ui="" embedded="" device-orientation-permission-ui="" inspector="" keyboard-shortcuts="" screenshot=""><a-camera fov="60" touchenabled="false" wasd-controls-enabled="false" look-controls-enabled="false" camera="" position="" rotation="" look-controls="" wasd-controls=""></a-camera><a-ar-menu position="" visible="" primary="#018A6C" items="[{'color':'white','icon':'/content-save','title':'Save','textColor':'black'},{'color':'white','icon':'/close-circle','title':'Quit','textColor':'black'},{'color':'white','icon':'/settings','title':'Settings','textColor':'black'},{'color':'white','icon':'/file-plus','title':'New file','textColor':'black'}]" variant="filled" layout="circle" geometry="" material="" class="clickable" circle="" menu=""><a-entity class="menu-item clickable" material="" geometry="" position=""><a-entity position=""><a-text visible="" value="Save" align="center" position="" width="3.375" color="black" class="size-reference-text" text=""></a-text><a-image class="size-reference-image" src="/content-save.png" height="0.5625" width="0.5625" position="" material="" geometry=""></a-image></a-entity></a-entity><a-entity class="menu-item clickable" material="" geometry="" position=""><a-entity position=""><a-text visible="" value="New file" align="center" position="" width="3.375" color="black" class="size-reference-text" text=""></a-text><a-image class="size-reference-image" src="/file-plus.png" height="0.5625" width="0.5625" position="" material="" geometry=""></a-image></a-entity></a-entity><a-entity class="menu-item clickable" material="" geometry="" position=""><a-entity position=""><a-text visible="" value="Settings" align="center" position="" width="3.375" color="black" class="size-reference-text" text=""></a-text><a-image class="size-reference-image" src="/settings.png" height="0.5625" width="0.5625" position="" material="" geometry=""></a-image></a-entity></a-entity><a-entity class="menu-item clickable" material="" geometry="" position=""><a-entity position=""><a-text visible="" value="Quit" align="center" position="" width="3.375" color="black" class="size-reference-text" text=""></a-text><a-image class="size-reference-image" src="/close-circle.png" height="0.5625" width="0.5625" position="" material="" geometry=""></a-image></a-entity></a-entity><a-entity data-layout-excluded=""><a-ring radius-outer="1.5" radius-inner="1.4609999999999999" material="" geometry=""></a-ring></a-entity></a-ar-menu><a-sky color="#4a4a4a" material="" geometry="" scale=""></a-sky><canvas class="a-canvas" data-aframe-canvas="true" data-engine="three.js r158" width="1068" height="600"></canvas><div class="a-loader-title" style="display: none;">Menu | Spatial Design System</div><a-entity light="" data-aframe-default-light="" aframe-injected=""></a-entity><a-entity light="" position="" data-aframe-default-light="" aframe-injected=""></a-entity></a-scene></div><div class="tabs__content" style="display: none;"><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light: #D73A49; --shiki-dark: #F97583;">import</span><span style="--shiki-light: #032F62; --shiki-dark: #9ECBFF;"> "spatial-design-system/primitives/ar-menu.js"</span><span style="--shiki-light: #24292E; --shiki-dark: #E1E4E8;">;</span></span></code></pre></div><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light: #24292E; --shiki-dark: #E1E4E8;">&lt;</span><span style="--shiki-light: #22863A; --shiki-dark: #85E89D;">a-ar-menu</span></span>
        <span class="line"><span style="--shiki-light: #6F42C1; --shiki-dark: #B392F0;">    position</span><span style="--shiki-light: #24292E; --shiki-dark: #E1E4E8;">=</span><span style="--shiki-light: #032F62; --shiki-dark: #9ECBFF;">"0 1.5 -3"</span></span>
        <span class="line"><span style="--shiki-light: #6F42C1; --shiki-dark: #B392F0;">    visible</span><span style="--shiki-light: #24292E; --shiki-dark: #E1E4E8;">=</span><span style="--shiki-light: #032F62; --shiki-dark: #9ECBFF;">"true"</span></span>
        <span class="line"><span style="--shiki-light: #6F42C1; --shiki-dark: #B392F0;">    primary</span><span style="--shiki-light: #24292E; --shiki-dark: #E1E4E8;">=</span><span style="--shiki-light: #032F62; --shiki-dark: #9ECBFF;">"#018A6C"</span></span>
        <span class="line"><span style="--shiki-light: #6F42C1; --shiki-dark: #B392F0;">    items</span><span style="--shiki-light: #24292E; --shiki-dark: #E1E4E8;">=</span><span style="--shiki-light: #032F62; --shiki-dark: #9ECBFF;">"[</span></span>
        <span class="line"><span style="--shiki-light: #032F62; --shiki-dark: #9ECBFF;">            {'color':'white','icon':'/content-save','title':'Save','textColor':'black'},</span></span>
        <span class="line"><span style="--shiki-light: #032F62; --shiki-dark: #9ECBFF;">            {'color':'white','icon':'/close-circle','title':'Quit','textColor':'black'},</span></span>
        <span class="line"><span style="--shiki-light: #032F62; --shiki-dark: #9ECBFF;">            {'color':'white','icon':'/settings','title':'Settings','textColor':'black'},</span></span>
        <span class="line"><span style="--shiki-light: #032F62; --shiki-dark: #9ECBFF;">            {'color':'white','icon':'/file-plus','title':'New file','textColor':'black'}</span></span>
        <span class="line"><span style="--shiki-light: #032F62; --shiki-dark: #9ECBFF;">        ]"</span></span>
        <span class="line"><span style="--shiki-light: #6F42C1; --shiki-dark: #B392F0;">    variant</span><span style="--shiki-light: #24292E; --shiki-dark: #E1E4E8;">=</span><span style="--shiki-light: #032F62; --shiki-dark: #9ECBFF;">"filled"</span></span>
        <span class="line"><span style="--shiki-light: #6F42C1; --shiki-dark: #B392F0;">    layout</span><span style="--shiki-light: #24292E; --shiki-dark: #E1E4E8;">=</span><span style="--shiki-light: #032F62; --shiki-dark: #9ECBFF;">"circle"</span></span>
        <span class="line"><span style="--shiki-light: #24292E; --shiki-dark: #E1E4E8;">&gt;&lt;/</span><span style="--shiki-light: #22863A; --shiki-dark: #85E89D;">a-ar-menu</span><span style="--shiki-light: #24292E; --shiki-dark: #E1E4E8;">&gt;</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>You can use <code>stringifyForHTML</code> from <code>spatial-design-system/utils/utils.js</code> to convert items to JSON and put them in the <code>items</code> attribute instead of hardcoding. For example, in Vue.js:</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light: #24292E; --shiki-dark: #E1E4E8;">&lt;</span><span style="--shiki-light: #22863A; --shiki-dark: #85E89D;">a-ar-menu</span></span>
        <span class="line"><span style="--shiki-light: #6F42C1; --shiki-dark: #B392F0;">    position</span><span style="--shiki-light: #24292E; --shiki-dark: #E1E4E8;">=</span><span style="--shiki-light: #032F62; --shiki-dark: #9ECBFF;">"0 1.5 -3"</span></span>
        <span class="line"><span style="--shiki-light: #6F42C1; --shiki-dark: #B392F0;">    visible</span><span style="--shiki-light: #24292E; --shiki-dark: #E1E4E8;">=</span><span style="--shiki-light: #032F62; --shiki-dark: #9ECBFF;">"true"</span></span>
        <span class="line"><span style="--shiki-light: #6F42C1; --shiki-dark: #B392F0;">    primary</span><span style="--shiki-light: #24292E; --shiki-dark: #E1E4E8;">=</span><span style="--shiki-light: #032F62; --shiki-dark: #9ECBFF;">"lightblue"</span></span>
        <span class="line"><span style="--shiki-light: #6F42C1; --shiki-dark: #B392F0;">    :items</span><span style="--shiki-light: #24292E; --shiki-dark: #E1E4E8;">=</span><span style="--shiki-light: #032F62; --shiki-dark: #9ECBFF;">"stringifyForHTML(items)"</span></span>
        <span class="line"><span style="--shiki-light: #6F42C1; --shiki-dark: #B392F0;">    variant</span><span style="--shiki-light: #24292E; --shiki-dark: #E1E4E8;">=</span><span style="--shiki-light: #032F62; --shiki-dark: #9ECBFF;">"filled"</span></span>
        <span class="line"><span style="--shiki-light: #6F42C1; --shiki-dark: #B392F0;">    layout</span><span style="--shiki-light: #24292E; --shiki-dark: #E1E4E8;">=</span><span style="--shiki-light: #032F62; --shiki-dark: #9ECBFF;">"circle"</span></span>
        <span class="line"><span style="--shiki-light: #24292E; --shiki-dark: #E1E4E8;">&gt;&lt;/</span><span style="--shiki-light: #22863A; --shiki-dark: #85E89D;">a-ar-menu</span><span style="--shiki-light: #24292E; --shiki-dark: #E1E4E8;">&gt;</span></span></code></pre></div></div></div><!----><!----></section><h2 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h2><table tabindex="0"><thead><tr><th>Property</th><th>Type</th><th>Default</th><th>Description</th></tr></thead><tbody><tr><td><em>visible</em></td><td>boolean</td><td>true</td><td>Shows or hides the menu.</td></tr><tr><td><em>size</em></td><td>enum (small, medium, large)</td><td>medium</td><td>Influences the compactness of the menu (paddings, font sizes, etc.)</td></tr><tr><td><em>position</em></td><td>number[]</td><td>0 0 0</td><td>Sets menu position.</td></tr><tr><td><em>primary</em></td><td>string (blue, #fff)</td><td>#0091E3</td><td>Alters menu color (text, background, icon background).</td></tr><tr><td><em>items</em></td><td>string (JSON)</td><td>""</td><td>Decorates menu using title, color or icon. Format: <code>{ icon: "home.svg", title: "", color: "red" }</code>. Icon is a URL or asset ID with hashtag. Default color is white.</td></tr><tr><td><em>variant</em></td><td>enum (filled, transparent)</td><td>filled</td><td>Alters overall menu look.</td></tr><tr><td><em>logoicon</em></td><td>image url or asset ID (string)</td><td>""</td><td>Sets a menu prepend icon based on the image's url or asset ID with hashtag.</td></tr><tr><td><em>layout</em></td><td>string (circle, grid)</td><td>grid</td><td>Sets menu layout.</td></tr><tr><td><em>highlighted</em></td><td>string(red, #fff)</td><td>#C1080C</td><td>Sets color of elements when clicked on</td></tr><tr><td><em>backbutton</em></td><td>boolean</td><td>false</td><td>Displays back button in the middle of the menu</td></tr></tbody></table></div>`,
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
        prompt: 'Create a filled circular 3D menu with the items listed below using the ar-menu component. The menu will be at position [3 2 -7].',
        code: {
          lang: LanguageEnum.MARKUP,
          content: `const items=[
  {color:'white',icon:'/content-save',title:'Save',textColor:'black'},
  {color:'white',icon:'/close-circle',title:'Quit',textColor:'black'},
  {color:'white',icon:'/settings', title:'Settings',textColor:'black'},
  {color:'white',icon:'/file-plus',title:'New file',textColor:'black'}
]`
        },
        hint: {
          lang: LanguageEnum.JS,
          content: `<a-ar-menu
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
      content: '',
    },
    vanillaJSVariant: {
      content: '',
    },
  },
  {
    id: 4,
    title: 'Auto-position',
    vueVariant: {
      content: '',
    },
    vanillaJSVariant: {
      content: '',
    },
  },
  {
    id: 5,
    title: 'Auto-scale',
    vueVariant: {
      content: '',
    },
    vanillaJSVariant: {
      content: '',
    },
  },
  {
    id: 6,
    title: 'Billboard',
    vueVariant: {
      content: '',
    },
    vanillaJSVariant: {
      content: '',
    },
  },
  {
    id: 7,
    title: 'Circle',
    vueVariant: {
      content: '',
    },
    vanillaJSVariant: {
      content: '',
    },
  },
  {
    id: 8,
    title: 'Fit into fov',
    vueVariant: {
      content: '',
    },
    vanillaJSVariant: {
      content: '',
    },
  },
  {
    id: 9,
    title: 'Flexbox',
    vueVariant: {
      content: '',
    },
    vanillaJSVariant: {
      content: '',
    },
  },
  {
    id: 10,
    title: 'Follow camera',
    vueVariant: {
      content: '',
    },
    vanillaJSVariant: {
      content: '',
    },
  },
  {
    id: 11,
    title: 'Grid',
    vueVariant: {
      content: '',
    },
    vanillaJSVariant: {
      content: '',
    },
  },
];
