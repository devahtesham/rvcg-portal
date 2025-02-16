import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { MAIN_HEADINGS } from '../../../data';
import { Col, Row } from 'react-bootstrap';
import DataGridGlobal from '../../MUI/DataGrid/DataGridGlobal';
import IconMenu from '../../MUI/IconMenu/IconMenu';
import { useDispatch, useSelector } from 'react-redux';
import MapLoader from '../../Loader/MapLoader';
import { GetAllUserLogs } from '../../../store/slices/propertyManagementSlice/propertyManagementSlice';

const UserLogs = () => {

    const dispatch = useDispatch();
    const { isLoading, allUsersLogs } = useSelector((state) => state.PropertyMangementReducer)
    const navigate = useNavigate()
    const { pathname } = useLocation();

    useEffect(() => {
        dispatch(GetAllUserLogs())
    }, [])


    const viewItemHandler = (value) => {
        console.log("I am View", value)
        navigate(`/dashboard/user-logs/${value.user_id}`)
    }
    const columns = [
        {
            name: 'id',
            label: "SNO",
            options: {
                filter: false,
                customBodyRender: (value) => (
                    <div className='ms-4'>{value}</div>
                )
            }
        },
        {
            name: 'User ID',
            label: "User ID",
            options: {
                filter: false,
                customBodyRender: (value) => (
                    <div className='ms-4'>{value}</div>
                )
            }
        },
        {
            name: 'Name',
            label: "Name",
            options: {
                filter: false,
                customBodyRender: (value) => (
                    <div className='ms-4'>{value}</div>
                )
            }
        },

        {
            name: 'Email',
            label: "Email",
            options: {
                filter: false,
                customBodyRender: (value) => (
                    <div className='ms-4'>{value}</div>
                )
            }
        },
        {
            name: 'Role',
            label: "Role",
            options: {
                customBodyRender: (value) => (
                    <div className='ms-4'>{value}</div>
                )
            }
        },
        {
            label: "Actions",
            name: 'actions',
            options: {
                filter: false,
                customBodyRender: (value) => (
                    <div className='ms-3'>
                        <IconMenu
                            options={["View"]}
                            onEditHandler={() => { }}
                            onDeleteHandler={() => { }}
                            onViewHandler={() => viewItemHandler(value)}
                        /></div>
                ),

            }
        },
    ];

    const options = {
        elevation: 1,
        rowsPerPage: 10,
        rowsPerPageOptions: [10, 15, 20],
        filterType: "dropdown",
    };



    return (
        <>
            <section className='flex-grow-1 property-types'>
                <div className='property-listing-header my-4 px-4 d-flex align-items-center gap-3'>
                    <h3 className='m-0'>{MAIN_HEADINGS[pathname]}</h3>
                </div>
                {
                    isLoading ? <div className='h-100 d-flex justify-content-center align-items-center'>
                        <MapLoader />
                    </div> : (
                        <div className="property-listing-grid mt-5">
                            <Row className='justify-content-center'>
                                <Col lg={11}>
                                    {/* <DataGridGlobal rows={rows} columns={columns} pageSize={pageSize} /> */}
                                    <DataGridGlobal
                                        data={allUsersLogs?.length ? allUsersLogs : []}
                                        columns={columns}
                                        options={options}
                                    />
                                </Col>
                            </Row>
                        </div>
                    )
                }
            </section>
        </>

    )
}

export default UserLogs