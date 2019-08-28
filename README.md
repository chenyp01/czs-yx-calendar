# czs-yx-calendar

> calendar

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## Usage
```
import CzsYxCalendar from 'czs-yx-calendar'
Vue.use(CzsYxCalendar)
```

## API

#### czs-yx-calendar props

name | type | remark
---|---|---
textTop | Array | 日历头部的文字，默认是 [ '日','一', '二', '三', '四', '五', '六']
sundayStart | Boolean | 默认是周一开始 当是true的时候 是周日开始
startTime | String | 某个日期以前的不允许点击，如：2019-07-01
endTime | String | 某个日期以后的不允许点击，如：2020-07-01
defaultVal | String | 设置默认值，如：2019-08-17
dateFormat | String | 日期格式，如：yyyy-MM-dd
backgroundColor | String | 日历背景颜色,如：#f7f7f7
fontColor | String | 文字颜色,如：#000
selectDateBgColor | String | 选中日期的背景颜色,如：#666
selectFontColor | String | 选中日期的背景颜色,如：white
nowDateBgColor | String | 当天日期的背景色,如：#ddd
nowDateFontColor | String | 当天日期的背景色,如：#6262ef


#### czs-yx-calendar Function

name | remark
---|---
choseDay | 选中某天调用的方法，返回选中的日期 yyyy-MM-dd
changeMonth | 切换月份调用的方法，返回切换到某月的日期 yyyy-MM-dd
isToday | 切换月份的时候，如果切到当前月份，调用这个方法，返回当前月今天
setDateVal | 设置日期


For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
