// DOM elements
const fileInput = document.getElementById("fileInput");
const convertButton = document.getElementById("convertButton");
const resultImage = document.getElementById("resultImage");
const dataURL = document.getElementById("dataURL");
const message = document.getElementById("message");

// Convert the selected image to WebP format
convertButton.addEventListener("click", function() {
  if (!fileInput.value) {
    message.textContent = "Please select an image to convert";
    return;
  }
  
  message.textContent = "Converting...";

  const reader = new FileReader();
  reader.onload = function() {
    const img = new Image();
    img.src = reader.result;
    img.onload = function() {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);
      canvas.toBlob(function(blob) {
        const url = URL.createObjectURL(blob);
        resultImage.querySelector("img").src = url;
        dataURL.value = url;
        message.textContent = "Conversion complete!";
      }, "image/webp");
    };
  };
  reader.readAsDataURL(fileInput.files[0]);
});
