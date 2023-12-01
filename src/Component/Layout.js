import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import "../Component/layout.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import axios from "axios";
import Review from "./review";
// import Modal from "@mui/material/Modal";
import { Modal } from "react-bootstrap";
import { Button, Form } from "react-bootstrap";
import Header from "./Header";
import { ColorRing } from "react-loader-spinner";

export default function Layout() {
  const [Banner, setBanner] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [category, setCategory] = useState([]);
  const [selcategory, setselcategory] = useState("");
  const [filtersub, setfiltersub] = useState([]);
  const [subModel, setsubModel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const storedUserDataJSON = sessionStorage.getItem("userdata");
  let userData = null;
  try {
    userData = JSON.parse(storedUserDataJSON);
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
  console.log("userData", userData);
  useEffect(() => {
    GetAllWebBanner();
    getAllCategory();
  }, []);

  const GetAllWebBanner = async () => {
    try {
      setIsLoading(true);
      let res = await axios.get(
        "http://api.thevucare.com/api/website/getallwebbanner"
      );

      if (res.status === 200) {
        setBanner(res.data.banner);
      }
    } catch (er) {
      console.log(er, "err while fetching data");
    } finally {
      setIsLoading(false);
    }
  };

  const filtercatsub = (cat) => {
    setselcategory(cat);

    setsubModel(true);
  };

  useEffect(() => {
    getsubcategory();
  }, [selcategory]);

  const getsubcategory = async () => {
    try {
      setIsLoading(true);
      let res = await axios.get(
        `http://api.thevucare.com/api/userapp/getappsubcat`
      );

      if ((res.status = 200)) {
        setCategoryData(res.data.subcategory);

        setfiltersub(
          res.data.subcategory.filter((i) =>
            i.category?.toLowerCase().includes(selcategory?.toLowerCase())
          )
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getAllCategory = async () => {
    try {
      setIsLoading(true);
      let res = await axios.get("http://api.thevucare.com/api/getcategory");
      if (res.status === 200) {
        const firstInFirstOut = res.data.category.reverse();
        setCategory(firstInFirstOut);
      }
    } catch (er) {
      console.log(er, "err while fetching data");
    } finally {
      setIsLoading(false);
    }
  };

  const cleaningItemsCount = categoryData.filter((item) =>
    item?.category?.toLowerCase()?.includes("cleaning")
  )?.length;

  const actualCleaningSlidesToShow = Math?.min(cleaningItemsCount, 6);

  const pestControlItemsCount = categoryData?.filter((item) =>
    item?.category?.toLowerCase()?.includes("control")
  )?.length;

  const actualPestControlSlidesToShow = Math.min(pestControlItemsCount, 6);

  const paintingcontorl = categoryData.filter((item) =>
    item?.category?.toLowerCase()?.includes("painting")
  )?.length;

  const painitnca = Math.min(paintingcontorl, 6);

  const commonSliderSettings = {
    className: "common-slider",
    dots: true,
    infinite: true,
    speed: 900,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "ease-in-out",
    initialSlide: 1,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          adaptiveHeight: true,
          centerMode: true,
          dots: true,
          arrows: true,
          lazyLoad: "ondemand",
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          adaptiveHeight: true,
          centerMode: true,
          dots: true,
          arrows: true,
          lazyLoad: "ondemand",
        },
      },
    ],
  };

  const pestControlSettings = {
    ...commonSliderSettings,
    slidesToShow: actualPestControlSlidesToShow,
  };

  const cleaningSettings = {
    ...commonSliderSettings,
    slidesToShow: actualCleaningSlidesToShow,
  };

  const actualPaintingSetting = {
    ...commonSliderSettings,
    slidesToShow: painitnca,
  };

  const justforyou = {
    className: "just-for-you-slider",
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "ease-in-out",
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: true,
        },
      },
    ],
  };

  const [showModal, setShowModal] = useState(false);

  const handleShow = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const shouldShowModal = window.scrollY > 2000;

      if (shouldShowModal) {
        handleShow();
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [selectedService, setSelectedService] = useState(null);

  const handleServiceSelection = (service) => {
    setSelectedService(service);
  };

  const sendWhatsAppMessage = (recipient, service) => {
    const apiEndpoint = "https://api.whatsapp.com/send";
    const message = `Selected Service: ${service}`;
    const whatsappLink = `${apiEndpoint}?phone=${recipient}&text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappLink, "_blank");
  };
  const handleSubmit = () => {
    sendWhatsAppMessage("9980670037", selectedService);
  };
  return (
    <>
      {isLoading ? (
        <div className="row m-auto text-center" style={{ height: "100vh" }}>
          <div className="col-md-4"></div>
          <div className="col-md-4 m-auto">
            {" "}
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          </div>
          <div className="col-md-4"></div>
        </div>
      ) : (
        <>
          <Header />

          <div className="container ">
            {/* <div className="row     ">
              <div className="col-md-3   clr2  ">
                <div className="row r  p-2 m-1  brclr">
                  <div className="col-md-6  m-auto ">
                    <p className="row fs-5    fsd   clr3 boldt1 text-white">
                      Our Motive Is To Make You
                    </p>
                  </div>
                  <div className="col-md-5">
                    <img
                      className="crdbor brclr responsive-img  firstcart imgs"
                      src="..\assests\house.avif"
                      alt=""
                    />
                  </div>
                  <div>
                    <p className="row  p-1 mtchan  textsi fsd  clr3 boldt1 text-white">
                      Comfort In Your Home
                    </p>
                  </div>
                  <div className="row  m-auto">
                    <button className="col-md-6 imgbr boldt1  m-auto mb-3 p-2 btn yellw clr2 grndclr  ">
                      Contact Us
                    </button>
                  </div>
                </div>
              </div>

              {category.reverse()?.map((ele) => (
                <div className="col-md-2 responsive-categoyr     clr2 clr3 crdbor p-3  m-auto   cursor">
                  <Link
                    className="row m-auto"
                    onClick={() => filtercatsub(ele.category)}
                  >
                    <img
                      className="col-md-6 imgsub "
                      width={50}
                      height={50}
                      categoryImg
                      src={`http://api.thevucare.com/category/${ele?.categoryImg}`}
                      alt=""
                    />{" "}
                  </Link>
                  <div className="row m-auto">
                    {" "}
                    <p className="col-md-12   fnt14 textsi  boldt">
                      {ele?.category}
                    </p>
                  </div>
                </div>
              ))}
            </div> */}
            <div className="row  clr2 shadow p-5 ">
              <div className="row   text-center m-auto  ">
                <div className="col-md-4 p-2 brclr medis1">
                  <p className="row   fnt22 clr3 ">
                    Our Motive Is To Make You Comfort In Your Home{" "}
                  </p>
                  <div className="row  m-auto">
                    <button className="col-md-6 imgbr boldt1  m-auto mb-3 p-2 btn yellw clr2 grndclr  ">
                      Contact Us
                    </button>
                  </div>
                </div>
                {category.reverse()?.map((ele) => (
                  <div className="col-md-2 responvm">
                    <Link
                      className="row m-auto linksty"
                      onClick={() => filtercatsub(ele.category)}
                    >
                      <div className="row ">
                        <img
                          className="col-md-4  p-2  m-auto bg-white logostyl "
                          width={40}
                          height={40}
                          src={`http://api.thevucare.com/category/${ele?.categoryImg}`}
                          alt=""
                        />{" "}
                      </div>
                      <p className=" fnt14 textsi mt-2 clr3  boldt">
                        {ele?.category}
                      </p>{" "}
                    </Link>{" "}
                  </div>
                ))}
              </div>
            </div>
            <div className="row m-auto ">
              <div className="col-md-3"></div>
            </div>
            <div className="row  m-auto  mt-5 ">
              <h2 className="text-center boldt">Just For You</h2>
              <div className="row text-center">
                <button className="col-md-2 m-auto btnd btns_all clr3 clr2 yellw1 p-2 boldbtn">
                  Newly Lounched
                </button>{" "}
              </div>

              <div className="row mt-3  slick-listsd slick-listsd1 slick-sliders    just-for-you-slider">
                <Slider {...justforyou}>
                  {Banner.map((item) => (
                    <img
                      key={item._id}
                      className="col-md-11 m-1 imgbnr"
                      height={180}
                      src={`http://api.thevucare.com/webBanner/${item.banner}`}
                      alt=""
                    />
                  ))}
                </Slider>
              </div>
            </div>
            <div className="row  m-auto   mt-5 ">
              <h2 className="text-center boldt">Pest Control</h2>

              <div className="row mt-3 slick-listsd slick-listsd1 slick-sliders common-slider">
                <Slider {...pestControlSettings}>
                  {categoryData
                    .filter((item) =>
                      item.category.toLowerCase().includes("control")
                    )
                    .map((item) => (
                      <div key={item._id} className="m-auto  linksty">
                        <Link
                          className="linksty"
                          to="/servicedetails"
                          state={{ subcategory: item?.subcategory }}
                          key={item.subcategory}
                        >
                          <img
                            width={150}
                            height={150}
                            src={`http://api.thevucare.com/subcat/${item?.subcatimg}`}
                            className=" m-1 shadow bg-white rounded "
                            alt=""
                          />
                          <p className="col-md-11 m-1 text-center m-auto p-2 boldt">
                            {item.subcategory}
                          </p>
                        </Link>
                      </div>
                    ))}
                </Slider>
              </div>
            </div>
            <div className="row m-auto   mt-5">
              <Card className="borderrad">
                <img
                  className="border1"
                  src="..\assests\pest-control-services--1536x512.jpg"
                  height={250}
                />
              </Card>
            </div>

            <div className="row m-auto   mt-5 ">
              <h2 className="text-center">Cleaning Services</h2>
              <div className="row text-center">
                <button className="col-md-3 m-auto btnd btns_all clr3 clr2 p-2 yellw1 boldbtn">
                  30% Less Than Market Price
                </button>{" "}
              </div>
              <div className="row mt-5 slick-listsd slick-listsd1 slick-sliders common-slider">
                <Slider {...cleaningSettings}>
                  {categoryData
                    .filter((item) =>
                      item.category.toLowerCase().includes("cleaning ")
                    )
                    .map((ele) => (
                      <div key={ele._id} className="m-auto  linksty">
                        <Link
                          className="linksty"
                          to="/servicedetails"
                          state={{ subcategory: ele?.subcategory }}
                          key={ele.subcategory}
                        >
                          {" "}
                          <img
                            width={150}
                            height={150}
                            src={`http://api.thevucare.com/subcat/${ele?.subcatimg}`}
                            className=" m-1  shadow bg-white rounded "
                            alt=""
                          />
                          <p className="col-md-11 m-1 text-center m-auto p-2 boldt">
                            {ele.subcategory}
                          </p>
                        </Link>
                      </div>
                    ))}
                </Slider>
              </div>
            </div>

            <div className="row m-auto   mt-5 ">
              <h2 className="text-center">Painting Services</h2>
              <div className="row text-center">
                <button className="col-md-3 m-auto btnd btns_all clr3 clr2 p-2 yellw1 boldbtn">
                  Asian Paints Certified
                </button>{" "}
              </div>
              <div className="row mt-5 slick-listsd slick-listsd1 slick-sliders common-slider">
                <Slider {...actualPaintingSetting}>
                  {categoryData
                    .filter((item) =>
                      item.category.toLowerCase().includes("painting")
                    )
                    .map((ele) => (
                      <div key={ele._id} className="m-auto  linksty">
                        <Link
                          className="linksty"
                          to="/servicedetails"
                          state={{ subcategory: ele?.subcategory }}
                          key={ele.subcategory}
                        >
                          {" "}
                          <img
                            width={150}
                            height={150}
                            src={`http://api.thevucare.com/subcat/${ele?.subcatimg}`}
                            className=" m-1 shadow bg-white rounded "
                            alt=""
                          />
                          <p className="text-center m-auto p-2 boldt">
                            {ele.subcategory}
                          </p>
                        </Link>
                      </div>
                    ))}
                </Slider>
              </div>
            </div>
            <div className="row   m-auto  mt-5">
              <Card className="borderrad">
                <img className="border1" src="..\assests\ggg-01.png" />
              </Card>
            </div>

            <Review />

            <div className="row me-0  m-auto mt-5 mb-5 p-1 p-re">
              <h2 className="text-center boldt">Why Choose Us?</h2>

              <div className="container  mt-3 p-5 rdiu clr2 p-5">
                <p className="yellw1 fs-4">Exceptional Expertise:</p>
                <p className="clr3 fsd">
                  Our home services company boasts a team of highly skilled
                  professionals with years of experience,ensuring top-notch
                  service quality and efficient solutions for all your home
                  needs.
                </p>
                <p className="yellw1 fs-4">Customer-Centric Approach:</p>
                <p className="clr3 fsd">
                  We prioritize your satisfaction and convenience,tailoring our
                  services to your unique requirements,our dedicated team
                  listens attentively and delivers personalized solutions that
                  align with your expectations.
                </p>
                <p className="yellw1 fs-4">Reliability And Trust:</p>
                <p className="clr3 fsd">
                  Count on us for dependable,trustworthy service. We value
                  transparency,punctuality.and a strong work ethic,providing
                  peace of mind knowing your home is in capable and caring
                  hands.
                </p>
              </div>
              <div className="row   m-auto p-ab p-ab-top">
                <div className="col-md-2 responsive-brimg  m-auto p-1 text-center  rdiu2">
                  <img
                    width={50}
                    height={50}
                    src="..\assests\icons8-expert-48.png"
                  />
                  <p className="grndclr boldt ">Experts Only </p>
                </div>
                <div className="col-md-2 responsive-brimg  m-auto  p-1 text-center rdiu2">
                  <img
                    width={50}
                    height={50}
                    src="..\assests\icons8-house-48.png"
                  />
                  <p className="grndclr boldt ">Fully Equipped </p>
                </div>
                <div className="col-md-2 responsive-brimg  m-auto text-center p-1 rdiu2">
                  <img
                    width={50}
                    height={50}
                    src="..\assests\icons8-business-team-61.png"
                  />
                  <p className="grndclr boldt ">No Subcontract </p>
                </div>
              </div>
            </div>
          </div>

          <Modal show={subModel} onHide={handleClose} size="lg">
            <div className="row p-4">
              <div className="row p-2">
                <div className="col-md-11">
                  <span>Select the subcategory</span>
                </div>
                <div className="col-md-1" onClick={() => setsubModel(false)}>
                  <img
                    width={25}
                    height={25}
                    src="..\assests\cancel1.png"
                    alt=""
                  />
                </div>
              </div>
              {isLoading ? (
                <div className="col-md-2 m-auto  ">
                  {" "}
                  <ColorRing
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    colors={[
                      "#e15b64",
                      "#f47e60",
                      "#f8b26a",
                      "#abbd81",
                      "#849b87",
                    ]}
                  />
                </div>
              ) : (
                <div className="row m-auto mt-3 justify-content-center">
                  {filtersub.map((item) => (
                    <div className="col-md-3  text-align-center subcss modacnt">
                      <Link
                        className="linksty"
                        to="/servicedetails"
                        state={{ subcategory: item?.subcategory }}
                        key={item.subcategory}
                      >
                        <img
                          className="mt-2 brd"
                          src={`http://api.thevucare.com/subcat/${item.subcatimg}`}
                          width="100%"
                          height="100px"
                          alt=""
                        />
                        <p className="p-1 text-black linksty widthsub ">
                          {item.subcategory}
                        </p>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Modal>
          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>What service are you looking for?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Please select the service you are interested in</p>
              {category.reverse()?.map((ele) => (
                <Form.Control
                  readOnly
                  className={`m-2 ${
                    selectedService === ele.category
                      ? "selected"
                      : "not-selected"
                  }`}
                  onClick={() => handleServiceSelection(ele.category)}
                  value={ele.category}
                />
              ))}
            </Modal.Body>
            <Modal.Footer>
              <Button
                className="col-md-2"
                variant="secondary"
                onClick={handleClose}
              >
                Close
              </Button>
              {selectedService && (
                <Button variant="primary" onClick={handleSubmit}>
                  Submit
                </Button>
              )}
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
}
