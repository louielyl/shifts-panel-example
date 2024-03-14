import { Role } from "@/types";
import { Chip } from "@nextui-org/react";
import React from "react";

export const RoleTag = ({ role }: { role: Role | null }) => {
  switch (role) {
    case "ST": {
      return (
        <Chip className="border-none" color="primary" variant="dot">
          ST
        </Chip>
      );
    }
    case "EN": {
      return (
        <Chip className="border-none" color="warning" variant="dot">
          EN
        </Chip>
      );
    }
    case "PWH": {
      return (
        <Chip className="border-none" color="success" variant="dot">
          PWH
        </Chip>
      );
    }
    default: {
      return <></>;
    }
  }
};
