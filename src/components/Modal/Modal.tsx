import React, { Suspense } from "react";
import Modal from "react-modal";

type ModalProps = {
  children: React.ReactNode;
  visible: boolean;
  setVisibility?: (
    event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>
  ) => void;
  afterOpenModal?: Modal.OnAfterOpenCallback | undefined;
};

const ModalComp: React.FC<ModalProps> = ({
  children,
  visible = true,
  setVisibility,
  afterOpenModal,
}) => {
  return (
    <Suspense>
      <Modal
        className={" grid place-items-center  h-screen  w-screen z-[9999]"}
        isOpen={visible}
        onAfterOpen={afterOpenModal}
        onRequestClose={setVisibility}
        contentLabel="Modal"
        ariaHideApp={false}
      >
        {children}
      </Modal>
    </Suspense>
  );
};

export default ModalComp;
