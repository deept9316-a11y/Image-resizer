const imageInput = document.getElementById("resizeImage");
const widthInput = document.getElementById("width");
const heightInput = document.getElementById("height");
const resizeBtn = document.getElementById("resizeBtn");
const canvas = document.getElementById("canvas");
const downloadBtn = document.getElementById("downloadBtn");

if (resizeBtn) {
    resizeBtn.addEventListener("click", async () => {

        const file = imageInput.files[0];

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

        img.onload = async () => {

            const srcCanvas = document.createElement("canvas");
            srcCanvas.width = img.width;
            srcCanvas.height = img.height;

            srcCanvas.getContext("2d").drawImage(img, 0, 0);

            canvas.width = width;
            canvas.height = height;

            const picaInstance = window.pica();

            await picaInstance.resize(srcCanvas, canvas);

            canvas.toBlob(function(blob){

                downloadBtn.style.display = "inline-block";

                downloadBtn.onclick = function(){

                    saveAs(blob, "resized-image.png");

                };

            }, "image/png");

        };

        img.src = URL.createObjectURL(file);

    });
}
