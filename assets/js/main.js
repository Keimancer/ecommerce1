"use strict"

const items = [
    {
        id: 1,
        name: 'Hoodie',
        price: "24.00",
        image: './assets/images/featured1.png',
        category: 'hoodies',
        quantity: 10
    },
    {
        id: 2,
        name: 'Sweatshirt',
        price: "14.00",
        image: './assets/images/featured2.png',
        category: 'sweatshirts',
        quantity: 15
    },
    {
        id: 3,
        name: 'Hoodie',
        price: "24.00",
        image: './assets/images/featured3.png',
        category: 'shirts',
        quantity: 20
    },
    {
        id: 4,
        name: 'Sweatshirt',
        price: "14.00",
        image: './assets/images/home.png',
        category: 'sweatshirts',
        quantity: 15
    }
];

let nav = document.querySelector("nav");
let cartIcon = document.querySelector(".cart-icon");
let cartOpen = document.querySelector("aside.shopping-cart");
let cartClose = document.getElementById("cart-close");
let productsContainer = document.querySelector("div.products-father");
let cartTitle = document.querySelector("div.product-list > h2");
let isCartFT = false;
let cart = [];

document.addEventListener("DOMContentLoaded", () =>{
    showMerch()
});

window.addEventListener( "scroll", () =>{
    if( window.scrollY > 60 ){
        nav.classList.add("scroll-change")
    }else{
        nav.classList.remove("scroll-change")
    }
})

cartIcon.addEventListener( "click", () =>{
    cartOpen.classList.add("show")
    cartFiller();
})

cartClose.addEventListener( "click", () =>{
    cartOpen.classList.remove("show")
})


function showMerch() {
    let fragmentHTML = ""

    items.forEach( (product) =>{
        fragmentHTML += `
        <div class="product-slide">
            <img src=${product.image} alt="">
            <button data-id="${product.id}" class="product-button">
                <i class='product-img bx bx-plus'></i>
            </button>
            <div class="product-text">
                <h2 class="product-price">$${product.price}</h2>
                <h5 class="product-stock">| Stock: ${product.quantity}</h5>
            </div>
            <h4 class="product-category">${product.name}</h4>
        </div>
        `
    });

    productsContainer.innerHTML = fragmentHTML;


    let addButtonProd = document.querySelectorAll(".product-button");


    addButtonProd.forEach( (button) =>{
        button.addEventListener("click", () =>{
            let id = parseInt( button.getAttribute("data-id") )
            let product = items.find( item =>{ 
                return item.id === id 
            })
            
            cart.push( product )
            console.log((cart))
        })
    })
}

function cartFiller(){
    let fragmentHTML = "";
    let emptyState = document.createElement("div");
    emptyState.classList.add("empty-state");
    let emptySelector = document.querySelector("div.empty-state");

    if (cart.length == 0 && isCartFT == false){
        fragmentHTML += `
            <img src="./assets/images/empty-cart.png" alt="">
            <h2>Your cart is empty</h2>
            <h5>You can add items to your cart by clicking on the '+' button on the product page.</h5>
        `
        emptyState.innerHTML = fragmentHTML;
        cartTitle.insertAdjacentElement("afterend", emptyState);
        isCartFT = true;
    }else if (cart.length > 0){
        emptySelector.parentNode.removeChild(emptySelector);
    }
}