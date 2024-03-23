import React from 'react'
import { Flex} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
    mobile_number,
    home_phone,
    current_location,
    parent_location} from "../../../constants/utilConstants";
import CustomLabel from "../../../components/CustomLabel";
import CustomInputField from "../../../components/CustomInputField";
import CustomErrorMessage from "../../../components/CustomErrorMessage";
import RegistrationFormWrapper from '../../../components/RegistrationFormWrapper';
import { UPDATE_REGISRATION_ERROR, UPDATE_REGISRATION_LOCAL_DATA } from '../../../saga/registration/registrationActionTypes';
import { hasSpecialCharacters, validateMobileNumber } from '../../../utils/reusableFunctions';

function ContactDetails() {
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
            mobile_number,
            current_location,
            parent_location
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
            mobile_number,
            home_phone,
            current_location,
            parent_location
          ];
    
          if (validateFileds.includes(name)) {
            if (value?.length < 3) {
                let errors = {
                  [name]: "Please enter a value that is more than 3 letters long.",
                };
                dispatch({ type: UPDATE_REGISRATION_ERROR, payload: errors });
              } 
            else if ((name === mobile_number || name === home_phone) && !validateMobileNumber(value)) {
              let errors = {
                [name]: "Please enter a valid mobile number.",
              };
              dispatch({ type: UPDATE_REGISRATION_ERROR, payload: errors });
            }

            else if (!(name === mobile_number || name === home_phone) && hasSpecialCharacters(value)) {
              let errors = {
                [name]: "Please do not enter special characters.",
              };
              dispatch({ type: UPDATE_REGISRATION_ERROR, payload: errors });
            } 
            else {
              let errors = {
                [e?.target?.name]: "",
              };
              dispatch({ type: UPDATE_REGISRATION_ERROR, payload: errors });
            }
          }
         
        }
      };
    
   
  return (
    <RegistrationFormWrapper>
    <div className="marginBottomBasic">
      <h1 className="subHeadingTwo">Contact Details</h1>
    </div>
    <Flex gap="middle" vertical justify="center">
      <CustomLabel title="Mobile Number" />
      <CustomInputField
            placeholder="Enter your mobile number"
            id={mobile_number}
            status={registerationInfoErrors?.mobile_number && "error"}
            name={mobile_number}
            value={registerationInfo.mobile_number}
            onChange={handleChange}
          />
          {registerationInfoErrors?.mobile_number && (
            <CustomErrorMessage message={registerationInfoErrors?.mobile_number} />
          )}
      <CustomLabel title="Home mobile phone" />
      <CustomInputField
            placeholder="Enter your home mobile phone"
            id={home_phone}
            status={registerationInfoErrors?.home_phone && "error"}
            name={home_phone}
            value={registerationInfo.home_phone}
            onChange={handleChange}
          />
          {registerationInfoErrors?.home_phone && (
            <CustomErrorMessage message={registerationInfoErrors?.home_phone} />
          )}
     

     <CustomLabel title="Current Location" />
      <CustomInputField
            placeholder="Enter your current location"
            id={current_location}
            status={registerationInfoErrors?.current_location && "error"}
            name={current_location}
            value={registerationInfo.current_location}
            onChange={handleChange}
          />
          {registerationInfoErrors?.current_location && (
            <CustomErrorMessage message={registerationInfoErrors?.current_location} />
          )}

<CustomLabel title="Home Location" />
      <CustomInputField
            placeholder="Enter your home location"
            id={parent_location}
            status={registerationInfoErrors?.parent_location && "error"}
            name={parent_location}
            value={registerationInfo.parent_location}
            onChange={handleChange}
          />
          {registerationInfoErrors?.parent_location && (
            <CustomErrorMessage message={registerationInfoErrors?.parent_location} />
          )}
    </Flex>
  </RegistrationFormWrapper>
  )
}

export default ContactDetails

