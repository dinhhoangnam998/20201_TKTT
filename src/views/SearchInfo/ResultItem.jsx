import { Box, Divider, Typography } from "@material-ui/core";

export default function ResultItem({ result }) {
  return (
    <div>
      <Box bgcolor="white" minHeight={200} p={2} mt={2}>
        <Box pb={1}>
          <Typography>{result.time}</Typography>
        </Box>
        <Divider></Divider>
        <Box pt={1}>
          <Typography>{result.content}</Typography>
        </Box>
      </Box>
    </div>
  );
}
