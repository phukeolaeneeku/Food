import React from "react";
import "./orderpage.css";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import AdminMenu from "../adminMenu/AdminMenu";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import axios from "axios";

const OrderDelivered = () => {
  const token = localStorage.getItem("token");

  const [order_list, set_order_list] = useState([]);

  const navigate = useNavigate();

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
    let data = "";

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_API + "/store/order/delivered/",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data.orders));
        set_order_list(response.data.orders);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  console.log(order_list);

  return (
    <>
      <AdminMenu />
      <section id="menager">
        <div className="container_box_orderpage">
          <div className="box_head_search">
            <h2>배달된 주문</h2>
            <form className="search">
              <div className="search-box_menageruser">
                <input
                  type="text"
                  placeholder="찾다 ..."
                  // value={searchTerm}
                  // onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit">
                  <IoSearchOutline />
                </button>
              </div>
            </form>
          </div>

          {order_list.map((order) => (
            <div key={order.id}>
              <form className="box_users_order">
                <div className="box_order_text">
                  <p>No: {order.id}</p>
                  <p>날짜: {new Date(order.created_at).toLocaleString()} </p>
                </div>
                <div className="box_container_time">
                  <p>{order.orderDate}</p>
                </div>
                <div className="container_order_icon">
                  <div className="btn_pending">{order.status}</div>
                  <Link
                    className="btn_view"
                    to={`/orderbill/${order.id}`}
                  >
                    보다
                  </Link>
                </div>
              </form>
            </div>
          ))}

          {order_list.length == 0 && (
            <div className="heade_productorder_store">
              <p>주문 불가</p>
            </div>
          )}
        </div>
      </section>
    </>
  );

};

export default OrderDelivered