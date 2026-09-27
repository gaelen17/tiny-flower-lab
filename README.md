# 🌸 tiny-flower-lab
My little SVG flower lab: creating and animating parametric SVG flowers.

This project is a sandbox to test and generate dynamic SVG flowers in a grid. Instead of hard-coding the SVGs, everything is generated on the fly via JavaScript.

## How it works
* **Dynamic SVGs:** Every petal and center is built using Vanilla JavaScript (`document.createElementNS`).
* **Parametric Data:** A configuration array allows me to easily change the color, the petal shape (Bézier curves), and the number of petals for each individual flower.
* **Animations:** Powered by GSAP 3. Features staggered entrances, infinite rotations, and organic movements.
* **Layout:** A clean CSS Grid to compare different vector shapes side-by-side.

**Tech Stack:** Vanilla JS | SVG | CSS Grid | GSAP 3
