import React, { useState } from 'react'
import "./forgotpassword.css"
import { Link } from 'react-router-dom';
import { MdArrowBack } from "react-icons/md";
import Header from "../header/Header";
  
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [forgotpasswordSuccess, setForgotpasswordSuccess] = useState(false);

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (
      email.trim() === "" ||
      code.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      alert("이메일, 코드, 비밀번호를 입력해주세요.");
      return;
    }
    // Assuming registration is successful, set registrationSuccess to true
    setForgotpasswordSuccess(true);
    // Proceed with registration logic
    console.log("Email:", email);
    console.log("Code:", code);
    console.log("Password:", password);
  };

  return (
    <>
    <Header/>
      <section>
        <div className="box_forgot">
          
          <h2>비밀번호 찾기</h2>
          <div className="title">이메일 인증 후 비밀번호를 변경해주세요!</div>
          <form className='container_form_forgot' onSubmit={handleForgotPassword}>
            <div className='box_infor'>기본정보를 입력하세요</div>
            <div className='container_form_forgot2'>
              <input 
                type="email"
                name="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className='verification'>
              확인하다
              </div>
            </div>

            <input 
              type="text"
              name="code"
              placeholder="확인 번호"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
            <input 
              type="password"
              name="password"
              placeholder="새 비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input 
              type="password2"
              name="password2"
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button type="submit" >
            확인
            </button>
          </form>
        </div>
        {forgotpasswordSuccess && (
          <div className="alert_success_find">
            비밀번호 변경 성공!
          </div>
        )}
      </section>
      
    </>
  )
}

export default ForgotPassword