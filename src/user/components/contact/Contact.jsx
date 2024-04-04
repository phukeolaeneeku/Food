import React, { useEffect, useState } from "react";
import "./Contact.css";
import Header from "../header/Header";
import Menu from "../menu/Menu";
import { useActionData, useNavigate } from "react-router-dom";
import axios from "axios";

const Contact = () => {
  // For authenticate user
  const [userDetail, setUserDetail] = useState([]);
  const userID = localStorage.getItem("userID");

  // For get user by id
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(import.meta.env.VITE_API + "/getCustomer/" + userID, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.Status === "Success") {
          setUserDetail(result.Result[0]);
          console.log(userDetail);
        }
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <>
      <Header />
      <div className="contactBox_container">
        <div className="contact_content">
          <h2>Phone: {userDetail.tel}</h2>
          <h2>Email: {userDetail.email}</h2>
          <h2>Address: {userDetail.address}</h2>
        </div>
      </div>
      <Menu />
    </>
  );
};

export default Contact;
