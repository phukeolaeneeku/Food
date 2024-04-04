import React, { useState } from 'react';
import "./css/profile.css";
import Header from "../header/Header";
import Menu from "../menu/Menu";
import { Link } from 'react-router-dom';
import { MdArrowBack } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";

const ProfileEdit = () => {

    const [imagePreview, setImagePreview] = useState(
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/1200px-Unknown_person.jpg"
      );
    
      const handleImageChange = (e) => {
        const file = e.target.files[0];
    
        if (file) {
          const reader = new FileReader();
    
          reader.onloadend = () => {
            setImagePreview(reader.result);
          };
    
          reader.readAsDataURL(file);
        }
    };

  return (
    <>
        <Header />
        <div className="ProfilePage_edit">
            <div className='boxgoback'>
                <Link to="/more" className="box_iconBack">
                    <MdArrowBack id='iconBack'/>
                </Link>
            </div>
            <div className='box_name'>
                <div className='box_image_profile'>
                    <label htmlFor="profileImage">
                        <img  src={imagePreview} alt="Profile Preview"/>
                        <p><FaCamera id='icon_camera'/></p>
                    </label>

                    <input 
                        type="file"
                        id="profileImage"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>
                <p>이름: Sompong</p>
            </div>
            <div className='box_user_profile'>
                <p>사용자</p><FaRegUserCircle id='iconUser'/>
            </div>
            <form className='container_form_profileedit'>
                <input 
                    type="email" 
                    placeholder="humascot@gmail.com" 
                    required 
                />
                <input 
                    type="password" 
                    placeholder=" 현재 비밀번호를 입력해주세요 " 
                    required 
                />
                <input 
                    type="password" 
                    placeholder=" 새로운 비밀번호를 입력해주세요 " 
                    required 
                />
                <input 
                    type="password" 
                    placeholder=" 새 비밀번호를 확인해 주세요. " 
                    required 
                />

                <button type="submit" className='btn_submit_profile'>확인</button>
            </form>
          
        </div>
        <Menu />
    </>
  )
}

export default ProfileEdit