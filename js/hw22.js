var str = "http://rp011.github.io/";
var movable = true;
var Key = 13;
var minePos = {weidu : 0, jingdu : 0};

if (navigator.geolocation)
    {
		navigator.geolocation.getCurrentPosition(function(tmppos)
		{
			minePos.weidu = tmppos.coords.latitude;
			minePos.jingdu = tmppos.coords.longitude;
		});
    }
	else
	{
		mypos.innerHTML = "Geolocation is not supported by this browser.";
	}

var myWindow = document.createElement("div");
myWindow.id = "myWindow";
//myWindow.innerText = "大图";
//myWindow.style.width = "200px";
myWindow.style.position = "absolute";
myWindow.style.background = "#EEE";
myWindow.style.padding = "30px";
myWindow.style.display = "none";
myWindow.style.zIndex = "100";

var button = document.createElement("button");
button.onclick = Close;
button.innerHTML = '<span>×</span>';
button.style.position = "absolute";
button.style.right = "0px";
button.style.top = "0px";

var myFFFdiv = document.createElement("div");
myFFFdiv.style.position = "absolute";
myFFFdiv.style.right = "20px";

var myimgdiv = document.createElement("div");

var myimg = document.createElement("img");

var FFF = document.createElement("a");
var FFFnum = Math.floor(Math.random() * ( 100 + 1));
FFF.innerHTML = "烧(" + FFFnum + ")";
FFF.onclick = function(e)
{
	FFFnum++;
	FFF.innerHTML = "烧(" + FFFnum + ")";
}

var mypos = document.createElement("p");
mypos.innerHTML = "正在获取您的位置……";


var mytext0 = document.createElement("p");
mytext0.innerHTML = "评论";
mytext0.style.fontSize = "17px";

var mytext = document.createElement("p");
mytext.innerHTML = "loading……";
mytext.style.position = "absolute";
mytext.style.left = "60px"

var myjubaodiv = document.createElement("div");
myjubaodiv.style.position = "absolute";
myjubaodiv.style.right = "30px";
myjubaodiv.style.bottom = "30px";

var jubao = document.createElement("a");
jubao.innerHTML = "举报";
jubao.onclick = function(e)
{
	alert("我们会对此评论进行处理，感谢您的支持！");
}

var nextPage = document.createElement("button");
nextPage.onclick = GetNextCom;
nextPage.innerHTML = '<span>下一页</span>';
nextPage.style.position = "absolute";
nextPage.style.right = "0px";
nextPage.style.bottom = "0px";

var priPage = document.createElement("button");
priPage.onclick = GetPriCom;
priPage.innerHTML = '<span>上一页</span>';
priPage.style.position = "absolute";
priPage.style.left = "0px";
priPage.style.bottom = "0px";

var mydiv = document.createElement("div");
mydiv.style.height = "100px";
mydiv.style.background = "#999";

document.body.appendChild(myWindow);
myimgdiv.appendChild(mypos);
myimgdiv.appendChild(myimg);
myFFFdiv.appendChild(FFF);
myimgdiv.appendChild(myFFFdiv);
myWindow.appendChild(myimgdiv);
myWindow.appendChild(button);
myjubaodiv.appendChild(jubao);
mydiv.appendChild(mytext0);
mydiv.appendChild(mytext);
mydiv.appendChild(myjubaodiv);
myWindow.appendChild(nextPage);
myWindow.appendChild(priPage);
myWindow.appendChild(mydiv);

$(priPage).hide();		
$(nextPage).hide();		

var textjson;
var nowpage = -1;

document.getElementById('myWindow').init = function(opt){
	if(opt && opt.content)
	{
		this.innerText = opt.content;
		myWindow.appendChild(button);
	}
	if(opt && opt.closeKey)
	{
		Key = opt.closeKey;	
	}
	if(opt && opt.draggable == true)
	{
		movable = true;
	}
	else if(opt && opt.draggable == false)
	{
		movable = false;
	}
};

function showDiv()
{
	var Window = document.getElementById('myWindow');
	Window.style.display = "block";
	Window.style.left = (document.documentElement.clientWidth - Window.clientWidth)/2 + pageXOffset + "px";
	Window.style.top = (document.documentElement.clientHeight - Window.clientHeight)/2 + pageYOffset - 200 + "px" ;
	
	var tmp = (this.src).split("mini");
	myimg.src = tmp[0] + tmp[1];
	myimg.style.width = "500px";
	FFFnum = Math.floor(Math.random() * ( 100 + 1));
	FFF.innerHTML = "烧(" + FFFnum + ")";
	
	
	var tmpC = Math.sin(minePos.weidu * Math.PI / 180) * Math.sin(this.weidu * Math.PI / 180) + Math.cos(minePos.weidu * Math.PI / 180) * Math.cos(this.weidu * Math.PI / 180) * Math.cos((minePos.jingdu - this.jingdu) * Math.PI / 180);
	var tmpdis = 6371.004 * Math.acos(tmpC) * Math.PI / 180;
	if(isNaN(tmpdis))
	{
		mypos.innerHTML = "您距离此图片很远";
	}
	else
	{
		mypos.innerHTML = "您距离此图片" + parseFloat(tmpdis.toFixed(1)) + "千米";
	}
	
	document.onkeydown = function(evt)
	{
		if(evt.keyCode == Key)
			Close();
	};
	
	var xx;
	var yy;
	
	if(movable)
	{
		myWindow.onmousedown = function(src)
		{
			xx = src.clientX - parseInt(Window.style.left);
			yy = src.clientY - parseInt(Window.style.top);
			document.onmousemove = mousemove;
		}
		function mousemove(src)
		{
			myWindow.style.left = (src.clientX - xx) + "px";
			myWindow.style.top = (src.clientY - yy) + "px";
		}
		document.onmouseup = function()
		{
			document.onmousemove = null;
		}
	}
	else
	{
		myWindow.onmousedown = null;
	}
	
	var bg = document.createElement("div"); 
	bg.setAttribute("id","mybg");
	bg.style.position = "fixed";
	bg.style.background = "#000";
	bg.style.width = "100%";
	bg.style.height = "100%";
	bg.style.top = "0";
	bg.style.left = "0";
	bg.style.opacity = "0.5";
	bg.style.filter = "Alpha(opacity=80)";
	bg.style.zIndex = "50";
	document.body.appendChild(bg);
	document.body.style.overflow = "hidden";
	
	function createXHR(){
		if (typeof XMLHttpRequest != "undefined")
		{
			return new XMLHttpRequest();
		} 
		else 
		{
			throw new Error("No XHR object available.");
		}
	}
	var xhr = createXHR();
	xhr.onreadystatechange = function(event)
	{
		if (xhr.readyState == 4)
		{
			if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304)
			{
				var result = xhr.responseText;  
				textjson = eval("(" + result + ")"); 
				GetNextCom();
			} 
			else 
			{
				alert("Request was unsuccessful: " + xhr.status);
			}
		}
	};
	xhr.open("GET", str + "js/commentjson.js", true);
	xhr.send(null);
	
}

function Close()
{
	myimg.src = "";
	var Window = document.getElementById('myWindow');
	Window.style.display = "none";
	document.body.style.overflow = "auto";
	var body = document.getElementsByTagName('body');
	var mybg = document.getElementById('mybg');
	body[0].removeChild(mybg);
	nowpage = -1;
	FFFnum = Math.floor(Math.random() * ( 100 + 1));
}

function GetNextCom()
{
	if(nowpage == -1)
	{
		nowpage = 1;
	}
	else if(nowpage != textjson.data[0].num)
	{
		nowpage++;
	}
	if(nowpage == 1)
	{
		$(priPage).hide();		
	}
	else
	{
		$(priPage).show();	
	}
	if(nowpage == textjson.data[0].num)
	{
		$(nextPage).hide();	
	}
	else
	{
		$(nextPage).show();	
	}
	mytext.innerHTML = textjson.data[nowpage].text;
}

function GetPriCom()
{
	if(nowpage != 1)
	{
		nowpage--;
	}
	if(nowpage == 1)
	{
		$(priPage).hide();		
	}
	else
	{
		$(priPage).show();	
	}
	if(nowpage == textjson.data[0].num)
	{
		$(nextPage).hide();	
	}
	else
	{
		$(nextPage).show();	
	}
	mytext.innerHTML = textjson.data[nowpage].text;
}
