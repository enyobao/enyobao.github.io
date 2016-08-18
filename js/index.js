var oParent=document;
var oWrap=document.getElementById('wrap');
var oMain=document.getElementById('main');
var aMainList=getByClass(oMain,'main_list');
var oContainer=oMain.parentNode;
var oNav=document.getElementById('nav');
var oMenu=oNav.getElementsByTagName('div')[0];
var oHeader=oNav.parentNode;
var oNavUl=getByClass(oNav,'nav_list')[0];
var aNavList=oNavUl.children;
var oNavBlock=aNavList[aNavList.length-1];
var oMask=oWrap.children[oWrap.children.length-1];
var oMaskClose=oMask.children[1];
var oDown=getByClass(oWrap,'down')[0];

/*博客页*/
var oBlogBox=aMainList[aMainList.length-1].children[1];
var oBlogUl=oBlogBox.getElementsByTagName('ul')[0];
var aBlogLi=oBlogUl.children;
var aBlogImg=oBlogUl.getElementsByTagName('img');

/*行业动态*/
var oHomeBox=getByClass(oParent,'home_box')[0];
var oHomeUl=oHomeBox.children[0];
var homeLeft=0;
var w=0;
/*关于我*/
//手机滚动－显示信息
var oPhoneBox=getByClass(oParent,'me_up')[0];
var oPhoneUlBox=oPhoneBox.children[1];
var oPhoneUl=oPhoneUlBox.children[0];
var aPhoneLi=oPhoneUl.children;

var iPulHeight=0;
var iPboxHeight=oPhoneUlBox.offsetHeight;
var iPhoneTop=0;
//关于我－右侧按钮
var oMeRight=getByClass(oParent,'me_right')[0];
var oMeP=oMeRight.getElementsByTagName('p')[0];
var oMeA=oMeP.children[0];
var oResume=getByClass(oParent,'resume')[0];
var oResumeLeft=oResume.children[0];
var oResumeRight=oResume.children[1];

var iResumeTop=0;

/*吞吐图片－－作品展示页*/
var oWorks=getByClass(oParent,'works')[0];
var aWorksUl=oWorks.getElementsByTagName('ul');
var oWorksOl=oWorks.getElementsByTagName('ol')[0];
var oWorksDl=oWorks.getElementsByTagName('dl')[0];
var oWorkDiv=oWorksOl.parentNode;
var oSwork=oWorks.children[2];
var oFrame=oSwork.children[0];
var aSlide=getByClass(oWorks,'slide');
var workLeft=0;

//设置默认显示第一个ul
var oUlActive=getByClass(oWorks,'active')[0];
var aLiActive=oUlActive.children;


var aWorksLi=aWorksUl[0].children;
var aWorksLi2=oWorksOl.getElementsByTagName('li');


var iDlIndex=0;

var arr=['#50a1f5','#f82d4e','#f1b81c','#8fc431'];
var bWheel=false;
var bClick=false;
var iShowNum=9;//一次可展示的数量
var aPos=[];
var aPos2=[];
var arrH=[10,8,19,12];

var t=0;
var iNavClick=0;

window.onload=window.onresize=function(){

	/*网页宽高随着页面的大小改变而改变*/
	resize();
	/*window.onresize=function(){
		resize();
	};*/
	function resize(){
		var clientX=document.documentElement.clientWidth;
		var clientY=document.documentElement.clientHeight;

		var width;
		var height;

		if(clientX>800){
			width=clientX;
			if(clientY>600){
				height=clientY;
			}
			if(clientY<600){
				height=600;
			}
			big(width,height);
		}else{
			change(clientX);
		}
		// 共同的函数
		dynamics(oHomeUl,homeLeft);//首页－行业动态
		aboutMe();//关于我
		blog();//博文展示
	}
	//手机端函数
	function change(width){
		document.documentElement.style.fontSize=20*document.documentElement.clientWidth/320+'px';
		for(i=0;i<aMainList.length;i++){
			aMainList[i].style.width=width+'px';
			aMainList[i].style.height=arrH[i]+'rem';
		}
		oNav.style.width=width+'px';
		oContainer.style.width=width+'px';
		oContainer.style.height='49rem';

		menu();//菜单－导航项
		phoneWork();//展示作品－手机端
		meClick2();//关于我－右侧按钮
	}
	//pc端函数
	function big(width,height){
		for(i=0;i<aMainList.length;i++){
			aMainList[i].style.width=width+'px';
			aMainList[i].style.height=height+'px';
		}
		oNav.style.width=width+'px';
		oContainer.style.width=width+'px';
		oContainer.style.height=height+'px';

		aPos=gPos().aPos;
		aPos2=gPos().aPos2;
		var wDivWidth=aPos[iShowNum-1].top+aPos[iShowNum-1].height*3/2;
		oWorkDiv.style.height=wDivWidth+'px';

		navClick();//换标签
		showWorks();//作品展示
		changeLabel();//选择标签－展示相应作品
		meClick();//关于我－右侧按钮
	}
	function gPos(){
		var aPos=[];
		var aPos2=[];

		//作品－布局
		for(var i=0;i<iShowNum;i++){
			aPos.push({
				left:aLiActive[i].offsetLeft,
				top:aLiActive[i].offsetTop,
				width:aLiActive[i].offsetWidth,
				height:aLiActive[i].offsetHeight
			});
		}
		
		for(var i=0;i<aWorksLi2.length;i++){
			aPos2.push({
				left:aWorksLi2[i].offsetLeft,
				top:aWorksLi2[i].offsetTop
			});
		}
		return {aPos:aPos,aPos2:aPos2};
	}
};
function navClick(){
	//页面滚动页数
	/*导航栏*/
	for(var i=0;i<aNavList.length-1;i++){
		(function(index){
			aNavList[i].onclick=function(){
				moveDiv(index);
				t=index;
				iNavClick=index;

				for(var j=0;j<aNavList.length-1;j++){
					removeClass(aNavList[j],'active');
				}
				addClass(this,'active');
				elastic(oNavBlock,this.offsetLeft);
			}
			aNavList[i].onmouseenter=function(){
				elastic(oNavBlock,this.offsetLeft);
			}
			aNavList[i].onmouseleave=function(){
				elastic(oNavBlock,aNavList[iNavClick].offsetLeft);
			}
		})(i);	
	}

	showDown(t);

	addWheel(oContainer,fnWheel);
}
function fnWheel(bDown){
	if(bWheel) return ;
	bWheel=true;
	//判断滚动方向
	if(bDown){
        t++;
        if(t==aMainList.length){
        	t=aMainList.length-1;
        }
    }else{
        t--;
        if(t==-1){
            t=0;
        }
    }
	moveDiv(t);

    oContainer.cancelBubble=true;
}
function showDown(t){
	if(t>aMainList.length-2){
		oDown.style.display='none';
	}else{
		oDown.style.display='block';
	}
	oDown.onclick=function(){
		t++;
		if(t==aMainList.length){
        	t=aMainList.length-1;
        }
		showDown(t);
		moveDiv(t);
	};
}
//滚轮滚动
function moveDiv(t){
	var top=0;
	for(var i=0;i<t;i++){
		top+=aMainList[i].offsetHeight;
	}
	move(oMain,{top:-top},{duration:2000,complete:function(){
		bWheel=false;
	}});
	oWrap.style.background=arr[t];
	oHeader.style.background=arr[t];
	oNavUl.style.background=arr[t];

	for(var j=0;j<aNavList.length-1;j++){
		removeClass(aNavList[j],'active');
	}
	addClass(aNavList[t],'active');
	elastic(oNavBlock,aNavList[t].offsetLeft);
	iNavClick=t;

	showDown(t);
}

//菜单-手机端
function menu(){
	oMenu.onclick=function(){
		if(bClick){
			oNavUl.style.display='none';
		}else{
			oNavUl.style.display='block';
		}
		bClick=!bClick;
		navClick();
	}
	oNavUl.onclick=function(){
		oNavUl.style.display='none';
		bClick=false;
	}
}

/*行业动态*/
function dynamics(obj,left){
	obj.innerHTML+=obj.innerHTML;
	var aHomeLi=obj.children;
	var w=0;
	for(var i=0;i<aHomeLi.length;i++){
		w+=aHomeLi[i].offsetWidth+(aHomeLi[1].offsetLeft-aHomeLi[0].offsetWidth);
	}
	obj.style.width=w+'px';

	hTimer();
	function hTimer(){
		clearInterval(obj.homeTimer);
		obj.homeTimer=setInterval(function(){
			left-=1;
			obj.style.left=left+'px';
			if(left<=-obj.offsetWidth/2){
				left=0;
			}
		},30);
	}
	obj.onmouseenter=function(){
		clearInterval(obj.homeTimer);
	};
	obj.onmouseleave=function(){
		hTimer();
	};
}

/*作品展示页*/
function showWorks(){
	sWorks(oUlActive,aLiActive);
	
	//设置右边页数项－dl
	createDl(aLiActive.length);
	//点击换页事件－事件委托
	oWorksDl.onclick=function(ev){
		var oEvent=ev||event;
		var timer;

		var target=oEvent.elementSrc||oEvent.target;

		if(target.className!='active' && target.className!='next' && target.className!='prev'){
			//var child=target.parentNode.children;
			var child=oWorksDl.children;
			for(var i=1;i<child.length-1;i++){
				if(hasClass(child[i],'active')){
					var oldIndex=i-1;
					removeClass(child[i],'active');
					break;
				}
			}
			target.className='active';

			//改页
			iDlIndex=target.innerHTML-1;

			var iNow2=0;
			var iNum=0;
			var timer2=setInterval(function(){
				move(aLiActive[iNow2],{left:aPos[4].left,top:aPos[4].top,width:0,height:0,opacity:0},{complete:function(){
					iNum++;
					if(iNow2==aLiActive.length-1){
						setTimeout(function(){

							var n=0;
							var timer3;
							timer3=setInterval(function(){
								move(aLiActive[iShowNum*iDlIndex+n],{left:aPos[n].left,top:aPos[n].top,width:aPos[n].width,height:aPos[n].height,opacity:1});

								n++;
								if((iShowNum*iDlIndex+n>aLiActive.length-1)||(n>iShowNum-1)){
									clearInterval(timer3);
								}
							},100);
						},500);
					}
				}});

				iNow2++;
				if((iNow2>aLiActive.length-1)||(iNum==iShowNum)){
					clearInterval(timer2);
				}
			},100);

		}
	};
}
function createDl(length){
	oWorksDl.innerHTML='';
	var iDlHeight=0;
	var iDl=Math.floor(length/iShowNum)+2;
	if(iDl>2 && length%iShowNum>0){
		for(var i=0;i<iDl+1;i++){
			var oDd=document.createElement('dd');
			oDd.innerHTML=i;
			if(i==0){
				oDd.innerHTML='👆';
				oDd.className='prev';
			}
			if(i==iDl){
				oDd.innerHTML='👇';
				oDd.className='next';
			}
			if(i==1){
				oDd.className='active';
			}

			oWorksDl.appendChild(oDd);
			iDlHeight+=oDd.offsetHeight;
			iDlIndex=0;
		}
		oWorksDl.style.marginTop=-iDlHeight/2+'px';
	}
}
//点击作品－作品展示
function sWorks(oUl,aLi){

	for(var i=0;i<aLi.length;i++){
		aLi[i].onclick=function(){
			bWheel=true;
			oMask.style.display='block';
			oSwork.style.display='block';
			oFrame.src=this.children[0].getAttribute('_href');

			oMaskClose.onclick=function(){
				oMask.style.display='none';
				oSwork.style.display='none';
				bWheel=false;
			};
		};
		aLi[i].onmouseenter=function(){
			var oSlide=this.children[1];
			move(oSlide,{height:70});
		};
		aLi[i].onmouseleave=function(){
			var oSlide=this.children[1];
			move(oSlide,{height:0});
		};
	}
}
function sWorks2(oUl,aLi){

	for(var i=0;i<aLi.length;i++){
		aLi[i].onclick=function(){
			var oA=this.children[0];
			bWheel=true;
			window.open(oA.getAttribute('_href'));
		};
	}
}
function phoneWork(){
	dynamics(oUlActive,workLeft);
	oUlActive.style.width=aLiActive[0].offsetWidth*aLiActive.length*15/12+'px';
	sWorks2(oUlActive,aLiActive);
	//选择(html,javascript,css选项，并展示相应作品)
	for(var i=0;i<aWorksLi2.length;i++){
		
		(function(index){
			aWorksLi2[i].onclick=function(){
				//bFlag限制连续点击
				for(var j=0;j<aWorksLi2.length;j++){
					removeClass(aWorksLi2[j],'on');
					removeClass(aWorksUl[j],'active');
				}
				addClass(this,'on');
				addClass(aWorksUl[index],'active');

				oUlActive=getByClass(oWorks,'active')[0];
				aLiActive=oUlActive.children;

				dynamics(oUlActive,workLeft);

				oUlActive.style.width=aLiActive[0].offsetWidth*aLiActive.length*15/12+'px';

				sWorks2(oUlActive,aLiActive);
			};
		})(i);
	}
}

//选择(html,javascript,css选项，并展示相应作品)
function changeLabel(){
	var timer;
	var bFlag=false;
	for(var i=0;i<aWorksLi2.length;i++){
		(function(index){
			aWorksLi2[i].onclick=function(){
				//bFlag限制连续点击
				if(bFlag==true)return ;
				bFlag=true;
				var iNow=0;
				var iNum=0;

				oWorksDl.innerHTML='';

				timer=setInterval(function(){
					(function(iNow,length){
						//吞走当前显示的ul
						move(aLiActive[iNow],{left:aPos2[index].left,top:aPos2[index].top,width:0,height:0,opacity:0},{complete:function(){
							
							iNum++;
							removeClass(oUlActive,'active');
							addClass(aWorksUl[index],'active');
							addClass(aWorksUl[index],'pos');

							oUlActive=aWorksUl[index];
							aLiActive=oUlActive.children;

							sWorks(oUlActive,aLiActive);

							for(var j=0;j<iShowNum;j++){

								aLiActive[j].style.left=aPos2[index].left+'px';
								aLiActive[j].style.top=aPos2[index].top+'px';
							}

							if((iNow==length) || (iNum==iShowNum)){
								iNow=iShowNum-1;
								timer=setInterval(function(){
									//显示与被电击按钮相对应的ul
									move(aLiActive[iNow],{left:aPos[iNow].left,top:aPos[iNow].top,width:aPos[iNow].width,height:aPos[iNow].height,opacity:1});
									iNow--;
									if(iNow==-1){
										clearInterval(timer);
										setTimeout(function(){
											bFlag=false;
										},500);
										createDl(aLiActive.length);
										for(var i=iShowNum;i<aLiActive.length;i++){
											aLiActive[i].style.left=aPos[4].left+'px';
											aLiActive[i].style.top=aPos[4].top+'px';
											aLiActive[i].style.width=0+'px';
											aLiActive[i].style.height=0+'px';
											aLiActive[i].style.opacity=0;
										}
									}
								},100);
							}
						}});
					})(iNow+iShowNum*iDlIndex,aLiActive.length-1);
					
					iNow++;
					if((iNow==iShowNum)|| (iNow+iShowNum*iDlIndex>aLiActive.length-1)){
						clearInterval(timer);
					}
				},100);
			};
		})(i);
	}
}

/*关于我*/
function aboutMe(){
		for(var i=0;i<aPhoneLi.length;i++){
		iPulHeight+=aPhoneLi[i].offsetHeight;
	}
	//手机滚动－显示信息
	addWheel(oPhoneBox,function(bDown){
		//判断滚动方向
		if(bDown){
			iPhoneTop=oPhoneUl.offsetTop-10;
        }else{
            iPhoneTop=oPhoneUl.offsetTop+10;
        }

        if(iPhoneTop<iPboxHeight-iPulHeight){
        	iPhoneTop=iPboxHeight-iPulHeight;
        }
        if(iPhoneTop>0){
        	iPhoneTop=0;
        }

        oPhoneUl.style.top=iPhoneTop+'px';
	});
}
function meClick(){
	//关于我－右侧按钮
	oMeA.onclick=function(ev){
		var oEvent=ev||event;

		oEvent.cancelBubble=true;
	}
	oMeP.onclick=function(){
		oMask.style.display='block';
		oResume.style.display='block';
		bWheel=true;

		oMaskClose.onclick=function(){
			oMask.style.display='none';
			oResume.style.display='none';
			bWheel=false;
		};
	};
}
function meClick2(){
	//关于我－右侧按钮
	oMeA.onclick=function(ev){
		var oEvent=ev||event;

		oEvent.cancelBubble=true;
	}
	oMeP.onclick=function(){
		window.open('resume.html');
	};
}
/*博文展示*/
function blog(){
	var oUl=document.getElementById('ul1');
	var aLi=oUl.children;
	var oLeft=document.getElementsByTagName('input')[0];
	var oRight=document.getElementsByTagName('input')[1];
	var arr=[];

	for(var i=0;i<aLi.length;i++){
		arr.push(aLi[i].className);
	}

	oLeft.onclick=function(){
		arr.unshift(arr.pop());
		for(var i=0;i<aLi.length;i++){
			aLi[i].className=arr[i];
		}
	}
	oRight.onclick=function(){
		arr.push(arr.shift());
		for(var i=0;i<aLi.length;i++){
			aLi[i].className=arr[i];
		}
	}
}