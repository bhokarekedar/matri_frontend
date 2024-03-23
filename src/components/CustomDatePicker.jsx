import React from 'react'
import { DatePicker } from 'antd';
function CustomDatePicker(props) {
    const handleChange = (date, dateString) => {
        props.onChange(date, dateString)
      };
  return (
    <DatePicker defaultValue={props.defaultValue} {...props} status={props?.status || ""} onChange={handleChange} />
  )
}

export default CustomDatePicker