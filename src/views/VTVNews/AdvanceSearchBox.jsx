import { Box, Button, Collapse, Grid, Link, makeStyles, TextField, Typography } from "@material-ui/core";
import clsx from "clsx";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  marginBottomChild: {
    "& > *": {
      marginBottom: theme.spacing(2),
      "&:last-child": {
        marginBottom: 0,
      },
    },
  },
}));

export default function AdvanceSearchBox(props) {
  const cls = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <Box my={2}>
      <Box textAlign="right" mb={1}>
        <Button color="primary" onClick={(e) => setOpen(!open)}>
          Tìm kiếm nâng cao
        </Button>
      </Box>
      <Collapse in={open}>
        <Box p={2} bgcolor="white">
          <Box mb={3}>
            <Typography>Lưu ý: Các giá trị ngăn cách nhau bởi dấu phẩy.</Typography>
          </Box>
          <Box className={cls.marginBottomChild}>
            <Grid container spacing={4} alignItems="center">
              <Grid md={1} item>
                <Typography variant="button">Time:</Typography>
              </Grid>
              <Grid md item>
                <TextField label="A, B --> A || B" fullWidth InputLabelProps={{ shrink: true }}></TextField>
              </Grid>
              <Grid md item>
                <TextField label="A, B --> A && B" fullWidth InputLabelProps={{ shrink: true }}></TextField>
              </Grid>
              <Grid md item>
                <TextField label="A, B --> !A !B" fullWidth InputLabelProps={{ shrink: true }}></TextField>
              </Grid>
            </Grid>
            <Grid container spacing={4} alignItems="center">
              <Grid md={1} item>
                <Typography variant="button">Link:</Typography>
              </Grid>
              <Grid md item>
                <TextField label="A, B --> A || B" fullWidth InputLabelProps={{ shrink: true }}></TextField>
              </Grid>
              <Grid md item>
                <TextField label="A, B --> A && B" fullWidth InputLabelProps={{ shrink: true }}></TextField>
              </Grid>
              <Grid md item>
                <TextField label="A, B --> !A !B" fullWidth InputLabelProps={{ shrink: true }}></TextField>
              </Grid>
            </Grid>
            <Grid container spacing={4} alignItems="center">
              <Grid md={1} item>
                <Typography variant="button">Content:</Typography>
              </Grid>
              <Grid md item>
                <TextField label="A, B --> A || B" fullWidth InputLabelProps={{ shrink: true }}></TextField>
              </Grid>
              <Grid md item>
                <TextField label="A, B --> A && B" fullWidth InputLabelProps={{ shrink: true }}></TextField>
              </Grid>
              <Grid md item>
                <TextField label="A, B --> !A !B" fullWidth InputLabelProps={{ shrink: true }}></TextField>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
}
