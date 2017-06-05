// 顶栏js效果
 window.onload=function(){
 	flashShopping();
	headerScroll();
	banner();
 }
 //定义头部滚动事件函数
 function headerScroll(){
 	window.onscroll=function(){
	 	var header=document.querySelector(".header");
		var nav=document.querySelector(".nav");
		var maxlength=nav.offsetHeight+nav.offsetTop;
		var distance=document.body.scrollTop;
		var percentage=distance/maxlength;
		if(percentage>1){
			percentage=1
		}
		header.style.backgroundColor='rgba(201, 21, 35,'+percentage+')'
	}
 }
//定义秒杀时间设置
function flashShopping(){
	var liArr=document.querySelector(".time").querySelectorAll("li");
	var time=3*60*60;
	var times=setInterval(function(){
		time--;
		if(time<0){
			clearInterval(times);
			liArr[0].innerHTML=0;
			liArr[1].innerHTML=0;
			liArr[3].innerHTML=0;
			liArr[4].innerHTML=0;
			liArr[6].innerHTML=0;
			liArr[7].innerHTML=0;
			return
		}
		var hours1=Math.floor(Math.floor(time/60/60)/10);
		var hours2=Math.floor(time/60/60)%10;
		var minutes1=Math.floor(Math.floor(time/60%60)/10);
		var minutes2=Math.floor(time/60%60)%10;
		var seconds1=Math.floor(Math.floor(time%60)/10);
		var seconds2=Math.floor(time%60)%10;
		liArr[0].innerHTML=hours1;
		liArr[1].innerHTML=hours2;
		liArr[3].innerHTML=minutes1;
		liArr[4].innerHTML=minutes2;
		liArr[6].innerHTML=seconds1;
		liArr[7].innerHTML=seconds2;
	}, 1000)
}
//设置轮播图动画
function banner(){
	var ul=document.querySelector(".img");
	var index=1;
	var listArr=document.querySelector(".list").querySelectorAll("li");
	function setStyle(arr,index,name){
		for(var i=0; i<arr.length; i++){
			arr[i].className="";
		}
		arr[index].className=name;
	}
	//设置轮播事件
	var timed=setInterval(function(){
		index++;
		ul.style.transition="all .5s";
		ul.style.transform='translateX('+index*ul.offsetWidth/-10+'px)';	
	}, 1000)
	//设置动画末尾时间
	ul.addEventListener('webkitTransitionEnd', function(){
		if(index>8){
			index=1;
			ul.style.transition="";
			ul.style.transform='translateX('+index*ul.offsetWidth/-10+'px)';
		}else if(index<1){
			index=8;
			ul.style.transition="";
			ul.style.transform='translateX('+index*ul.offsetWidth/-10+'px)';
		}
		setStyle(listArr,index-1,"current");
	})
	//注册三个touch事件
	var startX=0;
	var moveX=0;
	var distanceX=0;
	//touchstart事件
	ul.addEventListener('touchstart', function(event){
		clearInterval(timed);
		ul.style.transition="";
		startX=event.touches[0].clientX;
	})
	// touchmove事件
	ul.addEventListener('touchmove',function(event){
		moveX=event.touches[0].clientX;
		ul.style.transform='translateX('+(moveX-startX+(index*ul.offsetWidth/-10))+'px)';

	})
	//手指松开触发事件
	ul.addEventListener('touchend', function(){
		distanceX=moveX-startX;
		if(Math.abs(distanceX)>ul.offsetWidth/30){
			if(distanceX>0){
				index--
			}else{
				index++;
			}
			ul.style.transition='all .5s';
			ul.style.transform='translateX('+index*ul.offsetWidth/-10+'px)';
		}else{
			ul.style.transition='all .5s';
			ul.style.transform='translateX('+index*ul.offsetWidth/-10+'px)';
		}
		
		// 开启定时器
		timed=setInterval(function(){
			index++;
			ul.style.transition="all .5s";
			ul.style.transform='translateX('+index*ul.offsetWidth/-10+'px)';	
			}, 1000)
		})
}