const prdName = document.getElementById("productName");
const description = document.getElementById("productDescription");
const prdPrice = document.getElementById("productPrice");
const form = document.getElementById("productForm");
const resetBtn = document.getElementById("resetBtn");
const submitBtn = document.getElementById("submitBtn");
const products = document.getElementById("product-list");
const productPhoto = document.getElementById("productPhoto");
const searchBar = document.getElementById("search");
let imgUrl;
let productList = [];

if (localStorage.getItem("productList") != null) {
  productList = JSON.parse(localStorage.getItem("productList"));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  productList.push({
    id: Math.floor((Math.random() * Date.now()) / 10000000),
    name: prdName.value,
    desc: description.value,
    price: prdPrice.value,
    image: imgUrl == undefined ? "./images/img-2.png" : imgUrl,
  });
  localStorage.setItem("productList", JSON.stringify(productList));
  swal("Product Uploaded!", "", "success");
  form.reset();
  getDataFromLocal();
});

resetBtn.addEventListener("click", (e) => {
  e.preventDefault();
  form.reset();
});

productPhoto.addEventListener("change", (e) => {
  if (productPhoto.files[0].size < 1000000) {
    var fReader = new FileReader();
    fReader.onload = (e) => {
      imgUrl = e.target.result;
    };
    fReader.readAsDataURL(productPhoto.files[0]);
  } else {
    console.log("File size too long");
  }
});

const getDataFromLocal = () => {
  let html = "";
  productList.forEach((data, index) => {
    html += `<tr index="${index}">\
    <td>${index + 1}</td>\
    <td>${data.id}</td>\
    <td>\
      <img\
        src="${data.image}"\
        alt=""\
        class="object-fit-cover"\
        width="50px"\
        height="50px"\
      />\
    </td>\
    <td>${data.name}</td>\
    <td>${data.price}</td>\
    <td class="text-center">\
      <button class="btn btn-white feature-btn">\
        <i class="fa-solid fa-eye feature-btn"></i>\
      </button>\
      <button class="btn btn-white feature-btn">\
        <i class="fa-solid fa-pen-to-square"></i>\
      </button>\
      <button class="btn btn-white del-btn feature-btn">\
        <i class="fa-solid fa-trash"></i>\
      </button>\
    </td>\
  </tr>`;
  });
  products.innerHTML = html;

  // delete code
  let btn;
  const allDelBtns = document.querySelectorAll(".del-btn");
  for (btn of allDelBtns) {
    btn.addEventListener("click", (e) => {
      const productRow = e.target.parentElement.parentElement;
      const index = productRow.getAttribute("index");
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this data!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          productList.splice(index, 1);
          localStorage.setItem("productList", JSON.stringify(productList));
          getDataFromLocal();
          swal("Product data has been deleted!", {
            icon: "success",
          });
        }
      });
    });
  }
};
window.onload = getDataFromLocal();

//debouncing for search filter
function searchBarHandler() {
  let tr = products.querySelectorAll("tr");
  let searchVal = searchBar.value.toLowerCase();
  for (let row of tr) {
    let td = row.getElementsByTagName("TD")[1];
    if (td.innerHTML.toLowerCase().indexOf(searchVal) > -1) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  }
}
function debounce(func, delay) {
  let timeId;
  return function () {
    clearTimeout(timeId);
    timeId = setTimeout(() => {
      console.log("abc");
      func();
    }, delay);
  };
}

searchBar.addEventListener("input", debounce(searchBarHandler, 300));

//sorting
function sortByID() {
  console.log(productList);
  productList.sort((a, b) => {
    return a.id > b.id ? 1 : -1;
  });
  getDataFromLocal();
}
function sortByName() {
  productList.sort((a, b) => {
    return a.name > b.name ? 1 : -1;
  });
  getDataFromLocal();
}
function sortByPrice() {
  console.log("here");
  productList.sort((a, b) => {
    return a.price > b.price ? 1 : -1;
  });
  console.log(productList);
  getDataFromLocal();
}

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
//   var products;
//   if (localStorage.getitem("products") == null) {
//     products = [];
//   } else {
//     products = JSON.parse(localStorage.getItem("products"));
//   }

//   var html = "";

//   products.forEach((element, index) => {
//     html += "<tr>";
//     html += "<td>" + element.name + "</td>";
//     html += "<td>" + element.name + "</td>";
//     html += "<td>" + element.name + "</td>";
//   });
// }
