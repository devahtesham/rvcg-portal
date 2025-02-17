/* DURATION
- monthly
- yearly
- weekly
*/


// for property listing
export { default as ListingImg } from "../assets/img/listing-img.jpg"
const PROPERTY__LISTING = [
    {
        id: 1,
        si_No: "001",
        property_features: [
            {
                label: "door",
                value: "5"
            },
            {
                label: "pool",
                value: "6"
            },
            {
                label: "balcony",
                value: "2"
            },
        ]
    },
    {
        id: 2,
        si_No: "002",
        property_features: [
            {
                label: "door",
                value: "5"
            },
            {
                label: "pool",
                value: "6"
            },
            {
                label: "balcony",
                value: "2"
            },


        ]
    },
    {
        id: 3,
        si_No: "003",
        property_features: [
            {
                label: "door",
                value: "5"
            },
            {
                label: "pool",
                value: "6"
            },
            {
                label: "balcony",
                value: "2"
            },


        ]
    },
    {
        id: 4,
        si_No: "004",
        property_features: [
            {
                label: "door",
                value: "5"
            },
            {
                label: "pool",
                value: "6"
            },
            {
                label: "balcony",
                value: "2"
            },


        ]
    },
    {
        id: 4,
        si_No: "004",
        property_features: [
            {
                label: "door",
                value: "5"
            },
            {
                label: "pool",
                value: "6"
            },
            {
                label: "balcony",
                value: "2"
            },


        ]
    },
    {
        id: 4,
        si_No: "004",
        property_features: [
            {
                label: "door",
                value: "5"
            },
            {
                label: "pool",
                value: "6"
            },
            {
                label: "balcony",
                value: "2"
            },


        ]
    },
    {
        id: 4,
        si_No: "004",
        property_features: [
            {
                label: "door",
                value: "5"
            },
            {
                label: "pool",
                value: "6"
            },
            {
                label: "balcony",
                value: "2"
            },


        ]
    },
    {
        id: 4,
        si_No: "004",
        property_features: [
            {
                label: "door",
                value: "5"
            },
            {
                label: "pool",
                value: "6"
            },
            {
                label: "balcony",
                value: "2"
            },


        ]
    },
    {
        id: 4,
        si_No: "004",
        property_features: [
            {
                label: "door",
                value: "5"
            },
            {
                label: "pool",
                value: "6"
            },
            {
                label: "balcony",
                value: "2"
            },


        ]
    },
    {
        id: 4,
        si_No: "004",
        property_features: [
            {
                label: "door",
                value: "5"
            },
            {
                label: "pool",
                value: "6"
            },
            {
                label: "balcony",
                value: "2"
            },


        ]
    },
    {
        id: 4,
        si_No: "004",
        property_features: [
            {
                label: "door",
                value: "5"
            },
            {
                label: "pool",
                value: "6"
            },
            {
                label: "balcony",
                value: "2"
            },


        ]
    },
    {
        id: 4,
        si_No: "004",
        property_features: [
            {
                label: "door",
                value: "5"
            },
            {
                label: "pool",
                value: "6"
            },
            {
                label: "balcony",
                value: "2"
            },


        ]
    },
]

const CLIENTS = [
    {
        Type: "Owner"
    },
    {
        Type: "Tenant"
    },
    {
        Type: "Agent"
    }


]

const TOOLTIP_TEXT =
{
    filter: "filter",
    sort: "sort",
    download: "download",
    remove: "delete",
    mode: "Change Mode",
}


// dahsboard side navigation
// navaigation icons


const SIDE_NAVIGATION = [
    {
        id: 1,
        summary: "Property Management",
        isDropdown: true,
        type: "Accordian",
        path: "",
        details: [
            {
                summary: "Property Listing",
                isDropdown: false,
                icon: "",
                mainHeading: "Property Listing",
                type: "Route",
                path: "/dashboard/property-listing",
            },
            {
                summary: "Listing Map",
                isDropdown: false,
                icon: "",
                mainHeading: "Listing Map",
                type: "Route",
                path: "/dashboard/map",
            },
            {
                summary: "Insights By AI",
                isDropdown: false,
                icon: "",
                mainHeading: "Insights By AI",
                type: "Route",
                path: "/dashboard/insights",
            },
            {
                summary: "Favourites",
                isDropdown: false,
                icon: "",
                mainHeading: "Favourites",
                type: "Route",
                path: "/dashboard/favourites-properties",
            },

            {
                summary: "Property Types",
                isDropdown: false,
                icon: "",
                mainHeading: "Property Types",
                type: "Route",
                path: "/dashboard/property-type",
            },
            {
                summary: "Property Features",
                isDropdown: false,
                icon: "",
                mainHeading: "Property Features",
                type: "Route",
                path: "/dashboard/property-features",
            },
            {
                summary: "Property Statuses",
                isDropdown: false,
                icon: "",
                mainHeading: "Property Statuses",
                type: "Route",
                path: "/dashboard/property-status",
            },

        ]

    },
    {
        id: 9,
        summary: "MLS Live Data",
        isDropdown: true,
        type: "Accordian",
        path: "",
        details: [
            {
                summary: "MLS Live Data",
                isDropdown: false,
                icon: "",
                mainHeading: "MLS Live Data",
                type: "Route",
                path: "/dashboard/mls",
            },
        ]

    },
    {
        id: 2,
        summary: "User Management",
        isDropdown: true,
        type: "Accordian",
        path: "",
        details: [

            {
                summary: "Users",
                isDropdown: false,

                mainHeading: "Users",
                type: "Route",
                path: "/dashboard/users",
            },
            {
                summary: "User Logs",
                isDropdown: false,

                mainHeading: "All Users",
                type: "Route",
                path: "/dashboard/user-logs",
            },
        ]

    },
    {
        id: 3,
        summary: "Leads Management",
        isDropdown: true,
        type: "Accordian",
        path: "",
        details: [
            {
                summary: "Leads",
                isDropdown: false,
                icon: "",
                mainHeading: "Leads",
                type: "Route",
                path: "/dashboard/leads",
            },
            {
                summary: "Lead Sources",
                isDropdown: false,
                icon: "",
                mainHeading: "Lead Sources",
                type: "Route",
                path: "/dashboard/leads-sources",
            },
            {
                summary: "Lead Types",
                isDropdown: false,
                icon: "",
                mainHeading: "Types",
                type: "Route",
                path: "/dashboard/leads-types",
            }
        ]

    },
    {
        id: 4,
        summary: "Website Management",
        isDropdown: true,
        type: "Accordian",
        path: "",
        details: [
            {
                summary: "Packages",
                isDropdown: false,
                icon: "",
                mainHeading: "Packages",
                type: "Route",
                path: "/dashboard/packages",
            },
            {
                summary: "Package Features",
                isDropdown: false,
                icon: "",
                mainHeading: "Package Features",
                type: "Route",
                path: "/dashboard/package-features",
            },
        ]

    },
    {
        id: 5,
        summary: "Messages System",
        isDropdown: true,
        type: "Accordian",
        path: "",
        details: [
            {
                summary: "Chats",
                isDropdown: false,
                icon: "",
                mainHeading: "Chats",
                type: "Route",
                path: "/dashboard/messages",
            }
        ]

    },
    {
        id: 6,
        summary: "Offers",
        isDropdown: true,
        type: "Accordian",
        path: "",
        details: [
            {
                summary: "Website Offers",
                isDropdown: false,
                icon: "",
                mainHeading: "Website Offers",
                type: "Route",
                path: "/dashboard/offers",
            }
        ]

    },
    {
        id: 7,
        summary: "Email Campaigns",
        isDropdown: true,
        type: "Accordian",
        path: "",
        details: [
            {
                summary: "All Emails",
                isDropdown: false,
                icon: "",
                mainHeading: "All Emails",
                type: "Route",
                path: "/dashboard/email-campaign",
            }
        ]

    },
    {
        id: 8,
        summary: "FAQ",
        isDropdown: true,
        type: "Accordian",
        path: "",
        details: [
            {
                summary: "FAQ",
                isDropdown: false,
                icon: "",
                mainHeading: "FAQ",
                type: "Route",
                path: "/dashboard/faq",
            }
        ]

    }


]


const VENDOR_SERVICES = {
    id: 9,
    summary: "Vendor Services",
    isDropdown: true,
    type: "Accordian",
    path: "",
    details: [
        {
            summary: "Vendor Services",
            isDropdown: false,
            icon: "",
            mainHeading: "Vendor Services",
            type: "Route",
            path: "/dashboard/vendor-services",
        }
    ]
};

export function getNavigationByRole() {
    // Deep clone the navigation to avoid mutations
    const { role } = JSON.parse(localStorage.getItem('user'))
    const navigation = JSON.parse(JSON.stringify(SIDE_NAVIGATION));

    // Items to hide for non-admin roles
    const hiddenPaths = new Set([
        '/dashboard/property-type',
        '/dashboard/property-features',
        '/dashboard/property-status'
    ]);

    const hiddenSections = new Set([
        'User Management',
        'Email Campaigns',
        'Website Management'
    ]);

    // Additional sections to hide for vendor role
    const vendorHiddenSections = new Set([
        'User Management',
        'Email Campaigns',
        'Website Management',
        // 'Property Management'
    ]);

    const hiddenDetails = new Set([
        'Lead Sources',
        'Lead Types',
        'Property Types',
        'Property Features',
        'Property Statuses'
    ]);

    const filterNavigation = (nav) => {
        return nav
            .filter(section => !hiddenSections.has(section.summary))
            .map(section => {
                if (section.details) {
                    const filteredDetails = section.details.filter(detail =>
                        !hiddenPaths.has(detail.path) &&
                        !hiddenDetails.has(detail.summary)
                    );
                    return {
                        ...section,
                        details: filteredDetails
                    };
                }
                return section;
            })
            .filter(section => !section.details || section.details.length > 0);
    };

    switch (role) {
        case 'admin':
            return [...navigation];

        case 'investor':
            return [...filterNavigation(navigation)];

        case 'vendor':
            return [
                ...navigation
                    .filter(section => !vendorHiddenSections.has(section.summary))
                    .map(section => {
                        if (section.details) {
                            // Filter out lead sources and types for vendor
                            const filteredDetails = section.details.filter(detail =>
                                !hiddenPaths.has(detail.path) &&
                                !hiddenDetails.has(detail.summary)
                            );
                            return {
                                ...section,
                                details: filteredDetails
                            };
                        }
                        return section;
                    })
                    .filter(section => !section.details || section.details.length > 0),
                VENDOR_SERVICES
            ];

        case 'user':
            return filterNavigation(navigation);

        default:
            return navigation;
    }
}




const MAIN_HEADINGS = {
    "/dashboard/map": "Listing Map",
    "/dashboard/property-listing": "Property Listing",
    "/dashboard/property-type": "Property Types",
    "/dashboard/admin-dashboard": "DashBoard",
    "/dashboard/users": "Users",
    "/dashboard/user-logs": "All Users",
    "/dashboard/roles": "Roles",
    "/dashboard/amc": "AMC",
    "/dashboard/work-order": "Work Order",
    "/dashboard/services": "Services",
    "/dashboard/tasks": "Tasks",
    "/dashboard/reports": "Reports",
    "/dashboard/settings": "Settings",
    "/dashboard/property-features": "Property Features",
    "/dashboard/property-status": "Property Status",
    "/dashboard/leads": "Leads",
    "/dashboard/leads-sources": "Leads Sources",
    "/dashboard/leads-types": "Leads Types",
    "/dashboard/packages": "Packages",
    "/dashboard/package-features": "Package Features",
    "/dashboard/messages": "Chats",
    "/dashboard/offers": "Website Offers",
    "/dashboard/email-campaign": "All Emails",
    "/dashboard/favourites-properties": "Favourites",
    "/dashboard/insights": "Insights By AI",

    "/dashboard/calculator/arv": "Calculate ARV (After Repair Value)",
    "/dashboard/calculator/roi": "Calculate ROI(Return On Investment)",
    "/dashboard/vendor-services": "Vendor Services",
}



export { PROPERTY__LISTING, CLIENTS, TOOLTIP_TEXT, SIDE_NAVIGATION, MAIN_HEADINGS }