import {useUnit} from "effector-react";
import {type FC} from "react";
import {Button, Modal} from "react-bootstrap";
import {
  $isModalOpen,
  closeModal,
  openModal,
} from "../model/balanceOperationsModel";
import {BalanceOperationsModal} from "./BalanceOperationsModal";

interface BalanceOperationsButtonProps {
  deviceId: string;
  placeId: number;
}

export const BalanceOperationsButton: FC<BalanceOperationsButtonProps> = ({
  deviceId,
  placeId,
}) => {
  const {closeModalHandler, isModalOpen, openModalHandler} = useUnit({
    isModalOpen: $isModalOpen,
    openModalHandler: openModal,
    closeModalHandler: closeModal,
  });

  return (
    <>
      <Button variant="primary" onClick={openModalHandler}>
        Edit balance
      </Button>

      <Modal show={isModalOpen} onHide={closeModalHandler}>
        <BalanceOperationsModal
          onClose={closeModalHandler}
          deviceId={deviceId}
          placeId={placeId}
        />
      </Modal>
    </>
  );
};
