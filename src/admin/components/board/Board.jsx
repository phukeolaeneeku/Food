import "./board.css";
import { IoDocumentText } from "react-icons/io5";
import { BsHandbagFill } from "react-icons/bs";
import { TbShoppingCartStar } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Board = () => {
  const token = localStorage.getItem("token");

  const [pending, set_pending] = useState(0);
  const [processing, set_processing] = useState(0);
  const [shipped, set_shipped] = useState(0);
  const [delivered, set_delivered] = useState(0);

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

  // useEffect(() => {
  //   let data = "";

  //   let config = {
  //     method: "get",
  //     maxBodyLength: Infinity,
  //     url: "http://127.0.0.1:8000/store/order/pending/",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     data: data,
  //   };

  //   axios
  //     .request(config)
  //     .then((response) => {
  //       console.log(JSON.stringify(response.data));
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // });

  useEffect(() => {
    NewOrders();
    ProcessingOrders();
    ShippedOrders();
    DeliveredOrders();
  }, []);

  const NewOrders = () => {
    let data = "";

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_API + `/store/order/pending/`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data.count));
        set_pending(response.data.count);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const ProcessingOrders = () => {
    let data = "";

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_API + `/store/order/processing/`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data.count));
        set_processing(response.data.count);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const ShippedOrders = () => {
    let data = "";

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_API + `/store/order/shipped/`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data.count));
        set_shipped(response.data.count);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const DeliveredOrders = () => {
    let data = "";

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_API + `/store/order/delivered/`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data.count));
        set_delivered(response.data.count);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <section>
        <div className="boxspentainer"></div>
        <div className="board">
          <div className="manage-target">
            <div className="manage">
              <div className="containerBox_db">
                <h3>계기반</h3>
                <div className="contentBox_db">
                  <div className="menu-box one">
                    <div>
                      <IoDocumentText className="iconGad gone1" />
                      <p>보류 중</p>
                    </div>
                    <h2>{pending}</h2>
                    <Link to="/order/pending" className="txtcol">
                    더보기
                    </Link>
                  </div>
                  <div className="menu-box two">
                    <div>
                      <IoDocumentText className="iconGad gone2" />
                      <p>처리</p>
                    </div>
                    <h2>{processing}</h2>
                    <Link to="/order/processing" className="txtcol">
                      <p>더보기</p>
                    </Link>
                  </div>
                  <div className="menu-box three">
                    <div>
                      <IoDocumentText className="iconGad gone3" />
                      <p>배송됨</p>
                    </div>
                    <h2>{shipped}</h2>
                    <Link to="/order/shipped" className="txtcol">
                      <p>더보기</p>
                    </Link>
                  </div>
                  <div className="menu-box four">
                    <div>
                      <IoDocumentText className="iconGad gone4" />
                      <p>배달됨</p>
                    </div>
                    <h2>{delivered}</h2>
                    <Link to="/order/delivered" className="txtcol">
                      <p>더보기</p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Board;
