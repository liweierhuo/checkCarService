export default function (options = {}) {
  return Page({
    onShareAppMessage() {
      return {
        title: '贵阳机动车业务'
      };
    },
    data: {
      isBack:false,
    },
    ...options
  });
}
