/**
 * 小程序配置文件
 */
const host = 'www.sqyan.com:444'

const config = {
  // 请求成功的code
  SUCCESS_CODE: 200,
  SESSION_TIME_OUT: 401,
  NO_DATA: 402,
  // sessionKey : token
  SESSION_KEY : 'token',
  USER_INFO_KEY :'user_info',
  USER_NAME:'user_name',
  timeRange: { 上午: 1, 下午: 2 },
  imgTypeRange: { 1: '车辆左前45度', 2: '车辆右后45度', 3: '车辆前轮胎花纹', 4: '车辆后轮胎花纹', 5:'车辆侧面'},
  host,
  imageServer: `https://${host}/images/`,
  // 登录的请求url post
  loginUrl: `https://${host}/api/v1/token/station`,
  // 登录的请求url GET
  getLoginInfo: `https://${host}/api/v1/user_station`,
  //站端登录
  userLogin: `https://${host}/api/v1/user_station/in`,
  //分页获取检测站当天订单列表 GET
  getStationOrder: `https://${host}/api/v1/order/station`,
  //站端订单详情 get :id
  getStationOrderDetail: `https://${host}/api/v1/order/station/`,
  //订单授理 put
  orderHandle: `https://${host}/api/v1/order`,
  //改签 put
  orderChange: `https://${host}/api/v1/order/change`,
  //站端订单审核照片详情 get ：id
  orderPicDetail: `https://${host}/api/v1/order/pic/`,
  //退出登录 get
  loginOut: `https://${host}/api/v1/user_station/out`,
  orderStatus: {
    1: { info: '未确认', color: '#EE4000' },
    2: { info: '已受理', color: '#9BCD9B' },
    3: { info: '改签', color: '#FFEC8B' }
  },
  orderCheck: {
    1: { info: '无预审', color: '#FFEC8B' },
    2: { info: '未预审', color: '#EE4000' },
    3: { info: '已预审', color: '#9BCD9B' }
  },
}
module.exports = config
