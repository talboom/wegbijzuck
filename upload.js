document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const fileInput = document.getElementById('imageInput');
    const file = fileInput.files[0];
    const currentLang = 'nl'; //document.querySelector('button.active').id === 'nlButton' ? 'nl' : 'en';
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imagePreview = document.getElementById('imagePreview');
            imagePreview.style.display = 'inline-block';
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
                console.log(imageRatio);
                canvas.width = canvasWidth;
                canvas.height = canvasHeight;
                if (canvasHeight > canvasWidth) {
                    console.log('if');
                    console.log(imagePreview.clientWidth);
                    imagePreview.style.width = `${imagePreview.clientWidth * imageRatio}px`;
                }else{
                    console.log('else');
                    console.log(imagePreview.clientHeight);
                    imagePreview.style.height = `${imagePreview.clientHeight / imageRatio}px`;
                }
                ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
                imagePreview.innerHTML = `
                    <div class="image-container">
                        <img src="${canvas.toDataURL()}" alt="Uploaded Image" style="max-width: 100%;">
                        <div id="spotlight">
                            <div class="resize-handle nw" data-handle="nw"></div>
                            <div class="resize-handle ne" data-handle="ne"></div>
                            <div class="resize-handle sw" data-handle="sw"></div>
                            <div class="resize-handle se" data-handle="se"></div>
                            <div class="circle-view"></div>
                            <div class="signal-box">${currentLang === 'nl' ? 'Ook op Signal' : 'Also on Signal'}</div>
                        </div>
                                            </div>`;
                const spotlight = document.getElementById('spotlight');
                const spotlightSize = Math.min(imagePreview.clientWidth, imagePreview.clientHeight);
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

                // Update signal box font size and padding based on spotlight size
                const signalBox = document.querySelector('.signal-box');
                const fontSize = spotlightSize * 0.08;
                signalBox.style.fontSize = `${fontSize}px`;
                
                const topPadding = spotlightSize * 0.02;
                const bottomPadding = spotlightSize * 0.10;
                signalBox.style.padding = `${topPadding}px 0 ${bottomPadding}px`;
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
