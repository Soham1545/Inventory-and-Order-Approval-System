import { Edit, FileText, Search, Trash } from "lucide-react";
import Loader from "../components/Loader";
import useProducts from "../hooks/useProducts";
import Header from "../components/Header";
import getTextColor from "../utils/getTextColor";
import getBgColor from "../utils/getBgColor";
import ProductOverlay from "../components/ProductOverlay";
import { useState } from "react";
import { deleteProduct } from "../services/AdminServices";
import { toast } from "sonner";


const Inventory = () => {
    const {products, loading, error, refetch} = useProducts();
    const [editModal, setEditModal] = useState(false);
    const [editProduct, setEditProduct] = useState(null);
    const [search, setSearch] = useState("");

    const filteredProducts = products?.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = async (product) => {
        const confirmDelete = window.confirm(
            `Are you sure you want to delete "${product.name}"?`
        );

        if (!confirmDelete) return;

        try {
            await deleteProduct(product.sku);
            toast.success(`${product.name} deleted successfully`);
            await refetch();
        } catch (err) {
            toast.error(
            err?.response?.data?.message || "Delete failed"
            );
        }
    };

    if (loading)
        return (
            <div className="flex justify-center items-center h-full">
                <Loader/>
            </div>
        );

    if (error)
        return (
            <div className="flex justify-center items-center h-full">
                    <div className="text-red-500 font-medium">{error}</div>
            </div>
        );
    return (
        <div className="flex flex-col h-full">
            <div className="p-6 bg-white flex justify-between items-center border-b-2 border-gray-200">
                <div className="flex gap-2 items-center">
                    <div className="p-3 bg-blue-950 text-white rounded-xl"><FileText size={32}/></div>
                    <Header subtitle={"Manage Products"} title={"Inventory"}/>
                </div>
                <button 
                    className="text-center px-4 py-2 bg-black font-semibold rounded-md cursor-pointer text-white"
                    onClick={() => {
                        setEditModal(true);
                    }}
                >
                    + New Product
                </button>
            </div>
            <div className="bg-gray-50 p-8 h-full overflow-auto">
                <div className="border-2 border-gray-200 shadow rounded-xl overflow-hidden">
                    <div className="flex flex-col bg-white rounded-t-xl items-center gap-2 p-4 border-b-2 border-gray-400">
                        <div className="flex justify-between w-full">
                            <div className="flex flex-col">
                                <h1 className="font-bold text-2xl">Inventory Products</h1>
                                <div className="text-gray-500">Manage available stock items</div>
                            </div>
                            <div className="relative w-[40%]">
                                <Search
                                    size={20}
                                    className="absolute left-4 top-3 text-gray-400 pointer-events-none"
                                />
                                <input
                                    type="search"
                                    placeholder={`Search by product name...`}
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full h-12 border-2 border-gray-200 rounded-md pl-10 pr-4"
                                />
                            </div>
                        </div>
                        <div className="flex justify-between w-full">
                            
                        </div>
                    </div>
                    <table className="w-full border-collapse text-base">
                        <thead className="bg-gray-100 border-b-2 border-gray-400">
                            <tr className="text-left font-semibold">
                                <th className="px-4 py-3">SKU</th>
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">Category</th>
                                <th className="px-4 py-3">Available Quantity</th>
                                <th className="px-4 py-3">Price</th>
                                <th className="px-4 py-3">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredProducts.map((product, index) => (
                            <tr
                                key={product._id || product.sku}
                                className={`border-b border-gray-200 last:border-b-0 font-medium ${
                                index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                }`}
                            >
                                <td className="px-4 py-3">{product.sku}</td>
                                <td className="px-4 py-3">{product.name}</td>
                                <td className="px-4 py-3">
                                    <div className={`px-2 w-fit capitalize ${getTextColor(product.category)} ${getBgColor(product.category)} rounded-full`}>
                                        {product.category}
                                    </div>
                                </td>
                                <td className="px-4 py-3">
                                {product.availableQuantity}
                                </td>
                                <td className="px-4 py-3">
                                 {product.price} Rs.
                                </td>
                                <td className="px-4 py-3 flex gap-2">
                                    <button 
                                        className="cursor-pointer"
                                        onClick={() => {
                                            setEditModal(true);
                                            setEditProduct(product);
                                        }}
                                    >
                                        <Edit size={18} color="blue"/>
                                    </button>
                                    <button 
                                        className="cursor-pointer"
                                        onClick={() => handleDelete(product)}
                                    >
                                        <Trash size={18} color="red"/>
                                    </button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <ProductOverlay
                isOpen={editModal}
                product={editProduct}
                onSuccess={() => {
                    setEditModal(false);
                    setEditProduct(null);
                    refetch();
                }}
                onClose={() => {
                    setEditModal(false);
                    setEditProduct(null);
                }}
            />
        </div>
    )
}

export default Inventory;