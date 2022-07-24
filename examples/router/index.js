import Vue from 'vue'
import VueRouter from 'vue-router'
import WordCloud from '../components/WordCloud'
import FloatBall from '../components/FloatBall'
import ProgressBarDemo from '../components/ProgressBarDemo'
import SlideDemo from '../components/SlideDemo'
Vue.use(VueRouter)

// 配置路由
const routes = [{
  path: '/WordCloud',
  component: WordCloud
}, {
  path: '/FloatBall',
  component: FloatBall
}, {
  path: '/ProgressBarDemo',
  component: ProgressBarDemo
}, {
  path: '/SlideDemo',
  component: SlideDemo
}]
// 实例化路由
const router = new VueRouter({
  // （简写）相当于 routes: routes
  routes
})
// 导出路由模块
export default router
