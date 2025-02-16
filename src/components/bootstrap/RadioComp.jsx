import Form from 'react-bootstrap/Form';

function RadioComp(props) {
  return (
    
        <div key={`default-radio`} className="mb-3">
          <Form.Check
            type={"radio"}
            label={props.label}
            id={props.id}
            name={props.name}
          />
        </div>
  );
}

export default RadioComp;