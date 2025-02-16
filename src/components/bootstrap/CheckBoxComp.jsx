import Form from 'react-bootstrap/Form';

function CheckBoxComp(props) {
  const { className, id, label ,onChange,name,checked} = props
  return (
    <div className={className ? className : ""} style={{fontSize: "17px"}}>
      <Form.Check
        id={id}
        label={label}
        onChange={onChange}
        name={name}
        checked={checked}
      />
    </div>
  );
}

export default CheckBoxComp;