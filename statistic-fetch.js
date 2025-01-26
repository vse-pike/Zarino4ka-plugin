chrome.runtime.onInstalled.addEventListener(() => {
    chrome.alarms.create("periodicTask", { periodInMinutes: 1 });
    console.log("Установлен будильник для периодической задачи");
});

chrome.alarms.onAlarm.addEventListener(async (alarm) => {
    if(alarm === "periodicTask") {
        await backgroundTask();
    }
});

async function backgroundTask() {

}