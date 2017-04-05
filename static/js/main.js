function rgb2hex(rgb)
{
	rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
	function hex(x)
	{
		return ("0" + parseInt(x).toString(16)).slice(-2);
	}
	return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}


function inverse(count)
{
	color = $("#td" + count).css("background-color");
	color = rgb2hex(color);
	if(color=="#252525")
	{
		$("#td" + count).css("background-color", "#F0F0F0");
	}
	else if(color=="#F0F0F0"||color=="#f0f0f0")
	{
		$("#td" + count).css("background-color", "#252525");
	}
}
function get_array()
{
	var arr = new Array();
	for(var i=0;i<text.length;i++)
		{
			if(text.slice(i, i + 1)=="\n")
			{
				arr.push(i - 1);
				text = text.slice(0, i).concat(text.slice(i + 1));
				i--;
			}
		}
	arr.push(text.length - 1);//最后一个没有\n
	return arr;
}


function disp()
{
	$("#td" + count).text(text.slice(count, count + 1));
	$("#td" + count).css("background-color", "#252525");
	count++;
	if(count==text.length)
	{
		$("#again").fadeIn(1500, function() {
			$("#again").css("visibility", "visible");
		})
		text = bak_text;
		clearInterval(intervalId);
	}
}

function display(viewed)
{
	var arr = get_array();
	var count = 0;
	$("#display").append("<table>");
	$("table").append("<tbody>");
	for(var i=0;i<arr.length;i++)
	{
		$("tbody").append('<tr id="' + i + '"></tr>');
		if(i==0)
		{
			length = arr[i] + 1;
		}
		else
		{
			length = arr[i] - arr[i - 1];
		}
		if(length==0)// 空行
		{
			$("#" + i).append('<td id="td_blank"></td>');
		}
		else
		{
			for(var j=0;j<length;j++)
			{
				$("#" + i).append('<td id="td' + count + '" onclick="inverse('+ count +')" ></td>');
				count++;
			}
		}
	}
	
	if(viewed==0)
	{
		(function(){
			intervalId = setInterval(function()
			{
				disp()
			}, 500)
		})();
	}
	else if(viewed==1)
	{
		for(var i=0;i<arr[arr.length-1]+1;i++)
		{
			disp();
		}
	}
	
}


function setCookie()
{
	document.cookie = "viewed=yes";
}


function getCookie()
{
	var cookie = document.cookie;
	if(cookie=="")
	{
		return 0;
	}
	else
	{
		return 1;
	}
}


function deleteCookie()
{
	document.cookie = "";
}


(function main()
{
	count = 0;
	index = 0;
	intervalId = "";
	text = "kkkkkkkkkk\n\nadasdasd\nzxcvb\nzxc";  //length 包含\n
	bak_text = text;
	var viewed = getCookie();

	$.ajax({
		type: "GET",
		url: "A deep-sworn vow_utf8.txt",
		contentType: "text/html; charset=utf8",
		success: function(msg){
			text = msg;
			bak_text = text;
			$(document).ready(function(){
				display(viewed);
			})
		}			
	})

	setCookie();

	$(document).ready(function(){
		$("#again").bind("click",function(){
			$("#again").css("visibility", "hidden");			  
			count = 0;
			index = 0;
			intervalId = "";
			$("#display").text("");
			display(0);
		})
	})
})();