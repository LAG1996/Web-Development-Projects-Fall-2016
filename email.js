$(function() {

	emailCount = 0
	headerArray = []
	$(function()
	{
		//Loading in the email list and then outputting on the screen as email warning headers
		$.ajax({
			dataType: "json",
			url: "email_list.js",
			success: function(result)
			{
				headerArray = result
				$.each(result, function(i, val){
					tr = $("<tr>").attr("class", "warning email-header").attr("id", val.id)
					tr.append($("<td>").attr("id", val.sender).text(val.sender))
					tr.append($("<td>").attr("id", val.subject).text(val.subject))
					tr.append($("<td>").attr("id", val.timestamp).text(val.timestamp))
					tr.click(function(){importBody($(this).attr("id"))})
					$("#inbox").append(tr)
				})
			}
		}).fail(function(){console.log("it didn't work")})
	})
	// show/hide emails when click on headers
	$("tr.email-header").click(function(){
		console.log("clicked header")
		$(this).next().eq(0).toggle();
	});

	// hide email on click
	$("tr.email-body").click(function(){
		console.log("clicked body")
		$(this).hide();
	});
})

function importBody(id)
{
	importedBody = false
	for(i = 0; i < headerArray.length; i++)
	{
		if(headerArray[i].id == id)
		{
			console.log("found object")
			if(headerArray[i].importedBody == "true")
			{
				console.log("have imported body")
				importedBody = true
			}
			else
			{
				console.log("Have not imported body yet")
				headerArray[i].importedBody = "true"
			}
		}
	}
	console.log(id)
	
	if(!importedBody)
	{
		$.ajax({
			dataType: "json",
			url: id + ".js",
			success: function(result)
			{
				console.log(result)
				tr = $("<tr>").attr("class", "email-body").attr("id", result.id + "BODY")
				tr.append($("<td>").attr("colspan", "3").append($("<p>").text("To: "+result.recipient)).append($("<p>").text(result.body)))
				tr.insertAfter($("#"+id))
				tr.click(function(){$(this).hide()})
				tr.show()
			}
		}).fail(function(){console.log("No good")})
	}
	else
	{
		$("#"+id+"BODY").toggle()
	}
}
