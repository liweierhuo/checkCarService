function isNotBlank(str) {
  if (typeof (str) != 'string') {
    return false;
  }
  if (str == undefined || str == null || str.trim() == '') {
    return false;
  }
  return true;
}


module.exports = {
  isNotBlank: isNotBlank
}