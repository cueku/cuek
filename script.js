window.addEventListener("load", () => {

const loader = document.getElementById("loader");

if(loader){

setTimeout(() => {

loader.style.opacity = "0";

setTimeout(() => {

loader.style.display = "none";

},800);

},3000);

}

});

const productGrid =
document.getElementById("productGrid");

const searchInput =
document.getElementById("searchInput");

const categories =
document.querySelectorAll(".category");

let currentCategory = "All";

function renderProducts(){

if(!productGrid) return;

const keyword =
searchInput.value.toLowerCase();

const filtered =
products.filter(product=>{

const matchCategory =
currentCategory === "All" ||
product.category === currentCategory;

const matchSearch =
product.name
.toLowerCase()
.includes(keyword);

return (
matchCategory &&
matchSearch
);

});

productGrid.innerHTML = "";

if(filtered.length === 0){

productGrid.innerHTML = `
<div class="product-card">
<div class="product-title">
Produk tidak ditemukan
</div>
</div>
`;

return;

}

filtered.forEach(product=>{

const card =
document.createElement("div");

card.className =
"product-card";

card.innerHTML = `

<div class="product-title">
${product.name}
</div>

<div class="price-item">
${product.price}
</div>

<button class="view-btn">
Lihat Harga
</button>

<div class="price-list">

${product.description
.split("\n")
.filter(line=>line.trim())
.map(line=>`
<div class="price-item">
${line}
</div>
`).join("")}

<a
href="https://wa.me/62895419050123?text=${encodeURIComponent(
"Halo Cueku Store, saya ingin order " +
product.name
)}"
target="_blank"
>

<button class="order-btn">
Pesan via WhatsApp
</button>

</a>

</div>

`;

const viewBtn =
card.querySelector(".view-btn");

const priceList =
card.querySelector(".price-list");

viewBtn.addEventListener(
"click",
()=>{

priceList.classList.toggle(
"active"
);

viewBtn.textContent =
priceList.classList.contains(
"active"
)
?
"Sembunyikan Harga"
:
"Lihat Harga";

}
);

productGrid.appendChild(card);

});

}

if(searchInput){

searchInput.addEventListener(
"input",
renderProducts
);

}

categories.forEach(button=>{

button.addEventListener(
"click",
()=>{

categories.forEach(btn=>
btn.classList.remove(
"active"
)
);

button.classList.add(
"active"
);

currentCategory =
button.dataset.category;

renderProducts();

}
);

});

const scrollBtn =
document.getElementById(
"scrollTop"
);

if(scrollBtn){

window.addEventListener(
"scroll",
()=>{

if(window.scrollY > 400){

scrollBtn.style.display =
"block";

}else{

scrollBtn.style.display =
"none";

}

}
);

scrollBtn.addEventListener(
"click",
()=>{

window.scrollTo({

top:0,
behavior:"smooth"

});

}
);

}

renderProducts();
