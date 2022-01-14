module.exports = function spread(obj) {
  return Object.entries(obj)
    .map((i) => `${i[0]}="${i[1]}"`)
    .join('')
}
