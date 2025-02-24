let isArrowUp = true;

document.getElementById('sort-tabs').addEventListener('click', async () => {
    const arrow = document.getElementById('arrow');
    const svgIcon = arrow.querySelector('.arrow-icon');

    if (isArrowUp) {
        svgIcon.classList.add('revert-down');
        svgIcon.classList.remove('revert-up');
        isArrowUp = false;
    } else {
        svgIcon.classList.add('revert-up');
        svgIcon.classList.remove('revert-down');
        isArrowUp = true;
    }

    try {
        const tabs = await chrome.tabs.query({currentWindow: true});

        const tabsWithDomains = tabs.map(tab => ({
            tabId: tab.id,
            index: tab.index,
            domain: new URL(tab.url).hostname
        }));

        const sortedTabs = [...tabsWithDomains].sort((a, b) => a.domain.localeCompare(b.domain));

        const isAlreadySorted = tabsWithDomains.every((tab, i) => tab.tabId === sortedTabs[i].tabId);

        if (isAlreadySorted) {
            const revertedTabs = [...sortedTabs].reverse();
            for (let i = 0; i < revertedTabs.length; i++) {
                await chrome.tabs.move(revertedTabs[i].tabId, {index: i});
            }
        } else if (!isArrowUp) {
            for (let i = 0; i < sortedTabs.length; i++) {
                await chrome.tabs.move(sortedTabs[i].tabId, {index: i});
            }
        } else {
            const revertedTabs = [...sortedTabs].reverse();
            for (let i = 0; i < revertedTabs.length; i++) {
                await chrome.tabs.move(revertedTabs[i].tabId, {index: i});
            }
        }

    } catch (err) {
        console.error(err);
    }
});