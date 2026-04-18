import 'aframe';

AFRAME.registerComponent('babies-counter', {
    schema: {
        image: { type: 'string', default: '' },
        initialCount: { type: 'number', default: 0 }
    },
    init() {
        this.count = this.data.initialCount

        this.initCounter()
    },

    increaseCount(amount = 1) {
        this.count += amount;
        console.log("increase")
        this.updateDisplay();
        this.bounce();
    },

    updateDisplay() {
        this.text.setAttribute('value', `${this.count}x`);
    },
    bounce() {
        if (!this.img) return;
        this.img.removeAttribute('animation__bounce');
        this.img.setAttribute('scale', '1 1 1');
        this.img.setAttribute('animation__bounce', {
            property: 'scale',
            to: '1.2 1.2 1.2',
            dur: 50,
            dir: 'alternate',
            easing: 'easeOutElastic',
            loop: 1
        });
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
        this.img.setAttribute('src', this.data.image);
        this.img.setAttribute('width', '1.3');
        this.img.setAttribute('height', '1');
        this.img.setAttribute('scale', '1 1 1');
        this.img.setAttribute('position', '-0.5 0 0.01')
        this.el.appendChild(this.img);

        // count
        this.text = document.createElement('a-text');
        this.text.setAttribute('value', `${this.count}x`);
        this.text.setAttribute('color', 'black');
        this.text.setAttribute('width', '10');
        this.text.setAttribute('position', '0.5 0 0.01');
        this.text.setAttribute('z-index', '100');
        this.el.appendChild(this.text);
    }
})
