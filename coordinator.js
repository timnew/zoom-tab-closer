const messageHandlers = {
  closeMe(url) {
    console.log('Close %s with %s', this.tab.id, url)
    chrome.tabs.remove(this.tab.id)
  }
}

chrome.runtime.onMessage.addListener((message, sender) => {
  console.log(`Message received ${message} from ${sender}`)

  const { action, params } = message

  const handler = messageHandlers[action]

  if (handler != null) {
    handler.apply(sender, params)
  }
  else {
    console.error("Unknown message: %o", message)
  }
})

