function load() {

	var c = document.getElementById("matrix");
	var ctx = c.getContext("2d");

	//making the canvas full screen
	c.height = window.innerHeight;
	c.width = window.innerWidth;

	//chinese characters - taken from the unicode charset
	var chinese = "田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑";
	//converting the string into an array of single characters
	chinese = chinese.split("");

	var font_size = 15;
	var columns = c.width/font_size; //number of columns for the rain
	//an array of drops - one per column
	var drops = [];
	//x below is the x coordinate
	//1 = y co-ordinate of the drop(same for every drop initially)
	for(var x = 0; x < columns; x++)
		drops[x] = 1;

	for (var i = 0; i < drops.length; i++) {
		drops[i] = c.height*font_size;
	}

	//drawing the characters
	function draw()
	{

		var color = getComputedStyle(document.documentElement).getPropertyValue('--text-color');
		//document.documentElement.getPropertyValue('--background-color');

		//Black BG for the canvas
		//translucent BG to show trail
		ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
		ctx.fillRect(0, 0, c.width, c.height);

		ctx.fillStyle = color; //green text
		ctx.font = font_size + "px arial";
		//looping over drops
		for(var i = 0; i < drops.length; i++)
		{
			//a random chinese character to print
			var text = chinese[Math.floor(Math.random()*chinese.length)];
			//x = i*font_size, y = value of drops[i]*font_size
			ctx.fillText(text, i*font_size, drops[i]*font_size);

			//sending the drop back to the top randomly after it has crossed the screen
			//adding a randomness to the reset to make the drops scattered on the Y axis
			if(drops[i]*font_size > c.height && Math.random() > 0.985)
				drops[i] = 0;

			//incrementing Y coordinate
			drops[i]++;
		}
	}

	setInterval(draw, 40);
}

function validate() {
	// prevent page reload
	event.preventDefault();

	// fade out box
	$("#page").slideUp(1000);
	$("#page").hide();

	// overwrite inner html
	var newPage = document.getElementById("page");
	var html = "<div id =\"header\"><h1 style=\"display:inline-block\">Better Academic Planning Enivornment</h1><li>Save</li><li>Options<div class=\"dropdown1 \"><ul><li><a style =\"padding: 15px 20 px;\" href=\"projects/cornDogs.html\">Part 1</a></li><li><a href=\"projects/cornDogsA.html\">Part 2</a></li></ul></div></li><li>Login</li></div>";
  html += "<div id = \"middle\"><div class=\"nav\"><label class=\"semester\">Course Requirements</label></div><div id = \"classes\" class=\"classes\" ></div></div>";
	html += "<div id =\"bottum\"><div class=\"missing\">Validation Status<ul><li><a href=\"http://judah.cedarville.edu/~lpizarr/cs3220.html\">Home</a></li><!--  <li><a href=\"http://judah.cedarville.edu\">PCA</a></li><li><a href=\"cornDogs.html\">The Truth About Corn Dogs</a></li> --></ul></div><div class=\"derp\"><h1>Course Finder</h1></div></div>";

	newPage.innerHTML = html;

	loadPlan();

	$("#header").hide();
	$("#bottum").hide();
	$("#middle").hide();

	$("#page").fadeIn();
	$("#header").slideDown(1000).delay(1000);
	$("#bottum").delay(1500).fadeIn(1000);
	$("#middle").delay(2500).slideDown(1000);


}
