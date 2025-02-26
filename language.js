document.getElementById('nlButton').addEventListener('click', function() {
    setLanguage('nl');
});

document.getElementById('enButton').addEventListener('click', function() {
    setLanguage('en');
});

function setLanguage(lang) {
    const introText = document.getElementById('introText');
    const title = document.querySelector('h1.title');
    const fileLabel = document.querySelector('.file-label .file-label');
    const downloadButton = document.getElementById('downloadButton');
    const signalBar = document.getElementById('signalBar');
    const topBar = document.getElementById('topBar');
    if (lang === 'en') {
        introText.innerHTML = 'Based on this <a href="https://nos.nl/artikel/2557235-gaan-of-blijven-overstap-van-whatsapp-naar-signal-is-dilemma" target="_blank">article</a>, I have made this website to show that you are also on Signal. You can use this to create an image for WhatsApp.';
        title.textContent = 'Upload an Image';
        fileLabel.textContent = 'Choose a file…';
        downloadButton.textContent = 'Download Image';
        if (signalBar) signalBar.textContent = 'Also on Signal';
        topBar.textContent = 'Also on Signal';
        document.getElementById('nlButton').classList.remove('active');
        document.getElementById('enButton').classList.add('active');
    } else {
        introText.innerHTML = 'Op basis van dit <a href="https://nos.nl/artikel/2557235-gaan-of-blijven-overstap-van-whatsapp-naar-signal-is-dilemma" target="_blank">artikel</a> heb ik deze website gemaakt om te laten zien dat je ook op Signal zit. Je kunt dit gebruiken om een afbeelding voor WhatsApp te maken.';
        title.textContent = 'Upload een afbeelding';
        fileLabel.textContent = 'Kies een bestand…';
        downloadButton.textContent = 'Download afbeelding';
        if (signalBar) signalBar.textContent = 'Ook op Signal';
        topBar.textContent = 'Ook op Signal';
        document.getElementById('enButton').classList.remove('active');
        document.getElementById('nlButton').classList.add('active');
    }
}
