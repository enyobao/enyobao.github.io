function getPos(obj){
	var l=0;
	var t=0;
	while(obj){
		l+=obj.offsetLeft;
		t+=obj.offsetTop;
		obj=obj.offsetParent;
	}
	return { left : l , top : t };
}
window.onload=function(){
	//获取元素
	var oHead=document.getElementById('head');
	var oHead2=document.getElementById('head2');
	var oLeft=document.getElementById('left');
	var oFri=document.getElementById('friend');
	var oLeft2=oLeft.nextElementSibling||oLeft.nextSibling;
	var oFri2=oFri.previousElementSibling||oFri.previousSibling;
	var oRight=document.getElementById('right');
	var oPrev=document.getElementById('prev');

	var oldL=getPos(oLeft).left;
	var oldT=getPos(oLeft).top;
	var oldFL=getPos(oFri).left;

	//调用背景函数
	book();
	pos();
	hotNews();
	skin();
	sendWeibo();
	newWeibo();

	//head定位
	window.onscroll=function(){
		var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
		//导航栏
		if(scrollTop>=0){
			oHead.style.position='fixed';
			oHead.style.top=0;
			oHead.style.left='50%';
			oHead.style.marginLeft=-oHead.offsetWidth/2+'px';
			oHead2.style.display='block';
		}else{
			oHead.style.position='';
			oHead.style.marginLeft=0;
			oHead2.style.display='none';
		}
		//左侧栏
		if(scrollTop>=oldT-oHead.offsetHeight){
			oLeft.style.position='fixed';
			oLeft.style.top='50px';
			oLeft.style.left=oldL+'px';
			oLeft2.style.display='block';
		}else{
			oLeft.style.position='relative';
			oLeft.style.left=0;
			oLeft.style.top=0;
			oLeft2.style.display='none';
		}
		//右侧会员栏
		if(scrollTop>=oRight.offsetHeight){
			oFri.style.position='fixed';
			oFri.style.top='50px';
			oFri.style.left=oldFL+'px';
			oFri2.style.display='block';
		}else{
			oFri.style.position='';
			oFri.style.top=0;
			oFri.style.left=0;
			oFri2.style.display='none';
		}
		//返回顶部
		if(scrollTop>=100){
			oPrev.style.display='block';
		}else{
			oPrev.style.display='none';
		}

	}
	var timer;
	oPrev.onclick=function(){
		var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;

		var start=scrollTop;
		var dis=0-start;
		var count=Math.floor(1000/30);
		var n=0;

		clearInterval(timer);
		timer=setInterval(function(){
			n++;
			var a=n/count;
			var cur=start+dis*a;
			document.documentElement.scrollTop=document.body.scrollTop=cur;

			if(n==count){
				clearInterval(timer);
			}
		},30);
	}

}