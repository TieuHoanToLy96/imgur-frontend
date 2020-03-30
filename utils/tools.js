const dev = process.env.NODE_ENV !== 'production'

export const getHostName = () => {
  if (dev) {
    return "http://localhost:8000"
  }

  return "https://api.tieuhoan.dev"
}

export const copyToClipBoard = (value) => {
  window.document.addEventListener("copy", function (e) {
    e.clipboardData.setData("text/plain", value)
    e.clipboardData.setData("text/html", value)
    e.preventDefault()
  });

  window.document.execCommand("copy")
}
