// ===============================
// OPEN TOOL
// ===============================

function openTool(id){

document.querySelectorAll(".tool-box").forEach(function(box){
box.style.display="none";
});

document.getElementById(id).style.display="block";

window.scrollTo({
top:document.getElementById(id).offsetTop-20,
behavior:"smooth"
});

}

// ===============================
// IMAGE RESIZER
// ===============================

const resizeBtn=document.getElementById("resizeBtn");

if(resizeBtn){

resizeBtn.addEventListener("click",function(){

const file=document.getElementById("resizeImage").files[0];

if(!file){
alert("Select Image");
return;
}

const width=parseInt(document.getElementById("width").value);

const height=parseInt(document.getElementById("height").value);

if(!width||!height){
alert("Enter Width & Height");
return;
}

const img=new Image();

img.onload=function(){

const canvas=document.getElementById("canvas");

canvas.width=width;

canvas.height=height;

const ctx=canvas.getContext("2d");

ctx.drawImage(img,0,0,width,height);

const download=document.getElementById("downloadBtn");

download.href=canvas.toDataURL("image/png");

download.download="resized-image.png";

download.style.display="inline-block";

};

img.src=URL.createObjectURL(file);

});

}

// ===============================
// IMAGE COMPRESSOR
// ===============================

const compressBtn=document.getElementById("compressBtn");

if(compressBtn){

compressBtn.addEventListener("click",function(){

const file=document.getElementById("compressImage").files[0];

if(!file){
alert("Select Image");
return;
}

const quality=document.getElementById("quality").value/100;

const img=new Image();

img.onload=function(){

const canvas=document.createElement("canvas");

canvas.width=img.width;

canvas.height=img.height;

const ctx=canvas.getContext("2d");

ctx.drawImage(img,0,0);

canvas.toBlob(function(blob){

const download=document.getElementById("downloadCompressed");

download.href=URL.createObjectURL(blob);

download.download="compressed-image.jpg";

download.style.display="inline-block";

},"image/jpeg",quality);

};

img.src=URL.createObjectURL(file);

});

}
```
