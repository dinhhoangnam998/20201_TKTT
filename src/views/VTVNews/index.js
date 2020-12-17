import View from "../../utils/View";
import AdvanceSearchBox from "./AdvanceSearchBox";
import ResultList from "./ResultList";
import SearchBar from "./SearchBar";
import SearchResultSummary from "./SearchResultSummary";

export default function SearchInfo(props) {
  return (
    <div>
      <View title="Tìm kiếm thông tin">
        <SearchBar></SearchBar>
        <AdvanceSearchBox></AdvanceSearchBox>
        <SearchResultSummary></SearchResultSummary>
        <ResultList></ResultList>
      </View>
    </div>
  );
}
