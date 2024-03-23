import React from 'react'
import { Flex, Card } from "antd";

function ProfileCard(props) {

  return (
    <Card
    title={props?.data?.title}
    bordered={true}
    style={{
      width: " 100%",
      height: "100%"
    }}
  >
  {props?.data?.labelValues?.map((item) => {
    return (
        <Flex gap="small" >
        <div className="profileLabels"><p className="profileLabel">{item?.label} </p></div>
        <div className="profilevalues"><p className="profilevalue">{item?.value}</p></div>
      </Flex>
    )
  })}
  </Card>
  )
}

export default ProfileCard