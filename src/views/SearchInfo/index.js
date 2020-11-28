import SearchBar from "./SearchBar";
import View from "../../utils/View";
import ResultItem from "./ResultItem";
import ResultList from "./ResultList";

export default function SearchInfo(props) {
  return (
    <div>
      <View title="Tìm kiếm thông tin">
        <SearchBar></SearchBar>
        <ResultList></ResultList>
      </View>
    </div>
  );
}
