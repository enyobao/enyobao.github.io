window.onload=function(){

	var oWrap=document.getElementById('wrap');
	var oMain=document.getElementById('main');
	var aMainList=getByClass(oMain,'main_list');
	var oContainer=oMain.parentNode;
	var oNav=document.getElementById('nav');
	var oHeader=oNav.parentNode;
	var aNavList=oNav.children[1].children;
	var oNavBlock=aNavList[aNavList.length-1];
	var oMask=oWrap.children[oWrap.children.length-1];
	var oMaskClose=oMask.children[1];
	var oDown=getByClass(oWrap,'down')[0];

	var oBlogBox=aMainList[aMainList.length-1].children[1];
	var oBlogUl=oBlogBox.getElementsByTagName('ul')[0];
	var aBlogLi=oBlogUl.children;
	var aBlogImg=oBlogUl.getElementsByTagName('img');
	var imgWidth=aBlogImg[0].offsetWidth;
	var imgHeight=aBlogImg[0].offsetHeight;
	var nBoxWidth=oBlogBox.offsetWidth/2;

	var arr=['#50a1f5','#f82d4e','#f1b81c','#8fc431'];
	var oParent=document;
	var bWheel=false;

	/*网页宽高随着页面的大小改变而改变*/
	resize();
	window.onresize=function(){
		resize();
	};
	function resize(){
		var clientX=document.documentElement.clientWidth;
		var clientY=document.documentElement.clientHeight;

		document.documentElement.style.fontSize=20*document.documentElement.clientWidth/320+'px';

		var width;
		var height;

		if(960<=clientX){
			width=clientX;
		}
		if(clientX<960){
			width=960;
		}
		if(650<=clientY){
			height=clientY;
		}
		if(clientY<650){
			height=650;
		}


		for(i=0;i<aMainList.length;i++){
			aMainList[i].style.width=width+'px';
			aMainList[i].style.height=height+'px';
		}
		oNav.style.width=width+'px';
		oContainer.style.width=width+'px';
		oContainer.style.height=height+'px';
	}

	//页面滚动页数
	var t=0;
	var iNavClick=0;
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

	function showDown(t){
		if(t>aMainList.length-2){
			oDown.style.display='none';
		}else{
			oDown.style.display='block';
		}
	}
	showDown(t);

	oDown.onclick=function(){
		t++;
		if(t==aMainList.length){
        	t=aMainList.length-1;
        }
		showDown(t);
		moveDiv(t);
	};

	//滚轮滚动
	function moveDiv(t){
		move(oMain,{top:-t*aMainList[0].offsetHeight},{duration:2000,complete:function(){
			bWheel=false;
		}});
		oWrap.style.background=arr[t];
		oHeader.style.background=arr[t];

		for(var j=0;j<aNavList.length-1;j++){
			removeClass(aNavList[j],'active');
		}
		addClass(aNavList[t],'active');
		elastic(oNavBlock,aNavList[t].offsetLeft);
		iNavClick=t;

		showDown(t);
	}
	addWheel(oContainer,function(bDown){
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
	});

	/*行业动态*/
	// var oNext=getByClass(oParent,'next')[0];
	// var oPrev=getByClass(oParent,'prev')[0];
	var oHomeBox=getByClass(oParent,'home_box')[0];
	var oHomeUl=oHomeBox.children[0];
	var homeTimer;
	var homeLeft=0;
	var w=0;


	oHomeUl.innerHTML+=oHomeUl.innerHTML;
	var aHomeLi=oHomeUl.children;
	for(var i=0;i<aHomeLi.length;i++){
		w+=aHomeLi[i].offsetWidth;
	}
	oHomeUl.style.width=w+'px';

	clearInterval(homeTimer);
	homeTimer=setInterval(function(){
		homeLeft-=2;
		oHomeUl.style.left=homeLeft+'px';
		if(homeLeft<=-oHomeUl.offsetWidth/2){
			homeLeft=0;
		}
	},30);

	/*博文展示－轮播图*/
	//初始化
	oBlogUl.style.width=aBlogLi[0].offsetWidth*(aBlogLi.length)+'px';
	oBlogUl.style.left=nBoxWidth-(2-0.5)*aBlogLi[0].offsetWidth+'px';
	setSize();

	dragImg();
	//拖拽
	function dragImg(){
		oBlogUl.onmousedown=function(ev){
			var oEvent=ev||event;

			var disX=oEvent.clientX-oBlogUl.offsetLeft;

			document.onmousemove=function(ev){
				var oEvent=ev||event;
				var left=oEvent.clientX-disX;

				if(left>=nBoxWidth-(1-0.5)*aBlogLi[0].offsetWidth){
					left=nBoxWidth-(1-0.5)*aBlogLi[0].offsetWidth;
				}
				if(left<=nBoxWidth-(aBlogLi.length-0.5)*aBlogLi[0].offsetWidth){
					left=nBoxWidth-(aBlogLi.length-0.5)*aBlogLi[0].offsetWidth;
				}
				oBlogUl.style.left=left+'px';

				setSize();
			}
			document.onmouseup=function(){
				document.onmousemove=null;
				document.onmouseup=null;
			}
			return false;
		};

	}
	//改变图片大小
	function setSize(){
		for(var i=0;i<aBlogLi.length;i++){
			//图片中心距离box中心点的距离
			var c=Math.abs(nBoxWidth-(aBlogLi[i].offsetLeft+aBlogLi[0].offsetWidth/2+oBlogUl.offsetLeft));
			//比例
			var scale=1-c/500;//感应数字
			if(scale<0.5){
				scale=0.5
			}
			var w=520;
			var h=358;
			aBlogImg[i].style.width=scale*w+'px';
			aBlogImg[i].style.marginLeft=-(scale*w-imgWidth)/2+'px';
			aBlogImg[i].style.marginTop=-(scale*h-imgHeight)/2+'px';
			aBlogLi[i].style.zIndex=scale*1000;
		}
	}

	/*吞吐图片－－作品展示页*/
	var oWorks=getByClass(oParent,'works')[0];
	var aWorksUl=oWorks.getElementsByTagName('ul');
	var oWorksOl=oWorks.getElementsByTagName('ol')[0];
	var oWorksDl=oWorks.getElementsByTagName('dl')[0];
	var oSwork=oWorks.children[2];
	var oFrame=oSwork.children[0];
	var aSlide=getByClass(oWorks,'slide');

	var aWorksLi=aWorksUl[0].children;
	var aWorksLi2=oWorksOl.getElementsByTagName('li');

	//一次可展示的数量
	var iShowNum=9;

	//布局
	var aPos=[];
	var aPos2=[];
	for(var i=0;i<iShowNum;i++){
		aPos.push({
			left:aWorksLi[i].offsetLeft,
			top:aWorksLi[i].offsetTop,
			width:aWorksLi[i].offsetWidth,
			height:aWorksLi[i].offsetHeight
		});
	}
	
	for(var i=0;i<aWorksLi2.length;i++){
		aPos2.push({
			left:aWorksLi2[i].offsetLeft,
			top:aWorksLi2[i].offsetTop
		});
	}

	//设置默认显示第一个ul
	addClass(aWorksUl[0],'active');
	addClass(aWorksUl[0],'pos');
	var oUlActive=getByClass(oWorks,'active')[0];
	var aLiActive=oUlActive.children;

	var iDlIndex=0;
	sWorks(oUlActive,aLiActive);
	
	//设置右边页数项－dl
	createDl(aLiActive.length);
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

	//点击换页事件－事件委托
	oWorksDl.onclick=function(ev){
		var oEvent=ev||event;
		var timer;

		var target=oEvent.elementSrc||oEvent.target;

		if(target.className!='active' && target.className!='next' && target.className!='prev'){
			var child=target.parentNode.children;
			for(var i=0;i<child.length;i++){
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
			var timer2=setInterval(function(){
				move(aLiActive[iNow2],{left:aPos[4].left,top:aPos[4].top,width:0,height:0,opacity:0},{complete:function(){
					if(iNow2==aLiActive.length-1){
						setTimeout(function(){

							var n=0;
							var timer3;
							timer3=setInterval(function(){
								move(aLiActive[iShowNum*iDlIndex+n],{left:aPos[n].left,top:aPos[n].top,width:aPos[n].width,height:aPos[n].height,opacity:1});

								n++;
								if(iShowNum*iDlIndex+n>aLiActive.length-1){
									clearInterval(timer3);
								}
								if(n>iShowNum-1){
									clearInterval(timer3);
								}
							},100);
						},500);
					}
				}});

				iNow2++;
				if(iNow2>aLiActive.length-1){
					clearInterval(timer2);
				}
			},100);

		}
	};
	

	//可视ul
	for(var i=0;i<iShowNum;i++){
		aLiActive[i].style.left=aPos[i].left+'px';
		aLiActive[i].style.top=aPos[i].top+'px';
		aLiActive[i].style.width=aPos[i].width+'px';
		aLiActive[i].style.height=aPos[i].height+'px';
		aLiActive[i].style.opacity=1;
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

	//选择(html,javascript,css选项，并展示相应作品)
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

				//console.log(oUlActive+','+aLiActive[0].children[1].children[0].innerHTML)
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
					if((iNow+iShowNum*iDlIndex>aLiActive.length-1) || (iNow==iShowNum)){
						clearInterval(timer);
					}
				},100);
			};
		})(i);
	}

	/*关于我*/
	//手机滚动－显示信息
	var oPhoneBox=getByClass(oParent,'me_up')[0];
	var oPhoneUlBox=oPhoneBox.children[1];
	var oPhoneUl=oPhoneUlBox.children[0];
	var aPhoneLi=oPhoneUl.children;

	var iPulHeight=0;
	var iPboxHeight=oPhoneUlBox.offsetHeight;
	var iPhoneTop=0;

	for(var i=0;i<aPhoneLi.length;i++){
		iPulHeight+=aPhoneLi[i].offsetHeight;
	}

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

	//关于我－右侧按钮
	var oMeRight=getByClass(oParent,'me_right')[0];
	var oMeP=oMeRight.getElementsByTagName('p')[0];
	var oMeA=oMeP.children[0];
	var oResume=getByClass(oParent,'resume')[0];
	var oResumeLeft=oResume.children[0];
	// var oResumeImg=oResumeLeft.children[0];
	//var oResumeScroll=oResumeLeft.children[1];
	//var oResumeScSpan=oResumeScroll.children[0];
	var oResumeRight=oResume.children[1];

	var iResumeTop=0;
	
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
	
	//滚动简历
	/*oResumeScSpan.onmousedown=function(ev){
		var oEvent=ev||event;
		var disY=oEvent.clientY-oResumeScSpan.offsetTop;
		document.onmousemove=function(ev){
			var oEvent=ev||event;
			iResumeTop=oEvent.clientY-disY;
			if(iResumeTop<0){
				iResumeTop=0;
			}
			if(iResumeTop>oResumeScroll.offsetHeight-oResumeScSpan.offsetHeight){
				iResumeTop=oResumeScroll.offsetHeight-oResumeScSpan.offsetHeight;
			}
			moveResume(iResumeTop);
		};
		document.onmouseup=function(){
			document.onmousemove=null;
			document.onmouseup=null;
		};
		return false;
	};

	function moveResume(iResumeTop){
		oResumeScSpan.style.top=iResumeTop+'px';
		//比例
		var scale=iResumeTop/(oResumeScroll.offsetHeight-oResumeScSpan.offsetHeight);
		var top=(oResumeImg.scrollHeight-oResumeLeft.offsetHeight)*scale;
		oResumeImg.scrollTop=-top+'px';
	}
	//调用addwheel函数，并且接受返回值bdown
	addWheel(oResumeLeft,function(bDown){
		//判断滚动方向
		 if(bDown){
            iResumeTop+=10;
            if(iResumeTop>=oResumeScroll.offsetHeight-oResumeScSpan.offsetHeight){
                iResumeTop=oResumeScroll.offsetHeight-oResumeScSpan.offsetHeight;
            }
        }else{
            iResumeTop-=10;
            if(iResumeTop<=0){
                iResumeTop=0;
            }
        }
		moveResume(iResumeTop);
	});*/
};

