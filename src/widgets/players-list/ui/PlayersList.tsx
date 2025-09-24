import ListGroup from "react-bootstrap/ListGroup";
import {PlayerItem} from "../../../entities/player-item/ui/PlayerItem";

export const PlayerList = ({players, deviceId}) => (
  <ListGroup>
    {players.map((player) => (
      <PlayerItem key={player.id} player={player} deviceId={deviceId} />
    ))}
  </ListGroup>
);
