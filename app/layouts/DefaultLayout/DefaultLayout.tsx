import { Container, createTheme, NextUIProvider } from '@nextui-org/react';
import React from 'react';
import { Links, LiveReload, Meta, Scripts, ScrollRestoration } from 'remix';
import { NavBar } from '../NavBar';

type Props = {
  title?: string;
}

const DefaultLayout: React.FC<Props> = ({ title = "Education Resource", children }) => {
  return <>
    <NavBar />
    <Container>
      {children}
    </Container>
  </>
}
export default DefaultLayout;
