
const config = require('../config');
const app = getApp();     // 取得全局App
function isNotBlank(str) {
  if (typeof (str) != 'string') {
    return false;
  }
  if (str == undefined || str == null || str.trim() == '') {
    return false;
  }
  return true;
}

function getPages(totalCount,pageSize) {
  return Math.ceil(parseInt(totalCount) /parseInt(pageSize));
}


const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return year + '-' + month + '-' + day;
}
function getUserInfoByStore() {
  var storeUserInfo;
  try {
    var value = wx.getStorageSync(config.USER_INFO_KEY)
    if (value) {
      console.log(value);
      storeUserInfo = value;
    }
  } catch (e) {
    // Do something when catch error
    console.error("getUserInfoByStore is error:" + e);
  }
  return storeUserInfo;
}


module.exports = {
  isNotBlank: isNotBlank,
  getPages: getPages,
  formatTime: formatTime,
  getUserInfoByStore: getUserInfoByStore,
}