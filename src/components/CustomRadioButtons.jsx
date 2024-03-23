import React from "react";
import { Radio } from "antd";

function CustomRadioButtons(props) {
  return (
    <Radio.Group id={props.id} {...props}>
      {props?.options?.map((val) => {
        <Radio value={val.value}>{val.label}</Radio>;
      })}
    </Radio.Group>
  );
}

export default CustomRadioButtons;
