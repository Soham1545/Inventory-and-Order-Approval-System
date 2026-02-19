import { useEffect, useState } from "react";
import { getUsers } from "../services/AdminServices";

const useUsers = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState({});

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUserData(data);
    } catch {
      setError("Error fetching users from backend. Please try again");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadUsers();
  }, []);

  return { loading, error, userData, refetch: loadUsers };
};

export default useUsers;
