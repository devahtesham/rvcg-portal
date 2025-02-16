
import HeatMapChart from "../Property/HeatMap/HeatMapChart"
import { HIGH_ROI_PROPERTY_DATA, LOW_ROI_DATA } from '../../../data/global';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { GetHighROIProperty, GetLowROIProperty } from '../../../store/slices/propertyManagementSlice/propertyManagementSlice';
import MapLoader from "../../Loader/MapLoader";
import { MAIN_HEADINGS } from "../../../data";
import { useLocation } from "react-router-dom";


const PropertyStats = () => {
  // GetHighROIProperty
  const dispatch = useDispatch()
  const { isLoading, highROIProperty,lowROIProperty } = useSelector((state) => state.PropertyMangementReducer)
  const { pathname } = useLocation()

  useEffect(() => {
    dispatch(GetHighROIProperty())
    dispatch(GetLowROIProperty())
  }, [])




  return (
    <>
      <div className='property-listing-header my-4 px-4 d-flex align-items-center gap-3'>
        <h3 className='m-0 side-heading'>{MAIN_HEADINGS[pathname]}</h3>
      </div>
      {
        isLoading ? <div className='h-100 d-flex justify-content-center align-items-center'>
          <MapLoader />
        </div> : (
          <>
            <section className='flex-grow-1 property-types mt-5'>
              <HeatMapChart data={highROIProperty?.length ? highROIProperty : []} roi="high" title={"🔥 High ROI Zone"} />
            </section>

            <section className='flex-grow-1 property-types mt-5'>
              {/* <HeatMapChart data={lowROIProperty?.length ? lowROIProperty : []} roi="LOW" title={"❗Low ROI Zone"} /> */}
              <HeatMapChart data={lowROIProperty} roi="LOW" title={"❗Low ROI Zone"} />
            </section>

          </>
        )
      }
    </>

  )
}

export default PropertyStats