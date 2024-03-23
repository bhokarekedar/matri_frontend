import React, { useEffect, useState } from "react";
import { Flex, Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import {
  religion,
  sub_religion,
  caste,
  other_caste,
} from "../../../constants/utilConstants";
import RegistrationFormWrapper from "../../../components/RegistrationFormWrapper";

import {
  hasSpecialCharacters,
  validateMobileNumber,
} from "../../../utils/reusableFunctions";

function UploadImages() {
  const dispatch = useDispatch();
  const registerationInfo = useSelector(
    (state) => state.registration.registerationInfo
  );
  const registerationInfoErrors = useSelector(
    (state) => state.registration.registerationInfoErros
  );
  const props = {
    name: 'file',
    action: '/upload',
    headers: {
        authorization: 'authorization-text'
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }
};

  return (
    <RegistrationFormWrapper>
      <div className="marginBottomBasic">
        <h1 className="subHeadingTwo">Upload Your Pictures</h1>
      </div>
      <Flex gap="middle" vertical justify="center">
      <Upload {...props}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Flex>
    </RegistrationFormWrapper>
  );
}

export default UploadImages;
