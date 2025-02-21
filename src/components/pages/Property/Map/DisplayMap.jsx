import React, { useContext, useEffect, useRef, useState } from 'react'
import "./Map.css"
import amcActive from "../../../../assets/img/amcHouse1.png"
import { Button, Col, Dropdown, Form, FormControl, InputGroup, Row } from 'react-bootstrap';

import { PropertyContext } from '../../../../context/PropertyContext';
import MapLoader from '../../../Loader/MapLoader';
import { useDispatch, useSelector } from 'react-redux';
import { FilterMapListing, GetAllCitiesForMap, GetAllProperties, GetLeadType, GetPropertyTypes } from '../../../../store/slices/propertyManagementSlice/propertyManagementSlice';
import { BiSearch } from 'react-icons/bi';
import SearchLoader from '../../../Loader/SearchLoader';
import { CheckBoxComp, DropDownComp } from '../../../bootstrap';
import { BATHROOMS, BEDROOMS, cleanPriceVal, DEFAULT_LAT, DEFAULT_LONG, priceOptions } from '../../../../data/global';
import { SlLocationPin } from "react-icons/sl";
import { RxCross2 } from "react-icons/rx";



const DisplayMap = () => {
    const dispatch = useDispatch()
    const [isMapLoading, setIsMapLoading] = useState(false)
    const [other_features, setOtherFeatures] = useState([])    // specially for map
    const {
        isLoading,
        setDisplayMapObj,
        isSearchLoading
    } = useContext(PropertyContext)
    const [isLeadTypeDrawerOpen, setIsLeadTypeDrawerOpen] = useState(false)

    // Update the showRadii state to include all increments
    const [showRadii, setShowRadii] = useState({
        quarter: true,    // 0.25
        half: true,       // 0.50
        one: true,        // 1.0
        two: true,        // 2.0
        three: true,      // 3.0
        four: true,       // 4.0
        five: true        // 5.0
    });

    // for optimizing renders on every key 
    const [isSearchModalShow, setIsSearchModalShow] = useState(false)
    const searchModalRef = useRef()
    const { propertyTypes, leadTypes } = useSelector((state) => state.PropertyMangementReducer)
    const [allCities, setAllCities] = useState([])


    // filters
    const [query, setQuery] = useState({});
    const [filterPropertyType, setFilterPropertyType] = useState("")
    const [filterBed, setFilterBed] = useState("")
    const [filterBath, setFilterBath] = useState("")

    const [selectedPrice, setSelectedPrice] = useState("$0");
    const [customPrice, setCustomPrice] = useState("");



    useEffect(() => {
        dispatch(GetLeadType())
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
            mapTypeId: google.maps.MapTypeId.ROADMAP
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

            // Create a div to hold the marker and label
            const markerDiv = document.createElement('div');
            markerDiv.className = 'custom-marker';

            // Create the price label
            const priceLabel = new google.maps.Marker({
                position: { lat: +house.latitude, lng: +house.longitude },
                map: map,
                label: {
                    text: `$${Number(house.price).toLocaleString()}`,
                    className: 'price-label',
                    color: '#FFFFFF',
                    fontWeight: 'bold',
                    fontSize: '14px'
                },
                icon: {
                    url: amcActive,
                    size: new google.maps.Size(40, 40),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(20, 40),
                    labelOrigin: new google.maps.Point(20, -10) // Adjust this to position the label
                }
            });


            const marker = new google.maps.Marker({
                position: { lat: +house.latitude, lng: +house.longitude },
                map: map,
                title: `$${house.price}`,
                animation: google.maps.Animation.DROP,
                icon: customMarkerIcons.amcHouse
            });

            // Convert miles to meters for Google Maps circles
            const milesToMeters = (miles) => miles * 1609.34;

            // Update the radiusColors object with colors for each increment
            const radiusColors = {
                0.25: '#FF000040',  // Red
                0.5: '#FFA50040',   // Orange
                1: '#FFFF0040',     // Yellow
                2: '#00FF0040',     // Green
                3: '#0000FF40',     // Blue
                4: '#4B008240',     // Indigo
                5: '#80008040'      // Purple
            };

            // Create circles for different radii
            [0.25, 0.5, 1, 2, 3, 4, 5].forEach(radius => {

                if ((radius === 0.25 && showRadii.quarter) ||
                    (radius === 0.5 && showRadii.half) ||
                    (radius === 1 && showRadii.one) ||
                    (radius === 2 && showRadii.two) ||
                    (radius === 3 && showRadii.three) ||
                    (radius === 4 && showRadii.four) ||
                    (radius === 5 && showRadii.five)) {
                        
                    const circle = new google.maps.Circle({
                        strokeColor: radiusColors[radius].replace('40', '80'),
                        strokeOpacity: 0.8,
                        strokeWeight: 1,
                        fillColor: radiusColors[radius],
                        fillOpacity: 0.35,
                        map: map,
                        center: { lat: +house.latitude, lng: +house.longitude },
                        radius: milesToMeters(radius)
                    });

                    // Add hover effect
                    marker.addListener('mouseover', () => {
                        circle.setOptions({
                            fillOpacity: 0.5,
                            strokeWeight: 2
                        });
                    });

                    marker.addListener('mouseout', () => {
                        circle.setOptions({
                            fillOpacity: 0.35,
                            strokeWeight: 1
                        });
                    });

                    // Optional: Toggle circles visibility with marker click
                    marker.addListener('click', () => {
                        circle.setVisible(!circle.getVisible());
                    });
                }


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
            priceLabel.addListener("click", () => {
                let extraModal = document.querySelectorAll(".gm-style-iw.gm-style-iw-c");
                if (extraModal.length > 0) {
                    extraModal.forEach((modal) => {
                        modal.remove()
                    })
                }
                infoWindow.open(map, priceLabel);
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
            property_type: propertyType,
            price_max: price,
            bedrooms: bed,
            bathrooms: bath,
            lead_types_id: other_features
        }

        console.log('[objToSend]', objToSend)

        dispatch(FilterMapListing(objToSend))
            .then((response) => {
                const filteredListing = response.payload
                initMap(filteredListing, query.latitude, query.longitude)
            })
            .catch((error) => { })

    }

    useEffect(() => {

        applyFilter()

    }, [showRadii]);

    const resetFilter = () => {
        console.log("I am callinmg ")
        setQuery({
            ...query,
            city_name: ""
        })
        setFilterPropertyType("")
        setCustomPrice("")
        setSelectedPrice("$0")
        setFilterBed("")
        setFilterBath("")

        initMap([])
    }

    const openLeadTypeDrawer = () => {
        setIsLeadTypeDrawerOpen(true)
    }
    const closeLeadTypeDrawer = () => {
        setIsLeadTypeDrawerOpen(false)
    }


    const featuresCheckHandler = (e) => {
        console.log('[e.target.name]', Number(e.target.name))
        console.log('[e.target.checked]', e.target.checked)
        if (e.target.checked) {
            // add this id to the array
            setOtherFeatures([...other_features, Number(e.target.name)])
        } else {
            // remove this id from the array
            console.log('[other_features]', other_features)
            const filteredItems = other_features.filter(item => item !== Number(e.target.name));
            console.log('[filteredItems]', filteredItems)
            setOtherFeatures(filteredItems)
        }
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
                                                allCities?.length > 0 ? allCities.map((city, index) => (
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
                    <InputGroup
                        className="property-search-input"
                        onClick={openLeadTypeDrawer}
                        style={{ cursor: 'pointer' }}
                    >
                        <Form.Control
                            placeholder="Lead Type"
                            className='search'
                            style={{ pointerEvents: 'none' }}
                        />
                    </InputGroup>
                </Col>
                <Col lg={1}>
                    <div className='custom-price-filter'>
                        {/* <PriceFilter /> */}
                        <div className="">
                            <Dropdown onSelect={handleSelect}>
                                <Dropdown.Toggle className="w-100 py-2 bg-main-clr border-0">
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
                <Col lg={2}>
                    <div className='d-flex align-items-center gap-2'>
                        <button type='button' className='btn bg-main-clr text-white' onClick={applyFilter}>Apply</button>
                        <button type='button' className='btn bg-blue-new-clr text-white' onClick={resetFilter}>Reset</button>
                    </div>
                </Col>
            </Row>
            <section className='display-map mt-3 main-section position-relative d-flex justify-content-center align-items-center mx-xl-0 mx-4'>
                <div id="map" className=''></div>

                {/* // Update the control panel JSX */}
                <div className="radius-controls position-absolute" style={{ top: '10px', right: '10px', background: 'white', padding: '10px', borderRadius: '4px', boxShadow: '0 2px 6px rgba(0,0,0,0.3)' }}>
                    <div className="d-flex flex-column gap-2">
                        <Form.Check
                            type="checkbox"
                            label="0.25 mile radius"
                            checked={showRadii.quarter}
                            onChange={(e) => setShowRadii({ ...showRadii, quarter: e.target.checked })}
                        />
                        <Form.Check
                            type="checkbox"
                            label="0.5 mile radius"
                            checked={showRadii.half}
                            onChange={(e) => setShowRadii({ ...showRadii, half: e.target.checked })}
                        />
                        <Form.Check
                            type="checkbox"
                            label="1 mile radius"
                            checked={showRadii.one}
                            onChange={(e) => setShowRadii({ ...showRadii, one: e.target.checked })}
                        />
                        <Form.Check
                            type="checkbox"
                            label="2 mile radius"
                            checked={showRadii.two}
                            onChange={(e) => setShowRadii({ ...showRadii, two: e.target.checked })}
                        />
                        <Form.Check
                            type="checkbox"
                            label="3 mile radius"
                            checked={showRadii.three}
                            onChange={(e) => setShowRadii({ ...showRadii, three: e.target.checked })}
                        />
                        <Form.Check
                            type="checkbox"
                            label="4 mile radius"
                            checked={showRadii.four}
                            onChange={(e) => setShowRadii({ ...showRadii, four: e.target.checked })}
                        />
                        <Form.Check
                            type="checkbox"
                            label="5 mile radius"
                            checked={showRadii.five}
                            onChange={(e) => setShowRadii({ ...showRadii, five: e.target.checked })}
                        />
                    </div>
                </div>
                {
                    isLoading || isMapLoading && <MapLoader />
                }
            </section>

            {/* LEAD TYPE SELECTION DRAWER */}
            {

                <section className={`lead-type-drawer ${isLeadTypeDrawerOpen ? 'open' : ''}`}>
                    <div className='d-flex mt-4 ms-3 justify-content-between'>
                        <h2 className='side-heading'>Lead Type</h2>
                        <span onClick={closeLeadTypeDrawer} className='me-3 cursor-pointer'><RxCross2 size={25} /></span>
                    </div>
                    <Row className='flex-column p-4'>
                        {
                            leadTypes.length ? leadTypes.map((item, index) => {
                                return (
                                    <Col key={index} className="p-3">
                                        {/* */}
                                        <CheckBoxComp size={"19px"} id={item[1].type_name} label={item[1].type_name} name={item[0]} onChange={featuresCheckHandler} checked={other_features.includes(item[0]) ? true : false} />
                                    </Col>
                                )
                            }) : null
                        }
                    </Row>
                </section>

            }
        </>
    )
}

export default DisplayMap
