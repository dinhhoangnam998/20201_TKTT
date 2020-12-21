import { Box, Link, Paper, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";
import { setMoreLikeThisResponse } from "./redux";
import { useNavigate } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    "& em": {
      fontWeight: "bolder",
    },
  },
  subtitle: {
    fontSize: "1.2rem",
  },
  hightlight: {
    fontWeight: "light",
    color: "#4d5156",
  },
}));

export default function ResultItem({ doc, index }) {
  const cls = useStyles();
  const dp = useDispatch();
  const navigate = useNavigate();
  const docId = doc.id;
  const hlFragment = useSelector((state) => state.vtvNewsSlice.response.highlighting[docId]["paragraphs"]);

  async function hdMoreLikeThis(e, id) {
    e.preventDefault();
    const res = await fetch(`http://localhost:8983/solr/vtv_news/mlt?q=id:"${id}"&&rows=30`);
    if (!res.ok) {
      alert("Something went wrong, can not load more like this,...");
      console.log(await res.json());
    } else {
      dp(setMoreLikeThisResponse(await res.json()));
      navigate("/20201-tktt/more-like-this");
    }
  }

  return (
    <div>
      <Paper className={cls.root}>
        <Box p={2}>
          <Link underline="none" target="_blank" href={doc.original_link}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="caption">{doc.original_link}</Typography>
              <Typography>
                <Link onClick={(e) => hdMoreLikeThis(e, doc.id)}>More like this</Link>
              </Typography>
            </Box>
            <Typography variant="h3">
              <Link href={doc.original_link} target="_blank">
                {doc.title}
              </Link>
            </Typography>
          </Link>
          <Typography variant="body2" gutterBottom>{`${doc.category}, ${doc.author}, ${doc.publish_date.slice(0, -5)}`}</Typography>
          <Typography gutterBottom className={cls.subtitle}>{`${doc.subtitle}`}</Typography>
          <Typography className={cls.hightlight} dangerouslySetInnerHTML={{ __html: hlFragment }}></Typography>
        </Box>
      </Paper>
    </div>
  );
}
