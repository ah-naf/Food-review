import { Button, Card, Input, Rate, Select } from "antd";
import React, { useEffect, useState } from "react";
import { BsFillCartFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { addToCart } from "../slice";

function Explore() {
  const dispatch = useDispatch();
  const [foods, setFoods] = useState([]);
  const [filteredFood, setFilteredFood] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async function () {
      const res = await fetch("http://localhost:5000/api/food");
      const data = await res.json();
      setFoods(data);
      setFilteredFood(data);
      setCategories(
        data.map((val) => ({ value: val.category, label: val.category }))
      );
    })();
  }, []);

  const handleCartAdd = (index) => {
    dispatch(addToCart(foods[index]));
  };

  const handleChange = (e) => {
    setFilteredFood(
      foods.filter((f) =>
        f.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  return (
    <div>
      <Navbar />
      <div className="p-4 px-8">
        <div className="flex flex-col sm:flex-row mt-4 items-center gap-4 justify-center">
          <div>
            <Input
              placeholder="Enter food name"
              //   onSearch={onSearch}
              onChange={handleChange}
              className="w-[300px] lg:w-[500px]"
              size="large"
            />
          </div>
          <div className="flex items-center gap-3">
            <p className="font-medium">Category:</p>
            <Select
              defaultValue="All"
              style={{ width: 120 }}
              onChange={(e) => {
                if (e === "All") {
                  setFilteredFood(foods);
                } else
                  setFilteredFood(foods.filter((val) => val.category === e));
              }}
              options={[...categories, { value: "All", label: "All" }]}
            />
          </div>
          {/* <Button
          className="bg-orange-400 text-white border-orange-400"
          size="large"
        >
          Search
        </Button> */}
          <Button
            className="text-red-500"
            size="large"
            onClick={() => setFilteredFood(foods)}
          >
            Reset
          </Button>
        </div>
        <div className="max-w-7xl mx-auto mt-12">
          <h1 className="text-3xl font-semibold ">Food Items</h1>
          {filteredFood && filteredFood.length ? (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
              {filteredFood.map((val, ind) => (
                <Card
                  hoverable
                  key={val.id}
                  className="md:w-[350px] lg:w-[400px]"
                  cover={
                    <img
                      alt="example"
                      src={val.image}
                      className="max-h-[300px] object-contain object-center"
                    />
                  }
                >
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-2xl tracking-wide font-semibold hover:underline">
                        <Link to={`/food/${val.id}`}>{val.name}</Link>
                      </h3>
                      <div className="flex items-center">
                        <Rate
                          value={parseFloat(val.average_rating)}
                          disabled
                          allowHalf
                          className="text-orange-500"
                        />
                      </div>
                      <p className="font-semibold text-gray-600">
                        {val.category}
                      </p>
                      <p className="mt-2 line-clamp-5">{val.desc}</p>
                      <p className="mt-2 text-xl font-semibold tracking-wide">
                        {val.price} Taka
                      </p>
                    </div>
                    <div>
                      <button onClick={() => handleCartAdd(ind)}>
                        {" "}
                        <BsFillCartFill
                          size={25}
                          className="hover:text-orange-500"
                        />{" "}
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid place-content-center w-full">
              <img src="flame.gif" alt="" />
              <h1 className="text-3xl text-center font-medium mt-2">
                No items found.
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Explore;
