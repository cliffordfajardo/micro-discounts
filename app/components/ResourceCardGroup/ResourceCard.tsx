import { Card } from "@nextui-org/react";
import type { ResourceTable } from "~/types/dbTypes";

type Props = {
  resource: ResourceTable;
};

const ResourceCard = ({ resource }: Props) => {
  return (
    <Card css={{ width: 280, height: 280 }}>
      <p>{resource.title}</p>
    </Card>
  );
};
export default ResourceCard;
