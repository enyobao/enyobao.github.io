/**
 * Created by ijiajia on 2016/6/14.
 */
function json2url(json){
    json.t=Math.random();
    var arr=[];
    for(var name in json){
        arr.push(name+'='+json[name]);
    }
    return arr.join('&');
}
function ajax(json){
    var json=json || {};
    if(!json.url)return;
    json.data=json.data || {};
    json.type=json.type || 'get';
    json.time=json.time || 3000;
    // 1.准备自己的ajax、创建对象
    if(window.XMLHttpRequest){
        var oAjax=new XMLHttpRequest();
    }else{
        var oAjax=new ActiveXObject('Microsoft.XMLHTTP');
    }

    switch(json.type.toLowerCase()){
        case 'get':
            oAjax.open('GET', json.url+'?'+json2url(json.data), true);
            oAjax.send();
            break;
        case 'post':
            oAjax.open('POST', json.url, true);
            oAjax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            oAjax.send(json2url(json.data));
            break;
    }

    // 4、接收数据
    oAjax.onreadystatechange=function(){
        if(oAjax.readyState==4){
            if((oAjax.status>=200 && oAjax.status<300) || oAjax.status==304){
                // alert('成功'+oAjax.responseText);
                json.success && json.success(oAjax.responseText);
            }else{
                json.error && json.error(oAjax.status);
            }
            clearTimeout(timer);
        }
    };

    var timer=setTimeout(function(){
        alert('网络超时');
        oAjax.onreadystatechange=null;
    }, json.time);
}