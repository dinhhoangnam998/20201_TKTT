const { createSlice } = require("@reduxjs/toolkit");

const responseSchema = {
  responseHeader: {
    zkConnected: true,
    status: 0,
    QTime: 55,
    params: {
      q: '"Hôm nay"',
      hl: "true",
      fl: "category,title",
      "hl.fl": "category,title,author,subtitle,paragraphs",
      rows: "2",
    },
  },
  response: {
    numFound: 403,
    start: 0,
    maxScore: 2.3197467,
    numFoundExact: true,
    docs: [
      {
        id: "",
        original_link: "",
        category: "Văn hóa - Giải trí",
        title: "Nghệ sĩ Chí Tài qua đời, Trịnh Thăng Bình dời lịch ra MV",
        author: "",
        publish_date: "",
        subtitle: "",
        paragraphs: [],
      },
      {
        category: "Thế giới",
        title: "Cuộc bỏ phiếu của đại cử tri đoàn - “Dấu chấm hết” cho nỗ lực lật ngược kết quả bầu cử của Tổng thống Mỹ Trump",
      },
    ],
  },
  highlighting: {
    "https://vtv.vn/van-hoa-giai-tr...": {
      paragraphs: [" đã ra đi. Mặc dù <em>hôm</em> <em>nay</em> là ngày trọng đại trong sự nghiệp ca hát của Trịnh Thăng Bình, nhưng anh sẽ"],
    },
    "https://vtv.vn/the-gioi/...": {
      subtitle: ['VTV.vn - Ngày <em>hôm</em> <em>nay</em>, 14/12, Tổng thống Mỹ Trump được dự báo sẽ chịu đòn đánh "chốt hạ" vào nỗ lực'],
      paragraphs: [" vào Nhà Trắng. Cuộc bỏ phiếu của các đại cử tri đoàn sẽ diễn ra vào <em>hôm</em> <em>nay</em> 14/12 theo giờ địa"],
    },
  },
};

const suggestionResponseTemplate = {
  responseHeader: {
    status: 0,
    QTime: 4,
  },
  suggest: {
    fragmentSuggester: {
      "": {
        numFound: 5,
        suggestions: [
          {
            term: "",
            weight: 1607153700,
            payload: "",
          },
        ],
      },
    },
    wordSuggester: {
      "": {
        numFound: 10,
        suggestions: [
          {
            term: "",
            weight: 5240552293667486720,
            payload: "",
          },
        ],
      },
    },
  },
};

const spellingResponseTemplate = {
  responseHeader: {
    status: 0,
    QTime: 19,
  },
  response: {
    numFound: 0,
    start: 0,
    numFoundExact: true,
    docs: [],
  },
  spellcheck: {
    suggestions: [
      "nguyêm",
      {
        numFound: 6,
        startOffset: 0,
        endOffset: 6,
        origFreq: 0,
        suggestion: [],
      },
      "nhâm",
      {
        numFound: 5,
        startOffset: 7,
        endOffset: 11,
        origFreq: 7,
        suggestion: [],
      },
      "nhâm",
      {
        numFound: 5,
        startOffset: 19,
        endOffset: 23,
        origFreq: 7,
        suggestion: [
          {
            word: "nhân",
            freq: 2357,
          },
        ],
      },
    ],
    correctlySpelled: false,
    collations: [
      "collation",
      {
        collationQuery: "",
        hits: 1,
      },
    ],
  },
};

const mltResponseTeamplate = {
  responseHeader: {
    status: 0,
    QTime: 1,
  },
  match: {
    numFound: 1,
    start: 0,
    numFoundExact: true,
    docs: [
      {
        id: "https://vtv.vn/van-hoa-giai-tri/nghe-sieu-kho-bat-ngo-cong-pha-phong-ve-viet-dip-cuoi-nam-20201202144733442.htm",
        original_link: "https://vtv.vn/van-hoa-giai-tri/nghe-sieu-kho-bat-ngo-cong-pha-phong-ve-viet-dip-cuoi-nam-20201202144733442.htm",
        category: "Văn hóa - Giải trí",
        title: '"Nghề siêu khó" bất ngờ công phá phòng vé Việt dịp cuối năm',
        author: "PV",
        publish_date: "Thứ tư, ngày 02/12/2020 14:57 GMT+7",
        timestamp: 1606921020000,
        subtitle: "VTV.vn - Bộ phim Nghề siêu khó của Hàn Quốc sẽ chính thức công chiếu tại Việt Nam từ ngày 11/12.",
        paragraphs: ["Nghề siêu khó"],
        imgSrcs: ["https://vtv1.mediacdn.vn/2020/12/2/photo-1-1606894020983983589872.jpg"],
        _version_: 1686526631264387072,
      },
    ],
  },
  response: {
    numFound: 848,
    start: 0,
    numFoundExact: true,
    docs: [
      {
        id: "",
        original_link: "",
        category: "",
        title: "",
        author: "",
        publish_date: "Thứ bảy, ngày 07/11/2020 06:00 GMT+7",
        timestamp: 1604728800000,
        subtitle:
          'VTV.vn - Do công chiếu phim trong thời điểm dịch COVID-19 bùng phát, siêu phẩm "Tenet" đã không thể đạt được mức doanh thu như kì vọng ban đầu.',
        paragraphs: ["Theo thống kê của Box Office Mojo, cho đến thời điểm hiện tại, bộ phim điện"],
        imgSrcs: ["https://vtv1.mediacdn.vn/thumb_w/640/2020/11/6/21tenet1-mobilemasterat3x-v2-1604642496823988007549.jpg"],
        _version_: 1686526631970078720,
      },
    ],
  },
};

const vtvNewsSlice = createSlice({
  name: "vtvNewsSlice",
  initialState: {
    response: {},
    showResultSummary: false,
    suggestWordResponse: suggestionResponseTemplate,
    suggestFragmentResponse: suggestionResponseTemplate,
    correctSpellingResponse: spellingResponseTemplate,
    correctSpellingSuggestions: [],
    moreLikeThisResponse: {
      response: { numFound: 0, docs: [], match: { docs: [] } },
      responseHeader: {
        status: 0,
        QTime: 1,
      },
    },
  },
  reducers: {
    setResponse: (state, action) => {
      state.response = action.payload;
      state.showResultSummary = true;
    },
    setSuggestWord: (state, action) => {
      state.suggestWordResponse = action.payload;
    },

    setSuggestFragment: (state, action) => {
      state.suggestFragmentResponse = action.payload;
    },
    setCorrectSpelling: (state, action) => {
      const response = action.payload;
      const collations = response.spellcheck.collations;
      const suggestions = collations.filter((item, index) => index % 2 === 1).sort((a, b) => b.hits - a.hits);

      state.correctSpellingResponse = action.payload;
      state.correctSpellingSuggestions = suggestions;
    },
    setMoreLikeThisResponse: (state, action) => {
      state.moreLikeThisResponse = action.payload;
    },
  },
});

export default vtvNewsSlice.reducer;
export const { setResponse, setSuggestWord, setSuggestFragment, setCorrectSpelling, setMoreLikeThisResponse } = vtvNewsSlice.actions;
