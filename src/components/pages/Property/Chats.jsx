import { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { useModal } from '../../../hooks/useModal';
import { MAIN_HEADINGS } from '../../../data';
import { FaPlus } from 'react-icons/fa6';
import Button from '../../ModalButton/Button';
import { Col, Row } from 'react-bootstrap';
import DataGridGlobal from '../../MUI/DataGrid/DataGridGlobal';
import ModalGlobal from '../../MUI/Modal/ModalGlobal';
import { useDispatch, useSelector } from 'react-redux';
import { getChats } from '../../../store/slices/propertyManagementSlice/propertyManagementSlice';
import MapLoader from '../../Loader/MapLoader';
import { formatDateForUI } from '../../../data/global';
import AddChatMsg from './AddChatMsg';

const Chats = () => {
    const dispatch = useDispatch();
    const { isLoading, chats } = useSelector((state) => state.PropertyMangementReducer)
    useEffect(() => {
        dispatch(getChats())
    }, [])
    const { pathname } = useLocation();
    const { handleModalOpen } = useModal()        // this is my custom hook to work with Modal globally
    const { role } = JSON.parse(localStorage.getItem('user'))


    const columns = [
        {
            name: 'from_user_name',
            label: "From User Name",
            options: {
                customBodyRender: (value) => (
                    <div className='ms-4'>{value}</div>
                )
            }
        },
        {
            name: 'To User Name',
            label: "To User Name",
            options: {
                customBodyRender: (value) => (
                    <div className='ms-4'>{value}</div>
                )
            }
        },
        {
            name: 'Message',
            label: "Message",
            options: {
                filter: false,
                customBodyRender: (value) => (
                    <div className='ms-4'>{value}</div>
                )
            }
        },
        {
            name: 'Last Message Time',
            label: "Last Message Time",
            options: {
                customBodyRender: (value) => (
                    <div className='ms-4'>{formatDateForUI(value)}</div>
                )
            }
        }
    ];

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
                    {
                        role === 'admin' && (
                            <Button onClick={handleModalOpen}><FaPlus color='#fff' size={20} /></Button>
                        ) 
                    }
                </div>

                {
                    isLoading ? <div className='h-100 d-flex justify-content-center align-items-center'>
                        <MapLoader />
                    </div> : (
                        <div className="property-listing-grid mt-5">
                            <Row className='justify-content-center'>
                                <Col lg={11}>
                                    <DataGridGlobal
                                        data={chats?.length ? chats : []}
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
                <AddChatMsg />
            </ModalGlobal>

        </>

    )
}

export default Chats