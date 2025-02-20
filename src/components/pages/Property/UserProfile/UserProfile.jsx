import { useEffect } from 'react';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetUserProfileDetails } from '../../../../store/slices/propertyManagementSlice/propertyManagementSlice';
import MapLoader from '../../../Loader/MapLoader';

const UserProfile = () => {
    const { userId } = JSON.parse(localStorage.getItem('user'))
    const { isLoading, userProfileDetails } = useSelector((state) => state.PropertyMangementReducer)
    // console.log('[userProfileDetails]',userProfileDetails)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { pathname } = useLocation()
    // Format date function
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const editProfileHandler = () => {
        navigate(`/dashboard/profile/edit/${userId}`)
    }


    useEffect(() => {
        dispatch(GetUserProfileDetails(userId))
    }, [userId, pathname])

    return (
        isLoading ? (
            <div className='h-100 d-flex justify-content-center align-items-center'>
                <MapLoader />
            </div>
        ) : (
            <div className="container mt-5 " >
                <div className='d-flex mb-4 justify-content-between'>
                    <h1 className="mb-0 side-heading">User Profile</h1>
                    <button className='btn bg-blue-new-clr border-0 text-white' onClick={editProfileHandler}>Edit Profile</button>
                </div>
                <div className="card">
                    <div className="card-body">
                        <div className="row pt-3">
                            {/* Left Column - Basic Information */}
                            <div className="col-md-6">
                                <div className="card mb-4">
                                    <div className="card-header">
                                        <h4>Basic Information</h4>
                                    </div>
                                    <div className="card-body">
                                        <div className="mb-3">
                                            <label className="fw-bold">Name:</label>
                                            <p>{userProfileDetails?.name}</p>
                                        </div>
                                        <div className="mb-3">
                                            <label className="fw-bold">Email:</label>
                                            <p>{userProfileDetails?.email}</p>
                                        </div>
                                        <div className="mb-3">
                                            <label className="fw-bold">Phone:</label>
                                            <p>{userProfileDetails?.phone_number}</p>
                                        </div>
                                        <div className="mb-3">
                                            <label className="fw-bold">Date of Birth:</label>
                                            <p>{formatDate(userProfileDetails?.dob)}</p>
                                        </div>
                                        <div className="mb-3">
                                            <label className="fw-bold">Address:</label>
                                            <p>{userProfileDetails?.address}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Additional Details */}
                            <div className="col-md-6">
                                <div className="card mb-4">
                                    <div className="card-header">
                                        <h4>Additional Details</h4>
                                    </div>
                                    <div className="card-body">
                                        <div className="mb-3">
                                            <label className="fw-bold">Income Level:</label>
                                            <p>{userProfileDetails?.income_level}</p>
                                        </div>
                                        <div className="mb-3">
                                            <label className="fw-bold">Role:</label>
                                            <p className="text-capitalize">{userProfileDetails?.role}</p>
                                        </div>
                                        <div className="mb-3">
                                            <label className="fw-bold">Email Verified:</label>
                                            <p>{formatDate(userProfileDetails?.email_verified_at)}</p>
                                        </div>
                                        <div className="mb-3">
                                            <label className="fw-bold">Contact Email:</label>
                                            <p>{userProfileDetails?.contact_email}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Media Section */}
                        <div className="card mb-4 social-media-section">
                            <div className="card-header">
                                <h4>Social Media Profiles</h4>
                            </div>
                            <div className="card-body user-profile">
                                <div className="d-flex gap-3">
                                    {userProfileDetails?.social_media_profiles?.map((profile, index) => (
                                        <a
                                            key={index}
                                            href={profile}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn social_icons"
                                        >
                                            {profile.includes('facebook') && <FaFacebook className="me-2" />}
                                            {profile.includes('twitter') && <FaTwitter className="me-2" />}
                                            {profile.includes('linkedin') && <FaLinkedin className="me-2" />}
                                            {profile.split('/').pop()}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Financial Information */}
                        <div className="card">
                            <div className="card-header">
                                <h4>Financial Information</h4>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="fw-bold">Bankruptcy Status:</label>
                                            <p className="">{userProfileDetails?.bankruptcy_details}</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="fw-bold">Liens Status:</label>
                                            <p className="">{userProfileDetails?.liens_details}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    )


};

export default UserProfile;