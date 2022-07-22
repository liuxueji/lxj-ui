
<template>
  <div class="container">
    <div :class="['floatBall', { transition }]"
         :style="{top:top+'px',left:left+'px'}"
         v-show="isShow"
         @mousedown="mouseDownStar"
         @mousemove="mouseMove"
         @mouseup="mouseUp"
         @mouseenter="mouseEnter"
         @mouseleave="mouseLeave"
         @click="click"
         @contextmenu.prevent="rightClick">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'XjFloatBall',
  props: {
    //初始横坐标百分比
    x:
      {
        type: Number,
        default: 1
      },
    //初始纵坐标百分比
    y:
      {
        type: Number,
        default: 0.4
      },
    // 是否显示悬浮球
    isShow: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      // 动画属性
      transition: true,
      // 鼠标激活
      active: false,
      startPositionX: 0,
      startPositionY: 0,
      top: null,
      left: null
    };
  },
  mounted () {
    let ball = document.querySelector(".floatBall");
    let box = document.querySelector(".container");
    this.left = (box.offsetWidth - ball.offsetWidth) * this.x;
    this.top = (box.offsetHeight - ball.offsetHeight) * this.y;
    setTimeout(() => {
      this.hide()
    }, 1000)
  },
  methods: {
    // 鼠标按下事件，获取当前鼠标距离窗口左侧和上侧的距离
    mouseDownStar (e) {
      console.log("start");
      e.preventDefault();   //阻止默认的拖拽
      // 拖拽需要将动画属性关闭，否则拖拽不成功
      this.transition = false
      this.active = true
      this.startPositionX = e.clientX;
      this.startPositionY = e.clientY;
    },
    // 鼠标移动事件，通过移动后的距离-移动前的距离，得到偏移量
    mouseMove (e) {
      console.log(e);
      // 鼠标右击可以拖拽
      if (e.which == 3) {
        // 获取偏移量，通过当前位置-初始位置
        const offsetX = e.clientX - this.startPositionX;
        const offsetY = e.clientY - this.startPositionY;
        const ball = document.querySelector(".floatBall");
        const box = document.querySelector(".container");
        //元素移动后的位置，通过元素初始位置 + 偏移量 
        this.left = ball.offsetLeft + offsetX;
        this.top = ball.offsetTop + offsetY;
        // 将当前位置设置为下一次的初始位置
        this.startPositionX = e.clientX;
        this.startPositionY = e.clientY;
        console.log(ball.offsetLeft)
      }
    },
    mouseUp () {
      console.log("stop");
      this.active = false
      this.show();
    },
    mouseEnter () {
      console.log("enter");
      this.show();
    },
    mouseLeave () {
      console.log("leave");
      this.hide();
    },
    show () {
      this.transition = true
      let ball = document.querySelector(".floatBall");
      let box = document.querySelector(".container");
      if (ball.offsetLeft < 0) {
        this.left = 0;
      } else if (ball.offsetLeft > box.offsetWidth - ball.offsetWidth) {
        this.left = box.offsetWidth - ball.offsetWidth
      }
    },
    hide () {
      this.transition = true
      console.log("hide");
      let ball = document.querySelector(".floatBall");
      let box = document.querySelector(".container");
      if (ball.offsetLeft < 1) {
        this.left = -ball.offsetWidth * 1 / 2;
      } else if (ball.offsetLeft > box.offsetWidth - ball.offsetWidth - 1) {
        this.left = box.offsetWidth - ball.offsetWidth / 2
      }
    },
    click () {      //悬浮窗的点击事件
      this.$emit('click', { isShow: this.isShow, top: this.top, left: this.left });
    },
    rightClick () {
      this.$emit('rightClick', { isShow: this.isShow, top: this.top, left: this.left })

    }
  },
};
</script>
<style scoped>
  .container {
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: hidden;
  }
  .floatBall {
    position: absolute;
    opacity: 1;
    z-index: 100;
  }
  .transition {
    transition: 0.5s ease;
    transform: scale(0.8);
    opacity: 0.5;
  }
</style>
