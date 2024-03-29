import { useState } from "react";
import { Flex, Card, Col, Row, Button, Divider } from "antd";
import { IoPeople } from "react-icons/io5";

import { LuMessagesSquare } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import couple from "../../images/animations/coupleHome.json";
import coupleOne from "../../images/couple1.jpg";
import coupleTwo from "../../images/couple2.jpg";
import coupleThree from "../../images/couple3.jpg";
import CustomButton from "../../components/CustomButton";
import { motion } from "framer-motion";

import { FaPhone } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaYoutube } from "react-icons/fa";
import { SiGnuprivacyguard } from "react-icons/si";
import { CiLogin } from "react-icons/ci";
import CustomSelectButton from "../../components/CustomSelectButton";
import { useEffect } from "react";
import { GET_PROFILE_DATA_API } from "../../constants/apiConstants";

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
};
const handleChangeReg = (value) => {
  console.log(`selected ${value}`);
};
const { Meta } = Card;
export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const handleSignup = () => {
    navigate("/signup");
  };

  const handleLogin = () => {
    navigate("/login");
  };


  return (
    <div className="mainContainerHome">
      {/* headertitle */}
      <Col xs={{ span: 0 }} sm={{ span: 24 }} className="headerTitle">
        <Flex justify="space-between" align="center" className="fullheight">
          <Flex justify="start" gap="small">
            <FaPhone className="iconTextColor" />
            <p className="iconTextColor"> +91 7972983976</p>
          </Flex>

          <Flex justify="start" gap="small">
            <FaFacebook className="iconTextColor" />
            <a className="iconTextColor" href="https://www.facebook.com/">
              Facebook
            </a>
            <div className="vertical-border" />
            <AiFillInstagram className="iconTextColor" />
            <a className="iconTextColor" href="https://www.facebook.com/">
              Instagram
            </a>
            <div className="vertical-border" />
            <FaYoutube className="iconTextColor" />
            <a className="iconTextColor" href="https://www.facebook.com/">
              Youtube
            </a>
          </Flex>
        </Flex>
      </Col>
      {/* headertitle */}
      {/* header */}
      <Flex justify="space-between" align="center" className="headerHome">
        <div className="logo">
          <FaFacebook />
        </div>
        <Flex gap="small" align="center" className="headerHome">
          <Button
            icon={<SiGnuprivacyguard />}
            type="text"
            onClick={handleSignup}
          >
            Singup
          </Button>
          <Button
            icon={<CiLogin />}
            type="text"
            onClick={handleLogin}
            // onClick={() => router.push("/login")}
          >
            Login
          </Button>
        </Flex>
      </Flex>
      {/* header */}

      {/* headerBnner */}
      <Row className="bannner" align="middle">
        <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 10 }}>
          <Flex
            vertical
            gap={"large"}
            style={{ paddingTop: "20px", paddingBottom: "20px" }}
          >
            <h1 className="subHeadingOne">
              Joining Hearts, Creating Futures: Bonds that Last.
            </h1>
            <p className="bannerSubHeading">
              Discover Meaningful Connections on Our Matrimonial Platform.
            </p>
            <CustomButton title="Signup Now" onSubmit={handleSignup} />
          </Flex>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} lg={{ span: 14 }}>
          <Lottie animationData={couple} height={100} />
          {/* <img
            style={{
              width: "100%",
              height: "auto",
            }}
            src={couple}
            alt="Picture of the author"
          /> */}
        </Col>
      </Row>
      {/* headerBnner */}

      {/* registration */}
      <Row className="registrationCard">
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          lg={{ span: 12 }}
          className="registrationCardOne"
        >
          <Flex
            vertical
            gap="small"
            align="center"
            justify="center"
            style={{ height: "100%" }}
          >
            <h1 className="subHeadingOne">Welcome To Our ZZZZZ</h1>
            <p className="bannerSubHeading" style={{ textAlign: "center" }}>
              Join our matrimonial website to embark on a journey of finding
              your perfect partner. Our platform offers a safe and secure
              environment to connect with like-minded individuals, fostering
              meaningful relationships. With a user-friendly interface and
              advanced matching algorithms, we make the search for your soulmate
              a seamless and enjoyable experience.
            </p>
          </Flex>
        </Col>
        <Col
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          lg={{ span: 12 }}
          className="registrationCardTwo"
        >
          <Flex vertical gap="large">
            <h1 className="iconTextColor">Find Your True Love</h1>
            <Row gutter={{ xs: 8, sm: 8, md: 8, lg: 8 }}>
              <Col xs={{ span: 12 }}>
                <Flex vertical gap="small">
                  <p className="iconTextColor">I am a</p>
                  <CustomSelectButton
                    handleChange={handleChangeReg}
                    options={[
                      { value: "jack", label: "Jack" },
                      { value: "lucy", label: "Lucy" },
                      { value: "Yiminghe", label: "yiminghe" },
                    ]}
                  />
                </Flex>
              </Col>
              <Col xs={{ span: 12 }}>
                <Flex vertical gap="small">
                  <p className="iconTextColor">Looking for</p>
                  <CustomSelectButton
                    handleChange={handleChangeReg}
                    options={[
                      { value: "jack", label: "Jack" },
                      { value: "lucy", label: "Lucy" },
                      { value: "Yiminghe", label: "yiminghe" },
                    ]}
                  />
                </Flex>
              </Col>
            </Row>
            <Row gutter={{ xs: 8, sm: 8, md: 8, lg: 8 }}>
              <Col xs={{ span: 6 }}>
                <Flex vertical gap="small" style={{ width: "100%" }}>
                  <p className="iconTextColor">Age</p>

                  <CustomSelectButton
                    handleChange={handleChangeReg}
                    options={[
                      { value: "jack", label: "Jack" },
                      { value: "lucy", label: "Lucy" },
                      { value: "Yiminghe", label: "yiminghe" },
                    ]}
                  />
                </Flex>
                {/* </Flex> */}
              </Col>
              <Col xs={{ span: 6 }}>
                <Flex vertical gap="small" style={{ width: "100%" }}>
                  <p className="paddingTopEmptyText"></p>

                  <CustomSelectButton
                    handleChange={handleChangeReg}
                    options={[
                      { value: "jack", label: "Jack" },
                      { value: "lucy", label: "Lucy" },
                      { value: "Yiminghe", label: "yiminghe" },
                    ]}
                  />
                </Flex>
                {/* </Flex> */}
              </Col>
              <Col xs={{ span: 12 }}>
                <Flex vertical gap="small">
                  <p className="iconTextColor">Looking for</p>
                  <CustomSelectButton
                    handleChange={handleChangeReg}
                    options={[
                      { value: "jack", label: "Jack" },
                      { value: "lucy", label: "Lucy" },
                      { value: "Yiminghe", label: "yiminghe" },
                    ]}
                  />
                </Flex>
              </Col>
            </Row>

            <Row gutter={{ xs: 8, sm: 8, md: 8, lg: 8 }}>
              <Col xs={{ span: 24 }}>
                <Flex vertical gap="small">
                  <p className="iconTextColor">Country</p>
                  <CustomSelectButton
                    handleChange={handleChangeReg}
                    options={[
                      { value: "jack", label: "Jack" },
                      { value: "lucy", label: "Lucy" },
                      { value: "Yiminghe", label: "yiminghe" },
                    ]}
                  />
                </Flex>
              </Col>
            </Row>

            <Row gutter={{ xs: 8, sm: 8, md: 8, lg: 8 }}>
              <Col xs={{ span: 24 }}>
                <Flex vertical gap="small">
                  <Button className="">Find Your Partener</Button>
                </Flex>
              </Col>
            </Row>
          </Flex>
        </Col>
      </Row>
      {/* registration */}
      {/* why choose cards */}
      <Flex
        vertical
        gap="small"
        align="center"
        justify="center"
        className="cardsHomeWhy"
      >
        <Row justify="center">
          <Col xs={24} sm={20} md={16} lg={16} xl={16}>
            <h1 className="subHeadingOne" style={{ textAlign: "center" }}>
              Why Choose ZZZZZ
            </h1>

            <p className="bannerSubHeading" style={{ textAlign: "center" }}>
              Choose our matrimonial website for a personalized and efficient
              matchmaking experience. Our platform is designed to prioritize
              your preferences and values, ensuring that you find a compatible
              partner. With a diverse and active user base, you have a higher
              chance of meeting someone who shares your outlook on life. Join us
              and let us help you find your perfect match!
            </p>
          </Col>
        </Row>
        <Row
          justify={"space-around"}
          align="center"
          gutter={24}
          style={{ paddingTop: "20px" }}
        >
          <Col xs={24} sm={12} md={12} lg={8}>
            <Flex
              vertical
              gap="small"
              align="center"
              justify="center"
              style={{ paddingBottom: "20px" }}
            >
              <div className="circleHome">
                <div className="iconInsideHome">
                  <SiGnuprivacyguard
                    style={{ fontSize: "40px", color: "#fff" }}
                  />
                </div>
              </div>
              <h1 className="subHeadingOne" style={{ textAlign: "center" }}>
                Join
              </h1>
              <p className="bannerSubHeading" style={{ textAlign: "center" }}>
                ake the first step towards meeting your life partner.
              </p>
            </Flex>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8}>
            <Flex
              vertical
              gap="small"
              align="center"
              justify="center"
              style={{ paddingBottom: "20px" }}
            >
              <div className="circleHome">
                <div className="iconInsideHome">
                  <IoPeople style={{ fontSize: "40px", color: "#fff" }} />
                </div>
              </div>
              <h1 className="subHeadingOne" style={{ textAlign: "center" }}>
                Engage
              </h1>
              <p className="bannerSubHeading" style={{ textAlign: "center" }}>
                Begin your search for a life companion by enrolling with us.
              </p>
            </Flex>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8}>
            <Flex
              vertical
              gap="small"
              align="center"
              justify="center"
              style={{ paddingBottom: "20px" }}
            >
              <div className="circleHome">
                <div className="iconInsideHome">
                  <LuMessagesSquare
                    style={{ fontSize: "40px", color: "#fff" }}
                  />
                </div>
              </div>
              <h1 className="subHeadingOne" style={{ textAlign: "center" }}>
                Communicate
              </h1>
              <p className="bannerSubHeading" style={{ textAlign: "center" }}>
                Connect with others who are also seeking a life partner.
              </p>
            </Flex>
          </Col>
        </Row>
      </Flex>

      {/* why choose cards */}
      {/* cards */}
      <Flex
        vertical
        gap="small"
        align="center"
        justify="center"
        className="cardsHome"
        style={{ padding: "20px" }}
      >
        <Row justify="center">
          <Col xs={24} sm={20} md={16} lg={16} xl={16}>
            <h1 className="subHeadingOne" style={{ textAlign: "center" }}>
              ZZZZZ Stories From Our Users
            </h1>

            <p className="bannerSubHeading" style={{ textAlign: "center" }}>
              Listen and learn from our community members and find out tips and
              tricks to meet your love. Join us and be part of a bigger family.
            </p>
          </Col>
        </Row>
        <Row
          justify={"space-around"}
          align="center"
          gutter={24}
          style={{ paddingTop: "20px" }}
        >
          <Col xs={24} sm={12} md={12} lg={8}>
            <Flex
              vertical
              gap="small"
              align="center"
              justify="center"
              style={{ paddingBottom: "20px" }}
            >
              <Card
                hoverable
                cover={<img className="resImg" alt="example" src={coupleOne} />}
              >
                <Meta description="I never thought I'd meet my future spouse online, but this platform proved me wrong. We clicked instantly, and I knew she was the one. Thank you for helping me find true love! - Varun & Neha" />
              </Card>
            </Flex>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8}>
            <Flex
              vertical
              gap="small"
              align="center"
              justify="center"
              style={{ paddingBottom: "20px" }}
            >
              <Card
                hoverable
                cover={<img className="resImg" alt="example" src={coupleTwo} />}
              >
                <Meta description="I was skeptical about online matchmaking, but this website exceeded my expectations. I connected with someone who shares my values and interests, and we're now planning our future together. - Rahul & Sandhya" />
              </Card>
            </Flex>
          </Col>
          <Col xs={24} sm={12} md={12} lg={8}>
            <Flex
              vertical
              gap="small"
              align="center"
              justify="center"
              style={{ paddingBottom: "20px" }}
            >
              <Card
                hoverable
                cover={
                  <img className="resImg" alt="example" src={coupleThree} />
                }
              >
                <Meta description="I was hesitant to join a matrimonial website, but this platform made me feel comfortable. I found someone who truly understands me, and we're excited to start this new chapter together. - Vikas & Aaradhya" />
              </Card>
            </Flex>
          </Col>
        </Row>
      </Flex>

      {/* cards */}

      {/* tagline */}
      <Flex
        vertical
        gap="small"
        align="center"
        justify="center"
        style={{
          paddingLeft: "20px",
          paddingRight: "20px",
          paddingBottom: "40px",
          paddingTop: "60px",
        }}
      >
        <Row justify="center">
          <Col xs={24} sm={20} md={16} lg={16} xl={16}>
            <h1 className="subHeadingOne" style={{ textAlign: "center" }}>
              Join us to unlock the door to your happily ever after!
            </h1>

            <p className="bannerSubHeading" style={{ textAlign: "center" }}>
              Start your journey with us today and let's create your love story
              together. Your perfect match could be just a click away!
            </p>
          </Col>
        </Row>
      </Flex>
      {/* tagline */}

      {/* footer */}
      <Row className="footerHome">
        <Col
          xs={24}
          sm={12}
          md={12}
          lg={8}
          style={{ padding: "10px", paddingBottom: "20px" }}
        >
          <Flex justify="center" align="center" vertical gap={"small"}>
            <p className="footerTitle">Need Help?</p>
            <Divider />
            <Link>Login</Link>
            <Link>Signup</Link>
            <Link>Customer Support</Link>
          </Flex>
        </Col>
        <Col
          xs={24}
          sm={12}
          md={12}
          lg={8}
          style={{ padding: "10px", paddingBottom: "20px" }}
        >
          <Flex justify="center" align="center" vertical gap={"small"}>
            <p className="footerTitle">Company</p>
            <Divider />
            <Link>About Us</Link>
            <Link>Contact Us</Link>
          </Flex>
        </Col>
        <Col
          xs={24}
          sm={12}
          md={12}
          lg={8}
          style={{ padding: "10px", paddingBottom: "20px" }}
        >
          <Flex justify="center" align="center" vertical gap={"small"}>
            <p className="footerTitle">Policies</p>
            <Divider />
            <Link>Terms of Use</Link>
            <Link>Privacy Policy</Link>
            <Link>Report Misuse</Link>
          </Flex>
        </Col>
        {/* <Col
          xs={24}
          sm={12}
          md={12}
          lg={6}
          style={{ padding: "10px", paddingBottom: "20px" }}
        >
          <Flex justify="center" align="center" vertical gap={"small"}>
            <p className="footerTitle">Need Help?</p>
            <Divider />
            <Link>About Us</Link>
            <Link>About Us</Link>
            <Link>About Us</Link>
            <Link>About Us</Link>
          </Flex>
        </Col> */}
      </Row>

      {/* footer */}

      {/* all rights */}
      <Flex justify="center" align="center" className="reserved" vertical>
        <p className="footerReserved">Made with ❤ by</p>

        <p className="footerReserved">Kedar Bhokare</p>
      </Flex>

      {/* all rights */}
    </div>
  );
}
