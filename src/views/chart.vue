<!--
 * @Descripttion: 
 * @version: 
 * @Author: LiuYang
 * @Date: 2022-02-12 00:03:50
 * @LastEditors: LiuYang
 * @LastEditTime: 2022-02-12 00:03:50
-->
<template>
  <div>
    <div :id="id"  :option="option"></div>
  </div>
</template>

<script>
  import HighCharts from 'highcharts'
  export default {
    name:'graphicsChart',
    // 验证类型
    props: {
      id: {
        type: String
      },
      option: {
        type: Object
      }
    },
    watch: {
      option () {
        HighCharts.chart(this.id,this.option);
      }
    },
    mounted() {
      HighCharts.chart(this.id,this.option)
    }
  }
</script>

<style scoped>

</style>