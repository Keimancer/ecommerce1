"use strict"

const items = [
    {
        id: 1,
        name: 'Hoodie',
        price: 24.00,
        image: './assets/images/featured1.png',
        category: 'hoodies',
        quantity: 10
    },
    {
        id: 2,
        name: 'Sweatshirt',
        price: 14.00,
        image: './assets/images/featured2.png',
        category: 'sweatshirts',
        quantity: 15
    },
    {
        id: 3,
        name: 'Hoodie',
        price: 23.00,
        image: './assets/images/featured3.png',
        category: 'hoodies',
        quantity: 20
    },
    {
        id: 4,
        name: 'Sweatshirt',
        price: 13.00,
        image: './assets/images/home.png',
        category: 'sweatshirts',
        quantity: 15
    }
];

let nav = document.querySelector("nav");
let scrollHome = document.querySelector("#home");
let scrollProds = document.querySelector("#products-scroll");
let burgerMenu = document.querySelector("#burger-menu");
let cartIcon = document.querySelector(".cart-icon");
let cartOpen = document.querySelector("aside.shopping-cart");
let cartClose = document.getElementById("cart-close");
let productsContainer = document.querySelector("div.products-father");
let statesSelector = document.querySelector("div.states");
let totalPriceSelector = document.querySelector("div.items-count-price");
let iconCartNumber = document.querySelector("#cart-count");
let cartTitle = document.querySelector("div.product-list > h2");
let categoryAll = document.querySelector("#category-all");
let categoryHoodies = document.querySelector("#category-hoodies");
let categoryShirts = document.querySelector("#category-shirts");
let categorySweatshirts = document.querySelector("#category-sweatshirts");
let categorySelected;
let cart = [];

document.addEventListener("DOMContentLoaded", () =>{
    showMerch(items);
});

if (window.localStorage.getItem("cart")){
    cart = JSON.parse(window.localStorage.getItem("cart"));
}else{
    window.localStorage.setItem("cart", JSON.stringify([]));
}

window.addEventListener( "scroll", () =>{
    if( window.scrollY > 60 ){
        nav.classList.add("scroll-change")
    }else{
        nav.classList.remove("scroll-change")
    }
})

scrollHome.addEventListener( "click", () =>{
    burgerMenu.checked = false;
})

scrollProds.addEventListener( "click", () =>{
    burgerMenu.checked = false;
})

cartIcon.addEventListener( "click", () =>{
    cartOpen.classList.add("show")
    cartFiller();
})

cartClose.addEventListener( "click", () =>{
    cartOpen.classList.remove("show")
})

categoryAll.addEventListener( "click", () =>{
    showMerch(items)
})

categoryHoodies.addEventListener( "click", () =>{
    let returnFilter = items.filter( (element)=>{
        return ( element.category == "hoodies" )
    })
    showMerch(returnFilter)
})

categoryShirts.addEventListener( "click", () =>{
    let returnFilter = items.filter( (element)=>{
        return ( element.category == "shirts" )
    })
    showMerch(returnFilter)
})

categorySweatshirts.addEventListener( "click", () =>{
    let returnFilter = items.filter( (element)=>{
        return ( element.category == "sweatshirts" )
    })
    showMerch(returnFilter)
})

function showMerch(array) {
    let fragmentHTML = ""


    array.forEach( (product) =>{
        fragmentHTML += `
        <div class="product-slide">
            <img src=${product.image} alt="">
            <button data-id="${product.id}" class="product-button">
                <i class='product-img bx bx-plus'></i>
            </button>
            <div class="product-text">
                <h2 class="product-price">$${product.price.toFixed(2)}</h2>
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
            let product = array.find( item =>{ 
                return item.id === id 
            })
            addProduct(product);
        })
    })
}

function cartFiller(){
    let fragmentHTML = "";

    if (cart.length == 0){
        fragmentHTML += `
            <div class="empty-state">
                <img src="./assets/images/empty-cart.png" alt="">
                <h2>Your cart is empty</h2>
                <h5>You can add items to your cart by clicking on the '+' button on the product page.</h5>
            </div>
        `
        statesSelector.innerHTML = fragmentHTML;
    }else{
        addToCart();
    }
}

function addProduct( product ){
    let resultFind = cart.find( item => item.id === product.id );
    if ( resultFind ){
        let stock = cart[resultFind.index].quantity;
        let quantitySelected = cart[resultFind.index].quantitySelected;
        if( stock > quantitySelected ){
            cart[resultFind.index].quantitySelected++;
        }else{
            alert("Easy there, we have a limited stock :)");
        };
    }else{
        product.quantitySelected = 1;
        product.index = cart.length;

        cart.push(product);
    }

    window.localStorage.setItem ("cart", JSON.stringify(cart))

    addToCart();
}

function addToCart(){
    let fragmentHTML = ``;
    let priceFragmentHTML = ``;
    let finalQuantity = 0;
    let finalPrice = 0;
    cart.forEach( item => {
        let subtotalCount = (item.quantitySelected * item.price).toFixed(2);
        fragmentHTML += `
        <div class="filled-state">
            <div class="product-in-cart">
                <img src="${item.image}" alt="">
                <div class="product-cart-info">
                    <h2>${item.name}</h2>
                    <div class="stock-price">
                        <h3>Stock: ${item.quantity} |</h3>
                        <h4>$${item.price.toFixed(2)}</h4>
                    </div>
                    <h5>Subtotal: $${subtotalCount}</h5>
                    <div class="units-cart">
                        <i class='bx bx-minus-circle'></i>
                        <h6>${item.quantitySelected} units</h6>
                        <i class='bx bx-plus-circle'></i>
                    </div>
                </div>
            </div>
        </div>
        `
        finalPrice += item.quantitySelected * item.price;
        finalQuantity += item.quantitySelected;
        
    } )
    statesSelector.innerHTML = fragmentHTML;

    priceFragmentHTML += `
        <h3>${finalQuantity} Items</h3>
        <h3>$${(finalPrice.toFixed(2))}</h3>
    `
    iconCartNumber.textContent = finalQuantity;
    totalPriceSelector.innerHTML = priceFragmentHTML;
};