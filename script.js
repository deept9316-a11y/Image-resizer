// ===== Image Resizer =====

const imageInput = document.getElementById("resizeImage");
const widthInput = document.getElementById("width");
const heightInput = document.getElementById("height");
const resizeBtn = document.getElementById("resizeBtn");
const canvas = document.getElementById("canvas");
const downloadBtn = document.getElementById("downloadBtn");

if (imageInput && resizeBtn) {

    resizeBtn.addEventListener("click", () => {

        const file = imageInput.files[0];

        if (!file) {
            alert("Please select an image.");
            return;
        }

        const width = parseInt(widthInput.value);
        const height = parseInt(heightInput.value);

        if (!width || !height) {
            alert("Enter width and height.");
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

}
