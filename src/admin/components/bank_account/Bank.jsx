import React from "react";
import AdminMenu from "../adminMenu/AdminMenu";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import "./css/bank.css";
import imageicon from "../../../img/imageicon.jpg";

function Bank() {
  return (
    <>
      <AdminMenu />
      <section id="box_container_bank">
        <div className="container_bank_account">
          <form className="box_container_review">
            <div className="header_box_management">
              <Link to="/dashboard" className="box_management_iconnback">
                <IoIosArrowBack id="icons_back" />
                <p>뒤쪽에</p>
              </Link>
              <div>
                <h3>가게: Name</h3>
              </div>
              <div></div>
            </div>
            <div className="add_payment_box">
              {/* <h3>지불</h3> */}
              <div className="container_box_input">
                <div className="inputproduct_box_dplay">
                  <p>은행: </p>
                </div>
                <div className="inputproduct_box_dplay">
                  <p>계정 이름: </p>
                </div>
                <div className="inputproduct_box_dplay">
                  <p>계좌 번호: </p>
                </div>
                <div className="add_img_product_box">
                  <p>QR 코드:</p>
                  <div className="imag_qrcode_store">
                    <img src={imageicon} alt="" />
                  </div>
                </div>
              </div>
              <Link
                to="/addaccount"
                type="submit"
                className="btn_save_productUser"
              >
                추가/수정
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Bank;
