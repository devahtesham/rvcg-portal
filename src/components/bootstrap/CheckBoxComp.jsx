import Form from 'react-bootstrap/Form';

function CheckBoxComp(props) {
  const { className, id, label, onChange, name, checked, size } = props
  return (
    <div className={className ? className : ""} style={{ fontSize: size ? size : "17px" }}>
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