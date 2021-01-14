const db = [
  {
    id: 1,
    name: "Savoyarde",
    category: "pizza",
    price: 10,
    image: "https://pinchofyum.com/wp-content/uploads/chicken-sausage-pizza-185x185.jpg",
  },
  {
    id: 2,
    name: "4 Fromages",
    category: "pizza",
    price: 12,
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.hD0SZSm6E8bejCqsTdYT8gHaHu%26pid%3DApi&f=1",
  },
  {
    id: 3,
    name: "Napolitaine",
    category: "pizza",
    price: 9,
    image:
      "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.wickerparkbucktown.info%2Ffiles%2Fimages%2Fcontent%2Frestaurants%2FPiece%2520Pizza%2520Pepperoni.jpg&f=1&nofb=1",
  },
  {
    id: 4,
    name: "Ch'ti",
    category: "burger",
    price: 13,
    image:
      "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fpixel.nymag.com%2Fimgs%2Fdaily%2Fgrub%2F2017%2F03%2F02%2F02-bareburger-impossible-burger.w190.h190.jpg&f=1&nofb=1",
  },
  {
    id: 5,
    name: "Classic",
    category: "burger",
    price: 8,
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fjoyfoodsunshine.com%2Fwp-content%2Fuploads%2F2017%2F04%2FBaked-Sweet-Potato-Black-Bean-Veggie-Burgers-gluten-free-4-150x150.jpg&f=1&nofb=1",
  },
];

let foods = [...db];

const toTTC = (HT) => Math.floor(HT * 1.1);
const carts = [];

const renderProducts = () => {
  document.querySelector(".products__list").innerHTML = "";
  foods.forEach((food) => {
    const $product = document.createElement("article");
    $product.classList.add("product");

    const $title = document.createElement("h3");
    $title.classList.add("product__title");
    $title.innerText = food.name;
    $product.appendChild($title);

    const $image = document.createElement("img");
    $image.classList.add("product__image");
    $image.setAttribute("src", food.image);
    $product.appendChild($image);

    const $price = document.createElement("h4");
    $price.classList.add("product__price");
    $price.innerText = toTTC(food.price);
    $product.appendChild($price);

    const $button = document.createElement("button");
    $button.classList.add("product__addToCart");
    $button.innerText = "Ajouter au panier";
    $button.addEventListener("click", () => {
      carts.push(food.id);
      renderCarts();
    });
    $product.appendChild($button);

    document.querySelector(".products__list").appendChild($product);
  });
  document.querySelector(".products__number").innerText = foods.length;
};

renderProducts();

const renderCarts = () => {
  document.querySelector(".cart__count").innerText = carts.length;
  document.querySelector(".cart__total").innerText = toTTC(carts.reduce((acc, curr) => (acc += foods.find((food) => food.id == curr).price), 0));

  document.querySelector(".cart__detail").innerHTML = "";
  carts.forEach((productId) => {
    const product = foods.find((food) => food.id == productId);
    const $li = document.createElement("li");
    $li.innerText = `${product.category} : ${product.name} - ${toTTC(product.price)}`;

    document.querySelector(".cart__detail").appendChild($li);
  });
};

document.querySelectorAll("input[name='category']").forEach(($category) => {
  $category.addEventListener("click", () => {
    foods = db.filter((food) => food.category === e.target.value);
    renderProducts();
  });
});
