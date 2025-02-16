import React from 'react'
import { useLocation } from 'react-router-dom';
import { useModal } from '../../../hooks/useModal';
import { MAIN_HEADINGS } from '../../../data';
import { Col, Row } from 'react-bootstrap';
// import DataGridGlobal from '../../MUI/DataGrid/DataGrid';
import ModalGlobal from '../../MUI/Modal/ModalGlobal';
import Button from '../../ModalButton/Button';
import { FaPlus } from "react-icons/fa6";
import DataGridGlobal from '../../MUI/DataGrid/DataGridGlobal';
import UserImg from "../../../assets/img/user-login.png"
import IconMenu from "../../MUI/IconMenu/IconMenu";
import AddUser from '../../AddUser/AddUser';


const Users = () => {
  const { pathname } = useLocation();
  const { handleModalOpen } = useModal()   
  
  
  const columns = [
    {
      name: 'name',
      label:"NAME",
      options: {
        customBodyRender: (value) => (
          <div className="d-flex align-items-center gap-3">
            <div className="user-grid-img">
              <img src={UserImg} alt="" className="w-100" />
            </div>
            <div className="div">
              <h6 className="mb-0 fw-bolder text-dark">{value}</h6>
              <span>Employee</span>
            </div>
          </div>
        )
      }
    },
    {
      name: 'address',
      label:"ADDRESS"
    },
    {
      name: 'mobileNumber',
      label:"MOBILE NUMBER"
    },
    {
      name: 'email',
      label:"EMAIL"
    },
    {
      name: 'action',
      label:"ACTION",
      options: {
        customBodyRender: (value) => (
          <IconMenu options={["View"]} />
        ),
        filter:false
      }
    },
  ];

  const data = [
    ["Adam William", "Street 1 ABC Road", "123456789", "test1@gmail.com"],

  ];

  const options = {
    filterType: 'checkbox',
    elevation: 1,
    rowsPerPage: 5,
    rowsPerPageOptions: [5, 10, 15, 20],
    filterType: "dropdown",
  };

  return (
    <>
      <section className='flex-grow-1'>
        <div className='property-listing-header my-4 px-4 d-flex align-items-center gap-3'>
          <h3 className='m-0'>{MAIN_HEADINGS[pathname]}</h3>
          <Button onClick={handleModalOpen}><FaPlus color='#fff' size={20} /></Button>
        </div>

        <div className="property-listing-grid mt-5">
          <Row className='justify-content-center'>
            <Col lg={11}>
              {/* <DataGridGlobal rows={rows} columns={columns} pageSize={pageSize} /> */}
              <DataGridGlobal data={data} columns={columns} options={options}  />
            </Col>
          </Row>
        </div>
      </section>
      <ModalGlobal customStyle={{paddingLeft:0,paddingRight:0}}>
        <AddUser />
      </ModalGlobal>
    </>
  )
}

export default Users