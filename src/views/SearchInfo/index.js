import SearchBar from "./SearchBar";
import View from "../../utils/View";
import ResultItem from "./ResultItem";
import ResultList from "./ResultList";
import AdvanceSearchBox from "./AdvanceSearchBox";

export default function SearchInfo(props) {
  return (
    <div>
      <View title="Tìm kiếm thông tin">
        <SearchBar></SearchBar>
        <AdvanceSearchBox></AdvanceSearchBox>
        <ResultList></ResultList>
      </View>
    </div>
  );
}
