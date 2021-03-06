// 整个包的入口
// 统一导出
// 导出颜色选择器组件
import Button from './Button'
import Dialog from './Dialog'
import Input from './Input'
import Checkbox from './Checkbox'
import Radio from './Radio'
import RadioGroup from './Radio-group'
import Switch from './Switch'
import CheckboxGroup from './Checkbox-group'
import Form from './Form'
import FormItem from './Form-item'
import ProgressBar from './ProgressBar'
import WordCloud from './WordCloud'
import FloatBall from './FloatBall'
import Slide from './Slide'

const components = [
  Button,
  Dialog,
  Input,
  Checkbox,
  Radio,
  RadioGroup,
  Switch,
  CheckboxGroup,
  Form,
  FormItem,
  ProgressBar,
  WordCloud,
  FloatBall,
  Slide
]
// 定义install方法
const install = function (Vue) {
  // 注册所有的组件
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}
// 增值功能：让这个组件可以和官方组件（router）一样，非模块胡环境可以直接用
// 判断是否直接引入文件，如果是，就不用调用Vue.use()
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
// 导出install方法
export default {
  install
}
