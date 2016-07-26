function sendWeibo(){
	//获取元素
	var oSendBoxCon=document.getElementById('send_box_con');
	var oSend_show=document.getElementById('send_show');
	var aLi=oSend_show.children;
	var ok=true;

	//移入
	oSendBoxCon.onmouseenter=function(){
		oSendBoxCon.style.color='#ec7350';
		//点击－－弹出/隐藏
		oSendBoxCon.onclick=function(){
			if(ok){
				oSend_show.style.display='block';
				oSendBoxCon.onmouseleave=null;
			}else{
				oSend_show.style.display='none';
				oSendBoxCon.onmouseleave=function(){
					oSendBoxCon.style.color='#000';
				}
			}
			ok=!ok;
		}
	}
	//划入
	for(var i=0;i<aLi.length;i++){
		aLi[i].onmouseenter=function(){
			for(var j=0;j<aLi.length;j++){
				aLi[j].children[0].style.color='#000';
			}
			this.children[0].style.color='#ec7350';
		}
		aLi[i].onmouseleave=function(){
			this.children[0].style.color='#000';
		}
		aLi[i].onclick=function(){
			oSendBoxCon.innerHTML=this.children[0].innerHTML+'<img src="img/down.jpg" class="send_box_img">';
			oSendBoxCon.style.color='#000';
			oSend_show.style.display='none';
			ok=true;
		}
	}
}
//创建li
function createLi(){
	var oLi=document.createElement('li');
	oLi.className='clearfix';
	var a='<div class="weibo_bottom"><a href="javascript:;" class="fl">转发</a><a href="javascript:;" class="fl">评论</a><a href="javascript:;" class="fl">赞</a></div>';
	oLi.innerHTML='<div class="weibo_top clearfix"></div>'+a;
	oLi.children[0].innerHTML='<div class="portrait fl"><div></div></div><div class="weibo_content fl"></div>';
	var oDiv=oLi.children[0].children[1];
	oDiv.innerHTML='<h4></h4><p></p><p class="weibo_con"></p><div class="weibo_pos clearfix"></div>';
	oDiv.children[oDiv.children.length-1].innerHTML='<input type="button" id="weibo_btn" class="weibo_btn fl" value="关注"><img src="img/add.jpg" class="add"><img src="img/down2.jpg" class="down2 fl">';

	return oLi;
}
//查重
function findInArr(n,arr){
	for(var i=0;i<arr.length;i++){
		if(arr[i]==n){
			return true;
		}
	}
	return false;
}
//获取class
function getByClass(oParent,sClass){
	var aEle=oParent.getElementsByTagName('*');
	var arr2=[];
	for(var i=0;i<aEle.length;i++){
		if(aEle[i].className){
			var arr=aEle[i].className.split(' ');
			if(findInArr(sClass,arr)){
				arr2.push(aEle[i]);
			}
		}
	}
	return arr2;
}
//微博输入框
function newWeibo(){
	var oText=document.getElementById('new_text');
	var oDiv1=document.getElementById('hot_weibo');
	var oDiv2=oDiv1.nextElementSibling||oDiv1.nextSibling;
	var oBtn=document.getElementById('send_btn')
	var oUl=document.getElementById('weibo_ul');
	var num=140;

	var json={
		"head":[
				"825f228ajw1f1nh6ckrh8j20640640so.jpg",
				"5cd8f08bjw1e8qgp5bmzyj2050050aa8.jpg",
				"8e935c89jw8eoylv1lrysj20u00u03zz.jpg",
				"825f228ajw1f1nh6ckrh8j20640640so.jpg",
				"5cd8f08bjw1e8qgp5bmzyj2050050aa8.jpg",
				"8e935c89jw8eoylv1lrysj20u00u03zz.jpg",
				"825f228ajw1f1nh6ckrh8j20640640so.jpg",
				"5cd8f08bjw1e8qgp5bmzyj2050050aa8.jpg",
				"8e935c89jw8eoylv1lrysj20u00u03zz.jpg",
				"825f228ajw1f1nh6ckrh8j20640640so.jpg",
				"5cd8f08bjw1e8qgp5bmzyj2050050aa8.jpg",
				"8e935c89jw8eoylv1lrysj20u00u03zz.jpg"
		],
		"username":[
				"1这个微博是个逗比",
				"2阿里巴巴",
				"3哈利",
				"4波特",
				"5皮特",
				"6一拉",
				"1这个微博是个逗比",
				"2阿里巴巴",
				"3哈利",
				"4波特",
				"5皮特",
				"6一拉"

		],
		"from":[
				"6月1日 来自秒拍网页版",
				"6月2日 来自秒拍网页版",
				"6月3日 来自秒拍网页版",
				"6月4日 来自秒拍网页版",
				"6月5日 来自秒拍网页版",
				"6月6日 来自秒拍网页版",
				"6月7日 来自秒拍网页版",
				"6月8日 来自秒拍网页版",
				"6月9日 来自秒拍网页版",
				"6月10日 来自秒拍网页版",
				"6月11日 来自秒拍网页版",
				"6月12日 来自秒拍网页版"
		],
		"content":[
				"1相亲遇到这样的男生，分分钟就要崩溃了。。。。套路太深",
				"2相亲遇到这样的男生，分分钟就要崩溃了。。。。套路太深",
				"3相亲遇到这样的男生，分分钟就要崩溃了。。。。套路太深",
				"4相亲遇到这样的男生，分分钟就要崩溃了。。。。套路太深",
				"5相亲遇到这样的男生，分分钟就要崩溃了。。。。套路太深",
				"6相亲遇到这样的男生，分分钟就要崩溃了。。。。套路太深",
				"1相亲遇到这样的男生，分分钟就要崩溃了。。。。套路太深",
				"2相亲遇到这样的男生，分分钟就要崩溃了。。。。套路太深",
				"3相亲遇到这样的男生，分分钟就要崩溃了。。。。套路太深",
				"4相亲遇到这样的男生，分分钟就要崩溃了。。。。套路太深",
				"5相亲遇到这样的男生，分分钟就要崩溃了。。。。套路太深",
				"6相亲遇到这样的男生，分分钟就要崩溃了。。。。套路太深"
		],
		"img":[
				"736f0c7ejw1f4i60xdf9hj20hs0b8wfc.jpg",
				"",
				"",
				"736f0c7ejw1f4gz4s41dij20hs0a0dgn.jpg",
				"736f0c7ejw1f3zvb96oq7j20nk0dc403.jpg",
				"736f0c7ejw1f3oc6uuj9lj20no0dcq4z.jpg",
				"736f0c7ejw1f3ki3vbhomj20no0dc3zm.jpg",
				"736f0c7ejw1f1jt6j0a3ej20e808075c.jpg",
				"736f0c7ejw1f3zvb96oq7j20nk0dc403.jpg",
				"736f0c7ejw1f3oc6uuj9lj20no0dcq4z.jpg",
				"736f0c7ejw1f3ki3vbhomj20no0dc3zm.jpg",
				"736f0c7ejw1f1jt6j0a3ej20e808075c.jpg"
		]
	}
	var usermessage={
		"head":"head.jpg",
		"username":"拉德纳",
		"from":"来自iphone 6s"
	};
	//输入文字，光标获取
	oText.onfocus=function(){
		oDiv1.style.display='none';
		oDiv2.style.display='block';
		oText.oninput=oText.onpropertychange=function(){
			oDiv2.children[0].children[0].innerHTML=num-oText.value.length;
		}
	}

	function tBlur(){
		if(oText.value.length==0){
			oDiv2.style.display='none';
			oDiv1.style.display='block';
		}
	}

	oText.onblur=tBlur;

	//创建li
	for(var j=0;j<json.username.length;j++){
		var oLi=createLi();
		var oDiv=getByClass(oLi,'weibo_content')[0];
		var oPor=getByClass(oLi,'portrait')[0];

		if(json.img[j]){
			var oImg=document.createElement('img');
			oImg.src='img/'+json.img[j];
			oDiv.insertBefore(oImg,oDiv.children[oDiv.children.length-1]);
		}

		oDiv.children[0].innerHTML=json.username[j];
		oDiv.children[1].innerHTML=json.from[j];
		oDiv.children[2].innerHTML=json.content[j];
		oPor.children[0].style.background='url(img/'+json.head[j]+')';

		oUl.insertBefore(oLi,oUl.children[0]);
	}

	//发布
	oBtn.onclick=function(){
		var oLi=createLi();
		var oDiv=getByClass(oLi,'weibo_content')[0];
		var oPor=getByClass(oLi,'portrait')[0];

		//获取事件对象
		var oDate=new Date();
		var M=oDate.getMonth()+1;
		var D=oDate.getDate();

		oDiv.children[0].innerHTML=usermessage.username;
		oDiv.children[1].innerHTML=M+'月'+D+'日&nbsp;'+usermessage.from;
		oDiv.children[2].innerHTML=oText.value;
		oPor.children[0].style.background='url(img/'+usermessage.head+')';
		oUl.insertBefore(oLi,oUl.children[0]);
		oText.value='';
		tBlur();
	}

}


























