import Products from "../components/products";


const Home = () => {
    return (<div>
        <h2 className="heading">Welcome !!</h2>
        <section>
            <h3>
                Products
            </h3>
            <Products />
        </section>
    </div>);
}

export default Home;