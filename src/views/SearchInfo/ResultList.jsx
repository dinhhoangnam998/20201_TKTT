import { makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import ResultItem from "./ResultItem";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2, 0),
    },
    // "& .MuiAlert-root": {
    //   padding: theme.spacing(2, 1),
    // },
    "& .MuiTypography-gutterBottom": {
      marginBottom: 0,
    },
  },
}));

export default function ResultList(props) {
  const cls = useStyles();
  const results = useSelector((state) => state.searchResultSlice.results);
  return (
    <div className={cls.root}>
      {results.map((result) => (
        <ResultItem result={result}></ResultItem>
      ))}
    </div>
  );
}
