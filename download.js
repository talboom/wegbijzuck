document.getElementById('downloadButton').addEventListener('click', function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const image = document.querySelector('#imagePreview img');
    const spotlight = document.getElementById('spotlight');
    if (image && spotlight) {
        const img = new Image();
        img.src = image.src;
        img.onload = function() {
            ctx.drawImage(img, 0, 0);
            const rect = spotlight.getBoundingClientRect();
            const previewRect = image.getBoundingClientRect();
            const x = rect.left - previewRect.left;
            const y = rect.top - previewRect.top;
            
            // Create dark overlay
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Clear spotlight area
            ctx.globalCompositeOperation = 'destination-out';
            ctx.fillStyle = 'white';
            ctx.fillRect(x, y, rect.width, rect.height);
            
            // Draw border
            ctx.globalCompositeOperation = 'source-over';
            ctx.strokeStyle = 'rgba(169, 169, 169, 0.5)';
            ctx.lineWidth = 2;
            ctx.strokeRect(x, y, rect.width, rect.height);
            
            const link = document.createElement('a');
            link.href = canvas.toDataURL();
            link.download = 'image_with_spotlight.png';
            link.click();
        };
    }
});
