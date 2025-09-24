import type {FC} from "react";
import {Card, Collapse} from "react-bootstrap";
import type {Device} from "../../../shared/lib/types/types";
import {PlayerList} from "../../../widgets/players-list/ui/PlayersList";

interface DeviceItemProps {
  device: Device;
  onClick: () => void;
}

export const DeviceItem: FC<DeviceItemProps> = ({device}) => {
  return (
    <Card className="mb-3" key={device.id}>
      <Card.Header
        style={{cursor: "pointer"}}
        onClick={() => setOpenId(openId === device.id ? null : device.id)}
      >
        {device.name}
      </Card.Header>
      <Collapse in={openId === device.id}>
        <div>
          <Card.Body>
            <PlayerList players={device.players} deviceId={device.id} />
          </Card.Body>
        </div>
      </Collapse>
    </Card>
  );
};
