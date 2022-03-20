import { Card, Grid, Text, styled } from "@nextui-org/react";
import type { ResourceTable } from "~/types/dbTypes";
import { event } from "~/utils/gtag";
type Props = {
  resources: ResourceTable[];
};

export default function ResourceCardGroup({ resources }: Props) {
  return (
    <Grid.Container gap={2} justify="center">
      {resources.map((resource) => {
        return (
          <Grid key={resource.id} xs={12} md={6}>
            <Card
              css={{
                paddingTop: "$3",
                paddingBottom: "$3",
                cursor: "pointer",
              }}
              hoverable
              onClick={() => {
                event({
                  action: "click card",
                  label: "title",
                  value: resource.domain || resource.title || "",
                });
                window.open(resource.url, "_blank");
              }}
              // clickable
            >
              <Grid
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  gap: 19,
                  alignItems: "center",
                }}
              >
                <div>
                  <img
                    loading="lazy"
                    src={getImageFromMultiplePlace(resource.domain, resource.url)}
                    alt="logo"
                    height={50}
                    width={50}
                  />
                </div>
                <div>
                  <Text span>{resource.title}</Text>
                </div>
              </Grid>

              <Grid
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                  marginTop: 5,
                }}
              >
                <div>
                  <Text span>{resource.description}</Text>
                </div>
                <Grid.Container gap={0.3} wrap={"wrap"}>
                  {resource?.tags?.map((kw) => (
                    <Grid key={kw} css={{ paddingTop: "$xs" }}>
                      <Badge title={kw} />
                    </Grid>
                  ))}
                </Grid.Container>
              </Grid>
            </Card>
          </Grid>
        );
      })}
    </Grid.Container>
  );
}

const getImageFromMultiplePlace = (domain: string | undefined, url: string | undefined) => {
  domain ??= "";
  url ??= "";
  return IconSvgPathMap[domain] || `/icons/${domain}.png` || faviconUrl(50, url);
};

const IconSvgPathMap: { [key: string]: string } = {
  "canva.com": "/icons/canva-logo.svg",
  "github.com": "/icons/github-logo.svg",
  "edu.google.com": "/icons/google-logo.svg",
  "apple.com": "/icons/apple-logo.svg",
  "hulu.com": "/icons/hulu-logo.svg",
  "att.com": "/icons/at-and-t-logo.svg",
  "adidas.com": "/icons/adidas-logo.svg",
  "microsoft.com": "/icons/microsoft-office-logo.svg",
  "autodesk.com": "/icons/autodesk-logo.svg",
  "get.tech": "/icons/gettech-logo.jpeg",
  "buninux.com": "/icons/logo-buninux.svg",
};

export function faviconUrl(size: number, url: string): string {
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?sz=${size}&domain=${domain}`;
  } catch (err) {
    return `./images/globe.svg`;
  }
}

// @ts-ignore : TODO: open PR/ISSUE at NextUI repo
const StyledBadge = styled("span", {
  borderRadius: "$sm",
  border: "2px solid $gray200",
  padding: "$1",
});

const Badge = ({ title }: { title: string }) => {
  return (
    <StyledBadge>
      <Text span weight={"light"} size={13}>
        #{title}
      </Text>
    </StyledBadge>
  );
};
