class ProductsList{
    constructor(container = '.cat'){
        this.container = container;
        this.goods = [];
        this._fetchProducts();
    } 
    
    _fetchProducts(){
        this.goods = [
            {id: 1, title: 'TAYLOR BBT Big Baby Taylor', price: 38000, href: "catalog/taylor.html", img: "images/taylor.jpg"},
            {id: 2, title: 'IBANEZ ArtWood AVD9-NT', price: 47500, href: "catalog/ibanez.html", img: "images/ibanez.jpg"},
            {id: 3, title: 'Fender Squier Vintage Modified Precision Bass PJ 3-Color Sunburst', price: 170000, href: "catalog/fender.html", img: "images/fender.jpg"},
            {id: 4, title: 'SCHECTER OMEN EXTREME-5 VSB', price: 62000, href: "catalog/schecter.html"}, // здесь отсутствует изображение
            {id: 5, title: 'FENDER American Special Stratocaster HSS, Rosewood Fingerboard', price: 190000, href: "catalog/fender_special.html", img: "images/fender_special.jpg"},
            {id: 6, title: 'GIBSON LES PAUL FADED 2018 WORN CHERRY', price: 12000, href: "catalog/gibson.html", img: "images/gibson.jpg"},
        ];
    }

    render(){
        const block = document.querySelector(this.container);
        for(let product of this.goods){
            const productObj = new ProductItem(product);
            block.insertAdjacentHTML('beforeend',productObj.render())
        }
    }
    
    // метод возвращает суммарную стоимость всех товаров
    totalPrice(){
        let sum = 0;
        this.goods.forEach(item => sum += item.price);
        return sum;
    }
}


class ProductItem{
	constructor(product){
		this.title = product.title;
		this.price = product.price;
		this.id = product.id;
        this.href = product.href;
        if (product.img){
            this.img = product.img;
        }
        else{ // product не имеет свойства img, подставляем картинку по умолчанию
            this.img = "images/blank_guitar.jpg";
        }
	}
	
	render(){
        return `<div class="cat_product" data-id="${this.id}>
                    <a href="${this.href}">
                        <img class="cat_img" src="${this.img}" alt="${this.alt}">
                        <h3>${this.title}</h3>
                        <button class="buy-btn">Купить (${this.price} р.)</button>
                    </a>
                </div>`
	}
}

let list = new ProductsList();
list.render();
console.log(`totalPrice: ${list.totalPrice()}`);
