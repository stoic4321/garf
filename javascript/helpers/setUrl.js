const setUrl = (url) => (
  (history.pushState) ?
    window.history.pushState(null, null, url)
  :
    document.location.href = url
)

export default setUrl