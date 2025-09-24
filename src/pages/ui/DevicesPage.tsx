import {useUnit} from "effector-react";
import type {FC} from "react";
import {Card, Col, Container, Row} from "react-bootstrap";
import {DeviceList} from "../../widgets/device-list/ui/DeviceList";
import {PlayerList} from "../../widgets/players-list/ui/PlayersList";
import {$selectedDevice, selectDevice} from "../model/devicesPageModel";

export const DevicesPage: FC = () => {
  const {selectDeviceHandler, selectedDevice} = useUnit({
    selectDeviceHandler: selectDevice,
    selectedDevice: $selectedDevice,
  });
  return (
    <Container className="pt-3">
      <Row gap={80}>
        <Col>
          <Card>
            <Card.Header>Devices List</Card.Header>
            <Card.Body>
              <DeviceList
                onSelectDevice={selectDeviceHandler}
                selectedDevice={selectedDevice}
              />
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card>
            <Card.Header>Places List</Card.Header>
            <Card.Body>
              <PlayerList players={selectedDevice?.places} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
