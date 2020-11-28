import { Box, Collapse, Grid, TextField, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function AdvanceSearchBox(props) {
  return (
    <Box>
      <Typography align="right">
        <Link>Tìm kiếm nâng cao</Link>
      </Typography>
      <Collapse in={true}>
        <Box>
          <Typography>Lưu ý: Các giá trị ngăn cách nhau bởi dấu phẩy.</Typography>
        </Box>
        <Box>
          <Grid container>
            <Grid md item>
              Time
            </Grid>
            <Grid md item>
              <TextField label="OR" fullWidth></TextField>
            </Grid>
            <Grid md item>
              <TextField label="AND" fullWidth></TextField>
            </Grid>
            <Grid md item>
              <TextField label="NOT" fullWidth></TextField>
            </Grid>
          </Grid>
          <Grid container>
            <Grid md item>
              Link
            </Grid>
            <Grid md item>
              <TextField label="OR" fullWidth></TextField>
            </Grid>
            <Grid md item>
              <TextField label="AND" fullWidth></TextField>
            </Grid>
            <Grid md item>
              <TextField label="NOT" fullWidth></TextField>
            </Grid>
          </Grid>
          <Grid container>
            <Grid md item>
              Content
            </Grid>
            <Grid md item>
              <TextField label="OR" fullWidth></TextField>
            </Grid>
            <Grid md item>
              <TextField label="AND" fullWidth></TextField>
            </Grid>
            <Grid md item>
              <TextField label="NOT" fullWidth></TextField>
            </Grid>
          </Grid>
        </Box>
      </Collapse>
    </Box>
  );
}
