import { Button, Col, Container, Row, Spacer, Link as NextUiLink, Text } from '@nextui-org/react';
import React from 'react';
import { Link, useLocation } from 'remix';

export default function NavBar() {
  const location = useLocation();
  const activeHomePage = location.pathname === '/';
  const activeAboutPage = location.pathname === '/about';
  return <Container
    lg={true}
    as="nav"
    display="flex"
    wrap="nowrap"
    alignItems='center'
    fluid
    css={{
      height: 76,

    }}
  >
    <Col>
      <Link to="/" color='$text'>
        <Text h3 weight={"extrabold"}>
         MicroDiscount
        </Text>
      </Link>
    </Col>
    <Col>
      <Row justify="flex-end" align='center' gap={3}>
        <Spacer x={1} y={0} />
        <Link to="/" >
          <NextUiLink css={{
            color: activeHomePage ? '$primary' : "$text",
            fontWeight: activeHomePage ? 'bold' : 'normal',

          }}>
            Explore
          </NextUiLink>
        </Link>
        <Spacer x={1} y={0} />
        {/* <Link to="/about" >
          <NextUiLink css={{
            color: activeAboutPage ? '$primary' : "$text",
            fontWeight: activeAboutPage ? 'bold' : 'normal',
          }}>
            About
          </NextUiLink>
        </Link>
        <Spacer x={1} y={0} /> */}
        <Button css={{ padding: '$6', minWidth: "min-content", borderRadius: '$pill' }}>
          Add a Resource
        </Button>
      </Row>
    </Col>
  </Container>
}