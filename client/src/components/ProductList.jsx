function ProductList() {

    function ProductList({ }) {
        const products = [
          {
            id: 1,
            title: "Elegant Silk Dress",
            description: "Perfect for evening parties. Comes in various colors.",
            price: 120,
            imageUrl: "http://fashionstore.com/silk-dress",
            createdAt: "2024-03-14T13:55:39.000Z",
            updatedAt: "2024-03-14T19:50:53.000Z",
            ratings: [
              {
                rating: 5,
                author: "Alex Johnson",
                createdAt: "2024-03-14T22:34:57.000Z",
              },
            ],
          },
          {
            id: 2,
            title: "Casual Linen Shirt",
            description: "Light and breathable. Ideal for summer days.",
            price: 50,
            imageUrl: "http://fashionstore.com/linen-shirt",
            createdAt: "2024-03-16T22:05:38.000Z",
            updatedAt: "2024-03-16T22:05:38.000Z",
            ratings: [
              {
                rating: 4,
                author: "Samira Loo",
                createdAt: "2024-03-16T22:07:36.000Z",
              },
            ],
          },
        ];   
    }


    return (
    <ul>
        <li>
            <h3>{products[0].title}</h3>
            <p>Skrivit av: {products[0].author.use}</p>
        </li>



    </ul>
    );

}

export default ProductList;