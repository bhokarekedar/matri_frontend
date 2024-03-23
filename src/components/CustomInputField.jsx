import React from "react";
import { Input } from "antd";

function CustomInputField(props) {
  return (
    <Input
      id={props.id}
      name={props.name}
      status={props?.status || ""}
      type={props?.type || "text"}
      style={{ width: "100%" }}
      placeholder={props?.placeholder || ""}
      {...props}
    />
  );
}

export default CustomInputField;
