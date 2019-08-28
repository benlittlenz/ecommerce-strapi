import React from 'react';
import { Toast, Box } from 'gestalt';

const ToastMsg = ({ show, message }) => {
  return (
    show && (
      <Box
        dangerouslySetInlineStyle={{
          __style: {
            bottom: 250,
            left: '50%',
            transform: 'transateX(-50%)'
          }
        }}
        position="fixed"
      >
        <Toast color="orage" text={message} />
      </Box>
    )
  );
};

export default ToastMsg;
