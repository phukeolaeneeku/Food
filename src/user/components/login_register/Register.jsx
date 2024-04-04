import React, { useState, useEffect } from "react";
import "./register.css";
import { Link, useNavigate, useLocation  } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import axios from "axios";
import Header from "../header/Header";

const Signup = () => {
  const locataion = useLocation();
  const navigate = useNavigate();
  const [errorText, set_errorText] = useState("");

  const [timer, set_timer] = useState({
    minute: 0,
    second: 0,
  });
  const { minute, second } = timer;
  const [data, set_data] = useState({
    email: "",
    code: "",
    nickname: "",
    password: "",
    password2: "",
    is_client: true,
    is_staff: false,
    is_seller: false,
    is_superuser: false,
  });

  function onChange(e) {
    const { name, value } = e.target;
    set_data({
      ...data,
      [name]: value,
    });
  }

  const SignUp = () => {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: import.meta.env.VITE_API + "/user/signup",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        navigate("/login");
        return;
      })
      .catch((error) => {
        let errorMessage;
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          set_errorText(error.response.data.message)
        } else if (error.request) {
          // The request was made but no response was received
          set_errorText("서버로부터 응답을 받지 못했습니다.")
        } else {
          // Something happened in setting up the request that triggered an error
          set_errorText("요청을 보내는 동안 오류가 발생했습니다.")
        }
      });
    console.log(response);
  };

  useEffect(() => {
    const countdown = setInterval(() => {
      if (second > 0) {
        set_timer({
          ...timer,
          second: second - 1,
        });
      }
      if (second === 0) {
        if (minute === 0) {
          clearInterval(countdown);
        } else {
          set_timer({
            minute: minute - 1,
            second: 59,
          });
        }
      }
    }, 1000);
    return () => {
      clearInterval(countdown);
    };
  }, [timer]);

  return (
    <>
    <Header/>
      <div className="box_forgot">

        <h2>사용자 등록</h2>

        <div className="title">
        사용자 등록을 진행 중입니다!
        </div>
        <form className="container_form_user">
          <div className="box_title">기본정보를 입력하세요</div>
          <div className="container_form_user2">
            <input
              type="email"
              name="email"
              onChange={onChange}
              value={data.email}
              placeholder="이메일"
              required
            />
            {minute > 0 || second > 0 ? (
              <div id="email_send_btn" className="verification">
                {minute < 10 ? `0${minute}` : minute}:
                {second < 10 ? `0${second}` : second}
              </div>
            ) : (
              <div
                onClick={() => {
                  if (data.email.length > 0) {
                    set_timer({ minute: 3, second: 0 });
                    let config = {
                      method: "post",
                      maxBodyLength: Infinity,
                      url: import.meta.env.VITE_API + "/user/send-email",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      data: data,
                    };

                    axios
                      .request(config)
                      .then((response) => {
                        console.log(JSON.stringify(response.data));
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  } else {
                    set_errorText("Please enter your e-mail.");
                  }
                }}
                id="email_send_btn"
                className="verification"
              >
                확인하다
              </div>
            )}
          </div>
          <input
            type="text"
            name="code"
            onChange={onChange}
            value={data.code}
            placeholder="인증번호"
            required
          />
          <input
            type="text"
            name="nickname"
            onChange={onChange}
            value={data.nickname}
            placeholder="닉네임(최대 10자)"
            required
          />

          <input
            type="password"
            name="password"
            onChange={onChange}
            value={data.password}
            placeholder="비밀번호"
            required
          />
          <input
            type="password"
            name="password2"
            onChange={onChange}
            value={data.password2}
            placeholder="비밀번호 확인"
            required
          />
          <button type="button" onClick={SignUp}>
          등록하다
          </button>
        </form>
        {errorText.length > 0 && <div>{errorText}</div>}
      </div>
    </>
  );
};

export default Signup;
