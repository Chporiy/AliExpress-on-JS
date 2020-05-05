import AliExpressServices from './services'
import db from './db'
import '../css/style.css'

window.addEventListener("DOMContentLoaded", function () {

  // const aliExpressServices = new AliExpressServices();

  (function createElement(arr) {
    const goodsWrapper = document.querySelector(".goods__wrapper");

    arr.forEach(function (item) {
      let card = document.createElement("div");
      card.classList.add("goods__item");
      card.innerHTML = `
        <img class="goods__img" src="${item.url}" alt="phone">
        <div class="goods__colors">Доступно цветов: 4</div>
        <div class="goods__title">
            ${item.title}
        </div>
        <div class="goods__price">
            <span>${item.price}</span> руб/шт
        </div>
        <button class="goods__btn">Добавить в корзину</button>
      `;

      goodsWrapper.appendChild(card);
    });
  })(db.goods)

  // aliExpressServices.loadContent('./db.json')
  //   .then(createElement(data))
  //   .then(() => {
      const cartWrapper = document.querySelector(".cart__wrapper"),
        cart = document.querySelector(".cart"),
        open = document.querySelector("#cart"),
        close = document.querySelector(".cart__close"),
        goodsBtn = document.querySelectorAll(".goods__btn"),
        products = document.querySelectorAll(".goods__item"),
        confirm = document.querySelector(".confirm"),
        badge = document.querySelector(".nav__badge"),
        totalCost = document.querySelector(".cart__total > span"),
        titles = document.querySelectorAll(".goods__title");
  
      function openCart() {
        cart.style.display = "block";
        document.body.style.overflow = "hidden";
      }
  
      function closeCart() {
        cart.style.display = "none";
        document.body.style.overflow = "";
      }
  
      open.addEventListener("click", openCart);
      close.addEventListener("click", closeCart);
  
      goodsBtn.forEach(function (btn, i) {
        btn.addEventListener("click", () => {
          let item = products[i].cloneNode(true), // клонировать каточку товара
            trigger = item.querySelector("button"),
            removeBtn = document.createElement('div'),
            empty = cartWrapper.querySelector(".empty");
  
          trigger.remove();
          showConfirm();
  
          removeBtn.classList.add("goods__item-remove");
          removeBtn.innerHTML = "&times;";
          item.appendChild(removeBtn);
  
          cartWrapper.appendChild(item);
  
          if (empty) {
            empty.style.display = "none";
          }
          calcGoods();
          calcTotal();
          removeFromCart();
        });
  
      });
  
      function sliceTitles() {
        titles.forEach(function (item) {
          if (item.textContent.length < 60) {
            return;
          } else {
            const str = `${item.textContent.slice(0, 60)}...`;
            item.textContent = str;
          }
        });
      }
  
      sliceTitles();
  
      function showConfirm() {
        confirm.style.display = "block";
        let counter = 100;
  
        const id = setInterval(frame, 10);
  
        function frame() {
          if (counter == 10) {
            clearInterval(id);
            confirm.style.display = "none";
          } else {
            counter--;
            confirm.style.transform = `translateY(-${counter}px)`;
            confirm.style.opacity = '.' + counter;
          }
        }
      }
  
      function calcGoods() {
        const items = cartWrapper.querySelectorAll(".goods__item");
        badge.textContent = items.length;
      }
  
      function calcTotal() {
        const prices = document.querySelectorAll(".cart__wrapper > .goods__item > .goods__price > span");
        let total = 0;
        prices.forEach(function (item) {
          total += +item.textContent;
        });
        totalCost.textContent = total;
      }
  
      function removeFromCart() {
        const removeBtn = cartWrapper.querySelectorAll(".goods__item-remove");
        removeBtn.forEach(function (btn) {
          btn.addEventListener("click", () => {
            btn.parentElement.remove();
            calcGoods();
            calcTotal();
            if (badge.textContent == "0") {
              cartWrapper.querySelector(".empty").style.display = "block";
            }
          });
        });
      }
    // })
});