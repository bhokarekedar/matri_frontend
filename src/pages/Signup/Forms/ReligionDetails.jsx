import React, { useEffect, useState } from "react";
import { Flex, Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  religion,
  sub_religion,
  caste,
  other_caste,
} from "../../../constants/utilConstants";
import CustomLabel from "../../../components/CustomLabel";
import CustomSelectButton from "../../../components/CustomSelectButton";
import CustomInputField from "../../../components/CustomInputField";
import CustomErrorMessage from "../../../components/CustomErrorMessage";
import CustomRadioButtons from "../../../components/CustomRadioButtons";
import RegistrationFormWrapper from "../../../components/RegistrationFormWrapper";
import {
  GET_CASTE_DETAILS,
  GET_RELIGION_DETAILS,
  GET_SUB_RELIGION_DETAILS,
  UPDATE_CASTE_DETAILS,
  UPDATE_REGISRATION_ERROR,
  UPDATE_REGISRATION_LOCAL_DATA,
} from "../../../saga/registration/registrationActionTypes";
import {
  hasSpecialCharacters,
  validateMobileNumber,
} from "../../../utils/reusableFunctions";

function ReligionDetails() {
  const [showSubCaste, setshowSubCaste] = useState(true);
  const dispatch = useDispatch();
  const generalInfo = useSelector((state) => state.common.generalInfo);
  const registerationInfo = useSelector(
    (state) => state.registration.registerationInfo
  );
  const { religions, subReligions, castes } = useSelector(
    (state) => state.registration
  );
  const registerationInfoErrors = useSelector(
    (state) => state.registration.registerationInfoErros
  );
  useEffect(() => {
    dispatch({ type: GET_RELIGION_DETAILS });
  }, []);

  const handleChangeSelection = (value, id) => {
    let data = {
      [id]: value,
    };

    if (value?.length === 0) {
      let errors = {
        [id]: "Field cannot be empty.",
      };
      dispatch({ type: UPDATE_REGISRATION_ERROR, payload: errors });
    }
     else {
      let errors = {
        [id]: "",
      };
      dispatch({ type: UPDATE_REGISRATION_ERROR, payload: errors });
      dispatch({ type: UPDATE_REGISRATION_LOCAL_DATA, payload: data });

      if (id === religion) {
        let data = {
          sub_religion: null,
          caste: null,
        };

        dispatch({ type: UPDATE_CASTE_DETAILS, payload: [] });
        dispatch({ type: UPDATE_REGISRATION_LOCAL_DATA, payload: data });
        dispatch({ type: GET_SUB_RELIGION_DETAILS, payload: value });

      }
      if (id === sub_religion) {
        let data = {
          caste: null,
        };
        dispatch({ type: UPDATE_REGISRATION_LOCAL_DATA, payload: data });
        if (value === "65d5db7962bedc99ce740954") {
          setshowSubCaste(false);
        } else {
          setshowSubCaste(true);
          dispatch({ type: GET_CASTE_DETAILS, payload: value });
        }
      }
    }
  };

  const handleChange = (e) => {
    let name = e?.target?.name;
    let value = e?.target?.value;
    let data = {
      [name]: value,
    };
    dispatch({ type: UPDATE_REGISRATION_LOCAL_DATA, payload: data });

    let validateFileds = [other_caste];

    if (validateFileds.includes(name)) {
      if (value?.length < 3) {
        let errors = {
          [name]: "Please enter a value that is more than 3 letters long.",
        };
        dispatch({ type: UPDATE_REGISRATION_ERROR, payload: errors });
      } else {
        let errors = {
          [e?.target?.name]: "",
        };
        dispatch({ type: UPDATE_REGISRATION_ERROR, payload: errors });
      }
    }
  };

  return (
    <RegistrationFormWrapper>
      <div className="marginBottomBasic">
        <h1 className="subHeadingTwo">Religion Details</h1>
      </div>
      <Flex gap="middle" vertical justify="center">
        <CustomLabel title="religion" />

        <CustomSelectButton
          name={religion}
          id={religion}
          status={registerationInfoErrors?.religion && "error"}
          options={religions}
          disabled={religions?.length > 0 ? false : true}
          value={registerationInfo.religion}
          onChange={handleChangeSelection}
        />
        {registerationInfoErrors?.religion && (
          <CustomErrorMessage message={registerationInfoErrors?.religion} />
        )}
        <CustomLabel title="Caste" />
        <CustomSelectButton
          name={sub_religion}
          id={sub_religion}
          status={registerationInfoErrors?.sub_religion && "error"}
          options={subReligions}
          disabled={subReligions?.length > 0 ? false : true}
          value={registerationInfo.sub_religion}
          onChange={handleChangeSelection}
        />
        {registerationInfoErrors?.sub_religion && (
          <CustomErrorMessage message={registerationInfoErrors?.sub_religion} />
        )}
        {showSubCaste ? (
          <CustomLabel title="Sub Caste" />
        ) : (
          <CustomLabel title="Other Caste Details" />
        )}
        {showSubCaste ? (
          <CustomSelectButton
            name={caste}
            id={caste}
            status={registerationInfoErrors?.caste && "error"}
            options={castes}
            disabled={castes?.length > 0 ? false : true}
            value={registerationInfo.caste}
            onChange={handleChangeSelection}
          />
        ) : (
          <CustomInputField
            placeholder="Other Caste Details"
            id={other_caste}
            status={registerationInfoErrors?.other_caste && "error"}
            name={other_caste}
            value={registerationInfo.other_caste}
            onChange={handleChange}
          />
        )}
        {showSubCaste
          ? registerationInfoErrors?.caste && (
              <CustomErrorMessage message={registerationInfoErrors?.caste} />
            )
          : registerationInfoErrors?.other_caste && (
              <CustomErrorMessage
                message={registerationInfoErrors?.other_caste}
              />
            )}
      </Flex>
    </RegistrationFormWrapper>
  );
}

export default ReligionDetails;
