console.log("Found Zoom tab: %s", window.location.href)

function checkUrl() {
  const url = window.location.href
  const matched = url.match(/status=(\w+)/)

  if (matched == null) {
    return // No conclusion, check 1 sec later
  }

  clearTimeout(timerHandle)

  const status = matched[1]

  if (status === 'success') {
    console.log("Close succeeded tab")
    chrome.runtime.sendMessage({ action: "closeMe", params: [url] })
  } else {
    console.log("Unexpected status \"%s\", bypass execution", status)
  }
}

const timerHandle = setTimeout(checkUrl, 1000)