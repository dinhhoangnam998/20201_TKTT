import View from "../../utils/View";
import AdvanceSearchBox from "./AdvanceSearchBox";
import ResultList from "./ResultList";
import SearchBar from "./SearchBar";
import SearchResultMetaInfo from "./SearchResultMetaInfo";

export default function SearchInfo(props) {
  return (
    <div>
      <View title="Tìm kiếm thông tin">
        <SearchBar></SearchBar>
        <AdvanceSearchBox></AdvanceSearchBox>
        <SearchResultMetaInfo></SearchResultMetaInfo>
        <ResultList></ResultList>
      </View>
    </div>
  );
}
