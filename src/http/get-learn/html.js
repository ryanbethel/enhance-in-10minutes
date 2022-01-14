const enhance = require('@enhance/ssr')
const { top, bottom } = require('@architect/views/page-layout')
let html = enhance()

module.exports = async function HTML(req) {
  try {
    html = enhance({
      state: {},
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
      html: html`<error-page error=${err}></error-page>`,
    }
  }
}
