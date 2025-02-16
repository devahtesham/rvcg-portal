import Form from 'react-bootstrap/Form';

function DropDownComp(props) {
    let { onChange, name, options, className, value, label } = props
    options = [{ label: label, value: "" }, ...options]
    return (
        <>
            <Form.Select value={value} aria-label="Default select example" className={className ? className : " "} onChange={onChange} name={name}>
                {
                    options.map((option,index) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))
                }
            </Form.Select>
        </>
    );
}

export default DropDownComp;