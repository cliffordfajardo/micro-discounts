import { Container } from "@nextui-org/react";
import React from "react";
import { NavBar } from "../NavBar";

type Props = {
  title?: string;
  submitForm?: () => void;
};

const DefaultLayout: React.FC<Props> = ({ title = "About | Microdiscounts.website", children, submitForm }) => {
  return (
    <>
      <NavBar submitForm={submitForm as () => void} />
      <Container>{children}</Container>
    </>
  );
};
export default DefaultLayout;
