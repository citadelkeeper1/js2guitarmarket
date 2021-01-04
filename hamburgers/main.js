//3. *Некая сеть фастфуда предлагает несколько видов гамбургеров:
//### Маленький (50 рублей, 20 калорий).
//### Большой (100 рублей, 40 калорий). ### Гамбургер может быть с одним из нескольких видов начинок (обязательно):
//### С сыром (+10 рублей, +20 калорий).
//### С салатом (+20 рублей, +5 калорий).
//### С картофелем (+15 рублей, +10 калорий). ### Дополнительно гамбургер можно посыпать приправой (+15 рублей, +0 калорий) и полить майонезом (+20 рублей, +5 калорий). ### 3Напишите программу, рассчитывающую стоимость и калорийность гамбургера. Можно использовать примерную архитектуру класса из методички, но можно использовать и свою.

// режим отладки
let DEBUG = true;

// функция возвращает строку s с первым символом в uppercase
function cap(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// ингредиенты
const ingreds = {
    setSmall: {name: 'маленький', cost: 50, calories: 20},
    setBig: {name: 'большой', cost: 100, calories: 40},
    cheese: {name: 'сыр', cost: 10, calories: 20},
    salad: {name: 'салат', cost: 20, calories: 5},
    potato: {name: 'картофель', cost: 15, calories: 10},
    spice: {name: 'приправа', cost: 15, calories: 0},
    mayonnaise: {name: 'майонез', cost: 20, calories: 5},
}
      
class Hamburger{
    // конструктор. big (boolean) - приготовить большой бургер (по умолчанию false - маленький бургер)
    constructor(big = false){
        if (DEBUG) {console.log(`Готовится ${big ? 'большой' : 'маленький'} гамбургер.`);}
        let blank;
        if (big) {
            blank = ingreds.setBig;
        } else {
            blank = ingreds.setSmall;
        };
        this._hamburgerType = blank.name; // тип гамбургера
        this._cost = blank.cost; // общая стоимость
        this._calories = blank.calories; // общая калорийность
        this._filling = []; // набор дополнительных ингредиентов (начинка)
    }

    // метод добавляет ингредиенты к гамбургеру. аргументы - объекты с полями name, cost и calories.
    addFilling(...ingredients){
        if (DEBUG) {console.log(`Добавление ингредиентов:`);}
        ingredients.forEach(ingredient => {
            if (ingredient && !this._filling.includes(ingredient.name)){
                this._filling.push(ingredient.name);
                this._cost += ingredient.cost;
                this._calories += ingredient.calories;
                if (DEBUG) {console.log(` * ${ingredient.name}`);}
            }
        });
    }
    
    // возвращает стоимость гамбургера
    getCost(){
        return this._cost;
    }
    
    // возвращает калорийность гамбургера
    getCalories(){
        return this._calories;
    }

    // возвращает массив начинок
    getFilling(){
        return this._filling;
    }
    
    // возвращает тип гамбургера
    getType(){
        return this._hamburgerType;
    }
    
    // переопределение медота toString для строкового представления объекта
    toString(){
        return `${cap(this._hamburgerType)} гамбургер. Добавки: ${this._filling.join(', ')}.`;
    }
}

function main(){

    // цвета кнопок
    let active = "rgb(76, 175, 80)";
    let unactive = "rgb(229, 229, 229)";

    // меняет цвет нажатой кнопки
    function toggleActive(b){
        b.style.background = b.style.background == active ? unactive : active;
    }

    // активирует b1 и деактивирует b2
    function activateButton(b1, b2){
        toggleActive(b1);
        toggleActive(b2);
    }
    
    // приготовление гамбургера
    function cookBurger(){
        let divCook = document.getElementById('div_cook');
        
        // по условию необходимо выбрать начинку
        if (buttonCheese.style.background == unactive &&
            buttonSalad.style.background == unactive &&
            buttonPotato.style.background == unactive)
        {
            divCook.innerHTML = "<h4>Вы не выбрали начинку!</h4>";
        }
        else {
            // определяем параметры гамбургера в соответствии с нажатыми кнопками
            let bigBurger = buttonBig.style.background == active ? true : false;
            let addCheese = buttonCheese.style.background == active ? true : false;
            let addSalad = buttonSalad.style.background == active ? true : false;
            let addPotato = buttonPotato.style.background == active ? true : false;
            let addSpice = buttonSpice.style.background == active ? true : false;
            let addMayo = buttonMayo.style.background == active ? true : false;

            // создаём объект гамбургера
            h1 = new Hamburger(bigBurger);
            
            // добавляем начинку
            h1.addFilling(addCheese?ingreds.cheese:null, addSalad?ingreds.salad:null, addPotato?ingreds.potato:null,
                          addSpice?ingreds.spice:null, addMayo?ingreds.mayonnaise:null);

            if (DEBUG) {
                console.log('Ваш заказ готов. ' + h1);
                console.log('Стоимость: ' + h1.getCost());
                console.log('Калорийность: ' + h1.getCalories());
            }
            
            // выводим результат на страницу
            divCook.innerHTML = `<h4>
                                     Ваш заказ готов. ${h1}
                                     <br>
                                     Калорийность: ${h1.getCalories()}
                                     <br>
                                     Стоимость: ${h1.getCost()} руб.
                                 </h4>`;
        }
    }
    
    let buttonBig = document.getElementById("button_big");
    let buttonSmall = document.getElementById("button_small");
    let buttonCheese = document.getElementById("button_cheese");
    let buttonSalad = document.getElementById("button_salad");
    let buttonPotato = document.getElementById("button_potato");
    let buttonSpice = document.getElementById("button_spice");
    let buttonMayo = document.getElementById("button_mayo");
    let buttonCook = document.getElementById("button_cook");
    
    let buttons = [buttonBig, buttonSmall, buttonCheese, buttonSalad, buttonPotato, buttonSpice, buttonMayo, buttonCook];

    // добавляем для кнопок обработчики событий и устанавливаем цвет
    buttons.forEach(button => {
        button.style.background = unactive; // по умолчанию все кнопки серые
        if (button == buttonBig){ // для кнопок типа гамбургера устанавливам особый обработчик события click
            button.addEventListener("click", () => activateButton(buttonBig, buttonSmall));
        }
        else if (button == buttonSmall){ // по умолчанию выбран маленький гамбургер
            button.addEventListener("click", () => activateButton(buttonSmall, buttonBig));
            button.style.background = active;
        }
        else if (button == buttonCook){ // кнопка "приготовить"
            button.addEventListener("click", cookBurger);
        }
        else { // кнопки для добавок и дополнительных ингредиентов
            button.addEventListener("click", () => toggleActive(button));
        }
    });
}

window.onload = main;
