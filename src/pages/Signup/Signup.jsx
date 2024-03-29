import React, { useEffect } from "react";
import { Flex} from "antd";

import { useDispatch, useSelector } from "react-redux";
import BasicDetails from "./Forms/basicDetails";
import { GET_GENERAL_INFO } from "../../saga/common/commonActionTypes";
import ContactDetails from "./Forms/ContactDetails";
import ReligionDetails from "./Forms/ReligionDetails";
import EducationAndWorkDetails from "./Forms/EducationAndWorkDetails";
import UploadImages from "./Forms/UploadImages";

function Signup() {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.registration.currentPage);

  const renderComponent = () => {
    switch (currentPage) {
      case 1:
        return <BasicDetails />;
        // case 1:
        //   return <UploadImages />;  
      case 2:
        return <ContactDetails />;
      case 3:
        return <ReligionDetails />;
      case 4:
        return <EducationAndWorkDetails />;
      default:
        return null;
    }
  };
  useEffect(() => {
    dispatch({ type: GET_GENERAL_INFO });
  }, []);
  return (
    <>
      <div className="registrationNavbar">
        <Flex style={{ height: "100%" }} justify="flex-start" align="center">
          logo{" "}
        </Flex>
      </div>
      <div>{renderComponent()}</div>
    </>
  );
}

export default Signup;
