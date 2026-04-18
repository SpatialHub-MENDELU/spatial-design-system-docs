import healthImg from '/game_images/health.png';
import 'aframe';

AFRAME.registerComponent('health-bar', {
    schema: {
        max: { type: 'number', default: 100 },
    },

    init() {
        this.current = this.data.max
        this.width = 3
        this.height = 0.8

        this.initBar();

    },

    updateBar() {
        const healthRatio = Math.max(0, this.current / this.data.max);
        const newWidth = this.width * healthRatio;

        this.fg.setAttribute('animation__width', {
            property: 'width',
            to: newWidth,
            dur: 500, // this and the duration in animation__pos must be the same to work correctly
            easing: 'easeOutQuad'
        });


        const leftAlignedX = -this.width / 2 + newWidth / 2;

        this.fg.setAttribute('animation__pos', {
            property: 'position',
            to: `${leftAlignedX} 0 0.01`,
            dur: 500,
            easing: 'easeOutQuad'
        });


        this.text.setAttribute('value', this.current);
    },

    decreaseHealth(value) {
        this.current = Math.max(0, this.current - value);
        this.updateBar();
        this.bounce();
        this.checkDeath()
    },

    checkDeath() {
        if (this.current <= 0) {
            this.el.emit('death');
        }
    },

    bounce() {
        if (!this.img) return;
        this.img.removeAttribute('animation__bounce');
        this.img.setAttribute('scale', '1 1 1');
        this.img.setAttribute('animation__bounce', {
            property: 'scale',
            to: '1.2 1.2 1.2',
            dur: 70,
            dir: 'alternate',
            easing: 'easeOutElastic',
            loop: 1
        });
    },

    initBar() {
        // Background bar (max health)
        this.bg = document.createElement('a-plane');
        this.bg.setAttribute('width', this.width);
        this.bg.setAttribute('height', this.height);
        this.bg.setAttribute('color', '#555');
        this.bg.setAttribute('position', '0 0 0');
        this.el.appendChild(this.bg);

        // Foreground bar (current health)
        this.fg = document.createElement('a-plane');
        this.fg.setAttribute('height', this.height);
        this.fg.setAttribute('width', this.width);
        this.fg.setAttribute('color', '#D84315');
        this.fg.setAttribute('position', '0 0 0.01'); // Slightly in front
        this.el.appendChild(this.fg);

        // image
        this.img = document.createElement('a-image');
        this.img.setAttribute('src', healthImg);
        this.img.setAttribute('width', '0.8');
        this.img.setAttribute('height', '0.8');
        this.img.setAttribute('scale', '1 1 1');
        this.img.setAttribute('position', '1 -0.05 0.1')
        this.el.appendChild(this.img);

        //text

        this.text = document.createElement('a-text');
        this.text.setAttribute('value', this.current);
        this.text.setAttribute('color', 'black');
        this.text.setAttribute('width', '8');
        this.text.setAttribute('position', '0 0.8 0');
        this.text.setAttribute('z-index', '100');
        this.el.appendChild(this.text);
    },
});
