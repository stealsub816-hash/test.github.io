const products = [
 {id:1,title:"Набор предметов",game:"Roblox",desc:"Демонстрационный набор игровых предметов для коллекции.",price:199,symbol:"✦",badge:"Популярное",className:"roblox"},
 {id:2,title:"Строительный набор",game:"Minecraft",desc:"Пример дополнения для творческого игрового процесса.",price:149,symbol:"▧",badge:"Новинка",className:"minecraft"},
 {id:3,title:"Игровой набор",game:"Brawl Stars",desc:"Пример тематического набора. Состав уточняется.",price:249,symbol:"★",badge:"Выбор игроков",className:"brawl"},
 {id:4,title:"Космическая коллекция",game:"Roblox",desc:"Вымышленная коллекция с ярким космическим оформлением.",price:99,symbol:"☄",badge:"Выгодно",className:"roblox"},
 {id:5,title:"Пак текстур",game:"Minecraft",desc:"Демонстрационная карточка цифрового дополнения.",price:129,symbol:"▦",badge:"Цифровое",className:"minecraft"},
 {id:6,title:"Другие предложения",game:"Другое",desc:"Добавь сюда собственные безопасные игровые товары.",price:79,symbol:"＋",badge:"Каталог",className:"other"}
];
let activeCategory="Все", favorites=new Set(), showFavorites=false;
const grid=document.getElementById("productGrid"), search=document.getElementById("searchInput");
function render(){
 let list=products.filter(p=>(activeCategory==="Все"||p.game===activeCategory)&&(!showFavorites||favorites.has(p.id))&&(`${p.title} ${p.game} ${p.desc}`.toLowerCase().includes(search.value.toLowerCase())));
 const sort=document.getElementById("sortSelect").value;
 if(sort==="cheap")list.sort((a,b)=>a.price-b.price); if(sort==="expensive")list.sort((a,b)=>b.price-a.price);
 document.getElementById("resultsCount").textContent=`${list.length} предложений`;
 grid.innerHTML=list.length?list.map(p=>`<article class="product"><div class="product-art ${p.className}"><span class="product-badge">${p.badge}</span><button class="fav" data-fav="${p.id}" aria-label="В избранное">${favorites.has(p.id)?"♥":"♡"}</button><span class="symbol">${p.symbol}</span></div><div class="product-info"><h3>${p.title}</h3><p>${p.desc}</p><div class="product-bottom"><div class="price">${p.price} ₽ <small> / пример</small></div><button class="details-btn" data-details="${p.id}">Подробнее ↗</button></div></div></article>`).join(""):`<div class="empty">Ничего не найдено. Попробуй изменить запрос или категорию.</div>`;
 document.getElementById("favCount").textContent=favorites.size;
}
document.querySelectorAll(".category").forEach(btn=>btn.addEventListener("click",()=>{document.querySelector(".category.active")?.classList.remove("active");btn.classList.add("active");activeCategory=btn.dataset.category;showFavorites=false;render()}));
search.addEventListener("input",render);document.getElementById("sortSelect").addEventListener("change",render);
grid.addEventListener("click",e=>{
 const fav=e.target.closest("[data-fav]");if(fav){const id=Number(fav.dataset.fav);favorites.has(id)?favorites.delete(id):favorites.add(id);render();return}
 const detail=e.target.closest("[data-details]");if(detail){const p=products.find(x=>x.id===Number(detail.dataset.details));document.getElementById("modalContent").innerHTML=`<div class="modal-product-art">${p.symbol}</div><div class="eyebrow" style="margin-top:20px">${p.game}</div><h2>${p.title}</h2><p>${p.desc}</p><h3>${p.price} ₽ <small class="muted">— примерная цена</small></h3><p>Это демонстрационная карточка. Перед реальной сделкой всегда проверяй продавца и условия. Оплата не подключена.</p><button class="primary-btn full" id="contactDemo">Понятно</button>`;openModal("productModal");document.getElementById("contactDemo").onclick=()=>closeModal("productModal");}
});
document.getElementById("favoritesBtn").onclick=()=>{showFavorites=!showFavorites;activeCategory="Все";document.querySelectorAll(".category").forEach(b=>b.classList.toggle("active",b.dataset.category==="Все"));render();document.getElementById("catalog").scrollIntoView({behavior:"smooth"})};
document.getElementById("loginBtn").onclick=()=>openModal("loginModal");
document.getElementById("demoLogin").onclick=()=>{const name=document.getElementById("userName").value.trim();if(!name){toast("Введи имя пользователя");return}closeModal("loginModal");document.getElementById("loginBtn").textContent=name.slice(0,12);toast("Демо-вход выполнен. Данные не сохраняются.")};
document.querySelectorAll("[data-close]").forEach(b=>b.onclick=()=>closeModal(b.dataset.close));
document.querySelectorAll(".modal").forEach(m=>m.addEventListener("click",e=>{if(e.target===m)closeModal(m.id)}));
function openModal(id){document.getElementById(id).classList.remove("hidden")}function closeModal(id){document.getElementById(id).classList.add("hidden")}
let toastTimer;function toast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove("show"),2300)}
render();
