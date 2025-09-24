import type {FC, ReactNode} from "react";
import {Card, Stack} from "react-bootstrap";
import type {Place} from "../../../shared/lib/types/types";

interface PlayerItemProps {
  place: Place;
  actionsSlot: ReactNode;
}

export const PlayerItem: FC<PlayerItemProps> = ({place, actionsSlot}) => {
  return (
    <Card>
      <Card.Body>
        <Stack gap={3}>
          <div className="p-2">{`Balance: ${place.balances} ${place.currency}`}</div>
          <div className="p-2">{`Place: ${place.place} `}</div>
          <div className="p-2">{`Device ID: ${place.device_id} `}</div>
        </Stack>
        {actionsSlot && actionsSlot}
      </Card.Body>
    </Card>
  );
};
