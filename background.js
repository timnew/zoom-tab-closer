//https://seek.zoom.us/j/991923675?status=success
function monitorTab(tab) {
  const { id, url } = tab

  if (url == null) {
    console.log("Url is empty, ignore...")
    return
  }

  if (!url.match(/^https?:\/\/\w+\.zoom\.us\/j\//)) {
    console.log("Not zoom url, ignore...")
    return
  }

  const parsedUrl = new URL(url)

  if (parsedUrl.searchParams.get("status") == 'success') {
    console.log("Tab found, kill it:", url)
    delayKill(tab.id)
  } else {
    console.log("Tab, found, unexpected status:", url)
    console.log("Ignore")
  }
}

function delayKill(tabId) {
  setTimeout(() => chrome.tabs.remove(tabId), 2000)
}

chrome.tabs.onCreated.addListener(monitorTab)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url != null) {
    monitorTab({ id: tabId, url })
  } else {
    monitorTab(tab)
  }
})

chrome.tabs.onAttached.addListener((tabId, attachInfo) => chrome.tabs.get(tabId, monitorTab))

chrome.tabs.onReplaced.addListener((addedTabId, removedTabId) => chrome.tabs.get(addedTabId, monitorTab))


