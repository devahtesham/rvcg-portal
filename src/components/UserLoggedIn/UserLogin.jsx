import UserLoginImg from "../../assets/img/user-login.png"
import { FaPowerOff } from "react-icons/fa6";
import "./UserLogin.css"
import { useState } from "react";
import { successNotify } from "../../Toastify/Toastify";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";



const UserLogin = () => {
  const navigate = useNavigate()
  const [isUserOptionShow, setIsUserOptionShow] = useState(false)
  const { name,userId } = JSON.parse(localStorage.getItem('user'))
  const logoutHandler = () => {
    successNotify("Logout Successfully ! 🔒")
    localStorage.clear();
    navigate("/")

  }

  const profileHandler = ()=>{
    setIsUserOptionShow(false)
    navigate(`/dashboard/profile/view/${userId}`)
  }
  return (
    <div>
      <div className='d-flex align-items-center gap-2 cursor-pointer' onClick={() => setIsUserOptionShow(!isUserOptionShow)}>
        <span>Hi <span className='fw-bolder'>{name}</span></span>
        <div className="user-logged-in-img">
          <img src={UserLoginImg} alt="" width={60} height={60} />
        </div>
      </div>

      <div className="user-options-panel position-relative">
        {/* <UserOptionsList /> */}
        <div className={`user-option ${isUserOptionShow ? 'visible' : ""} d-flex gap-3 flex-column`} >
          <div className="d-flex align-items-center gap-2 " onClick={logoutHandler}>
            <span><FaPowerOff /></span>
            <span>Logout</span>
          </div>
          <div className="d-flex align-items-center gap-2" onClick={profileHandler}>
            <span><FaUserCircle /></span>
            <span>Profile</span>
          </div>
        </div>
      </div>
    </div>

  )
}

export default UserLogin