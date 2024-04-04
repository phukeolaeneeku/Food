import React from "react";
import "./order.css";
import Menu from "../menu/Menu";
import Header from "../header/Header";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Bill from "./Bill";
import axios from "axios";

const Order = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const navigate = useNavigate();

  const [order_list, set_order_list] = useState([]);
  const [display_order, set_display_order] = useState([]);
  const [show_all_order, set_show_all_order] = useState(false);
  var user_id = "";
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
    let data = JSON.stringify({
      user: 1,
      items: [],
    });

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_API + `/store/user/${user_id}/order`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        const sortedReviews = response.data.sort((a, b) => b.id - a.id);
        set_order_list(sortedReviews);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user_id]);

  // Update displayed orders when the orders or show_all_order state changes
  useEffect(() => {
    if (show_all_order) {
      set_display_order(order_list);
    } else {
      set_display_order(order_list.slice(0, 3));
    }
  }, [order_list, show_all_order]);

  const handleToggleOrders = () => {
    set_show_all_order(!show_all_order);
  };

  return (
    <>
      <Header />
      <section id="container_order_item">
        <div className="container_order_all">
          <h2>주문하다</h2>
          {display_order.length === 0 ? (
            <p className="no-reviews-message">주문 불가</p>
          ) : (
            display_order.map((item) => (
              <Link to={`/bill/${item.id}`} key={item.id}>
                <div
                  onClick={() => handleOrder(item.id)}
                  className="box_item_order"
                >
                  <div className="box_item_order_text">
                    <p>주문 아이디: {item.id}</p>
                    <p>
                    날짜 시간: {new Date(item.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>
      <Menu />
    </>
  );
};

export default Order;
