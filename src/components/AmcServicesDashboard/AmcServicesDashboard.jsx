import React from 'react'
import { useLocation } from 'react-router-dom';
import DataGridGlobal from '../MUI/DataGrid/DataGridGlobal';
import SubmitBtn from '../SubmitBtn/SubmitBtn';


const AmcServicesDashboard = () => {
    const { pathname } = useLocation();

    const columns = [
        {
            name: 'customer_name',
            label: "CUSTOMER NAME",
        },
        {
            name: 'service_type',
            label: "SERVICE TYPE",
        },
        {
            name: 'date',
            label: "DATE",
        },
        {
            name: 'assign_to',
            label: "ASSIGN TO",
        },
        {
            name: 'employee_status',
            label: "EMPLOYEE STATUS",

        },
    ];

    const data = [
        ["button"]

    ];

    const options = {
        filterType: 'checkbox',
        elevation: 1,
        rowsPerPage: 5,
        rowsPerPageOptions: [5, 10, 15, 20],
        filterType: "dropdown",
        selectableRows: false,
        customRowRender: data => {
            const [name, cardNumber, cvc, expiry] = data;
            return (
                <tr className=''>
                    <td colSpan={5} className='text-center pt-3'>
                        <SubmitBtn>ADD</SubmitBtn>
                    </td>
                </tr>
            );
        }
    };

    return (
        <div className='dashboard-amc-services dashboard-card p-3'>
            <div className="px-2 daily-complaint-header d-flex align-items-center justify-content-between">
                <h4 className='m-0'>AMC Services </h4>
            </div>

            <div className="property-listing-grid">
                <DataGridGlobal isPaddingLess={true} isHideToolbar={true} Notshadow={true} data={data} columns={columns} options={options} />
            </div>
        </div>
    )
}

export default AmcServicesDashboard