import React, { useState } from 'react';
import Modal from 'react-modal';
import Form from './Form/Form';
import styles from './Header.module.scss';
import modalStyles from './Modal.module.scss';

const Header = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>Kanbanboard</h1>
        <button className={styles.button} onClick={openModal}>
          <span className={styles.plusIcon}>+</span> Add New Task
        </button>
      </header>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={modalStyles.modalContent}
        overlayClassName={modalStyles.modalOverlay}
        ariaHideApp={false}
      >
        <Form onClose={closeModal} />
      </Modal>
    </>
  );
};

export default Header;