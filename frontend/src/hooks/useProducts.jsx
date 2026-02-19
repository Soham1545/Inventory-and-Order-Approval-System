import { useEffect, useState } from "react";
import { getProducts } from "../services/AdminServices";

const useProducts = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data.products);

    } catch {
      setError("Error fetching products from backend. Please try again");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadProducts();
  }, []);

  return { loading, error, products, refetch: loadProducts };
};

export default useProducts;
