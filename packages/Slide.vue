<template>
  <div class="container"
       :style="{width:width+'px',height:height+'px',lineHeight:height+'px'}">
    <div>{{ tip }}</div>
    <div :class="['progressFinish',{transition}]"
         :style="{left: '-'+max+'px', transform:'translateX('+x+'px)'}">
      <div>{{ status }}</div>
      <div class='ball'
           @mousedown.stop="mouseDownStar"
           @mousemove.stop='mouseMove'
           @mouseup.stop='mouseup'>
        <div class="text">></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'XjSlide',
  data () {
    return {
      transition: false,
      tip: '右滑验证',//默认提示语
      boxWidth: 0,//获取屏幕宽度
      x: 0,//X轴的初始值
      startPositionX: 0,//触摸时X轴的值
      max: 0,//滑块可移动的X轴范围
      status: '',//验证完后的提示信息
      isSlide: true,//是否允许验证成功后继续滑动
      positionList: {}, // 存储坐标位置
      startTime: 0,
      num: 0,
      s: 0
    }
  },
  props: {
    limit: {
      type: Number,
      default: 100
    },
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 50
    }
  },
  mounted () {
    let ball = document.querySelector(".ball");
    let box = document.querySelector(".container");
    // 滑块可以移动的最大距离
    this.max = (box.offsetWidth - ball.offsetWidth);
  },
  methods: {
    mouseDownStar (e) {
      this.transition = false
      //设置X轴的始点
      this.startPositionX = e.clientX;
      this.startTime = 0
      this.s = 0
      this.num = 0
    },
    //滑块移动中执行的事件
    mouseMove (e) {
      if (e.which == 1) {
        const offsetX = e.clientX - this.startPositionX
        const currTime = Date.now()
        if (this.startTime !== 0) {
          const duration = currTime - this.startTime
          // 传入倒数第二个点和最后一个点，和持续时间，会返回加速度
          const v = parseInt(offsetX / duration)
          // 因为有可能v的结果是 NaN ，所以通过判断 v==v 来去掉NaN
          if (v == v) {
            this.num++
            this.s = this.s + v
          }
        }
        this.startTime = currTime
        let ball = document.querySelector(".ball");
        let box = document.querySelector(".container");
        // 如果验证成功后仍允许滑动，则执行下面代码块（初始值默认为允许）
        if (this.isSlide) {
          //当x坐标大于最大可移动距离，那么当前x坐标即为最大可移动距离
          if (offsetX >= this.max) {
            this.x = this.max
          } else {
            // 将当前鼠标x坐标给滑块移动的距离
            this.x = offsetX;
          }
        }
      }
    },
    //松开滑块执行的事件
    mouseup (e) {
      const avg = this.s / this.num
      console.log(avg)
      //自定义组件触发事件时提供的data对象
      var data = {};
      //如果触摸的X轴坐标大于等于限定的可移动范围，并且滑动的平均速度不能超过100，则验证成功
      if (this.x == this.max && avg < this.limit) {
        //设置验证成功提示语
        this.status = '验证成功';
        //设置data对象的返回值
        data.msg = true;
        //验证成功后，禁止滑块滑动
        this.isSlide = false;
      } else {
        //元素X轴坐标归0
        this.x = 0;
        //清空验证成功提示语
        this.status = '';
        this.tip = '验证失败'
        //设置data对象的返回值
        data.msg = false;
      }
      this.$emit('getMsg', data)
      this.transition = true
      //根据获取到的X轴坐标进行动画演示
    }
  }
}
</script>

<style>
  .container {
    height: 80px;
    border: 1px solid #ccc;
    border-radius: 5px;
    text-align: center;
    line-height: 80px;
    font-size: 32px;
    position: relative;
    overflow: hidden;
  }

  .progressFinish {
    height: 100%;
    width: 100%;
    background-color: #67c23a;
    border-radius: 5px;
    overflow: hidden;
    position: absolute;
    top: 0;
    color: #fff;
  }

  .ball {
    height: 100%;
    width: 50px;
    background-color: #eee;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 0;
    top: 0;
  }

  .ball image {
    width: 50%;
    height: 50%;
  }
  .transition {
    transition: 0.5s ease;
  }
  .text {
    color: black;
    user-select: none;
  }
</style>
