let totalCount = 0;


axios
  .get("https://crudcrud.com/api/4176a7ba7f7746488c5c71ef54b9d508/vegshop")
  .then(function (res) {
    res.data.forEach(function (item) {
      showOnUserScreen(item);
    });
  });


function addItem() {
  let item = {
    name: document.getElementById("name").value,
    price: document.getElementById("price").value,
    quantity: document.getElementById("quantity").value
  };

  axios
    .post("https://crudcrud.com/api/4176a7ba7f7746488c5c71ef54b9d508/vegshop", item)
    .then(function (res) {
      showOnUserScreen(res.data);

      document.getElementById("name").value = "";
      document.getElementById("price").value = "";
      document.getElementById("quantity").value = "";
    });
}


function showOnUserScreen(item) {
  let li = document.createElement("li");

  li.innerHTML =
    item.name + " RS: " + item.price +
    " <span class='qty'>" + item.quantity + "</span>KG " +
    "<input type='number' style='width:50px'> " +
    "<button onclick='buyItem(this)'>Buy</button> " +
    "<button onclick='deleteItem(this, \"" + item._id + "\")'>delete</button>";

  document.getElementById("itemList").appendChild(li);

  totalCount++;
  document.getElementById("total").innerText = totalCount;
}


function buyItem(btn) {
  let li = btn.parentElement;
  let available = Number(li.querySelector(".qty").innerText);
  let buyQty = Number(li.querySelector("input").value);

  if (buyQty > 0 && buyQty <= available) {
    li.querySelector(".qty").innerText = available - buyQty;
    li.querySelector("input").value = "";
  } else {
    alert("Invalid quantity");
  }
}


function deleteItem(btn, id) {
  axios
    .delete(
      "https://crudcrud.com/api/4176a7ba7f7746488c5c71ef54b9d508/vegshop/" + id
    )
    .then(function () {
      btn.parentElement.remove();
      totalCount--;
      document.getElementById("total").innerText = totalCount;
    });
}
