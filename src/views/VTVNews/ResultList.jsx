import { makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import ResultItem from "./ResultItem";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2, 0),
    },
    "& .MuiTypography-gutterBottom": {
      marginBottom: 0,
    },
  },
}));

export default function ResultList(props) {
  const cls = useStyles();
  const results = useSelector((state) => state.vtvNewsSlice.results);
  return (
    <div className={cls.root}>
      {results.map((result, index) => (
        <ResultItem key={index} result={result} index={index + 1}></ResultItem>
      ))}
    </div>
  );
}
