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
        category: "Văn hóa - Giải trí",
        title: "Nghệ sĩ Chí Tài qua đời, Trịnh Thăng Bình dời lịch ra MV",
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

const vtvNewsSlice = createSlice({
  name: "vtvNewsSlice",
  initialState: { response: {}, showResultSummary: false },
  reducers: {
    setResponse: (state, action) => {
      state.response = action.payload;
      state.showResultSummary = true;
    },
  },
});

export default vtvNewsSlice.reducer;
export const { setResponse } = vtvNewsSlice.actions;
