const productList = {
    products : [
        {
            title: "Halo",
            imageUrl: "https://cdn.mos.cms.futurecdn.net/wyMSsx4wbLYEtP8qEEkToD-970-80.jpg.webp",
            price: 8.99, 
            description: "first person shooter game"
        }, 
        {
            title: "Spaceship",
            imageUrl: "https://media.comicbook.com/2020/10/billy-shotgun-01-1--1241370.jpeg?auto=webp&width=1200&height=675&crop=1200:675,smart",
            price: 19.99, 
            description: "strategy game"
        }
    ], 
    render() {
        const renderHook = document.getElementById('app');
        const prodList = document.createElement('ul');
        prodList.className = 'product-list';

        this.products.forEach(prod =>{
            const prodEl = document.createElement('li');
            prodEl.className = 'product-item';
            prodEl.innerHTML = `
                <div>
                    <img src="${prod.imageUrl}" alt="${prod.title}">
                    <div class="product-item__content">
                        <h2>${prod.title}</h2>
                        <h3>\$${prod.price}</h3>
                        <p>${prod.description}</p>
                        <button>Add To Cart</button>
                    </div>
                </div>
            `;
            prodList.append(prodEl);
        });
        renderHook.append(prodList);
    }
}
productList.render();