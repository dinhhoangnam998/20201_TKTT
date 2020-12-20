import { Box, Container } from "@material-ui/core";
import Page from "./Page";
import PerfectScrollbar from "react-perfect-scrollbar";

export default function View({ children, title }) {
  return (
    <div>
      <Page title={title}>
        <PerfectScrollbar style={{ height: "90vh" }}>
          <Container style={{ overflow: "hidden" }}>
            <Box py={3}>{children}</Box>
          </Container>
        </PerfectScrollbar>
      </Page>
    </div>
  );
}
