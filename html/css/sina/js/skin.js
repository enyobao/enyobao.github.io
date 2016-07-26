//背景选择
function skin() {
	var oBgMain=document.getElementById('bg_main');
	var oSkinSpan=document.getElementById('skin_span');
	var oSkinBox=document.getElementById('skin_box');
	var oSkinClose=document.getElementById('skin_close');
	var aSkinLi=oSkinBox.getElementsByTagName('li');

	//弹出－－背景选择框
	oSkinSpan.onclick=function(){
		oSkinBox.style.display='block';
	}
	//关闭－－背景选择框
	oSkinClose.onclick=function(){
		oSkinBox.style.display='none';
	}
	//鼠标移入背景，改变边框颜色
	for(var i=0;i<aSkinLi.length;i++){
		aSkinLi[i].index=i;
		//移入
		aSkinLi[i].onmouseenter=function(){
			for(var j=0;j<aSkinLi.length;j++){
				if(aSkinLi[j].children.length==2){
					continue;
				}
				aSkinLi[j].className='';
			}
			this.className='green';
		}
		//移出
		aSkinLi[i].onmouseleave=function(){
			this.className='';
		}
		//点击－－选取背景图
		aSkinLi[i].onclick=function(){
			for(var j=0;j<aSkinLi.length;j++){
				if(aSkinLi[j].children.length==2){
					aSkinLi[j].removeChild(aSkinLi[j].children[1]);
					aSkinLi[j].className='';
				}
			}
			this.innerHTML+='<span class="skin_choosed"></span>';
			this.className='green';
			if(this.index==0){
				oBgMain.style.background='#fff';
				this.onmouseleave=null;
				return ;
			}
			oBgMain.style.background='url('+this.children[0].src+')';
			this.onmouseleave=null;
			
		}
	}
}