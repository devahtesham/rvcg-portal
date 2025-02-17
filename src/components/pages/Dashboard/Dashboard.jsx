import Footer from '../../Footer/Footer'
import { Outlet, useLocation } from "react-router-dom"
import SideBar from '../../SideBar/SideBar'
import MainHeader from '../../MainHeader/MainHeader'

const Dashboard = () => {
    const {pathname} = useLocation()
    return (
        <div className=''>
            {/* <Header /> */}
            <div className="row justify-content-xl-between justify-content-center">
                <div className="col-xl-2 col-0 pe-0 ">
                    <SideBar />
                </div>
                <div className="col-xxl-10 col-xl-9 col-12 main-content">
                    <MainHeader />
                    <Outlet />
                    {
                    !pathname.includes('/dashboard/faq') && (
                        <Footer />
                    )
                    }
                </div>
            </div>
        </div>
    )
}

export default Dashboard