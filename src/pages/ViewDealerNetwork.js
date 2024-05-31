import Layout from "../components/Layout/Layout";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../utils/request";

const ViewDealerNetwork = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState("");
  const [dealerNetwork, setDealerNetwork] = useState([]);
  const [loading, setLoading] = useState(true);
  const [states, setStates] = useState([]);
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const stateParam = searchParams.get("state");
    setSelectedState(stateParam);
    fetchDealerNetwork(stateParam);
  }, [location]);

  const fetchDealerNetwork = async (state) => {
    try {
      const { data } = await API.get(`/api/v1/dealer/selected-state/${state}`);

      setDealerNetwork(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching dealer network data:", error);
      setLoading(false);
    }
  };
  const handleFilterState = (value) => {
    setSelectedState(value);
  };

  const getAllStates = async () => {
    try {
      const { data } = await API.get("/api/v1/dealerstate/get-state");
      if (data?.success) {
        setStates(data?.dealerState);
        console.log(data?.dealerState);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.log("Something went wrong");
    }
  };
  useEffect(() => {
    getAllStates();
  }, []);
  const handleFilterSelect = (selectedState) => {
    navigate(`/view-dealer-network?state=${selectedState}`);
  };
  return (
    <>
      <Layout>
        <div className="">
          <div className="executive-search-filter executive-custom-selects">
            <select
              className="executive-class-filter"
              style={{ textAlign: "center" }}
              onChange={(e) => handleFilterSelect(e.target.value)}
            >
              <option
                className="option"
                value={selectedState}
                selected={selectedState ? false : true}
              >
                Select State &#9660;
              </option>

              {states?.map((s) => (
                <option
                  key={s._id}
                  value={s._id}
                  selected={selectedState == s._id ? true : false}
                >
                  {s.state}
                </option>
              ))}
            </select>
          </div>
        </div>
        <h1 className="d-flex justify-content-center mt-4">Arrow Executives</h1>
        {loading ? (
          <p>Loading...</p>
        ) : dealerNetwork.length === 0 ? (
          <p className="d-flex justify-content-center">
            No dealers found for the selected state.
          </p>
        ) : (
          <ul>
            {/* //   <li key={dealer._id}>
            //     {dealer.dealername} - {dealer.location}
            //   </li> */}
            <div className="row row-cols-1 row-cols-md-3">
              {dealerNetwork.map((dealer) => (
                <div className="col mb-4" key={dealer._id}>
                  <div className="card-dealer ms-2 mb-2">
                    <img
                      src={`/api/v1/dealer/get-photo/${selectedState}`}
                      className="card-img-top-product"
                      alt={dealerNetwork.personname}
                      style={{ width: "170px", height: "auto" }}
                    />
                    <div className="card-body">
                      <div className="card-name-price">
                        <h5 className="card-title-product">
                          Name : {dealer.dealername}
                        </h5>
                        {/* <h5 className="card-desc">
                          {dealer.personname}
                        </h5> */}
                        <h5 className="card-desc">Email : {dealer.email}</h5>
                        <h5 className="card-desc">State : {dealer?.address}</h5>
                        <h5 className="card-desc">Contact : {dealer?.phone}</h5>
                        {/* <h6 className="card-price">
                        Price:{" "}
                        {product.price.toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </h6> */}
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
          </ul>
        )}
      </Layout>
    </>
  );
};

export default ViewDealerNetwork;
