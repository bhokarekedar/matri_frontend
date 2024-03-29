import React from "react";
import { Col, Row, Flex, Button } from "antd";
import Lottie from "lottie-react";
import { useDispatch, useSelector } from "react-redux";
import {
  profile_for,
  email,
  password,
  first_name,
  middle_name,
  last_name,
  gender,
  marital_status,
  mother_tongue,
  date_of_birth,
  cpassword,
  mobile_number,
  current_location,
  parent_location,
  home_phone,
  other_caste,
  religion,
  caste,
  sub_religion,
  education_details,
  school_college_university,
  profession_details,
  present_status,
  profession,
  annual_income,
  you_work_with,
  designation,
} from "../constants/utilConstants";
import couple from "../images/animations/couple.json";
import {
  CREATE_NEW_USER,
  SET_CURRENT_PAGE,
  UPDATE_REGISRATION_ERROR,
  VALIDATE_FIELDS,
} from "../saga/registration/registrationActionTypes";
import {
  hasEmptyString,
  hasSpecialCharacters,
} from "../utils/reusableFunctions";

function RegistrationFormWrapper(props) {
  const dispatch = useDispatch();
  const registerationInfo = useSelector(
    (state) => state.registration.registerationInfo
  );
  const registerationInfoErrors = useSelector(
    (state) => state.registration.registerationInfoErros
  );

  const currentPage = useSelector((state) => state.registration.currentPage);

  
 
   const handlePrev = () => {
    if (currentPage > 1) {

        dispatch({
        type: SET_CURRENT_PAGE,
        payload: currentPage - 1,
      });
    }
   }
  const handleSubmit = () => {
   
    if (currentPage === 1) {
      let mandatoryFileds = [
        profile_for,
        email,
        password,
        first_name,
        last_name,
        gender,
        marital_status,
        date_of_birth,
        cpassword,
      ];
      let validateFields = [first_name, last_name, mother_tongue, password];

      let specialValidations = [cpassword, email];
      let toValidate = {
        currentPage : currentPage,
        mandatoryFileds: mandatoryFileds,
        validateFields: validateFields,
        specialValidations: specialValidations
      }
      dispatch({ type: VALIDATE_FIELDS, payload: toValidate });
      
    }

    if (currentPage === 2) {
      let mandatoryFileds = [
        mobile_number,
        current_location,
        parent_location
    ];
    let validateFields = [
      current_location,
      parent_location
    ];

      let specialValidations = [mobile_number, home_phone];
      let toValidate = {
        currentPage : currentPage,
        mandatoryFileds: mandatoryFileds,
        validateFields: validateFields,
        specialValidations: specialValidations
      }
      dispatch({ type: VALIDATE_FIELDS, payload: toValidate });
      
    }

    if (currentPage === 3) {
      let mandatoryFileds = [
        religion, sub_religion
    ];
    let validateFields = [
     other_caste
    ];

      let specialValidations = [];
      let toValidate = {
        currentPage : currentPage,
        mandatoryFileds: mandatoryFileds,
        validateFields: validateFields,
        specialValidations: specialValidations
      }
      dispatch({ type: VALIDATE_FIELDS, payload: toValidate });
      
    }

    if (currentPage === 4) {
      let mandatoryFileds = [
        education_details,
        school_college_university,
        profession_details,
        present_status,
      ];
      let validateFields = [
        education_details,
        school_college_university,
        profession,
        profession_details,
        you_work_with,
        designation,
      ];

      let specialValidations = [];
      let toValidate = {
        currentPage : currentPage,
        mandatoryFileds: mandatoryFileds,
        validateFields: validateFields,
        specialValidations: specialValidations
      }
      dispatch({ type: VALIDATE_FIELDS, payload: toValidate });
      
    }
    // if (currentPage === 4) {

    //   dispatch({
    //     type: CREATE_NEW_USER,
    //     payload: data,
    //   });
    // } else {
    //   dispatch({
    //     type: SET_CURRENT_PAGE,
    //     payload: currentPage + 1,
    //   });
    // }
  };
  return (
    <div className="registrationWrapper">
      <Row>
        <Col className="fullheightDiv" xs={{ span: 24 }} md={{ span: 12 }}>
          <div className="titleBasic">
            <h1 className="subHeadingOne">Wecome to zzz</h1>
          </div>
          <div className="subTitleBasic">
            <p className="bannerSubHeading">
              Let's set up your profile! Simply complete the fields below, and
              we'll create a new account for you.
            </p>
          </div>
          <div className="formArea">{props.children}</div>
          <Flex className="regButtons" justify="space-between" align="center">
            <Button size="large" className="customButtonPrev" onClick={handlePrev}>
              Prev
            </Button>
            <Button
              size="large"
              className="customButtonNext"
              onClick={handleSubmit}
            >
              Next
            </Button>
          </Flex>
        </Col>
        <Col className="fullheightDivRh" xs={{ span: 0 }} md={{ span: 12 }}>
          <Lottie animationData={couple} height={"100vh"} />
        </Col>
      </Row>
    </div>
  );
}

export default RegistrationFormWrapper;
