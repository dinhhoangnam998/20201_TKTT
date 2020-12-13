import { Alert, AlertTitle } from "@material-ui/lab";
import { useSelector } from "react-redux";

export default function SearchResultMetaInfo(props) {
  const show = useSelector((state) => state.searchResultSlice.showResHeader);
  const numDoc = useSelector((state) => state.searchResultSlice.results.length);
  const QTime = useSelector((state) => state.searchResultSlice.QTime);
  return (
    show && (
      <Alert severity="info">
        <AlertTitle>
          Tìm thấy {numDoc} kết quả trong {QTime}ms.
        </AlertTitle>
      </Alert>
    )
  );
}
