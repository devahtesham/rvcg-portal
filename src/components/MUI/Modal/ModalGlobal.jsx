import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useModal } from '../../../hooks/useModal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  overflowY: 'auto',
  paddingTop: 4,
  paddingBottom: 5,
  paddingLeft: '22px',
  paddingRight: '22px',
  height: '50rem',
  borderRadius: '20px',

};

export default function ModalGlobal({ children, customStyle }) {
  // console.log(customStyle);
  const { isOpen, handleModalClose,isSmallDevices,isMobileDevice } = useModal();
  React.useEffect(()=>{
    isMobileDevice(800)
  },[])

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={handleModalClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isOpen}>
          <Box sx={{ ...style, width: isSmallDevices ? '76%' : "55%", ...customStyle }}>
            {children}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
