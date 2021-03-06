const isJSON = require('./is-json')

module.exports = async function auth(req) {
  const username = req.session?.user?.username

  if (!username) {
    if (isJSON(req)) {
      return {
        statusCode: 401,
      }
    } else {
      return {
        statusCode: 302,
        headers: {
          'cache-control':
            'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
        },
        location: '/app/login',
      }
    }
  } else {
    return false
  }
}
