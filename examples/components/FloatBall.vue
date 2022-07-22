<template>
  <div class="container">
    <xj-float-ball :x=0
                   :y=0.5
                   :isShow="true">
      <img width="50px"
           height="50px"
           src="../assets/floatBall.png" />
    </xj-float-ball>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },
  methods: {
  },
};
</script>
<style scoped>
  .container {
    width: 500px;
    height: 800px;
    background-color: #ffcc00;
  }
</style>
