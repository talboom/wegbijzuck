document.getElementById('downloadButton').addEventListener('click', function() {
    const originalCanvas = document.getElementById('canvas');
    const image = document.querySelector('#imagePreview img');
    const spotlight = document.getElementById('spotlight');
    const signalBox = document.querySelector('.signal-box');
    const currentLang = document.querySelector('#toggleLang button.active').id === 'nlButton' ? 'nl' : 'en';
    
    if (image && spotlight && signalBox) {
        const img = new Image();
        img.src = image.src;
        img.onload = function() {
            // Calculate scaling ratio
            const imageRect = image.getBoundingClientRect();
            const scaleX = originalCanvas.width / imageRect.width;
            const scaleY = originalCanvas.height / imageRect.height;
            
            // Get spotlight position relative to image
            const spotRect = spotlight.getBoundingClientRect();
            const imagePos = image.getBoundingClientRect();
            
            // Calculate scaled coordinates
            const scaledX = (spotRect.left - imagePos.left) * scaleX;
            const scaledY = (spotRect.top - imagePos.top) * scaleY;
            const scaledWidth = spotRect.width * scaleX;
            const scaledHeight = spotRect.height * scaleY;
            
            // Create a new canvas for the cropped image
            const croppedCanvas = document.createElement('canvas');
            croppedCanvas.width = scaledWidth;
            croppedCanvas.height = scaledHeight;
            const ctx = croppedCanvas.getContext('2d');
            
            // Draw only the spotlight area
            ctx.drawImage(
                originalCanvas, 
                scaledX, scaledY, scaledWidth, scaledHeight,
                0, 0, scaledWidth, scaledHeight
            );
            
            // Add signal box
            const boxHeight = signalBox.offsetHeight * scaleY;
            ctx.fillStyle = getComputedStyle(signalBox).backgroundColor;
            ctx.fillRect(0, scaledHeight - boxHeight, scaledWidth, boxHeight);
            
            // Add text
            const fontSize = parseFloat(getComputedStyle(signalBox).fontSize) * scaleY;
            ctx.fillStyle = getComputedStyle(signalBox).color;
            ctx.font = `900 ${fontSize}px ${getComputedStyle(signalBox).fontFamily}`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            // Calculate text position to vertically center it in the box
            const textY = scaledHeight * 1.045 - boxHeight + (fontSize * 0.5);
            
            // Set text based on current language
            const signalText = currentLang === 'nl' ? 'Ook op Signal' : 'Also on Signal';
            
            // Draw the text
            ctx.fillText(
                signalText,
                scaledWidth / 2,
                textY
            );
            
            // Download the image
            const link = document.createElement('a');
            link.href = croppedCanvas.toDataURL();
            link.download = 'signal_profile.png';
            link.click();
        };
    }
});
