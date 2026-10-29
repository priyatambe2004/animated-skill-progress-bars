# Animated Skill Bars Portfolio

**Task 29 · Web Development Track ·**

A small portfolio site with a skills section where progress bars fill to a percentage when they scroll into view.

## Objective

Practice CSS animations and transitions, and basic scroll detection.

## Tools

- HTML5
- CSS3
- JavaScript (vanilla, no libraries)

## Project structure

```
skill-bars/
├── index.html   # Page and skill bar markup
├── style.css    # Palette, bars, transitions, layout
├── script.js    # Scroll detection, count-up, filter, sort
└── README.md
```

## How to run

Keep the three files together and open `index.html` in a browser. No server or internet is needed. Fonts load from Google Fonts and fall back to system fonts offline.

## Deliverables

| Deliverable | How it is done |
| --- | --- |
| At least 5 skill bars with labels and percentages | 10 skill bars in three groups, plus 3 "currently learning" bars |
| Fill animation on load or scroll | An `IntersectionObserver` fills each bar the first time it is 40% visible |
| Responsive layout | Two columns on desktop, one column on phones, with a flexible hero and project grid |

## Hints from the task

- **CSS transitions on width:** `.fill` has `transition: width 1.3s` and starts at `width: 0`. JavaScript sets the width and the browser animates it.
- **Target width in a data attribute:** `<article class="skill" data-percent="92">`. The script reads it with `el.dataset.percent`.
- **Trigger with IntersectionObserver:** each bar is observed and starts filling as it scrolls into view. A small stagger makes bars that appear together fill one after another.

## How to change the skills

The sample numbers are placeholders. To use your own, edit the `data-percent` value and the name in `index.html`. To add a skill, copy one `<article class="skill">` block, change `data-cat` (`frontend`, `tools` or `soft`) and the values. The level label, colour, ARIA values, summary ring and sorting all update on their own.

## Extra features

- Numbers count up from 0% in step with each bar, using `requestAnimationFrame`.
- Category colours: violet to pink for front-end, teal to green for tools, amber to orange for soft skills, and sky blue for learning.
- Filter tabs, sort menu (default, highest, lowest, A to Z) and a Replay button.
- Summary ring that animates to the average of the visible skills, plus count, strongest skill and overall level.
- A level label for each skill (Beginner, Intermediate, Advanced, Expert).
- Project cards built from an array.
- Accessibility: each bar has `role="progressbar"` with its final value, visible focus outlines and reduced-motion support (bars show their final value straight away).
- Dark and light themes that remember your choice.

## Interview questions

**How would you animate a bar filling to a percentage?**
Start the fill element at `width: 0` with `transition: width 1.3s ease`. When it should animate, set its width to the target percentage (for example `92%`). The browser animates between the two values. Animating `transform: scaleX()` is an alternative that can be smoother on slow devices.

**What is IntersectionObserver used for?**
It tells you when an element enters or leaves the viewport (or another container) without listening to scroll events. It runs off the main thread and is much cheaper than checking positions on every scroll. Common uses are scroll-triggered animations, lazy loading images and infinite scroll.

**How would you keep the percentages configurable?**
Store each target in the HTML as `data-percent` and read it with JavaScript, so changing a number never needs a code change. For larger sites, keep the skills in an array or JSON file and generate the bars from it.

## 👩‍💻 Author

Priya Tambe
