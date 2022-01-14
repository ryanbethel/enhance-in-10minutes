const asap = require('@architect/asap')
const arc = require('@architect/functions')

const params = {
  cacheControl: 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
}
exports.handler = arc.http.async(asap(params))
