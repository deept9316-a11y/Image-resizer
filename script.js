const imageInput = document.getElementById('imageInput');
const dropzone = document.getElementById('dropzone');
const controls = document.getElementById('controls');
const widthInput = document.getElementById('widthInput');
const heightInput = document.getElementById('heightInput');
const aspectRatio = document.getElementById('aspectRatio');
const formatSelect = document.getElementById('formatSelect');
const qualityInput = document.getElementById('qualityInput');
const resizeBtn = document.getElementById('resizeBtn');
const previewContainer = document.getElementById('previewContainer');
const previewImg = document.getElementById('previewImg');
const downloadBtn = document.getElementById('downloadBtn');
const sizeInfo = document.getElementById('sizeInfo');

let originalImage = new Image();
let originalAspectRatio = 1;

imageInput.addEventListener('change', handleImageSelect);

dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.style.borderColor = '#2563eb';
});

dropzone.addEventListener('dragleave', () => {
    dropzone.style.borderColor = '#93c5fd';
});

dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.style.borderColor = '#93c5fd';
    if (e.dataTransfer.files.length > 0) {
        imageInput.files = e.dataTransfer.files;
        handleImageSelect();
    }
});

function handleImageSelect() {
    const file = imageInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        originalImage.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

originalImage.onload = function () {
    widthInput.value = originalImage.width;
    heightInput.value = originalImage.height;
    originalAspectRatio = originalImage.width / originalImage.height;

    controls.style.display = 'block';
    previewContainer.style.display = 'none';
};

widthInput.addEventListener('input', () => {
    if (aspectRatio.checked && widthInput.value) {
        heightInput.value = Math.round(widthInput.value / originalAspectRatio);
    }
});

heightInput.addEventListener('input', () => {
    if (aspectRatio.checked && heightInput.value) {
        widthInput.value = Math.round(heightInput.value * originalAspectRatio);
    }
});

resizeBtn.addEventListener('click', () => {
    const newWidth = parseInt(widthInput.value);
    const newHeight = parseInt(heightInput.value);
    const format = formatSelect.value;
    const quality = parseFloat(qualityInput.value);

    if (!newWidth || !newHeight) {
        alert('कृपया सही Width और Height डालें।');
        return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = newWidth;
    canvas.height = newHeight;

    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(originalImage, 0, 0, newWidth, newHeight);

    const resizedDataUrl = canvas.toDataURL(format, quality);

    let ext = 'jpg';
    if (format === 'image/png') ext = 'png';
    if (format === 'image/webp') ext = 'webp';

    previewImg.src = resizedDataUrl;
    downloadBtn.href = resizedDataUrl;
    downloadBtn.download = `resized_image.${ext}`;

    const head = 'data:' + format + ';base64,';
    const sizeInBytes = Math.round((resizedDataUrl.length - head.length) * 3 / 4);
    const sizeInKB = (sizeInBytes / 1024).toFixed(2);
    
    sizeInfo.innerText = `Size: ${newWidth} x ${newHeight} px | File Size: ~${sizeInKB} KB`;
    previewContainer.style.display = 'block';
});
