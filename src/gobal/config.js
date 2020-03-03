
/**
 * Created by zhanghuasheng on 2017/4/13.
 */
let wallet = {
    formatDateTime(timeStamp) {
        let date = new Date(timeStamp);
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let minute = date.getMinutes();
        let second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
    },
    amount(sum){
        return (sum*0.00000001).toFixed(2);
    },
    timeDiff(date){
        let date1=new Date(date);
        let date2=new Date();
        let date3=((date1.getTime()-date2.getTime())/1000).toFixed(0);
        return date3;
    }
}
export default {
    wallet
}
