const ProductCards = ({product, setCart, cart}) => {
    const available = product.availableQuantity>0;
    const cartItem = cart.find((item) => item.sku === product.sku);
    const qty = cartItem?.quantity || 0;

    const addToCart = () => {
        setCart((prev) => [...prev, { sku: product.sku, quantity: 1 }]);
    };

    const increaseQty = () => {
        setCart((prev) =>
        prev.map((item) =>
            item.sku === product.sku
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
        );
    };

    const decreaseQty = () => {
        setCart((prev) => {
        const updated = prev
            .map((item) =>
            item.sku === product.sku
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0);

        return updated;
        });
    };
    return (
        <div className="border rounded-lg border-gray-200 shadow-md h-fit p-4 flex flex-col gap-4">
            <div className="flex justify-between">
                <div className="font-semibold">{product.name}</div>
                <div 
                    className={`${available ? "bg-green-200 text-green-700" : "bg-red-100 text-red-700"} flex gap-1 px-2 rounded-full text-sm items-center font-medium`}
                >
                    <span className={`${available ? "bg-green-700" : "bg-red-700"} p-1 rounded-full`}></span>
                    <span>{available ? "In stock" : "Out of stock"}</span>
                </div>
            </div>
            <div className="flex justify-between">
                <div className="text-sm text-gray-500">SKU:</div>
                <div className="text-sm font-semibold text-gray-700">{product.sku}</div>
            </div>
            <div className="flex justify-between">
                <div className="text-sm text-gray-500">Price:</div>
                <div className="text-sm font-semibold text-gray-700">{product.price} INR</div>
            </div>
            <div className="pt-3 border-t border-gray-300 flex justify-end">
                    {!qty ? (
                    <button
                        disabled={!available}
                        onClick={addToCart}
                        className="font-semibold text-blue-500 hover:underline hover:text-blue-600 cursor-pointer disabled:text-gray-400"
                    >
                        + Add To Cart
                    </button>
                    ) : (
                    <div className="flex items-center">
                        <button
                            onClick={decreaseQty}
                            className="px-3 bg-gray-200 cursor-pointer hover:bg-gray-300 font-semibold rounded-md"
                        >
                            -
                        </button>
                        <div className="text-center font-semibold w-10">{qty}</div>
                        <button
                            onClick={increaseQty}
                            className="px-3 rounded-md cursor-pointer bg-gray-200 hover:bg-gray-300 font-semibold"
                        >
                            +
                        </button>
                    </div>
                    )}
                </div>
        </div>
    )
}

export default ProductCards;