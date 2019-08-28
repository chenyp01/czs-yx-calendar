<template>
    <section class="wh_container">
        <div class="wh_content_all" :style="calculateBackColor">
            <div class="wh_top_changge">
                <li @click="PreMonth(myDate,false)" :style="calculateFontStyle">
                    <div :style="whJiantou1"></div>
                </li>
                <li class="wh_content_li" :style="calculateFontStyle">{{dateTop}}</li>
                <li :style="calculateFontStyle" @click="NextMonth(myDate,false)">
                    <div :style="whJiantou2"></div>
                </li>
            </div>
            <div class="wh_content">
                <div class="wh_content_item" :style="calculateFontStyle" v-for="tag in textTop">
                    <div class="wh_top_tag">{{tag}}</div>
                </div>
            </div>
            <div class="wh_content">
                <div class="wh_content_item" :style="calculateFontStyle" v-for="(item,index) in list" @click="clickDay(item,index)">
                <div 
                    class="wh_item_date" 
                    :class="[
                        {wh_isMark: item.isMark},
                        {wh_other_dayhide:item.otherMonth!=='nowMonth'},
                        {wh_want_dayhide:item.dayHide},
                        {wh_isToday:item.isToday},
                        {wh_chose_day:item.chooseDay},
                        setClass(item)
                    ]"
                    :style="getDayStyle(item.isToday,item.chooseDay)"
                >{{item.id}}</div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import dateUtil from "./czs-yx-calendar";
export default {
    name:'czsYxCalendar',
    props: {
        // 如果需要某月的几天被标注，传当月的日期数组。如["2018/2/2","2018/2/6"]被会标注（相同的标记）
        markDate: {
            type: Array,
            default: () => []
        },
        // 需要不同的标记如上Usage
        markDateMore: {
            type: Array,
            default: () => []
        },
        // 日历头部的文字，默认是 ["一", "二", "三", "四", "五", "六", "日"] ，可以根据自己的需求进行不同的修改。
        textTop: {
            type: Array,
            default: () => ["一", "二", "三", "四", "五", "六", "日"]
        },
        // 默认是周一开始 当是true的时候 是周日开始
        sundayStart: {
            type: Boolean,
            default: () => false
        },
        // 某个日期以前的不允许点击，如：2019-07-01
        startTime:{
            type: String,
            default:''
        },
        // 某个日期以后的不允许点击，如：2030-07-01
        endTime:{
            type: String,
            default:''
        },
        // 日历背景颜色
        backgroundColor:{
            type:String,
            default:'#f7f7f7'
        },
        // 文字颜色
        fontColor:{
            type:String,
            default:'#000'
        },
        // 选中日期的背景颜色
        selectDateBgColor:{
            type:String,
            default:'#666'
        },
        // 选中日期的文字颜色
        selectFontColor:{
            type:String,
            default:'white'
        },
        // 当天日期的背景色
        nowDateBgColor:{
            type:String,
            default:'#ddd'
        },
        // 当天日期的文字颜色
        nowDateFontColor:{
            type:String,
            default:'#6262ef'
        },
        // 日期格式
        dateFormat:{
            type:String,
            default:'yyyy-MM-dd'
        },
        // 初始化日期
        defaultVal:{
            type:String,
            default:''
        }
    },
    data() {
        return {
            myDate: [],
            list: [],
            historyChose: [],
            dateTop: "",
            calculateBackColor:{backgroundColor:this.backgroundColor},
            calculateFontStyle:{color:this.fontColor},
            calculateSelectDateStyle:{
                backgroundColor:this.selectDateBgColor,
                color:this.selectFontColor
            },
            calculateNowDateStyle:{
                backgroundColor:this.nowDateBgColor,
                color:this.nowDateFontColor
            },
            whJiantou1:{
                width: '12px',
                height: '12px',
                borderTop: `2px solid ${this.fontColor}`,
                borderLeft: `2px solid ${this.fontColor}`,
                transform: 'rotate(-45deg)'
            },
            whJiantou2:{
                width: '12px',
                height: '12px',
                borderTop: `2px solid ${this.fontColor}`,
                borderRight: `2px solid ${this.fontColor}`,
                transform: 'rotate(45deg)'
            },
            defaultDate:null
        };
    },
    created() {
        this.intStart()
        this.myDate = new Date()
        if (this.defaultVal && this.defaultVal.length) {
            const _d = dateUtil.formatStrDate(this.defaultVal, this.dateFormat, 'yyyy/M/d')
            this.defaultDate = new Date(_d)
        }
        
    },
    methods: {
        intStart() {
            dateUtil.sundayStart = this.sundayStart;
        },
        setClass(data) {
            let obj = {};
            obj[data.markClassName] = data.markClassName;
            return obj;
        },
        clickDay: function(item, index) {
            if (item.otherMonth === "nowMonth" && !item.dayHide) {
                this.getList(this.myDate, item.date);
            }
            if (item.otherMonth !== "nowMonth") {
                item.otherMonth === "preMonth"
                    ? this.PreMonth(item.date)
                    : this.NextMonth(item.date);
            }
        },
        setDateVal: function(date, isChosedDay = true) {
            date = dateUtil.dateFormat(date);
            this.myDate = new Date(date);
            this.$emit("changeMonth", dateUtil.dateFormat(this.myDate));
            if (isChosedDay) {
                this.getList(this.myDate, date, isChosedDay);
            } else {
                this.getList(this.myDate);
            }
        },
        PreMonth: function(date, isChosedDay = true) {
            date = dateUtil.dateFormat(date);
            this.myDate = dateUtil.getOtherMonth(this.myDate, "preMonth");
            this.$emit("changeMonth", dateUtil.dateFormat(this.myDate));
            if (isChosedDay) {
                this.getList(this.myDate, date, isChosedDay);
            } else {
                this.getList(this.myDate);
            }
        },
        NextMonth: function(date, isChosedDay = true) {
            date = dateUtil.dateFormat(date);
            this.myDate = dateUtil.getOtherMonth(this.myDate, "nextMonth");
            this.$emit("changeMonth", dateUtil.dateFormat(this.myDate));
            if (isChosedDay) {
                this.getList(this.myDate, date, isChosedDay);
            } else {
                this.getList(this.myDate);
            }
        },
        forMatArgs: function() {
            let markDate = this.markDate;
            let markDateMore = this.markDateMore;
            markDate = markDate.map(k => {
                return dateUtil.dateFormat(k);
            });
            markDateMore = markDateMore.map(k => {
                k.date = dateUtil.dateFormat(k.date);
                return k;
            });
            return [markDate, markDateMore];
        },
        getList: function(date, chooseDay, isChosedDay = true) {
            const [markDate, markDateMore] = this.forMatArgs();
            this.dateTop = `${date.getFullYear()}年${date.getMonth() + 1}月`;
            let arr = dateUtil.getMonthList(this.myDate)
            for (let i = 0; i < arr.length; i++) {
                let markClassName = "";
                let k = arr[i];
                k.chooseDay = false;
                const nowTime = k.date;
                const showTime = dateUtil.formartDate(new Date(nowTime),this.dateFormat)
                const t = dateUtil.formartDate(new Date(nowTime),'yyyyMMdd')    // 日期时间
                //看每一天的class
                for (const c of markDateMore) {
                    if (c.date === nowTime) {
                        markClassName = c.className || "";
                    }
                }
                //标记选中某些天 设置class
                k.markClassName = markClassName;
                k.isMark = markDate.indexOf(nowTime) > -1;
                //无法选中某天
                k.dayHide = false
                if (this.startTime && this.startTime.length) {
                    let starT = dateUtil.formatStrDate(this.startTime,this.dateFormat,'yyyyMMdd')
                    if (t < starT) k.dayHide = true
                }
                if (this.endTime && this.endTime.length) {
                    let endT = dateUtil.formatStrDate(this.endTime,this.dateFormat,'yyyyMMdd')
                    if (t > endT) k.dayHide = true
                }
                if (k.isToday) {
                    // this.$emit("isToday", nowTime);
                    this.$emit("isToday", showTime);
                }
                let flag = !k.dayHide && k.otherMonth === "nowMonth";
                if (chooseDay && chooseDay === nowTime && flag) {
                    this.$emit("choseDay", showTime);
                    this.historyChose.push(nowTime);
                    k.chooseDay = true;
                } else if (
                    this.historyChose[this.historyChose.length - 1] === nowTime &&
                    !chooseDay &&
                    flag
                ) {
                    k.chooseDay = true;
                }
            }
            this.list = arr;
            console.log('arr',arr)
        },
        getDayStyle(isToday,chooseDay){
            if (chooseDay) {
                return this.calculateSelectDateStyle
            }else if(isToday){
                return this.calculateNowDateStyle
            }else{
                return ''
            }
        }
    },
    mounted() {
        if (this.defaultDate) {
            this.setDateVal(this.defaultDate)
        }else{
            this.getList(this.myDate)
        }
    },
    watch: {
        markDate: {
            handler(val, oldVal) {
                this.getList(this.myDate);
            },
            deep: true
        },
        markDateMore: {
            handler(val, oldVal) {
                this.getList(this.myDate);
            },
            deep: true
        },
        startTime: {
            handler(val, oldVal) {
                this.getList(this.myDate);
            },
            deep: true
        },
        endTime: {
            handler(val, oldVal) {
                this.getList(this.myDate);
            },
            deep: true
        },
        sundayStart: {
            handler(val, oldVal) {
                this.intStart();
                this.getList(this.myDate);
            },
            deep: true
        }
    }
};
</script>

<style scoped>
@media screen and (min-width: 460px) {
    .wh_item_date:hover {
        background: #ddd;
        border-radius: 10px;
        cursor: pointer;
    }
}
* {
    margin: 0;
    padding: 0;
}

.wh_container {
    max-width: 410px;
    margin: auto;
}

li {
    list-style-type: none;
}
.wh_top_changge {
    display: flex;
}

.wh_top_changge li {
    cursor: pointer;
    display: flex;
    color: #fff;
    font-size: 18px;
    flex: 1;
    justify-content: center;
    align-items: center;
    height: 47px;
}

.wh_top_changge .wh_content_li {
    cursor: auto;
    flex: 2.5;
}
.wh_content_all {
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC",
        "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun, sans-serif;
    
    width: 100%;
    overflow: hidden;
    padding-bottom: 8px;
}

.wh_content {
    display: flex;
    flex-wrap: wrap;
    padding: 0 3% 0 3%;
    width: 100%;
}

.wh_content:first-child .wh_content_item_tag,
.wh_content:first-child .wh_content_item {
    color: #ddd;
    font-size: 16px;
}

.wh_content_item,
wh_content_item_tag {
    font-size: 15px;
    width: 13.4%;
    text-align: center;
    color: #fff;
    position: relative;
}
.wh_content_item {
    height: 40px;
}

.wh_top_tag {
    width: 40px;
    height: 40px;
    line-height: 40px;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
}

.wh_item_date {
    width: 40px;
    height: 40px;
    line-height: 40px;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
}

.wh_jiantou1:active,
.wh_jiantou2:active {
    border-color: #ddd;
}

.wh_content_item > .wh_isMark {
    margin: auto;
    border-radius: 10px;
    background: blue;
    z-index: 2;
}
.wh_content_item .wh_other_dayhide {
    color: #bfbfbf;
}
.wh_content_item .wh_want_dayhide {
    color: #bfbfbf;
}
.wh_content_item .wh_isToday {
    background: yellow;
    border-radius: 10px;
}
.wh_content_item .wh_chose_day {
    background: green;
    border-radius: 10px;
}
</style>
