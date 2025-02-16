import Button from 'react-bootstrap/Button';

function ButtonComp(props) {
    const {variant,btnText,className,onClick,type} = props
  return (
    <>
      <Button type={type ? type : 'button'} variant={variant} className={className ? className : ""} onClick={onClick} >{btnText}</Button>
    </>
  );
}

export default ButtonComp;