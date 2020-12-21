import { Box, Paper } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setResponse } from "./redux";

export default function ResultPagination(props) {
  const numFound = useSelector((state) => state.vtvNewsSlice.response.response.numFound);
  const totalPage = Math.floor(numFound / 10 + 1);
  const [page, setPage] = useState(1);
  const q = useSelector((state) => state.vtvNewsSlice.response.responseHeader.params.q);
  const dp = useDispatch();
  async function hdChangePage(e, value) {
    setPage(value);
    const hlOptions = `hl=true&hl.fl=paragraphs&hl.preserveMulti=true&hl.maxMultiValuedToMatch=5&hl.simple.pre=<strong>&hl.simple.post=</strong>&hl.mergeContiguous=true`;
    const queryString = `q=${q}&${hlOptions}&start=${value * 10}`;
    const res = await fetch(`http://localhost:8983/solr/vtv_news/select?q=${queryString}`);
    if (!res.ok) {
      alert("Something went wrong, cannot fetch new page!");
    } else {
      dp(setResponse(await res.json()));
    }
  }
  return (
    <div>
      <Paper>
        <Box p={2} display="flex" justifyContent="center">
          <Pagination page={page} onChange={hdChangePage} color="primary" count={totalPage} siblingCount={4} boundaryCount={2}></Pagination>
        </Box>
      </Paper>
    </div>
  );
}
