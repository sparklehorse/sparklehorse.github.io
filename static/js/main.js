function Array2String(array)
{
	var array_string = array.toString();
	return array_string;
}

function String2Array(string)
{
	var string_array = string.split(',');
	for(var i=0;i<string_array.length;i++)
	{
		string_array[i] = Number(string_array[i]);
	}
	return string_array;
}

function rgb2hex(rgb)
{
	rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
	function hex(x)
	{
		return ("0" + parseInt(x).toString(16)).slice(-2);
	}
	return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}




function getTime(flag)
{
	
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth()+1;
	var day = date.getDate();
	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();
	//alert(year+'年'+month+'月'+day+'日 '+hour':'+minute+':'+second);
	
	//return string_array;
	
	
	/*
	if(flag=="init")
	{
		initTime = date.getTime();
		console.log(initTime);
	}
	else if(flag=="timer")
	{
		var nowTime = date.getTime();
		var timeSubs = parseInt((nowTime-initTime)/1000);
		console.log(timeSubs);
		if(timeSubs<=5)
		{
			gridFreshTime = 1000;
			//console.log("change1000");
		}
		else if (timeSubs<=20)
		{
			gridFreshTime = 3000;
			//console.log("change3000");
		}
		else
		{
			gridFreshTime = 5000;
			//console.log("change5000");
		}
	}
	*/
	
	
	
	
	
	
	
	
	var timeText = "Start 2016.12.24           Now"+year+"年"+month+"月"+day+"日"+hour+":"+minute+":"+second;
	timeText = timeText.replace("\n", "&nbsp;");  ///\s/   
	$("footer").text(timeText);
	//$("footer").text("Start 2016.12.24           Now"+year+"年"+month+"月"+day+"日"+hour+":"+minute+":"+second);
	
	/*
	if(hour==0)
	{
		//display weibaobao
		//func birthday
	}
	*/
	
	
	
	if(second<5)    //  dont fresh
	{
		
		//unbind onclick function
		
		//freshGrid();
		$("td").css("cursor","default"); 
		gridStates = "MASSAGE";
		console.log(second+"xxx");
		freshRows(3,heart_array1);   // init states:fresh 3 rows
	
		
	}
	/*
	else if(second=10)
	{
		gridStates = "FRESH";
	}
	*/
	else if(second<10)
	{
		//freshGrid();
		$("td").css("cursor","default"); 
		gridStates = "MASSAGE";
		console.log(second+"xxx");
		freshRows(3,heart_array2);   // init states:fresh 3 rows
	}
	else if(second<15)
	{
		//freshGrid();
		$("td").css("cursor","default"); 
		gridStates = "MASSAGE";
		console.log(second+"xxx");
		freshRows(3,heart_array3);   // init states:fresh 3 rows
	}
	else
	{
		$("td").css("cursor","pointer"); 
		gridStates = "FRESH";
	}
	
}









function displayText(text)
{
	for(var i=0;i<text.length;i++)
	{
		do
		{
			randval = rand(width,height);
			color = $("#td" + randval).css("background-color");
			color = rgb2hex(color);
			if(color == buttoncolor)
			{
				break;
			}
		}
		while(true);
		
		$("#td" + randval).text(text.slice(i, i + 1));		
		$("#td" + randval).css("background-color", bgcolor); 
	}
}




function rand()
{
	max = width*height;
	val = parseInt(Math.random() * max) + 1;       //eg min=1,max=4
	return val;	
}




function birthday()
{
	//2017.8.10
	//薇 宝 宝 我 爱 你
}









function updateGrid(array_string,index,flag)
{
	Bmob.initialize("39e6311974b6e925bcda05142762847f", "1999dd878d6989ee2cd3fe6f5d3ceae7");
	var Grid = Bmob.Object.extend("Grid");
    var query = new Bmob.Query(Grid);
    query.get("HU3K4445", {
      success: function(object) {
        object.set("ArrayString", array_string);
        object.save(null, {
          success: function(objectUpdate) {
			if(flag=="add")
			{
				$("#td" + index).css({"background-color":buttoncolor,"background-image":""});
			}
			else if(flag=="del")
			{
				$("#td" + index).css({"background-color":bgcolor,"background-image":""});
			}
			backgroundImageStates = "NULL";
			console.log(scanGrid());          // grid data
			
          },
          error: function(model, error) {
            alert("update object fail");
          }
        });
      },
      error: function(object, error) {
        alert("query object fail");
      }
    });
}




function scanGrid()
{
	var grid_array = new Array();
	for(var i=1;i<width*height+1;i++)
	{
		if(rgb2hex($("#td" + i).css("background-color"))==buttoncolor)
		{
			grid_array.push(i);
		}
	}
	return grid_array;
}




function inverse(index)
{
	if(gridStates=="MASSAGE")
	{
		return;	
	}

	color = $("#td" + index).css("background-color");
	color = rgb2hex(color);
	$("#td" + index).css({"background-image":"url(rotate.gif)","background-size:":"23px","background-position":"center","background-repeat":"no-repeat"});
	backgroundImageStates = "ROTATE";

	
	Bmob.initialize("39e6311974b6e925bcda05142762847f", "1999dd878d6989ee2cd3fe6f5d3ceae7");		
	var Grid = Bmob.Object.extend("Grid");
    var query = new Bmob.Query(Grid);
    query.get("HU3K4445", {             
      success: function(results) {		
		var array_string = results.get("ArrayString");
		var grid_array =String2Array(array_string);
		
		
		
		var flag;
		if(color==bgcolor&&$.inArray(index,grid_array)==(-1))//white2black
		{
			// add  index to array
			flag ="add" ;
			grid_array.push(index);
			grid_array = grid_array.sort(function(a,b){return a-b});	
		}
		else if(color==buttoncolor&&$.inArray(index,grid_array)!=(-1))//black2wihte
		{
			// del index of array
			flag="del";
			grid_array = $.grep(grid_array, function(value)
			{
				return value != index;
			});
		}
		array_string = Array2String(grid_array);
		updateGrid(array_string,index,flag);
      },
      error: function(results, error) {
        alert("query results fail");
		
		
		//paint 404 notfound
		//paintGrid(array404);	
      }
    });
}






function paintGrid(string_array)
{
	//var string_array = String2Array(array_string)
	// 判断是否是数组 且符合大小

	for(var i=1;i<width*height+1;i++)
	{
		$("#td" + i).css("background-color", bgcolor);
	}
	
	for(var i=0;i<string_array.length;i++)
	{
		$("#td" + string_array[i]).css("background-color", buttoncolor);
	}
	
	
}




function listeningGrid()
{
	 //服务器
    BmobSocketIo.initialize("39e6311974b6e925bcda05142762847f");
    //Bmob.initialize("e9978deb922a3ee549d8ca3266edff09", "db703f75fad13d945031b0500d366408");
	Bmob.initialize("39e6311974b6e925bcda05142762847f", "1999dd878d6989ee2cd3fe6f5d3ceae7");
    
   //初始连接socket.io服务器后，需要监听的事件都写在这个函数内
    BmobSocketIo.onInitListen = function(){
      //订阅GameScore表的数据更新事件
      //BmobSocketIo.updateTable("Grid");
	  BmobSocketIo.updateRow("Grid","HU3K4445");
	  
    };
	
	
	//取消 BmobSocketIo.unsubUpdateRow("Grid","HU3K4445");
	
	
	

      //监听服务器返回的更新表的数据
    BmobSocketIo.onUpdateRow = function("Grid","HU3K4445",grid_array){    
      //业务逻辑的代码
	  //paintGrid();
	  console.log("qwert"+grid_array.ArrayString);
	  freshRows(3, grid_array.ArrayString); 
	};

}









function getGrid()
{
	if(gridStates=="MASSAGE")
	{
		return;
	}
	
	
	for(var i=0;i<width*height;i++)
	{
		if(backgroundImageStates=="ROTATE")
		{
			//console.log($("#td"+i).css("background-image"));
			//console.log(typeof($("#td"+i).css("background-image")));
			break;
			return;
		}	
	}
	
	
	
	
	Bmob.initialize("39e6311974b6e925bcda05142762847f", "1999dd878d6989ee2cd3fe6f5d3ceae7");		
	var Grid = Bmob.Object.extend("Grid");
    var query = new Bmob.Query(Grid);
    query.get("HU3K4445", {             
      success: function(object) {		
		var array_string = object.get("ArrayString");
		var string_array =String2Array(array_string);		
		

		freshRows(3, string_array);   // init states:fresh 3 rows   then paint grid
		
      },
      error: function(object, error) {
        alert("query object fail");
		
		
		//paint 404 notfound
		paintGrid(array404);
		
		
		
		
		
		
      }
    });
}


function freshRows(num,grid_array)     // init states:fresh 3 rows
{
	timer4 = setInterval(function()       
	{
		if(y>num)    
		{
			clearInterval(timer4);
			clearInterval(timer3);				
			paintGrid(grid_array);	
		}			
	}, 10);			
}





function freshGrid()
{	
	$("td").css("background-color", bgcolor);
	x=1;	//横坐标
	y=1;	//纵坐标
	timer3 = setInterval(function()
	{
		if(x<=width*y)
		{														//第一排
			for(var i=x;i<=width*y;i++)
			{
				$("#td" + i).css("background-color", buttoncolor);
			}
			for(var j=1+width*(y-1);j<=x;j++)	
			{
				$("#td" + j).css("background-color", bgcolor);
			}
			x++;
		}
		else if(width*y<x<=width*height)
		{
			if(y<height)
			{
				y++;			
			}
			else
			{
				clearInterval(timer3);
			}
		}						
	},10);	
}


//刷新不完 继续刷新




function loadingGrid()
{
	$("#display").append("<table></table>");
	$("table").append("<tbody></tbody>");
	for(var i=0;i<height;i++)
	{
		$("tbody").append('<tr id="tr' + (i + 1) + '"></tr>');		
		for(var j=0;j<width;j++)
		{
			var sum = i*width + (j + 1);
			$("#tr" + (i + 1)).append('<td id="td' + sum + '" onclick="inverse('+ sum +')" ></td>');         //function inverse
			$("#td" + sum).css("background-color", bgcolor);
		}
	}	
}




function Grid()
{
	freshGrid();		
	getGrid();
}




function Time()
{
	getTime("init");				
	(function(){
		timer1 = setInterval(function()
		{
			getTime("timer");
		}, 1000)     //1s fresh
	})();
}

(function main()
{
	bgcolor = "#ffffff";          // white in lower-case;
	buttoncolor = "#404040";      //black;
	width = 25;
	height = 16;
	x = 0;
	y = 0;
	initTime = 0;
	gridFreshTime = 1000;
	gridStates = "FRESH";   //FRESH   OR    MASSAGE
	backgroundImageStates = "NULL"    // NULL    OR   ROTATE
	var text="我爱你";
	
	
	
	heart_array1=[84, 85, 86, 89, 90, 91, 108, 112, 113, 117, 132, 143, 157, 168, 182, 193, 208, 217, 234, 241, 260, 265, 286, 289, 312, 313];
	heart_array2=[85, 86, 90, 91, 109, 112, 114, 117, 133, 138, 143, 158, 168, 184, 192, 210, 216, 236, 240, 262, 264, 288];
	heart_array3=[62, 63, 65, 66, 86, 87, 88, 89, 90, 91, 92, 111, 112, 113, 114, 115, 116, 117, 137, 138, 139, 140, 141, 163, 164, 165, 189];
	array404=[];
	
	
	
	
	$(document).ready(function(){
		
		loadingGrid();
		Time();
		Grid();
		
		
		document.addEventListener("visibilitychange",function()     //switch to vivizhu.com 
		{
			if(document.visibilityState=="hidden") 
			{
				clearInterval(timer1);
				clearInterval(timer2);
				clearInterval(timer3);
				//clearInterval(timer4);
			} 
			else 
			{
				 window.location.reload();
				//gridFreshTime = 1000;
				//y=0;
				//console.log(gridFreshTime);
				//Time();
				//Grid();
			}
		});			
	})
		

	/*
	$.ajax({
		type: "GET",
		url: "love_utf8.txt",
		contentType: "text/html; charset=utf8",
		success: function(msg){
			text = msg;
			bak_text = text;
			$(document).ready(function(){
				display(size);
			})
		}			
	})
	*/

	
	
})();