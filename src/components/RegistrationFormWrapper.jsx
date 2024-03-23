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

  let data = {
    username: "fyfyf4555" || null,
    profile_for: registerationInfo?.profile_for || null,
    email: registerationInfo?.email || null,
    password: registerationInfo?.password || null,
    cpassword: registerationInfo?.cpassword || null,
    first_name: registerationInfo?.first_name || null,
    middle_name: registerationInfo?.middle_name || null,
    last_name: registerationInfo?.last_name || null,
    gender: registerationInfo?.gender || null,
    marital_status: registerationInfo?.marital_status || null,
    mother_tongue: registerationInfo?.mother_tongue || null,
    date_of_birth: registerationInfo?.date_of_birth || null,
    religion: registerationInfo?.religion || null,
    sub_religion: registerationInfo?.sub_religion || null,
    caste: registerationInfo?.caste || null,
    other_caste: registerationInfo?.other_caste || null,
    contact_email: registerationInfo?.email || null,
    mobile_number: registerationInfo?.mobile_number || null,
    home_phone: registerationInfo?.home_phone || null,
    current_location: registerationInfo?.current_location || null,
    parent_location: registerationInfo?.parent_location || null,
    education: registerationInfo?.education || null,
    education_details: registerationInfo?.education_details || null,
    school_college_university:
      registerationInfo?.school_college_university || null,
    profession: registerationInfo?.profession || null,
    profession_details: registerationInfo?.profession_details || null,
    annual_income: registerationInfo?.annual_income || null,
    present_status: registerationInfo?.present_status || null,
    you_work_with: registerationInfo?.you_work_with || null,
    designation: registerationInfo?.designation || null,
  };

  function validateMandatoryFileds(mandatoryFields, validateFields) {
   for (let i = 0; i < mandatoryFields.length; i++) {
    const item = mandatoryFields[i];
    if (data[item] === null) {
      
      let errors = {
        [item]: "Field cannot be empty.",
      };
      dispatch({ type: UPDATE_REGISRATION_ERROR, payload: errors });
    } 
   }

  };
  function validateFileds(validateFields) {
    let manderrors = 0;
    for (let j = 0; j < validateFields.length; j++) {
      const field = validateFields[j];
      if (field === password && data[field]?.length < 7) {
        manderrors = manderrors+ 1;
        let errors = {
          [field]: "Please enter a value that is more than 6 letters long.",
        };
        dispatch({ type: UPDATE_REGISRATION_ERROR, payload: errors });
       
      } else if (data[field]?.length < 3) {
        manderrors = manderrors+ 1;
        let errors = {
          [field]: "Please enter a value that is more than 3 letters long.",
        };
        dispatch({ type: UPDATE_REGISRATION_ERROR, payload: errors });
       
      } else if (field !== password && hasSpecialCharacters(data[field])) {
        manderrors = manderrors+ 1;
        let errors = {
          [field]: "Please do not enter special characters.",
        };
        dispatch({ type: UPDATE_REGISRATION_ERROR, payload: errors });
      } 
      else{
        manderrors = manderrors - 1;
      }
    }
 
    return manderrors;
   
    
   };
 

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
      let toValidate = {
        currentPage : currentPage,
        mandatoryFileds: mandatoryFileds,
        validateFields: validateFields
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
        <Col className="fullheightDiv" xs={{ span: 24 }} sm={{ span: 12 }}>
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
        <Col className="fullheightDivRh" xs={{ span: 0 }} sm={{ span: 12 }}>
          <Lottie animationData={couple} height={"100vh"} />
        </Col>
      </Row>
    </div>
  );
}

export default RegistrationFormWrapper;
