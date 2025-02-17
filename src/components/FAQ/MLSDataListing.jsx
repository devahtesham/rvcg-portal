import React, { useEffect } from "react";
import { Accordion, Container, Row, Col, InputGroup, Form } from "react-bootstrap";
import "./FAQSection.css"; // Import custom styles
import { FAQ_DATA } from "../../data/global";
import MLSCard from "./MLSCard";

import "./MLSListing.css"
import { useDispatch, useSelector } from "react-redux";
import { GetMLSData } from "../../store/slices/propertyManagementSlice/propertyManagementSlice";
import MapLoader from "../Loader/MapLoader";
import { BiSearch } from "react-icons/bi";

const MLSDataListing = () => {

  const dispatch = useDispatch();
  const { isLoading, mlsData } = useSelector((state) => state.PropertyMangementReducer)
  useEffect(() => {
    dispatch(GetMLSData())
  }, [])

  const searchPropertyHandler = () => {

  }
  return (
    <>
      <div className="d-flex">
        <h1 className="side-heading mb-4 m-5">MLS Live Data</h1>
      </div>
      
      <Container className="mls-listing my-5">
      <Row className="justify-content-end mb-5">
        <Col sm={3}>
          <Form>
            <InputGroup className="property-search-input">
              <Form.Control
                placeholder="Search ..."
                aria-label="Search"
                aria-describedby=""
                className='search'
                onChange={searchPropertyHandler}
              />
              <span className='property-search-icon'><BiSearch size={20} /></span>
            </InputGroup>

          </Form>

        </Col>
      </Row>
        {
          isLoading ? <div className='h-100 d-flex justify-content-center align-items-center'>
            <MapLoader />
          </div> : (
            <Row className="">
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
