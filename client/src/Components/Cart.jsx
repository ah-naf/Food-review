import React, { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { changeAmount, emptyCart, setShowCart } from "../slice";

function Cart() {
  const show = useSelector((state) => state.food.showCart);
  const cartItems = useSelector((state) => state.food.cart);
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const user = useSelector((state) => state.food.user);

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((val) => {
      temp += val.amount * val.price;
    });
    setTotal(temp);
  }, [cartItems]);

  const handleCheckout = async () => {
    if (!user) {
      toast.error("You Need To Sign In", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    const res = await fetch("http://localhost:5000/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart: cartItems }),
    });
    const d = await res.json();
    if (d.url) {
      window.location.href = d.url;
    }
  };

  return (
    <>
      {show && (
        <div className="fixed top-0 right-0 h-screen bg-white w-96 shadow-2xl flex flex-col">
          <div className="flex items-center justify-between w-full p-4 h-16">
            <button onClick={() => dispatch(setShowCart(false))}>
              <span>
                {" "}
                <IoIosArrowBack size={25} />{" "}
              </span>
            </button>
            <h3 className="text-2xl font-medium">Cart</h3>
            <button
              className="flex items-center text-sm bg-gray-200 p-1 rounded"
              onClick={() => {
                dispatch(emptyCart());
                localStorage.setItem("cart", "");
              }}  
            >
              clear{" "}
              <span className="ml-1">
                {" "}
                <AiOutlineCloseCircle />{" "}
              </span>
            </button>
          </div>
          {cartItems.length ? (
            <>
              <div className="overflow-y-auto flex-grow bg-gray-800 p-4 pt-8 space-y-4 rounded-t-3xl mt-2">
                {cartItems.map((val, ind) => (
                  <div
                    key={val.id}
                    className="flex items-center text-white bg-gray-700 p-2 rounded"
                  >
                    <div>
                      <img
                        src={val.image}
                        alt=""
                        className="w-24 h-24 object-contain object-center rounded"
                      />
                    </div>
                    <div className="ml-2">
                      <h3 className="text-xl font-semibold">{val.name}</h3>
                      <p className="text-sm font-light">{val.price} Taka</p>
                    </div>
                    <div className="flex items-center ml-auto gap-1">
                      <button
                        className="text-3xl"
                        onClick={() =>
                          dispatch(changeAmount({ ind, amount: -1 }))
                        }
                      >
                        -
                      </button>
                      <p>{val.amount}</p>
                      <button
                        className="text-2xl"
                        onClick={() =>
                          dispatch(changeAmount({ ind, amount: 1 }))
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-gray-800">
                <div className=" bg-gray-700 text-white p-4 py-8 rounded-t-3xl">
                  <div className="flex items-center justify-between text-2xl font-semibold">
                    <p>Total:</p>
                    <p>{total} Taka</p>
                  </div>
                  <button
                    className="mt-4 bg-orange-500 font-medium w-full py-2 rounded"
                    onClick={handleCheckout}
                  >
                    Check Out
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="grid place-content-center h-full">
              <h1 className="text-2xl font-medium">No items found in cart</h1>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Cart;
