import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useModal } from '../../../hooks/useModal';
import { MAIN_HEADINGS } from '../../../data';
import { FaPlus } from 'react-icons/fa6';
import Button from '../../ModalButton/Button';
import { Col, Row } from 'react-bootstrap';
import DataGridGlobal from '../../MUI/DataGrid/DataGridGlobal';
import ModalGlobal from '../../MUI/Modal/ModalGlobal';
import IconMenu from '../../MUI/IconMenu/IconMenu';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteLeadSource, DeleteLeadType, DeletePropertyTypes, GetAllAdminUsers, getAllUsers, getAllUsersAction, GetLeadSources, GetLeadType, GetPropertyTypes } from '../../../store/slices/propertyManagementSlice/propertyManagementSlice';
import AddPropertyType from './AddPropertyType';
import MapLoader from '../../Loader/MapLoader';
import { errorNotify } from '../../../Toastify/Toastify';
import { formatDateForUI } from '../../../data/global';
import AddSource from './AddSource';
import AddLeadType from './AddLeadType';
import { RxCrossCircled } from "react-icons/rx";
import ACTIVE_USER from "../../../assets/active-user.svg"
import AddUserForm from './AddUserForm';

const AllAdminUsers = () => {
    const [isEdit, setIsEdit] = useState(false)
    const [document, setDocument] = useState(false)
    const dispatch = useDispatch();
    const { isLoading, users } = useSelector((state) => state.PropertyMangementReducer)
    useEffect(() => {
        dispatch(getAllUsersAction())
    }, [])
    const { pathname } = useLocation();
    const { handleModalOpen } = useModal()        // this is my custom hook to work with Modal globally

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
            name: 'Phone',
            label: "Phone",
            options: {
                filter: false,
                customBodyRender: (value) => (
                    <div className='ms-4'>{value}</div>
                )
            }
        },
        {
            name: 'Activation Status',
            label: "Activation Status",
            options: {
                customBodyRender: (value) => (
                    <div className='ms-4'>{value === 'verified' ? <span className='active-user-img'> <img src={ACTIVE_USER} alt="" /></span> : <RxCrossCircled color='red' size={30} />}</div>
                )
            }
        },
        {
            label: "Actions",
            name: 'actions',
            options: {
                filter: false,
                customBodyRender: (value) => (
                    <div className='ms-4'> <IconMenu options={["Edit"]} onEditHandler={() => editHandler(value)}
                        onDeleteHandler={() => deleteHandler(value)} /></div>
                ),

            }
        },
    ];

    const editHandler = (values) => {
        handleModalOpen()
        setIsEdit(true)
        setDocument(values)
    }
    const deleteHandler = () => {

    }

    const data = [
        ["61", "Al Mouj, Muscat", "test", "test", "test", "test", "123456789", "Mr Test"],
        ["62", "Al Mouj2, Muscat2", "test2", "test2", "test2", "test2", "1234567892", "Mr Test2"],

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
                    <Button onClick={handleModalOpen}><FaPlus color='#fff' size={20} /></Button>
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
                                        data={users?.length ? users : []}
                                        columns={columns}
                                        options={options}
                                    />
                                </Col>
                            </Row>
                        </div>
                    )
                }
            </section>
            <ModalGlobal>
                <AddUserForm isEdit={isEdit} data={document} />
            </ModalGlobal>

        </>

    )
}

export default AllAdminUsers
