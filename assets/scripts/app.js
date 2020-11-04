class Product {
    constructor(title, image, price, description) {
        this.title = title;
        this.imageUrl = image;
        this.description = description;
        this.price = price;
    }
}

class Component {
    createRootElement(tag,cssClass, attributes) {
        const rootElement = document.createElement(tag);
        if (cssClass) {
            rootElement.className = cssClass;
        }

        if (attributes && attributes.length > 0) {
            for (const attr of attributes) {
                rootElement.setAttributets(attr.name, attr.value);
            }
        }
        return rootElement;
    }
}

class ProductItem extends Component{
    constructor(product) {
        super();
        this.product = product;
    }
    addButton() {
        App.addProductToCart(this.product);
    }
    render() {
        const prodEl = this.createRootElement('li', 'product-item');
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

class ShopingCart extends Component {
    items = [];
    set cartItems(values) {
        this.items = values;
        this.totalOutput.innerHTML = `<h2>Total: \$${this.sumPrice.toFixed(2)}</h2>`;
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
        const cartEl = this.createRootElement('section', 'cart');
        cartEl.innerHTML = `
            <h2>Total: \$${0}</h2>  
            <button>Order Now!!!</button>
        `;
        this.totalOutput = cartEl.querySelector('h2');
        const orderButton = cartEl.querySelector('button');
        orderButton.addEventListener('click', () =>{
            console.log("Ordering...");
        console.log(this.items);
        });
        return cartEl;
    }
}

class ProductList extends Component{
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
        // const prodList = document.createElement('ul');
        const prodList = this.createRootElement('ul', 'product-list');
        // prodList.className = 'product-list';

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