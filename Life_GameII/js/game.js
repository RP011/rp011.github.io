var map = new Array;
var start = false;
var map_width = 640;  //地图大概大小
var row = 1;
var len = map_width / row;
var pr = 0.5;
var mainCycle;   //主循环变量
var mapCanvas = document.getElementById('mapCanvas');
var cnt = 0;
var autoflag = false;
var ftp = 10;

function initdata(){   //初始化数据
	var temp;
	temp = map_width % row;
	len = (map_width - temp) / row;
	if(temp >= row / 2){
		len++;
	}
	map_width = len * row;
	cnt = 0;
	init_map(row);   //初始化地图
}

function init_map(len){   //初始化地图
	for(var i = 0; i < len; i++){
		map[i] = new Array;
		for(var j = 0; j < len; j++){
			map[i][j] = Math.round(Math.random() / (2 - 2 * pr));
		}
	}
	map[Math.round(Math.random() * (row - 1))][Math.round(Math.random() * (row - 1))] = 1;
}

function get_next_generation(){   //得到下一代
	cnt++;
	var temp_map = new Array;
	for(var i = 0; i < row; i++){
		temp_map[i] = new Array;
		for(var j = 0; j < row; j++){
			temp_map[i][j] = 0;
		}
	}
	for(var i = 0; i < row; i++){
		for(var j = 0; j < row; j++){
			if(map[i][j] > 0){
				if(i > 0){
					temp_map[i - 1][j]++;
					if(i > 1){
						temp_map[i - 2][j]++;
					}
				}
				if(j > 0){
					temp_map[i][j - 1]++;
					if(j > 1){
						temp_map[i][j - 2]++;
					}
				}
				if(i < row - 1){
					temp_map[i + 1][j]++;
					if(i < row - 2){
						temp_map[i + 2][j]++;
					}
				}
				if(j < row - 1){
					temp_map[i][j + 1]++;
					if(j < row - 2){
						temp_map[i][j + 2]++;
					}
				}
			}
		}
	}
	var flag = true;
	for(var i = 0; i < row; i++){
		for(var j = 0; j < row; j++){
			if(map[i][j] >= 0){
				if(temp_map[i][j] < 2 || temp_map[i][j] > 3){
					if(flag && map[i][j] != 0){
						flag = false;
					}
					map[i][j] = 0;
				}
				else if(temp_map[i][j] == 3){
					if(flag && map[i][j] != 1){
						flag = false;
					}
					map[i][j] = 1;
				}
			}
		}
	}
	if(flag){
		clearInterval(mainCycle); 
		autoflag = false;
		alert('您的霸业走到了尽头！');
	}
}



