import { useEffect, useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { ButtonComp } from '../../../bootstrap';
import { USER_ACTIVATION_STATUS, USER_INCOME_LEVEL } from '../../../../data/global';
import { useDispatch, useSelector } from 'react-redux';
import { GetUserProfileDetails, UpdateUserProfile } from '../../../../store/slices/propertyManagementSlice/propertyManagementSlice';
import { errorNotify, successNotify } from '../../../../Toastify/Toastify';
import { useLocation } from 'react-router-dom';

const EditProfile = () => {
    const { userId } = JSON.parse(localStorage.getItem('user'))
    const { isLoading, userProfileDetails } = useSelector((state) => state.PropertyMangementReducer)
    const dispatch = useDispatch()
    const { pathname } = useLocation()
    const [isPasswordFieldShow, setIsPasswordFieldShow] = useState(false)

    // console.log('[userProfileDetails]', userProfileDetails)

    useEffect(() => {
        dispatch(GetUserProfileDetails(userId))
    }, [dispatch, userId, pathname])

    useEffect(() => {
        setFormData({
            name: userProfileDetails?.name,
            email: userProfileDetails?.email,
            phone_number: userProfileDetails?.phone_number,
            address: userProfileDetails?.address,
            social_media_profiles: userProfileDetails?.social_media_profiles,
            referral_codes: userProfileDetails?.referral_code,
            bankruptcy_details: userProfileDetails?.bankruptcy_details,
            liens_details: userProfileDetails?.liens_details,
            contact_email: userProfileDetails?.contact_email,
            dob: userProfileDetails?.dob,
            income_level: userProfileDetails?.income_level,
            role: JSON.parse(localStorage.getItem('user'))?.role,
            is_active: userProfileDetails?.is_active
        })
    }, [
        userProfileDetails?.name,
        userProfileDetails?.email,
        userProfileDetails?.phone_number,
        userProfileDetails?.address,
        userProfileDetails?.social_media_profiles,
        userProfileDetails?.referral_code,
        userProfileDetails?.bankruptcy_details,
        userProfileDetails?.liens_details,
        userProfileDetails?.contact_email,
        userProfileDetails?.dob,
        userProfileDetails?.income_level,
        userProfileDetails?.is_active
    ])


    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        // password_confirmation:'',
        phone_number: '',
        address: '',
        social_media_profiles: [''],
        referral_codes: [''],
        bankruptcy_details: '',
        liens_details: '',
        contact_email: '',
        dob: '',
        income_level: '',
        role: JSON.parse(localStorage.getItem('user'))?.role,
        is_active: 1
    });

    const [errors, setErrors] = useState({});

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    // Handle array field changes (social media profiles and referral codes)
    const handleArrayChange = (index, value, field) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].map((item, i) => i === index ? value : item)
        }));
    };

    // Add new field to arrays
    const handleAddField = (field) => {
        setFormData(prev => ({
            ...prev,
            [field]: [...prev[field], '']
        }));
    };

    // Remove field from arrays
    const handleRemoveField = (index, field) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }));
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};

        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        // if (!formData.password) newErrors.password = 'Password is required';
        // if (!formData.phone_number) newErrors.phone_number = 'Phone number is required';
        return newErrors;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length === 0) {
            updateProfileHandler(formData);
        } else {
            setErrors(validationErrors);
        }
    };


    const updateProfileHandler = (formData) => {
        console.log("hello")
        const payload = {
            ...formData,
            is_active: +formData.is_active
        }

        dispatch(UpdateUserProfile({ id: userId, data: payload }))
            .unwrap()
            .then(() => {
                successNotify("Profile Updated Successfully !")
            })
            .catch((error) => {
                errorNotify(error)
            })



    }

    return (
        <div className="container mt-5">
            <div className='d-flex mb-4 justify-content-between'>
                <h1 className="mb-0 side-heading">Update Profile</h1>
            </div>
            <div className="card">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        {/* Basic Information */}
                        <div className="card mb-4">
                            <div className="card-header">
                                <h4>Basic Information</h4>
                            </div>
                            <div className="card-body">
                                <div className="row align-items-end">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Name *</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                            name="name"
                                            value={formData?.name}
                                            onChange={handleChange}
                                        />
                                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Email *</label>
                                        <input
                                            type="email"
                                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                            name="email"
                                            value={formData?.email}
                                            onChange={handleChange}
                                        />
                                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                    </div>
                                    <div className="col-md-5 mb-3">
                                        <label className="form-label">Phone Number *</label>
                                        <input
                                            type="tel"
                                            className={`form-control ${errors.phone_number ? 'is-invalid' : ''}`}
                                            name="phone_number"
                                            value={formData?.phone_number}
                                            onChange={handleChange}
                                        />
                                        {errors.phone_number && <div className="invalid-feedback">{errors.phone_number}</div>}
                                    </div>

                                    <div className="col-md-2 mb-3">
                                        <button type='button' className='btn btn-outline-primary' onClick={() => setIsPasswordFieldShow(true)}>Change Password</button>
                                    </div>

                                    {
                                        isPasswordFieldShow && (
                                            <>
                                                <div className="col-md-5 mb-3">
                                                    <label className="form-label">New Password *</label>
                                                    <input
                                                        type="password"
                                                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                                        name="password"
                                                        value={formData?.password}
                                                        onChange={handleChange}
                                                    />
                                                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                                </div>
                                                {/* <div className="col-md-3 mb-3">
                                                    <label className="form-label">New Password *</label>
                                                    <input
                                                        type="password"
                                                        className={`form-control`}
                                                        name="password"
                                                        value={formData?.password_confirmation}
                                                        onChange={handleChange}
                                                    />
                                                </div> */}
                                            </>
                                        )
                                    }

                                    {/* <div className="col-md-6 mb-3">
                                        <label className="form-label">Confirm Password *</label>
                                        <input
                                            type="password"
                                            className={`form-control ${errors.password_confirmation ? 'is-invalid' : ''}`}
                                            name="password_confirmation"
                                            value={formData?.password_confirmation}
                                            onChange={handleChange}
                                        />
                                        {errors.password_confirmation && (
                                            <div className="invalid-feedback">{errors.password_confirmation}</div>
                                        )}
                                    </div> */}



                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Date of Birth</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="dob"
                                            value={formData?.dob}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="col-12 mb-3">
                                        <label className="form-label">Address</label>
                                        <textarea
                                            className="form-control"
                                            name="address"
                                            value={formData?.address}
                                            onChange={handleChange}
                                            rows="2"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Media Profiles */}
                        <div className="card mb-4">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <h4>Social Media Profiles</h4>
                                <button
                                    type="button"
                                    className="btn btn-sm btn-primary"
                                    onClick={() => handleAddField('social_media_profiles')}
                                >
                                    <FaPlus className="me-1" /> Add Profile
                                </button>
                            </div>
                            <div className="card-body">
                                {formData?.social_media_profiles?.map((profile, index) => (
                                    <div key={index} className="input-group mb-2">
                                        <input
                                            type="url"
                                            className="form-control"
                                            value={profile}
                                            onChange={(e) => handleArrayChange(index, e.target.value, 'social_media_profiles')}
                                            placeholder="Enter social media URL"
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-outline-danger"
                                            onClick={() => handleRemoveField(index, 'social_media_profiles')}
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Additional Information */}
                        <div className="card mb-4">
                            <div className="card-header">
                                <h4>Additional Information</h4>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Income Level</label>
                                        <select
                                            className="form-select"
                                            name="income_level"
                                            value={formData?.income_level}
                                            onChange={handleChange}
                                        >
                                            {
                                                USER_INCOME_LEVEL.map((item, i) => <option key={i} value={item.value}>{item.label}</option>)
                                            }
                                        </select>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Contact Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="contact_email"
                                            value={formData?.contact_email}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Bankruptcy Details</label>
                                        <textarea
                                            className="form-control"
                                            name="bankruptcy_details"
                                            value={formData?.bankruptcy_details}
                                            onChange={handleChange}
                                            rows="2"
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Liens Details</label>
                                        <textarea
                                            className="form-control"
                                            name="liens_details"
                                            value={formData?.liens_details}
                                            onChange={handleChange}
                                            rows="2"
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Role</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="role"
                                            value={formData?.role}
                                            onChange={handleChange}
                                            disabled
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Activation Status</label>
                                        <select
                                            className="form-select"
                                            name="is_active"
                                            value={formData?.is_active}
                                            onChange={handleChange}
                                        >
                                            {
                                                USER_ACTIVATION_STATUS.map((item, i) => <option key={i} value={item.value}>{item.label}</option>)
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Referral Codes */}
                        {/* <div className="card mb-4">
                            <div className="card-header d-flex justify-content-between align-items-center">
                                <h4>Referral Codes</h4>
                                <button
                                    type="button"
                                    className="btn btn-sm btn-primary"
                                    onClick={() => handleAddField('referral_codes')}
                                >
                                    <FaPlus className="me-1" /> Add Code
                                </button>
                            </div>
                            <div className="card-body">
                                {formData.referral_codes.map((code, index) => (
                                    <div key={index} className="input-group mb-2">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={code}
                                            onChange={(e) => handleArrayChange(index, e.target.value, 'referral_codes')}
                                            placeholder="Enter referral code"
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-outline-danger"
                                            onClick={() => handleRemoveField(index, 'referral_codes')}
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div> */}

                        {/* Submit Button */}
                        <div className="d-flex">
                            <ButtonComp
                                type="submit"
                                variant={"outline-primary"}
                                className="btn-main-clr text-white"
                                btnText={"Update Profile"}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;