import React, { useContext, useDeferredValue, useState } from 'react'
import CardListing from './CardListing'
import TableListing from './TableListing'
import "./AllPropertyListing.css"
import { BiSearch } from "react-icons/bi"
import { Container, Card, Row, Col, InputGroup, Form } from 'react-bootstrap'
import { HiOutlineFilter } from "react-icons/hi";
import { HiMiniArrowsUpDown } from "react-icons/hi2"
import { FiDownload } from "react-icons/fi"
import { RiDeleteBack2Fill } from "react-icons/ri"
import { ImTable2 } from "react-icons/im"
import { GiHamburgerMenu } from "react-icons/gi"
import ListingWrapper from './ListingWrapper/ListingWrapper'
import { PropertyContext } from '../../../context/PropertyContext'
import { errorNotify, successNotify } from '../../../Toastify/Toastify'
import { DropDownComp } from '../../bootstrap'
import { TOOLTIP_TEXT } from '../../../data'

const AllPropertyListing = () => {
    const [searchPropertyInput, setSearchPropertyInput] = useState("")
    const [isCardDisplay, setIsCardDisplay] = useState(false)
    const { getPropertyListingBySearching, checkedProperties, getAllPropertyListingForTable, deleteAllCheckedProperties, setCheckedProperties, downloadAllCheckedProperties } = useContext(PropertyContext)

    // for download all check properties
    const downloadAllPropertiesHandler = () => {
        if (checkedProperties.length < 1) {
            errorNotify("Select atleast 1 property ❗")
        } else {
            // FOR DELETE
            downloadAllCheckedProperties(checkedProperties)
            setCheckedProperties([])

            // uncheck all the checked proiperties  < ======= > CHECK IF NEEDED OR NOT AFTER HITTING AGAIN LISTING API < ========= >
            document.querySelectorAll(".property-checkbox").forEach((input) => {
                if (input.checked) {
                    input.checked = false
                }
            })
        }
    }

    // for delete all check properties
    const deleteAllPropertiesHandler = () => {
        if (checkedProperties.length < 1) {
            errorNotify("Select atleast 1 property ❗")
        } else {
            // FOR DELETE
            // console.log('Hit API and pass this array',checkedProperties)
            deleteAllCheckedProperties(checkedProperties).then((response) => {
                if (response.data) {
                    successNotify("Property deleted successfully !")
                    // FOR RENDERING UI AGAIN 
                    getAllPropertyListingForTable()
                    setCheckedProperties([])
                }
            })


            // uncheck all the checked proiperties  < ======= > CHECK IF NEEDED OR NOT AFTER HITTING AGAIN LISTING API < ========= >
            // document.querySelectorAll(".property-checkbox").forEach((input)=>{
            //     if(input.checked){
            //         input.checked = false
            //     }
            // })
        }
    }

    // search property
    // for optimizing renders on every key 
    const optimizedText = useDeferredValue(searchPropertyInput)


    const searchPropertyHandler = (e) => {
        let value = e.target.value;
        setSearchPropertyInput(value)
        if (value.length > 0) {
            // search api calling
            getPropertyListingBySearching({ "Search": optimizedText })
        } else {
            getPropertyListingBySearching({})
        }
    }

    const { remove, download, filter, mode, sort } = TOOLTIP_TEXT
    return (
        <div className='main-section'>
            {/* ----------- TOP BAR ----------- */}
            <ListingWrapper>
                <div className='top-bar-container'>
                    <Row className='justify-content-between flex-wrap align-items-center'>
                        <Col xl={7} lg={8}>
                            <div className='d-flex align-items-center gap-3 mt-2 ms-4 flex-wrap mt-lg-0 mt-3 mb-lg-0 mb-2'>
                                <div className={`property-search-box-container simple-search order-2`}>
                                    <InputGroup className="property-search-input">
                                        <Form.Control
                                            placeholder="Search ..."
                                            aria-label="Search"
                                            aria-describedby=""
                                            className='search'
                                            onChange={searchPropertyHandler}
                                            value={searchPropertyInput}
                                        />
                                    </InputGroup>
                                </div>
                                <div className={`property-search-box-container simple-search order-1`}>
                                    {/* Project, Tenant, Agent, Owner, Mobile */}
                                    <DropDownComp options={['Project', 'Tenant', 'Agent', 'Owner', 'Mobile']} name="" onChange="" />
                                </div>
                                <span className='order-1'><BiSearch size={20} color='#e60c0b' /></span>
                            </div>
                        </Col>
                        {/* icons */}
                        <Col lg={4} >
                            <div className='top-bar-icon-container d-flex justify-content-lg-between justify-content-center gap-lg-0 gap-sm-5 gap-4 align-items-center mt-lg-0 mt-3'>
                                <div className='top-bar-icon-btn filter-btn custom-tooltip'>
                                    <span class="tooltiptext d-xl-inline d-none">{filter}</span>
                                    <HiOutlineFilter size={21} color='#737373' />
                                </div>
                                <div className='top-bar-icon-btn sort-btn custom-tooltip'>
                                    <span class="tooltiptext d-xl-inline d-none">{sort}</span>
                                    <HiMiniArrowsUpDown size={21} color='#737373' />
                                </div>
                                <div className='top-bar-icon-btn download-btn custom-tooltip' onClick={downloadAllPropertiesHandler}>
                                    <span class="tooltiptext d-xl-inline d-none">{download}</span>
                                    <FiDownload size={21} color='#737373' />
                                </div>
                                <div className='top-bar-icon-btn delete-all-btn custom-tooltip' onClick={deleteAllPropertiesHandler}>
                                    <span class="tooltiptext d-xl-inline d-none">{remove}</span>
                                    <RiDeleteBack2Fill size={21} color='#737373' />
                                </div>
                                <div className='top-bar-icon-btn swapping-btn custom-tooltip' onClick={() => setIsCardDisplay(!isCardDisplay)}>
                                    <span class="tooltiptext d-xl-inline d-none">{mode}</span>
                                    {
                                        !isCardDisplay ? <ImTable2 size={21} color='#737373' /> : <GiHamburgerMenu size={21} color='#737373' />
                                    }

                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </ListingWrapper>
            {
                isCardDisplay ? <CardListing /> : <TableListing />
            }
        </div>
    )
}

export default AllPropertyListing