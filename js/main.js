const products = [
    {id: 1, title: 'TAYLOR BBT Big Baby Taylor', price: 38000, href: "catalog/taylor.html", img: "images/taylor.jpg", alt: "Taylor"},
    {id: 2, title: 'IBANEZ ArtWood AVD9-NT', price: 47500, href: "catalog/ibanez.html", img: "images/ibanez.jpg", alt: "Ibanez"},
    {id: 3, title: 'Fender Squier Vintage Modified Precision Bass PJ 3-Color Sunburst', price: 170000, href: "catalog/fender.html", img: "images/fender.jpg", alt: "Fender"},
    {id: 4, title: 'SCHECTER OMEN EXTREME-5 VSB', price: 62000, href: "catalog/schecter.html", img: "images/schecter.jpg", alt: "Schecter"},
    {id: 5, title: 'FENDER American Special Stratocaster HSS, Rosewood Fingerboard', price: 190000, href: "catalog/fender_special.html", img: "images/fender_special.jpg", alt: "Fender special"},
    {id: 6, title: 'GIBSON LES PAUL FADED 2018 WORN CHERRY', price: 12000, href: "catalog/gibson.html", img: "images/gibson.jpg", alt: "Gibson"},
];
const defaultProduct = {id: 0, title: 'Гитара', price: 100, href: '#', img: 'images/blank_guitar.jpg', alt: 'guitar'};
//Функция для формирования верстки каждого товара
const renderProduct = (prod = defaultProduct) => {
    return `<div class="cat_product">
                <a href="${prod.href}">
                    <img class="cat_img" src="${prod.img}" alt="${prod.alt}">
                    <h3>${prod.title}</h3>
                    <button class="buy-btn">Купить (${prod.price} р.)</button>
                </a>
            </div>`
};
const renderPage = (list = []) => {
    const productsList = list.map(item => renderProduct(item));
    console.log(productsList);
    // Запятые в оригинальном скрипте появлялись из-за применения стандартного сепаратора (запятая) при получении строкового представления
    // массива productList. С помощью метода join можно задать другой сепаратор (в данном случае это пустая строка).
    document.querySelector('.cat').innerHTML = productsList.join('');
};

renderPage(products);
