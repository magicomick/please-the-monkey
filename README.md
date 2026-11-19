<h1 align="center">
  <a href="https://magicomick.github.io/please-the-monkey/"><img src="assets/readme/logo.svg" alt="Please the Monkey" width="700px"></a>
</h1>

<div align="center">

[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)
[![Vanilla JS](https://img.shields.io/badge/JavaScript-ES6%2B-yellow?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)

<p><em>A fast-paced reflex-based arcade clicker browser game built with vanilla JavaScript.</em></p>

<p>
  <a href="https://magicomick.github.io/please-the-monkey/"><strong>🎮 Play Live Demo</strong></a> ·
  <a href="#about">About</a> ·
  <a href="#how-to-play">How to Play</a> ·
  <a href="#built-with">Tools</a> ·
  <a href="#credits">Credits</a>
</p>

<a href="https://magicomick.github.io/please-the-monkey/">
  <img src="assets/readme/preview.gif" alt="Please the Monkey Gameplay Preview (click to play)" width="600px" />
</a>

</div>

## About

Keep the monkey's patience bar from draining while items bounce around the screen, DVD-screensaver style. Designed, illustrated, and programmed as a self-taught first project in 3 weeks, with zero external libraries or frameworks.

## How to Play

| Action                   | Effect                                             |
| ------------------------ | -------------------------------------------------- |
| 🐵 Click the monkey      | `+5%` patience                                     |
| 🍌 Click a good banana   | `+40%` patience                                    |
| 🤢 Click a rotten banana | `-15%` patience                                    |
| 💩 Click poops           | Clear them before they speed up patience depletion |

The monkey reacts to its current patience level, the game works with mouse or touch, and high scores are saved locally.

## Built With

- **HTML5**, **CSS3** and **Vanilla JavaScript (ES6+)**
- **Figma** (vector art and SVG design)
- **Audacity** (audio editing)

## Known Bugs & Limitations

- **Input Latency:** Floating items may need an extra click, and a successful click can take a moment to show on the patience bar.
- **Viewport Boundary Collisions:** Bounce animations can occasionally overlap near the edges.

## Future Improvements

- **Collision Refactor:** Move item physics and boundary logic into class-based modules.
- **Game Balance:** Tune patience gain/loss against score progression.
- **Menus & Navigation:** Add a return-to-title option, a tutorial, and a credits menu.
- **UI/UX, Audio & Animations:** Add background art, feedback on items, particles, and monkey reaction animations.
- **Responsive Design:** Improve layout scaling and touch targets across screen sizes.
- **Sprite Colors:** Rework the red-heavy SVG sprites with a more balanced palette.

## Credits

- **Progress Bar UI:** Adapted from the [CSS-Tricks Progress Bars Guide](https://css-tricks.com/css3-progress-bars/).
- **Title Music:** _"[Digital Bananas](https://opengameart.org/content/digital-bananas)"_ by Locomule ([CC0](https://creativecommons.org/publicdomain/zero/1.0/)).
- **Game Music:** _"[Banana track](https://opengameart.org/content/banana-track)"_ by skrjablin ([CC0](https://creativecommons.org/publicdomain/zero/1.0/)).
- **Fonts:** _Irish Grover_ ([Apache License](http://www.apache.org/licenses/LICENSE-2.0)) and _Noto Sans Symbols 2_ ([SIL OFL](https://openfontlicense.org/open-font-license-official-text/)), both via Google Fonts.

## License

Licensed under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) by **Matheus GB Freitas**: you may share and adapt this work with credit, for non-commercial purposes, under the same license. The game's name and branding remain the property of the author.

## Support the Creator ☕

If you enjoyed _Please the Monkey_ or found the code useful for your studies, consider supporting my journey:

<a href="https://ko-fi.com/magicomick" target="_blank">
  <img src="https://storage.ko-fi.com/cdn/kofi3.png?v=3" alt="Support me on Ko-fi" height="36">
</a>
