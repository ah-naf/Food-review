import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Cart from "./Components/Cart";
import Explore from "./Page/Explore";
import Food from "./Page/Food";
import Home from "./Page/Home";
import Success from "./Page/Success";
import { auth } from "./firebaseConfig";
import { setCart, setUser } from "./slice";

function App() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.food.cart);

  useEffect(() => {
    auth.onAuthStateChanged((u) => {
      if (u && u.email) {
        dispatch(setUser({ email: u.email, uid: u.uid }));
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (cartItems && cartItems.length) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  useEffect(() => {
    const temp = localStorage.getItem("cart");
    if (temp) {
      dispatch(setCart(JSON.parse(temp)));
    }
  }, []);

  return (
    <div className="relative">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Explore />} path="/explore" />
        <Route element={<Food />} path="/food/:id" />

        <Route element={<Success />} path="/success" />
      </Routes>
      <Cart />
    </div>
  );
}

export default App;
