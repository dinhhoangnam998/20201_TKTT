import { Box, Divider, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";

export default function ResultItem({ result, index }) {
  const highlighting = useSelector((state) => state.vtvNewsSlice.highlighting);
  const fragment = highlighting[result.id]["content"][0];
  const key = fragment.replaceAll("<em>", "").replaceAll("</em>", "");
  const hightlightedFragment = `<span class="hieghtlightFragment">${fragment}</span>`;
  const hightlightedContent = result.content.replace(key, hightlightedFragment);
  return (
    <div>
      <Box bgcolor="white" minHeight={200} p={2} mt={2}>
        <Box pb={1}>
          <Typography>{`${index}) ${result.time}`}</Typography>
        </Box>
        <Divider></Divider>
        <Box pt={1}>
          <Typography dangerouslySetInnerHTML={{ __html: hightlightedContent }}></Typography>
        </Box>
      </Box>
    </div>
  );
}
