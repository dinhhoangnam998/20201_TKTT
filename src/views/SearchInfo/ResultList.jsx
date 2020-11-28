import { makeStyles, Typography } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
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
  const QTime = useSelector((state) => state.searchResultSlice.QTime);
  const show = useSelector((state) => state.searchResultSlice.showResHeader);
  return (
    <div className={cls.root}>
      {show && (
        <Alert severity="info">
          <AlertTitle>
            Tìm thấy {results.length} kết quả trong {QTime}ms.
          </AlertTitle>
        </Alert>
      )}
      {results.map((result) => (
        <ResultItem result={result}></ResultItem>
      ))}
    </div>
  );
}
