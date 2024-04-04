import "./css/user.css";
import AdminMenu from "../adminMenu/AdminMenu";
import { FaAngleLeft } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { LuUser } from "react-icons/lu";
import { FiPhone } from "react-icons/fi";

const User = () => {
  return (
    <>
      <AdminMenu />
      <section id="addAmin">
        <div className="goback">
          <Link to="/users" className="box_guopIconbAck">
            <FaAngleLeft id="box_icon_Back" />
            <p>뒤쪽에</p>
          </Link>
        </div>
        <div className="box_addAdmin">
          <form>
            <div className="addAdminForm">
              <h3>사용자 세부정보</h3>
              <div className="del-update">
                <div
                  className="del"
                >
                  <AiOutlineDelete />
                </div>
              </div>
              <div className="add-box">
                <label htmlFor="fname" className="titlelabel">사용자 ID:</label>
                <div className="boxiconnandinput">
                  <LuUser className="iconinput" />
                  <div className="input">
                    <p>a</p>
                  </div>
                </div>
              </div>
              <div className="add-box">
                <label htmlFor="fname" className="titlelabel">사용자 이름:</label>
                <div className="boxiconnandinput">
                  <LuUser className="iconinput" />
                  <div className="input">
                    <p>a</p>
                  </div>
                </div>
              </div>

              <div className="add-box">
                <label htmlFor="email" className="titlelabel">이메일:</label>
                <div className="boxiconnandinput">
                  <MdOutlineEmail className="iconinput" />
                  <div className="input">
                    <p>a</p>
                  </div>
                </div>
              </div>
              <div className="add-box">
                <label htmlFor="phone" className="titlelabel">전화 번호:</label>
                <div className="boxiconnandinput">
                  <FiPhone className="iconinput" />
                  <div className="input">
                    <p>a</p>
                  </div>
                </div>

              </div>
              <div className="add-box">
                <label htmlFor="adminImage" className="titlelabel">프로필 이미지:</label>
                <div className="BorderinputThenImage">
                  <div className="input">
                    <img
                      src="#"
                      alt="admin profile"
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>

    </>
  );
};

export default User;
