import { Alert, AlertTitle } from "@material-ui/lab";
import { useSelector } from "react-redux";

export default function SearchResultSummary(props) {
  const numFound = useSelector((state) => state.vtvNewsSlice.moreLikeThisResponse.response.numFound);
  const QTime = useSelector((state) => state.vtvNewsSlice.moreLikeThisResponse.responseHeader.QTime);
  return (
    <Alert severity="info">
      <AlertTitle>
        Tìm thấy {numFound} tài liệu tương tự trong {QTime}ms.
      </AlertTitle>
    </Alert>
  );
}
