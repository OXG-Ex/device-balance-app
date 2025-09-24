import type {FC} from "react";
import {ListGroup} from "react-bootstrap";
import type {Device} from "../../../shared/lib/types/types";

interface DeviceItemProps {
  device: Device;
  onClick: () => void;
  active?: boolean;
}

export const DeviceItem: FC<DeviceItemProps> = ({device, onClick, active}) => {
  return (
    <ListGroup.Item as="li" active={active} onClick={onClick} action>
      {device.name}
    </ListGroup.Item>
  );
};
