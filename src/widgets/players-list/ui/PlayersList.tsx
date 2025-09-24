import type {FC} from "react";
import ListGroup from "react-bootstrap/ListGroup";
import {PlayerItem} from "../../../entities";
import {BalanceOperationsButton} from "../../../features";
import type {Place} from "../../../shared";

type PlayerListProps = {
  players?: Place[];
};

export const PlayerList: FC<PlayerListProps> = ({players}) => {
  if (!players) {
    return "No device selected";
  }

  return (
    <ListGroup>
      {players?.map((place, idx) => (
        <PlayerItem
          key={idx}
          place={place}
          actionsSlot={
            <BalanceOperationsButton
              deviceId={place.deviceId}
              placeId={place.place}
            />
          }
        />
      ))}
    </ListGroup>
  );
};
