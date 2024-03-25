import React from 'react';
import { Modal, Button } from 'antd';
import { IoChatboxSharp } from 'react-icons/io5';

const ChatModal = ({ isOpen, onClose }) => {
  return (
    <Modal title="Chat" visible={isOpen} onCancel={onClose} footer={null}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
};

export default ChatModal;
