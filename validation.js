export default function validateForm() {
  let formFormate = /^\s*(?!\s$)\S.*\S\s*$/;
  if (productName.value == "" || !productName.value.match(formFormate)) {
    alert("Name must be filled out");
    return false;
  } else if (description.value == "" || !description.value.match(formFormate)) {
    alert("description must be filled out");
    return false;
  } else if (price.value == "" || !price.value.match(formFormate)) {
    alert("price must be filled out");
    return false;
  } else {
    return true;
  }
}
