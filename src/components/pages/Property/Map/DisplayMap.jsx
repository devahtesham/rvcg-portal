import React, { useContext, useEffect, useRef, useState } from 'react'
import "./Map.css"
import amcActive from "../../../../assets/img/amcHouse1.png"
import { Col, Dropdown, Form, FormControl, InputGroup, Row } from 'react-bootstrap';

import { PropertyContext } from '../../../../context/PropertyContext';
import MapLoader from '../../../Loader/MapLoader';
import { useDispatch, useSelector } from 'react-redux';
import { FilterMapListing, GetAllCitiesForMap, GetAllProperties, GetPropertyTypes } from '../../../../store/slices/propertyManagementSlice/propertyManagementSlice';
import { BiSearch } from 'react-icons/bi';
import SearchLoader from '../../../Loader/SearchLoader';
import { DropDownComp } from '../../../bootstrap';
import { BATHROOMS, BEDROOMS, cleanPriceVal, DEFAULT_LAT, DEFAULT_LONG, priceOptions } from '../../../../data/global';
import { SlLocationPin } from "react-icons/sl";



const DisplayMap = () => {
    const dispatch = useDispatch()
    const [isMapLoading, setIsMapLoading] = useState(false)    // specially for map
    const {
        zoomOnMap,
        displayMapObj,
        isLoading,
        setDisplayMapObj,
        isSearchLoading
    } = useContext(PropertyContext)
    // for optimizing renders on every key 
    const [isSearchModalShow, setIsSearchModalShow] = useState(false)
    const searchModalRef = useRef()
    const { propertyTypes } = useSelector((state) => state.PropertyMangementReducer)
    const [allCities, setAllCities] = useState([])


    // filters
    const [query, setQuery] = useState({});
    const [filterPropertyType, setFilterPropertyType] = useState("")
    const [filterBed, setFilterBed] = useState("")
    const [filterBath, setFilterBath] = useState("")

    const [selectedPrice, setSelectedPrice] = useState("$0");
    const [customPrice, setCustomPrice] = useState("");



    useEffect(() => {
        dispatch(GetAllProperties())
        dispatch(GetPropertyTypes())
        dispatch(GetAllCitiesForMap())
            .then((response) => {
                setAllCities(response.payload)
            })
    }, [])



    useEffect(() => {
        setIsMapLoading(true)
        // console.log("i am working .....")
        // Load the Google Maps API
        const script = document.createElement('script');
        script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCWBr0Oe8wbx8_a9pnY2ljNMY69YIff45g&libraries=places&language=en&callback=initMap";
        script.defer = true;
        script.setAttribute('loading', 'async')
        document.head.appendChild(script);

        // Initialize the map in the callback function (initMap)
        setTimeout(() => {
            initMap([]);
        }, 2500)

        return () => {
            // Clean up the script when the component unmounts
            document.head.removeChild(script);
        };
    }, []);

    let map;

    // Initialize the map
    function initMap(allProperty, currentLat, currentLong) {
        setIsMapLoading(false)
        map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: currentLat ? +currentLat : DEFAULT_LAT, lng: currentLong ? +currentLong : DEFAULT_LONG }, // San Fracisco
            zoom: 13, // update this too
            mapTypeControl: true,
            mapTypeId: google.maps.MapTypeId.SATELLITE
        });

        const styles = JSON.parse(`[{
    "featureType": "all",
    "elementType": "geometry.fill",
    "stylers": [{
        "weight": "2.00"
    }]
},
{
    "featureType": "all",
    "elementType": "geometry.stroke",
    "stylers": [{
        "color": "#9c9c9c"
    }]
},
{
    "featureType": "all",
    "elementType": "labels.text",
    "stylers": [{
        "visibility": "on"
    }]
},
{
    "featureType": "administrative",
    "elementType": "labels.text",
    "stylers": [{
        "visibility": "off"
    }]
},
{
    "featureType": "administrative.locality",
    "elementType": "labels.text",
    "stylers": [{
        "visibility": "on"
    }]
},
{
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [{
        "color": "#777777"
    }]
},
{
    "featureType": "administrative.neighborhood",
    "elementType": "labels.text.fill",
    "stylers": [{
            "visibility": "on"
        },
        {
            "color": "#777777"
        }
    ]
},
{
    "featureType": "landscape",
    "elementType": "all",
    "stylers": [{
        "color": "#f2f2f2"
    }]
},
{
    "featureType": "landscape",
    "elementType": "geometry.fill",
    "stylers": [{
            "color": "#eeeeee"
        },
        {
            "weight": "1.00"
        }
    ]
},
{
    "featureType": "landscape.man_made",
    "elementType": "geometry.fill",
    "stylers": [{
        "color": "#dddddd"
    }]
},
{
    "featureType": "landscape.natural.landcover",
    "elementType": "geometry.fill",
    "stylers": [{
            "visibility": "on"
        },
        {
            "color": "#d1dbd2"
        }
    ]
},
{
    "featureType": "landscape.natural.terrain",
    "elementType": "geometry.fill",
    "stylers": [{
            "visibility": "on"
        },
        {
            "color": "#d1dbd2"
        }
    ]
},
{
    "featureType": "poi",
    "elementType": "all",
    "stylers": [{
        "visibility": "off"
    }]
},
{
    "featureType": "poi",
    "elementType": "geometry.fill",
    "stylers": [{
            "visibility": "on"
        },
        {
            "color": "#ddddde"
        }
    ]
},
{
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [{
            "visibility": "on"
        },
        {
            "color": "#d1dbd2"
        }
    ]
},
{
    "featureType": "road",
    "elementType": "all",
    "stylers": [{
            "saturation": -100
        },
        {
            "lightness": 45
        }
    ]
},
{
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [{
            "color": "#ffffff"
        },
        {
            "weight": "1"
        }
    ]
},
{
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [{
        "color": "#777777"
    }]
},
{
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": [{
            "color": "#ffffff"
        },
        {
            "visibility": "off"
        }
    ]
},
{
    "featureType": "road.highway",
    "elementType": "all",
    "stylers": [{
        "visibility": "simplified"
    }]
},
{
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [{
            "visibility": "on"
        },
        {
            "color": "#ffffff"
        }
    ]
},
{
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [{
            "visibility": "on"
        },
        {
            "color": "#ffffff"
        },
        {
            "weight": "1.00"
        }
    ]
},
{
    "featureType": "road.highway",
    "elementType": "labels.icon",
    "stylers": [{
        "visibility": "off"
    }]
},
{
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.fill",
    "stylers": [{
        "visibility": "off"
    }]
},
{
    "featureType": "road.arterial",
    "elementType": "geometry.fill",
    "stylers": [{
            "visibility": "on"
        },
        {
            "color": "#ffffff"
        },
        {
            "weight": "0.75"
        }
    ]
},
{
    "featureType": "road.arterial",
    "elementType": "labels.icon",
    "stylers": [{
        "visibility": "off"
    }]
},
{
    "featureType": "road.local",
    "elementType": "geometry.fill",
    "stylers": [{
            "visibility": "on"
        },
        {
            "color": "#ffffff"
        },
        {
            "weight": "0.75"
        }
    ]
},
{
    "featureType": "transit",
    "elementType": "all",
    "stylers": [{
        "visibility": "off"
    }]
},
{
    "featureType": "transit.line",
    "elementType": "geometry.fill",
    "stylers": [{
            "visibility": "on"
        },
        {
            "color": "#a7a7a7"
        },
        {
            "weight": "0.75"
        }
    ]
},
{
    "featureType": "water",
    "elementType": "all",
    "stylers": [{
            "color": "#46bcec"
        },
        {
            "visibility": "on"
        }
    ]
},
{
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [{
        "color": "#a5b7d3"
    }]
},
{
    "featureType": "water",
    "elementType": "labels.text",
    "stylers": [{
        "visibility": "off"
    }]
},
{
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [{
        "color": "#070707"
    }]
},
{
    "featureType": "water",
    "elementType": "labels.text.stroke",
    "stylers": [{
        "color": "#ffffff"
    }]
}
        ]`)

        map.setOptions({ styles })

        // setting icons for simple and AMC houses
        const customMarkerIcons = {
            amcHouse: {
                url: amcActive,
                size: new google.maps.Size(40, 40),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(20, 40),
            }
        };
        console.log('[allProperty]', allProperty)

        allProperty.length > 0 && allProperty.forEach(house => {
            const marker = new google.maps.Marker({
                position: { lat: +house.latitude, lng: +house.longitude },
                map: map,
                title: `$${house.price}`,
                animation: google.maps.Animation.DROP,
                icon: customMarkerIcons.amcHouse
            });

            // Create an info window for each marker
            const infoWindow = new google.maps.InfoWindow({
                content: `
                        <div id="info-content">
                            <div class="modal-property-details">
                                <div class="modal-heading">
                                    <h2>PROPERTY DETAILS</h2>
                                </div>
                                <div class="modal-description ms-3">
                                    <div class="mb-2 modal-description-feature"><span class="modal-description-label">Address: </span> <span class="modal-description-value">${house.address}</span></div>
                                    <div class="mb-2 modal-description-feature"><span class="modal-description-label">Price: </span> <span class="modal-description-value">${house.price}</span></div>
                                    <div class="mb-2 modal-description-feature"><span class="modal-description-label">Bathrooms: </span> <span class="modal-description-value">${house.bathrooms}</span></div>
                                    <div class="mb-2 modal-description-feature"><span class="modal-description-label">Bedrooms: </span> <span class="modal-description-value">${house.bedrooms}</span></div>
                                </div>
                            </div>
                            <div class="text-end mb-2 me-2">
                                <a href="/dashboard/display-details/${house.id}" class='modal-more-detail-text'>More Detail</a>
                            </div>
                        </div>
                        `
            });

            // Show info window when marker is clicked
            marker.addListener("click", () => {
                let extraModal = document.querySelectorAll(".gm-style-iw.gm-style-iw-c");
                if (extraModal.length > 0) {
                    extraModal.forEach((modal) => {
                        modal.remove()
                    })
                }
                infoWindow.open(map, marker);
            });
        });

        setDisplayMapObj(map)
        // console.log('map',typeof map);
        setIsMapLoading(false)

        // // Add markers for each house
    }

    // function for search property
    const searchPropertyHandler = (e) => {
        let value = e.target.value;
        console.log("Search:", value);
        if (value) {
            setIsSearchModalShow(true)          // open search dropdown list
            setQuery(value);

            const results = allCities.filter((city) =>
                city.city_name.toLowerCase().includes(value.toLowerCase())
            );

            setAllCities(results);
        } else {
            // when you clear the input
            setIsSearchModalShow(false)
            setQuery("")
            dispatch(GetAllCitiesForMap())
                .then((response) => {
                    setAllCities(response.payload)
                })
                .catch((error) => { })
        }

    }

    // for getting latitude and longitude
    const getLatLong = (lat, long) => {
        zoomOnMap(displayMapObj, lat, long)
    }


    const handleSelect = (price) => {
        setCustomPrice("")
        if (price === "Any Price") {
            setCustomPrice(""); // Enable manual input
        }
        setSelectedPrice(price);
    };

    const handleCustomPriceChange = (event) => {
        setCustomPrice(event.target.value);
        // console.log("Custom Price:", customPrice);
    };

    const applyFilter = () => {
        const city = query.id
        const propertyType = filterPropertyType
        const price = customPrice ? customPrice : cleanPriceVal(selectedPrice)
        const bed = filterBed
        const bath = filterBath

        const objToSend = {
            city,
            propertyType,
            price,
            bed,
            bath
        }

        dispatch(FilterMapListing(objToSend))
            .then((response) => {
                const filteredListing = response.payload
                initMap(filteredListing, query.latitude, query.longitude)
            })
            .then((error) => { })

    }
    const resetFilter = () => {
        console.log("I am callinmg ")
        setQuery({
            ...query,
            city_name:""
        })
        setFilterPropertyType("")
        setCustomPrice("")
        setSelectedPrice("$0")
        setFilterBed("")
        setFilterBath("")

        initMap([])
    }

    // console.log('[allCities]',allCities)
    return (
        <>
            <Row className='mt-5 align-items-center'>
                <Col lg={3}>
                    <div className='d-flex align-items-center justify-content-lg-between justify-content-md-around justify-content-between'>
                        <div className={`property-search-box-container`}>
                            <InputGroup className="property-search-input">
                                <Form.Control
                                    placeholder="Search ..."
                                    aria-label="Search"
                                    aria-describedby=""
                                    className='search'
                                    onChange={searchPropertyHandler}
                                    value={query.city_name}
                                />
                                <span className='property-search-icon'><BiSearch size={20} /></span>
                            </InputGroup>
                            <div className='search-suggession-wrapper'>
                                <div className={`search-suggession-inner ${!isSearchModalShow && "hidden"}`} ref={searchModalRef}>
                                    {
                                        isSearchLoading ? (
                                            <div className='w-100 h-100 d-flex justify-content-center align-items-center text-white'>
                                                <div className='d-flex align-items-center gap-2'>
                                                    <SearchLoader /> <h6 className='m-0 loader-text'>Searching ...</h6>
                                                </div>
                                            </div>
                                        )
                                            : (
                                                allCities.length > 0 ? allCities.map((city, index) => (
                                                    <div
                                                        key={index}
                                                        className='c-pointer property-names m-0 d-flex align-items-center gap-2 pb-1'
                                                        onClick={() => {
                                                            // getLatLong(index, city.lat, city.long)
                                                            setIsSearchModalShow(false)
                                                            setQuery(city)
                                                        }}  >
                                                        <span>
                                                            <SlLocationPin size={25} />
                                                        </span>
                                                        <div className=''>
                                                            <h5 className='mb-1'>{city?.city_name}</h5>
                                                            <h6 className='mb-0'>City</h6>
                                                        </div>
                                                    </div>
                                                )) : <div className='d-flex justify-content-center align-items-center h-100'><h4 className=''>No Result Found !</h4></div>

                                            )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col lg={2}>
                    <div className='swimming-pool'>
                        <DropDownComp
                            label={"Property Type"}
                            options={propertyTypes.length ? propertyTypes.map(item => { return { label: item[1], value: item[0] } }) : []}
                            name="property_type_id"
                            className='p-3'
                            onChange={(e) => { setFilterPropertyType(e.target.value) }}
                            value={filterPropertyType}
                        />
                    </div>
                </Col>
                <Col lg={2}>
                    <div className='custom-price-filter'>
                        {/* <PriceFilter /> */}
                        <div className="">
                            <Dropdown onSelect={handleSelect}>
                                <Dropdown.Toggle variant="outline-primary" className="w-100 py-2">
                                    {selectedPrice}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="w-100">
                                    {priceOptions.map((price, index) => (
                                        <Dropdown.Item key={index} eventKey={price}>
                                            {price}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>

                            {/* Show input field if "Any Price" is selected */}
                            {selectedPrice === "Any Price" && (
                                <InputGroup className="mt-2">
                                    <InputGroup.Text>$</InputGroup.Text>
                                    <FormControl
                                        type="number"
                                        placeholder="Enter any price"
                                        value={customPrice}
                                        onChange={handleCustomPriceChange}
                                    />
                                </InputGroup>
                            )}
                        </div>
                    </div>
                </Col>
                <Col lg={1}>
                    <div className='swimming-pool'>
                        <DropDownComp 
                        label={"Bed"} 
                        options={BEDROOMS} 
                        name="property_type_id" 
                        className='p-3' 
                        onChange={(e) => { setFilterBed(e.target.value) }} 
                        value={filterBed}
                        />
                    </div>
                </Col>
                <Col lg={1}>
                    <div className='swimming-pool'>
                        <DropDownComp value={filterBath} label={"Bath"} options={BATHROOMS} name="property_type_id" className='p-3' onChange={(e) => { setFilterBath(e.target.value) }} />
                    </div>
                </Col>
                <Col lg={3}>
                    <div className='d-flex align-items-center gap-2'>
                        <button type='button' className='btn btn-primary w-25' onClick={applyFilter}>Apply</button>
                        <button type='button' className='btn btn-warning w-25 btn-warning' onClick={resetFilter}>Reset</button>
                    </div>
                </Col>
            </Row>
            <section className='display-map mt-3 main-section position-relative d-flex justify-content-center align-items-center mx-xl-0 mx-4'>
                <div id="map" className=''></div>
                {
                    isLoading || isMapLoading && <MapLoader />
                }
            </section>
        </>
    )
}

export default DisplayMap