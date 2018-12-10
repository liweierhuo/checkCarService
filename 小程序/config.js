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
  // 修改车辆信息 put :id
  updateCarInfo: `https://${host}/api/v1/card/`,
  // 删除车辆信息 DELETE :id
  deleteCarInfo: `https://${host}/api/v1/card/`,
  //新增审核信息 post
  addAuditor: `https://${host}/api/v1/auditor`,
  //新增评论信息 post
  addComment: `https://${host}/api/v1/comment`,
  //获取用户全部地址信息 GET
  getAddressList: `https://${host}/api/v1/address/all`,
  //获取用户单个地址信息 GET :id
  getAddressById: `https://${host}/api/v1/address/`,
  //新增或更新用户地址信息 POST :id
  addOrUpdateAddress: `https://${host}/api/v1/address`,
  //删除地址信息 DELETE :id
  deleteAddress: `https://${host}/api/v1/address/`,
  //下单 post
  takeOrder: `https://${host}/api/v1/order`,
  //根据用户id分页获取订单列表（简要信息）GET
  orderListByUserId: `https://${host}/api/v1/order`,
  //订单详情 GET :id
  orderDetail: `https://${host}/api/v1/order/`,
  //订单授理 PUT :id
  orderHandle: `https://${host}/api/v1/order/`,
  //改签 put
  changeOrder: `https://${host}/api/v1/change`,
}
module.exports = config
