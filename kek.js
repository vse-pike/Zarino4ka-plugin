function injectRainDogs() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
            chrome.scripting.executeScript(
                {
                    target: { tabId: tabs[0].id },
                    func: () => {
                        console.log("Запуск rainDogs");
                        const dogImageSrc = "data:image/jpeg;base64,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\n"; // Замените на base64 код изображения
                        const duration = 10 * 1000; // 10 секунд
                        const endTime = Date.now() + duration;

                        function createFallingDog() {
                            const dog = document.createElement('img');
                            dog.src = dogImageSrc;
                            dog.style.position = 'fixed';
                            dog.style.left = `${Math.random() * 100}vw`;
                            dog.style.top = '-100px';
                            dog.style.width = '50px';
                            dog.style.zIndex = '1000';
                            dog.style.transition = 'transform 5s linear';
                            document.body.appendChild(dog);

                            setTimeout(() => {
                                dog.style.transform = `translateY(${window.innerHeight + 100}px)`;
                            }, 0);

                            setTimeout(() => dog.remove(), 5000);
                        }

                        const interval = setInterval(() => {
                            if (Date.now() > endTime) {
                                clearInterval(interval);
                            } else {
                                createFallingDog();
                            }
                        }, 500);
                    }
                },
                () => console.log("rainDogs выполнен на активной вкладке.")
            );
        } else {
            console.error("Активная вкладка не найдена.");
        }
    });
}

function barkingDog() {
    console.log("Запуск barkingDog");

    const audioPath = chrome.runtime.getURL('bark.wav'); // Путь к локальному звуку
    const audio = new Audio(audioPath);

    audio.play().catch((error) => {
        console.warn("Ошибка воспроизведения звука:", error.message);
        alert("Браузер блокирует звук. Нажмите 'OK', чтобы проиграть звук.");
        audio.play();
    });
}

function injectBarkingDog() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
            chrome.scripting.executeScript(
                {
                    target: { tabId: tabs[0].id },
                    func: () => {
                        console.log("Инъекция одной собачки");

                        const dogImageSrc = "data:image/jpeg;base64,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\n"; // Замените на base64 код изображения
                        const dog = document.createElement('img');
                        dog.src = dogImageSrc;
                        dog.style.position = 'fixed';
                        dog.style.left = `${Math.random() * (window.innerWidth - 100)}px`;
                        dog.style.top = `${Math.random() * (window.innerHeight - 100)}px`;
                        dog.style.width = '100px';
                        dog.style.zIndex = '1000';
                        document.body.appendChild(dog);

                        setTimeout(() => dog.remove(), 2000); // Удаляем через 2 секунды
                    }
                },
                () => console.log("Инъекция собачки выполнена.")
            );
        } else {
            console.error("Активная вкладка не найдена.");
        }
    });
}

function randomAction() {
    const actions = ["rainDogs", "barkingDog"];
    const randomIndex = Math.floor(Math.random() * actions.length);
    return actions[randomIndex];
}

document.getElementById('kek-tab').addEventListener('click', () => {
    const action = randomAction();
    console.log(`Выбрано действие: ${action}`);
    if (action === "rainDogs") {
        injectRainDogs();
    } else if (action === "barkingDog") {
        barkingDog();
        injectBarkingDog()
    }
});