document.getElementById('downloadButton').addEventListener('click', function() {
    const originalCanvas = document.getElementById('canvas');
    const image = document.querySelector('#imagePreview img');
    const spotlight = document.getElementById('spotlight');
    
    if (image && spotlight) {
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
            
            // Download the image
            const link = document.createElement('a');
            link.href = croppedCanvas.toDataURL();
            link.download = 'signal_profile.png';
            link.click();
        };
    }
});
