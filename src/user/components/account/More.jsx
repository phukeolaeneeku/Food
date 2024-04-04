import React from "react";
import "./css/more.css";
import Header from "../header/Header";
import Menu from "../menu/Menu";
import { MdDelete } from "react-icons/md";
import { IoLogOutOutline } from "react-icons/io5";
import { IoKeySharp } from "react-icons/io5";
import { TfiCalendar } from "react-icons/tfi";
import { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import profile from "../../../img/profile.jpg";
import axios from "axios";

export const More = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showConfirmationDelete, setShowConfirmationDelete] = useState(false);
  const userID = localStorage.getItem("userID");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    return;
  };

  const handleConfirmLogout = () => {
    handleLogout();
    setShowConfirmation(false);
  };
  const handleCancelLogout = () => {
    setShowConfirmation(false);
  };

  const handleConfirmDelete = () => {
    handleDeleteAccount();
    setShowConfirmationDelete(false);
  };
  const handleCancelDelete = () => {
    setShowConfirmationDelete(false);
  };

  const user = localStorage.getItem("user");

  //Function Delete
  const handleDeleteAccount = async () => {
    try {
      const config = {
        method: "delete",
        url: `${import.meta.env.VITE_API}/user/my-page`, // Assuming your API URL is stored in environment variables
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authentication
        },
      };

      const response = await axios(config);
      if (response.status === 204) {
        // Account deleted successfully
        alert("Account deleted successfully");
        console.log("Account deleted successfully");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
        // Perform any other actions (e.g., redirect to home page)
      } else {
        console.error("Failed to delete account:", response.data.message);
        alert("Failed to delete account:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  return (
    <>
      <Header />

        <div className="MorePage">
          <div className="box_icon_back">
            <Link to="/" className="box_management_iconnback">
              <IoIosArrowBack id="icons_back" />
              <p>뒤쪽에</p>
            </Link>
            <div className="Box_haed_management">
              <h3>계정 설정</h3>
            </div>
          </div>

          <div className="profile_box">
            <div className="left_box">
              <img src={profile} alt="" />

              <div className="user_name">이름:</div>
            </div>
            <Link to="/profile" className="right_box">
              <button>보다</button>
            </Link>
          </div>

          <hr className="hr" />
          <div className="more-menu-list">
            <Link to="/terms" className="menu_icon">
              <TfiCalendar id="icon_more" />
              <p>이용약관</p>
            </Link>
            <hr className="hr" />
            <Link to="/privacy" className="menu_icon">
              <TfiCalendar id="icon_more" />
              <p>개인 정보 정책</p>
            </Link>
            <hr className="hr" />
            <Link to="/forgotpassword" className="menu_icon">
              <IoKeySharp id="icon_more" />
              <p>비밀번호 변경</p>
            </Link>
            <hr className="hr" />
            <div
              onClick={() => setShowConfirmation(true)}
              className="menu_icon"
            >
              <IoLogOutOutline id="icon_more" />
              <p>로그 아웃 </p>
            </div>
            {showConfirmation && (
              <div className="confirmation-popup">
                <p>정말로 로그아웃하시겠습니까?</p>
                <div className="btn_ok_on">
                  <button onClick={handleCancelLogout} className="btn_on">
                  아니요
                  </button>
                  <button onClick={handleConfirmLogout} className="btn_yes">
                  예
                  </button>
                </div>
              </div>
            )}

            <hr className="hr" />
            <div
              className="menu_icon"
              onClick={() => setShowConfirmationDelete(true)}
            >
              <MdDelete id="icon_more" />
              <p>계정 삭제</p>
            </div>

            {showConfirmationDelete && (
              <div className="confirmation-popup">
                <p>삭제 하시겠습니까?</p>
                <div className="btn_ok_on">
                  <button onClick={handleCancelDelete} className="btn_on">
                  아니요
                  </button>
                  <button onClick={handleConfirmDelete} className="btn_yes">
                  예
                  </button>
                </div>
              </div>
            )}

            <hr className="hr" />
          </div>
        </div>

      <Menu />
    </>
  );
};
export default More;
