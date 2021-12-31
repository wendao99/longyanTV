import Vue from 'vue'
import Vuex from 'vuex'
import { userAccount } from '@/network/index.js'
import initLocalStorage from './initLocalStorage'
import pkg from '../../package.json';
import saveToLocalStorage from './plugins/localStorage'

Vue.use(Vuex)

if(localStorage.getItem('appVersion') === null ) {
  localStorage.setItem('appVersion', pkg.version);
  localStorage.setItem('data', JSON.stringify(initLocalStorage.data))
}


export default new Vuex.Store({
  state: {
    homeUrl: '', // 首页url
    vUrls: [], // 视频url数组
    pageY: 0, // 记录当前的数值
    offset: 0, // 视频分页参数
    searchList: [], // 保存搜索列表 
    searchCount: 0, //搜索视频总数量
    data: JSON.parse(localStorage.getItem('data')), //用户数据
  },
  mutations: {
    videoUrl(state, payload) {
      if(payload.home === 'home' ) {
        state.homeUrl = payload.vUrl
      }else {
        state.vUrls.push(payload.vUrl)
      }
    },
    pageY(state,payload) {
      state.pageY = payload.pageY
    },
    upOffset(state) {
      state.offset++
    },
    getSearchList(state, payload) {
      state.searchList.push({vid: payload.vid, title: payload.title, coverUrl: payload.coverUrl}) 
    },
    clearSearchList(state) {
      state.searchList = []
    },
    videoCount(state,paload) {
      state.searchCount = paload.searchCount
    },
    updateData(state,{ key, value }) {
      state.data[key] = value
    }
  },
  actions: {
    fetchUserProfile({ commit }) {
      return userAccount().then((res) => {
        if(res.code === 200) {
          console.log(res);
          commit('updateData', {key: 'user', value: res.profile})
        }
      });
    },
  },
  plugins: [saveToLocalStorage]
})
