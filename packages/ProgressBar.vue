<template>
  <div class="progress-wrapper">
    <div class="progress"
         @mousedown.stop="mousedownHandler"
         @mousemove.stop="mousemoveHandler"
         @mouseup.stop="mouseupHandler"
         :style="unfinishStyle">
      <!-- 进度条已划过部分 -->
      <div class="progressFinish"
           :style="finishStyle">
        <!-- 滑块 -->
        <div class="slider"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    // 完成部分背景色
    finishBg: String,
    // 未完成部分背景色
    unfinishBg: String,
    // 滑块背景色
    sliderBg: String,
    // 进度条高度，传像素值
    height: String,
    // 百分数
    percent: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      // 进度条还未划过部分样式
      unfinishStyle: {
        backgroundColor: this.unfinishBg,
        height: this.height
      },
      // 进度条已划过部分样式
      finishStyle: {
        background: this.finishBg,
        height: this.height
      },
      // 滑块样式
      sliderStyle: {
        backgroundColor: this.sliderBg
      },
      // 标记是否按下鼠标
      flag: false
    }
  },
  computed: {
    // 获取进度条DOM节点
    progressElement () {
      return this.$el.getElementsByClassName('progress')[0]
    }
  },
  methods: {
    // 鼠标按下事件
    mousedownHandler (e) {
      // 标记已经按下左键
      this.flag = true
    },
    // 鼠标在元素上移动时触发
    mousemoveHandler (e) {
      // 判断是否已经按下左键
      if (this.flag) {
        // clientX鼠标相对于浏览器窗口可视区域的X坐标
        // offsetLeft当前节点距离左边的偏移量
        // clientWidth该元素的像素宽度，包含内边距，不包含外边距、边框
        // 鼠标的X坐标 - 元素左边偏移量 / 元素宽度 = 鼠标距离左边的占比
        const decimal = (e.clientX - this.$el.offsetLeft) / this.progressElement.clientWidth
        const percent = decimal * 100
        // 将值赋给左侧划过部分width
        this.finishStyle.width = percent + '%'
        // 拖动进度条时触发，返回百分数
        this.$emit('progDrag', percent)
        // console.log('按下左键并在元素上移动')
      }
    },
    // 鼠标放开时触发
    mouseupHandler (e) {
      // 判断是否已经按下左键
      if (this.flag) {
        const decimal = (e.clientX - this.$el.offsetLeft) / this.progressElement.clientWidth
        const percent = decimal * 100
        this.finishStyle.width = percent + '%'
        // 点击进度条触发，返回百分数
        this.$emit('progClick', percent)
        this.flag = false
        // console.log('鼠标放开左键')
      }
    }
  },
  watch: {
    percent (cur, old) {
      this.finishStyle.width = cur + '%'
      // console.log(123)
    }
  }
}
</script>

<style scoped>
  .progress-wrapper {
    /*width:100%;*/
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .progress {
    width: 100%;
    height: 30px;
    border-radius: 20px;
    background-color: #eee;
    /* position: relative; */
    overflow: hidden;
    cursor: pointer;
  }
  .progressFinish {
    height: 100%;
    width: 0;
    border-radius: 20px;
    background: linear-gradient(to left, #ff9472, #ffc300);
    transition: 0.1s ease;
    position: relative;
  }
  .slider {
    height: 100%;
    width: 30px;
    border-radius: 20px;
    background-color: #ffc300;
    position: absolute;
    right: 0px;
  }
</style>
