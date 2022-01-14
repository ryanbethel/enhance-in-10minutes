module.exports = function TutorialPageTemplate(_, html) {
  return html`
    <div class="grid col-3">
      <div class="border-solid col-span-1 h-screen">
        <tutorial-content></tutorial-content>
      </div>
      <div class="border-solid col-span-2 h-screen">
        <tutorial-repl></tutorial-repl>
      </div>
    </div>
  `
}
