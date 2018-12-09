/**
 * 小程序配置文件
 */
const host = 'www.sqyan.com:444'

const config = {
  // 请求成功的code
  SUCCESS_CODE: 200,
  SESSION_TIME_OUT: 401,
  // qqMapAppKey 的参数配置
  QQ_MAP_APP_KEY: '4RPBZ-2KCK4-LFFUR-XO3OJ-LWJB6-OMFHP',
  // sessionKey : token
  SESSION_KEY : 'token',
  USER_INFO_KEY :'user_info',





  host,
  //检测站列表信息
  stationListUrl: `https://${host}/api/v1/station/all`,
  //检测站详细信息 +{id}
  stationDetailUrl: `https://${host}/api/v1/station/`,
  //车辆列表信息
  carListUrl: `https://${host}/api/v1/card/all`,
  //车辆详情 + {id}
  carDetailUrl: `https://${host}/api/v1/card/`,
  // 登录的请求url post
  loginUrl: `https://${host}/api/v1/token/user`,

  // 新增车辆 post
  addCard: `https://${host}/api/v1/card`,
}
module.exports = config
