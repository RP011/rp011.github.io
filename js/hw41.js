var str = "http://rp011.github.io/";
var flag = false;
$("#ori").bind({"click" : showDiv});
$("#ori0").bind({"mouseover" : function(e)
	{
		this.style.background = "#FF0000"
	},
	"mouseout" : function(e)
	{
		this.style.background = "#FFF"
	}
});
function GetNext(){
	$("#loading").show();
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
	var json;
	xhr.onreadystatechange = function(event)
	{
		if (xhr.readyState == 4)
		{
			if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304)
			{
				var result = xhr.responseText;  
				var json = eval("(" + result + ")"); 
				for(j = 0; j < 22; j++)
				{
						var url = json.data[j].url;
						var myli = document.createElement("li");
						myli.style = 'opacity:0';
						$(myli).bind({"mouseover" : function(e)
							{
								this.style.background = "#FF0000"
							},
							"mouseout" : function(e)
							{
								this.style.background = "#FFF"
							}
						});
						var myimg = document.createElement("img");
						myimg.src = str + url;
						$(myimg).bind({"click" : showDiv});
						myimg.jingdu = 35 + 41 / 60.0 + Math.floor(Math.random() * ( 100 + 1)) / 100.0 - 0.5;
						myimg.weidu = 139 + 44 / 60.0 + Math.floor(Math.random() * ( 100 + 1)) / 100.0 - 0.5;
						myli.appendChild(myimg);
						$("#mypic").append(myli);
						$("#loading").hide();
				}
				CalPos(); 
				flag = true;
			} 
			else 
			{
				alert("Request was unsuccessful: " + xhr.status);
			}
		}
	};
	xhr.open("GET", str + "js/json.js", true);
	xhr.send(null);
};

function CalPos(){
	var elements = document.getElementById("mypic")
	var margin = 10;
	var li = $("li");
	var liwidth = li[0].offsetWidth + margin;
	var h = [];
	li.css("position", "absolute");
	var n = elements.offsetWidth / liwidth | 0;
	for(var i = 0; i < li.length; i++) 
	{
		liheight = li[i].offsetHeight;
		if(i < n) 
		{
			h[i] = liheight;
			li.eq(i).css("top", 0);
			li.eq(i).css("left", i * liwidth);
		}
		else{
			minheight = Math.min.apply(null, h) ;
			minIndex = GetIndex(h, minheight);
			h[minIndex] += liheight + margin ;
			li.eq(i).css("top", minheight + margin);
			li.eq(i).css("left",minIndex * liwidth);
		}
		$("h3").eq(i).text("编号:" + i + ",高度:" + liheight);
		$("li").animate({opacity:1});
	}
}

function GetIndex(arr, v)
{
	for(i in arr){
		if(arr[i] == v)
		{
			return i;
		}
	}
}

window.onload = function() {CalPos();};
window.onresize = function() {CalPos();};

$(window).bind("scroll",function(){
	if( $(document).scrollTop() + $(window).height() > $(document).height() - 100 && flag == true) {
		flag = false;
		GetNext();
	}
});
GetNext();