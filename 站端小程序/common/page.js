export default function (options = {}) {
  return Page({
    onShareAppMessage() {
      return {
        title: '贵阳市机动车业务服务机构'
      };
    },
    data: {
      isBack:false,
    },
    ...options
  });
}
