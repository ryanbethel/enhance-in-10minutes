module.exports = function PageHeaderTemplate(_, html) {
  return html`
    <link rel="stylesheet" href="/components/styles.css" />
    <style></style>
    <div class="flex justify-center m-auto p1 p3-lg">
      <slot></slot>
    </div>

    <script type="module">
      class PageHeader extends HTMLElement {
        constructor() {
          super()
        }
      }
      customElements.define('page-header', PageHeader)
    </script>
  `
}
