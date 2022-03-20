import { Container } from "@nextui-org/react";
import React from "react";
import { NavBar } from "../NavBar";

type Props = {
  title?: string;
  submitForm: () => void;
};

const DefaultLayout: React.FC<Props> = ({ title = "Education Resource", children, submitForm }) => {
  return (
    <>
      <NavBar submitForm={submitForm} />
      <Container>{children}</Container>
    </>
  );
};
export default DefaultLayout;
