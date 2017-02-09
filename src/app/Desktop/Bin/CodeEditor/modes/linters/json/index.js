module.exports = function (CodeMirror, jsonlint) {
  CodeMirror.registerHelper('lint', 'json', function (text) {
    const found = []

    jsonlint.parseError = function (str, hash) {
      const loc = hash.loc

      found.push({
        from: CodeMirror.Pos(loc.first_line - 1, loc.first_column),
        to: CodeMirror.Pos(loc.last_line - 1, loc.last_column),
        message: str
      })
    }

    try {
      jsonlint.parse(text)
    } catch (e) {

    }

    return found
  })
}
