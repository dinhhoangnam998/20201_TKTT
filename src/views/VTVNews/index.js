import { useSelector } from "react-redux";
import View from "../../utils/View";
import AdvanceSearchBox from "./AdvanceSearchBox";
import ResultList from "./ResultList";
import SearchBar from "./SearchBar";
import SearchResultSummary from "./SearchResultSummary";

export default function SearchInfo(props) {
  const show = useSelector((state) => state.vtvNewsSlice.showResultSummary);

  return (
    <div>
      <View title="Tìm kiếm thông tin">
        <SearchBar></SearchBar>
        <AdvanceSearchBox></AdvanceSearchBox>
        {show && <SearchResultSummary></SearchResultSummary>}
        {show && <ResultList></ResultList>}
      </View>
    </div>
  );
}
