import View from "../../utils/View";
import ResultList from "./ResultList";
import SearchResultSummary from "./SearchResultSummary";

export default function MoreLikeThis(props) {
  return (
    <div>
      <View title="More Like This">
        <SearchResultSummary></SearchResultSummary>
        <ResultList></ResultList>
      </View>
    </div>
  );
}
