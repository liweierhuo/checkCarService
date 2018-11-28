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

module.exports = {
  isNotBlank: isNotBlank,
  getPages: getPages
}