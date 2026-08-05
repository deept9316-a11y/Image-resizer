# Image-resizer<input type="file" id="imageInput" accept="image/*">
<img id="preview" width="300">

<script>
const input = document.getElementById("imageInput");
const preview = document.getElementById("preview");

input.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    preview.src = URL.createObjectURL(file);
  }
});
</script>https://github.com/deept9316-a11y/Image-resizer/edit/main/README.md
.
