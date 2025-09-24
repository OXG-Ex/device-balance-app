import {useUnit} from "effector-react";
import {type FC} from "react";
import {Alert, Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  $error,
  $inputAmount,
  setInputAmount,
  updateBalance,
} from "../model/balanceOperationsModel";

type BalanceOperationsModalProps = {
  onClose: () => void;
  deviceId: string;
  placeId: number;
};

export const BalanceOperationsModal: FC<BalanceOperationsModalProps> = ({
  onClose,
  deviceId,
  placeId,
}) => {
  const {inputAmount, setInputAmountHandler, updateBalanceHandler, error} =
    useUnit({
      inputAmount: $inputAmount,
      setInputAmountHandler: setInputAmount,
      updateBalanceHandler: updateBalance,
      error: $error,
    });

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Edit balance</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          size="sm"
          type="text"
          placeholder="Amount"
          value={inputAmount}
          onChange={(e) => setInputAmountHandler(e.target.value)}
          className="mb-2"
        />
        <div className="d-flex gap-2 mb-2">
          <Button
            variant="success"
            size="sm"
            onClick={() =>
              updateBalanceHandler({type: "deposit", deviceId, placeId})
            }
          >
            Deposit
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() =>
              updateBalanceHandler({type: "withdraw", deviceId, placeId})
            }
          >
            Withdraw
          </Button>
        </div>
        {error && (
          <Alert variant="warning" className="py-1">
            {error}
          </Alert>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </>
  );
};
