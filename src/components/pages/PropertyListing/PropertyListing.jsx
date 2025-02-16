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
import { AddToFav, DeletePropertyAction, GetAllProperties } from '../../../store/slices/propertyManagementSlice/propertyManagementSlice';
import MapLoader from '../../Loader/MapLoader';
import { errorNotify, successNotify } from '../../../Toastify/Toastify';
import AddProperty from '../Property/AddProperty';
import { MdImageSearch } from 'react-icons/md';

const PropertyListing = () => {
  const { role } = JSON.parse(localStorage.getItem('user'))
  const [isEdit, setIsEdit] = useState(false)
  const [document, setDocument] = useState(false)
  const [skipTraceRecords, setSkipTraceRecords] = useState(false)
  const dispatch = useDispatch();
  const { isLoading, allProperty } = useSelector((state) => state.PropertyMangementReducer)
  useEffect(() => {
    dispatch(GetAllProperties())
  }, [])


  const { pathname } = useLocation();
  const { handleModalOpen } = useModal()        // this is my custom hook to work with Modal globally
  const navigate = useNavigate();

  const savePropertyHandler = (id) => {
    console.log('[id]', id)
    const payload = {
      listing_id: id,
      is_favourite: 1
    }

    dispatch(AddToFav(payload))
      .then((response) => {
        console.log('[response]', response)
        if (response.meta.requestStatus === "fulfilled") {
          successNotify("Added to Favourites !")
        } else {
          errorNotify(response.payload)

        }
      })
      .catch((error) => {
        console.log(error)
        errorNotify(error)
      })


  }

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
      name: 'Address',
      label: "Address",
      options: {
        filter: false,
        customBodyRender: (value) => (
          <div className='ms-3'>{value}</div>
        )
      }
    },
    {
      name: 'Status',
      label: "Status",
      options: {
        customBodyRender: (value) => (
          <div className='ms-3'>{value}</div>
        )
      }
    },
    {
      name: 'Est.Value',
      label: "Est.Value",
      options: {
        customBodyRender: (value) => (
          <div className='ms-3'>{value}</div>
        )
      }
    },
    {
      name: 'price_per_square_feet',
      label: "Price Per SqFt",
      options: {
        customBodyRender: (value) => (
          <div className='ms-3'>{value}</div>
        )
      }
    },
    {
      name: 'Bed',
      label: "Bed",
      options: {
        customBodyRender: (value) => (
          <div className='ms-3'>{value}</div>
        )
      }
    },
    {
      name: 'Bath',
      label: "Bath",
      options: {
        customBodyRender: (value) => (
          <div className='ms-3'>{value}</div>
        )
      }
    },
    {
      name: 'SqFt',
      label: "SqFt",
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
      name: 'Add Fav',
      label: "Add Fav",
      options: {
        filter: false,
        customBodyRender: (value) => (
          <button className='btn btn-outline-danger' onClick={() => { savePropertyHandler(value) }}>
            <FaHeart size={20} />
          </button>
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
              options={role === 'admin' ? ["Edit", "Delete", "View"] : ["View"] }
              onEditHandler={() => editHandler(value)}
              onDeleteHandler={() => deleteHandler(value)}
              onViewHandler={() => viewItemHandler(value)}
            /></div>
        ),

      }
    },
  ];

  // Handle row selection
  const handleRowSelection = (currentRowsSelected, allRowsSelected) => {
    const selectedIndexes = allRowsSelected.map((row) => row.index);
    const selectedData = selectedIndexes.map((index) => allProperty[index]);
    setSkipTraceRecords(selectedData)
  };

  const options = {
    elevation: 1,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 15, 20],
    filterType: "dropdown",
    onRowSelectionChange: handleRowSelection,
  };

  const editHandler = (values) => {
    handleModalOpen()
    setIsEdit(true)
    setDocument(values)
  }
  const deleteHandler = (value) => {
    console.log("I am delete", value)

    dispatch(DeletePropertyAction(value.id))
      .then((response) => {
        if (response.meta.requestStatus === "fulfilled") {
          dispatch(GetAllProperties())
        }

      })
      .catch((error) => { errorNotify(error) })
  }

  const viewItemHandler = (value) => {
    console.log("I am View", value)
    navigate(`/dashboard/display-details/${value.id}`)
  }





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
                  {/* <DataGridGlobal rows={rows} columns={columns} pageSize={pageSize} /> */}
                  <DataGridGlobal
                    data={allProperty.length ? allProperty : []}
                    columns={columns}
                    options={options}
                  />
                  {/* <div className='my-4'>
                    <Button
                      disabled={skipTraceRecords.length ? false : true}
                      className={`text-white fw-700 skip-tracing-btn rounded-3 bg-skip-tracing-btn d-flex gap-1`}
                      onClick={handleModalOpen}>
                      <MdImageSearch size={22} />
                      Skip Trace
                    </Button>
                  </div> */}
                </Col>
              </Row>
            </div>
          )
        }
      </section>
      <ModalGlobal>
        <AddProperty isEdit={isEdit} data={document} />
      </ModalGlobal>

    </>

  )
}

export default PropertyListing