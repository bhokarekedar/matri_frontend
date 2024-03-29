import React from "react";
import { Col, Row, Flex, Button, Divider } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Lottie from "lottie-react";
import couple from "../../images/animations/coupleNew.json";
import CustomLabel from "../../components/CustomLabel";
import CustomInputField from "../../components/CustomInputField";
import { loginId, password } from "../../constants/utilConstants";
import CustomLoginButton from "../../components/CustomLoginButton";

import {
  LOGIN_USER,
  UPDATE_LOGIN_ERROR,
  UPDATE_LOGIN_LOCAL_DATA,
} from "../../saga/registration/registrationActionTypes";
import CustomErrorMessage from "../../components/CustomErrorMessage";
import { useEffect } from "react";
import { isTokenExpired } from "../../utils/reusableFunctions";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginInfo = useSelector((state) => state.registration.loginInfo);
  const afterLoginErrors = useSelector(
    (state) => state.registration.afterLoginErrors
  );
  const loginInfoErros = useSelector(
    (state) => state.registration.loginInfoErros
  );

  const userDetails = useSelector(
    (state) => state.registration.userDetails
  );


  useEffect(() => {
    if(userDetails?.email){
      navigate("/profile");
    }
  }, [userDetails])


  useEffect(() => {
    const token = localStorage.getItem('token');
    let isTokenExpiredVal = isTokenExpired(token)
    if(isTokenExpiredVal){
      navigate("/login");
    }else{
      navigate("/profile");
    }
  }, [])
  
  
  

  const handleLogin = () => {
    dispatch({ type: LOGIN_USER, payload: loginInfo });
  };

  const handleChange = (e) => {
    let name = e?.target?.name;
    let value = e?.target?.value;
    let data = {
      [name]: value,
    };
    dispatch({ type: UPDATE_LOGIN_LOCAL_DATA, payload: data });
    if (value?.length === 0) {
      let errors = {
        [name]: "Field can not be empty.",
      };

      dispatch({ type: UPDATE_LOGIN_ERROR, payload: errors });
    } else {
      let errors = {
        [name]: "",
      };

      dispatch({ type: UPDATE_LOGIN_ERROR, payload: errors });
    }
  };

  return (
    <>
      <div className="registrationNavbar">
        <Flex style={{ height: "100%" }} justify="flex-start" align="center">
          logo{" "}
        </Flex>
      </div>
      <div className="registrationWrapper">
        <Row>
          <Col className="fullheightDiv" xs={{ span: 24 }} md={{ span: 12 }}>
            <div className="titleBasic">
              <h1 className="subHeadingOne">Wecome to zzz</h1>
            </div>
            <div className="subTitleBasic">
              <p className="bannerSubHeading">
                Find Your Perfect Match Today! Login to Connect with Potential
                Partners.
              </p>
            </div>
            <div className="formArea">
              <Flex
                gap="middle"
                vertical
                justify="center"
                style={{ height: "100%" }}
              >
                <CustomLabel title="Email/Phone Number" />
                <CustomInputField
                  placeholder="Enter your email id or phone number"
                  id={loginId}
                  name={loginId}
                  status={loginInfoErros?.loginId && "error"}
                  value={loginInfo.loginId}
                  onChange={handleChange}
                />
                {loginInfoErros?.loginId && (
                  <CustomErrorMessage message={loginInfoErros?.loginId} />
                )}
                <CustomLabel title="Password" />
                <CustomInputField
                  placeholder="Enter your Password"
                  id={password}
                  type="password"
                  status={loginInfoErros?.password && "error"}
                  name={password}
                  value={loginInfo.password}
                  onChange={handleChange}
                />
                {loginInfoErros?.password && (
                  <CustomErrorMessage message={loginInfoErros?.password} />
                )}

                {afterLoginErrors?.message && (
                  <CustomErrorMessage message={afterLoginErrors?.message} />
                )}
                <div style={{ marginTop: "20px" }}>
                  <CustomLoginButton
                    title="Login"
                    disabled={
                      loginInfo?.loginId?.length > 0 &&
                      loginInfo?.password?.length
                        ? false
                        : true
                    }
                    onSubmit={handleLogin}
                  />
                </div>

                <Button type="link">Forgot your password?</Button>

                <Divider plain>Or</Divider>

                <Flex justify="center">
                  <p style={{ marginTop: "8px" }}>Don't have an account?</p>
                  <Button type="link"> Sign up here</Button>
                </Flex>
              </Flex>
            </div>
          </Col>
          <Col className="fullheightDivRh" xs={{ span: 0 }} md={{ span: 12 }}>
            <Lottie animationData={couple} height={"100vh"} />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Login;
