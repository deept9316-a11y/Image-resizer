const imageInput = document.getElementById("imageInput");
const chooseBtn = document.getElementById("chooseBtn");
const previewImage = document.getElementById("previewImage");
const resizeBtn = document.getElementById("resizeBtn");
const downloadBtn = document.getElementById("downloadBtn");

let originalImage = new Image();

chooseBtn.addEventListener("click", () => {
  imageInput.click();
});

imageInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function(event) {
    originalImage.onload = function() {
      previewImage.src = originalImage.src;
      previewImage.style.display = "block";

      document.getElementById("width").value = originalImage.width;
      document.getElementById("height").value = originalImage.height;
    };

    originalImage.src = event.target.result;
  };

  reader.readAsDataURL(file);
});

resizeBtn.addEventListener("click", () => {

  if (!originalImage.src) {
    alert("Please upload an image first.");
    return;
  }

  const width = parseInt(document.getElementById("width").value);
  const height = parseInt(document.getElementById("height").value);
  const quality = document.getElementById("quality").value / 100;
  const format = document.getElementById("format").value;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(originalImage, 0, 0, width, height);

  const output = canvas.toDataURL(format, quality);

  previewImage.src = output;
  downloadBtn.href = output;

  if (format === "image/png")
    downloadBtn.download = "image.png";
  else if (format === "image/jpeg")
    downloadBtn.download = "image.jpg";
  else
    downloadBtn.download = "image.webp";
});
