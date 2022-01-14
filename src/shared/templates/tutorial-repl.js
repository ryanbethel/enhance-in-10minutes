module.exports = function TutorialReplTemplate(_, html, store = {}) {
  const { templateCode = '' } = store
  return html`
    <div class="grid col-1 row-3 h-screen">
      <div class="border-solid ">
        <form method="POST" action="/learn">
          <div class="flex flex-col h-full justify-between ">
            <h2 class="border-solid border0 border-b1">Template Code</h2>
            <textarea class="w-full h-full" name="templateCode">
${templateCode || 'template code'}</textarea
            >
            <div class="w-full ">
              <button type="submit" class="border-solid pl1 pr1">run</button>
            </div>
          </div>
        </form>
      </div>
      <div class="border-solid">
        <details open>
          <summary>Output</summary>
          <render-html></render-html>
        </details>
      </div>
      <div class="border-solid">
        <details open>
          <summary>HTML</summary>
          <show-html></show-html>
        </details>
      </div>
    </div>
  `
}
