import { BrushCleaning, FolderOpen, Handbag, Logs, Network, Plug2, Plus, ShoppingCart } from "lucide-react";
import Loader from "../components/Loader";
import useProducts from "../hooks/useProducts";
import Header from "../components/Header";
import { useState } from "react";
import ProductCards from "../components/ProductCards";
import CartOverlay from "../components/CartOverlay";

const baseTabs = [
	{ key: "electronics", label: "Electronics", icon: <Plug2 size={16} /> },
	{ key: "fashion", label: "Fashion", icon: <Handbag size={16} /> },
	{ key: "household", label: "Household", icon: <BrushCleaning size={16} /> }
];

const Products = () => {
    const [activeCategory, setActiveCategory] = useState("electronics");
    const [cartOpen, setCartOpen] = useState(false);
    const {loading, products, error, refetch} = useProducts();
    const [cart, setCart] = useState([]);
    const activeCategoryProducts = products?.filter(
        (product) => product.category === activeCategory
    );

    if (loading) return <div className="flex justify-center items-center h-full"><Loader/></div>;
    if (error) return (
        <div className="flex justify-center items-center h-full">
            <div className="text-red-500 font-medium">{error}</div>
        </div>);
    return(
        <div className="flex flex-col h-full">
            <div className="p-6 bg-white flex justify-between items-center border-b-2 border-gray-200">
                <div className="flex gap-2 items-center">
                    <div className="p-3 bg-blue-950 text-white rounded-xl"><Logs size={32}/></div>
                    <div>
                        <Header subtitle={"View products and place orders"} title={"Products Menu"}/>
                    </div>
                </div>
                <button 
                    onClick={() => setCartOpen(true)}
                    className="text-center px-4 py-2 relative font-semibold rounded-md cursor-pointer"
                >
                    <ShoppingCart/>
                    {cart.length > 0 && (
                        <div className="absolute -top-2 -right-1 rounded-full flex items-center justify-center bg-black text-center text-white text-xs px-3 py-1">
                            {cart.length}
                        </div>
                    )}
                </button>
            </div>
            <div className="bg-gray-50 p-8 h-full overflow-auto flex flex-col gap-6">
                <div className="flex gap-2 border-b border-gray-300 w-full">
                    {baseTabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveCategory(tab.key)}
                        className={`flex items-center gap-2 px-4 py-2 font-semibold cursor-pointer ${
                            activeCategory === tab.key
                                ? "border-b-2"
                                : "text-gray-500 hover:text-gray-600"
                        }`}
                    >
                        {tab.icon}
                        {tab.label}
                    </button>
                    ))}
                </div>
                <div className="grid grid-cols-4 gap-4">
                    {activeCategoryProducts.map((product) => (
                        <ProductCards 
                            product={product}
                            cart={cart}
                            setCart={setCart}
                        />
                    ))}
                </div>
            </div>
            <CartOverlay
                isOpen={cartOpen}
                onClose={() => setCartOpen(false)}
                cart={cart}
                setCart={setCart}
                onSuccess={() => {
                    setCartOpen(false);
                    refetch();
                }}
                products={products}
            />
        </div>
    )
}

export default Products;