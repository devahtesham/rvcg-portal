import React, { useContext, useEffect, useRef, useState } from 'react'
import "./Map.css"
import Loader from '../../../Loader/Loader';
import { Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { BiSearch } from "react-icons/bi"
import { PropertyContext } from '../../../../context/PropertyContext';

const AddPropertyDetailsMap = (props) => {
    const {lat, lng} = props;
    const [isMapShow, setIsMapShow] = useState(false);
    const {initMap, setPointerOnMap, deleteMarkers, placeMarkerAndPanTo} = useContext(PropertyContext);

    useEffect(() => {
        // Load the Google Maps API
        const script = document.createElement('script');
        script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCWBr0Oe8wbx8_a9pnY2ljNMY69YIff45g&libraries=places&callback=initMap";
        script.defer = true;

        // Check if there is a script element in the head
        const scriptInHead = document.head.querySelector(`script[src="${script.src}"]`);
        if (!scriptInHead) {
            document.head.appendChild(script);
        }

        // Initialize the map in the callback function (initMap)
        setTimeout(() => {
            if ((typeof lat === typeof 3) || (typeof lng === typeof 3) || (typeof lat === typeof "3" && typeof lat === typeof "3")) {
                initMap(false,"","");
                setPointerOnMap(+lat, +lng)
                setIsMapShow(true)
            }
        }, 500)

        return () => {
            // Clean up the script when the component unmounts
            document.head.querySelectorAll(`script[src*="https://maps.googleapis.com"]`).forEach((item) => { document.head.removeChild(item) })
        };
    }, [lat, lng]);

    


    return (
        <section>
            <div id="addPropertyMap"></div>
            {/* <div id="info-window">
                <h3 id="house-title"></h3>
                <p id="house-description"></p>
            </div> */}
            {
                !isMapShow && <Loader />
            }
        </section>
    )
}

export default AddPropertyDetailsMap
