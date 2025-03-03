document.getElementById('nlButton').addEventListener('click', function() {
    setLanguage('nl');
});

document.getElementById('enButton').addEventListener('click', function() {
    setLanguage('en');
});

document.getElementById('selectedLang').addEventListener('click', function() {
    document.getElementById('toggleLang').classList.toggle('active');
});

function setLanguage(lang) {
    const introText = document.getElementById('introText');
    const introTitle = document.getElementById('introTitle');
    const title = document.querySelector('h1.title');
    const fileLabel = document.querySelector('.file-label .file-label');
    const downloadButton = document.getElementById('downloadButton');
    const signalBox = document.querySelector('.signal-box');
    const tittle = document.getElementById('tittle');
    const selectedLang = document.getElementById('selectedLang');
    if (lang === 'en') {
        introText.innerHTML = 'Based on this <a href="https://nos.nl/artikel/2557235-gaan-of-blijven-overstap-van-whatsapp-naar-signal-is-dilemma" target="_blank">article</a>, I have made this website to show that you are also on Signal. You can use this to create an image for WhatsApp.';
        introTitle.textContent = 'Why this website?';
        title.textContent = 'Upload an Image';
        fileLabel.textContent = 'Choose a file…';
        downloadButton.textContent = 'Download Image';
        if (signalBox) signalBox.textContent = 'Also on Signal';
        tittle.textContent = 'Also on Signal';
        selectedLang.innerHTML = '<i class="fas fa-flag-uk"></i>';
        document.getElementById('nlButton').classList.remove('active');
        document.getElementById('enButton').classList.add('active');
    } else {
        introText.innerHTML = 'Op basis van dit <a href="https://nos.nl/artikel/2557235-gaan-of-blijven-overstap-van-whatsapp-naar-signal-is-dilemma" target="_blank">artikel</a> heb ik deze website gemaakt om te laten zien dat je ook op Signal zit. Je kunt dit gebruiken om een afbeelding voor WhatsApp te maken.';
        introTitle.textContent = 'Waarom deze website?';
        title.textContent = 'Upload een afbeelding';
        fileLabel.textContent = 'Kies een bestand…';
        downloadButton.textContent = 'Download afbeelding';
        if (signalBox) signalBox.textContent = 'Ook op Signal';
        tittle.textContent = 'Ook op Signal';
        selectedLang.innerHTML = '<i class="fas fa-flag-nl"></i>';
        document.getElementById('enButton').classList.remove('active');
        document.getElementById('nlButton').classList.add('active');
    }
    document.getElementById('toggleLang').classList.remove('active');
}
