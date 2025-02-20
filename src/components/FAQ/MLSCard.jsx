import React from "react";
import { Card, Button } from "react-bootstrap";
import DEFAULT_HOME from "../../assets/img/default-img.png"

const MLSCard = ({ property }) => {
    return (
        <Card className="property-card mb-3 mx-1">
            <Card.Img variant="top" src={property.DefaultImage ? property.DefaultImage : DEFAULT_HOME} alt="Property Image" />
            <Card.Body>
                <Card.Title>${property.ListPrice.toLocaleString()}</Card.Title>
                <Card.Text>
                    <strong>{property.TotalBedrooms}</strong> Beds | <strong>{property.TotalBaths}</strong> Baths | <strong>{property.LivingSquareFeet}</strong> sqft
                </Card.Text>
                <Card.Text>
                    📍 {property.FullStreetAddress}, {property.CityName}, {property.StateCode}
                </Card.Text>
                <Card.Text>
                    🏡 Type: {property.PropertyTypeString}
                </Card.Text>
                <Button href={property.CustomUrl} target="_blank" className="text-white fw-600 bg-main-clr border-0">
                    View Details
                </Button>
            </Card.Body>
        </Card>
    );
};

export default MLSCard;