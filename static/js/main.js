function rgb2hex(rgb)
{
	rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
	function hex(x)
	{
		return ("0" + parseInt(x).toString(16)).slice(-2);
	}
	return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}


function inverse(index)
{
	color = $("#td" + index).css("background-color");
	color = rgb2hex(color);
	if(color==bgcolor)
	{
		$("#td" + index).css({"background-image":"url(rotate.gif)","background-size:":"23px","background-position":"center","background-repeat":"no-repeat"});
		setTimeout(function(){$("#td" + index).css({"background-color":buttoncolor,"background-image":""})}, 400);
	}
	else if(color== buttoncolor)
	{
		$("#td" + index).css({"background-image":"url(rotate.gif)","background-size:":"23px","background-position":"center","background-repeat":"no-repeat"});
		setTimeout(function(){$("#td" + index).css({"background-color":bgcolor,"background-image":""})}, 400);
	}
}


function display(text,width,height)
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
		$("#td" + randval).css("background-color", bgcolor); //wihte
	}
}




function rand(width,height)
{
	max = width*height;
	val = parseInt(Math.random() * max) + 1;       //eg min=1,max=4
	return val;	
}




function paint(width,height)
{
	$("#display").append("<table></table>");
	$("table").append("<tbody></tbody>");
	for(var i=0;i<height;i++)
	{
		$("tbody").append('<tr id="tr' + (i + 1) + '"></tr>');		
		for(var j=0;j<width;j++)
		{
			sum = i*width + (j + 1);
			$("#tr" + (i + 1)).append('<td id="td' + sum + '" onclick="inverse('+ sum +')" ></td>');
			$("#td" + sum).css("background-color", buttoncolor);
		}
	}	
}



(function main()
{
	bgcolor = "#ffffff";          // white; xiaoxie
	buttoncolor = "#404040";   //like black color;
	var width = 25;
	var height = 16;
	var text="我爱你";
	
	$(document).ready(function(){
				paint(width,height);
				display(text,width,height);
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