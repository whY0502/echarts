/**
 * Created by wx on 2017/1/4.
 */
/**
 * 数组去除重复元素
 * @param arr
 * @returns {Array}
 */
Array.prototype.unique = function () {
    var hash = {};
    var arr = [];
    for (var i = 0; i < this.length; i++) {
        if (!hash[this[i]]) {
            arr.push(this[i]);
            hash[this[i]] = 1;
        }
    }
    return arr;
};

/**
 * 格式化时间
 * @param format
 * @returns {string}
 */
Date.prototype.toLocaleString = function(format) {
    if(format === 'yyyy-MM-dd'){
        var month = this.getMonth() + 1;
        if(month<10){
            month = "0" + month;
        }
        var day = this.getDate();
        if(day<10){
            day = "0" + day;
        }
        return this.getFullYear() + "-" + month + "-" + day;
    }
};
