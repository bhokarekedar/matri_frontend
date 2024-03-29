import { Select } from "antd";
import { Controller } from "react-hook-form";

function CustomSelectButton(props) {
  
  const handleChange = (value) => {
    props.onChange(value, props?.id)
  }
  return (
    <div>
      <Select
            {...props}
            id={props.id}
            // ref={props?.ref}
            options={props.options}
            onChange={handleChange}
            placeholder={"Select"}
            disabled={props?.disabled || false}
            style={{ width: "100%" }}
          />
    </div>
  );
}

export default CustomSelectButton;
