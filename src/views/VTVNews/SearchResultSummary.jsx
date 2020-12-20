import { Alert, AlertTitle } from "@material-ui/lab";
import { useSelector } from "react-redux";

export default function SearchResultSummary(props) {
  const numFound = useSelector((state) => state.vtvNewsSlice.response.response.numFound);
  const QTime = useSelector((state) => state.vtvNewsSlice.response.responseHeader.QTime);
  return (
    <Alert severity="info">
      <AlertTitle>
        Tìm thấy {numFound} kết quả trong {QTime}ms.
      </AlertTitle>
    </Alert>
  );
}
