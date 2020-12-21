import View from "../../utils/View";
import OriginDocuments from "./OriginDocuments";
import ResultList from "./ResultList";
import SearchResultSummary from "./SearchResultSummary";

export default function MoreLikeThis(props) {
  return (
    <div>
      <View title="More Like This">
        <OriginDocuments></OriginDocuments>
        <SearchResultSummary></SearchResultSummary>
        <ResultList></ResultList>
      </View>
    </div>
  );
}
