import { useEffect, useState } from "react";
import { getOrders } from "../services/ManagerServices";

const useOrders = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await getOrders();
      setOrders(data);

    } catch {
      setError("Error fetching orders from backend. Please try again");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadOrders();
  }, []);

  return { loading, error, orders, refetch: loadOrders };
};

export default useOrders;
