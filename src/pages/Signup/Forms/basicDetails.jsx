import React, {useRef} from "react";
import { Flex, Col, Row} from "antd";
import { useDispatch, useSelector } from "react-redux";
import CustomLabel from "../../../components/CustomLabel";
import CustomSelectButton from "../../../components/CustomSelectButton";
import CustomInputField from "../../../components/CustomInputField";
import CustomErrorMessage from "../../../components/CustomErrorMessage";
import CustomRadioButtons from "../../../components/CustomRadioButtons";
import {
  UPDATE_REGISRATION_ERROR,
  UPDATE_REGISRATION_LOCAL_DATA,
} from "../../../saga/registration/registrationActionTypes";
import RegistrationFormWrapper from "../../../components/RegistrationFormWrapper";
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
} from "../../../constants/utilConstants";
import CustomDatePicker from "../../../components/CustomDatePicker";
import {
  hasSpecialCharacters,
  isDateGreaterThanAge,
  validateEmail,
} from "../../../utils/reusableFunctions";
import dayjs from 'dayjs'

function BasicDetails() {
  const inputRefs = useRef({});
  

  const dispatch = useDispatch();
  const generalInfo = useSelector((state) => state.common.generalInfo);
  const registerationInfo = useSelector(
    (state) => state.registration.registerationInfo
  );
  const registerationInfoErrors = useSelector(
    (state) => state.registration.registerationInfoErros
  );
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
      let errors = {
        [id]: "",
      };
      dispatch({ type: UPDATE_REGISRATION_ERROR, payload: errors });
      dispatch({ type: UPDATE_REGISRATION_LOCAL_DATA, payload: data });
    }
  };

  const handleChange = (e) => {
    let name = e?.target?.name;
    let value = e?.target?.value;
    let data = {
      [name]: value,
    };
    dispatch({ type: UPDATE_REGISRATION_LOCAL_DATA, payload: data });

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
 
    if (mandatoryFileds.includes(name) && value?.length === 0) {
      let errors = {
        [name]: "Field can not be empty.",
      };
      
      dispatch({ type: UPDATE_REGISRATION_ERROR, payload: errors });
     
    }
   
    //field validations
    else {
      let validateFileds = [first_name, last_name, mother_tongue, password];

      if (validateFileds.includes(name)) {
        if (name === password && value?.length < 6) {
          let errors = {
            [name]: "Please enter a value that is more than 6 letters long.",
          };
          dispatch({ type: UPDATE_REGISRATION_ERROR, payload: errors });
        }
        else if (value?.length < 3) {
          let errors = {
            [name]: "Please enter a value that is more than 3 letters long.",
          };
          dispatch({ type: UPDATE_REGISRATION_ERROR, payload: errors });
        } 
        else if (name !== password && hasSpecialCharacters(value)) {
          let errors = {
            [name]: "Please do not enter special characters.",
          };
          dispatch({ type: UPDATE_REGISRATION_ERROR, payload: errors });
        }
        else {
          let errors = {
            [name]: "",
          };
          dispatch({ type: UPDATE_REGISRATION_ERROR, payload: errors });
        }
      }
      else if (name === cpassword) {
        if (value !== registerationInfo?.password) {
          let errors = {
            [name]: "The password and confirm password fields must match.",
          };
          dispatch({ type: UPDATE_REGISRATION_ERROR, payload: errors });
        } 
        else {
          let errors = {
            [name]: "",
          };
          dispatch({ type: UPDATE_REGISRATION_ERROR, payload: errors });
        }
      }
      else if (name === email) {
        let isVlaid = validateEmail(value);
        if (!isVlaid) {
          let errors = {
            [name]: "Please enter a valid email address.",
          };
          dispatch({ type: UPDATE_REGISRATION_ERROR, payload: errors });
        } 
        else {
          let errors = {
            [name]: "",
          };
          dispatch({ type: UPDATE_REGISRATION_ERROR, payload: errors });
        }
      }
      else {
        let errors = {
          [name]: "",
        };
        dispatch({ type: UPDATE_REGISRATION_ERROR, payload: errors });
      }
    }

   
  };

  const handleDate = (date, dateString) => {
    let data = {
      date_of_birth: dateString,
    };
    dispatch({ type: UPDATE_REGISRATION_LOCAL_DATA, payload: data });
    
    if (dateString?.length === 0) {
      let errors = {
        date_of_birth: "Field cannot be empty.",
      };
      dispatch({ type: UPDATE_REGISRATION_ERROR, payload: errors });
    } else {
      let gender = registerationInfo?.gender;
   
      if (!gender) {
        let errors = {
          date_of_birth: "Please select a gender before entering your date of birth.",
        };
        dispatch({ type: UPDATE_REGISRATION_ERROR, payload: errors });
      } else {
        let genderVal = null;
        if (gender === "Female") {
          genderVal = 18;
        }
        if(gender === "Male"){
          genderVal = 21;
        }
  
        let isEligible = isDateGreaterThanAge(dateString, genderVal);
    
        if (!isEligible) {
          let errors = {
            date_of_birth: `The minimum age should be ${genderVal} years.`,
          };
          dispatch({ type: UPDATE_REGISRATION_ERROR, payload: errors });
        } else {
          let errors = {
            date_of_birth: "",
          };
          dispatch({ type: UPDATE_REGISRATION_ERROR, payload: errors });
        }
      }

     
    }
  };

  return (
   
      <RegistrationFormWrapper>
        <div className="marginBottomBasic">
          <h1 className="subHeadingTwo">Basic Details</h1>
        </div>
        <Flex gap="middle" vertical justify="center">
          <CustomLabel title="Profile Cretated By" />
          <CustomSelectButton
            name={profile_for}
            id={profile_for}
            
            status={registerationInfoErrors?.profile_for && "error"}
            options={generalInfo?.profileCreatedBy}
            value={registerationInfo.profile_for}
            
            onChange={handleChangeSelection}
          />
          {registerationInfoErrors?.profile_for && (
            <CustomErrorMessage
              message={registerationInfoErrors?.profile_for}
            />
          )}
          <CustomLabel title="Email" />
          <CustomInputField
            placeholder="Enter your email id"
            id={email}
           
            status={registerationInfoErrors?.email && "error"}
            name={email}
            value={registerationInfo.email}
            onChange={handleChange}
          />
          {registerationInfoErrors?.email && (
            <CustomErrorMessage message={registerationInfoErrors?.email} />
          )}
          <CustomLabel title="Password" />
          <CustomInputField
            placeholder="Enter your Password"
            id={password}
            type="password"
            status={registerationInfoErrors?.password && "error"}
            name={password}
            value={registerationInfo.password}
            onChange={handleChange}
          />
          {registerationInfoErrors?.password && (
            <CustomErrorMessage message={registerationInfoErrors?.password} />
          )}

          <CustomLabel title="Confrim password" />
          <CustomInputField
            placeholder="Confirm your Password"
            id={cpassword}
            type="password"
            status={registerationInfoErrors?.cpassword && "error"}
            name={cpassword}
            value={registerationInfo.cpassword}
            onChange={handleChange}
          />
          {registerationInfoErrors?.cpassword && (
            <CustomErrorMessage message={registerationInfoErrors?.cpassword} />
          )}

          <Row gutter={12}>
            <Col xs={{ span: 24 }} sm={{ span: 8 }}>
              <Flex gap="middle" vertical justify="center">
                <CustomLabel title="First Name" />
                <CustomInputField
                  placeholder="Enter your first name"
                  id={first_name}
                  status={registerationInfoErrors?.first_name && "error"}
                  name={first_name}
                  value={registerationInfo.first_name}
                  onChange={handleChange}
                />
                {registerationInfoErrors?.first_name && (
                  <CustomErrorMessage
                    message={registerationInfoErrors?.first_name}
                  />
                )}
              </Flex>
            </Col>

            <Col xs={{ span: 24 }} sm={{ span: 8 }}>
              <Flex
                gap="middle"
                className="paddingTopReg"
                vertical
                justify="center"
              >
                <CustomLabel title="Middle Name" />
                <CustomInputField
                  placeholder="Enter your middle name"
                  id={middle_name}
                  status={registerationInfoErrors?.middle_name && "error"}
                  name={middle_name}
                  value={registerationInfo.middle_name}
                  onChange={handleChange}
                />
                {registerationInfoErrors?.middle_name && (
                  <CustomErrorMessage
                    message={registerationInfoErrors?.middle_name}
                  />
                )}
              </Flex>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 8 }}>
              <Flex
                gap="middle"
                vertical
                className="paddingTopReg"
                justify="center"
              >
                <CustomLabel title="Last Name" />
                <CustomInputField
                  placeholder="Enter your last name"
                  id={last_name}
                  status={registerationInfoErrors?.last_name && "error"}
                  name={last_name}
                  value={registerationInfo.last_name}
                  onChange={handleChange}
                />
                {registerationInfoErrors?.last_name && (
                  <CustomErrorMessage
                    message={registerationInfoErrors?.last_name}
                  />
                )}
              </Flex>
            </Col>
          </Row>
          <CustomLabel title="Gender" />
          <CustomRadioButtons
            name={gender}
            id={gender}
            status={registerationInfoErrors?.gender && "error"}
            options={generalInfo?.genderValues}
            value={registerationInfo.gender}
            onChange={handleChange}
          />
          {registerationInfoErrors?.gender && (
            <CustomErrorMessage message={registerationInfoErrors?.gender} />
          )}
          <CustomLabel title="Marital Status" />
          <CustomSelectButton
            name={marital_status}
            id={marital_status}
            placeholder="Enter your marital status"
            status={registerationInfoErrors?.marital_status && "error"}
            options={generalInfo?.maritalStatus}
            value={registerationInfo.marital_status}
            onChange={handleChangeSelection}
          />
          {registerationInfoErrors?.marital_status && (
            <CustomErrorMessage
              message={registerationInfoErrors?.marital_status}
            />
          )}
          <CustomLabel title="Mother Tongue" />
          <CustomInputField
            placeholder="Enter your mother tongue"
            id={mother_tongue}
            status={registerationInfoErrors?.mother_tongue && "error"}
            name={mother_tongue}
            value={registerationInfo.mother_tongue}
            onChange={handleChange}
          />
          {registerationInfoErrors?.mother_tongue && (
            <CustomErrorMessage
              message={registerationInfoErrors?.mother_tongue}
            />
          )}
          <CustomLabel title="Birth Date" />
          <CustomDatePicker
            name={date_of_birth}
            placeholder="Enter your date of birth"
            id={date_of_birth}
            onChange={handleDate}
            value={dayjs(registerationInfo.date_of_birth, "YYYY/MM/DD")}
            // defaultValue={dayjs("1993/01/01", "YYYY/MM/DD")}
            status={registerationInfoErrors?.date_of_birth && "error"}
          />

          {registerationInfoErrors?.date_of_birth && (
            <CustomErrorMessage
              message={registerationInfoErrors?.date_of_birth}
            />
          )}
        </Flex>
      </RegistrationFormWrapper>
   
  );
}

export default BasicDetails;

// moonsign
// horosMatch
// genderValues
// maritalStatus
// numberOfChildren
// livingWithParentStatus
// profileCreatedBy
// height
// weight
// bloodGroup
// complexion
// physicalStatus
// PhysicalStatusDetails
// bodyType
// diet_type
// yes_or_no
// income
// education
// employer
// yes_or_no_abroad
// mothers_occupation
// fathers_occupation
// sisters_or_brothers
// family_status
// family_values
