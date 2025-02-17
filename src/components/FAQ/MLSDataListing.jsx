import React, { useEffect } from "react";
import { Accordion, Container, Row, Col } from "react-bootstrap";
import "./FAQSection.css"; // Import custom styles
import { FAQ_DATA } from "../../data/global";
import MLSCard from "./MLSCard";

import "./MLSListing.css"
import { useDispatch, useSelector } from "react-redux";
import { GetMLSData } from "../../store/slices/propertyManagementSlice/propertyManagementSlice";
import MapLoader from "../Loader/MapLoader";

const MLSDataListing = () => {

  const dispatch = useDispatch();
  const { isLoading, mlsData } = useSelector((state) => state.PropertyMangementReducer)
  useEffect(() => {
    dispatch(GetMLSData())
  }, [])

  return (
    <>
      <div className="d-flex">
        <h1 className="side-heading mb-4 m-5">MLS Live Data</h1>
      </div>
      <Container className="mls-listing my-5">
        {
          isLoading ? <div className='h-100 d-flex justify-content-center align-items-center'>
            <MapLoader />
          </div> : (
            <Row>
              {mlsData?.length && mlsData.map((property, index) => (
                <Col key={index} md={4} sm={6} xs={12} className="mb-4">
                  <MLSCard property={property} />
                </Col>
              ))}
            </Row>
          )
        }

      </Container>
    </>

  );
};

export default MLSDataListing;
