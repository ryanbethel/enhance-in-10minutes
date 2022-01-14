const enhance = require('@enhance/ssr')
const { top, bottom } = require('@architect/views/page-layout')
let html = enhance()

module.exports = async function HTML() {
  try {
    html = enhance({
      state: {
        templateCode: `
        <my-h1>Template Code</my-h1>
        <p>You can edit this code</p>
        <p>You can use any templates that are in the template directory (i.e. my-h1)</p>
    `,
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
      html: html`<error-page error=${err}></error-page>`,
    }
  }
}
