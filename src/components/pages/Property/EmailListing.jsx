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
import { DeleteLeadAction, DeleteOffers, DeletePropertyTypes, GetAllEmails, GetAllLeads, GetOffers, GetPropertyTypes } from '../../../store/slices/propertyManagementSlice/propertyManagementSlice';
import MapLoader from '../../Loader/MapLoader';
import { errorNotify } from '../../../Toastify/Toastify';
import AddLeadForm from './AddLeadForm';
import { displayTime, formatDateForUI, LEAD_STATUS_ENUM } from '../../../data/global';
import AddOffer from './AddOffer';
import SendEmailForm from './SendEmailForm';

const EmailListing = () => {
  const [document, setDocument] = useState(false)
  const dispatch = useDispatch();
  const { isLoading, allEmails } = useSelector((state) => state.PropertyMangementReducer)

  useEffect(() => {
    dispatch(GetAllEmails())
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
      name: '',
      label: "Username",
      options: {
        filter: false,
        customBodyRender: (value) => (
          <div className='ms-4'>{value}</div>
        )
      }
    },
    {
      name: '',
      label: "Status",
      options: {
        customBodyRender: (value) => (
          <div className='ms-4'>{value}</div>
        )
      }
    },
    {
      name: '',
      label: "Date",
      options: {
        customBodyRender: (value) => (
          <div className='ms-4'>{value}</div>
        )
      }
    },
    {
      name: '',
      label: "Time",
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
              onEditHandler={() => {}}
              onDeleteHandler={() => {}}
              onViewHandler={() => viewItemHandler(value)}
            /></div>
        ),

      }
    },
  ];

  const viewItemHandler = (value) => {
    console.log("I am View", value)
    navigate(`/dashboard/email/${value.id}`)
  }

  // Handle row selection
  const handleRowSelection = (currentRowsSelected, allRowsSelected) => {

    const selectedIndexes = allRowsSelected.map((row) => row.index);
    const selectedData = selectedIndexes.map((index) => allEmails[index]);
    setDocument(selectedData)


  };


  const options = {
    elevation: 1,
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 15, 20],
    filterType: "dropdown",
    onRowSelectionChange: handleRowSelection,
    // onTableChange: handleTableChange,
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
            <div className="email-lisiting-grid mt-5">
              <Row className='justify-content-center'>
                <Col lg={11}>
                  {/* <DataGridGlobal rows={rows} columns={columns} pageSize={pageSize} /> */}
                  <DataGridGlobal
                    data={allEmails.length ? allEmails : []}
                    columns={columns}
                    options={options}
                  />
                  <div className='my-4'>
                    <Button disabled={document.length ? false : true} className="text-white fw-700" onClick={handleModalOpen}><FaPlus color='#fff' size={20} style={{ paddingRight: 10 }} />Send Email</Button>
                  </div>
                </Col>
              </Row>
            </div>
          )
        }



      </section>
      <ModalGlobal>
        <SendEmailForm data={document} />
      </ModalGlobal>

    </>

  )
}

export default EmailListing
