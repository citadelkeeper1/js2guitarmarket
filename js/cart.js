/*eslint-env es6*/
/*eslint-env browser*/
/*eslint-disable no-unused-vars*/
/*eslint-disable no-console*/

CART_JSON_PATH = 'JSON/cart.json';
PRODUCTS_JSON_PATH = 'JSON/products.json';

class Cart{
    // конструктор
    constructor(container = '.cart'){
        this.container = container;
        this._cart = {};
        this._products = [];
        this._getCart()  // заполняем объект корзины
            .then(data => {
                this._cart = data;
                this._getProducts()  // считываем продукты (для получения картинок)
                    .then(prodData => {
                        this._products = [...prodData];
                        this.render();
                    });
            });
    }
    
    _getCart(){  // получение JSON-файла корзины
        return fetch(CART_JSON_PATH)
            .then(result => result.json())
            .catch(err => console.log(err));
    }

    _getProducts(){  // получение JSON-файла товаров
        return fetch(PRODUCTS_JSON_PATH)
            .then(result => result.json())
            .catch(err => console.log(err));
    }
        
    // отрисовка корзины
    render(){
        const block = document.querySelector(this.container);
        // выводим количество товаров и полную стоимость
        block.insertAdjacentHTML('beforeend', `<h3>Товаров в корзине: ${this._cart.countGoods}. Общая сумма: ${this._cart.amount} руб.</h3>`);
        this._cart.contents.forEach(item => {
            let img = this._products[item.id_product].img;  // получаем картинку из массива продуктов
            block.insertAdjacentHTML('beforeend', `<div class="cart_product" data-id="${item.id_product}>
                                                       <a href="${this.href}">
                                                           <hr>
                                                           <img class="cart_img" src="${img}">
                                                           <h3>${item.product_name}</h3>
                                                           <h4>Стоимость: ${item.price}</h4>
                                                           <h4>Количество: ${item.quantity}</h4>
                                                       </a>
                                                   </div>`);
        })
    }
    
    // добавить товар в корзину (quantity на случай, если на странице реализовано добавление сразу нескольких штук)
    addItem(item, quantity){}
    
    // удалить один товар из корзины (или уменьшить их количество на 1, если их несколько)
    delItem(id){}
    
    // удалить позицию из корзины (весь выбранный товар)
    delPosition(id){}
    
    // очистить корзину (удалить все товары)
    clearCart(){}
    
    // получить общую стоимость товаров в корзине
    getTotalPrice(){}
    
    // получить общее количество товаров в корзине
    getTotalQuantity(){}
}


class CartItem{
    // конструктор
	constructor(product, quantity){}
    
    // установить количество единиц товара
    setQuantity(quantity){}

    // получить количество единиц товара
    getQuantity(){}
	
    // получить общую стоимость (price * quantity)
    getPrice(){}

    // отрисовка позиции
	render(){}
}

cart = new Cart()

