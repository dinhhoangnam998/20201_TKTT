import { useSelector } from "react-redux";
import ResultItem from "./ResultItem";

export default function OriginDocuments(props) {
  const originDoc = useSelector((state) => state.vtvNewsSlice.moreLikeThisResponse.match.docs[0]);
  return <div>{originDoc && <ResultItem doc={originDoc} title={"Văn bản gốc"}></ResultItem>}</div>;
}
