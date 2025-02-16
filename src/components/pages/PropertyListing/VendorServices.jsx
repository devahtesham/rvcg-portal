import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useModal } from '../../../hooks/useModal';
import { MAIN_HEADINGS } from '../../../data';
import { FaHeart, FaPlus } from 'react-icons/fa6';
import Button from '../../ModalButton/Button';
import { Col, Row } from 'react-bootstrap';
import DataGridGlobal from '../../MUI/DataGrid/DataGridGlobal';
import ModalGlobal from '../../MUI/Modal/ModalGlobal';
import IconMenu from '../../MUI/IconMenu/IconMenu';
import { useDispatch, useSelector } from 'react-redux';
import { AddToFav, DeletePropertyAction, DeleteVendor, GetAllProperties, GetVendors } from '../../../store/slices/propertyManagementSlice/propertyManagementSlice';
import MapLoader from '../../Loader/MapLoader';
import { errorNotify, successNotify } from '../../../Toastify/Toastify';
import AddProperty from '../Property/AddProperty';
import { MdImageSearch } from 'react-icons/md';
import AddVendor from '../Property/AddVendor';

const VendorServices = () => {
  const { role } = JSON.parse(localStorage.getItem('user'))
  const [isEdit, setIsEdit] = useState(false)
  const [document, setDocument] = useState(false)
  const [skipTraceRecords, setSkipTraceRecords] = useState(false)

  const dispatch = useDispatch();
  const { isLoading, vendors } = useSelector((state) => state.PropertyMangementReducer)

  useEffect(() => {
    dispatch(GetVendors())
  }, [])


  const { pathname } = useLocation();
  const { handleModalOpen } = useModal()        // this is my custom hook to work with Modal globally
  const navigate = useNavigate();



  const columns = [
    {
      name: 'id',
      label: "SNO",
      options: {
        filter: false, // Disable filter for this column
        customBodyRender: (value) => (
          <div className='ms-3'>{value}</div>
        )
      }
    },
    {
      name: 'User Name',
      label: "User Name",
      options: {
        customBodyRender: (value) => (
          <div className='ms-3'>{value}</div>
        )
      }
    },
    {
      name: 'Email',
      label: "Email",
      options: {
        customBodyRender: (value) => (
          <div className='ms-3'>{value}</div>
        )
      }
    },
    {
      name: 'City',
      label: "City",
      options: {
        customBodyRender: (value) => (
          <div className='ms-3'>{value}</div>
        )
      }
    },
    {
      name: 'Address',
      label: "Address",
      options: {
        customBodyRender: (value) => (
          <div className='ms-3'>{value}</div>
        )
      }
    },

    {
      label: "Actions",
      name: 'actions',
      options: {
        filter: false, // Disable filter for this column
        customBodyRender: (value) => (
          <div className='ms-3'>
            <IconMenu
              options={["Edit", "Delete", "View"]}
              onEditHandler={() => editHandler(value)}
              onDeleteHandler={() => deleteHandler(value)}
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

  const editHandler = (values) => {
    handleModalOpen()
    setIsEdit(true)
    setDocument(values)
  }
  const deleteHandler = (value) => {
    console.log("I am delete", value)

    dispatch(DeleteVendor(value.id))
      .then((response) => {
        if (response.meta.requestStatus === "fulfilled") {
          dispatch(GetVendors())
        }

      })
      .catch((error) => { errorNotify(error) })
  }

  const viewItemHandler = (value) => {
    console.log("I am View", value)
    navigate(`/dashboard/vendor-services/${value.id}`)
  }
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
                    data={vendors?.length ? vendors : []}
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
        <AddVendor isEdit={isEdit} data={document} />
      </ModalGlobal>

    </>

  )
}

export default VendorServices