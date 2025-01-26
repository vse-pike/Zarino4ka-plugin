const helpButton = document.getElementById('help');
const backButton = document.getElementById('back');


const toggleVisibility = () => {
    const svgIcon = helpButton.querySelector('.help-icon');

    svgIcon.classList.toggle('focused');

    const remDupButton = document.getElementById('remove-duplicates');
    const sorTabButton = document.getElementById('sort-tabs');
    const kekButton = document.getElementById('kek');
    const infoText = document.getElementById('info');

    const buttons = [remDupButton, sorTabButton, kekButton, backButton];

    buttons.forEach(button => button.classList.toggle('hidden'));
    infoText.classList.toggle('hidden');
};

helpButton.addEventListener('click', toggleVisibility);
backButton.addEventListener('click', toggleVisibility);
