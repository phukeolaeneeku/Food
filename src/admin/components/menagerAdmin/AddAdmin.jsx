import "./css/addAmin.css";
import AdminMenu from "../adminMenu/AdminMenu";
import { MdOutlineEmail } from "react-icons/md";
import { LuUser } from "react-icons/lu";
import { FaAngleLeft } from "react-icons/fa";
import { CiImageOn } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";
import { Link } from "react-router-dom";

const AddAdmin = () => {

  return (
    <>
      <AdminMenu />
      <section id="addAmin">
        <div className="goback">
          <Link to="/admins" className="box_guopIconbAck">
            <FaAngleLeft id="box_icon_Back" />
            <p>뒤쪽에</p>
          </Link>
        </div>
        <div className="box_addAdmin">
          {/* <h3>{message && message}</h3> */}
          <form >
            <div className="addAdminForm">
              <div className="boxhead_subminandtitle">
                <h2 className="titleaddmin">관리자 추가</h2>
                <div>
                  <button type="submit" className="submit">추가하다</button>
                </div>
              </div>

              <div className="add-box">
                <label htmlFor="fname" className="titlelabel">이름:</label>
                <div className="boxiconnandinput">
                  <LuUser className="iconinput" />
                  <input
                    type="text"
                    id="fname"
                    className="input"
                    placeholder="이름..."
                  />
                </div>
              </div>
              <div className="add-box">
                <label htmlFor="lname" className="titlelabel">성:</label>
                <div className="boxiconnandinput">
                  <LuUser className="iconinput" />
                  <input
                    type="text"
                    id="lname"
                    className="input"
                    placeholder="성..."
                  />
                </div>
              </div>

              <div className="add-box">
                <label htmlFor="email" className="titlelabel">이메일:</label>
                <div className="boxiconnandinput">
                  <MdOutlineEmail className="iconinput" />
                  <input
                    type="email"
                    id="email"
                    className="input"
                    placeholder="이메일 주소..."
                  />
                </div>
              </div>
              <div className="add-box">
                <label htmlFor="phone" className="titlelabel">전화 번호:</label>
                <div className="boxiconnandinput">
                  <FiPhone className="iconinput" />
                  <input
                    type="text"
                    id="phone"
                    className="input"
                    placeholder="전화 번호..."
                  />
                </div>

              </div>
              <div className="add-box">
                <label htmlFor="adminImage" className="titlelabel">프로필 이미지:</label>
                <div className="boxiconnandinput">
                  <CiImageOn className="iconinput" />
                  <input type="file" className="input"/>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default AddAdmin;
