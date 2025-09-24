import type {FC} from "react";
import ListGroup from "react-bootstrap/ListGroup";
import {PlayerItem} from "../../../entities/player-item/ui/PlayerItem";
import {BalanceOperationsButton} from "../../../features/balance-operations/ui/BalanceOperationsButton";
import type {Place} from "../../../shared/lib/types/types";

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
