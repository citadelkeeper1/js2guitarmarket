class Cart{
    // конструктор
    constructor(container = '.cart'){} 
    
    // отрисовка корзины
    render(){}
    
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