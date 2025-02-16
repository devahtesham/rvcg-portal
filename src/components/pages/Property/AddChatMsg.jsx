import { Col, Row } from 'react-bootstrap'
import { ButtonComp, DetailDescription, DropDownComp, InputComp } from '../../bootstrap'
import { useModal } from '../../../hooks/useModal'
import { AddChats, AddPackage, getAllUsers, getChats } from '../../../store/slices/propertyManagementSlice/propertyManagementSlice'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { errorNotify } from '../../../Toastify/Toastify'

const AddChatMsg = ({ isEdit, data }) => {

    const { handleModalClose } = useModal()
    const dispatch = useDispatch();
    const { allUsers } = useSelector((state) => state.PropertyMangementReducer)
    // console.log('[allUsers]', allUsers)

    useEffect(() => {
        dispatch(getAllUsers())
    }, [])

    const [chatDetails, setChatDetails] = useState({
        message: "",
        to_user_id: "",
        type: 'text'
    })

    const chatValuesHandler = (e) => {
        let { value, name } = e.target;

        setChatDetails({
            ...chatDetails,
            [name]: value
        })
    }

    const addLeadTypeHandler = (e) => {
        e.preventDefault()

        const payload = {
            ...chatDetails,
        }

        console.log(payload)


        dispatch(AddChats(payload))
            .unwrap()
            .then((response) => {
                console.log("hiiiiiiii",response)
                handleModalClose()
                dispatch(getChats())
            })
            .catch((error) => {
                errorNotify(error)
            })
    }




    return (
        <fieldset className="reset mt-3 p-4 pt-0 t-0 ">
            <legend className="reset mb-3 side-heading px-5 mx-auto">Add Chat</legend>
            <form >
                <Row className='mt-3 bg-lightgray pb-4'>
                    <Col lg={6} className="pt-3">
                        <div className='property-no'>
                            <DropDownComp
                                label={"Select User"}
                                value={chatDetails.to_user_id}
                                options={allUsers}
                                name="to_user_id"
                                onChange={chatValuesHandler}
                                className='p-3'
                            />

                        </div>

                    </Col>
                    <Col lg={6} className="pt-3"> 
                        <div className='property-no'>
                            <DetailDescription
                                value={chatDetails.message}
                                controlId={"descriptionBox-1"}
                                label={"Description"}
                                name="message"
                                onChange={chatValuesHandler}
                                placeholder={"Description"}
                            />
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col lg={12} className=' mt-5'>
                        <ButtonComp
                            type="submit"
                            variant={"outline-primary"}
                            className="btn-main-clr text-white"
                            btnText={'Add Chat'}
                            onClick={addLeadTypeHandler}
                        />
                    </Col>
                </Row>

            </form>
        </fieldset>
    )
}

export default AddChatMsg