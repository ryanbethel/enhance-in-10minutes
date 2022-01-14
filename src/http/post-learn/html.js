const enhance = require('@enhance/ssr')
const { top, bottom } = require('@architect/shared/page-layout')

module.exports = async function HTML(req) {
  const { templateCode = '' } = req.body
  let htmlOut
  let html
  if (templateCode) htmlOut = html`${templateCode}`
  try {
    html = enhance({
      templates: './@architect/shared/templates',
      state: {
        templateCode,
        htmlOut,
      },
    })
    return {
      statusCode: 200,
      html: html` ${top()}
        <tutorial-page></tutorial-page>
        ${bottom}`,
    }
  } catch (err) {
    console.log(err)
    return {
      statusCode: 500,
      html: 'error',
    }
  }
}
