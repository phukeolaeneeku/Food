import Menu from "../menu/Menu";
import Header from "../header/Header";
import { useState, useEffect } from "react";
import { useLocation, Link, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import Logo from "../../../img/Logo.png";
import storename from "../../../img/storename.png";
import axios from "axios";
import ReviewProduct from "./ReviewProduct";

import "./bill.css";
const Bill = () => {
  const token = localStorage.getItem("token");
  var user_id = null;
  if (localStorage.getItem("user")) {
    user_id = JSON.parse(window.localStorage.getItem("user")).user_id;
  }
  const order_id = useParams().id;
  const [order_list, setOrderList] = useState("");
  var totalPrice = 0;

  const [showReview, setShowReview] = useState(false);

  const navigate = useNavigate();

  const [product_id, set_product_id] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);

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
      url: import.meta.env.VITE_API + `/store/order/${order_id}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .request(config)
      .then((response) => {
        setOrderList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [order_id]);

  const handleReview = (id) => {
    set_product_id(id);
    setShowReview(true);
  };

  // const handleRatingChange = (value) => {
  //   setRating(value);
  // };

  // const handleCommentChange = (event) => {
  //   setComment(event.target.value);
  // };

  // const handleSubmitReview = (event) => {
  //   event.preventDefault();
  //   let data = JSON.stringify({
  //     product: product_id,
  //     user: user_id,
  //     rating: rating,
  //     comment: comment,
  //   });

  //   let config = {
  //     method: "post",
  //     maxBodyLength: Infinity,
  //     url: import.meta.env.VITE_API + "/store/review/create",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     data: data,
  //   };

  //   axios
  //     .request(config)
  //     .then((response) => {
  //       console.log(JSON.stringify(response.data));
  //       alert("Successful review.");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });

  //   setRating(0);
  //   setComment("");
  // };

  // console.log("products", order_list.items);
  // console.log("product_id", product_id);
  // console.log("user_id", user_id);
  // console.log("rating", rating);
  // console.log("comment", comment);

  return (
    <>
      {showReview ? (
        <ReviewProduct id={product_id} />
      ) : (
        <>
          <Header></Header>
          <section id="bill">
            <Link to="/order" className="box_container_back_icons_back">
              <IoIosArrowBack id="icons_back" />
              <p>뒤쪽에</p>
            </Link>

            <div className="bill-detial newspanBox">
              <div className="logo_image_bill">
                <div className="name_store">
                  <div>
                    <img src={storename} alt="Logo" />
                  </div>
                </div>
                <div className="logo_store">
                  <Link to="/">
                    <img src={Logo} alt="Logo" />
                  </Link>
                </div>
              </div>
              <div className="guopoidHead">
                <div className="idf">
                  <p>주문 아이디: {order_list.id}</p>
                  <p>
                  주문 날짜:{" "}
                    {new Date(order_list.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
              <hr />
              <div className="billGopBox">
                <table>
                  <thead>
                    <tr>
                      {/* <div className="popular">
                    <input type="checkbox" id="popular" />
                  </div> */}
                      <th>이름</th>
                      <th>가격</th>
                      <th>수량</th>
                      {order_list.status === "Delivered" && <th>검토</th>}
                    </tr>
                  </thead>
                  <hr className="hr" />
                  {order_list.items &&
                    order_list.items.map((item, index) => (
                      <tbody key={index}>
                        <tr>
                          {/* <div className="popular">
                        <input type="checkbox" id="popular" />
                      </div> */}
                          <td>{item.product.name}</td>
                          <td>
                            {parseFloat(item.price).toLocaleString("en-US", {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                              useGrouping: true,
                            })}
                          </td>
                          <td>{item.quantity}</td>
                          {order_list.status === "Delivered" && (
                            <th>
                              <button
                                onClick={
                                  () => {handleReview(item.product.id)}
                                }
                              >
                                검토
                              </button>
                            </th>
                          )}
                          <p hidden>
                            {(totalPrice += item.price * item.quantity)}
                          </p>
                        </tr>
                      </tbody>
                    ))}
                </table>
              </div>
              <hr />
              <div className="titlePrice">
                <p>총:</p>
                <p>
                  {" "}
                  ￦{parseFloat(totalPrice).toLocaleString("en-US", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                    useGrouping: true,
                  })}{" "}
                  
                </p>
              </div>
              {/* <div className="box_btn_product">
            <div className="btn_delete_save">
              <button className="btn_delete_order">Delete selected</button>
              <button className="btn_save">Save selected</button>
            </div>
            <div className="btn_select_all">
              <button className="btn_order_select">Order selected</button>
              <button className="btn_order_all">Order all</button>
            </div>
          </div> */}
              <div className="place-on">
                <p>장소: BCEL</p>
                <p>결제방법 : 송금</p>
                <p>연락처: +85620{order_list.tel}</p>
                <p>상태: {order_list.status}</p>
                <p>
                배달: {order_list.shipping_company}, 주:{" "}
                  {order_list.province}, 구역: {order_list.district},
                  나뭇가지: {order_list.branch}
                </p>
              </div>
            </div>
            <br />
            <br />

            {/* {order_list.status === "Delivered" && (
              <div
                style={{ textAlign: "center", width: "60%", margin: "0 auto" }}
              >
                <h1>Thank you for order our products.</h1>
                <h1>Please Leave a Review</h1>
                <div style={{ marginBottom: "20px" }}>
                  {[...Array(5)].map((_, index) => (
                    <span
                      key={index}
                      style={{
                        fontSize: "30px",
                        cursor: "pointer",
                        color: index < rating ? "#FFD700" : "#DDDDDD",
                      }}
                      onClick={() => handleRatingChange(index + 1)}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <form
                  onSubmit={handleSubmitReview}
                  style={{ marginBottom: "20px" }}
                >
                  <textarea
                    rows="4"
                    cols="50"
                    value={comment}
                    onChange={handleCommentChange}
                    placeholder="Write your review here..."
                    style={{ fontSize: "20px" }}
                  />
                  <br />
                  <button type="submit" style={{ fontSize: "20px" }}>
                    Submit Review
                  </button>
                </form>
              </div>
            )} */}
          </section>
          <Menu />
        </>
      )}
    </>
  );
};

export default Bill;
