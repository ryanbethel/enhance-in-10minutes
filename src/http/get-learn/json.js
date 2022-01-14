const isJSON = require('@architect/shared/is-json')

module.exports = async function json(req) {
  return false
  if (isJSON(req)) {
    try {
      return {
        statusCode: 200,
        json: { branches, flash },
      }
    } catch (err) {
      return {
        statusCode: 500,
        json: { error: err.message },
      }
    }
  } else {
    return false
  }
}
