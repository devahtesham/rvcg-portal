// import { Card, ListGroup } from 'react-bootstrap';
// import { FaRegClock } from "react-icons/fa6";
// import { RiMapPinFill } from "react-icons/ri";
// import { MdOutlineMonitor } from "react-icons/md";
// import { FaUserCircle } from "react-icons/fa";

// const UserLogDetail = () => {
//     const logData = {
//         "id": 2,
//         "user_id": 13,
//         "login_at": "2025-01-22 01:32:54",
//         "ip_address": "127.0.0.1",
//         "user_agent": "PostmanRuntime/7.43.0",
//         "location": null,
//         "created_at": "2025-01-22T01:32:54.000000Z",
//         "updated_at": "2025-01-22T01:32:54.000000Z",
//         "user": {
//             "id": 13,
//             "name": "Test with referral",
//             "email": "abc@gmail.com",
//             "is_active": 1,
//             "email_verified_at": null,
//             "created_at": "2025-01-12T00:12:16.000000Z",
//             "updated_at": "2025-01-12T00:12:16.000000Z",
//             "role": "user",
//             "referral_code": null,
//             "referrer_id": null,
//             "phone_number": null,
//             "address": null,
//             "social_media_profiles": null,
//             "bankruptcy_details": null,
//             "liens_details": null,
//             "contact_email": null,
//             "dob": null,
//             "income_level": null,
//             "reward_points": 0,
//             "referrers": null,
//             "social_profiles": null
//         }
//     }

//     const formatDate = (dateString) => {
//         const date = new Date(dateString);
//         return date.toLocaleString('en-US', {
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric',
//             hour: '2-digit',
//             minute: '2-digit'
//         });
//     };

//     return (
//         <Card className="shadow-sm">
//             <Card.Header className="bg-primary text-white">
//                 <div className="d-flex align-items-center">
//                     <FaUserCircle className="me-2" size={20} />
//                     <h5 className="mb-0">User Activity Log</h5>
//                 </div>
//             </Card.Header>
//             <ListGroup variant="flush">
//                 <ListGroup.Item>
//                     <div className="d-flex align-items-start">
//                         <FaRegClock className="mt-1 me-3 text-primary" size={20} />
//                         <div>
//                             <div className="fw-bold">Login Time</div>
//                             <div>{formatDate(logData.login_at)}</div>
//                         </div>
//                     </div>
//                 </ListGroup.Item>

//                 <ListGroup.Item>
//                     <div className="d-flex align-items-start">
//                         <FaUserCircle className="mt-1 me-3 text-primary" size={20} />
//                         <div>
//                             <div className="fw-bold">User Details</div>
//                             <div>Name: {logData.user.name}</div>
//                             <div>Email: {logData.user.email}</div>
//                             <div>Role: {logData.user.role}</div>
//                         </div>
//                     </div>
//                 </ListGroup.Item>

//                 <ListGroup.Item>
//                     <div className="d-flex align-items-start">
//                         <MdOutlineMonitor className="mt-1 me-3 text-primary" size={20} />
//                         <div>
//                             <div className="fw-bold">Device Information</div>
//                             <div>IP Address: {logData.ip_address}</div>
//                             <div>User Agent: {logData.user_agent}</div>
//                         </div>
//                     </div>
//                 </ListGroup.Item>

//                 {logData.location && (
//                     <ListGroup.Item>
//                         <div className="d-flex align-items-start">
//                             <RiMapPinFill className="mt-1 me-3 text-primary" size={20} />
//                             <div>
//                                 <div className="fw-bold">Location</div>
//                                 <div>{logData.location}</div>
//                             </div>
//                         </div>
//                     </ListGroup.Item>
//                 )}
//             </ListGroup>
//         </Card>
//     );
// };

// export default UserLogDetail;



import "./UserLogsDetail.css"
import { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { GetUserLogById } from "../../../store/slices/propertyManagementSlice/propertyManagementSlice";
import { useParams } from "react-router-dom";
import MapLoader from "../../Loader/MapLoader";

const UserLogDetail = () => {
    const { isLoading, userLogDetails: logs } = useSelector((state) => state.PropertyMangementReducer);

    const dispatch = useDispatch()
    const { id } = useParams()

    useEffect(() => {
        dispatch(GetUserLogById(id))
    }, [dispatch, id]);

    return (
        <Container className="my-4">
            <div className="d-flex">
            <h1 className="side-heading">User Login Logs</h1>
            </div>
            <Row className="justify-content-center mt-5">
                <Col md={8}>
                    <div className="timeline">
                        {
                            isLoading ? (
                                <div className='h-100 d-flex justify-content-center align-items-center'>
                                    <MapLoader />
                                </div>) : logs.map((log) => (
                                    <div key={log.id} className="timeline-item">
                                        <div className="timeline-dot"></div>
                                        <Card className="timeline-content">
                                            <Card.Body>
                                                <Card.Title>
                                                    {log.user.name} ({log.user.role})
                                                </Card.Title>
                                                <Card.Subtitle className="text-muted mb-2">
                                                    {new Date(log.login_at).toLocaleString()}
                                                </Card.Subtitle>
                                                <Card.Text>
                                                    <strong>IP Address:</strong> {log.ip_address} <br />
                                                    <strong>User Agent:</strong> {log.user_agent} <br />
                                                    <strong>Email:</strong> {log.user.email}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                ))}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default UserLogDetail;