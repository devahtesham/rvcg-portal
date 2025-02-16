import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

function InputComp(props) {
  const { label, type, placeholder, controlId, value, name, onChange, required, id ,disabled} = props
  return (
    <>
      <FloatingLabel
        label={label}
        className={`mb-4 ${props.className ? props.className : ''}`}
        disabled={disabled}
      >
        <Form.Control disabled={disabled} type={type} placeholder={placeholder} value={value} name={name} onChange={onChange} required={required ? true : false} id={id ? id : ''} />
      </FloatingLabel>
    </>
  );
}

export default InputComp;