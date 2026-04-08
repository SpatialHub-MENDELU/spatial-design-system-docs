import { timeImageSrc } from '../constants';
import 'aframe';

AFRAME.registerComponent('time-counter', {
  schema: {
    initialTime: { type: 'number', default: 65 },
    criticalTime: { type: 'number', default: 60 }, // in seconds
  },
  init() {
    this.time = this.formatSecondsToMinutesAndSeconds(this.data.initialTime); // in seconds
    this.remainingSeconds = this.data.initialTime;
    this.lastTime = null;
    this.bouncing = false;
    this.initCounter();
  },

  tick(time, timeDelta) {
    this.decreaseTime(time, timeDelta);
    if (this.remainingSeconds <= this.data.criticalTime) {
      this.text.setAttribute('color', 'red');
      this.bounce();
    }
  },

  bounce() {
    if (!this.bouncing) {
      this.bouncing = true;
      this.img.setAttribute('animation', {
        property: 'scale',
        to: '1.15 1.15 1.15',
        dur: 500,
        easing: 'easeInOutQuad',
        loop: true,
        dir: 'alternate',
      });
    }
  },

  decreaseTime(time, timeDelta) {
    if (this.lastTime === null) {
      this.lastTime = time;
      return;
    }

    const deltaSeconds = timeDelta / 1000;
    if (this.remainingSeconds > 0) {
      this.remainingSeconds -= deltaSeconds;
      if (this.remainingSeconds < 0) this.remainingSeconds = 0;
      this.time = this.formatSecondsToMinutesAndSeconds(
        Math.floor(this.remainingSeconds)
      );
      this.updateDisplay();
    } else {
      console.log("Time's up");
      this.bouncing = false;
      this.el.emit('time-is-up');
    }
    this.lastTime = time;
  },

  updateDisplay() {
    this.text.setAttribute('value', this.time);
  },

  formatSecondsToMinutesAndSeconds(totalSeconds) {
    if (isNaN(totalSeconds) || totalSeconds < 0) {
      return 'Time: Bad input';
    }

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  },
  initCounter() {
    // white background
    this.bg = document.createElement('a-plane');
    this.bg.setAttribute('width', '3');
    this.bg.setAttribute('height', '1.2');
    this.bg.setAttribute('color', 'white');
    this.bg.setAttribute('position', '0 0 0');
    this.bg.setAttribute('opacity', '0.95');
    this.el.appendChild(this.bg);

    // image
    this.img = document.createElement('a-image');
    this.img.setAttribute('src', timeImageSrc);
    this.img.setAttribute('width', '1.2');
    this.img.setAttribute('height', '1.2');
    this.img.setAttribute('scale', '1 1 1');
    this.img.setAttribute('position', '-0.8 0 0.01');
    this.el.appendChild(this.img);

    // count
    this.text = document.createElement('a-text');
    this.text.setAttribute('value', this.time);
    this.text.setAttribute('color', 'black');
    this.text.setAttribute('width', '10');
    this.text.setAttribute('position', '0 0 0.01');
    this.text.setAttribute('z-index', '100');
    this.el.appendChild(this.text);
  },
});
