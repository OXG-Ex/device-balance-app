import {useState} from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {operateBalanceFx} from "../model/balance-operations.model";

export const BalanceOperations = ({player, deviceId}) => {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const handleClick = async (type) => {
    setError("");
    try {
      await operateBalanceFx({deviceId, player, amount: Number(amount), type});
      setAmount("");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div style={{minWidth: 220}}>
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
          onClick={() => handleClick("deposit")}
        >
          Внести
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={() => handleClick("withdraw")}
        >
          Снять
        </Button>
      </div>
      {error && (
        <Alert variant="warning" className="py-1">
          {error}
        </Alert>
      )}
    </div>
  );
};
