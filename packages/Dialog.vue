<template>
  <transition name="dialog-animation">
    <div class="xj-dialog_wrapper"
         v-show="visible"
         @click.self='dialogClose'>
      <!-- 这里有个问题：会有事件冒泡，需要关闭事件冒泡，.self  .stop -->
      <div class="xj-dialog"
           :style="{'width':width,'maginTop':top}">
        <div class="xj-dialog_header">
          <!-- 将span用slot包裹起来，这里起到什么效果呢？就是你可以通过插槽，也可以通过title -->
          <slot name="title">
            <span class="xj-dialog_title">{{title}}</span>
          </slot>
          <button class="xj-dialog_headerbtn"
                  @click='dialogClose'>
            <i class="xj-icon-close">x</i>
          </button>
        </div>
        <div class="xj-dialog_body">
          <slot></slot>
        </div>
        <div class="xj-dialog_footer">
          <!-- 不能由子组件控制底部，由用户控制，子组件提供 slot。灵活！
        <xj-button>取消</xj-button>
        <xj-button type="primary">确定</xj-button> -->
          <slot name="footer"
                v-if="$slots.footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'XjDialog',
  props: {
    title: {
      type: String,
      default: '提示'
    },
    width: {
      type: String,
      default: '30%'
    },
    top: {
      type: String,
      default: '15vh'
    },
    visible: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    dialogClose () {
      // this.visible = false//不能修改props属性，违反了Vue的单数据流向原则
      // this.$emit('close', false) // 这样写有个问题：用户使用很麻烦。为什么呢？因为用户需要自定义一个close事件，还需要获取数据来修改visible，太麻烦了，vue 2.2.0有个新属性 .sync 专门用来解决这个问题
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
  .xj-dialog_wrapper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    margin: 0;
    z-index: 2001;
    background-color: rgba(0, 0, 0, 0.5);
    .xj-dialog {
      position: relative;
      margin: 15vh auto 50px;
      background: #fff;
      border-radius: 2px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      box-sizing: border-box;
      width: 30%;
      &_header {
        padding: 20px 20px 10px;
        .xj-dialog_title {
          line-height: 24px;
          font-size: 18px;
          color: #303133;
        }
        .xj-dialog_headerbtn {
          position: absolute;
          top: 20px;
          right: 20px;
          padding: 0;
          background: transparent;
          border: none;
          outline: none;
          cursor: pointer;
          font-size: 16px;
          .xj-icon-close {
            color: 909399;
          }
        }
      }
      &_body {
        padding: 30px 20px;
        color: #606266;
        font-size: 14px;
        word-break: break-all;
      }
      &_footer {
        padding: 10px 20px 20px;
        text-align: right;
        box-sizing: border-box;
        ::v-deep .xj-button:first-child {
          margin-right: 20px;
        }
      }
    }
  }
  .dialog-animation-enter-active {
    animation: run 0.5s;
  }
  .dialog-animation-leave-active {
    animation: run 0.5s reverse;
  }
  @keyframes run {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>
