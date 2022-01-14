const { toFlatBranch } = require('../../shared/tree-db')
module.exports = function NewBranchTemplate(state = {}, html) {
  const { branch, ...rest } = state
  const flatBranch = branch && toFlatBranch(branch)
  const values = {
    ...{
      type: '',
      path: '',
      'page-title': '',
      'page-subtitle': '',
      'page-description': '',
      'page-logo': '',
      'page-links-0-url': '',
      'page-links-0-text': '',
      'short-url': '',
      'short-type': '',
    },
    ...flatBranch,
    ...rest,
  }

  return html`
    <style>
      form {
        font: 1em sans-serif;
        max-width: 320px;
      }

      p > label {
        display: block;
      }

      input[type='text'],
      input[type='email'],
      input[type='number'],
      textarea,
      fieldset {
        width: 100%;
        border: 1px solid #333;
        box-sizing: border-box;
      }

      input:invalid {
        box-shadow: 0 0 5px 1px red;
      }

      input:focus:invalid {
        box-shadow: none;
      }
    </style>
    <form class="js-form" action="/branch" method="POST">
      <label for="type">Choose Branch Type:</label>
      <select name="type" pattern="page|short">
        <option value="">--choose an option--</option>
        <option ${values.type === 'page' ? 'selected' : ''} value="page">
          Link Page
        </option>
        <option ${values.type === 'short' ? 'selected' : ''} value="short">
          Direct Short Link
        </option>
      </select>
      <p>
        <label for="t1"
          >What's your favorite fruit?<abbr
            title="This field is mandatory"
            aria-label="required"
            >*</abbr
          ></label
        >
        <input
          type="text"
          id="t1"
          name="fruit"
          list="l1"
          required
          pattern="page|short"
        />
        <datalist id="l1">
          <option>Banana</option>
          <option>Cherry</option>
          <option>Apple</option>
          <option>Strawberry</option>
          <option>Lemon</option>
          <option>Orange</option>
        </datalist>
      </p>

      <label for="path">
        <input
          class="js-text-input border1 border-solid"
          name="path"
          placeholder="path"
          type="text"
          value="${values?.path || ''}"
          required
          pattern="[a-zA-Z0-9/]*"
        />
      </label>
      <label for="page-title">
        <input
          class="js-text-input border1 border-solid"
          name="page-title"
          placeholder="title"
          type="text"
          value="${values['page-title'] || ''}"
          maxlength="30"
        />
      </label>
      <label for="page-subtitle">
        <input
          class="js-text-input border1 border-solid"
          name="page-subtitle"
          placeholder="subtitle"
          type="text"
          value="${values['page-subtitle'] || ''}"
          maxlength="50"
        />
      </label>
      <label for="page-description">
        <textarea
          class="js-text-input border1 border-solid"
          name="page-description"
          type="text"
          placeholder="description"
          value="${values['page-description'] || ''}"
          maxlength="200"
        ></textarea>
      </label>
      <label for="page-logo">
        <input
          class="js-text-input border1 border-solid"
          name="page-logo"
          placeholder="logo"
          type="text"
          value="${values['page-logo'] || ''}"
        />
      </label>
      <label for="page-links-0-text">
        <input
          class="js-text-input border1 border-solid"
          name="page-links-0-text"
          placeholder="link text"
          type="text"
          value="${values['page-links-0-text']}"
          maxlength="15"
        />
      </label>
      <label for="page-links-0-url">
        <input
          class="js-text-input border1 border-solid"
          name="page-links-0-url"
          placeholder="link url"
          type="url"
          value="${values['page-links-0-url']}"
        />
      </label>

      <label for="short-url">
        <input
          class="js-text-input border1 border-solid"
          name="short-url"
          placeholder="short url"
          type="url"
          value="${values['short-url'] || ''}"
        />
      </label>
      <label for="short-type">Choose Shortlink Type:</label>
      <select name="short-type">
        <option value="">--choose an option--</option>
        <option
          ${values.type === 'temporary' ? 'selected' : ''}
          value="temporary"
        >
          Temporary
        </option>
        <option
          ${values.type === 'permanent' ? 'selected' : ''}
          value="permanent"
        >
          Permanent
        </option>
      </select>
      <button type="submit">add</button>
    </form>

    <script type="module">
      import API from '/components/data/api.js'

      class NewBranch extends HTMLElement {
        constructor() {
          super()
          this.api = API()
          const template = document.getElementById('new-branch-template')
          this.attachShadow({ mode: 'open' }).appendChild(
            template.content.cloneNode(true),
          )
          this.handleSubmit = this.handleSubmit.bind(this)
          this.textInput = this.shadowRoot.querySelectorAll('.js-text-input')
          this.form = this.shadowRoot.querySelector('.js-form')
          this.form.addEventListener('submit', this.handleSubmit)
        }

        attributeChangedCallback(name, o, n) {
          const attr = [
            'type',
            'path',
            'page-title',
            'page-subtitle',
            'page-description',
            'page-logo',
            'page-links-0-text',
            'page-links-0-url',
            'short-url',
            'short-text',
          ]
          if (o !== n) {
            if (attr.includes(name)) {
              this.textInput.forEach((i) => {
                if (i.name === name) i.value = n
              })
            }
          }
        }

        connectedCallback() {
          if (this.isConnected) {
            this.textInput[0].focus()
          }
        }

        disconnectedCallback() {}

        static get observedAttributes() {
          return [
            'type',
            'path',
            'page-title',
            'page-subtitle',
            'page-description',
            'page-logo',
            'page-links-0-text',
            'page-links-0-url',
            'short-url',
            'short-text',
          ]
        }

        handleSubmit(e) {
          e.preventDefault()
          try {
            this.api.create(
              JSON.stringify(Object.fromEntries(new FormData(this.form))),
            )
            this.textInput.forEach((i) => (i.value = ''))
          } catch (err) {
            console.error(err)
          }
        }
      }

      customElements.define('new-branch', NewBranch)
    </script>
  `
}
