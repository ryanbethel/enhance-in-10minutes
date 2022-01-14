module.exports = function ShowHtmlTemplate(_, html, store = {}) {
  const { htmlOut = '' } = store
  return html`
    <div>
      <textarea class="w-full h-full" readonly>${htmlOut || 'none'}</textarea>
    </div>
  `
}
