<template>
    <div id="app">
        <h2>calculate</h2>
        <czs-yx-calendar
            ref="calendarRef"
            @choseDay="clickDay"
            dateFormat="yyyy-MM-dd"
            defaultVal='2019-08-17'
        ></czs-yx-calendar>
        <button @click="setDateVal()">设置日期</button>
    </div>
</template>

<script>
import czsYxCalendar from '../src/czsYxCalendar'; // 引入
export default {
    name: 'app',
    data () {
        return {
            
        }
    },
    //注册插件
    components:{
        czsYxCalendar
    },
    methods:{
        clickDay(data) {
            console.log('选中某天',data); //选中某天
        },
        changeDate(data) {
            console.log('左右点击切换月份',data); //左右点击切换月份
        },
        clickToday(data) {
            console.log('跳到了本月',data); //跳到了本月
        },
        setDateVal(){
            this.$refs.calendarRef.setDateVal('2019-09-21')
        }
    }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>