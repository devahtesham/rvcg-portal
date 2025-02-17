const dateFormatter = () => {
    let inputDate = "2023-09-07"
    // Parse the input date into a JavaScript Date object
    const parsedDate = new Date(inputDate);

    // Set the time to 06:34:02.148 and timezone to UTC
    parsedDate.setUTCHours(6);
    parsedDate.setUTCMinutes(34);
    parsedDate.setUTCSeconds(2);
    parsedDate.setUTCMilliseconds(148);

    // Format the parsed date in the desired format "2023-09-09T06:34:02.148Z"
    const formattedDate = parsedDate.toISOString();
    return formattedDate
}

export { dateFormatter }



export const formatDateForUI = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
}

export const displayTime = (dateString) => {
    if (dateString) {
        const date = new Date(dateString);

        const options = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true, // Ensures AM/PM format
        };

        return new Intl.DateTimeFormat('en-US', options).format(date);
    }
}


export const LEAD_HISTORY_STATUS = [
    { label: "Contacted", value: 'contacted' },
    { label: "No Response", value: 'no_response' },
    { label: "Interested", value: 'interested' },
    { label: "Rejected", value: 'rejected' },
]

export const LEAD_STATUS = [
    { label: "Open", value: 'open' },
    { label: "In Progress", value: 'in_progress' },
    { label: "Closed", value: 'closed' },
    { label: "Rejected", value: 'rejected' },
]

export const OFFER_STATUS = [
    { label: "Pending", value: 'Pending' },
    { label: "Accepted", value: 'Accepted' },
    { label: "Rejected", value: 'Rejected' }
]

export const USER_ACTIVATION_STATUS = [
    { label: "Active", value: 1 },
    { label: "In Active", value: 0 }
]

export const USER_INCOME_LEVEL = [
    { label: "Low", value: 'Low' },
    { label: "High", value: 'High' },
    { label: "Medium", value: 'Medium' }
]


export const BEDROOMS = [
    { label: "1", value: '1' },
    { label: "2", value: '2' },
    { label: "3", value: '3' },
    { label: "4", value: '4' },
    { label: "5", value: '5' },
    { label: "6", value: '6' },
    { label: "7", value: '7' },
    { label: "8", value: '8' },

]

export const BATHROOMS = [
    { label: "1", value: '1' },
    { label: "2", value: '2' },
    { label: "3", value: '3' },
    { label: "4", value: '4' },
    { label: "5", value: '5' },
    { label: "6", value: '6' },
    { label: "7", value: '7' },
    { label: "8", value: '8' },

]


export const LEAD_STATUS_ENUM = {
    open: "Open",
    in_progress: "In Progress",
    closed: "Closed",
    rejected: "Rejected"
}

export const priceOptions = [
    "$0", "$50K", "$100K", "$200K", "$300K", "$400K", "$500K", "$600K", "$700K", "$800K", "$900K", "Any Price"
];

export const DEFAULT_LAT = 37.80135026038151
export const DEFAULT_LONG = -122.37238799958239


export const USER_PROFILE_DUMMY_JSON = {
    "name": "John",
    "email": "johndosdssfdfe@example.co",
    "password": "password123",
    "password_confirmation": "password123",
    "phone_number": "+1234567890",
    "address": "123 Main St, Springfield, IL",
    "social_media_profiles": [
        "https://facebook.com/johndoe",
        "https://twitter.com/johndoe",
        "https://linkedin.com/in/johndoe"
    ],
    "referral_codes": [
        "eS3vSJObJo",
        "g7Efb3Lpum"
    ],
    "bankruptcy_details": "No bankruptcy history",
    "liens_details": "No liens",
    "contact_email": "contact@johndoe.com",
    "dob": "1990-01-01",
    "income_level": "High",
    "role": "user",
    "email_verified_at": "2023-10-01 12:00:00"
}


export const DUMMY_CITY_DATA = [
    {
        "id": 102,
        "city_name": "Chicago",
        "country_id": 185,
        "lat": 41.8781,
        "long": -87.6298,
        "created_at": "2025-02-11T12:29:55.000000Z",
        "updated_at": "2025-02-11T12:29:55.000000Z",
        "country": {
            "id": 185,
            "country_name": "United States of America",
            "created_at": "2025-01-10T05:01:29.000000Z",
            "updated_at": null
        }
    },
    {
        "id": 103,
        "city_name": "New York",
        "country_id": 185,
        "lat": 40.7128,
        "long": -74.0060,
        "created_at": "2025-02-12T08:12:46.000000Z",
        "updated_at": "2025-02-12T08:12:46.000000Z",
        "country": {
            "id": 185,
            "country_name": "United States of America",
            "created_at": "2025-01-10T05:01:29.000000Z",
            "updated_at": null
        }
    },
    {
        "id": 104,
        "city_name": "Los Angeles",
        "country_id": 185,
        "lat": 34.0522,
        "long": -118.2437,
        "created_at": "2025-02-12T08:13:01.000000Z",
        "updated_at": "2025-02-12T08:13:01.000000Z",
        "country": {
            "id": 185,
            "country_name": "United States of America",
            "created_at": "2025-01-10T05:01:29.000000Z",
            "updated_at": null
        }
    },
    {
        "id": 105,
        "city_name": "Houston",
        "country_id": 185,
        "lat": 29.7604,
        "long": -95.3698,
        "created_at": "2025-02-12T08:13:06.000000Z",
        "updated_at": "2025-02-12T08:13:06.000000Z",
        "country": {
            "id": 185,
            "country_name": "United States of America",
            "created_at": "2025-01-10T05:01:29.000000Z",
            "updated_at": null
        }
    },
    {
        "id": 106,
        "city_name": "Phoenix",
        "country_id": 185,
        "lat": 33.4484,
        "long": -112.0740,
        "created_at": "2025-02-12T08:13:10.000000Z",
        "updated_at": "2025-02-12T08:13:10.000000Z",
        "country": {
            "id": 185,
            "country_name": "United States of America",
            "created_at": "2025-01-10T05:01:29.000000Z",
            "updated_at": null
        }
    },
    {
        "id": 107,
        "city_name": "Philadelphia",
        "country_id": 185,
        "lat": 39.9526,
        "long": -75.1652,
        "created_at": "2025-02-12T08:13:14.000000Z",
        "updated_at": "2025-02-12T08:13:14.000000Z",
        "country": {
            "id": 185,
            "country_name": "United States of America",
            "created_at": "2025-01-10T05:01:29.000000Z",
            "updated_at": null
        }
    },
    {
        "id": 108,
        "city_name": "San Antonio",
        "country_id": 185,
        "lat": 29.4241,
        "long": -98.4936,
        "created_at": "2025-02-12T08:13:22.000000Z",
        "updated_at": "2025-02-12T08:13:22.000000Z",
        "country": {
            "id": 185,
            "country_name": "United States of America",
            "created_at": "2025-01-10T05:01:29.000000Z",
            "updated_at": null
        }
    },
    {
        "id": 109,
        "city_name": "San Diego",
        "country_id": 185,
        "lat": 32.7157,
        "long": -117.1611,
        "created_at": "2025-02-12T08:13:27.000000Z",
        "updated_at": "2025-02-12T08:13:27.000000Z",
        "country": {
            "id": 185,
            "country_name": "United States of America",
            "created_at": "2025-01-10T05:01:29.000000Z",
            "updated_at": null
        }
    },
    {
        "id": 110,
        "city_name": "Dallas",
        "country_id": 185,
        "lat": 32.7767,
        "long": -96.7970,
        "created_at": "2025-02-12T08:13:32.000000Z",
        "updated_at": "2025-02-12T08:13:32.000000Z",
        "country": {
            "id": 185,
            "country_name": "United States of America",
            "created_at": "2025-01-10T05:01:29.000000Z",
            "updated_at": null
        }
    },
    {
        "id": 111,
        "city_name": "San Jose",
        "country_id": 185,
        "lat": 37.3382,
        "long": -121.8863,
        "created_at": "2025-02-12T08:13:42.000000Z",
        "updated_at": "2025-02-12T08:13:42.000000Z",
        "country": {
            "id": 185,
            "country_name": "United States of America",
            "created_at": "2025-01-10T05:01:29.000000Z",
            "updated_at": null
        }
    }
]


export const cleanPriceVal = (price) => {
    // $300
    if (price.includes("$")) {
        const symbolPrice = price.split("$")[1];
        return symbolPrice.substring(0, symbolPrice.length - 1)
    }
}

export const HIGH_ROI_PROPERTY_DATA = [
    {
        "id": 119,
        "title": "1 bed Appartment",
        "description": "South Uni San Jose",
        "city_id": 171,
        "country_id": 185,
        "property_type_id": 1,
        "property_status_id": 1,
        "listing_date": "2025-02-13 00:00:00",
        "price": "100000.00",
        "square_foot": "1500.00",
        "parking": null,
        "year_built": 2025,
        "lot_size": "10.00",
        "longitude": "-121.87863349914551",
        "latitude": "37.33167558501772",
        "school_district": null,
        "walkability_score": null,
        "crime_rate": null,
        "roi": 98.89937169811321,
        "monthly_rent": "120000.00",
        "cap_rate": null,
        "geolocation_coordinates": null,
        "zip_code": "1121",
        "area": null,
        "gdrp_agreement": null,
        "address": "test 2 San Jsose",
        "bedrooms": 1,
        "bathrooms": 1,
        "half_bathrooms": null,
        "arv": 210833.334,
        "gross_margin": null,
        "estimated_roi": null,
        "repair_cost": "1000.00",
        "wholesale_fee": "5000.00",
        "price_per_square_feet": "160.00",
        "user_id": 1,
        "created_at": "2025-02-13T20:56:19.000000Z",
        "updated_at": "2025-02-13T20:56:19.000000Z",
        "is_featured": 1,
        "is_approved": true,
        "moa": 141583.3338
    },
    {
        "id": 122,
        "title": "1 bed Appartment",
        "description": "South Uni San Jose",
        "city_id": 171,
        "country_id": 185,
        "property_type_id": 1,
        "property_status_id": 1,
        "listing_date": "2025-02-13 00:00:00",
        "price": "80000.00",
        "square_foot": "1100.00",
        "parking": null,
        "year_built": 2025,
        "lot_size": "10.00",
        "longitude": "-121.87863349914551",
        "latitude": "37.33167558501772",
        "school_district": null,
        "walkability_score": null,
        "crime_rate": null,
        "roi": 71.790124,
        "monthly_rent": "120000.00",
        "cap_rate": null,
        "geolocation_coordinates": null,
        "zip_code": "1121",
        "area": null,
        "gdrp_agreement": null,
        "address": "test 2 San Jsose",
        "bedrooms": 1,
        "bathrooms": 1,
        "half_bathrooms": null,
        "arv": 154611.1116,
        "gross_margin": null,
        "estimated_roi": null,
        "repair_cost": "5000.00",
        "wholesale_fee": "5000.00",
        "price_per_square_feet": "120.00",
        "user_id": 1,
        "created_at": "2025-02-13T20:59:04.000000Z",
        "updated_at": "2025-02-13T20:59:04.000000Z",
        "is_featured": 1,
        "is_approved": true,
        "moa": 98227.77812
    },
    {
        "id": 114,
        "title": "1 bed Appartment",
        "description": "South Uni San Jose",
        "city_id": 171,
        "country_id": 185,
        "property_type_id": 1,
        "property_status_id": 1,
        "listing_date": "2025-02-13 00:00:00",
        "price": "100000.00",
        "square_foot": "1000.00",
        "parking": null,
        "year_built": 2025,
        "lot_size": "10.00",
        "longitude": "-121.87863349914551",
        "latitude": "37.33167558501772",
        "school_district": null,
        "walkability_score": null,
        "crime_rate": null,
        "roi": 22.22222260869564,
        "monthly_rent": "120000.00",
        "cap_rate": null,
        "geolocation_coordinates": null,
        "zip_code": "1121",
        "area": null,
        "gdrp_agreement": null,
        "address": "test 2 San Jsose",
        "bedrooms": 1,
        "bathrooms": 1,
        "half_bathrooms": null,
        "arv": 140555.55599999998,
        "gross_margin": null,
        "estimated_roi": null,
        "repair_cost": "10000.00",
        "wholesale_fee": "5000.00",
        "price_per_square_feet": "120.00",
        "user_id": 1,
        "created_at": "2025-02-13T20:14:48.000000Z",
        "updated_at": "2025-02-13T20:14:48.000000Z",
        "is_featured": 1,
        "is_approved": true,
        "moa": 83388.88919999998
    },
    {
        "id": 121,
        "title": "1 bed Appartment",
        "description": "South Uni San Jose",
        "city_id": 171,
        "country_id": 185,
        "property_type_id": 1,
        "property_status_id": 1,
        "listing_date": "2025-02-13 00:00:00",
        "price": "130000.00",
        "square_foot": "1200.00",
        "parking": null,
        "year_built": 2025,
        "lot_size": "10.00",
        "longitude": "-121.87863349914551",
        "latitude": "37.33167558501772",
        "school_district": null,
        "walkability_score": null,
        "crime_rate": null,
        "roi": 20.476190857142853,
        "monthly_rent": "120000.00",
        "cap_rate": null,
        "geolocation_coordinates": null,
        "zip_code": "1121",
        "area": null,
        "gdrp_agreement": null,
        "address": "test 2 San Jsose",
        "bedrooms": 1,
        "bathrooms": 1,
        "half_bathrooms": null,
        "arv": 168666.6672,
        "gross_margin": null,
        "estimated_roi": null,
        "repair_cost": "5000.00",
        "wholesale_fee": "5000.00",
        "price_per_square_feet": "150.00",
        "user_id": 1,
        "created_at": "2025-02-13T20:58:21.000000Z",
        "updated_at": "2025-02-13T20:58:21.000000Z",
        "is_featured": 1,
        "is_approved": true,
        "moa": 108066.66703999999
    }
]

export const LOW_ROI_DATA = [
    {
        "id": 132,
        "title": "Luxurious Villa in Downtown",
        "price": "500000.00",
        "roi": -2.912621359223301,
        "city": {
            "city_name": "Dallas"
        }
    },
    {
        "id": 128,
        "title": "Luxurious Villa in Downtown",
        "price": "500000.00",
        "roi": -2.912621359223301,
        "city": {
            "city_name": "Dallas"
        }
    },
    {
        "id": 130,
        "title": "5 Bed Appart",
        "price": "150000.00",
        "roi": -11.607142857142858,
        "city": {
            "city_name": "San Francisco"
        }
    },
    {
        "id": 129,
        "title": "5 Bed Villa Townhouse",
        "price": "170000.00",
        "roi": -18.852459016393443,
        "city": {
            "city_name": "San Francisco"
        }
    },
    {
        "id": 115,
        "title": "1 bed Appartment",
        "price": "200000.00",
        "roi": -25.32608695652174,
        "city": {
            "city_name": "San Jose"
        }
    },
    {
        "id": 118,
        "title": "1 bed Appartment",
        "price": "300000.00",
        "roi": -28.9114238410596,
        "city": {
            "city_name": "San Jose"
        }
    },
    {
        "id": 116,
        "title": "1 bed Appartment",
        "price": "300000.00",
        "roi": -37.77173913043478,
        "city": {
            "city_name": "San Jose"
        }
    },
    {
        "id": 117,
        "title": "1 bed Appartment",
        "price": "400000.00",
        "roi": -49.48529411764706,
        "city": {
            "city_name": "San Jose"
        }
    }
];

export const OWNERSHIP_TYPE = [
    { label: "Freehold", value: 'Freehold' },
    { label: "Leasehold", value: 'Leasehold' },
    { label: "Joint Ownership", value: 'Joint Ownership' },
]


export const FAQ_DATA = [
    {
        category: "Property Management",
        question: "How can I list my property on the platform?",
        answer: "You can list your property by navigating to the 'Add Property' section in your dashboard. Fill in the required details, upload images, set pricing, and submit for approval."
    },
    {
        category: "Lead Management",
        question: "How does the lead management system work?",
        answer: "Our lead management system captures inquiries from buyers and sellers, allowing you to track their activity, follow up via email or phone, and convert them into successful deals."
    },
    {
        category: "Messaging & Chat",
        question: "Is there a way to chat with potential buyers or sellers?",
        answer: "Yes! Our chat module enables real-time messaging between buyers and sellers for seamless communication."
    },
    {
        category: "Email Campaigns",
        question: "Can I send email campaigns to my leads?",
        answer: "Absolutely! Our platform allows you to create and send bulk email campaigns to your leads to keep them engaged with the latest property listings and offers."
    },
    {
        category: "Skip Trace",
        question: "What is Skip Trace, and how does it help?",
        answer: "Skip Trace helps you find property owner details, including contact information, making it easier to reach out to potential sellers or buyers."
    },
    {
        category: "MLS Data",
        question: "Does the platform integrate with MLS data?",
        answer: "Yes, our system fetches real-time MLS data, ensuring you have access to the latest property listings and market trends."
    },
    {
        category: "User Management",
        question: "Can I manage multiple users on my account?",
        answer: "Yes, our platform allows admin users to manage agents, brokers, and other team members with role-based access."
    }
];




