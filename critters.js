var imgs = { 
			 0 : "http://animalcontrolphx.com/wp-content/uploads/2013/05/gophers-400.jpg",
             1 : "http://www.wildanimalfightclub.com/Portals/41405/images/wolv1.jpg",
             2 : "https://www.waikikiaquarium.org/wp-content/uploads/2013/11/octopus_620.jpg"
           }
assoc = { 0 : ["top", "left"],  1 : ["top", "right"], 2 : ["bottom", "left"]}
		   
		   
valWithCoordinate = {}
imageLoaded = {}
indexOfCurrImage = "-1"
animalsOnScreen = false
		   
$(function()
{
	$("#choice").click(function(){handleSelectClick($(this)[0].selectedIndex)})
})

function handleSelectClick(index)
{	
	indexToString = (index-1).toString()
	
	if(index > 0)
	{
		if(!(indexToString in valWithCoordinate))
		{
			valWithCoordinate[indexToString] = []
			$.ajax({
				url: "data" + (index - 1) + ".js",
				dataType: "json",
				success: function(data){
					$.each(data, function(i)
					{
						valWithCoordinate[indexToString].push(data[i])
					})
					
					pasteImages(valWithCoordinate[indexToString], indexToString)
					indexOfCurrImage = indexToString
					console.log(indexToString)
			}
			}).fail(function(){console.log("No animals :(")})
		}
		else if(imageLoaded[indexToString] == "false")
		{
			pasteImages(valWithCoordinate[indexToString], indexToString)
			indexOfCurrImage = indexToString
			console.log(indexToString)
		}
	}
	else
	{
		if(animalsOnScreen)
		{
			$(".critter").remove()
		}
		animalsOnScreen = false
	}
}

function pasteImages(coords, index)
{
		if(animalsOnScreen)
		{
			$(".critter").remove()
		}
		$.each(coords, function(i)
		{
			$("#map-thing").append($("<img>").attr("class", "critter").attr("id", index).attr("src", imgs[index]).css("position", "absolute").css(assoc[index][0], coords[i][0]).css(assoc[index][1], coords[i][1]))
		})
		animalsOnScreen = true
		imageLoaded[index] = "true"
		imageLoaded[indexOfCurrImage] = "false"
}