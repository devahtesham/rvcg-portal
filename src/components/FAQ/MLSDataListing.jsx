import React, { useEffect, useState } from "react";
import { Accordion, Container, Row, Col, InputGroup, Form } from "react-bootstrap";
import "./FAQSection.css"; // Import custom styles
import { FAQ_DATA } from "../../data/global";
import MLSCard from "./MLSCard";

import "./MLSListing.css"
import { useDispatch, useSelector } from "react-redux";
import { FilterMLSData, GetMLSData } from "../../store/slices/propertyManagementSlice/propertyManagementSlice";
import MapLoader from "../Loader/MapLoader";
import { BiSearch } from "react-icons/bi";
import CustomMLSFilter from "../../components/CustomMLSFilter";

const MLSDataListing = () => {

  const dispatch = useDispatch();
  const { isLoading, mlsData } = useSelector((state) => state.PropertyMangementReducer);

  console.log('[mlsData]', mlsData)
  const [searchVal, setSearchVal] = useState("")
  useEffect(() => {
    dispatch(GetMLSData())
  }, [])


  // CUSTOM DEBOUNCING
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('[searchVal]', searchVal)
      dispatch(GetMLSData(searchVal))
    }, 1000);

    return () => {
      clearInterval(timer)
    }
  }, [dispatch, searchVal])

  const searchPropertyHandler = (e) => {
    setSearchVal(e.target.value)
  }

  const handleFilterChange = (filters) => {
    dispatch(FilterMLSData(filters))
  }


  return (
    <>
      <div className="d-flex">
        <h1 className="side-heading mb-4 m-5">MLS Live Data</h1>
      </div>

      <Container className="mls-listing my-5">
        <Row className="justify-content-between mb-5">
          <Col sm={3}>
            <CustomMLSFilter onFilterChange={handleFilterChange} />

          </Col>
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
              {mlsData?.length && mlsData?.map((property, index) => (
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