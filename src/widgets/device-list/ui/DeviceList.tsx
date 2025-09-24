import {useGate, useUnit} from "effector-react";
import type {FC} from "react";
import {ListGroup} from "react-bootstrap";
import {DeviceItem} from "../../../entities/device-item/ui/DeviceItem";
import type {Device} from "../../../shared/lib/types/types";
import {$devices, DevicesListGate} from "../model/deviceListModel";

type DevicesListProps = {
  selectedDevice: Device | null;
  onSelectDevice: (device: Device) => void;
};

export const DeviceList: FC<DevicesListProps> = ({
  onSelectDevice,
  selectedDevice,
}) => {
  useGate(DevicesListGate);

  const {devices} = useUnit({devices: $devices});

  return (
    <ListGroup as="ul">
      {devices.map((device) => (
        <DeviceItem
          device={device}
          key={device.id}
          onClick={() => onSelectDevice(device)}
          active={selectedDevice?.id === device.id}
        />
      ))}
    </ListGroup>
  );
};
