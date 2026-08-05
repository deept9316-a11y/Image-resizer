// =========================
// IMAGE RESIZER
// =========================

const resizeImage = document.getElementById("resizeImage");
const resizeBtn = document.getElementById("resizeBtn");
const widthInput = document.getElementById("width");
const heightInput = document.getElementById("height");
const canvas = document.getElementById("canvas");
const downloadBtn = document.getElementById("downloadBtn");

if (resizeBtn) {

resizeBtn.addEventListener("click", function () {

const file = resizeImage.files[0];

if (!file) {
alert("Please select an image.");
return;
}

const width = parseInt(widthInput.value);
const height = parseInt(heightInput.value);

if (!width || !height) {
alert("Please enter width and height.");
return;
}

const img = new Image();

img.onload = function () {

canvas.width = width;
canvas.height = height;

const ctx = canvas.getContext("2d");

ctx.drawImage(img, 0, 0, width, height);

downloadBtn.href = canvas.toDataURL("image/png");
downloadBtn.download = "resized-image.png";
downloadBtn.style.display = "inline-block";

};

img.src = URL.createObjectURL(file);

});

// =========================
// IMAGE COMPRESSOR
// =========================

const compressImage = document.getElementById("compressImage");
const compressBtn = document.getElementById("compressBtn");
const quality = document.getElementById("quality");
const downloadCompressed = document.getElementById("downloadCompressed");

if (compressBtn) {

compressBtn.addEventListener("click", function () {

const file = compressImage.files[0];

if (!file) {
alert("Please select an image.");
return;
}

const img = new Image();

img.onload = function () {

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

canvas.width = img.width;
canvas.height = img.height;

ctx.drawImage(img, 0, 0);

const q = quality.value / 100;

canvas.toBlob(function(blob){

if(!blob){
alert("Compression failed");
return;
}

downloadCompressed.href = URL.createObjectURL(blob);
downloadCompressed.download = "compressed-image.jpg";
downloadCompressed.style.display = "inline-block";
downloadCompressed.textContent = "Download Compressed Image";

},"image/jpeg",q);

};

img.src = URL.createObjectURL(file);

});

}
