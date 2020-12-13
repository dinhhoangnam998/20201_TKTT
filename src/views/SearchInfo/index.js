import View from "../../utils/View";
import AdvanceSearchBox from "./AdvanceSearchBox";
import ResultList from "./ResultList";
import SearchBar from "./SearchBar";
import SearchResultMetaBar from "./SearchResultMetaBar";

export default function SearchInfo(props) {
  return (
    <div>
      <View title="Tìm kiếm thông tin">
        <SearchBar></SearchBar>
        <AdvanceSearchBox></AdvanceSearchBox>
        <SearchResultMetaBar></SearchResultMetaBar>
        <ResultList></ResultList>
      </View>
    </div>
  );
}
