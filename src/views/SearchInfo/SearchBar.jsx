import { Box, IconButton, makeStyles, TextField, Typography } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setResponse } from "./redux";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1, 2),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
  },
  grow: {
    flexBasis: "80%",
  },
}));

export default function SearchBar(props) {
  const cls = useStyles();
  const [text, setText] = useState("");
  const dp = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  async function hdSearchClick(e) {
    if (text !== "") {
      const queryString = `q=${text}&hl=true&hl.fl=content&hl.fragsize=50`;
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}?${queryString}`);
      const body = await res.json();
      if (!res.ok) {
        alert(JSON.stringify(body));
      } else {
        dp(setResponse(body));
      }
    } else {
      enqueueSnackbar("Hãy nhập từ khóa để bắt đầu tìm kiếm", { variant: "info", anchorOrigin: { vertical: "bottom", horizontal: "center" } });
    }
  }

  return (
    <div>
      <Box className={cls.root}>
        <Typography variant="button">Từ khóa:</Typography>
        <TextField className={cls.grow} fullWidth value={text} onChange={(e) => setText(e.target.value)}></TextField>
        <IconButton variant="contained" color="primary" onClick={hdSearchClick}>
          <SearchIcon></SearchIcon>
        </IconButton>
      </Box>
    </div>
  );
}
