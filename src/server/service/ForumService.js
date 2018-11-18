exports.getList = function (pageIndex, pageSize) {
  let data = {};
  data.list = [];
  data.pageIndex = pageIndex;
  data.pageCount = 2;

  if (pageIndex > data.pageCount) {
    data.pageIndex = data.pageCount;
  } else {
    for (let i = 0; i < pageSize; i++) {
      data.list.push(pageIndex + i);
    }
  }

  return {
    status: 0,
    data: data
  };
};