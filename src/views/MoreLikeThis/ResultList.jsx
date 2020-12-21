import { makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import ResultItem from "./ResultItem";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2, 0),
    },
  },
}));

export default function ResultList(props) {
  const cls = useStyles();
  const docs = useSelector((state) => state.vtvNewsSlice.moreLikeThisResponse.response.docs);
  return <div className={cls.root}>{docs.length > 0 && docs.map((doc, index) => <ResultItem key={index} doc={doc} index={index + 1}></ResultItem>)}</div>;
}
