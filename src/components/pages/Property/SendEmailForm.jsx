import { Col, Row } from 'react-bootstrap'
import { ButtonComp, InputComp } from '../../bootstrap'
import { useModal } from '../../../hooks/useModal'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { errorNotify, successNotify } from '../../../Toastify/Toastify'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { GetAllEmails, SendEmail } from '../../../store/slices/propertyManagementSlice/propertyManagementSlice'

const SendEmailForm = ({ isEdit, data }) => {
    const { handleModalClose } = useModal()
    const dispatch = useDispatch();

    const [value, setValue] = useState('');
    const [subject, setSubject] = useState("")

    const addLeadTypeHandler = (e) => {
        e.preventDefault()


        const payload = {
            subject,
            user_id: data.map(item => item[1]),
            message: value
        }

        console.log('[payload]', payload)


        handleModalClose()
        dispatch(SendEmail(payload)).unwrap()
            .then(() => {
                successNotify("Email sent Successfully !")
                dispatch(GetAllEmails())
            })
            .catch((error) => {
                errorNotify(error)
            })


    }



    return (
        <>
            <fieldset className="reset mt-3 p-4 pt-0 t-0 ">
                <legend className="reset mb-3 side-heading px-5 mx-auto">Create Your Email</legend>
                <form>
                    <Row className='mt-3 bg-lightgray'>
                        <Col lg={12} className="pt-3">
                            <div className='property-no'>
                                <InputComp
                                    label="Subject"
                                    type="text"
                                    placeholder="Subject"
                                    name="subject"
                                    onChange={(e) => setSubject(e.target.value)}
                                    value={subject}
                                />
                            </div>

                        </Col>
                        <Col lg={12} className="pt-3">
                            <div className='property-no'>
                                <ReactQuill theme="snow" value={value} onChange={setValue} />
                            </div>

                        </Col>
                    </Row>

                    <Row>
                        <Col lg={12} className=' mt-5'>
                            <ButtonComp
                                type="submit"
                                variant={"outline-primary"}
                                className="btn-main-clr text-white"
                                btnText={'Send'}
                                onClick={addLeadTypeHandler}
                            />
                        </Col>
                    </Row>

                </form>
            </fieldset>
            {/* <EmailLoader /> */}
        </>
    )
}

export default SendEmailForm