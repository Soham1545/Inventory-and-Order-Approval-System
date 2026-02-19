import { X, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { createOrder } from "../services/SalesExecutiveServices";

const CartOverlay = ({ isOpen, onClose, cart, setCart, products, onSuccess }) => {
  if (!isOpen) return null;
  const cartItems = cart.map((item) => {
    const product = products.find((product) => product.sku === item.sku);
    return {
      ...item,
      name: product?.name,
      price: product?.price,
    };
  });
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const increaseQty = (sku) => {
    setCart((prev) =>
      prev.map((item) =>
        item.sku === sku
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (sku) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.sku === sku
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const placeOrder = async () => {
    try {
        await createOrder({products: cart});
        toast.success("Order placed successfully");
        setCart([]);
        onSuccess();
    } catch {
      toast.error("Failed to place order");
    }
  };

  const saveDraft = async () => {
    try {
        await createOrder({products:cart, status: "draft"});
        toast.success("Order saved as draft");
        setCart([]);
        onSuccess();
    } catch {
      toast.error("Failed to save draft");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-[40%] max-h-[85%] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center px-6 py-4 border-b bg-blue-950 text-white">
          <div className="flex items-center gap-3">
            <ShoppingCart />
            <h2 className="text-lg font-bold">Your Cart</h2>
          </div>

          <button onClick={onClose} className="hover:opacity-70 cursor-pointer">
            <X />
          </button>
        </div>
        <div className="flex flex-col gap-4 p-6 bg-gray-50 overflow-auto flex-1">
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-500">
              Your cart is empty
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.sku}
                className="flex justify-between items-center bg-white border border-gray-200 rounded-xl p-4"
              >
                <div>
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-sm text-gray-500">
                    ₹ {item.price}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQty(item.sku)}
                    className="px-3 bg-gray-200 rounded-md"
                  >
                    -
                  </button>

                  <div className="w-8 text-center font-semibold">
                    {item.quantity}
                  </div>

                  <button
                    onClick={() => increaseQty(item.sku)}
                    className="px-3 bg-gray-200 rounded-md"
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="border-t px-6 py-4 bg-white flex justify-between items-center">
          <div className="text-lg font-bold">
            Total: {total} INR
          </div>

          <div className="flex gap-4">
            <button
                disabled={!cart.length}
                onClick={saveDraft}
                className="px-6 py-2 rounded-lg border border-gray-200 font-semibold disabled:opacity-40 cursor-pointer"
            >
                Save Draft
            </button>
            <button
                disabled={!cart.length}
                onClick={placeOrder}
                className="px-6 py-2 rounded-lg bg-black text-white font-semibold disabled:opacity-40 cursor-pointer"
                >
                Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartOverlay;
