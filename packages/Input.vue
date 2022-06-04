<template>
  <div class="xj-input"
       :class="{'xj-input_suffix':showSuffix}">
    <!-- :class="{'xj-input_suffix':showSuffix} 添加这个属性的意义是，优化代码。当没有小图标传入，就不用类名！ -->
    <input class="xj-input_inner"
           :class="{'is-disabled': disabled}"
           :placeholder="placeholder"
           :type="showPassword?(passwordVisible?'text':'password'):type"
           :name="name"
           :disabled="disabled"
           :value="value"
           @input="handleInput">
    <span class="xj-input_suffix">
      <i class="on-input_icon xj-icon-cancel"
         v-if="clearable && value"
         @click="clear">x</i>
      <i class="on-input_icon xj-icon-visible"
         :class="{'is-passwordVisible':passwordVisible}"
         v-if="showPassword"
         @click="handlePassword">👁</i>
    </span>
  </div>
</template>

<script>
export default {
  name: 'XjInput',
  data () {
    return {
      // 是否显示密码框
      passwordVisible: false
    }
  },
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: 'text'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: String,
      default: ''
    },
    clearable: {
      type: Boolean,
      default: false
    },
    showPassword: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleInput (e) {
      // console.log(e.target.value)// 获取input框中的值
      // this.value = e.target.value // 报错，不能修改父组件中的值
      this.$emit('input', e.target.value)
    },
    clear () {
      this.$emit('input', '')
    },
    handlePassword () {
      this.passwordVisible = !this.passwordVisible
    }
  },
  computed: {
    showSuffix () {
      return this.clearable || this.showPassword
    }
  }
}
</script>

<style lang="scss" scoped>
  .xj-input {
    width: 100%;
    position: relative;
    font-size: 14px;
    display: inline-block;
    .xj-input_inner {
      -webkit-appearance: none;
      background-color: #fff;
      background-image: none;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      box-sizing: border-box;
      color: #606266;
      display: inline-block;
      font-size: inherit;
      height: 40px;
      line-height: 40px;
      outline: none;
      padding: 0 15px;
      transition: border-color 0.2s cubic-bezier(0.645, 045, 0.355, 1);
      width: 100%;

      &:focus {
        outline: none;
        border-color: #ffc300;
      }
      // input禁用样式
      &.is-disabled {
        background-color: #f5f7fa;
        border-color: #e4e7ed;
        color: #c0c4cc;
        cursor: not-allowed;
      }
    }
  }
  .xj-input_suffix {
    .xj-input_inner {
      padding-right: 30px;
    }
    .xj-input_suffix {
      position: absolute;
      right: 10px;
      height: 100%;
      top: 0;
      line-height: 40px;
      text-align: center;
      color: #c0c4cc;
      transition: all 0.3s;
      z-index: 900;
      i {
        color: #c0c4cc;
        font-size: 14px;
        cursor: pointer;
        transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);

        is-passwordVisible {
          color: yellow !important;
        }
      }
    }
  }
</style>
