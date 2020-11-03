class Product {
    constructor(title, image, price, description) {
        this.title = title;
        this.imageUrl = image;
        this.description = description;
        this.price = price;
    }
}

class ProductItem {
    constructor(product) {
        this.product = product;
    }
    addButton() {
        App.addProductToCart(this.product);
    }
    render() {
        const prodEl = document.createElement('li');
        prodEl.className = 'product-item';
        prodEl.innerHTML = `
            <div>
                <img src="${this.product.imageUrl}" alt="${this.product.title}">
                <div class="product-item__content">
                    <h2>${this.product.title}</h2>
                    <h3>\$${this.product.price}</h3>
                    <p>${this.product.description}</p>
                    <button>Add To Cart</button>
                </div>
            </div>
        `;
        const addCreateButton = prodEl.querySelector('button');
        addCreateButton.addEventListener('click', this.addButton.bind(this)); 
        return prodEl;
    }
}

class ShopingCart {
    items = [];
    set cartItems(values) {
        this.items = values;
        this.totalOutput.innerHTML = `<h2>Total: \$${this.sumPrice}</h2>`;
    }
    get sumPrice() {
        const sum = this.items.reduce(
            (prev,curItem) =>{
                return prev + curItem.price;
            }, 
            0
        );
        return sum;
    }

    addProduct(product) {
        const updateTimes = [...this.items];
        updateTimes.push(product);
        this.cartItems = updateTimes;
    }
    
    render() {
        const cartEl = document.createElement('section');
        cartEl.className = 'cart';
        cartEl.innerHTML = `
            <h2>Total: \$${0}</h2>
            <button>Order Now!!!</button>
        `;
        this.totalOutput = cartEl.querySelector('h2');
        return cartEl;
    }
}

class ProductList {
    products = [
        new Product(
            "Halo", 
            "https://cdn.mos.cms.futurecdn.net/wyMSsx4wbLYEtP8qEEkToD-970-80.jpg.webp", 
            8.99,
            "first person shooter game"
        ),
        new Product(
            "Spaceship", 
            "https://media.comicbook.com/2020/10/billy-shotgun-01-1--1241370.jpeg?auto=webp&width=1200&height=675&crop=1200:675,smart", 
            19.99,
            "strategy game"
        )
    ]

    render() {
        const prodList = document.createElement('ul');
        prodList.className = 'product-list';

        this.products.forEach(prod =>{
            const prdEl = new ProductItem(prod);
            prodList.append(prdEl.render());
        });
        return prodList;
    }
}
class Shop {
    render() {
        this.cart = new ShopingCart();
        console.log("shop class cart>>>>", this.cart);
        const prodList = new ProductList();
        const renderHook = document.getElementById('app');
        renderHook.append(this.cart.render());
        renderHook.append(prodList.render());
    }
}
class App {
    static init() {
        const shop = new Shop();
        shop.render();
        this.cart = shop.cart;
    }

    static addProductToCart(product) {
        this.cart.addProduct(product);
    }
}

App.init();