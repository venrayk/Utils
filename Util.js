//字符串替换
String.prototype.replaceAll  = function(s1,s2){
        return this.replace(new RegExp(s1,"gm"),s2);
}

/**
 * 日期格式化
 * @param fmt
 * @returns {*}
 */
Date.prototype.format = function (fmt) {
    if (fmt == undefined) {
        fmt = "yyyy-MM-dd";
    }
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

/**
 * 获取当天日期
 * @returns {Date}
 */
Date.prototype.today = function () {
    return new Date();
}


/**
 * 获取明天日期
 * @return {Date}
 */
Date.prototype.tomorrow = function () {
    return this.addDays(1);
}

/**
 * 获取昨天日期
 * @return {Date}
 */
Date.prototype.yesterday = function () {
    return this.addDays(-1);
}

/**
 * 新增 N 天
 * @param {Int} days
 * @returns {Date}
 */
Date.prototype.addDays = function (days) {
    if (parseInt(days) != days) {
        throw(days + " 不是一个有效的参数！");
        return;
    }
    var d = this;
    d.setDate(d.getDate() + days);
    return d;
}

/**
 * 获取周一日期
 * @returns {Date}
 */
Date.prototype.getMonday = function () {
    var monday = new Date(this.getTime());
    monday.setDate(monday.getDate() + 1 - monday.getDay());
    return monday;
}

/**
 * 获取周日日期
 * @returns {Date}
 */
Date.prototype.getSunday = function () {
    var sunday = new Date(this.getTime());
    sunday.setDate(sunday.getDate() + 7 - sunday.getDay());
    return sunday;
}

/**
 * 获取当前一周日期
 * @returns {*[]}
 */
Date.prototype.weekDays = function () {
    var monday = this.getMonday();
    var weekDays = [monday];
    for (var i = 0; i < 6; i++) {
        weekDays.push(monday.addDays(1));
    }
    return weekDays;
}


/**
 * 获取下周日期
 * @returns {*[]}
 */
Date.prototype.nextWeek = function () {

    var monday = this.getSunday().addDays(1);

    var weekDays = [monday];
    for (var i = 0; i < 6; i++) {
        weekDays.push(monday.addDays(1));
    }
    return weekDays;
}

/**
 * 获取上一周日期
 * @returns {*[]}
 */
Date.prototype.prevWeek = function () {
    var monday = this.getSunday().addDays(-6);

    var weekDays = [monday.format()];
    for (var i = 0; i < 6; i++) {
        weekDays.push(monday.addDays(1).format());
    }
    return weekDays;
}

/**
 * 获取星期几
 * @returns {*}
 */
Date.prototype.dayOfWeek = function () {
    var dayNames = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
    return dayNames[this.getDay()];
}

/**
 * 获取本月最后一天
 */
Date.prototype.getMonthEndDate = function () {

    var d = this;
    d.setFullYear(this.getFullYear())
    d.setMonth(this.getMonth());
    d.setDate(this.getMonthDayCount());
    return d;
}

/**
 * 获取本月天数
 * @returns {number}
 */
Date.prototype.getMonthDayCount = function () {
    var d = this;
    d.setMonth(d.getMonth() + 1);
    d.setDate(0);
    return d.getDate();
}


/**
 * 日期字符串转Date 对象
 * @param dateStr 日期字符串
 * @param separator 分隔符
 * @returns {Date}
 */
Date.prototype.strToDate = function (dateStr, separator) {

    var year, month, day;

    if (separator == undefined) {
        separator = '-';
        var temp = dateStr.split(separator);
        year = temp[0];
        month = parseInt(temp[1]) - 1;
        day = parseInt(temp[2]);
    }

    if (separator == "") {
        year = dateStr.substring(0, 4);


        month = parseInt(dateStr.substring(4, 6)) - 1;
        day = parseInt(dateStr.substring(6, 8));
    }

    return new Date(year, month, day);
}


/**
 * 计算年龄
 * @param birthadyStr ex:yyyyMMdd
 * @returns {number}
 */
Date.prototype.countAge = function (birthadyStr) {

    var birthdayDate = this.strToDate(birthadyStr);

    return this.getFullYear() - birthdayDate.getFullYear();
}


/**
 * 时间戳转
 * @param time
 * @returns {Date}
 */
Date.prototype.timeToDate = function (time) {
    return new Date().setTime(time);
}


/**
 * 查看是否包含某元素
 * @param item
 * @returns {boolean}
 */
Array.prototype.has = function (item) {

    var i = this.length;
    while (i--) {
        if (this[i] === item) {
            return true;
        }
    }

    return false;

}

/**
 * 查找item 元素,没有返回-1.有1个或多个返回一个下标数组
 * @param item
 * @returns {*}下标
 */
Array.prototype.find = function (item) {
    var res = [];
    for (var i = 0; i < this.length; i++) {
        if (item === this[i]) {
            res.push(i);
        }
    }

    if (res.length == 0) {
        return -1;
    } else {
        return res;
    }

}


/**
 * 去掉数组中的重复元素
 * @returns {*[]} 去重后的新数组
 */
Array.prototype.unique = function () {
    this.sort(); //先排序
    var res = [this[0]];
    for (var i = 1; i < this.length; i++) {
        if (this[i] !== res[res.length - 1]) {
            res.push(this[i]);
        }
    }
    return res;
}

/**
 * 删除数组中的元素
 * @param item
 * @param {boolean} isAll 默认为false
 * @returns {*}
 */
Array.prototype.remove = function (item, isAll) {
    var isAll = (isAll == undefined) ? false : isAll;
    if (isAll) {
        var temp = this.unique();
        var index = temp.indexOf(item);
        if (index > -1) {
            temp.splice(index, 1);
        }
        return temp;
    }

    var index = this.indexOf(item);
    if (index > -1) {
        this.splice(index, 1);
    }

    return this;
}




function cacl(arr, callback) {
  var ret;
  for (var i=0; i<arr.length;i++) {
    ret = callback(arr[i], ret);
  }
  return ret;
}
 
Array.prototype.max = function () {
  return cacl(this, function (item, max) {
    if (!(max > item)) {
      return item;
    }
    else {
      return max;
    }
  });
};
Array.prototype.min = function () {
  return cacl(this, function (item, min) {
    if (!(min < item)) {
      return item;
    }
    else {
      return min;
    }
  });
};
Array.prototype.sum = function () {
  return cacl(this, function (item, sum) {
    if (typeof (sum) == 'undefined') {
      return item;
    }
    else {
      return sum += item;
    }
  });
};

Array.prototype.avg = function () {
  if (this.length == 0) {
    return 0;
  }
  return this.sum(this) / this.length;
};



/**
 * pointLength : 小数点位数
 * @returns
 */
//Number.prototype.toFixed=function(pointLength){
//	
//	if(pointLength == undefined || pointLength==null){
//		var pointLength=1;
//	}
//	
//	return this.toFixed(pointLength);
//	
//};






String.prototype.replaceAll  = function(s1,s2){     
    return this.replace(new RegExp(s1,"gm"),s2);     
}



function  Utils(){


}


Utils.prototype.getParams=function getParameter(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);

    if(r!=null){
        return  unescape(r[2]);
    }

    return null;
}

Utils.prototype.getAgeForIdCard=function(IdCard){

}

Utils.prototype.getBrithdayForIdCard=function(IdCard){

}

Utils.prototype.getSexForIdCard=function(IdCard){

}

Utils.prototype.initForm=function(form,data,obj){

}


Utils.prototype.encodeStr=function(s) {
    return escape(s).replace(/%(u[0-9A-F]{4})|(%[0-9A-F]{2})/gm, function($0, $1, $2) {
        return $1 && '\\' + $1.toLowerCase() || unescape($2);
    });
}

Utils.prototype.decodeStr=function(s) {=
    return unescape(s.replace(/\\(u[0-9a-fA-F]{4})/gm, '%$1'));
}







