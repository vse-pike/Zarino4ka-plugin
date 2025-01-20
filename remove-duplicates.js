document.getElementById("remove-duplicates").addEventListener("click", async () => {
    const tabs = await chrome.tabs.query({});
    const seenUrls = new Set();

    tabs.forEach((tab) => {
        if (!tab.url) return;
        if (seenUrls.has(tab.url)) {
            chrome.tabs.remove(tab.id);
        } else {
            seenUrls.add(tab.url);
        }
    });
});