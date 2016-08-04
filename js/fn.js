/*通过class获取元素*/
function getByClass(oParent,sClass){
	if(oParent.getElementsByClassName){
		return oParent.getElementsByClassName(sClass);
	}else{
		var reg=new RegExp('\\b'+sClass+'\\b');
		var arr=[];
		var aEle=oParent.getElementsByTagName('*');
		for(var i=0;i<aEle.length;i++){
			if(reg.test(aEle[i].className)){
				arr.push(aEle[i]);
			}
		}
		return arr;
	}
}
//判断有没有该class
function hasClass(obj,sClass){
	var reg=new RegExp('\\b'+sClass+'\\b');
	return reg.test(obj.className);
}
//添加class
function addClass(obj,sClass){
	if(obj.className){
		if(!hasClass(obj,sClass)){
			obj.className+=' '+sClass;
		}
	}else{
		obj.className=sClass;
	}
}
//删除class
function removeClass(obj,sClass){
	var reg=new RegExp('\\b'+sClass+'\\b','g');
	if(hasClass(obj,sClass)){
		obj.className=obj.className.replace(reg,'').replace(/^\s+|\s+$/g,'').replace(/\s+/g,' ');
	}
}

/*运动函数*/
function getStyle(obj,name){
	return (obj.currentStyle||getComputedStyle(obj,false))[name];
}

function move(obj,json,options){
	//默认值
	var options=options||{};
	options.duration=options.duration||1000;
	options.easing=options.easing||'ease-out';

	//初始值
	var start={};//起始点
	var dis={};//运动距离
	//获取参数
	for(name in json){
		start[name]=parseFloat(getStyle(obj,name));
		dis[name]=json[name]-start[name];
	}

	var count=Math.floor(options.duration/30);//总步数＝总时间／走每一步需要用的时间
	var n=0;//计步器

	clearInterval(obj.timer);//清空计时器
	obj.timer=setInterval(function(){
		n++;

		for(name in json){
			// var a=n/count;//当前运动到哪个点的比例
			// var cur=start[name]+dis[name]*a;//当前运动的距离＋起始值

			/*运动形式*/
			switch(options.easing){
				case 'linear'://匀速
					var a=n/count;
					var cur=start[name]+dis[name]*a;
					break;
				case 'ease-in'://加速
					var a=n/count;
					var cur=start[name]+dis[name]*a*a*a;
					break;
				case 'ease-out'://减速
					var a=1-n/count;
					var cur=start[name]+dis[name]*(1-a*a*a);
					break;
			}

			if(name=='opacity'){
				obj.style.opacity=cur;
				obj.style.filter='alpha(opacity='+cur*100+')';
			}else{
				obj.style[name]=cur+'px';
			}
		}

		if(count==n){
			clearInterval(obj.timer);
			//回调函数
			options.complete && options.complete();
		}

	} ,30)
}
/*弹性运动*/
(function(window){
	var left=0;
	var iSpeed=0;
	var timer;
	window.elastic=function(obj,iTarget){
		clearInterval(timer);
		timer=setInterval(function(){
			iSpeed+=(iTarget-left)/5;
			iSpeed*=0.7;
			left+=iSpeed;

			obj.style.left=left+'px';

			if(Math.abs(iSpeed)<1 && Math.round(left)==iTarget){
				clearInterval(timer);
			}
		},30);
	}
})(window);

/*滚轮滚动*/
function addEvent(obj,sEv,fn){
	if(obj.addEventListener){
		//高级浏览器
		obj.addEventListener(sEv,fn,false);
	}else{
		//IE
		obj.attachEvent('on'+sEv,fn);
	}
}
function addWheel(obj,fn){
	function wheel(ev){
		var oEvent=ev||event;
		var bDown=true;//true时为向下
		//判断滚动方向
		if(oEvent.wheelDelta){
			if(oEvent.wheelDelta>0){
				//向上
				bDown=false;
			}
			else{
				//向下
				bDown=true;
			}
		}else{
			if(oEvent.detail<0){
				bDown=false;
			}else{
				bDown=true;
			}
		}
		//调用传递进来的函数fn，并给其返回一个值为bdown
		fn && fn(bDown);
		//阻止冒泡
		oEvent.cancelBubble=true;
		//阻止默认事件
		oEvent.preventDefault && oEvent.preventDefault();
		return false;
	}
	//dom事件绑定
	if(navigator.userAgent.toLowerCase().indexOf('firefox')!=-1){
		//firefox
		obj.addEventListener('DOMMouseScroll',wheel,false);
	}else{
		//other
		addEvent(obj,'mousewheel',wheel);
	}
}
//拖拽
function drag(obj){
	var iParentWidth=obj.parentNode.offsetWidth;

	obj.onmousedown=function(ev){
		var oEvent=ev||event;
		var downX=oEvent.clientX-obj.offsetLeft;
	
		document.onmousemove=function(ev){
			var oEvent=ev||event;
			var left=oEvent.clientX-downX;

			if(left>0){
				left=0;
			}
			if(left<-(obj.offsetWidth-iParentWidth)){
				left=-(obj.offsetWidth-iParentWidth);
			}

			obj.style.left=left+'px';
		};
		document.onmouseup=function(){
			document.onmousemove=null;
			document.onmouseup=null;
		};
		return false;
		oEvent.preventDefault && oEvent.preventDefault();
	};
}