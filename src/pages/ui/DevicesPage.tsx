import {useUnit} from "effector-react";
import type {FC} from "react";
import {Card} from "react-bootstrap";
import {DeviceList} from "../../widgets/device-list/ui/DeviceList";
import {$selectedId, selectDevice} from "../model/devicesPageModel";

export const DevicesPage: FC = () => {
  const {selectDeviceHandler, selectedId} = useUnit({
    selectDeviceHandler: selectDevice,
    selectedId: $selectedId,
  });
  return (
    <Card>
      <Card.Header>Devices List</Card.Header>
      <Card.Body>
        <DeviceList
          onSelectDevice={selectDeviceHandler}
          selectedDeviceId={selectedId}
        />
      </Card.Body>
    </Card>
  );
};
