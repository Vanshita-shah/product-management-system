export default function isValid(name, price,photo) {
  console.log(price);
  if (name == "" || name.trim() == "") {
    alert("Invalid name");
    return false;
  } else if (!name.match(/^[A-Za-z][ A-Za-z0-9_/()-]*$/)) {
    alert("Name should not contain any such characters");
    return false;
  } else if (price.includes("e")) {
    alert("please enter valid price");
    return false;
  }else if(!isFileValid(photo)){
    alert("file invalid");
    return false;
  }
  console.log("here");
  return true;
}

function isFileValid(productPhoto) {
  const idxDot = productPhoto.value.lastIndexOf(".") + 1;
  const extFile = productPhoto.value
    .substr(idxDot, productPhoto.value.length)
    .toLowerCase();
  if(extFile===""){
    return true
  }
  if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
    if (productPhoto.files[0].size > 200000) {
      alert("File size should be <200KB");
      productPhoto.value = "";
      imgPreview.src = "./images/img-2.png";
      return false;
    }
  } else {
    alert("Only jpg/jpeg and png files are allowed!");
    productPhoto.value = "";
    imgPreview.src = "./images/img-2.png";
    return false;
  }
  return true;
}
