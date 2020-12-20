import { Box, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles, Paper, Popover, Popper, TextField, Typography } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useSnackbar } from "notistack";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCorrectSpelling, setResponse, setSuggestFragment, setSuggestWord } from "./redux";
import throttle from "lodash/throttle";
import debounce from "lodash/debounce";

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
  const [anchorEl, setAnchorEl] = useState(null);
  const wordSuggestions = useSelector((state) => state.vtvNewsSlice.suggestWordResponse.suggest?.wordSuggester[text.trim()]?.suggestions);
  const fragmentSuggestions = useSelector((state) => state.vtvNewsSlice.suggestFragmentResponse.suggest?.fragmentSuggester[text.trim()]?.suggestions);
  const correctSpellingSuggestions = useSelector((state) => state.vtvNewsSlice.correctSpellingSuggestions);
  // const open = wordSuggestions?.length >= 1 || fragmentSuggestions?.length >= 1 || correctSpellingSuggestions?.length >= 1;

  const dp = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  async function hdSearchClick(e) {
    if (text !== "") {
      const hlOptions = `hl=true&hl.fl=paragraphs&hl.preserveMulti=true&hl.maxMultiValuedToMatch=5&hl.simple.pre=<strong>&hl.simple.post=</strong>&hl.mergeContiguous=true`;
      const queryString = `q=${text}&${hlOptions}`;
      const res = await fetch(`http://localhost:8983/solr/vtv_news/select?${queryString}`);
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

  async function fetchSuggestWord(text) {
    const res = await fetch(`http://localhost:8983/solr/vtv_news/suggest?suggest=true&suggest.dictionary=wordSuggester&suggest.q=${text}`);
    if (!res.ok) {
      alert("Cant not suggest word");
    } else {
      dp(setSuggestWord(await res.json()));
    }
  }
  async function fetchSuggestFragment(text) {
    const res = await fetch(`http://localhost:8983/solr/vtv_news/suggest?suggest=true&suggest.dictionary=fragmentSuggester&suggest.q=${text}`);
    if (!res.ok) {
      alert("Cant not suggest fragment");
    } else {
      dp(setSuggestFragment(await res.json()));
    }
  }

  async function fetchCorrectSpelling(text) {
    const res = await fetch(`http://localhost:8983/solr/vtv_news/spell?spellcheck=true&spellcheck.collateParam.q.op=AND&spellcheck.q=${text}`);
    if (!res.ok) {
      alert("Cant not suggest fragment");
    } else {
      dp(setCorrectSpelling(await res.json()));
    }
  }

  const throttledFetchSuggestWord = useCallback(throttle(fetchSuggestWord, 300), []);
  const throttledFetchSuggestFragment = useCallback(throttle(fetchSuggestFragment, 300), []);
  const throttledFetchCorrectSpelling = useCallback(throttle(fetchCorrectSpelling, 300), []);
  const debouncedFetchSuggestWord = useCallback(debounce(fetchSuggestWord, 150), []);
  const debouncedFetchSuggestFragment = useCallback(debounce(fetchSuggestFragment, 150), []);
  const debouncedFetchCorrectSpelling = useCallback(debounce(fetchCorrectSpelling, 150), []);

  async function hdTextChange(e) {
    const text = e.target.value;
    setText(text);
    if (text === "") {
      setAnchorEl(null);
    }
    if (text !== "" && text[text.length - 1] !== " ") {
      // console.log("fetch ...");
      setAnchorEl(e.currentTarget);
      // throttledFetchSuggestWord(text);
      // throttledFetchSuggestFragment(text);
      // throttledFetchCorrectSpelling(text);
      debouncedFetchSuggestWord(text);
      debouncedFetchSuggestFragment(text);
      debouncedFetchCorrectSpelling(text);
    }
  }

  return (
    <div>
      <Box className={cls.root}>
        <Typography variant="button">Từ khóa:</Typography>
        <TextField className={cls.grow} fullWidth value={text} onChange={hdTextChange}></TextField>
        <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} placement={"bottom"}>
          <Paper style={{ width: "1000px", minHeight: "200px" }}>
            <List>
              {console.log(wordSuggestions)}
              {wordSuggestions?.length >= 1 && (
                <ListItem>
                  <ListItemIcon>
                    <SearchIcon></SearchIcon>
                  </ListItemIcon>
                  <ListItemText>{wordSuggestions[0].term}</ListItemText>
                </ListItem>
              )}
              {wordSuggestions?.length >= 2 && (
                <ListItem>
                  <ListItemIcon>
                    <SearchIcon></SearchIcon>
                  </ListItemIcon>
                  <ListItemText>{wordSuggestions[1].term}</ListItemText>
                </ListItem>
              )}
              {correctSpellingSuggestions.length >= 1 && (
                <ListItem>
                  <ListItemIcon>
                    <SearchIcon></SearchIcon>
                  </ListItemIcon>
                  <ListItemText>{correctSpellingSuggestions[0].collationQuery}</ListItemText>
                </ListItem>
              )}
              {correctSpellingSuggestions.length >= 2 && (
                <ListItem>
                  <ListItemIcon>
                    <SearchIcon></SearchIcon>
                  </ListItemIcon>
                  <ListItemText>{correctSpellingSuggestions[1].collationQuery}</ListItemText>
                </ListItem>
              )}
              {fragmentSuggestions?.map((item, index) => {
                return (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <SearchIcon></SearchIcon>
                    </ListItemIcon>
                    <ListItemText>
                      <Typography dangerouslySetInnerHTML={{ __html: item.term }}></Typography>
                    </ListItemText>
                  </ListItem>
                );
              })}
            </List>
          </Paper>
        </Popper>
        <IconButton variant="contained" color="primary" onClick={hdSearchClick}>
          <SearchIcon></SearchIcon>
        </IconButton>
      </Box>
    </div>
  );
}
