
var canvas = document.getElementById('canvas');
var cxt = canvas.getContext('2d');

//获取工具按钮的标签
var Brush=document.getElementById('means_Brush');
var Eraser=document.getElementById('means_Eraser');
var Paint=document.getElementById('means_Paint');
var Straw=document.getElementById('means_Straw');
var Text=document.getElementById('means_text');
var Magnifier=document.getElementById('means_Magnifier');

//获取形状按钮的标签
var Line=document.getElementById('shape_line');
var Arc=document.getElementById('shape_arc');
var Rect=document.getElementById('shape_rect');
var Poly=document.getElementById('shape_poly');
var ArcFill=document.getElementById('shape_arcfill');
var RectFill=document.getElementById('shape_rectfill');
//把十二个工具和形状放到一个数组中
var actions = [Brush,Eraser,Paint,Straw,Text,Magnifier,Line,Arc,Rect,
Poly,ArcFill,RectFill];

//获取线宽
var Line_1 = document.getElementById('width_1');
var Line_3 = document.getElementById('width_3');
var Line_5 = document.getElementById('width_5');
var Line_8 = document.getElementById('width_8');
//线宽放入数组
var width=[Line_1,Line_3,Line_5,Line_8];

//获取颜色
var ColorRed = document.getElementById('red');
var ColorGreen = document.getElementById('green');
var ColorBlue = document.getElementById('blue');
var ColorYellow = document.getElementById('yellow');
var ColorWhite = document.getElementById('white');
var ColorBlack = document.getElementById('black');
var ColorPink = document.getElementById('pink');
var ColorPurple = document.getElementById('purple');
var ColorCyan = document.getElementById('cyan');
var ColorOrange = document.getElementById('orange');
//颜色放入数组
var colors =[ColorRed,ColorGreen,ColorBlue,ColorYellow,ColorWhite,ColorBlack,ColorPink,ColorPurple,ColorCyan,ColorOrange];

//设置初始值
//默认选中画笔工具
drawBrush(0);
//默认设置颜色
setColor(ColorRed,0);
//默认设置线宽
setLineWidth(0);
//颜色设置函数
function setColor(obj,num)
{
	setStatus(colors,num,0);
	//设置画笔颜色和填充颜色
	cxt.strokeStyle = obj.id;
	cxt.fillStyle=obj.id;
	}
//线宽设置函数
function setLineWidth(num)
{
	setStatus(width,num,1);	
	switch(num){
		case 0:
		   cxt.lineWidth = 1;
		   break;
		case 1:
		   cxt.lineWidth = 3;
		   break;
		case 2:
		   cxt.lineWidth = 5;
		   break;
		case 3:
		   cxt.lineWidth = 8;
		   break;
		 default:
		 	cxt.lineWidth = 1;
		}
	}


//状态设置函数
function setStatus(Arr,num,type){
	for(var i=0;i<Arr.length;i++){
		
			if(i == num)//设置选中标签的css属性
			{ 
				if(type==1)//设置选中的是背景色还是白色边框
					{
						Arr[i].style.background= "yellow";
					}else{
						Arr[i].style.border= "1px solid #fff";
					}
			}
			else
			{
				if(type==1)//设置未选中标签的css属性
					{
						Arr[i].style.background= "#ccc";
					}else{
						Arr[i].style.border= "1px solid #000";
					}
				}
		}
	}

//列出所有的按钮对应的函数
function drawBrush(num){
	setStatus(actions,num,1);
	var flag = 0;
	canvas.onmousedown=function(evt){
		evt=window.event||evt;
		var startX=evt.pageX-this.offsetLeft;
		var startY=evt.pageY-this.offsetTop;
		cxt.beginPath();
		cxt.moveTo(startX,startY);
		flag = 1;
		}
	canvas.onmousemove=function(evt){
		evt=window.event||evt;
		var endX=evt.pageX-this.offsetLeft;
		var endY=evt.pageY-this.offsetTop;
		if(flag)
		{
			cxt.lineTo(endX,endY);
			cxt.stroke();
			}
		}
	 canvas.onmouseup=function(){
		 flag = 0;
		 }
	 canvas.onmouseout=function(){
		 flag = 0;
		 }
	}
var eraserFlag = 0;//设置橡皮状态标志位
function drawEraser(num){
	setStatus(actions,num,1);
	canvas.onmousedown=function(evt){
		evt=window.event||evt;
		var eraserX=evt.pageX-this.offsetLeft;
		var eraserY=evt.pageY-this.offsetTop;
		//canvas擦除事件
		cxt.clearRect(eraserX-cxt.lineWidth,eraserY-cxt.lineWidth
		,cxt.lineWidth*2,cxt.lineWidth*2);
		eraserFlag = 1;
		}
		//随着鼠标移动一直擦除
	canvas.onmousemove=function(evt){
		evt=window.event||evt;
		var eraserX=evt.pageX-this.offsetLeft;
		var eraserY=evt.pageY-this.offsetTop;
		//canvas擦除事件
		if(eraserFlag)//判断是否按下鼠标
		{
			cxt.clearRect(eraserX-cxt.lineWidth,eraserY-cxt.lineWidth
			,cxt.lineWidth*2,cxt.lineWidth*2);
		}
		}
		//抬起鼠标清楚擦除的状态为0
	canvas.onmouseup=function(){
		eraserFlag = 0;
		}
		//移除画布 状态为0
	canvas.onmouseout=function(){
		eraserFlag = 0;
		}
	}
	
function drawPaint(num){
	setStatus(actions,num,1);
	//将画布涂成制定颜色
	canvas.onmousedown=function(){
		cxt.fillRect(0,0,880,400);
		}
	canvas.onmouseup=null;
	canvas.onmousemove=null;
	canvas.onmouseout=null;
	}
function drawStraw(num){
	setStatus(actions,num,1);
	canvas.onmousedown=function(evt){
		evt=window.event||evt;
		var strawX=evt.pageX-this.offsetLeft;
		var strawY=evt.pageY-this.offsetTop;
		//获取该坐标的颜色信息
		//获取图像信息的方法getImageData(开始点x,y,获取宽度,获取高度)
		var obj = cxt.getImageData(strawX,strawY,1,1);
		//alert(obj.data);
		//obj.data=[红,绿,蓝,对比度]每四个数组元素代表画布中的一个像素点 0-255
		/*obj.data=[红,绿,蓝,对比度,
		红,绿,蓝,对比度,
		红,绿,蓝,对比度,
		红,绿,蓝,对比度]多像素的数据*/
		var color='rgb('+obj.data[0]+','+obj.data[1]+','+obj.data[2]+')';
		//将吸管吸出颜色设定到我们的应用
		cxt.strokeStyle = color;
		cxt.fillStyle = color;
		//颜色吸中后自动选中画笔工具
		drawBrush(0);
		}
	canvas.onmousemove=null;//注销掉其他工具
	canvas.onmouseout=null;
	canvas.onmouseup=null;
	}
function drawText(num){
	setStatus(actions,num,1);
	canvas.onmousedown=function(evt){
		evt=window.event||evt;
		//获取鼠标点击时的位置
		var startX=evt.pageX-this.offsetLeft;
		var startY=evt.pageY-this.offsetTop;
		//获取用户输入的信息
		//window.prompt(对话框提示,默认值);
		var userVal = window.prompt('请在这里输入文字','');
		//将用户输入的文字写到对应的坐标点
		if(userVal!= null)
			cxt.fillText(userVal,startX,startY)
		}
	 canvas.onmousemove=null;//注销掉其他工具
	 canvas.onmouseout=null;
	 canvas.onmouseup=null;
	}
function drawMagnifier(num){
	setStatus(actions,num,1);
	//用户输入的数据大小
	var scale = window.prompt('请输入要放大的百分比[只能是整形]','100');
	//把数据转换为对应canvas画布大小
	var scaleW = 880*scale/100;
	var scaleH = 400*scale/100;
	//将数据设置到对应HTML标签
	canvas.style.width = parseInt(scaleW) +'px';
	canvas.style.height = parseInt(scaleH) +'px';
	}
function drawLine(num){
	setStatus(actions,num,1);
	canvas.onmousedown=function(evt){
		evt=window.event||evt;
		//相对起始点坐标canvas
		//先获取鼠标距离页面顶端的距离
		//获取画布距离页面左右的距离
		var startX=evt.pageX-this.offsetLeft;
		var startY=evt.pageY-this.offsetTop;
		//开始点
		cxt.beginPath();//开始新路径
		cxt.moveTo(startX,startY);
		}
	 canvas.onmousemove=null;//注销掉其他工具
	 canvas.onmouseout=null;
	 //鼠标抬起
	 canvas.onmouseup=function(evt){
		evt=window.event||evt;
		var endX=evt.pageX-this.offsetLeft;
		var endY=evt.pageY-this.offsetTop;
		//设置路径，并且连接起点和终点
		cxt.lineTo(endX,endY);
		cxt.closePath();
		cxt.stroke();
		 } 
	}
//全局变量
var arcX = 0;
var arcY = 0;
function drawArc(num){ 
	setStatus(actions,num,1);
	canvas.onmousedown=function(evt){
		//获取圆心位置
		evt=window.event||evt;
		//相对起始点坐标canvas
		//先获取鼠标距离页面顶端的距离
		//获取画布距离页面左右的距离
		arcX=evt.pageX-this.offsetLeft;
	    arcY=evt.pageY-this.offsetTop;
		}
	canvas.onmouseup=function(evt){
		//获取半径
		evt=window.event||evt;
		var endX=evt.pageX-this.offsetLeft;
		var endY=evt.pageY-this.offsetTop;
		var a = endX-arcX;
		var b = endY-arcY;
		var c = Math.sqrt(a*a+b*b);
		cxt.beginPath();
		cxt.arc(arcX,arcY,c,0,360,false);
		cxt.closePath();
		cxt.stroke();
		}
		
	canvas.onmousemove=null;//注销掉其他工具
	canvas.onmouseout=null;
	}
	
	var rectX = 0;
	var rectY = 0;
	
function drawRect(num){
	setStatus(actions,num,1);
	 canvas.onmousedown=function(evt){
		 //获取矩形左上角
		evt=window.event||evt;
		//相对起始点坐标canvas
		//先获取鼠标距离页面顶端的距离
		//获取画布距离页面左右的距离
		rectX=evt.pageX-this.offsetLeft;
	    rectY=evt.pageY-this.offsetTop;
		 }
	canvas.onmouseup=function(evt){
		evt=window.event||evt;
		var endX=evt.pageX-this.offsetLeft;
		var endY=evt.pageY-this.offsetTop;
		var rectW = rectX - endX;
		var rectH = rectY - endY;
		cxt.strokeRect(rectX,rectY,rectW,rectH);
		}
	canvas.onmousemove=null;//注销掉其他工具
	canvas.onmouseout=null;
	}
var polyX = 0;
var polyY = 0;
function drawPoly(num){
	setStatus(actions,num,1);
	canvas.onmousedown=function(evt){
		evt=window.event||evt;//三角形的中心
		polyX=evt.pageX-this.offsetLeft;
	    polyY=evt.pageY-this.offsetTop;	
		}
	canvas.onmouseup = function(evt){
		evt=window.event||evt;//画笔移动到右下角的顶点
		var endX=evt.pageX-this.offsetLeft;
		var endY=evt.pageY-this.offsetTop;
		cxt.beginPath();
		cxt.moveTo(endX,endY);//计算左下角顶点
		var lbX = 2*polyX-endX;
		var lbY = endY;
		cxt.lineTo(lbX,lbY);
		//设置第三个点的坐标
		var tempC= 2*(endX-polyX);
		var tempA = endX - polyX;
		var tempB =Math.sqrt(tempC*tempC - tempA*tempA);
		//计算最上面的顶点坐标
		//endY - tempB Y polyX x
		cxt.lineTo(polyX,endY-tempB);
		cxt.closePath();
		cxt.stroke();
		}
	}
function drawArcfill(num){
	setStatus(actions,num,1);
	setStatus(actions,num,1);
	canvas.onmousedown=function(evt){
		//获取圆心位置
		evt=window.event||evt;
		//相对起始点坐标canvas
		//先获取鼠标距离页面顶端的距离
		//获取画布距离页面左右的距离
		arcX=evt.pageX-this.offsetLeft;
	    arcY=evt.pageY-this.offsetTop;
		}
	canvas.onmouseup=function(evt){
		//获取半径
		evt=window.event||evt;
		var endX=evt.pageX-this.offsetLeft;
		var endY=evt.pageY-this.offsetTop;
		var a = endX-arcX;
		var b = endY-arcY;
		var c = Math.sqrt(a*a+b*b);
		cxt.beginPath();
		cxt.arc(arcX,arcY,c,0,360,false);
		cxt.closePath();
		cxt.fill();
		}
		
	canvas.onmousemove=null;//注销掉其他工具
	canvas.onmouseout=null;
	}
function drawRectfill(num){
	setStatus(actions,num,1);
	setStatus(actions,num,1);
	 canvas.onmousedown=function(evt){
		 //获取矩形左上角
		evt=window.event||evt;
		//相对起始点坐标canvas
		//先获取鼠标距离页面顶端的距离
		//获取画布距离页面左右的距离
		rectX=evt.pageX-this.offsetLeft;
	    rectY=evt.pageY-this.offsetTop;
		 }
	canvas.onmouseup=function(evt){
		evt=window.event||evt;
		var endX=evt.pageX-this.offsetLeft;
		var endY=evt.pageY-this.offsetTop;
		var rectW = rectX - endX;
		var rectH = rectY - endY;
		cxt.fillRect(rectX,rectY,rectW,rectH);
		}
	canvas.onmousemove=null;//注销掉其他工具
	canvas.onmouseout=null;
	}
function clearImg(){
	cxt.clearRect(0,0,880,400);
	}
function saveImg(){
	var imgdata = canvas.toDataURL();
	var b64 = imgdata.substring(22);
	//alert(b64);
	//将form中的隐藏表单 赋值
	var data = document.getElementById('data');
	data.value = b64;
	//将表单提交到后台
	var form = document.getElementById('myform');
	form.submit();
	}