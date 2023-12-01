<div className="container mrgn">
  <div className="row  medis3 medis m-auto">
    <div className="col-md-3  clr2 medis1 ">
      <div className="row  p-2 m-1 medis1 brclr">
        <div className="col-md-6  m-auto ">
          <p className="row fs-5   textsi fsd   clr3 boldt1 text-white">
            Our Motive Is To Make You
          </p>
        </div>
        <div className="col-md-5">
          <img
            className="crdbor brclr imgd firstcart imgs"
            src="..\assests\house.avif"
            alt=""
          />
        </div>
        <div>
          <p className="row fs-5 p-1 mtchan  textsi fsd  clr3 boldt1 text-white">
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
      <div className="col-md-2  medis2 clr2 clr3 crdbor p-3  m-auto pe-auto  cursor">
        <a onClick={() => filtercatsub(ele.category)}>
          <div className="row m-auto">
            <img
              className="col-md-6 imgsub "
              width={50}
              height={50}
              categoryImg
              src={`http://api.thevucare.com/category/${ele?.categoryImg}`}
              alt=""
            />{" "}
          </div>
          <div className="row m-auto">
            {" "}
            <p className="col-md-12   fnt14 textsi  boldt">{ele?.category}</p>
          </div>
        </a>
        {/* </Link> */}
      </div>
    ))}
  </div>
  <div className="row mt-5 slick-listsd">
    <h2 className="text-center boldt">Just For You</h2>
    <div className="row text-center">
      <button className="col-md-2 m-auto btnd clr3 clr2 yellw1 p-2 boldbtn">
        Newly Lounched
      </button>{" "}
    </div>

    <div className="row mt-3 ">
      <Slider {...justforyou}>
        {Banner.map((item) => (
          <div key={item._id} className="m-auto">
            <img
              className="col-md-11 m-auto "
              width={380}
              height={180}
              src={`http://api.thevucare.com/webBanner/${item.banner}`}
              alt=""
            />
          </div>
        ))}
      </Slider>
    </div>
  </div>
  <div className="row mt-5 slick-listsd">
    <h2 className="text-center boldt">Pest Control</h2>

    <div className="row mt-3 slick-listsd">
      <Slider {...pestControlSettings} className="slick-sliders">
        {categoryData
          .filter((item) => item.category.toLowerCase().includes("control"))
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
                  className=" shadow bg-white rounded "
                  alt=""
                />
                <p className="col-md-10 text-center m-auto p-2 boldt">
                  {item.subcategory}
                </p>
              </Link>
            </div>
          ))}
      </Slider>
    </div>
  </div>
  <div className="row mt-5">
    <Card className="borderrad">
      <img
        className="border1"
        src="..\assests\pest-control-services--1536x512.jpg"
        height={250}
      />
    </Card>
  </div>
</div>;
