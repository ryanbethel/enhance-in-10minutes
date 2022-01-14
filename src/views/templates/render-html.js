module.exports = function ShowHtmlTemplate(_, html, store = {}) {
  const { templateCode = '' } = store
  return html` ${templateCode || ''} `
}
