import { Rate } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../Components/Navbar";
import { addToCart } from "../slice";

function Food() {
  const user = useSelector((state) => state.food.user);
  const dispatch = useDispatch();
  const params = useParams();
  const [averageRating, setAverageRating] = useState(0);
  const [food, setFood] = useState();
  const [ratingData, setRatingData] = useState({
    rating: 3,
    comment: "",
  });
  const [reviews, setReviews] = useState([]);
  const [render, setRender] = useState(true);

  useEffect(() => {
    (async function () {
      let res = await fetch(`http://localhost:5000/api/food/${params.id}`);
      let data = await res.json();
      setFood(data);
      res = await fetch(`http://localhost:5000/api/review/${params.id}`);
      data = await res.json();
      setReviews(data);
      let temp = 0;
      data.forEach((val) => (temp += val.rating));
      temp /= data.length;
      setAverageRating(temp);
    })();
  }, [render]);

  const handleReviewSubmit = async () => {
    try {
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
      const res = await fetch(`http://localhost:5000/api/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...ratingData,
          username: user.email,
          food_id: params.id,
          uid: user.uid,
        }),
      });
      const data = await res.json();
      console.log(data);
      setRender(!render);
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div>
      <Navbar />
      {food && (
        <div className="p-4 px-8">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-8 mt-8">
            <div className="flex items-center justify-center">
              <img
                src={food.image}
                alt=""
                className="max-h-[400px] object-contain object-center"
              />
            </div>
            <div className="md:text-right">
              <h1 className="text-3xl font-semibold mb-2">{food.name}</h1>
              <p className="text-lg">
                Price:{" "}
                <span className="font-medium text-xl">{food.price} Taka</span>
              </p>
              <div className="flex items-center gap-2 md:justify-end">
                <p>Review:</p>
                <div className="flex items-center">
                  <Rate
                    disabled
                    allowHalf
                    value={averageRating}
                    className="text-orange-500"
                  />
                  <p className="ml-1">({reviews.length})</p>
                </div>
              </div>
              <p className="mt-4 text-sm">{food.desc}</p>
              <button
                className="mt-4 bg-orange-500 text-white p-2 px-4 rounded"
                onClick={() => dispatch(addToCart(food))}
              >
                Add to cart
              </button>
            </div>
          </div>
          <div className="max-w-4xl mx-auto mt-12">
            <div>
              <h1 className="text-3xl font-semibold text-gray-700">
                Leave a review
              </h1>
              <div className="mt-4">
                <div className="flex items-center gap-4 mb-2">
                  <p>Stars: </p>
                  <Rate
                    value={ratingData.rating}
                    onChange={(e) =>
                      setRatingData({ ...ratingData, rating: e })
                    }
                    className="text-orange-500"
                  />
                </div>
                <TextArea
                  rows={4}
                  value={ratingData.comment}
                  onChange={(e) =>
                    setRatingData({ ...ratingData, comment: e.target.value })
                  }
                  placeholder="Leave a review"
                  style={{ width: "500px" }}
                />
                <button
                  className="block border-2 mt-4 rounded border-orange-400 p-1 px-4 font-medium hover:bg-orange-400 hover:text-white"
                  onClick={handleReviewSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
          <div className="max-w-4xl mx-auto my-8">
            <h1 className="text-2xl text-gray-700 font-medium mb-4">
              Reviews ({reviews.length})
            </h1>
            <div className="space-y-4">
              {reviews.map((val) => (
                <div key={val} className="border-b pb-4">
                  <h1 className="text-sm text-gray-900">
                    Posted By:{" "}
                    <span className="text-lg font-medium text-black">
                      {val.username}
                    </span>
                  </h1>
                  <div className="flex mt-1">
                    <Rate
                      value={val.rating}
                      disabled
                      className="text-orange-500"
                    />
                  </div>
                  <p className="max-w-2xl mt-1">{val.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Food;
