import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container, Row, Col } from "react-bootstrap"
import {
    successNotify,
    errorNotify,
} from "../../../Toastify/Toastify"
import "./Login.css"
import { useState } from 'react';
import Loader from '../../Loader/Loader';
import { useNavigate } from 'react-router-dom';
import { BiSolidUser } from "react-icons/bi"
import { RiLockPasswordFill } from "react-icons/ri"
import { BiSolidShow } from "react-icons/bi"      // show password
import { BiSolidHide } from "react-icons/bi"      // hide password
import LOGO from "../../../assets/img/new-logo.png"
import { useDispatch, useSelector } from 'react-redux';
import { LogIn } from '../../../store/slices/authSlice/authSlice';



const Login = () => {
    const dispatch = useDispatch()
    const { isLoading } = useSelector((state) => state.AuthReducer)

    const navigate = useNavigate()
    const [isPasswordShow, setIsPasswordShow] = useState(false)

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    // login handler
    const loginHandler = async (e) => {
        e.preventDefault()
        const { email, password } = formData
        if (!email || !password && password.length < 8) {
            errorNotify('Email or Password is Incorrect ❗')
            return
        } else {
            console.log(email, password);

            const payload = {
                email,
                password
            }

            dispatch(LogIn(payload))
                .unwrap()
                .then((response) => {
                    console.log(response);
                    // save token in local storage
                    localStorage.setItem("token", response?.token);
                    localStorage.setItem("user", JSON.stringify({ userId: response?.user?.id, name: response?.user?.name, email: response?.user?.email, role: response?.user?.role }));

                    if (window.matchMedia("(max-width: 576px)").matches) {
                        // It means I am on mobile
                        navigate("/dashboard/property-listing");
                    } else {
                        // It means I am on desktop
                        navigate("/dashboard/property-listing");
                    }
                    successNotify("Login Successfully ! 🔓")
                    setFormData({
                        email: "",
                        password: ""
                    })
                })
                .catch((err) => {
                    console.log("catch is running ", err)
                    errorNotify(err)
                })
        }
    }

    // show hide password
    const passwordShowHideHandler = () => {
        setIsPasswordShow(!isPasswordShow)
    }
    return (
        <>
            {
                isLoading ? <Loader /> : (
                    <Container fluid className='h-100 d-flex flex-column justify-content-center'>
                        <Row className='login-section'>
                            <Col xl={4} lg={5} md={6} >
                                <div className="text- dark login-form-container">
                                    <div>
                                        <div className="company-logo d-flex flex-column align-items-center">
                                            <div className='mb-2'>
                                                <img src={LOGO} alt="logo" />
                                            </div>
                                        </div>

                                    </div>


                                    <Form className='form login-form' onSubmit={loginHandler}>
                                        <div className='form-heading mb-3'>
                                            <h2 className='fw-700 m-0'>Welcome</h2>
                                        </div>
                                        <Form.Group className="mb-3 icon-input" controlId="formBasicEmail">
                                            <BiSolidUser size={20} color='#ceb17e' />
                                            <Form.Control type="email" placeholder="Username or email" name='email' value={formData.email} onChange={handleChange} />
                                        </Form.Group>

                                        <Form.Group className="mb-3 icon-input" controlId="formBasicPassword">
                                            <RiLockPasswordFill size={20} color='#ceb17e' />
                                            {
                                                !isPasswordShow ? <BiSolidHide onClick={passwordShowHideHandler} size={20} color='#ceb17e' className='password-show-hide' /> : <BiSolidShow onClick={passwordShowHideHandler} size={20} color='#E8090C' className='password-show-hide' />
                                            }


                                            <Form.Control type={isPasswordShow ? "text" : "password"} placeholder="Password" name='password' value={formData.password} onChange={handleChange} />
                                        </Form.Group>

                                        <Button variant="" type="submit" className='text-center w-100 bg-main-clr text-white fw-700'>
                                            Login
                                        </Button>
                                    </Form>

                                </div>
                            </Col>
                            <Col xl={8} lg={7} md={6} className='pe-md-0 d-sm-block d-none'  >
                                <div className='login-form-bg'></div>
                            </Col>
                        </Row>
                    </Container>
                )
            }
        </>
    );
}

export default Login;



{/* <div className='login-form-footer mb-3 d-flex justify-content-between align-align-items-center'>
    <div className='remember-pass'>
        <input type="checkbox" id="rememberPassword" name="rememberPassword" value="rememberPassword" />
        <label htmlFor="rememberPassword" className=''>Remember Password</label>
    </div>
    <div className='forgot-pass'>
        <span>Forgot Password</span>
    </div>
</div> */}