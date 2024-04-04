import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, Link, useParams } from "react-router-dom";
import "./productBuy.css";
import Menu from "../menu/Menu";
import Header from "../header/Header";
import { IoIosArrowBack } from "react-icons/io";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import axios from "axios";
import Payment from "../cart/Payment";

function ProductDetails() {
  const token = localStorage.getItem("token");
  const storage = JSON.parse(window.localStorage.getItem("user"));
  const navigate = useNavigate();
  const product_id = useParams().id;
  const [showPayment, setShowPayment] = useState(false);
  const [product, setProduct] = useState(null);
  const [price, set_price] = useState(null);
  const [count, set_count] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [displayedReviews, setDisplayedReviews] = useState([]);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  var user_id = null;
  if (localStorage.getItem("user")) {
    user_id = JSON.parse(window.localStorage.getItem("user")).user_id;
  }

  console.log(count);
  console.log(price);
  console.log(typeof price);

  const orderitems = [
    {
      user: user_id,
      items: [
        {
          product: product,
          quantity: count,
          price: price,
        },
      ],
    },
  ];

  useEffect(() => {
    let data = JSON.stringify({
      token: token,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_API + "/user/check-token",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        if (response.data.result != "success") {
          localStorage.clear();
          navigate("/login");
          return;
        }
      })
      .catch((error) => {
        localStorage.clear();
        console.log(error);
        navigate("/login");
        return;
      });
  }, [token]);

  useEffect(() => {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_API + `/store/detail/${product_id}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .request(config)
      .then((response) => {
        setProduct(response.data);
        set_price(response.data.price);
        // set_price(parseFloat(response.data.price));
        setReviews(response.data.review_set);
        console.log(response.data.review_set);
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [product_id]);

  

  const decrease = () => {
    if (count > 1) {
      set_count(count - 1);
    }
  };

  const increase = () => {
    set_count(count + 1);
  };

  const addToCart = (product, count, price) => {
    const newItem = {
      product,
      quantity: count,
      price,
    };

    const updatedCart = [...cartItems, newItem];
    setCartItems(updatedCart);
    // Update localStorage with the new cart items
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    alert("This product has been added to cart.");
    set_count(1);
  };

  // Function to load cart items from LocalStorage
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (storedCartItems) {
      setCartItems(storedCartItems);
      console.log("My cart: ", cartItems);
    }
  }, []);

  const handlePay = () => {
    setShowPayment(true);
  };

  // Update displayed reviews when the reviews or showAllReviews state changes
  useEffect(() => {
    if (showAllReviews) {
      setDisplayedReviews(reviews);
    } else {
      setDisplayedReviews(reviews.slice(0, 3));
    }
  }, [reviews, showAllReviews]);

  console.log(reviews);

  return (
    <>
      {showPayment ? (
        <Payment orders={orderitems} order_from="buy_now" onPay={handlePay} />
      ) : (
        <>
          <Header />

          <div className="contentBody">
            <Link to="/" className="box_container_back_icons_back">
              <IoIosArrowBack id="icons_back" />
              <p>뒤쪽에</p>
            </Link>
            {product ? (
              <div key={product.id}>
                <div className="boxProduct_deteils">
                  <div className="slider">
                    <React.Fragment>
                      <section className="product_details">
                        <div className="product-page-img">
                          <div className="myslides">
                            <img src={product.image_set[0]} alt="" />
                          </div>
                        </div>
                      </section>
                    </React.Fragment>
                  </div>

                  <div className="txtContentproduct">
                    <h1 className="txt_nameP">이름: {product.name}</h1>
                    <p className="money_txt">
                    가격:{" "}￦
                      {parseFloat(product.price).toLocaleString("en-US", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                        useGrouping: true,
                      })}
                    </p>

                    <p className="txt_description">
                    검토: {product.review_set.length || 0}
                    </p>

                    <div className="hr">
                      <hr />
                    </div>

                    {/* Amount product */}
                    <div className="container_item_icon">
                      <div className="container_minus_plus" onClick={decrease}>
                        -
                      </div>
                      <span>{count}</span>
                      <div className="container_minus_plus" onClick={increase}>
                        +
                      </div>
                    </div>
                    <div className="Count_product">
                      <button className="echbtn btnBut" onClick={handlePay}>
                      지금 구매
                      </button>
                      <button
                        className="echbtn btnAdd"
                        onClick={() => addToCart(product, count, price)}
                      >
                        장바구니에 추가
                      </button>
                    </div>
                  </div>
                </div>
                {/* <div className="description_container">
              <img src={product.images} alt="" />
            </div> */}

                <div className="review-list">
                  <h2 className="review-list-title">모든 리뷰</h2>
                  <br />
                  {displayedReviews.length === 0 ? (
                    <p className="no-reviews-message">사용 가능한 리뷰가 없습니다.</p>
                  ) : (
                    <ul className="reviews">
                      {displayedReviews.map((review) => (
                        <li key={review.id} className="review-item">
                          <h3 className="rating">
                            {review.user.nickname || "null"}
                          </h3>
                          <p className="comment">{review.comment || "null"}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                  {product.review_set.length > 3 && (
                    <button
                      className="toggle-reviews-button"
                      onClick={handleToggleReviews}
                    >
                      {showAllReviews ? "Show Less" : "Show More"}
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <p>로드 중...</p>
            )}
          </div>
          <Menu />
        </>
      )}
    </>
  );
}

export default ProductDetails;
