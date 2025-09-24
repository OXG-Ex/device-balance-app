import {useState, type FC} from "react";
import {Button, Modal} from "react-bootstrap";
import {BalanceOperationsModal} from "./BalanceOperationsModal";

interface BalanceOperationsButtonProps {}

export const BalanceOperationsButton: FC<BalanceOperationsButtonProps> = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Actions
      </Button>

      <Modal show={show} onHide={handleClose}>
        <BalanceOperationsModal onClose={handleClose} onSubmit={console.log} />
      </Modal>
    </>
  );
};
