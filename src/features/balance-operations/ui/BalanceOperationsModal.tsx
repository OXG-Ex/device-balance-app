import {useState, type FC} from "react";
import {Modal} from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

type BalanceOperationsModalProps = {
  onClose: () => void;
  onSubmit: () => void;
};

export const BalanceOperationsModal: FC<BalanceOperationsModalProps> = ({
  onClose,
  onSubmit,
}) => {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  // const handleClick = async (type) => {
  //   setError("");
  //   try {
  //     await operateBalanceFx({deviceId, player, amount: Number(amount), type});
  //     setAmount("");
  //   } catch (e) {
  //     setError(e.message);
  //   }
  // };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {" "}
        <Form.Control
          size="sm"
          type="number"
          placeholder="Сумма"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mb-2"
          min="0"
          step="0.01"
        />
        <div className="d-flex gap-2 mb-2">
          <Button
            variant="success"
            size="sm"
            // onClick={() => handleClick("deposit")}
          >
            Внести
          </Button>
          <Button
            variant="danger"
            size="sm"
            // onClick={() => handleClick("withdraw")}
          >
            Снять
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
        <Button variant="primary" onClick={onSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </>
  );
};
