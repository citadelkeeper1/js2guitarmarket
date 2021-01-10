/*eslint-env es6*/
/*eslint-env browser*/
/*eslint-disable no-unused-vars*/
/*eslint-disable no-console*/

PRODUCTS_JSON_PATH = 'JSON/products.json'  // путь к json-файлу с товарами

class ProductsList{
    constructor(container = '.cat'){
        this.container = container;
        this.cartPriceElement = document.getElementById('cartMenuButton');  // пункт меню "корзина"
        this.goods = [];
        this._cartPrice = 138000;  // общая стоимость корзины
        this._getProducts()  // получаем список товаров
            .then(data => {
                this.goods = [...data];
                this.render();
                this._buyButtons = [];  // массив элементов кнопок "купить"
                for(let i=1; i<=this.goods.length; i++){
                    this._buyButtons[i-1] = document.getElementById(i);  // находим элемент кнопки
                    this._buyButtons[i-1].addEventListener('click', (item) => {  // добавляем обработчик события 'click'
                        this._cartPrice += this.goods[i-1].price;  // увеличиваем стоимость корзины
                        this.showTotalCartPrice();  // меняем соответствующий пункт меню
                    });
                }
            });
    }
    
    _getProducts(){  // получение списка товаров из JSON
        return fetch(PRODUCTS_JSON_PATH)
            .then(result => result.json())
            .catch(err => console.log(err));
    }
    
    showTotalCartPrice(){  // выводим общую стоимость корзины в меню
        this.cartPriceElement.innerHTML = `Корзина (${this._cartPrice} руб.)`;
    }

    render(){
        const block = document.querySelector(this.container);
        for(let product of this.goods){
            const productObj = new ProductItem(product);
            block.insertAdjacentHTML('beforeend',productObj.render())
        }
        this.showTotalCartPrice();
    }
    
    // метод возвращает суммарную стоимость всех товаров
    totalPrice(){
//        let sum = 0;
//        this.goods.forEach(item => sum += item.price);
        let sum = this.goods.reduce((accum, item) => accum += item.price, 0)
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
        return `<div class="cat_product">
                    <a href="${this.href}">
                        <img class="cat_img" src="${this.img}" alt="${this.alt}">
                        <h3>${this.title}</h3>
                    </a>
                    <button class="buy-btn" id="${this.id}">Купить (${this.price} р.)</button>
                </div>`
	}
}

let list = new ProductsList();
list.render();


console.log(`totalPrice: ${list.totalPrice()}`);

