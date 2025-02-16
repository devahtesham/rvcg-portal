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
import { DeletePropertyAction, DeletePropertyFromFav, GetAllProperties, ViewFavProperties } from '../../../store/slices/propertyManagementSlice/propertyManagementSlice';
import MapLoader from '../../Loader/MapLoader';
import { errorNotify, successNotify } from '../../../Toastify/Toastify';
import AddProperty from '../Property/AddProperty';

const FavouritePropertiesListing = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [document, setDocument] = useState(false)
  const dispatch = useDispatch();
  const { isLoading, favProperties } = useSelector((state) => state.PropertyMangementReducer)
  useEffect(() => {
    dispatch(ViewFavProperties())
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
      label: "Actions",
      name: 'actions',
      options: {
        filter: false, // Disable filter for this column
        customBodyRender: (value) => (
          <div className='ms-3'>
            <IconMenu
              options={["Delete"]}
              onDeleteHandler={() => deleteHandler(value)}
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

  const deleteHandler = (value) => {
    console.log("I am delete", value)

    dispatch(DeletePropertyFromFav(value.listing_id))
      .then((response) => {
        if (response.meta.requestStatus === "fulfilled") {
          successNotify("Removed From Favourites !")
          dispatch(ViewFavProperties())
        }

      })
      .catch((error) => { errorNotify(error) })
  }






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
                    data={favProperties.length ? favProperties : []}
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

export default FavouritePropertiesListing