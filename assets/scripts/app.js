class Product {
    constructor(title, image, price, description) {
        this.title = title;
        this.imageUrl = image;
        this.price = price;
        this.description = description;
    }
}

class ProductItem {
    constructor(product) {
        this.product = product;
    }
    addToCard() {
        console.log(this.product);
        App.addToCard(this.product);
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
        const addCardButton = prodEl.querySelector('button');
        addCardButton.addEventListener('click', this.addToCard.bind(this));
        return prodEl;
    }
}


class ShopingCart {
    items = [];
    set cartItems(value) {
        this.items = value;
        this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(2)}</h2>`;

    }
    get totalAmount() {
        const sum = this.items.reduce((prevValue, curItem) => prevValue + curItem.price, 0);
        return sum;
    }
    addProduct(product) {
        const updateItems = [...this.items];
        updateItems.push(product);
        this.cartItems = updateItems;
    }
    render() {
        const cartEl = document.createElement('section');
        cartEl.innerHTML = `
           <h2>Total: \$${0}</h2>
           <button>Order Now!</button>
        `;
        cartEl.classList = 'cart';
        this.totalOutput = cartEl.querySelector('h2');
        return cartEl;
    }
}

class ProductList {
    products = [
        new Product(
            "Halo",
            "https://cdn.mos.cms.futurecdn.net/wyMSsx4wbLYEtP8qEEkToD-970-80.jpg.webp", 
            19.99, 
            "first person shooter game"
        ),
        new Product(
            "Spaceship",
            "https://media.comicbook.com/2020/10/billy-shotgun-01-1--1241370.jpeg?auto=webp&width=1200&height=675&crop=1200:675,smart",
            29.99, 
            "strategy game"
        )
    ]
    constructor() { }
    render() {
        
        const prodList = document.createElement('ul');
        prodList.className = 'product-list';
        this.products.forEach(prod => {  
            const pr = new ProductItem(prod);
            prodList.append(pr.render());
        });
        return prodList;
    }
}

class Shop {
    render() {
        const renderHook = document.getElementById('app');
        this.cart = new ShopingCart();        
        const prodShow = new ProductList();

        renderHook.append(this.cart.render());
        renderHook.append(prodShow.render());
    }
}

class App {
    static init() {
        const shop = new Shop();
        shop.render();
        this.cart = shop.cart
    }
    static addToCard(product) {
        this.cart.addProduct(product)
    }
}

App.init();