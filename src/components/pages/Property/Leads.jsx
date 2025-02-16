import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useModal } from '../../../hooks/useModal';
import { MAIN_HEADINGS } from '../../../data';
import { FaPlus } from 'react-icons/fa6';
import Button from '../../ModalButton/Button';
import { Col, Row } from 'react-bootstrap';
import DataGridGlobal from '../../MUI/DataGrid/DataGridGlobal';
import ModalGlobal from '../../MUI/Modal/ModalGlobal';
import IconMenu from '../../MUI/IconMenu/IconMenu';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteLeadAction, DeletePropertyTypes, GetAllLeads, GetPropertyTypes } from '../../../store/slices/propertyManagementSlice/propertyManagementSlice';
import MapLoader from '../../Loader/MapLoader';
import { errorNotify } from '../../../Toastify/Toastify';
import AddLeadForm from './AddLeadForm';
import { LEAD_STATUS_ENUM } from '../../../data/global';

const Leads = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [document, setDocument] = useState(false)
  const dispatch = useDispatch();
  const { isLoading, leads } = useSelector((state) => state.PropertyMangementReducer)
  

  useEffect(() => {
    dispatch(GetAllLeads())
  }, [])

  const { pathname } = useLocation();
  const { handleModalOpen } = useModal()        // this is my custom hook to work with Modal globally
  const navigate = useNavigate();

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
      name: 'fname',
      label: "First Name",
      options: {
        filter: false,
        customBodyRender: (value) => (
          <div className='ms-4'>{value}</div>
        )
      }
    },
    {
      name: 'lname',
      label: "Last Name",
      options: {
        filter: false,
        customBodyRender: (value) => (
          <div className='ms-4'>{value}</div>
        )
      }
    },
    {
      name: 'addedBy',
      label: "Added By",
      options: {
        customBodyRender: (value) => (
          <div className='ms-4'>{value}</div>
        )
      }
    },
    {
      name: 'assignTo',
      label: "Assign To",
      options: {
        customBodyRender: (value) => (
          <div className='ms-4'>{value}</div>
        )
      }
    },
    {
      name: 'status',
      label: "Status",
      options: {
        customBodyRender: (value) => (
          <div className='ms-4'>{LEAD_STATUS_ENUM[value]}</div>
        )
      }
    },
    {
      name: 'source',
      label: "Source",
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
          <div className='ms-4'> <IconMenu options={["Edit", "Delete", "View"]} onEditHandler={() => editHandler(value)}
            onDeleteHandler={() => deleteHandler(value)} onViewHandler={() => viewItemHandler(value)} /></div>
        ),

      }
    },
  ];


  const viewItemHandler = (value) => {
    console.log("I am View", value)
    navigate(`/dashboard/leads/${value.id}`)
  }

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

    dispatch(DeleteLeadAction(value.id))
      .then((response) => {
        if (response.meta.requestStatus === "fulfilled") {
          dispatch(GetAllLeads())
        }

      })
      .catch((error) => { errorNotify(error) })
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
                    data={leads.length ? leads : []}
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
        <AddLeadForm isEdit={isEdit} data={document} />
      </ModalGlobal>

    </>

  )
}

export default Leads