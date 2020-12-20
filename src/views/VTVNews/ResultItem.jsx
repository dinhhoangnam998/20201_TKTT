import { Box, Link, Paper, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core";

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
  const docId = doc.id;
  const hlFragment = useSelector((state) => state.vtvNewsSlice.response.highlighting[docId]["paragraphs"]);

  return (
    <div>
      <Paper className={cls.root}>
        <Box p={2}>
          <Link underline="none">
            <Typography variant="caption">
              <Link href={doc.original_link} target="_blank" underline="none">
                {doc.original_link}
              </Link>
            </Typography>
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
