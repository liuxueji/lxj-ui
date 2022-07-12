<template>
  <div id="app">
    <xj-button type="primary"
               @click="visible = true">按钮</xj-button>
    <xj-dialog title="提示"
               :visible.sync="visible"
               width="30%">
      <xj-form :model="model">
        <xj-form-item label="用户名">
          <xj-input placeholder="请输入用户名"
                    v-model="model.username"
                    clearable></xj-input>
        </xj-form-item>
        <xj-form-item label="密码">
          <xj-input placeholder="请输入密码"
                    type="password"
                    v-model="model.userpwd"
                    show-password></xj-input>
        </xj-form-item>
        <xj-form-item label="立即配送">
          <xj-switch v-model="model.soon"></xj-switch>
        </xj-form-item>
        <xj-form-item label="性别">
          <xj-radio-group v-model="model.gender">
            <xj-radio label="1">男</xj-radio>
            <xj-radio label="0">女</xj-radio>
          </xj-radio-group>
        </xj-form-item>
        <xj-form-item label="爱好">
          <xj-checkbox-group v-model="model.hobby">
            <xj-checkbox label="篮球">篮球</xj-checkbox>
            <xj-checkbox label="足球">足球</xj-checkbox>
            <xj-checkbox label="乒乓球">乒乓球</xj-checkbox>
          </xj-checkbox-group>
        </xj-form-item>
      </xj-form>
      <template v-slot:footer>
        <xj-button>取消</xj-button>
        <xj-button @click="btn"
                   type="primary">确定</xj-button>
      </template>
    </xj-dialog>
    <div class="progress">
      <h3>进度条</h3>
      <progress-bar width="40"
                    unfinishBg="#ccc"
                    sliderBg="red"
                    :percent="percent"
                    @progDrag="progDrag"
                    @progClick="progClick">1231231233</progress-bar>
      <div class="nav">
        <div>{{curSecond|formateTime}}</div>
        <div>{{percent|toInt}}%</div>
        <div>{{total|formateTime}}</div>
      </div>
      <div class="actionBtn">
        <xj-button type="button"
                   @click="backword">＜</xj-button>
        <xj-button type="button"
                   @click="action"
                   v-if="isShow">▶</xj-button>
        <xj-button type="button"
                   @click="action"
                   v-else>■</xj-button>
        <xj-button type="button"
                   @click="forward">＞</xj-button>
      </div>
    </div>
    <xj-button @click="goWordCloud">goWordCloud</xj-button>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      model: {
        username: 'admin',
        userpwd: '123456',
        soon: true,
        gender: '1',
        hobby: ['篮球']
      },
      visible: false,
      // 总时长
      total: 800,
      // 当前观看时长
      curSecond: 0,
      percent: 0,
      timer: null,
      isShow: true
    }
  },
  methods: {
    btn () {
      console.log(this.model)
    },
    // 通过获取回来的观看进度（百分比），反推当前时长
    progDrag (percent) {
      this.curSecond = percent / 100 * this.total
      console.log(percent)
    },
    progClick (percent) {
      this.curSecond = percent / 100 * this.total
      console.log(this.curSecond)
    },
    action () {
      this.isShow = !this.isShow
      if (!this.isShow) {
        this.timer = window.setInterval(() => {
          this.curSecond++
          // 当前时长等于总时长，播放完毕
          if (this.curSecond === this.total) clearInterval(this.timer)
        }, 1000)
      } else {
        clearInterval(this.timer)
      }
    },
    // 后退
    backword () {
      this.curSecond -= 10
    },
    // 前进
    forward () {
      this.curSecond += 10
    },
    // 跳转到词云组件
    goWordCloud () {
      this.$router.push('./WordCloud')
    }
  },
  mounted () {
    this.percent = this.curSecond / this.total * 100
  },
  // 通过监听最新curSecond（当前观看时长），并通过 当前时长/总时长 * 100 得到当前观看进度（百分比）
  watch: {
    curSecond (nowValue) {
      this.percent = nowValue / this.total * 100
    }
  },
  // 过滤小数点
  filters: {
    toInt (value) {
      // 截取当前数据到小数点后两位
      const realVal = Number(value).toFixed(0)
      // num.toFixed(2)获取的是字符串
      return Number(realVal)
    },
    formateTime (time) {
      const h = parseInt(time / 3600)
      const minute = parseInt(time / 60 % 60)
      const second = Math.ceil(time % 60)
      const hours = h < 10 ? '0' + h : h
      const formatSecond = second > 59 ? 59 : second
      return `${hours > 0 ? `${hours}:` : ''}${minute < 10 ? '0' + minute : minute}:${formatSecond < 10 ? '0' + formatSecond : formatSecond}`
    }
  }
}
</script>

<style lang="less">
  .progress {
    width: 400px;
  }
  .nav {
    width: 400px;
    height: 50px;
    font-size: 13px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .actionBtn {
    width: 400px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
</style>
