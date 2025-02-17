import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../components/pages/Home/Home'
import Login from '../components/pages/Login/Login'
import { DisplayDetails, EditDetails, AddProperty, PropertyType } from '../components/pages/Property'
import DisplayMap from '../components/pages/Property/Map/DisplayMap'
import CardListing from '../components/pages/Property/CardListing'
import AllPropertyListing from '../components/pages/Property/AllPropertyListing'
import PrivateRoute from '../PrivateRoutes/PrivateRoute'
import Dashboard from '../components/pages/Dashboard/Dashboard'
import PropertyListing from '../components/pages/PropertyListing/PropertyListing'
import AdminDashboard from '../components/pages/AdminDashboard/AdminDashboard'
import Users from '../components/pages/Users/Users'
import Roles from '../components/pages/Roles/Roles'
import AMC from '../components/pages/AMC/AMC'
import Services from '../components/pages/Services/Services'
import Tasks from '../components/pages/Tasks/Tasks'
import Reports from '../components/pages/Reports/Reports'
import Settings from '../components/pages/Settings/Settings'
import WorkOrder from '../components/pages/WorkOrder/WorkOrder'
import WorkOrderDetail from '../components/pages/WorkOrderDetail/WorkOrderDetail'
import Error from '../components/Error/Error'
import PropertyFeatures from '../components/pages/Property/PropertyFeatures'
import PropertyStatus from '../components/pages/Property/PropertyStatus'
import Leads from '../components/pages/Property/Leads'
import LeadSources from '../components/pages/Property/LeadsSources'
import LeadsDetail from '../components/pages/Property/LeadsDetail'
import LeadTypes from '../components/pages/Property/LeadsTypes'
import AllAdminUsers from '../components/pages/Property/AllAdminUsers'
import Packages from '../components/pages/Property/Packages'
import PackageItems from '../components/pages/Property/PackageItems'
import Chats from '../components/pages/Property/Chats'
import OffersListing from '../components/pages/Property/OffersListing'
import EmailListing from '../components/pages/Property/EmailListing'
import EmailDetails from '../components/pages/Property/EmailDetails'
import TestComp from '../components/TestComp'
import UserProfile from '../components/pages/Property/UserProfile/UserProfile'
import EditProfile from '../components/pages/Property/UserProfile/EditProfile'
import UserLogs from '../components/pages/Property/UserLogs'
import UserLogDetail from '../components/pages/Property/UserLogDetail'
import ARVCalculator from '../components/pages/Property/PropertyCalculators/ARVCalculator'
import ROICalculator from '../components/pages/Property/PropertyCalculators/ROICalculator'
import OfferDetails from '../components/pages/Property/OfferDetails'
import FavouritePropertiesListing from '../components/pages/PropertyListing/FavouritePropertiesListing'
import PropertyStats from '../components/pages/PropertyListing/PropertyStats'
import VendorServices from '../components/pages/PropertyListing/VendorServices'
import SuccessPayment from '../components/payments/SuccessPayment/SuccessPayment'
import FailedPayment from '../components/payments/FailedPayment/FailedPayment'
import CheckoutPageSkipTrace from '../components/payments/CheckoutPageSkipTrace'
import VendorDetail from '../components/pages/Property/VendorDetail'
import FAQSection from '../components/FAQ/FAQ'
import MLSDataListing from '../components/FAQ/MLSDataListing'



const Router = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/test' element={<TestComp />} />
                <Route path='/payments/:id' element={<CheckoutPageSkipTrace />} />
                <Route path='/dashboard' element={<Dashboard />} >
                    {/* ==== start: listing */}
                    <Route path='property-listing' element={<PropertyListing />} />
                    <Route path='insights' element={<PropertyStats />} />
                    <Route path='favourites-properties' element={<FavouritePropertiesListing />} />
                    <Route path='map' element={<DisplayMap />} />
                    <Route path='add-property' element={<AddProperty />} />
                    <Route path='display-details/:id' element={<DisplayDetails />} />
                    <Route path='edit-details/:id' element={<EditDetails />} />
                    <Route path='property-type' element={<PropertyType />} />
                    <Route path='property-features' element={<PropertyFeatures />} />
                    <Route path='property-status' element={<PropertyStatus />} />
                    <Route path='leads' element={<Leads />} />
                    <Route path='leads/:id' element={<LeadsDetail />} />
                    <Route path='vendor-services/:id' element={<VendorDetail />} />
                    <Route path='leads-sources' element={<LeadSources />} />
                    <Route path='leads-types' element={<LeadTypes />} />
                    <Route path='packages' element={<Packages />} />
                    <Route path='package-features' element={<PackageItems />} />
                    <Route path='messages' element={<Chats />} />
                    <Route path='offers' element={<OffersListing />} />
                    <Route path='offers/:id' element={<OfferDetails />} />
                    <Route path='email-campaign' element={<EmailListing />} />
                    <Route path='email/:id' element={<EmailDetails />} />
                    <Route path='profile/view/:id' element={<UserProfile />} />
                    <Route path='profile/edit/:id' element={<EditProfile />} />
                    {/* ==== end: listing */}

                    <Route path='admin-dashboard' element={<AdminDashboard />} />
                    <Route path='users' element={<AllAdminUsers />} />
                    <Route path='user-logs' element={<UserLogs />} />
                    <Route path='user-logs/:id' element={<UserLogDetail />} />

                    <Route path='calculator/arv' element={<ARVCalculator />} />
                    <Route path='calculator/roi' element={<ROICalculator />} />

                    <Route path='roles' element={<Roles />} />
                    <Route path='amc' element={<AMC />} />
                    <Route path='services' element={<Services />} />
                    <Route path='tasks' element={<Tasks />} />
                    <Route path='reports' element={<Reports />} />
                    <Route path='settings' element={<Settings />} />
                    <Route path='work-order' element={<WorkOrder />} />
                    <Route path='work-order/:id' element={<WorkOrderDetail />} />

                    <Route path='vendor-services' element={<VendorServices />} />
                    <Route path='payment-success' element={<SuccessPayment />} />
                    <Route path='payment-fail' element={<FailedPayment />} />
                    <Route path='faq' element={<FAQSection />} />
                    <Route path='mls' element={<MLSDataListing />} />

                </Route>
                <Route element={<PrivateRoute />}>
                    {/* <Route path='/home' element={<Home />}>
                        <Route path='listing' element={<AllPropertyListing />} />
                        <Route path='map' element={<DisplayMap />} />
                        <Route path='addProperty' element={<AddProperty />} />
                        <Route path='displayDetails/:id' element={<DisplayDetails />} />
                        <Route path='editDetails/:id' element={<EditDetails />} />
                    </Route> */}

                    {/* New version including dashboard screens */}
                </Route>
                <Route path='*' element={<Error />} />
            </Routes>
        </>
    )
}

export default Router