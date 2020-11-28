import SearchBar from "./SearchBar";
import View from "../../utils/View";
import ResultItem from "./ResultItem";

export default function SearchInfo(props) {
  return (
    <div>
      <View title="Tìm kiếm thông tin">
        <SearchBar></SearchBar>
      </View>
    </div>
  );
}
