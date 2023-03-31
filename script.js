const prdName = document.getElementById("productName");
const description = document.getElementById("productDescription");
const prdPrice = document.getElementById("productPrice");
const form = document.getElementById("productForm");
const resetBtn = document.getElementById("resetBtn");
const submitBtn = document.getElementById("submitBtn");
const products = document.getElementById("product-list");
const productPhoto = document.getElementById("productPhoto");
const searchBar = document.getElementById("search");
let imgUrl = "";
let productList = [];

if (localStorage.getItem("productList") != null) {
  productList = JSON.parse(localStorage.getItem("productList"));
}

productPhoto.addEventListener("change", (e) => {
  if (productPhoto.files[0].size < 1000000) {
    let fReader = new FileReader();
    fReader.onload = (e) => {
      imgUrl = e.target.result;
    };
    fReader.readAsDataURL(productPhoto.files[0]);
  } else {
    console.log("File size too long");
  }
  const img = URL.createObjectURL(e.target.files[0]);
  const imgPreview = document.getElementById("imgPreview");
  imgPreview.src = img;
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  productList.push({
    id: Math.floor((Math.random() * Date.now()) / 10000000),
    name: prdName.value,
    desc: description.value,
    price: prdPrice.value,
    image: imgUrl === "" ? "./images/img-2.png" : imgUrl,
  });
  localStorage.setItem("productList", JSON.stringify(productList));
  swal("Product Uploaded!", "", "success");
  form.reset();
  getDataFromLocal();
  imgUrl = "";
});

resetBtn.addEventListener("click", (e) => {
  e.preventDefault();
  form.reset();
});

const getDataFromLocal = () => {
  let html = "";
  productList.forEach((data, index) => {
    html += `<tr index="${index}">\
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
    <td>\
    <a href="./view-edit.html?ProductID=${data.id}">
    <button class="btn btn-white edit-btn feature-btn">\
       <i class="fa-solid fa-pen-to-square"></i>\
     </button>\
    </a>
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
  console.log(allDelBtns);
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
  console.log(tr);
  let searchVal = searchBar.value.toLowerCase();
  console.log(searchVal);
  for (let row of tr) {
    let td = row.getElementsByTagName("TD")[0];
    console.log(td);
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
const sortFeilds=document.querySelectorAll("th i");
console.log(sortFeilds);
sortFeilds.forEach(feild=>{
  feild.addEventListener("click",(e)=>{
    let column=feild.getAttribute('data-column');
    let order=feild.getAttribute('data-order');
    if(order==="desc"){
      feild.setAttribute("data-order","asc");
      productList.sort((a, b) => {
        if(column==="name")
        return a[column] > b[column] ? 1 : -1;
        else
        return Number(a[column]) > Number(b[column]) ? 1 : -1;
        
      });
      getDataFromLocal();
      console.log(feild.getAttribute("data-order"));
    }else{
      feild.setAttribute("data-order","desc");
      productList.sort((a, b) => {
        if(column==="name")
        return a[column] < b[column] ? 1 : -1;
        else
        return Number(a[column]) < Number(b[column]) ? 1 : -1;
      });
      getDataFromLocal();
    }
  })
})

function sortByID() {
  console.log(productList);
  productList.sort((a, b) => {
    return Number(a.id) > Number(b.id) ? 1 : -1;
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
    return Number(a.price) > Number(b.price) ? 1 : -1;
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

