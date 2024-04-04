import React, { useState, useEffect } from "react";
import "./register.css";
import { Link, useNavigate, useLocation  } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import axios from "axios";

const Register = () => {
  const locataion = useLocation();
  const navigate = useNavigate();
  const [errorText, set_errorText] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

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
          set_errorText("No response received from server")
        } else {
          // Something happened in setting up the request that triggered an error
          set_errorText("An error occurred while sending the request")
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
      <section>
        <div className="box_forgot">
          <Link to="/login" className="box_iconBack">
            <MdArrowBack id="iconBack" />
          </Link>
          <h2>Register</h2>
          <div className="title">
            You are in the process of signing up as a user!
          </div>
          <form className="container_form_user">
            <div className="box_title">Enter basic information</div>
            <div className="container_form_user2">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={data.email}
                onChange={onChange}
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
                  Verify
                </div>
              )}
            </div>
    
            <input
              type="text"
              name="code"
              placeholder="Certification Number"
              value={data.code}
              onChange={onChange}
              required
            />
  
              <input
                type="text"
                name="nickname"
                placeholder="Nickname (maximum 10 characters)"
                value={data.nickname}
                onChange={onChange}
                required
              />
  
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={onChange}
              required
            />
            <input
              type="password2"
              name="password2"
              placeholder="Confirm Password"
              value={data.password2}
              onChange={onChange}
              required
            />
            
            <button type="submit" onClick={SignUp}>
              Register
            </button>
          </form>
          {errorText.length > 0 && <div>{errorText}</div>}
        </div>
        {registrationSuccess && (
          <div className="alert_success_sigup">
            Registration successful!
          </div>
        )}
      </section>
      
    </>
  );
};

export default Register;