import { request } from './request'


/**
 * 登录状态
 * 说明 : 调用此接口,可获取登录状态
 * @returns 
 */
export function loginStatus() {
  return request({
    url: '/login/status'
  })
}

/**
 * 手机登录
 * @param {*} phone 
 * @param {*} password 
 * @returns 
 */
 export function cellphone(phone,password,md5_password) {
  return request({
    url: '/login/cellphone',
    params: {
      phone,
      password,
      md5_password
    }
  })
}
/**
 * 获取账号信息
 * 说明 : 登录后调用此接口 ,可获取用户账号信息
 * @returns 
 */
export function userAccount() {
  return request({
    url: '/user/account',
  })
} 
/**
 * 获取用户详情
 * 说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户详情
 * @returns 
 */
export function userDetail(uid) {
  return request({
    url: '/user/detail',  
    params: {
      uid
    }
  }) 
}

/**
 * 获取视频标签/分类下的视频
 * @param {*} id 
 * @returns 
 */
export function videoGroup(id) {
  return request({
    url: '/video/group',
    params: {
      id
    } 
  }) 
}

/**
 * 获取推荐视频
 * @param {*} id 
 * @returns 
 */
export function recommend(offset) {
  return request({
    url: '/video/timeline/recommend',
    params: {
      offset
    } 
  })
}

/**
 * 获取视频播放地址
 * @param {*} id 
 * @returns 
 */
export function videoUrl(id) {
  return request({
    url: '/video/url',
    params: {
      id
    }
  })
}


/**
 * 获取全部视频列表
 * 说明 : 调用此接口,可获取视频分类列表,分页参数只能传入offset
 * @param {*} offset 
 * @returns 
 */
export function videoAll(offset) {
  return request({
    url: '/video/timeline/all',
    params: {
      offset
    }
  })
}

/**
 * 获取视频详情
 * @param {*} id 
 * @returns 
 */
export function videoDetail(id) {
  return request({
    url: '/video/detail',
    method: 'post',
    params: {
      id
    }
  })
}

export class videoDetailData {
  constructor(data) {
    this.vid = data.vid //视频id
    this.title = data.title //标题
    this.playCount = data.playTime //观看量
    this.publishTime = data.publishTime //发布时间
    this.praisedCount = data.praisedCount //点赞量
    this.shareCount = data.shareCount //分享量
    this.subscribeCount = data.subscribeCount //收藏量
    this.description = data.description //描述
    this.coverUrl = data.coverUrl //封面
    this.durationms = data.durationms //时长
    this.videoGroup = data.videoGroup //标签
  }
}

/**
 * 新版评论接口
 * 说明 : 调用此接口 , 传入资源类型和资源 id,以及排序方式,可获取对应资源的评论
 * @param {string} id 必选，资源 id
 * @param {number} type 必选 数字 , 资源类型 0: 歌曲 1: mv 2: 歌单 3: 专辑 4: 电台 5: 视频 6: 动态
 * @param {number} pageNo 分页参数,第 N 页,默认为 1
 * @param {number} pageSize 分页参数,每页多少条数据,默认 20
 * @param {number} sortType 排序方式, 1:按推荐排序, 2:按热度排序, 3:按时间排序
 * @param {string} cursor 当sortType为 3 时且页数不是第一页时需传入,值为上一条数据的 time
 * @returns 
 */
export function videoComment(id,type,pageNo,pageSize,sortType,cursor) {
  return request({
    url: '/comment/new',
    params: {
      id,
      type,
      pageNo,
      pageSize,
      sortType,
      cursor
    }
  })
}

export class commentData {
  constructor(data) {
    this.commentId = data.commentId //评论id
    this.content = data.content //评论内容
    this.likedCount = data.likedCount //点赞数
    this.time = data.time //时间戳
    this.timestr = data.timeStr // 时间字符串
    this.userFace = data.user.avatarUrl //用户头像
    this.userId = data.user.userId //用户id
    this.userName = data.user.nickname //用户名称
    this.floorComment = data.showFloorComment.comments //回复的评论
    this.floorCommentCount = data.showFloorComment.replyCount //回复数量
  }
}
/**
 * 楼层评论
 * 说明 : 调用此接口 , 传入资源 parentCommentId 和资源类型 type 和资源 id 参数, 可获得该资源的歌曲楼层评论
 * @param {*} parentCommentId  必选 楼层评论 id
 * @param {*} id 必选 资源 id
 * @param {*} type 必选 数字 , 资源类型 视频：5
 * @param {*} limit 
 * @param {*} time 
 * @returns 
 */
export function floorComment(parentCommentId,id,type,limit,time) {
  return request({
    url: '/comment/floor',
    params: {
      parentCommentId,
      id,
      type,
      limit,
      time
    }
  })
}
export class replyCommentData {
  constructor(data) {
    this.commentId = data.commentId //评论id
    this.content = data.content //评论内容
    this.likedCount = data.likedCount //点赞数
    this.time = data.time //时间戳
    this.timestr = data.timeStr // 时间字符串
    this.userFace = data.user.avatarUrl //用户头像
    this.userId = data.user.userId //用户id
    this.userName = data.user.nickname //用户名称
    this.beReplied = data.beReplied //回复的问题
  }
}

/**
 * 搜索
 * 说明 : 调用此接口 , 传入搜索关键词可以搜索该音乐 / 专辑 / 歌手 / 歌单 / 用户 , 关键词可以多个 , 以空格隔开 , 如 " 周杰伦 搁浅 "( 不需要登录 ), 搜索获取的 mp3url 不能直接用 , 可通过 /song/url 接口传入歌曲 id 获取具体的播放链接
 * @param {关键字} keywords 
 * @param {数量} limit 
 * @param {类型} type 
 * @returns 
 */

export function search(keywords,limit,offset, type) {
  return request({
    url: '/cloudsearch',
    params: {
      keywords,
      limit,
      offset,
      type
    }
  })
}


/**
 * 相关视频
 * 说明 : 调用此接口 , 可获取相关视频
 * @param {*} id 
 * @returns 
 */
export function relatedVideo(id) {
  return request({
    url: '/related/allvideo',
    params: {
      id
    }
  })
}
/**
 * 最近播放-视频
 * 说明 : 调用此接口 , 可获得最近播放-视频
 * @param {*} limit 
 * @returns 
 */
export function recordRecentVideo(limit) {
  return request({
    url: '/record/recent/video',
    params: {
      limit
    }
  })
}