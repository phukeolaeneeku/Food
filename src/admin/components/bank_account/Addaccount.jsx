import "./css/addaccount.css";
import AdminMenu from "../adminMenu/AdminMenu";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { CiImageOn } from "react-icons/ci";

const Addaccount = () => {
  return (
    <>
      <AdminMenu />
      <section id="box_container_bank">
        <div className="container_bank_account">
          <form className="box_container_review">
            <div className="header_box_management">
              <Link to="/bank" className="box_management_iconnback">
                <IoIosArrowBack id="icons_backs" />
                <p>뒤쪽에</p>
              </Link>
              <div>
                <h3>매장관리</h3>
              </div>
              <div></div>
            </div>
            <h3>결제 추가</h3>
            <div className="input_product_box">
              <label>은행 이름:</label>
              <input
                className="inputproduct"
                type="text"
                name="name"
                placeholder="은행 이름..."
              />
            </div>
            <div className="input_product_box">
              <label>계정 이름:</label>
              <input
                className="inputproduct"
                type="text"
                name="account_name"
                placeholder="계정 이름..."
              />
            </div>
            <div className="input_product_box">
              <label>계좌 번호:</label>
              <input
                className="inputproduct"
                type="text"
                name="account_number"
                placeholder="계좌 번호..."
              />
            </div>
            <div className="add_img_product_box">
              <label>QR 코드:</label>
              <div className="boxicon_image_input">
                <CiImageOn className="boxicon_img_iconn" />
                <input
                  type="file"
                  name="image"
                  className="input"
                  id="fileInput"
                />
              </div>
            </div>
            <div className="btn_Save">
              <button className="btn_save_product">구하다</button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Addaccount;
