import { ILessonVariants } from '../../types/courses/Lessons';

export enum LanguageEnum {
  HTML = 'html',
  CSS = 'css',
  JS = 'js',
  MARKUP = 'markup',
}

export const codeLanguage = {
  [LanguageEnum.MARKUP]: {
    code: LanguageEnum.MARKUP,
    label: LanguageEnum.HTML,
  },
  [LanguageEnum.CSS]: {
    code: LanguageEnum.CSS,
    label: LanguageEnum.CSS,
  },
  [LanguageEnum.JS]: {
    code: LanguageEnum.JS,
    label: LanguageEnum.JS,
  },
  [LanguageEnum.HTML]: {
    code: LanguageEnum.MARKUP,
    label: LanguageEnum.HTML,
  },
};

export const lessonsData: ILessonVariants[] = [
  {
    id: 1,
    title: 'Getting started',
    vueVariant: {
      content: `<div>
      <p>Welcome to the <span>Spatial Design System Course in Vue!</span> This course is designed to equip you with the essential skills and knowledge to create immersive augmented and virtual reality experiences using the <span>Spatial Design System</span> library. Whether you're a developer looking to expand your expertise or a designer eager to bring your AR/VR concepts to life, this course offers a comprehensive guide to mastering the components and functionalities of the <span>Spatial Design System</span>.</p>
      <p>Throughout the course, you’ll explore the key components that make up the <span>Spatial Design System</span>. Each lesson is thoughtfully designed to introduce new features and concepts, gradually building your expertise. Additionally, the lessons will include practical exercises to help you apply what you’ve learned and deepen your understanding.</p>
      <p>By the end of this course, you will have a strong grasp of how to use the <span>Spatial Design System</span> to create advanced AR/VR projects. You’ll be able to implement core components, tailor them to your specific needs, and confidently deploy your applications.</p>
      </div>`,
    },
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
    title: 'Button',
    vueVariant: {
      content: `
      <div>
          <div class="bordered-section">
          <p>
            Welcome to this lesson on the <span class="text-semibold">AR Button Component</span>! In this course, you will learn how to use and customize the <span class="text-semibold">&lt;a-ar-button&gt;</span> component from the Spatial Design System. This button is designed for AR environments and provides a visually cohesive, interactive experience.
          </p>
          </div>
          
          <div class="mb-6">
            <h2 tabindex="-1">
              What You Will Learn
            </h2>
            <p>By the end of this lesson, you will:</p>
            <ul class="lesson-detail--list">
              <li>Understand the purpose of the <span class="text-semibold">&lt;a-ar-button&gt;</span> component,</li>
              <li>Learn how to customize the button’s size, color, text, and visibility.</li>
              <li>Explore different styles such as rounded, uppercase, outline, and text-only.</li>
              <li>Use the button to trigger interactions in an AR scene.</li>
            </ul>
          </div>

          <div class="mb-6">
            <h2 tabindex="-1">
              How the AR Button Works
            </h2>
            <p>The <span class="text-semibold">&lt;a-ar-button&gt;</span> component acts as an interactive button that can be placed anywhere in a 3D or AR scene. It behaves similarly to standard HTML buttons but includes additional customization options to fit AR environments.</p>
          </div>

          <h2 tabindex="-1">
            Example
            <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a>
          </h2>

          <div id="placeholder"></div>
          <div>
          <h2 id="props" tabindex="-1">
            Props
            <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a>
          </h2>
          <table tabindex="0"><thead><tr><th>Property</th><th>Type</th><th>Default</th><th>Description</th></tr></thead><tbody><tr><td><em>visible</em></td><td>boolean</td><td>true</td><td>Controls the button's visibility. When <code>true</code>, the button is visible; when <code>false</code>, it is hidden.</td></tr><tr><td><em>size</em></td><td>enum (small, medium, large)</td><td>medium</td><td>Sets the button's size, adjusting padding, font size, and layout compactness accordingly.</td></tr><tr><td><em>position</em></td><td>number[]</td><td>0 0 0</td><td>Specifies the button's position.</td></tr><tr><td><em>primary</em></td><td>string (blue, #fff)</td><td>#00BA92</td><td>Defines the primary color of the button (affecting text, background, icon background).</td></tr><tr><td><em>text</em></td><td>string</td><td>""</td><td>Sets the button's label text, such as "Open dialog" or "Close".</td></tr><tr><td><em>textcolor</em></td><td>string</td><td>black</td><td>Specifies the color of the button's text.</td></tr><tr><td><em>uppercase</em></td><td>boolean</td><td>false</td><td>When <code>true</code>, displays the button text in uppercase letters.</td></tr><tr><td><em>rounded</em></td><td>boolean</td><td>false</td><td>When <code>true</code>, gives the button rounded corners.</td></tr><tr><td><em>textonly</em></td><td>boolean</td><td>false</td><td>When <code>true</code>, renders the button as a text-only button with no background.</td></tr><tr><td><em>outline</em></td><td>boolean</td><td>false</td><td>When <code>true</code>, displays the button with an outline.</td></tr><tr><td><em>variant</em></td><td>string (light, dark)</td><td>""</td><td>Sets the button's color scheme mode, either "light" or "dark," for visual theme consistency.</td></tr></tbody></table>
          
          <div>
            <h2 tabindex="-1">
              Your Task
            </h2>
            <p>Now that you understand the basics, it's time to practice by customizing the button in your AR scene. Follow the steps below and experiment with different settings!</p>
            <ul class="lesson-detail--list">
              <li>Modify the button’s color and text:
                <ul class="lesson-detail--list">
                  <li>Set the primary color of the button to #FF5733.</li>
                  <li>Change the text on the button to say "Start Project".</li>
                </ul>
              </li>
              <li>Change its size and position in the scene:
                <ul class="lesson-detail--list">
                  <li>Set the size of the button to large.</li>
                  <li>Position the button at coordinates "1 1.5 -3" in the AR scene.</li>
                </ul>
              </li>
              <li>Try different styles:
                <ul class="lesson-detail--list">
                  <li>Enable the outline style by setting outline="true".</li>
                  <li>Enable rounded corners by setting rounded="true".</li>
                </ul>
              </li>
            </ul>
          </div>

          </div>
      `,
      contentOutput: `
<a-ar-button
      position="0 1.5 -3"
      content="Button"
      primary="#018A6C"
      textcolor="white"
      size="large"
  ></a-ar-button>`,
      contentCode: [
        {
          lang: LanguageEnum.JS,
          content: `import "spatial-design-system/primitives/ar-button.js";
          
<a-ar-button
  position="0 1.5 -3"
  content="Button"
  primary="#018A6C"
  textcolor="white"
  size="large"
></a-ar-button>`,
        },
      ],
      task: {
        id: 1,
        codes: [],
        hint: {
          lang: LanguageEnum.HTML,
          imports: `import "spatial-design-system/primitives/ar-button.js";`,
          content: `
<a-ar-button
  position="1 1.5 -3"
  content="Start Project"
  primary="#FF5733"
  textcolor="white"
  size="large"
  outline="true"
  rounded="true"
></a-ar-button>\
`,
        },
        test: `  
        const sceneElement = document.querySelector('a-scene');
        if (!sceneElement) {
          throw new Error('Scene is not found');
        }

        const button = sceneElement.querySelector('a-ar-button');
        if (!button) throw new Error('Button is not found');
        
        // const position = button.getAttribute('position');
        // if (!position || position != "1 1.5 -3") {
        //   throw new Error('Position is incorrect');
        // }
        
        const buttonContent = button.getAttribute('content');
        if (buttonContent !== "Start Project") throw new Error('Content is incorrect');

        const buttonPrimary = button.getAttribute('primary');
        if (buttonPrimary !== "#FF5733") throw new Error('Primary color is incorrect');

        const buttonSize = button.getAttribute('size');
        if (buttonSize !== "large") throw new Error('Size is incorrect');

        const buttonOutline = button.getAttribute('outline');
        if (buttonOutline !== "true") throw new Error('Button is not outlined');

        const buttonRounded = button.getAttribute('rounded');
        if (buttonRounded !== "true") throw new Error('Button is not rounded');
          `,
      },
    },
    vanillaJSVariant: {
      content: `
        <div>
          <div class="bordered-section">
          <p>
            Welcome to this lesson on the <span class="text-semibold">AR Button Component</span>! In this course, you will learn how to use and customize the <span class="text-semibold">&lt;a-ar-button&gt;</span> component from the Spatial Design System. This button is designed for AR environments and provides a visually cohesive, interactive experience.
          </p>
          </div>
          
          <div class="mb-6">
            <h2 tabindex="-1">
              What You Will Learn
            </h2>
            <p>By the end of this lesson, you will:</p>
            <ul class="lesson-detail--list">
              <li>Understand the purpose of the <span class="text-semibold">&lt;a-ar-button&gt;</span> component,</li>
              <li>Learn how to customize the button’s size, color, text, and visibility.</li>
              <li>Explore different styles such as rounded, uppercase, outline, and text-only.</li>
              <li>Use the button to trigger interactions in an AR scene.</li>
            </ul>
          </div>

          <div class="mb-6">
            <h2 tabindex="-1">
              How the AR Button Works
            </h2>
            <p>The <span class="text-semibold">&lt;a-ar-button&gt;</span> component acts as an interactive button that can be placed anywhere in a 3D or AR scene. It behaves similarly to standard HTML buttons but includes additional customization options to fit AR environments.</p>
          </div>

          <h2 tabindex="-1">
            Example
            <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a>
          </h2>

          <div id="placeholder"></div>
          <div>
          <h2 id="props" tabindex="-1">
            Props
            <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a>
          </h2>
          <table tabindex="0"><thead><tr><th>Property</th><th>Type</th><th>Default</th><th>Description</th></tr></thead><tbody><tr><td><em>visible</em></td><td>boolean</td><td>true</td><td>Controls the button's visibility. When <code>true</code>, the button is visible; when <code>false</code>, it is hidden.</td></tr><tr><td><em>size</em></td><td>enum (small, medium, large)</td><td>medium</td><td>Sets the button's size, adjusting padding, font size, and layout compactness accordingly.</td></tr><tr><td><em>position</em></td><td>number[]</td><td>0 0 0</td><td>Specifies the button's position.</td></tr><tr><td><em>primary</em></td><td>string (blue, #fff)</td><td>#00BA92</td><td>Defines the primary color of the button (affecting text, background, icon background).</td></tr><tr><td><em>text</em></td><td>string</td><td>""</td><td>Sets the button's label text, such as "Open dialog" or "Close".</td></tr><tr><td><em>textcolor</em></td><td>string</td><td>black</td><td>Specifies the color of the button's text.</td></tr><tr><td><em>uppercase</em></td><td>boolean</td><td>false</td><td>When <code>true</code>, displays the button text in uppercase letters.</td></tr><tr><td><em>rounded</em></td><td>boolean</td><td>false</td><td>When <code>true</code>, gives the button rounded corners.</td></tr><tr><td><em>textonly</em></td><td>boolean</td><td>false</td><td>When <code>true</code>, renders the button as a text-only button with no background.</td></tr><tr><td><em>outline</em></td><td>boolean</td><td>false</td><td>When <code>true</code>, displays the button with an outline.</td></tr><tr><td><em>variant</em></td><td>string (light, dark)</td><td>""</td><td>Sets the button's color scheme mode, either "light" or "dark," for visual theme consistency.</td></tr></tbody></table>
          
          <div>
            <h2 tabindex="-1">
              Your Task
            </h2>
            <p>Now that you understand the basics, it's time to practice by customizing the button in your AR scene. Follow the steps below and experiment with different settings!</p>
            <ul class="lesson-detail--list">
              <li>Modify the button’s color and text:
                <ul class="lesson-detail--list">
                  <li>Set the primary color of the button to #FF5733.</li>
                  <li>Change the text on the button to say "Start Project".</li>
                </ul>
              </li>
              <li>Change its size and position in the scene:
                <ul class="lesson-detail--list">
                  <li>Set the size of the button to large.</li>
                  <li>Position the button at coordinates "1 1.5 -3" in the AR scene.</li>
                </ul>
              </li>
              <li>Try different styles:
                <ul class="lesson-detail--list">
                  <li>Enable the outline style by setting outline="true".</li>
                  <li>Enable rounded corners by setting rounded="true".</li>
                </ul>
              </li>
            </ul>
          </div>

          </div>
      `,
      contentOutput: `
      <a-ar-button
      position="0 1.5 -3"
      content="Button"
      primary="#018A6C"
      textcolor="white"
      size="large"
  ></a-ar-button>`,
      contentCode: [
        {
          lang: LanguageEnum.JS,
          content: `import "spatial-design-system/primitives/ar-button.js";`,
        },
        {
          lang: LanguageEnum.HTML,
          content: `<a-ar-button
  position="0 1.5 -3"
  content="Button"
  primary="#018A6C"
  textcolor="white"
  size="large"
></a-ar-button>`,
        },
      ],
      task: {
        id: 1,
        codes: [],
        hint: {
          lang: LanguageEnum.JS,
          imports: `import "spatial-design-system/primitives/ar-button.js";`,
          content: `const button = \`<a-ar-button
  position="1 1.5 -3"
  content="Start Project"
  primary="#FF5733"
  textcolor="white"
  size="large"
  outline="true"
  rounded="true"
></a-ar-button>\`;
                      
scene.innerHTML = button;
app.appendChild(scene);`,
        },
        test: `  
          const sceneElement = document.querySelector('a-scene');
          if (!sceneElement) {
            throw new Error('Scene is not found');
          }

          const button = sceneElement.querySelector('a-ar-button');
          if (!button) throw new Error('Button is not found');
          
          const position = button.getAttribute('position');
          if (!position || position != "1 1.5 -3") {
            throw new Error('Position is incorrect');
          }
          
          const buttonContent = button.getAttribute('content');
          if (buttonContent !== "Start Project") throw new Error('Content is incorrect');

          const buttonPrimary = button.getAttribute('primary');
          if (buttonPrimary !== "#FF5733") throw new Error('Primary color is incorrect');

          const buttonSize = button.getAttribute('size');
          if (buttonSize !== "large") throw new Error('Size is incorrect');

          const buttonOutline = button.getAttribute('outline');
          if (buttonOutline !== "true") throw new Error('Button is not outlined');

          const buttonRounded = button.getAttribute('rounded');
          if (buttonRounded !== "true") throw new Error('Button is not rounded');
          `,
      },
    },
  },
  {
    id: 3,
    title: 'Checkbox',
    vueVariant: {
      content: `
      <div>
      <div class="bordered-section">
      <p>
      A checkbox is an essential user interface component that enables users to make binary choices, such as selecting or deselecting options. It is commonly used for tasks like toggling settings, selecting multiple items, or confirming agreements within an application.
      </p>
      </div>
      
      <div class="mb-6">
        <h2 tabindex="-1">
          What You Will Learn
        </h2>
        <ul class="lesson-detail--list">
          <li>How to implement checkboxes in an AR scene.</li>
          <li>How to modify checkbox properties such as size, position, and color.</li>
          <li>How to manage checkbox states (checked and unchecked).</li>
          <li>How to customize the checkbox's appearance with different themes (light and dark modes).</li>
        </ul>
      </div>

      <div class="mb-6">
        <h2 tabindex="-1">
        How the AR Checkbox Works
        </h2>
        <p>In an AR environment, checkboxes are typically used to allow users to interact with virtual objects or settings. When you click on the checkbox, it toggles between a checked or unchecked state.</p>
        <p>Here’s how the AR checkbox functions:</p>
        <ul class="lesson-detail--list">
          <li><span class="text-semibold">Visibility:</span> The visible property determines whether the checkbox appears in the AR scene or not.</li>
          <li><span class="text-semibold">Size:</span> Adjust the checkbox's size with the size property to make it easier to interact with, especially on mobile or VR devices.</li>
          <li><span class="text-semibold">Color:</span> The primary color can be changed to match the color scheme of your application, making it blend in or stand out.</li>
          <li><span class="text-semibold">State:</span> The value property reflects whether the checkbox is checked (true) or unchecked (false).</li>
          <li><span class="text-semibold">Variant:</span> The variant property allows you to customize the color scheme of the checkbox, making it fit into either a light or dark mode for the UI.</li>
        </ul>
      </div>

      <h2 tabindex="-1">
        Example
        <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a>
      </h2>

      <div id="placeholder"></div>

      <div>
      <h2 id="props" tabindex="-1">
        Props
        <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a>
      </h2>
      <table tabindex="0"><thead><tr><th>Property</th><th>Type</th><th>Default</th><th>Description</th></tr></thead><tbody><tr><td><em>visible</em></td><td>boolean</td><td>true</td><td>Controls the checkbox's visibility. When <code>true</code>, the checkbox is visible; when <code>false</code>, it is hidden.</td></tr><tr><td><em>size</em></td><td>enum (small, medium, large, extra-large)</td><td>medium</td><td>Sets the checkbox's size, adjusting padding, font size, and layout compactness accordingly.</td></tr><tr><td><em>position</em></td><td>number[]</td><td>0 0 0</td><td>Specifies the checkbox's position.</td></tr><tr><td><em>primary</em></td><td>string (blue, #fff)</td><td>#00BA92</td><td>Defines the primary color of the checkbox (affecting text, background, icon background).</td></tr><tr><td><em>value</em></td><td>boolean</td><td>false</td><td>Specifies whether the checkbox is checked.</td></tr><tr><td><em>variant</em></td><td>string (light, dark)</td><td>""</td><td>Sets the button's color scheme mode, either "light" or "dark," for visual theme consistency.</td></tr></tbody></table>
      
      <div>
        <h2 tabindex="-1">
          Your Task
        </h2>
        <p>Now that you understand the basics of a checkbox, it's time to practice!</p>
        <ul class="lesson-detail--list">
          <li>Modify the checkbox's color:
            <ul class="lesson-detail--list">
              <li>Set primary to #FF6347.</li>
            </ul>
          </li>
          <li>Modify the checkbox's size:
            <ul class="lesson-detail--list">
              <li>Set the size property to small.</li>
            </ul>
          </li>
          <li>Position the checkbox in the scene:
            <ul class="lesson-detail--list">
              <li>Set the position property to 0 2 -4.</li>
            </ul>
          </li>
          <li>Test a specific color scheme for the checkbox:
            <ul class="lesson-detail--list">
              <li>Set the variant property to dark.</li>
            </ul>
          </li>
          <li>Change the checkbox's state:
            <ul class="lesson-detail--list">
              <li>Set the value property to true (checked state).</li>
            </ul>
          </li>
        </ul>
      </div>

      </div>
      `,
      contentOutput: `
      <a-ar-checkbox
      position="-0.5 1.6 -3"
      size="extra-large"
  ></a-ar-checkbox>
  <a-ar-checkbox
      position="0.5 1.6 -3"
      value="true"
      size="extra-large"
  ></a-ar-checkbox>`,
      contentCode: [
        {
          lang: LanguageEnum.JS,
          content: `import "spatial-design-system/primitives/ar-checkbox.js";`,
        },
        {
          lang: LanguageEnum.HTML,
          content: `<a-ar-checkbox
  position="-0.5 1.6 -3"
  size="extra-large"
></a-ar-checkbox>

<a-ar-checkbox
  position="0.5 1.6 -3"
  value="true"
  size="extra-large"
></a-ar-checkbox>`
        }
      ],
      task: {
        id: 3,
        codes: [],
        hint: {
          lang: LanguageEnum.HTML,
          imports: `import "spatial-design-system/primitives/ar-checkbox.js";`,
          content: `<a-ar-checkbox
  primary="#FF6347"
  position="0 2 -4"
  value="true"
  size="small"
  variant="dark"
></a-ar-checkbox>
`,
        },
        test: `const sceneElement = document.querySelector('a-scene');
if (!sceneElement) {
  throw new Error('Scene is not found');
}

const checkbox = sceneElement.querySelector('a-ar-checkbox');
if (!checkbox) throw new Error('Checkbox is not found');
        
// const position = checkbox.getAttribute('position');
// if (!position || position != "0 2 -4") {
//   throw new Error('Position is incorrect');
// }
        
const primaryColor = checkbox.getAttribute('primary');
if (primaryColor !== "#FF6347") throw new Error('Color is incorrect');

const checkboxValue = checkbox.getAttribute('value');
if (checkboxValue !== "true") throw new Error('Value is incorrect');

const checkboxSize = checkbox.getAttribute('size');
if (checkboxSize !== "small") throw new Error('Size is incorrect');

const checkboxVariant = checkbox.getAttribute('variant');
if (checkboxVariant !== "dark") throw new Error('Variant is incorrect');
`,
      },
    },
    vanillaJSVariant: {
      content: `
      <div>
      <div class="bordered-section">
      <p>
      A checkbox is an essential user interface component that enables users to make binary choices, such as selecting or deselecting options. It is commonly used for tasks like toggling settings, selecting multiple items, or confirming agreements within an application.
      </p>
      </div>
      
      <div class="mb-6">
        <h2 tabindex="-1">
          What You Will Learn
        </h2>
        <ul class="lesson-detail--list">
          <li>How to implement checkboxes in an AR scene.</li>
          <li>How to modify checkbox properties such as size, position, and color.</li>
          <li>How to manage checkbox states (checked and unchecked).</li>
          <li>How to customize the checkbox's appearance with different themes (light and dark modes).</li>
        </ul>
      </div>

      <div class="mb-6">
        <h2 tabindex="-1">
        How the AR Checkbox Works
        </h2>
        <p>In an AR environment, checkboxes are typically used to allow users to interact with virtual objects or settings. When you click on the checkbox, it toggles between a checked or unchecked state.</p>
        <p>Here’s how the AR checkbox functions:</p>
        <ul class="lesson-detail--list">
          <li><span class="text-semibold">Visibility:</span> The visible property determines whether the checkbox appears in the AR scene or not.</li>
          <li><span class="text-semibold">Size:</span> Adjust the checkbox's size with the size property to make it easier to interact with, especially on mobile or VR devices.</li>
          <li><span class="text-semibold">Color:</span> The primary color can be changed to match the color scheme of your application, making it blend in or stand out.</li>
          <li><span class="text-semibold">State:</span> The value property reflects whether the checkbox is checked (true) or unchecked (false).</li>
          <li><span class="text-semibold">Variant:</span> The variant property allows you to customize the color scheme of the checkbox, making it fit into either a light or dark mode for the UI.</li>
        </ul>
      </div>

      <h2 tabindex="-1">
        Example
        <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a>
      </h2>

      <div id="placeholder"></div>

      <div>
      <h2 id="props" tabindex="-1">
        Props
        <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a>
      </h2>
      <table tabindex="0"><thead><tr><th>Property</th><th>Type</th><th>Default</th><th>Description</th></tr></thead><tbody><tr><td><em>visible</em></td><td>boolean</td><td>true</td><td>Controls the checkbox's visibility. When <code>true</code>, the checkbox is visible; when <code>false</code>, it is hidden.</td></tr><tr><td><em>size</em></td><td>enum (small, medium, large, extra-large)</td><td>medium</td><td>Sets the checkbox's size, adjusting padding, font size, and layout compactness accordingly.</td></tr><tr><td><em>position</em></td><td>number[]</td><td>0 0 0</td><td>Specifies the checkbox's position.</td></tr><tr><td><em>primary</em></td><td>string (blue, #fff)</td><td>#00BA92</td><td>Defines the primary color of the checkbox (affecting text, background, icon background).</td></tr><tr><td><em>value</em></td><td>boolean</td><td>false</td><td>Specifies whether the checkbox is checked.</td></tr><tr><td><em>variant</em></td><td>string (light, dark)</td><td>""</td><td>Sets the button's color scheme mode, either "light" or "dark," for visual theme consistency.</td></tr></tbody></table>
      
      <div>
        <h2 tabindex="-1">
          Your Task
        </h2>
        <p>Now that you understand the basics of a checkbox, it's time to practice!</p>
        <ul class="lesson-detail--list">
          <li>Modify the checkbox's color:
            <ul class="lesson-detail--list">
              <li>Set primary to #FF6347.</li>
            </ul>
          </li>
          <li>Modify the checkbox's size:
            <ul class="lesson-detail--list">
              <li>Set the size property to small.</li>
            </ul>
          </li>
          <li>Position the checkbox in the scene:
            <ul class="lesson-detail--list">
              <li>Set the position property to 0 2 -4.</li>
            </ul>
          </li>
          <li>Test a specific color scheme for the checkbox:
            <ul class="lesson-detail--list">
              <li>Set the variant property to dark.</li>
            </ul>
          </li>
          <li>Change the checkbox's state:
            <ul class="lesson-detail--list">
              <li>Set the value property to true (checked state).</li>
            </ul>
          </li>
        </ul>
      </div>

      </div>
      `,
      contentOutput: `
      <a-ar-checkbox
      position="-0.5 1.6 -3"
      size="extra-large"
  ></a-ar-checkbox>
  <a-ar-checkbox
      position="0.5 1.6 -3"
      value="true"
      size="extra-large"
  ></a-ar-checkbox>`,
      contentCode: [
        {
          lang: LanguageEnum.JS,
          content: `import "spatial-design-system/primitives/ar-checkbox.js";

<a-ar-checkbox
  position="-0.5 1.6 -3"
  size="extra-large"
></a-ar-checkbox>
        
<a-ar-checkbox
  position="0.5 1.6 -3"
  value="true"
  size="extra-large"
></a-ar-checkbox>
          `,
        },
      ],
      task: {
        id: 2,
        codes: [],
        hint: {
          lang: LanguageEnum.JS,
          imports: `import "spatial-design-system/primitives/ar-checkbox.js";`,
          content: `const checkbox = \`<a-ar-checkbox
  primary="#FF6347"
  position="0 2 -4"
  value="true"
  size="small"
  variant="dark"
></a-ar-checkbox>\`
          
scene.innerHTML = checkbox
app.appendChild(scene)
`,
        },
        test: `const sceneElement = document.querySelector('a-scene');
        if (!sceneElement) {
          throw new Error('Scene is not found');
        }
        
        const checkbox = sceneElement.querySelector('a-ar-checkbox');
        if (!checkbox) throw new Error('Checkbox is not found');
                
        const position = checkbox.getAttribute('position');
        if (!position || position != "0 2 -4") {
          throw new Error('Position is incorrect');
        }
                
        const primaryColor = checkbox.getAttribute('primary');
        if (primaryColor !== "#FF6347") throw new Error('Color is incorrect');
        
        const checkboxValue = checkbox.getAttribute('value');
        if (checkboxValue !== "true") throw new Error('Value is incorrect');
        
        const checkboxSize = checkbox.getAttribute('size');
        if (checkboxSize !== "small") throw new Error('Size is incorrect');
        
        const checkboxVariant = checkbox.getAttribute('variant');
        if (checkboxVariant !== "dark") throw new Error('Variant is incorrect');
`,
      },
    },
  },
];
