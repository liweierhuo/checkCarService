export default function (options = {}) {
  return Page({
    onShareAppMessage() {
      return {
        title: '贴心小助手'
      };
    },
    ...options
  });
}
