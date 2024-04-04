import AdminMenu from "../adminMenu/AdminMenu";
import { FaAngleLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineEdit } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { useState, useEffect } from "react";

const Admin_acount = () => {
  const [userDetail, setUserDetail] = useState([]);
  const userID = localStorage.getItem("userID");

  const navigate = useNavigate();

  // For get user by id
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(import.meta.env.VITE_API + "/getAdmin/" + userID, requestOptions)
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
      <AdminMenu />
      <section id="user">
        <div className="back">
          <Link to="/admins" className="link-back">
            <FaAngleLeft />
            Back
          </Link>
          <div>Your informations</div>
        </div>
        <div className="userInfo">
          <div className="info">
            <div>User ID: {userDetail.id}</div>
            <div>User Name: {userDetail.fname} {userDetail.lname}</div>
            <div>User Email: {userDetail.email}</div>
            <div>User Phone number: {userDetail.tel}</div>
            <div>Password: ********</div>
            <div className="del-update">
              <div className="del">
                <AiOutlineDelete />
              </div>
              <div className="update upd">
                <MdOutlineEdit />
              </div>
            </div>
          </div>
          <div className="img">
            <img src="" alt="image" />
          </div>
        </div>
      </section>

    </>
  );
};

export default Admin_acount;
