import { staminaImageSrc } from '../constants';
import 'aframe';

AFRAME.registerComponent('stamina-bar', {
  schema: {
    max: { type: 'number', default: 100 },
  },
  init() {
    this.width = 3;
    this.height = 0.8;
    this.current = this.data.max;
    this.enableSprint = true;
    this.sprinting = false;
    this.initBar();
    this.bindEvents();
  },
  bindEvents() {
    document.addEventListener('sprinting', (event) => {
      if (this.enableSprint) {
        this.sprinting = true;
      }
    });

    document.addEventListener('not-sprinting', (event) => {
      if (this.enableSprint) {
        this.sprinting = false;
      }
    });
  },

  tick() {
    if (this.enableSprint) {
      if (this.sprinting) {
        this.decreaseStamina();
        this.updateBar();
        this.checkStamina();
      }
    }
  },

  decreaseStamina() {
    this.current = Math.max(0, this.current - 1);
  },

  checkStamina() {
    if (this.enableSprint) {
      if (this.current <= 0) {
        this.enableSprint = false;
        const mainCharacter = document.querySelector('#main-character');
        mainCharacter.emit('out-of-stamina');
      }
    }
  },

  updateBar() {
    this.text.setAttribute('value', this.current);

    const staminaRation = Math.max(0, this.current / this.data.max);
    const newWidth = this.width * staminaRation; // Assuming width is 1
    this.fg.setAttribute('width', newWidth);
    const offsetX = staminaRation === 1 ? 0 : -(this.width - newWidth) / 2;
    this.fg.setAttribute('position', {
      x: offsetX, // Adjusting for the initial position
      y: 0,
      z: 0.01,
    });
  },

  initBar() {
    // background bar (max stamina)
    this.bg = document.createElement('a-plane');
    this.bg.setAttribute('width', this.width);
    this.bg.setAttribute('height', this.height);
    this.bg.setAttribute('color', '#555');
    this.bg.setAttribute('position', '0 0 0');
    this.el.appendChild(this.bg);

    // foreground bar (current stamina)
    this.fg = document.createElement('a-plane');
    this.fg.setAttribute('width', this.width);
    this.fg.setAttribute('height', this.height);
    this.fg.setAttribute('color', '#1976D2');
    this.fg.setAttribute('position', '0 0 0.01'); // Slightly in front
    this.el.appendChild(this.fg);

    // image
    this.img = document.createElement('a-image');
    this.img.setAttribute('src', staminaImageSrc);
    this.img.setAttribute('width', '0.8');
    this.img.setAttribute('height', '0.8');
    this.img.setAttribute('scale', '0.9 0.9 0.9');
    this.img.setAttribute('position', '1.2 -0.05 0.1');
    this.el.appendChild(this.img);

    // text above
    this.text = document.createElement('a-text');
    this.text.setAttribute('value', this.current);
    this.text.setAttribute('color', 'black');
    this.text.setAttribute('width', '8');
    this.text.setAttribute('position', '0 0.8 0');
    this.text.setAttribute('z-index', '100');
    this.el.appendChild(this.text);
  },
});
