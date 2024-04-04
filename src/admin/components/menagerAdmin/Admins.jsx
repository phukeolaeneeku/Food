import React, { useState, useEffect } from "react";
import "./css/admins.css";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import AdminMenu from "../adminMenu/AdminMenu";
import { Link, useNavigate } from "react-router-dom";
import { BiPlus } from "react-icons/bi";
import user from "../../../img/user.png";

const Admins = () => {
  return (
    <>
      <section id="menager">
        <AdminMenu />
        <div className="container_body_adminuser">
          <div className="container_box_users">
            <div className="box_users">
              <div className="box_add_admin">
                <Link to="/addadmin" className="btn_addadmin">
                  <BiPlus id="icon_add_admin" />
                  관리자 추가
                </Link>
              </div>

              <form className="search">
                <div className="search-box_menageruser">
                  <input type="text" placeholder="찾다 ..." />
                  <button type="submit">
                    <IoSearchOutline />
                  </button>
                </div>
              </form>
            </div>

            <div className="box_users_user">
              <div className="box_dp_txtandiamge">
                <div className="box_user_img">
                  <img src={user} alt="" />
                </div>
                <div className="box_user_text">
                  <p>이름</p>
                  <p>이메일</p>
                </div>
              </div>
              <div className='btn_box_Cont'>
                <button className='delete_storeDetails'>삭제</button>
                <Link to="#" className='viewMore_storeDetails'>편집하다</Link>
              </div>
            </div>

            <div className="box_container_next_product">
              <button className="box_prev_left_product" >
                <AiOutlineLeft id="box_icon_left_right_product" />
                <p>이전</p>
              </button>

              <div className="box_num_product">
                <div >
                  <div className="num_admin_product">
                    <p>1</p>
                  </div>
                </div>
              </div>

              <button className="box_prev_right_product">
                <p>다음</p>
                <AiOutlineRight id="box_icon_left_right_product" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Admins;
