function pos(){
	var oCheatBox=document.getElementById('cheat_box');
	var oSecBac=oCheatBox.previousElementSibling||oCheatBox.previousSibling;
	oCheatBox.onclick=function(){
		oSecBac.style.display='block';
		oCheatBox.children[1].style.display='block';
		oCheatBox.children[0].style.display='none';
	}
	oSecBac.onclick=function(){
		oCheatBox.children[1].style.display='none';
		oCheatBox.children[0].style.display='block';
		this.style.display='none';
	}

}