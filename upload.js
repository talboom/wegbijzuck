document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const fileInput = document.getElementById('imageInput');
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imagePreview = document.getElementById('imagePreview');
            const img = new Image();
            img.src = e.target.result;
            img.onload = function() {
                const canvas = document.getElementById('canvas');
                const ctx = canvas.getContext('2d');
                const previewWidth = imagePreview.clientWidth;
                const imageRatio = img.width / img.height;
                const canvasWidth = previewWidth;
                const canvasHeight = canvasWidth / imageRatio;
                console.log(canvasWidth, canvasHeight);
                console.log(previewWidth);
                canvas.width = canvasWidth;
                canvas.height = canvasHeight;
                ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
                imagePreview.innerHTML = `
                    <div class="image-container">
                        <img src="${canvas.toDataURL()}" alt="Uploaded Image" style="max-width: 100%;">
                        <div id="spotlight">
                            <div class="resize-handle nw" data-handle="nw"></div>
                            <div class="resize-handle ne" data-handle="ne"></div>
                            <div class="resize-handle sw" data-handle="sw"></div>
                            <div class="resize-handle se" data-handle="se"></div>
                        </div>
                    </div>`;
                const spotlight = document.getElementById('spotlight');
                const spotlightSize = Math.min(canvas.width, canvas.height);
                spotlight.style.width = `${spotlightSize}px`;
                spotlight.style.height = `${spotlightSize}px`;
                
                // Center the spotlight
                const imageContainer = document.querySelector('.image-container');
                const leftPosition = (imageContainer.offsetWidth - spotlightSize) / 2;
                const topPosition = (imageContainer.offsetHeight - spotlightSize) / 2;
                spotlight.style.left = `${leftPosition}px`;
                spotlight.style.top = `${topPosition}px`;
                document.getElementById('downloadButton').style.display = 'block';
                document.getElementById('uploadNewImage').style.display = 'inline-block';
                makeElementDraggable(spotlight);
            };
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('imageInput').addEventListener('change', function() {
    const fileName = document.querySelector('.file-name');
    fileName.textContent = this.files[0].name;
    document.getElementById('uploadForm').dispatchEvent(new Event('submit'));
});

document.getElementById('editIcon').addEventListener('click', function() {
    document.getElementById('imageInput').click();
});
