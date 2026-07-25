import { useEffect } from "react";
import "./App.css";
import { useAuthStore } from "./store/authStore";
import { useNavigate } from "react-router";
function App() {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <h1 class="text-3xl font-bold underline">Hello world!</h1>
    </>
  );
}

export default App;
