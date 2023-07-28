import { Avatar, Dropdown, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { SlBasket } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, provider } from "../firebaseConfig";
import { setShowCart, setUser } from "../slice";

function Navbar() {
  // const [user, setUser] = useState(null);
  const user = useSelector((state) => state.food.user);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.food.cart);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    category: "",
    price: 0,
    desc: "",
    image: "",
  });

  const handleUpload = async (e) => {
    setConfirmLoading(true);
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    const res = await fetch("http://localhost:5000/api/upload", {
      method: "POST",
      body: formData,
    });
    const d = await res.json();
    setData({ ...data, image: d.image });
    setConfirmLoading(false);
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    try {
      if (
        !data.name ||
        !data.category ||
        !data.price ||
        !data.desc ||
        !data.image
      ) {
        toast.error("Fill the required fields", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setConfirmLoading(false)
        return;
      }
      const res = await fetch("http://localhost:5000/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, uid: user.uid }),
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
    setConfirmLoading(false);
    setOpen(false);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const items = [
    {
      label: (
        <button
          onClick={() => {
            dispatch(setUser(null));
            auth.signOut();
          }}
        >
          Logout
        </button>
      ),
      key: "1",
      danger: true,
    },
  ];

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const u = result.user;
        dispatch(setUser({ email: u.email, uid: u.uid }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex items-center justify-between p-6 px-10">
      <div>
        <h1 className="text-3xl font-semibold">
          <Link to={"/"}>
            MUNC<span className="text-orange-400">H</span>
          </Link>
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <button className="hover:underline">
          <Link to={"/"}>Home</Link>
        </button>
        <button className="hover:underline">
          <Link to={"/explore"}>Explore</Link>
        </button>
        {!user ? (
          <button
            className="p-2 bg-orange-400 text-white tracking-wide px-4 rounded"
            onClick={handleLogin}
          >
            Login
          </button>
        ) : (
          <>
            <button
              className="p-2 bg-orange-400 text-white tracking-wide px-4 rounded"
              onClick={showModal}
            >
              Add new item
            </button>
            <Modal
              title="Add new item"
              open={open}
              onOk={handleOk}
              okType="dashed"
              okText="Add"
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
            >
              <div className="space-y-3 mt-4">
                <div>
                  <p>Name</p>
                  <Input
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                  />
                </div>
                <div>
                  <p>Category</p>
                  <Input
                    value={data.category}
                    onChange={(e) =>
                      setData({ ...data, category: e.target.value })
                    }
                  />
                </div>
                <div>
                  <p>Price</p>
                  <Input
                    type="number"
                    value={data.price}
                    onChange={(e) =>
                      setData({ ...data, price: parseInt(e.target.value) })
                    }
                  />
                </div>
                <div>
                  <p>Description</p>
                  <TextArea
                    value={data.desc}
                    onChange={(e) => setData({ ...data, desc: e.target.value })}
                  />
                </div>
                <div>
                  <p>Image</p>
                  <Input
                    type="file"
                    // value={data.image}
                    onChange={handleUpload}
                  />
                  <div className="w-full">
                    {data.image && (
                      <img
                        src={data.image}
                        className="w-full mt-4 rounded max-h-[250px] object-contain object-center"
                        alt=""
                      />
                    )}
                  </div>
                </div>
              </div>
            </Modal>
            <div className="cursor-pointer">
              <Dropdown menu={{ items }}>
                <Avatar className="bg-orange-500" size={"large"}>
                  {user.email[0]}
                </Avatar>
              </Dropdown>
            </div>
          </>
        )}
        <button
          className="relative border p-2 rounded-xl shadow"
          onClick={() => dispatch(setShowCart(true))}
        >
          <span>
            {" "}
            <SlBasket />{" "}
          </span>
          <span className="absolute top-0 -translate-y-1/2 translate-x-1/2 bg-red-500 w-5 h-5 text-white font-bold rounded-full text-sm">
            {cartItems.length}
          </span>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
