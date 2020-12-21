import { Box, Divider, Link, makeStyles, Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& em": {
      fontWeight: "bolder",
    },
    marginBottom: "16px",
  },
  subtitle: {
    fontSize: "1.2rem",
  },
  hightlight: {
    fontWeight: "light",
    color: "#4d5156",
  },
}));

export default function ResultItem({ doc, index, title }) {
  const cls = useStyles();
  return (
    <div>
      <Paper className={cls.root}>
        <Box p={2}>
          {title && (
            <Box mb={1}>
              <Typography gutterBottom variant="h4">
                {title}:
              </Typography>
              <Divider></Divider>
            </Box>
          )}
          <Link underline="none" target="_blank" href={doc.original_link}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="caption">{doc.original_link}</Typography>
            </Box>
            <Typography variant="h3">
              <Link href={doc.original_link} target="_blank">
                {doc.title}
              </Link>
            </Typography>
          </Link>
          <Typography variant="body2" gutterBottom>{`${doc.category}, ${doc.author}, ${doc.publish_date.slice(0, -5)}`}</Typography>
          <Typography gutterBottom className={cls.subtitle}>{`${doc.subtitle}`}</Typography>
          <Typography className={cls.hightlight}>{doc.paragraphs.filter((item, index) => index <= 2)} ...</Typography>
        </Box>
      </Paper>
    </div>
  );
}
