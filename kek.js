const dogImgs = [
    "media/img.png",
    "media/img_1.png",
    "media/img_2.png",
    "media/img_3.png",
    "media/img_4.png",
]

function createImageIterator(images) {
    let index = 0;
    return () => {
        const image = images[index];
        index = (index + 1) % images.length;
        return image;
    };
}

const getNextDogImage = createImageIterator(dogImgs);


function injectRainDogs() {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        if (tabs.length > 0) {

            const dogImageSrc = chrome.runtime.getURL(getNextDogImage());
            chrome.scripting.executeScript(
                {
                    target: {tabId: tabs[0].id},
                    func: (dogImageSrc) => {
                        const duration = 10 * 1000;
                        const endTime = Date.now() + duration;

                        function createFallingDog() {
                            const dog = document.createElement('img');
                            dog.src = dogImageSrc;
                            dog.style.position = 'fixed';
                            dog.style.left = `${Math.random() * 100}vw`;
                            dog.style.top = '-100px';
                            dog.style.width = '150px';
                            dog.style.height = 'auto';
                            dog.style.transition = 'transform 5s linear';
                            document.body.appendChild(dog);

                            setTimeout(() => {
                                dog.style.transform = `translateY(${window.innerHeight + 100}px)`;
                            }, 0);

                            setTimeout(() => dog.remove(), 4500);
                        }

                        const interval = setInterval(() => {
                            if (Date.now() > endTime) {
                                clearInterval(interval);
                            } else {
                                createFallingDog();
                            }
                        }, 500);
                    },
                    args: [dogImageSrc]
                },
                () => {
                    if (chrome.runtime.lastError) {
                        console.error("Ошибка инжектирования:", chrome.runtime.lastError.message);
                    } else {
                        console.log("rainDogs выполнен с изображением:", dogImageSrc);
                    }
                },
            );
        } else {
            console.error("Активная вкладка не найдена.");
        }
    });
}

function barkingDog() {
    console.log("Запуск barkingDog");

    const audioPath = chrome.runtime.getURL('media/bark.wav');
    const audio = new Audio(audioPath);

    audio.play().catch((error) => {
        console.warn("Ошибка воспроизведения звука:", error.message);
        alert("Браузер блокирует звук. Нажмите 'OK', чтобы проиграть звук.");
        audio.play();
    });
}

function injectBarkingDog() {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        if (tabs.length > 0) {
            const dogImgs = chrome.runtime.getURL(getNextDogImage());
            chrome.scripting.executeScript(
                {
                    target: {tabId: tabs[0].id},
                    func: (dogImgs) => {
                        console.log("Инъекция одной собачки");

                        const dog = document.createElement('img');
                        dog.src = dogImgs;
                        dog.style.position = 'fixed';
                        dog.style.left = `${Math.random() * (window.innerWidth - 100)}px`;
                        dog.style.top = `${Math.random() * (window.innerHeight - 100)}px`;
                        dog.style.width = '300px';
                        dog.style.height = 'auto';
                        document.body.appendChild(dog);

                        setTimeout(() => dog.remove(), 2000);
                    },
                    args: [dogImgs]
                },
                () => console.log("Инъекция собачки выполнена.")
            );
        } else {
            console.error("Активная вкладка не найдена.");
        }
    });
}

function random(actions) {
    const randomIndex = Math.floor(Math.random() * actions.length);
    return actions[randomIndex];
}

document.getElementById('kek').addEventListener('click', () => {
    const actions = ["rainDogs", "barkingDog"];

    const action = random(actions);
    console.log(`Выбрано действие: ${action}`);
    if (action === "rainDogs") {
        injectRainDogs();
    } else if (action === "barkingDog") {
        barkingDog();
        injectBarkingDog()
    }
});