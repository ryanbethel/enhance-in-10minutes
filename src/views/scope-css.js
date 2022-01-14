const cssjs = require('jotform-css.js')
const parser = new cssjs.cssjs()
module.exports = function scopeCSS({ css, scopeTo, disabled = false }) {
  if (disabled) return css
  return parser
    .parseCSS(css)
    .map(
      (i) => `
${scopeTo} ${i.selector} { 
  ${i.rules.map((r) => `${r.directive}: ${r.value};`).join('\n  ')}
}`,
    )
    .join('\n')
}
