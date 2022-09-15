export const canUseDom = !!(
  typeof window !== 'undefined' &&
  typeof document !== 'undefined' &&
  window.document &&
  window.document.createElement
);

export let supportsPassive = false;

if (canUseDom) {
  try {
    // Test via a getter in the options object to see
    // if the passive property is accessed
    const opts = Object.defineProperty({}, 'passive', {
      get: function () {
        supportsPassive = true;
      },
    });
    window.addEventListener('test', null, opts);
  } catch (e) {}
}
