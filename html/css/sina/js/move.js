function getStyle(obj,name){
	return (obj.currentStyle||getComputedStyle(obj,false))[name];
}
function move(obj,json,duration,complete){
	//接收参数
	var start={};//起始值
	var dis={};//运动距离
	for(name in json){
		//起始值
		start[name]=parseFloat(getStyle(obj,name));
		//运动距离
		dis[name]=json[name]-start[name];//终点＝json[name]
	}

	var count=Math.floor(duration/30);//运动步数
	var n=0//计步器

	//清空计时器
	clearInterval(obj.timer);
	//开启计时器
	obj.timer=setInterval(function(){
		n++;
		//赋值
		//判断json的name是否时opacity，因为opacity的赋值方式与其它属性不同
		for(name in json){
			var a=n/count;//比例
			var cur=start[name]+dis[name]*a;//移动距离＝dis[name]*a；
			if(name=='opacity'){
				obj.style.opacity=cur;
				obj.style.filter='alpha(opacity:'+(cur*100)+')';
			}else{
				obj.style[name]=cur+'px';
			}
		}
		//判断是否到大终点
		if(n==count){
			clearInterval(obj.timer);
			//判断是否有对调函数，如果有－执行
			complete && complete();
		}

	},30);
}