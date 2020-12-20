import { Box, Button, Checkbox, Collapse, Grid, makeStyles, TextField, Typography } from "@material-ui/core";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import { Autocomplete } from "@material-ui/lab";
import React, { useState } from "react";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import "date-fns";
import vi from "date-fns/locale/vi";
import DateFnsUtils from "@date-io/date-fns";
import { useDispatch } from "react-redux";
import { setResponse } from "./redux";

const useStyles = makeStyles((theme) => ({
  marginBottomChild: {
    "& > *": {
      marginBottom: theme.spacing(2),
      "&:last-child": {
        marginBottom: 0,
      },
    },
  },
}));

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const renderOption = (option, { selected }) => (
  <React.Fragment>
    <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
    {option}
  </React.Fragment>
);

export default function AdvanceSearchBox(props) {
  const cls = useStyles();
  const dp = useDispatch();
  const [open, setOpen] = useState(false);

  const categories = [
    "Chính trị",
    "Xã hội",
    "Pháp luật",
    "Thế giới",
    "Kinh tế",
    "Thể thao",
    "Truyền hình",
    "Văn hóa - Giải trí",
    "Sức khỏe",
    "Đời sống",
    "Công nghệ",
    "Giáo dục",
  ];
  const [careCategories, setCareCategories] = useState(["Giáo Dục"]);
  const [notCareCategories, setNotCareCategories] = useState([]);
  const [careCategorysOptions, setCareCategoryOptions] = useState(categories);
  const [notCareCategoryOptions, setNotCareCategoryOptions] = useState(categories);

  const [startTime, setStartTime] = useState(new Date(2020, 0, 1));
  const [endTime, setEndTime] = useState(new Date());

  const [titleAND, setTitleAND] = useState("");
  const [titleOR, setTitleOR] = useState("");
  const [titleNOT, setTitleNOT] = useState("");

  const [contentAND, setContentAND] = useState("");
  const [contentOR, setContentOR] = useState("");
  const [contentNOT, setContentNOT] = useState("");

  function buildCategoryCondition() {
    if (careCategories.length === 0 && notCareCategories.length === 0) return null;
    let careCategoryQuery = "";
    if (categories.length !== 0) {
      careCategoryQuery = careCategories.map((category) => `"${category}"`).join(" ");
    }
    let notCareCategoryQuery = "";
    if (notCareCategories.length !== 0) {
      notCareCategoryQuery = notCareCategories.map((category) => `-"${category}"`).join(" ");
    }
    // special case: in solr, NOT -> AND NOT -> when just have 1 term -> must add *:*, so we add *:* here for safe
    const categoryCondition = `category:(*:* AND ${careCategoryQuery} ${notCareCategoryQuery})`;
    // console.log(categoryCondition);
    return categoryCondition;
  }

  function buildTimeCondition() {
    const earlyStartTime = new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate(), 0, 0, 0);
    const latelyEndTime = new Date(endTime.getFullYear(), endTime.getMonth(), endTime.getDate(), 23, 59, 59);
    const timeCondition = `timestamp:[${earlyStartTime.getTime()} TO ${latelyEndTime.getTime()}]`;
    // console.log(earlyStartTime);
    // console.log(latelyEndTime);
    return timeCondition;
  }

  function buildTitleCondition() {
    if (titleAND.trim() === "" && titleOR.trim() === "" && titleNOT.trim() === "") return null;

    let andPart = "";
    if (titleAND.trim() !== "") {
      andPart = titleAND
        .split(",")
        .map((title) => `+"${title.trim()}"`)
        .join(" ");
    }

    let notPart = "";
    if (titleNOT.trim() !== "") {
      notPart = titleNOT
        .split(",")
        .map((title) => `-"${title.trim()}"`)
        .join(" ");
    }

    let orPart = "";
    if (titleOR.trim() !== "") {
      orPart = titleOR
        .split(",")
        .map((title) => `"${title.trim()}"`)
        .join(" ");
    }

    const titleCondition = `title:(*:* AND ${andPart} ${notPart} ${orPart})`;
    // console.log(titleCondition);
    return titleCondition;
  }

  function buildContentCondition() {
    if (contentAND.trim() === "" && contentOR.trim() === "" && contentNOT.trim() === "") return null;

    let andPart = "";
    if (contentAND.trim() !== "") {
      andPart = contentAND
        .split(",")
        .map((content) => `+"${content.trim()}"`)
        .join(" ");
    }

    let notPart = "";
    if (contentNOT.trim() !== "") {
      notPart = contentNOT
        .split(",")
        .map((content) => `-"${content.trim()}"`)
        .join(" ");
    }

    let orPart = "";
    if (contentOR.trim() !== "") {
      orPart = contentOR
        .split(",")
        .map((content) => `"${content.trim()}"`)
        .join(" ");
    }

    const contentCondition = `paragraphs:(*:* AND ${andPart} ${notPart} ${orPart})`;
    // console.log(contentCondition);
    return contentCondition;
  }

  function buildQuery() {
    const categoryCondition = buildCategoryCondition();
    const timeCondition = buildTimeCondition();
    const titleCondition = buildTitleCondition();
    const contentCondition = buildContentCondition();
    const conditions = [timeCondition];
    if (categoryCondition !== null) {
      conditions.push(categoryCondition);
    }
    if (titleCondition !== null) {
      conditions.push(titleCondition);
    }
    if (contentCondition !== null) {
      conditions.push(contentCondition);
    }
    const q = conditions.join(" AND ");
    console.log(q);
    return q;
  }

  async function hdClickAdvanceSearch() {
    const q = buildQuery();
    const hlOptions = `hl=true&hl.fl=paragraphs&hl.preserveMulti=true&hl.maxMultiValuedToMatch=5&hl.simple.pre=<strong>&hl.simple.post=</strong>&hl.mergeContiguous=true`;
    const queryString = `q=${q}&${hlOptions}`;
    // const queryString = `q=${q}`;
    const res = await fetch(`http://localhost:8983/solr/vtv_news/select?${queryString}`);
    const body = await res.json();
    if (!res.ok) {
      alert(JSON.stringify(body));
    } else {
      dp(setResponse(body));
    }
  }

  return (
    <Box mt={2} mb={1}>
      <Box textAlign="right" mb={1}>
        <Button color="primary" onClick={(e) => setOpen(!open)}>
          Nâng cao
        </Button>
      </Box>
      <Collapse in={open}>
        <Box p={2} bgcolor="white">
          <Box mb={3}>
            <Typography>Lưu ý: Các giá trị ngăn cách nhau bởi dấu phẩy.</Typography>
          </Box>
          <Box className={cls.marginBottomChild}>
            {/* Chủ đề */}
            <Grid container spacing={3} alignItems="center">
              <Grid item md={1}>
                <Typography>Chủ đề:</Typography>
              </Grid>
              <Grid item md>
                <Autocomplete
                  multiple
                  disableCloseOnSelect
                  options={careCategorysOptions}
                  renderOption={renderOption}
                  renderInput={(params) => <TextField {...params} label="Quan tâm" InputLabelProps={{ shrink: true }} />}
                  value={careCategories}
                  onChange={(e, values) => {
                    setCareCategories(values);
                    setNotCareCategoryOptions(categories.filter((item) => !values.includes(item)));
                  }}
                ></Autocomplete>
              </Grid>
              <Grid item md>
                <Autocomplete
                  multiple
                  disableCloseOnSelect
                  options={notCareCategoryOptions}
                  renderOption={renderOption}
                  renderInput={(params) => <TextField {...params} label="Không quan tâm" InputLabelProps={{ shrink: true }} />}
                  value={notCareCategories}
                  onChange={(e, values) => {
                    setNotCareCategories(values);
                    setCareCategoryOptions(categories.filter((item) => !values.includes(item)));
                  }}
                ></Autocomplete>
              </Grid>
            </Grid>
            {/* Thời gian */}
            <Grid container spacing={3} alignItems="center">
              <Grid item md={1}>
                <Typography>Thời gian:</Typography>
              </Grid>
              <Grid item md>
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={vi}>
                  <KeyboardDatePicker
                    fullWidth
                    id="from"
                    label="Từ ngày"
                    disableFuture
                    autoOk
                    format="dd/MM/yyyy"
                    value={startTime}
                    onChange={(selectedDate) => setStartTime(selectedDate)}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item md>
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={vi}>
                  <KeyboardDatePicker
                    fullWidth
                    id="to"
                    label="Đến ngày"
                    disableFuture
                    autoOk
                    format="dd/MM/yyyy"
                    value={endTime}
                    minDate={startTime}
                    onChange={(selectedDate) => setEndTime(selectedDate)}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
            </Grid>
            {/* Tiêu đề */}
            <Grid container spacing={3} alignItems="center">
              <Grid md={1} item>
                <Typography>Tiêu đề:</Typography>
              </Grid>
              <Grid md item>
                <TextField
                  label="Phải có"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={titleAND}
                  placeholder="Bách Khoa, Hà Nội"
                  onChange={(e) => setTitleAND(e.target.value)}
                ></TextField>
              </Grid>
              <Grid md item>
                <TextField
                  label="Không có"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={titleNOT}
                  onChange={(e) => setTitleNOT(e.target.value)}
                ></TextField>
              </Grid>
              <Grid md item>
                <TextField
                  label="Có thể có"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={titleOR}
                  placeholder="học bổng"
                  onChange={(e) => setTitleOR(e.target.value)}
                ></TextField>
              </Grid>
            </Grid>
            {/* Nội dung */}
            <Grid container spacing={3} alignItems="center">
              <Grid md={1} item>
                <Typography>Nội dung:</Typography>
              </Grid>
              <Grid md item>
                <TextField
                  label="Phải có"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={contentAND}
                  onChange={(e) => setContentAND(e.target.value)}
                ></TextField>
              </Grid>
              <Grid md item>
                <TextField
                  label="Không có"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={contentNOT}
                  placeholder="trượt môn, thi lại"
                  onChange={(e) => setContentNOT(e.target.value)}
                ></TextField>
              </Grid>
              <Grid md item>
                <TextField
                  label="Có thể có"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={contentOR}
                  onChange={(e) => setContentOR(e.target.value)}
                ></TextField>
              </Grid>
            </Grid>
          </Box>
          <Box textAlign="right">
            <Button variant="contained" color="primary" onClick={hdClickAdvanceSearch}>
              Tìm kiếm
            </Button>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
}
