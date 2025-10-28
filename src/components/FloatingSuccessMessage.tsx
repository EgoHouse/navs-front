import React from 'react';
import { createPortal } from 'react-dom';
import SuccessMessage from './SuccessMessage';

interface FloatingSuccessMessageProps {
  message: string;
  isVisible: boolean;
  onClose?: () => void;
  autoHideDuration?: number;
}

const FloatingSuccessMessage: React.FC<FloatingSuccessMessageProps> = ({
  message,
  isVisible,
  onClose,
  autoHideDuration = 3000
}) => {
  const messageElement = (
    <SuccessMessage
      message={message}
      isVisible={isVisible}
      onClose={onClose}
      autoHideDuration={autoHideDuration}
      showCloseButton={false}
      size="md"
      position="fixed"
    />
  );

  return createPortal(messageElement, document.body);
};

export default FloatingSuccessMessage;