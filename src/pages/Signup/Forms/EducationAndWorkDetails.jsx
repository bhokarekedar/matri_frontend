import React, { useState } from "react";
import { Flex, Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  education,
  education_details,
  school_college_university,
  profession,
  profession_details,
  annual_income,
  present_status,
  you_work_with,
  designation,
} from "../../../constants/utilConstants";
import CustomLabel from "../../../components/CustomLabel";
import CustomSelectButton from "../../../components/CustomSelectButton";
import CustomInputField from "../../../components/CustomInputField";
import CustomErrorMessage from "../../../components/CustomErrorMessage";
import CustomRadioButtons from "../../../components/CustomRadioButtons";
import RegistrationFormWrapper from "../../../components/RegistrationFormWrapper";
import {
  hasSpecialCharacters,
  validateMobileNumber,
} from "../../../utils/reusableFunctions";
import {
  UPDATE_REGISRATION_ERROR,
  UPDATE_REGISRATION_LOCAL_DATA,
} from "../../../saga/registration/registrationActionTypes";

function EducationAndWorkDetails() {
  const [showSubCaste, setshowSubCaste] = useState(true);
  const dispatch = useDispatch();
  const generalInfo = useSelector((state) => state.common.generalInfo);
  const registerationInfo = useSelector(
    (state) => state.registration.registerationInfo
  );

  const registerationInfoErrors = useSelector(
    (state) => state.registration.registerationInfoErros
  );
  const handleChange = (e) => {
    let name = e?.target?.name;
    let value = e?.target?.value;
    let data = {
      [name]: value,
    };
    dispatch({ type: UPDATE_REGISRATION_LOCAL_DATA, payload: data });

    let mandatoryFileds = [
      education_details,
      school_college_university,
      profession_details,
      present_status,
    ];

    if (mandatoryFileds.includes(name) && value?.length === 0) {
      let errors = {
        [name]: "Field cannot be empty.",
      };
      dispatch({ type: UPDATE_REGISRATION_ERROR, payload: errors });
    }
    //field validations
    else {
      let validateFileds = [
        education_details,
        school_college_university,
        profession,
        profession_details,
        annual_income,
        you_work_with,
        designation,
      ];

      if (validateFileds.includes(name)) {
        if (value?.length < 3) {
          let errors = {
            [name]: "Please enter a value that is more than 3 letters long.",
          };
          dispatch({ type: UPDATE_REGISRATION_ERROR, payload: errors });
        } else if (hasSpecialCharacters(value)) {
          let errors = {
            [name]: "Please do not enter special characters.",
          };
          dispatch({ type: UPDATE_REGISRATION_ERROR, payload: errors });
        } else {
          let errors = {
            [e?.target?.name]: "",
          };
          dispatch({ type: UPDATE_REGISRATION_ERROR, payload: errors });
        }
      }
    }
  };

  const handleChangeSelection = (value, id) => {
    let data = {
      [id]: value,
    };
  
    if (value?.length === 0) {
      let errors = {
        [id]: "Field cannot be empty.",
      };
      dispatch({ type: UPDATE_REGISRATION_ERROR, payload: errors });
    } else {
      dispatch({ type: UPDATE_REGISRATION_LOCAL_DATA, payload: data });

      
      let errors = {
        [id]: "",
      };
      dispatch({ type: UPDATE_REGISRATION_ERROR, payload: errors });
    }
  };

  return (
    <RegistrationFormWrapper>
      <div className="marginBottomBasic">
        <h1 className="subHeadingTwo">Education And Work Details</h1>
      </div>
      <Flex gap="middle" vertical justify="center">
        <CustomLabel title="Education" />
        <CustomSelectButton
          name={education}
          id={education}
          status={registerationInfoErrors?.education && "error"}
          options={generalInfo?.education}
          value={registerationInfo.education}
          onChange={handleChangeSelection}
        />
        {registerationInfoErrors?.education && (
          <CustomErrorMessage message={registerationInfoErrors?.education} />
        )}

        <CustomLabel title="Education Details" />
        <CustomInputField
          placeholder="Enter your education details"
          id={education_details}
          status={registerationInfoErrors?.education_details && "error"}
          name={education_details}
          value={registerationInfo.education_details}
          onChange={handleChange}
        />
        {registerationInfoErrors?.education_details && (
          <CustomErrorMessage
            message={registerationInfoErrors?.education_details}
          />
        )}

        <CustomLabel title="College/School Name" />
        <CustomInputField
          placeholder="Enter your college/school name"
          id={school_college_university}
          status={registerationInfoErrors?.school_college_university && "error"}
          name={school_college_university}
          value={registerationInfo.school_college_university}
          onChange={handleChange}
        />
        {registerationInfoErrors?.school_college_university && (
          <CustomErrorMessage
            message={registerationInfoErrors?.school_college_university}
          />
        )}

        <CustomLabel title="Profession" />
        <CustomSelectButton
          name={profession}
          id={profession}
          status={registerationInfoErrors?.profession && "error"}
          options={generalInfo?.employer}
          value={registerationInfo.profession}
          onChange={handleChangeSelection}
        />
        {registerationInfoErrors?.profession && (
          <CustomErrorMessage message={registerationInfoErrors?.profession} />
        )}

        <CustomLabel title="Profession Details" />
        <CustomInputField
          placeholder="Enter your profession details"
          id={profession_details}
          status={registerationInfoErrors?.profession_details && "error"}
          name={profession_details}
          value={registerationInfo.profession_details}
          onChange={handleChange}
        />
        {registerationInfoErrors?.profession_details && (
          <CustomErrorMessage
            message={registerationInfoErrors?.profession_details}
          />
        )}

        <CustomLabel title="Are you presently working?" />
        <CustomRadioButtons
          name={present_status}
          id={present_status}
          status={registerationInfoErrors?.present_status && "error"}
          options={generalInfo?.yes_or_no}
          value={registerationInfo.present_status}
          onChange={handleChange}
        />
        {registerationInfoErrors?.present_status && (
          <CustomErrorMessage
            message={registerationInfoErrors?.present_status}
          />
        )}

        <CustomLabel title="Who are you currently working with?" />
        <CustomInputField
          placeholder="Currently working with"
          id={you_work_with}
          status={registerationInfoErrors?.you_work_with && "error"}
          name={you_work_with}
          value={registerationInfo.you_work_with}
          onChange={handleChange}
        />
        {registerationInfoErrors?.you_work_with && (
          <CustomErrorMessage
            message={registerationInfoErrors?.you_work_with}
          />
        )}

        <CustomLabel title="Designation" />
        <CustomInputField
          placeholder="Enter your designation"
          id={designation}
          status={registerationInfoErrors?.designation && "error"}
          name={designation}
          value={registerationInfo.designation}
          onChange={handleChange}
        />
        {registerationInfoErrors?.designation && (
          <CustomErrorMessage message={registerationInfoErrors?.designation} />
        )}

        <CustomLabel title="Annual Income" />
        <CustomSelectButton
          name={annual_income}
          id={annual_income}
          status={registerationInfoErrors?.annual_income && "error"}
          options={generalInfo?.income}
          value={registerationInfo.annual_income}
          onChange={handleChangeSelection}
        />
        {registerationInfoErrors?.annual_income && (
          <CustomErrorMessage
            message={registerationInfoErrors?.annual_income}
          />
        )}
      </Flex>
    </RegistrationFormWrapper>
  );
}

export default EducationAndWorkDetails;
