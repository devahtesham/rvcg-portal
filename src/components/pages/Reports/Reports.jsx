import React from 'react'
import { MAIN_HEADINGS } from '../../../data'
import { useLocation } from 'react-router-dom';
import TabsComp from '../../MUI/TabsComp/TabsComp';
import ComplaintReport from '../../Reports/ComplaintReport';
import SellReport from '../../Reports/SellReport';
import ServiceReport from '../../Reports/ServiceReport';

const Reports = () => {
  const { pathname } = useLocation();
  const TABS_CONTENT = [
    {
      id:0,
      component:<ComplaintReport />
    },
    {
      id:1,
      component:<SellReport />
    },
    {
      id:2,
      component:<ServiceReport />
    }

  ]
  return (
    <>
      <section className='flex-grow-1'>
        <div className='property-listing-header my-4 px-4'>
          <h3 className='m-0'>{MAIN_HEADINGS[pathname]}</h3>
        </div>
        <section className='px-4'>
          <TabsComp tabs={["COMPLAINT REPORT","SELL REPORT","SERVICE REPORT"]} tabContent={TABS_CONTENT}/>
        </section>
      </section>
    </>
  )
}

export default Reports