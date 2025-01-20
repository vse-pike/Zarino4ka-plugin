document.getElementById('sort-tabs').addEventListener('click', async () => {
    const tabs = await chrome.tabs.query({ currentWindow: true });

    const tabsWithDomains = tabs.map(tab => ({
        tabId: tab.id,
        index: tab.index,
        domain: new URL(tab.url).hostname
    }));

    const sortedTabs = tabsWithDomains.sort((a, b) => a.domain.localeCompare(b.domain));

    for (let i = 0; i < sortedTabs.length; i++) {
        await chrome.tabs.move(sortedTabs[i].tabId, { index: i });
    }
});