<template>
  <label class="one-radio "
         :class="{'is-checked':label===model}">
    <span class="one-radio_input">
      <span class="one-radio_inner"></span>
      <input type="radio"
             class="one-radio_original"
             :value="label"
             :name='name'
             v-model="model">
    </span>
    <span class="one-radio_label">
      <slot></slot>
      <!-- 如果没有传内容，我们就把label当成内容 -->
      <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
</template>
<script>
export default {
  name: 'XjRadio',
  props: {
    label: {
      type: [String, Number, Boolean],
      default: ''
    },
    value: null,
    name: {
      type: String,
      default: ''
    }
  },
  computed: {
    // 需要提供一个计算属性 model
    model: {
      get () {
        // return this.value
        return this.isGroup ? this.RadioGroup.value : this.value
      },
      set (value) {
        // 触发父组件给当前组件注册的input事件
        // this.$emit('input', value)
        this.isGroup ? this.RadioGroup.$emit('input', value) : this.$emit('input', value)
      }
    },
    isGroup () {
      // 判断radio是否被radio-group包裹
      return !!this.RadioGroup // 这里转换为布尔值的使用灰常巧妙！
    }
  },
  data () {
    return {}
  },
  methods: {},
  inject: {
    RadioGroup: {
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>
  .one-radio {
    color: #606266;
    font-weight: 500;
    line-height: 1;
    position: relative;
    cursor: pointer;
    display: inline-block;
    white-space: nowrap;
    outline: none;
    font-size: 14px;
    margin-right: 30px;
    -moz-user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    .one-radio_input {
      white-space: nowrap;
      cursor: pointer;
      outline: none;
      display: inline-block;
      line-height: 1;
      position: relative;
      vertical-align: middle;
      .one-radio_inner {
        border: 1px solid #dcdfe6;
        border-radius: 100%;
        width: 14px;
        height: 14px;
        background-color: #fff;
        position: relative;
        cursor: pointer;
        display: inline-block;
        box-sizing: border-box;
        &:after {
          width: 4px;
          height: 4px;
          border-radius: 100%;
          background-color: #fff;
          content: "";
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) scale(0);
          transition: transform 0.15s ease-in;
        }
      }
      .one-radio_original {
        opacity: 0;
        outline: none;
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0px;
        right: 0;
        bottom: 0;
        margin: 0;
      }
    }
    .one-radio_label {
      font-size: 14px;
      padding-left: 10px;
    }
  }
  // 选中的样式
  .one-radio.is-checked {
    .one-radio_input {
      .one-radio_inner {
        border-color: #ffc300;
        background-color: #ffc300;
        &:after {
          transform: translate(-50%, -50%) scale(1);
        }
      }
    }
    .one-radio_label {
      color: #ffc300;
    }
  }
</style>
