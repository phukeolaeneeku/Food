import React, { useEffect, useState } from "react";
import Banner from "../header/Banner";
import ProductHome from "../products/ProductHome";
import Menu from "../menu/Menu";
import "./home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(import.meta.env.VITE_API + "/authen", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.Status === "Success") {
          if (result.decoded.urole !== "Customer") {
            localStorage.removeItem("token");
            localStorage.removeItem("userID");
            navigate("/");
            return;
          }
        } else {
          localStorage.removeItem("userID");
          navigate("/");
          return;
        }
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <div className="containerHomeBox">
      <Banner />
      <ProductHome />
      <Menu />
    </div>
  );
};

export default Home;
