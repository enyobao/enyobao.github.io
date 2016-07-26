//好书榜函数
function book(){
	var oBook=document.getElementById('book');
	var oUl=oBook.children[1];
	var json1={
		"bookName":[
			"我喜欢这个功利…",
			"穿越人海拥抱你",
			"全世界只有你"
		],
		"author":[
			"苑子文",
			"苑子豪",
			"苑子法"
		],
		"price":[
			"123242分",
			"524242分",
			"933242分"
		],
		"img":[
			"img/100x150x75x0_003.jpg",
			"img/100x150x75x0_002.jpg",
			"img/100x150x75x0.jpg"
		]
	};
	for(var i=0;i<3;i++){
		var oLi=document.createElement('li');
		var oA=document.createElement('a');
		var oDiv=document.createElement('div');
		oUl.appendChild(oLi);
		oA.href='javascript:;';
		oA.innerHTML='<span>'+(i+1)+'</span>'+json1.bookName[i];
		var a='<span>'+(i+1)+'</span>'+json1.bookName[i];
		oLi.appendChild(oA);
		oDiv.className='book_show clearfix';
		oDiv.innerHTML='<img src="'+json1.img[i]+'" class="fl"/><div class="fl"><a href="javascript:;">'+a+'<p>'+json1.author[i]+'</p><p class="p_num">'+json1.price[0]+'</p></div>';
		oLi.appendChild(oDiv);
	}
	var aLi=oUl.children;
	aLi[0].children[1].style.display='block';
	aLi[0].children[0].style.display='none';
	for(var j=0;j<aLi.length;j++){
		aLi[j].onmouseenter=function(){
			for(var i=0;i<aLi.length;i++){
				aLi[i].children[0].style.display='block';
				aLi[i].children[1].style.display='none';

			}
			this.children[1].style.display='block';
			this.children[0].style.display='none';
		}
	}
}
//热门话题函数--初始值
function hotNews(){
	var oNews=document.getElementById('hot_news');
	var oUl=oNews.children[1];
	var json={
		"p":[
				"#装修该听谁的#",
				"#双子会员观影生日趴#",
				"#晒长腿大挑战#",
				"#装修该听谁的#",
				"#双子会员观影生日趴#",
				"#晒长腿大挑战#",
				"#装修该听谁的#",
				"#双子会员观影生日趴#",
				"#晒长腿大挑战#"
		],
		"num":[
				"1243万",
				"43万",
				"2343万",
				"1233万",
				"12243万",
				"3543万",
				"4543万",
				"7843万",
				"9843万"
		]
	};
	var length=9;
	for(var i=0;i<length;i++){
		var oLi=document.createElement('li');
		var oA=document.createElement('a');
		var oSpan=document.createElement('span');
		oA.href='javascript:;';
		oA.innerHTML=json.p[i];
		oSpan.innerHTML=json.num[i];
		oLi.appendChild(oA);
		oLi.appendChild(oSpan);
		oUl.appendChild(oLi);
		oA.onmouseenter=function(){
			this.className='red';
		}
		oA.onmouseleave=function(){
			this.className='';
		}
	}
	changeNews(oUl);
}
//换一换
function changeNews(obj){
	var oH=obj.previousElementSibling||obj.previousSibling;
	var oA=oH.children[0];

	oA.onclick=function(){
		ajax({
			url:weibo.txt,
			success:function(str){
				var arr=eval('('+str+')');
				var length=9;
				var n=0;
				for(var i=0;i<length;i++){
					var oLi=document.createElement('li');
					var oA=document.createElement('a');
					var oSpan=document.createElement('span');
					oA.href='javascript:;';
					oA.innerHTML=arr[n].content;
					oSpan.innerHTML=arr[n].read;
					oLi.appendChild(oA);
					oLi.appendChild(oSpan);
					oUl.appendChild(oLi);
					n++;
					if(n>length-1){
						n=0;
					}
				}
			}
		});

	}
}




















