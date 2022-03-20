import {
  Button,
  Col,
  Container,
  Row,
  Spacer,
  Link as NextUiLink,
  Text,
  usePortal,
  styled,
  useBodyScroll,
  Grid,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "remix";
import { SearchFilterSideBar } from "~/components/SearchFilterSideBar";
import useMediaQuery from "~/utils/useMediaQuery";

export default function NavBar({ submitForm }: { submitForm: () => void }) {
  const location = useLocation();
  const activeHomePage = location.pathname === "/";
  const activeAboutPage = location.pathname === "/about";
  const isMobile = useMediaQuery("(max-width: 960px)");
  const [expanded, setExpanded] = useState(false);

  // To avoid scrolling the body when mouse is hovered over the top nav on mobile
  const [, setBodyHidden] = useBodyScroll(null, { scrollLayer: true });

  useEffect(() => {
    if (!isMobile) {
      setExpanded(false);
      setBodyHidden(false);
    }
  }, [isMobile, setBodyHidden]);

  return (
    <Container
      lg={true}
      as="nav"
      display="flex"
      wrap="nowrap"
      alignItems="center"
      fluid
      css={{
        position: "sticky",
        top: 0,
        background: "rgba(255,255,255,0.75)",
        zIndex: 100,
        height: 76,
      }}
    >
      <Col>
        <Link to="/" color="$text">
          <Text h3 weight={"extrabold"}>
            MicroDiscount
          </Text>
        </Link>
      </Col>
      {!isMobile && (
        <Col css={{ marginRight: "$2" }}>
          <Row justify="flex-end" align="center">
            {/* <Spacer x={1} y={0} />
            <Link to="/">
              <NextUiLink
                css={{
                  color: activeHomePage ? "$primary" : "$text",
                  fontWeight: activeHomePage ? "bold" : "normal",
                }}
              >
                Explore
              </NextUiLink>
            </Link> */}
            <Spacer x={1} y={0} />
            <Link to="/about">
              <NextUiLink
                css={{
                  color: activeAboutPage ? "$primary" : "$text",
                  fontWeight: activeAboutPage ? "bold" : "normal",
                }}
              >
                About
              </NextUiLink>
            </Link>
            <Spacer x={1} y={0} />
            <AddResourceBtn />
          </Row>
        </Col>
      )}
      {isMobile && (
        <Col>
          <Row justify="flex-end">
            <MenuToggleButton
              onClick={() => {
                setExpanded(!expanded);
                isMobile && setBodyHidden(!expanded);
              }}
            >
              open
            </MenuToggleButton>

            <MobileNav opened={expanded} submitForm={submitForm} />
          </Row>
        </Col>
      )}
    </Container>
  );
}

const AddResourceBtn = () => {
  return (
    <Button
      css={{ padding: "$6", minWidth: "min-content", borderRadius: "$pill" }}
      onClick={() => {
        window.open("https://6pyrobzjqsd.typeform.com/to/FRXFgGBb", "_blank");
      }}
    >
      Add a Resource
    </Button>
  );
};

const MobileNav = ({ opened, submitForm }: { opened: boolean; submitForm: () => void }) => {
  console.log("mobile nav", opened);
  const portal = usePortal("mobile-nav");

  return portal
    ? createPortal(
        <NavContainer
          style={
            opened
              ? {
                  top: 63,
                  height: "calc(100% - 64px)",
                }
              : {}
          }
        >
          <MobileNavWrapper
            style={opened ? { display: "flex", flexDirection: "column" } : {}}
            css={{
              padding: "$10",
            }}
          >
            <SearchFilterSideBar formName="search-form" submitForm={submitForm} />
            <Grid css={{ marginTop: "$8" }}>
              <AddResourceBtn />
            </Grid>
          </MobileNavWrapper>
        </NavContainer>,
        portal,
      )
    : null;
};

//@ts-ignore
const NavContainer = styled("div", {
  position: "fixed",
  top: 60,
  zIndex: 2000,
  right: 0,
  left: 0,
  bottom: 0,
  display: "block",
  margin: 0,
  width: "100%",
  height: 0,
  transition: "all 0.25 ease",
  overflowY: "scroll",
  overflowX: "hidden",
  userSelect: "none",
});

//@ts-ignore
const MobileNavWrapper = styled("div", {
  display: "none",
  width: "100%",
  minHeight: "100%",
  transition: "all 0.2 ease 50ms",
  background: "rgba(255, 255, 255, 0.60)",
  backdropFilter: "saturate(180%) blur(10px)",
});

const MenuToggleButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button
      light
      color="primary"
      onClick={onClick}
      css={{
        width: "min-content",
      }}
      auto
    >
      <div
        style={{
          position: "relative",
          width: 25,
          height: 25,
          // backgroundColor: 'black',

          // borderRadius: '$2',
        }}
      >
        <HamburgerBar
          style={{
            transition: "transform 1s",
            transformOrigin: "left",
            top: 3,
          }}
        />
        <HamburgerBar
          style={{
            transition: "transform 1s",
            top: 8,
          }}
        />
        <HamburgerBar
          style={{
            transition: "transform 1s",
            top: 13,
          }}
        />
      </div>
    </Button>
  );
};

//@ts-ignore
const HamburgerBar = styled("div", {
  position: "relative",
  width: 25,
  height: 4,
  backgroundColor: "$black",
  borderRadius: "$pill",
});
