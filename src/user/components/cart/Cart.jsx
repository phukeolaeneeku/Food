import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import 깻잎 from "../../../img/깻잎.jpg";
import 더덕무침 from "../../../img/더덕무침.jpg";
import 멸치볶음 from "../../../img/멸치볶음.jpg";
import Header from "../header/Header";
import Menu from "../menu/Menu";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import Payment from "./Payment";

import "./cart.css";

const Cart = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [count, set_count] = useState(1);
  var totalPrice = 0; // for eatch product
  var totalQuantity = 0; // for eatch product
  var allPrice = 0; // Price for all product in the cart
  var allQuantity = 0; // Quantity for all product in the cart

  const [show_payment, set_show_payment] = useState(false);

  var user_id = null;
  if (localStorage.getItem("user")) {
    user_id = JSON.parse(window.localStorage.getItem("user")).user_id;
  }

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
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (storedCartItems) {
      setCartItems(storedCartItems);
    }
  }, []);

  const editCartItemQuantity = (productId, newQuantity) => {
    const updatedCart = cartItems.map((item) => {
      if (item.product.id === productId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const removeCartItem = (productId) => {
    const updatedCart = cartItems.filter(
      (item) => item.product.id !== productId
    );
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const CartItem = ({ item }) => {
    const handleDecrease = () => {
      const newQuantity = Math.max(1, item.quantity - 1); // Ensure quantity doesn't go below 1
      editCartItemQuantity(item.product.id, newQuantity);
    };

    const handleIncrease = () => {
      const newQuantity = item.quantity + 1;
      editCartItemQuantity(item.product.id, newQuantity);
    };

    const handleRemove = () => {
      removeCartItem(item.product.id);
    };

    return (
      // <div className="cart-item">
      //   <div>{item.product.name}</div>
      //   <div>Price: ${item.price}</div>
      //   <div>
      //     Quantity: {item.quantity}
      //     <button onClick={handleDecrease}>-</button>
      //     <button onClick={handleIncrease}>+</button>
      //     <button onClick={handleRemove}>Remove</button>
      //   </div>
      // </div>
      <div className="box_icon_order">
        <div className="btnicon_delete_order">
          <AiOutlineDelete id="btnicon_delete" onClick={handleRemove} />
        </div>
        <div className="box_item_icon">
          <div className="icon_minus_plus" onClick={handleDecrease}>
            -
          </div>
          <span>{item.quantity}</span>
          <div className="icon_minus_plus" onClick={handleIncrease}>
            +
          </div>
        </div>
      </div>
    );
  };

  const handlePay = () => {
    set_show_payment(true);
  };

  const orderitems = [
    {
      user: user_id,
      items: cartItems,
    },
  ];

  console.log("Cart items: ", cartItems);
  console.log(orderitems);

  return (
    <>
      {show_payment ? (
        <Payment orders={orderitems} order_from="cart" onPay={handlePay} />
      ) : (
        <>
          <Header />
          <form>
            <div className="box_container_cart">
              <div className="display_products">
                {cartItems.length === 0 ? (
                  <p className="no-reviews-message">제품 없음</p>
                ) : (
                  <div>
                    {cartItems.map((item) => (
                      <div className="container_cart_item" key={item.id}>
                        <div className="box_item_image">
                          <img src={item.product.image} alt="img"></img>
                          <div className="box_item_text">
                            <p>이름: {item.product.name}</p>
                            <p>
                            가격:{" "}
                            ￦{parseFloat(item.price).toLocaleString("en-US", {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                                useGrouping: true,
                              })}{" "}
                            
                            </p>
                            <p hidden>
                              {(totalPrice += item.price * item.quantity)}
                              <p hidden>{(allQuantity += item.quantity)}</p>
                            </p>
                          </div>
                        </div>
                        {/* <div className="box_icon_order">
                          <div className="btnicon_delete_order">
                            <AiOutlineDelete
                              id="btnicon_delete"
                              onClick={() => {
                                DeleteProduct(item.id);
                              }}
                            />
                          </div>

                          <div className="box_item_icon">
                            <div
                              className="icon_minus_plus"
                              onClick={() => decrementCount(item.id)}
                            >
                              -
                            </div>
                            <span>{item.quantity}</span>
                            <div
                              className="icon_minus_plus"
                              onClick={() => incrementCount(item.id)}
                            >
                              +
                            </div>
                          </div>
                        </div> */}

                        <CartItem key={item.product.id} item={item} />

                        <div className="box_item_total">
                          <h1>장바구니 합계</h1>
                          <div className="box_item_total_text">
                            <p>모든 아이템: {allQuantity}</p>
                            {/* <p>
                            <input
                              type="text"
                              value={"$ " + {}}
                              onChange={() => {}}
                            />
                          </p> */}
                          </div>
                          {/* <div className="box_item_total_text">
                          <p>Shipping: </p>
                          <p>
                            <input
                              type="text"
                              value={"$ " + shipping}
                              onChange={() => {}}
                            />
                          </p>
                        </div> */}
                          <hr />
                          <div className="box_item_total_text">
                            <h3>
                            총:{" "}
                            ￦{parseFloat(
                                (allPrice = totalPrice)
                              ).toLocaleString("en-US", {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                                useGrouping: true,
                              })}{" "}
                              
                            </h3>
                            {/* <p>
                            <input
                              type="text"
                              value={"$ " + grandTotal}
                              onChange={() => {}}
                            />
                          </p> */}
                          </div>
                          <div className="btn">
                            <Link to="/" className="Continues_btn">
                            계속 쇼핑하다
                            </Link>
                            <button
                              onClick={handlePay}
                              className="checkout_btn"
                            >
                              점검
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </form>
          <Menu />
        </>
      )}
    </>
  );
};

export default Cart;
