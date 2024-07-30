import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';

import { Modal } from "antd";

export default function UseEffect({contentModal}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsModalOpen(true);
    }, 5000);
  }, []);

  return (
    <div>
      <Modal
        title="Modal"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <p>{contentModal}</p>

      </Modal>
    </div>
  );


}
UseEffect.propTypes = {
    contentModal: PropTypes.string.isRequired, 
  };
