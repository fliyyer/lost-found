import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";


export const useAuth = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('auth');
    if (!token) {
      console.error("Access denied. No token found.");
      return;
    }
  
    const decoded = jwtDecode(token);
   
    if (decoded.role !== 'admin') {
      navigate('/');
      return;
    }

    const fetchItems = async () => {
    };
  
    fetchItems();
  }, []);
  
}