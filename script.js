// DOM Elements
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

// 1. Image Upload Handler
imageInput.addEventListener('change', handleImageSelect);

// Drag & Drop Functionality
dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.style.borderColor = '#2ecc71';
});

dropzone.addEventListener('dragleave', () => {
    dropzone.style.borderColor = '#3498db';
});

dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.style.borderColor = '#3498db';
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

// When Image Loads in Memory
originalImage.onload = function () {
    widthInput.value = originalImage.width;
    heightInput.value = originalImage.height;
    originalAspectRatio = originalImage.width / originalImage.height;

    // Show controls
    controls.style.display = 'block';
    previewContainer.style.display = 'none';
};

// 2. Aspect Ratio Maintenance
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

// 3. Canvas Resizing Process
resizeBtn.addEventListener('click', () => {
    const newWidth = parseInt(widthInput.value);
    const newHeight = parseInt(heightInput.value);
    const format = formatSelect.value;
    const quality = parseFloat(qualityInput.value);

    if (!newWidth || !newHeight) {
        alert('कृपया वैध (Valid) Width और Height दर्ज करें।');
        return;
    }

    // HTML5 Offscreen Canvas का उपयोग
    const canvas = document.createElement('canvas');
    canvas.width = newWidth;
    canvas.height = newHeight;

    const ctx = canvas.getContext('2d');

    // Smooth Image Rendering / Anti-Aliasing Setting
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Canvas पर इमेज ड्रॉ करें
    ctx.drawImage(originalImage, 0, 0, newWidth, newHeight);

    // Canvas को Data URL में बदलें
    const resizedDataUrl = canvas.toDataURL(format, quality);

    // Output Extension निर्धारित करें
    let ext = 'jpg';
    if (format === 'image/png') ext = 'png';
    if (format === 'image/webp') ext = 'webp';

    // Output UI अपडेशन
    previewImg.src = resizedDataUrl;
    downloadBtn.href = resizedDataUrl;
    downloadBtn.download = `resized_image.${ext}`;
    
    // फ़ाइल का अनुमानित साइज़ दिखाएं
    const head = 'data:' + format + ';base64,';
    const sizeInBytes = Math.round((resizedDataUrl.length - head.length) * 3 / 4);
    const sizeInKB = (sizeInBytes / 1024).toFixed(2);
    sizeInfo.innerText = `नया साइज़: ${newWidth}x${newHeight} px (~${sizeInKB} KB)`;

    previewContainer.style.display = 'block';
});
