var movable = true;
var Key = 13;

var myWindow = document.createElement("div");
myWindow.id = "myWindow";
myWindow.innerText = "大图";
myWindow.style.width = "200px";
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

var myimg = document.createElement("img");

var mytext0 = document.createElement("p");
mytext0.innerHTML = "评论";

var mytext = document.createElement("p");
mytext.innerHTML = "OTL";

var nextPage = document.createElement("button");
nextPage.onclick = Close;
nextPage.innerHTML = '<span>下一页</span>';
nextPage.style.position = "absolute";
nextPage.style.right = "0px";
nextPage.style.bottom = "0px";

document.body.appendChild(myWindow);
myWindow.appendChild(myimg);
myWindow.appendChild(button);
myWindow.appendChild(mytext0);
myWindow.appendChild(mytext);
myWindow.appendChild(nextPage);


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
	Window.style.top = (document.documentElement.clientHeight - Window.clientHeight)/2 + pageYOffset + "px";
	
	myimg.src = this.src;
	
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
}

function Close()
{
	var Window = document.getElementById('myWindow');
	Window.style.display = "none";
	document.body.style.overflow = "auto";
	var body = document.getElementsByTagName('body');
	var mybg = document.getElementById('mybg');
	body[0].removeChild(mybg);
}

