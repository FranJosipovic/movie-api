import React from "react";
import { Button } from "react-bootstrap";
import { useSession } from "../context/SessionContext";

export default function NewSessionPage() {
  const { handleCreateNewSession } = useSession();

  return (
    <Button
      onClick={() => {
        handleCreateNewSession();
      }}
    >
      Create New Session
    </Button>
  );
}
