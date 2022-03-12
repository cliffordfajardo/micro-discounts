import { Card, Grid, Text, useTheme, styled, Button } from "@nextui-org/react";
import type { ResourceTable } from "~/types/dbTypes";
type Props = {
  resources: ResourceTable[];
}


const StyledBadge = styled('span', {
  borderRadius: "$sm",
  border: "2px solid $gray200",
  padding: "$xs",
  padding: "$2",
});

const Badge = ({ title }: { title: string }) => {
  const { theme } = useTheme();
  return (
    <StyledBadge>
      <Text span weight={"light"} >#{title}</Text>
    </StyledBadge>
  )
}

const ResourceCardGroup = ({ resources }: Props) => {
  return (
    <Grid.Container gap={2} justify="center">
      {resources.map((resource) => {
        return (
          <Grid key={resource.id} xs={6} md={4}>
            <Card style={{
              width: 280,
              height: 280,
            }}
            css={{
              paddingTop: "$3",
              paddingBottom: "$3",
            }}>
              <div style={{
                display: "flex",
                flexDirection: 'row',
                justifyContent: 'flex-start',
                gap: 19,
                alignItems: "center",
              }}>
                <div>
                  <img src="/icons/canva-logo.png" alt="canva logo" height={50} width={50}/>
                </div>
                <div>
                  <Text span >
                    {resource.title}
                  </Text>
                </div>

              </div>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                marginTop: 5
              }}>

                <div><Text span >{resource.description}</Text></div>
                <div>
                  <Badge title="design" />
                </div>
              </div>


            </Card>
          </Grid>
        );
      })}
    </Grid.Container>
  );
};
export default ResourceCardGroup;