import React, { useState, useEffect } from "react";
import "./orderBill.css";
import AdminMenu from "../adminMenu/AdminMenu";
import { useLocation } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const OrderBill = () => {
  const token = localStorage.getItem("token");
  const order_id = useParams().bill_id;
  const [order_list, setOrderList] = useState("");
  const goBack = () => {
    window.history.back();
  };

  console.log(order_id);
  console.log(order_list);

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
          navigate("/loginuser");
          return;
        }
      })
      .catch((error) => {
        localStorage.clear();
        console.log(error);
        navigate("/loginuser");
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

  const ConfirmOrder = (e) => {
    e.preventDefault();

    console.log("Ok")
    console.log(order_list.status)

    let data = "";
    if (order_list.status == "Pending") {
      data = JSON.stringify({
        status: "Processing",
      });
    } else if (order_list.status == "Processing") {
      data = JSON.stringify({
        status: "Shipped",
      });
    } else if (order_list.status == "Shipped") {
      data = JSON.stringify({
        status: "Delivered",
      });
    } else if (order_list.status == "Delivered") {
      data = JSON.stringify({
        status: "Delivered",
      });
    } else {
      data = JSON.stringify({
        status: "Delivered",
      });
    }

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_API + `/store/order/update/${order_id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        // alert(JSON.stringify(response.data));
        // if (response.data.message == "success") {
        //   // alert(response.data.message);
          
        // }
        if (order_list.status == "Pending") {
          alert("This order has been received.");
          navigate("/order/pending");
        } else if (order_list.status == "Processing") {
          alert("This order has been processed");
          navigate("/order/processing");
        } else if (order_list.status == "Shipped") {
          alert("This order has been shipped.");
          navigate("/order/shipped");
        } else if (order_list.status == "Delivered") {
          alert("This order has been delivered.");
          navigate("/order/delivered");
        } else {
          alert("This order has been delivered.");
          navigate("/order/delivered");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <AdminMenu />
      <section id="abill">
        <div className="abill-detial" key={order_list.id}>
          <div className="box_icon_backOrderbill">
            <Link to={goBack} className="box_link_orderpage">
              <FaAngleLeft id="box_icon_Back" />
              <p>뒤쪽에</p>
            </Link>
            <h2>주문하다</h2>
            <div></div>
          </div>
          <div className="aguopoidHead">
            <div className="aidf">
              <p>주문 아이디: {order_list.id}</p>
              <p>날짜: {new Date(order_list.created_at).toLocaleString()}</p>
            </div>
          </div>
          <hr />
          <div className="abillGopBox">
            <table>
              <thead>
                <tr>
                  <th>상품명</th>
                  <th>가격</th>
                  <th>양</th>
                </tr>
              </thead>
              {order_list.items &&
                order_list.items.map((item) => (
                  <tbody key={item.id}>
                    <tr>
                      <td>{item.product.name}</td>
                      <td>
                        {parseFloat(item.price).toLocaleString("en-US", {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                          useGrouping: true,
                        })}
                      </td>
                      <td>{item.quantity}</td>
                    </tr>
                  </tbody>
                ))}
            </table>
          </div>
          <hr />
          <div className="atitlePrice">
            <h3>총:</h3>
            {/* <p>${order.totalPrice}</p> */}
          </div>
          <div className="aplace-on">
            <p>결제방법 : 송금</p>
            <p>계정 이름: {order_list.account_name}</p>
            <p>배송 : 회사명</p>
            <p>상태: {order_list.status}</p>
            <p>
            배달: {order_list.shipping_company}, 주:{" "}
              {order_list.province}, 구역: {order_list.district}, 나뭇가지:{" "}
              {order_list.branch}
            </p>
            <form>
              {order_list.status !== "Delivered" && (
                <button type="submit" onClick={ConfirmOrder}>
                  확인하다
                </button>
              )}
            </form>
            {/* <p>Delivery: {order_list.delivery}</p> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderBill;
