export default {

    // 获取当前时间(format默认值为yyyy-MM-dd hh:mi:ss)
    getCurDate(format){
        if (format == null) format = 'yyyy-MM-dd hh:mi:ss'
        return this.formartDate(new Date(),format)
    },

    /**
     * 格式化时间
     * d: 要转化的时间
     * format : 转化后的格式
     */
    formartDate(d, format){
        let year = d.getFullYear();
        let month = d.getMonth() + 1 + "";
        let day = d.getDate() + "";
        let hh = d.getHours() + "";
        let mm = d.getMinutes() + "";
        let ss = d.getSeconds() + "";
        let week = d.getDay();          // 星期几
        if (month.length == 1) month = "0" + month;
        if (day.length == 1) day = "0" + day;
        if (hh.length == 1) hh = "0" + hh;
        if (mm.length == 1) mm = "0" + mm;
        if (ss.length == 1) ss = "0" + ss;

        let hasY = format.indexOf('yyyy')
        if (hasY >= 0) format = format.replace('yyyy', year)
        let hasMM = format.indexOf('MM')
        if (hasMM >= 0) format = format.replace('MM', month)
        let hasDD = format.indexOf('dd')
        if (hasDD >= 0) format = format.replace('dd', day)
        let hasHH = format.indexOf('hh')
        if (hasHH >= 0) format = format.replace('hh', hh)
        let hasMI = format.indexOf('mi')
        if (hasMI >= 0) format = format.replace('mi', mm)
        let hasSS = format.indexOf('ss')
        if (hasSS >= 0) format = format.replace('ss', ss)
        let hasWW = format.indexOf('ww')
        if (hasWW >= 0) {
            let ww = '星期'
            switch (week) {
                case 0: ww += "日"; break;
                case 1: ww += "一"; break;
                case 2: ww += "二"; break;
                case 3: ww += "三"; break;
                case 4: ww += "四"; break;
                case 5: ww += "五"; break;
                case 6: ww += "六"; break;
            }
            format = format.replace('ww', ww)
        }
        let hasM = format.indexOf('M')
        if (hasM >= 0) format = format.replace('M', Number(month))
        let hasD = format.indexOf('d')
        if (hasD >= 0) format = format.replace('d', Number(day))
        return format
    },

    /**
     * 格式化时间
     */
    formatStrDate(strDate, oldFormat, newFormat){
        let startY = oldFormat.indexOf('yyyy')
        let startM = oldFormat.indexOf('MM')
        let startD = oldFormat.indexOf('dd')
        let y = strDate.substr(startY,4)
        let m = strDate.substr(startM,2)
        let d = strDate.substr(startD,2)
        let t = new Date(`${y}/${m}/${d}`)
        return this.formartDate(t, newFormat)
    },

    // 当某月的天数
    getDaysInOneMonth(date){
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const d = new Date(year, month, 0);
        return d.getDate();
    },
    // 向前空几个
    getMonthweek(date){
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const dateFirstOne = new Date(year + '/' + month + '/1');
        return this.sundayStart ?
            dateFirstOne.getDay() == 0 ? 7 : dateFirstOne.getDay() :
            dateFirstOne.getDay() == 0 ? 6 : dateFirstOne.getDay() - 1;
    },
    /**
     * 获取当前日期上个月或者下个月
    */
    getOtherMonth(date, str = 'nextMonth'){
        const timeArray = this.dateFormat(date).split('/');
        const year = timeArray[0];
        const month = timeArray[1];
        const day = timeArray[2];
        let year2 = year;
        let month2;
        if (str === 'nextMonth') {
            month2 = parseInt(month) + 1;
            if (month2 == 13) {
                year2 = parseInt(year2) + 1;
                month2 = 1;
            }
        } else {
            month2 = parseInt(month) - 1;
            if (month2 == 0) {
                year2 = parseInt(year2) - 1;
                month2 = 12;
            }
        }
        let day2 = day;
        const days2 = new Date(year2, month2, 0).getDate();
        if (day2 > days2) {
            day2 = days2;
        }
        if (month2 < 10) {
            month2 = '0' + month2;
        }
        if (day2 < 10) {
            day2 = '0' + day2;
        }
        const t2 = year2 + '/' + month2 + '/' + day2;
        return new Date(t2);
    },
    // 上个月末尾的一些日期
    getLeftArr(date){
        const arr = [];
        const leftNum = this.getMonthweek(date);
        const num = this.getDaysInOneMonth(this.getOtherMonth(date, 'preMonth')) - leftNum + 1;
        const preDate = this.getOtherMonth(date, 'preMonth');
        // 上个月多少开始
        for (let i = 0; i < leftNum; i++) {
            const nowTime = preDate.getFullYear() + '/' + (preDate.getMonth() + 1) + '/' + (num + i);
            arr.push({
                id: num + i,
                date: nowTime,
                isToday: false,
                otherMonth: 'preMonth',
            });
        }
        return arr;
    },
    // 下个月末尾的一些日期
    getRightArr(date){
        const arr = [];
        const nextDate = this.getOtherMonth(date, 'nextMonth');
        const leftLength = this.getDaysInOneMonth(date) + this.getMonthweek(date);
        const _length = 7 - leftLength % 7;
        for (let i = 0; i < _length; i++) {
            const nowTime = nextDate.getFullYear() + '/' + (nextDate.getMonth() + 1) + '/' + (i + 1);
            arr.push({
                id: i + 1,
                date: nowTime,
                isToday: false,
                otherMonth: 'nextMonth',
            });
        }
        return arr;
    },
    // format日期
    dateFormat(date){
        date = typeof date === 'string' ? new Date(date.replace(/\-/g, '/')) : date;
        return date.getFullYear() + '/' + (date.getMonth() + 1) + '/'
            + date.getDate();
    },
    // 获取某月的列表不包括上月和下月
    getMonthListNoOther(date){
        const arr = [];
        const num = this.getDaysInOneMonth(date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const toDay = this.dateFormat(new Date());

        for (let i = 0; i < num; i++) {
            const nowTime = year + '/' + month + '/' + (i + 1);
            arr.push({
                id: i + 1,
                date: nowTime,
                isToday: toDay === nowTime,
                otherMonth: 'nowMonth',
            });
        }
        return arr;
    },
    // 获取某月的列表 用于渲染
    getMonthList(date){
        return [...this.getLeftArr(date), ...this.getMonthListNoOther(date), ...this.getRightArr(date)];
    },
    // 默认是周一开始
    sundayStart: false,
};