import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Flex, Menu, Button, Card } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { SiSimilarweb } from "react-icons/si";
import { RiFindReplaceFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { FaMessage } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import { GiArmorUpgrade } from "react-icons/gi";
import { FaQrcode } from "react-icons/fa";
import { MdContactPage } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import coupleOne from "../../images/couple1.jpg";
import coupleTwo from "../../images/couple2.jpg";
import coupleThree from "../../images/couple3.jpg";
import { first_name, profileLabels } from "../../constants/utilConstants";
import ProfileCard from "../../components/ProfileCard";
export function Profile() {
  const swiper = useSwiper();
  let profileData = {
    first_name:
      "vvvvhvhvh cggcgcgc bhbhbhbhjb fcfcfcffc hvhvhvhvh hvhvhvhvh vhvvhh vvvvhvhvh cggcgcgc bhbhbhbhjb fcfcfcffc hvhvhvhvh hvhvhvhvh vhvvhh",
  };
  let imgUrls = [
    coupleOne,
    coupleThree,
    coupleTwo,
    coupleTwo,
    coupleThree,
    coupleOne,
    coupleOne,
    coupleTwo,
    coupleThree,
  ];

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const items = [
    getItem("Matches", "1", <SiSimilarweb />),
    getItem("Search", "2", <RiFindReplaceFill />),
    getItem("Profile", "3", <CgProfile />),
    getItem("Messages", "4", <FaMessage />),
    getItem("Settings", "5", <IoSettings />),
    getItem("Upgrade", "6", <GiArmorUpgrade />),
    getItem("FAQ", "7", <FaQrcode />),
    getItem("Contact Us", "8", <MdContactPage />),
    getItem("Logout", "9", <IoLogOut />),
  ];

  const basicDetails = {
    title: "Basic Details",
    labelValues: [
    { label: "xxx", value: "yyy" }, 
    { label: "xxx", value: "yyy" }
  ],
  };

  return (
    <>
      <div className="container">
        <div className="left-section">
          <Menu
            style={{
              width: "100%",
              height: "100%",
            }}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            // mode={mode}
            // theme={theme}
            items={items}
          />
        </div>
        <div className="right-section">
          <div className="mainMenu">
            <Row gutter={16}>
              <Col xs={{ span: 24 }} sm={{ span: 12 }}>
                <div className="carouselImages">
                  <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={50}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log("slide change")}
                  >
                    {imgUrls.map((img) => (
                      <SwiperSlide>
                        <img src={img} className="profileImg" />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 12 }}>
                <div className="profileDetailsCard">
                  <ProfileCard data={basicDetails} />
                </div>
              </Col>

              <Col xs={{ span: 24 }} sm={{ span: 12 }}>
                <div className="profileDetailsCard">
                  <Card
                    title="Basic Details"
                    bordered={true}
                    style={{
                      width: " 100%",
                      height: "100%",
                    }}
                  >
                    <Flex gap="small">
                      <div className="profileLabels">
                        <p className="profileLabel">
                          {profileLabels.profile_for}{" "}
                        </p>
                      </div>
                      <div className="profilevalues">
                        <p className="profilevalue">{profileData.first_name}</p>
                      </div>
                    </Flex>

                    <Flex gap="small">
                      <div className="profileLabels">
                        <p className="profileLabel">
                          {profileLabels.first_name}{" "}
                        </p>
                      </div>
                      <div className="profilevalues">
                        <p className="profilevalue">
                          {profileData.first_name} :
                        </p>
                      </div>
                    </Flex>
                    <Flex gap="small">
                      <div className="profileLabels">
                        <p className="profileLabel">
                          {profileLabels.middle_name}{" "}
                        </p>
                      </div>
                      <div className="profilevalues">
                        <p className="profilevalue">
                          {profileData.first_name} :
                        </p>
                      </div>
                    </Flex>
                    <Flex gap="small">
                      <div className="profileLabels">
                        <p className="profileLabel">
                          {profileLabels.last_name}{" "}
                        </p>
                      </div>
                      <div className="profilevalues">
                        <p className="profilevalue">
                          {profileData.first_name} :
                        </p>
                      </div>
                    </Flex>
                    <Flex gap="small">
                      <div className="profileLabels">
                        <p className="profileLabel">{profileLabels.gender} </p>
                      </div>
                      <div className="profilevalues">
                        <p className="profilevalue">
                          {profileData.first_name} :
                        </p>
                      </div>
                    </Flex>
                    <Flex gap="small">
                      <div className="profileLabels">
                        <p className="profileLabel">
                          {profileLabels.marital_status}{" "}
                        </p>
                      </div>
                      <div className="profilevalues">
                        <p className="profilevalue">
                          {profileData.first_name} :
                        </p>
                      </div>
                    </Flex>
                    <Flex gap="small">
                      <div className="profileLabels">
                        <p className="profileLabel">
                          {profileLabels.date_of_birth}{" "}
                        </p>
                      </div>
                      <div className="profilevalues">
                        <p className="profilevalue">
                          {profileData.first_name} :
                        </p>
                      </div>
                    </Flex>
                    <Flex gap="small">
                      <div className="profileLabels">
                        <p className="profileLabel">
                          {profileLabels.mother_tongue}{" "}
                        </p>
                      </div>
                      <div className="profilevalues">
                        <p className="profilevalue">
                          {profileData.first_name} :
                        </p>
                      </div>
                    </Flex>
                  </Card>
                </div>
              </Col>
              <Col xs={{ span: 24 }} sm={{ span: 12 }}>
                <div className="profileDetailsCard">
                  <Card
                    title="Basic Details"
                    bordered={true}
                    style={{
                      width: " 100%",
                      height: "100%",
                    }}
                  >
                    <Flex gap="small">
                      <div className="profileLabels">
                        <p className="profileLabel">
                          {profileLabels.profile_for}{" "}
                        </p>
                      </div>
                      <div className="profilevalues">
                        <p className="profilevalue">{profileData.first_name}</p>
                      </div>
                    </Flex>

                    <Flex gap="small">
                      <div className="profileLabels">
                        <p className="profileLabel">
                          {profileLabels.first_name}{" "}
                        </p>
                      </div>
                      <div className="profilevalues">
                        <p className="profilevalue">
                          {profileData.first_name} :
                        </p>
                      </div>
                    </Flex>
                    <Flex gap="small">
                      <div className="profileLabels">
                        <p className="profileLabel">
                          {profileLabels.middle_name}{" "}
                        </p>
                      </div>
                      <div className="profilevalues">
                        <p className="profilevalue">
                          {profileData.first_name} :
                        </p>
                      </div>
                    </Flex>
                  </Card>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
}
