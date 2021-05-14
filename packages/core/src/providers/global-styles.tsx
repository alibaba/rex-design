import { serializeStyles } from '@emotion/serialize';
import { StyleSheet } from '@emotion/sheet';
import React, { useLayoutEffect, useRef } from 'react';
import { createGlobalStyle } from 'styled-components';
// @ts-ignore
import { compile, middleware, rulesheet, serialize, stringify } from 'stylis';
import { Dict } from '../types';
import { getToken, isValidTokenPath } from '../utils';

function themeToVariables(obj: Dict, prefix = '--rex') {
  let paths: string[][] = [];

  Object.keys(obj).forEach((key) => {
    const keypath = prefix ? [prefix, key].join('-') : key;
    if (typeof obj[key] === 'string') {
      let val = obj[key];

      if (isValidTokenPath(val)) {
        val = getToken(val, 'common');
      }

      paths.push([keypath, val]);
    } else {
      paths = paths.concat(themeToVariables(obj[key], keypath));
    }
  });

  return paths;
}

function injectGlobal(style: string) {
  const { name, styles } = serializeStyles(style as any, null);
  const sheet = new StyleSheet({
    key: `global-${name}`,
    container: document.head,
    speedy: true,
  });

  serialize(
    compile(styles),
    middleware([
      stringify,
      rulesheet((rule: any) => {
        sheet.insert(rule);
      }),
    ]),
  );

  return [name, () => sheet.flush()] as const;
}

export const CssVariables = React.memo(({ theme, root }: { theme: any; root: boolean }) => {
  const ref = useRef<HTMLDivElement>();

  useLayoutEffect(() => {
    const variables = themeToVariables(theme);

    if (root) {
      const globalStyle = `
        :root {
          ${variables.map((item: string[]) => item.join(':')).join(';')}
        }`;
      const [name, disposer] = injectGlobal(globalStyle);
      return disposer;
    }

    const target = ref.current.parentElement;

    if (target) {
      const existedApps = Array.from(target.ownerDocument.querySelectorAll<HTMLDivElement>('*[data-rex-app]'));
      const maxAppNo = existedApps.reduce((max, div) => {
        const appNo = Number(div.dataset.rexApp.replace(/^app_/, ''));
        return Math.max(max, appNo);
      }, 0);
      const nextAppNo = maxAppNo + 1;

      target.dataset.rexApp = `app_${nextAppNo}`;

      const globalStyle = `
        *[data-rex-app="${`app_${nextAppNo}`}"] {
          ${variables.map((item: string[]) => item.join(':')).join(';')}
        }`;
      const [name, disposer] = injectGlobal(globalStyle);

      target.dataset.rexAppStyleSheetName = name;

      return disposer;
    }
  }, [root, theme]);

  if (root) {
    return null;
  }

  return <div ref={ref} style={{ display: 'none' }} data-rex-app-parent-sensor="" />;
});

export const Normalize = createGlobalStyle`
html {
    line-height: 1.5; /* 1 */
    -ms-text-size-adjust: 100%; /* 2 */
    -webkit-text-size-adjust: 100%; /* 2 */
}

:root {
  color: var(--rex-colors-text-body)
}

/*
 * Border box
 */

*, *:before, *:after {
  box-sizing: border-box;
}

/* Sections
    ========================================================================== */

/**
* Remove the margin in all browsers (opinionated).
*/

body {
    margin: 0;
    font-family: 'PingFang SC', Roboto, 'Helvetica Neue', Arial,
  'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
  'Noto Color Emoji';
}

/**
* Add the correct display in IE 9-.
*/

article,
aside,
footer,
header,
nav,
section {
    display: block;
}

/**
* Correct the font size and margin on h1 elements within section and
* article contexts in Chrome, Firefox, and Safari.
*/

h1 {
    font-size: 2em;
    margin: .67em 0;
}

/* Grouping content
    ========================================================================== */

/**
* Add the correct display in IE 9-.
* 1. Add the correct display in IE.
*/

figcaption,
figure,
main { /* 1 */
    display: block;
}

/**
* Add the correct margin in IE 8.
*/

figure {
    margin: 1em 40px;
}

/**
* 1. Add the correct box sizing in Firefox.
* 2. Show the overflow in Edge and IE.
*/

hr {
    box-sizing: content-box; /* 1 */
    height: 0; /* 1 */
    overflow: visible; /* 2 */
}

/**
* 1. Correct the inheritance and scaling of font size in all browsers.
* 2. Correct the odd em font sizing in all browsers.
*/

pre {
    font-family: monospace, monospace; /* 1 */
    font-size: 1em; /* 2 */
}

/* Text-level semantics
    ========================================================================== */

/**
* 1. Remove the gray background on active links in IE 10.
* 2. Remove gaps in links underline in iOS 8+ and Safari 8+.
*/

a {
    background-color: transparent; /* 1 */
    -webkit-text-decoration-skip: objects; /* 2 */
}

/**
* 1. Remove the bottom border in Chrome 57- and Firefox 39-.
* 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
*/

abbr[title] {
    border-bottom: none; /* 1 */
    text-decoration: underline; /* 2 */
    text-decoration: underline dotted; /* 2 */
}

/**
* Prevent the duplicate application of bolder by the next rule in Safari 6.
*/

b,
strong {
    font-weight: inherit;
}

/**
* Add the correct font weight in Chrome, Edge, and Safari.
*/

b,
strong {
    font-weight: bolder;
}

/**
* 1. Correct the inheritance and scaling of font size in all browsers.
* 2. Correct the odd em font sizing in all browsers.
*/

code,
kbd,
samp {
    font-family: monospace, monospace; /* 1 */
    font-size: 1em; /* 2 */
}

/**
* Add the correct font style in Android 4.3-.
*/

dfn {
    font-style: italic;
}

/**
* Add the correct background and color in IE 9-.
*/

mark {
    background-color: #FF0;
    color: #000;
}

/**
* Add the correct font size in all browsers.
*/

small {
    font-size: 80%;
}

/**
* Prevent sub and sup elements from affecting the line height in
* all browsers.
*/

sub,
sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
}

sub {
    bottom: -.25em;
}

sup {
    top: -.5em;
}

/* Embedded content
    ========================================================================== */

/**
* Add the correct display in IE 9-.
*/

audio,
video {
    display: inline-block;
}

/**
* Add the correct display in iOS 4-7.
*/

audio:not([controls]) {
    display: none;
    height: 0;
}

/**
* Remove the border on images inside links in IE 10-.
*/

img {
    border-style: none;
}

/**
* Hide the overflow in IE.
*/

svg:not(:root) {
    overflow: hidden;
}

/* Forms
    ========================================================================== */

/**
* 1. Change the font styles in all browsers (opinionated).
* 2. Remove the margin in Firefox and Safari.
*/

button,
input,
optgroup,
select,
textarea {
    font-family: inherit; /* 1 */
    font-size: 100%; /* 1 */
    line-height: 1.15; /* 1 */
    margin: 0; /* 2 */
}

/**
* Show the overflow in IE.
* 1. Show the overflow in Edge.
*/

button,
input { /* 1 */
    overflow: visible;
}

/**
* Remove the inheritance of text transform in Edge, Firefox, and IE.
* 1. Remove the inheritance of text transform in Firefox.
*/

button,
select { /* 1 */
    text-transform: none;
}

/**
* 1. Prevent a WebKit bug where (2) destroys native audio and video
*    controls in Android 4.
* 2. Correct the inability to style clickable types in iOS and Safari.
*/

button,
html [type="button"], /* 1 */
[type="reset"],
[type="submit"] {
    -webkit-appearance: button; /* 2 */
}

/**
* Remove the inner border and padding in Firefox.
*/

button::-moz-focus-inner,
[type="button"]::-moz-focus-inner,
[type="reset"]::-moz-focus-inner,
[type="submit"]::-moz-focus-inner {
    border-style: none;
    padding: 0;
}

/**
* Restore the focus styles unset by the previous rule.
*/

button:-moz-focusring,
[type="button"]:-moz-focusring,
[type="reset"]:-moz-focusring,
[type="submit"]:-moz-focusring {
    outline: 1px dotted ButtonText;
}

/**
* Correct the padding in Firefox.
*/

fieldset {
    padding: .35em .75em .625em;
}

/**
* 1. Correct the text wrapping in Edge and IE.
* 2. Correct the color inheritance from fieldset elements in IE.
* 3. Remove the padding so developers are not caught out when they zero out
*    fieldset elements in all browsers.
*/

legend {
    box-sizing: border-box; /* 1 */
    color: inherit; /* 2 */
    display: table; /* 1 */
    max-width: 100%; /* 1 */
    padding: 0; /* 3 */
    white-space: normal; /* 1 */
}

/**
* 1. Add the correct display in IE 9-.
* 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.
*/

progress {
    display: inline-block; /* 1 */
    vertical-align: baseline; /* 2 */
}

/**
* Remove the default vertical scrollbar in IE.
*/

textarea {
    overflow: auto;
}

/**
* 1. Add the correct box sizing in IE 10-.
* 2. Remove the padding in IE 10-.
*/

[type="checkbox"],
[type="radio"] {
    box-sizing: border-box; /* 1 */
    padding: 0; /* 2 */
}

/**
* Correct the cursor style of increment and decrement buttons in Chrome.
*/

[type="number"]::-webkit-inner-spin-button,
[type="number"]::-webkit-outer-spin-button {
    height: auto;
}

/**
* 1. Correct the odd appearance in Chrome and Safari.
* 2. Correct the outline style in Safari.
*/

[type="search"] {
    -webkit-appearance: textfield; /* 1 */
    outline-offset: -2px; /* 2 */
}

/**
* Remove the inner padding and cancel buttons in Chrome and Safari on macOS.
*/

[type="search"]::-webkit-search-cancel-button,
[type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
}

/**
* 1. Correct the inability to style clickable types in iOS and Safari.
* 2. Change font properties to inherit in Safari.
*/

::-webkit-file-upload-button {
    -webkit-appearance: button; /* 1 */
    font: inherit; /* 2 */
}

/* Interactive
    ========================================================================== */

/*
* Add the correct display in IE 9-.
* 1. Add the correct display in Edge, IE, and Firefox.
*/

details, /* 1 */
menu {
    display: block;
}

/*
* Add the correct display in all browsers.
*/

summary {
    display: list-item;
}

/* Scripting
    ========================================================================== */

/**
* Add the correct display in IE 9-.
*/

canvas {
    display: inline-block;
}

/**
* Add the correct display in IE.
*/

template {
    display: none;
}

/* Hidden
    ========================================================================== */

/**
* Add the correct display in IE 10-.
*/

[hidden] {
    display: none;
}
`;
