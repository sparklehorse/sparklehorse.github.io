function Array2String(array)
{
	var array_string = array.toString();
	return array_string;
}

function String2Array(string)
{
	var string_array = string.split(',');
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




function scanGrid(index,flag)
{
	var grid_array = new Array();
	for(var i=1;i<width*height+1;i++)
	{
		if(rgb2hex($("#td" + i).css("background-color"))==buttoncolor)
		{
			grid_array.push(i);
		}
	}
	if(flag=="add")
	{
			grid_array.push(index);
			grid_array = grid_array.sort(function(a,b){return a-b});
	}
	else if(flag=="del")
	{
		//del index of array
		grid_array = $.grep(grid_array, function(value)
		{
			return value != index;
		});
	}
	console.log(grid_array);   //console
	var array_string = Array2String(grid_array);
	updateGrid(array_string,index,flag);
}






function inverse(index)
{
	color = $("#td" + index).css("background-color");
	color = rgb2hex(color);
	$("#td" + index).css({"background-image":"url(rotate.gif)","background-size:":"23px","background-position":"center","background-repeat":"no-repeat"});
	if(color==bgcolor)//white2black
	{
		scanGrid(index,"add");        // add  index to array
	}
	else if(color== buttoncolor)//black2wihte
	{
		scanGrid(index,"del");    // del index of array
	}

}


function paintGrid(array_string)
{
	var string_array = String2Array(array_string)
	// 判断是否是数组 且符合大小
	
	
	
	for(var i=0;i<string_array.length;i++)
	{
		$("#td" + string_array[i]).css("background-color", buttoncolor);
	}
		
}


function getGrid()
{
	Bmob.initialize("39e6311974b6e925bcda05142762847f", "1999dd878d6989ee2cd3fe6f5d3ceae7");		
	var Grid = Bmob.Object.extend("Grid");
    var query = new Bmob.Query(Grid);
    query.get("HU3K4445", {             
      success: function(object) {
		var array_string = object.get("ArrayString")
		paintGrid(array_string);				
      },
      error: function(object, error) {
        alert("query object fail");
      }
    });
}


function freshGrid()
{
	
}



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



(function main()
{
	bgcolor = "#ffffff";          // white in lower-case;
	buttoncolor = "#404040";      //black;
	width = 25;
	height = 16;
	var text="我爱你";
	
	
	
	heart_array1=[84, 85, 86, 89, 90, 91, 108, 112, 113, 117, 132, 143, 157, 168, 182, 193, 208, 217, 234, 241, 260, 265, 286, 289, 312, 313];
	heart_array2=[85, 86, 90, 91, 109, 112, 114, 117, 133, 138, 143, 158, 168, 184, 192, 210, 216, 236, 240, 262, 264, 288];
	heart_array3=[85, 86, 90, 91, 109, 112, 114, 117, 133, 138, 143, 158, 168, 184, 192, 210, 216, 236, 240, 262, 264, 288];
	
	
	
	
	$(document).ready(function(){
				loadingGrid();
				freshGrid();
				getGrid();
				//displayText(text);
				
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