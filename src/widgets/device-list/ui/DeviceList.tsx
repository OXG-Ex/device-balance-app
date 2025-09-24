import {useGate, useUnit} from "effector-react";
import type {FC} from "react";
import {ListGroup} from "react-bootstrap";
import {DeviceItem} from "../../../entities/device-item/ui/DeviceItem";
import {$devices, DevicesListGate} from "../model/deviceListModel";

type DevicesListProps = {
  selectedDeviceId: number | null;
  onSelectDevice: (id: number) => void;
};

export const DeviceList: FC<DevicesListProps> = ({
  onSelectDevice,
  selectedDeviceId,
}) => {
  useGate(DevicesListGate);

  const {devices} = useUnit({devices: $devices});

  return (
    <ListGroup as="ul">
      {devices.map((device) => (
        <DeviceItem
          device={device}
          key={device.id}
          onClick={() => onSelectDevice(device.id)}
          active={selectedDeviceId === device.id}
        />
      ))}
    </ListGroup>
  );
};
