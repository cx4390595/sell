export  function formatDate(date,fmt){
  if(/(y+)/.test(fmt)){
    //以y开头一个或者多个去匹配fmt
    /*
     *
     *  RegExp.$1代表第一个括号里面的字符串(y+),
     *
     * (date.getFullYear()+"").substr(4-RegExp.$1.length)
     * (date.getFullYear()+"")取到年开头的数字:  20+x+x或者19+x+x
     * substr（1）从去掉第一个 从第二个开始截取
     *.substr(4-RegExp.$1.length )去到年后面的数值(4-x.length)：xx+98 xx+18
     * 得出结果 2098 1918
     * */
    fmt = fmt.replace(RegExp.$1,(date.getFullYear()+"").substr(4-RegExp.$1.length));
  }

  let o = {
    "M+":date.getMonth()+1,
    "d+":date.getDate(),
    "h+":date.getHours(),
    "m+":date.getMinutes(),
    "s+":date.getSeconds()
  };
  for(let k in o){
    if(new RegExp(`(${k})`).test(fmt)){
      let str = o[k]+'';
      fmt = fmt.replace(RegExp.$1,(RegExp.$1.length===1)?str:padLeftZero(str))
    }
  }
  return fmt;
};
function padLeftZero(str) {
  return ("00"+str).substr(str.length)
}
