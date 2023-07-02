// Toggles the theme of the site

const toggle = document.querySelector('#mode-toggle');
toggle.addEventListener('change', (event) => {
    toggleMode();
});

const toggleMode = () => {
    let elementList = document.querySelectorAll('.card-face');
    for (let i = 0; i < elementList.length; i++) {
        if (elementList[i].classList.contains('light-mode')) {
            elementList[i].classList.remove('light-mode');
            elementList[i].classList.add('dark-mode');
        }
        else {
            elementList[i].classList.remove('dark-mode');
            elementList[i].classList.add('light-mode');
        }
    }
    toggleImageStyle();
}

const toggleImageStyle = () => {
    var sunLight = document.querySelector('.sun-light');
    var sunDark = document.querySelector('.sun-dark');
    var moonLight = document.querySelector('.moon-light');
    var moonDark = document.querySelector('.moon-dark');
    if (toggle.checked) {
        moonDark.style.visibility = 'hidden';
        sunDark.style.visibility = 'hidden';
        sunLight.style.visibility = 'visible';
        moonLight.style.visibility = 'visible';
        document.querySelector('.feature-toggle').style.backgroundColor = 'rgba(17, 25, 40, 0.6)';
        document.querySelector('.feature-toggle-label').style.backgroundColor = 'rgba(17, 25, 40, 0.6)';
    }
    else {
        moonDark.style.visibility = 'visible';
        sunDark.style.visibility = 'visible';
        sunLight.style.visibility = 'hidden';
        moonLight.style.visibility = 'hidden';
        document.querySelector('.feature-toggle').style.backgroundColor = 'rgba(255, 255, 255, 0.65)';
        document.querySelector('.feature-toggle-label').style.backgroundColor = 'rgba(255, 255, 255, 0.65)';
    }

}

// Toggles the current feature of the software
// If short URL card is selected then it toggle the feature to QR code card

const featureToggle = document.querySelector('#feature-toggle');
const card = document.getElementById('card');
featureToggle.addEventListener('change', (event) => {
    if (featureToggle.checked) {
        card.classList.add('is-flipped');
    }
    else {
        card.classList.remove('is-flipped');
    }
});

// Base URL of the site

const baseURL = window.location.origin ? window.location.origin + '/' : window.location.protocol + '/' + window.location.host + '/';

// Generate short URL

const getShortURL = async (event) => {
    const response = await fetch(baseURL + 'api/shorten/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/JSON'
        },
        body: JSON.stringify({
            longUrl: document.getElementById('longURL').value
        })
    });
    const data = await response.json();
    if (response.status === 200) {
        document.getElementById('shortURL').value = baseURL + data.shortUrl;
        document.getElementById('shortURL').style.color = '#000000';
    }
    if (!document.getElementById('longURL').value) {
        document.getElementById('shortURL').value = "";
    }
}

// Copy the generated short URL to the clipboard

const copyURL = () => {
    navigator.clipboard.writeText(document.getElementById('shortURL').value);
}

// Generate QR Code using QRCode.js

const generateQR = () => {
    if (document.getElementById('qrURL').value) {
        document.getElementById('QrCode').innerHTML = "";
        var QrCode = new QRCode('QrCode', document.getElementById('qrURL').value);
        document.getElementById('Qr-output').style.visibility = 'visible';
    }
}

// Copy the generated QR Code to the clipboard

const copyQR = async () => {
    var src = document.getElementById('QrCode').getElementsByTagName('img')[0].src;
    const response = await fetch(src);
    const blob = await response.blob();
    await setToClipboard(blob);
}

const setToClipboard = async (blob) => {
    const data = [new ClipboardItem({ [blob.type]: blob })];
    await navigator.clipboard.write(data);
}