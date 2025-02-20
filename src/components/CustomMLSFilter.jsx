// Filter.jsx
import React, { useState } from 'react';
import { FaFilter as FilterIcon } from "react-icons/fa";
import {
    Button,
    Form,
    Popover,
    OverlayTrigger,
    Row,
    Col
} from 'react-bootstrap';
import './CustomMLSFilter.css';

const MLSKeywords = [
    'Fix',
    'Upper',
    'Garage',
    'New Construction',
    'Furnished',
    'Ocean View',
    'Mountain View',
    'Gated Community'
];

const CustomMLSFilter = ({ onFilterChange }) => {

    const [show, setShow] = useState(false);
    const [tempFilters, setTempFilters] = useState({
        mlsStatus: '',
        daysOnMarket: { min: '', max: '' },
        listingPrice: { min: '', max: '' },
        keywords: []
    });

    const handleFilterChange = (field, value) => {
        const newFilters = { ...tempFilters };

        if (field === 'keywords') {
            if (newFilters.keywords.includes(value)) {
                newFilters.keywords = newFilters.keywords.filter(k => k !== value);
            } else {
                newFilters.keywords = [...newFilters.keywords, value];
            }
        } else if (field.includes('.')) {
            const [parent, child] = field.split('.');
            newFilters[parent] = {
                ...newFilters[parent],
                [child]: value
            };
        } else {
            newFilters[field] = value;
        }

        setTempFilters(newFilters);
    };

    const handleApply = () => {
        onFilterChange?.(tempFilters);
        setShow(false);
    };

    const filterContent = (
        <div className="filter-content">
            <Form>
                {/* MLS Status */}
                <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">MLS Status</Form.Label>
                    <Form.Select
                        value={tempFilters.mlsStatus}
                        onChange={(e) => handleFilterChange('mlsStatus', e.target.value)}
                    >
                        <option value="">Select Status</option>
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="sold">Sold</option>
                        <option value="failed">Failed</option>
                    </Form.Select>
                </Form.Group>

                {/* Days on Market */}
                <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Days on Market</Form.Label>
                    <Row>
                        <Col>
                            <Form.Control
                                type="number"
                                placeholder="Min"
                                value={tempFilters?.daysOnMarket?.min}
                                onChange={(e) => handleFilterChange('daysOnMarket.min', e.target.value)}
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                type="number"
                                placeholder="Max"
                                value={tempFilters?.daysOnMarket?.max}
                                onChange={(e) => handleFilterChange('daysOnMarket.max', e.target.value)}
                            />
                        </Col>
                    </Row>
                </Form.Group>

                {/* Listing Price */}
                <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Listing Price</Form.Label>
                    <Row>
                        <Col>
                            <Form.Control
                                type="number"
                                placeholder="Min"
                                value={tempFilters?.listingPrice?.min}
                                onChange={(e) => handleFilterChange('listingPrice.min', e.target.value)}
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                type="number"
                                placeholder="Max"
                                value={tempFilters?.listingPrice?.max}
                                onChange={(e) => handleFilterChange('listingPrice.max', e.target.value)}
                            />
                        </Col>
                    </Row>
                </Form.Group>

                {/* MLS Keywords */}
                <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">MLS Keywords</Form.Label>
                    <div className="keywords-grid">
                        {MLSKeywords.map((keyword) => (
                            <Form.Check
                                key={keyword}
                                type="checkbox"
                                id={`keyword-${keyword}`}
                                label={keyword}
                                checked={tempFilters?.keywords?.includes(keyword)}
                                onChange={() => handleFilterChange('keywords', keyword)}
                            />
                        ))}
                    </div>
                </Form.Group>

                {/* Apply Button */}
                <div className="d-grid">
                    <Button
                       className='bg-main-clr border-0'
                        onClick={handleApply}
                    >
                        Apply Filters
                    </Button>
                </div>
            </Form>
        </div>
    );

    return (
        <OverlayTrigger
            show={show}
            onToggle={setShow}
            trigger="click"
            placement="bottom-start"
            overlay={
                <Popover id="filter-popover" className="filter-popover">
                    {filterContent}
                </Popover>
            }
        >
            <Button
                variant="outline-secondary"
                className="filter-button  mb-xl-0 mb-3"
            >
                <FilterIcon size={18} />
                <span className="ms-2">Filter</span>
            </Button>
        </OverlayTrigger>
    );
};

export default CustomMLSFilter;