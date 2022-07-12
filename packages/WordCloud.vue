<template>
  <div>
    <div class="wordCloud"
         :style="'height:' + height + 'px;width:' + width + 'px;'">
      <span v-for="(item, index) in textList"
            :key="index"
            :style="'font-size:'+item.size+';'+'float:left;'+'color:'+item.color+';'">
        {{ item.name }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'XjWordCloud',
  props: {
    // 需要展示的数据 格式 ：[{text:'文本1',num:10}]
    list: {
      type: Array,
      default: []
    },
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 300
    },
    // 接收步频
    temp: {
      type: Number,
      default: 5
    }
  },
  data () {
    return {
      textList: []
    }
  },
  created () {
    this.comShowtexList()
  },
  methods: {
    //随机获取颜色
    getRandomColor () {
      let color = 'rgb('
      color += Math.floor(Math.random() * 255) + ','
      color += Math.floor(Math.random() * 255) + ','
      color += Math.floor(Math.random() * 255) + ')'
      return color
    },
    //计算文字大小。通过（词频*步频）计算字体大小
    getSize (num) {
      return (
        num * this.temp + 'px'
      );
    },
    //将用户的数据存储到容器中
    comShowtexList () {
      let textList = []
      this.list.forEach(item => {
        let temp = item;
        temp.size = this.getSize(item.num)
        temp.color = this.getRandomColor()
        textList.push(temp)
      })
      // 将数组顺序打乱
      textList.sort(() => {
        return (0.5 - Math.random());
      });
      this.textList = textList
    }
  }
}
</script>

<style lang="scss" scoped>
  .wordCloud {
    border: 1px solid #ffcc00;
    span {
      margin: 2px;
    }
  }
</style>
