var prdName = document.getElementById("productName");
var description = document.getElementById("productDescription");
var prdPrice = document.getElementById("productPrice");
var form = document.getElementById("productForm");
var resetBtn = document.getElementById("resetBtn");
var submitBtn = document.getElementById("submitBtn");
var productList = document.getElementById("product-list");
var productPhoto = document.getElementById("productPhoto");
var productInfo = [];

if (localStorage.getItem("productInfo") != null) {
  productInfo = JSON.parse(localStorage.getItem("productInfo"));
  console.log("here");
}

submitBtn.addEventListener("click", (e) => {
  productInfo.push({
    id: Math.floor((Math.random() * Date.now()) / 100000),
    name: prdName.value,
    desc: description.value,
    price: prdPrice.value,
    image: imgUrl == undefined ? "./images/img-2.png" : imgUrl,
  });

  var productString = JSON.stringify(productInfo);
  localStorage.setItem("productInfo", productString);
  console.log(productInfo);
  form.reset("");
  console.log(productPhoto.value);
  //   getDataFromLocal();
  e.preventDefault();
});

resetBtn.addEventListener("click", (e) => {
  e.preventDefault();
  form.reset("");
});

const getDataFromLocal = () => {
  productInfo.forEach((data, index) => {
    productList.innerHTML += `<tr index="${index}">\
    <td>${index + 1}</td>\
    <td>${data.id}</td>\
    <td>\
      <img\
        src="${data.image}"\
        alt=""\
        class="object-fit-contain"\
        width="50px"\
        height="50px"\
      />\
    </td>\
    <td>${data.name}</td>\
    <td>${data.price}</td>\
    <td class="text-center">\
      <button class="btn btn-white">\
        <i class="fa-solid fa-eye"></i>\
      </button>\
      <button class="btn btn-white">\
        <i class="fa-solid fa-pen-to-square"></i>\
      </button>\
      <button class="btn btn-white">\
        <i class="fa-solid fa-trash"></i>\
      </button>\
    </td>\
  </tr>`;
  });
};

getDataFromLocal();
// function validateForm() {
//   if (prdName.value === "" || prdName === " ") {
//     alert("Name is required");
//     return false;
//   }

//   if (price < 0 || price === "" || price === " ") {
//     alert("invalid age");
//     return false;
//   }

//   return true;
// }

// function showData() {
//   var productList;
//   if (localStorage.getitem("productList") == null) {
//     productList = [];
//   } else {
//     productList = JSON.parse(localStorage.getItem("productList"));
//   }

//   var html = "";

//   productList.forEach((element, index) => {
//     html += "<tr>";
//     html += "<td>" + element.name + "</td>";
//     html += "<td>" + element.name + "</td>";
//     html += "<td>" + element.name + "</td>";
//   });
// }
