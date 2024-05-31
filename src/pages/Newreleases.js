import React from "react";
import Layout from "../components/Layout/Layout";
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "../styles/textbookgallery.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { API } from "../utils/request";
const Newreleases = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const getAllProduct = async () => {
    try {
      const { data } = await API.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };
  const isNewProduct = (p) => {
    // Convert the creation date string to a Date object
    const creationDate = new Date(p.createdAt);
    const timeDifference = new Date() - creationDate;
    const differenceInDays = timeDifference / (1000 * 3600 * 24);
    // Return true if the product is less than or equal to 3 days old, otherwise false
    return differenceInDays <= 30;
  };
  return (
    <>
      <Layout>
        <div className="textbook">
          <div className="hero-shop">
            <div className="container">
              <div className="row justify-content-between">
                <div className="col-lg-5">
                  <div className="intro-excerpt-shop">
                    <h2>
                      New
                      <span className="us ms-1">
                        <b>Releases</b>
                      </span>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="textbook-body"> */}
          {/* <div className="col-md-12">
              <Carousel
                swipeable={false}
                draggable={false}
                responsive={responsive}
                infinite={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                itemClass="carousel-item-width-40-px"
                renderButtonGroupOutside={true}
                arrows={true}
                autoPlay={true}
                autoPlaySpeed={2000}
                customLeftArrow={<div className="custom-left-arrow"></div>}
                customRightArrow={<div className="custom-right-arrow"></div>}
              >
                {products.map((p, index) => (
                  <div className="card-1 m-4" key={p._id}>
                    {isNewProduct(p) && (
                      <span className="badge-new" style={{ marginTop: "9px" }}>
                        <strong className="new">New</strong>
                      </span>
                    )}
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-homepage"
                      alt={p.name}
                      onClick={() => navigate(`/product/${p.slug}`)}
                    />
                  </div>
                ))}
              </Carousel>
            </div> */}
          <div className="mt-5">
            <div className="col-md-10 product-shop">
              <div className="row row-cols-1 row-cols-md-3">
                {products?.slice(0, 30).map((product, index) => (
                  <div className="col mb-4" key={product._id}>
                    <div className="card-8 ms-2 mb-2">
                      <div>
                        {isNewProduct(product) && (
                          <span className="new-badge-shop">
                            <strong className="new">New</strong>
                          </span>
                        )}
                      </div>
                      <img
                        src={`/api/v1/product/product-photo/${product._id}`}
                        className="card-img-top-product"
                        alt={product.name}
                        style={{ width: "170px", height: "auto" }}
                      />
                      <div className="card-body">
                        <div className="card-name-price">
                          <h5 className="card-title-product">{product.name}</h5>
                          <h5 className="card-desc">
                            {product.description.substring(0, 20)}...
                          </h5>
                          <h6 className="card-price">Price: {product.price}</h6>
                        </div>
                        {/* <div className="card-name-price">
                        <button
                          className="more-details ms-1"
                          onClick={() => navigate(`/product/${product.slug}`)}
                        >
                          More Details
                        </button>
                        <button
                          className="add-cart-butn ms-1 mb-4"
                          onClick={() => {
                            addItemCart(product);
                          }}
                        >
                          ADD TO CART
                        </button>
                      </div> */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="d-flex justify-content-center">
                {products.length === 0 && (
                  <div className="">
                    <h5 className="not-found">No record Found</h5>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </Layout>
    </>
  );
};

export default Newreleases;
