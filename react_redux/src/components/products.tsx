import { useEffect, useState } from "react";
import { add } from "../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/productSlice";

const Products = () => {
    // const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    const { data: products, status } = useSelector((state) => state.product);
    useEffect(() => {
        // const fetchProducts = async () => {
        //     const res = await fetch("https://fakestoreapi.com/products");
        //     const data = await res.json();

        //     console.log(data);

        //     setProducts(data);
        // }

        // fetchProducts();
        dispatch(fetchProducts());
    }, [])

    const handleAdd = (product) => {
        dispatch(add(product));
    }
    console.log(status)
    if (status === "loading") {
        return <h2>Loading...</h2>;
    }
    if (status === "error") {
        return <div>Error occurred while fetching data.</div>;
    }

    return (
        <div className="productsWrapper">
            {
                products.map((product) => {
                    return <div className="card" key={product.id}>
                        <img src={product.image} />
                        <h4>{product.title}</h4>
                        <h5>{product.price}</h5>
                        <button className="btn" onClick={() => handleAdd(product)}>Add to cart</button>
                    </div>
                })
            }
        </div>
    )
}

export default Products;