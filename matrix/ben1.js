function loadPlan() {
	//var plan = makePlan();
	var plan;
	plan = loadDoc(plan);
	//plan = makeplan(plan);
	plan = convertPlan(plan);

	// load in html of plan
	var html = loadHtml(plan);
	var upr = document.getElementById("classes");
	upr.innerHTML = html;
}
function loadDoc(plan) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      //document.getElementById("demo").innerHTML =
      plan = JSON.parse(this.responseText).plan;
			return plan;
    }
  };
  xhttp.open("GET", "thatphpthing.txt", true);
  xhttp.send();

}
function makePlan(plan) {
	//var plan = new Plan("myPlan", "2014", "Computer Engineering", "Ben Wicker", "FA 2018", [], []);

	// add courses

	// year 1
	plan.addCourse(new Course("FA", "2014", "EGGN-1110", "The Engineering Profession"));
	plan.addCourse(new Course("FA", "2014", "CHEM-1050", "Chemistry for Engineers"));
	plan.addCourse(new Course("FA", "2014", "COM-1100", "Fundamentals of Speech"));
	plan.addCourse(new Course("FA", "2014", "BGE-1720", "Spiritual Formation"));

	// year 2
	plan.addCourse(new Course("SP", "2015", "MATH-1710", "Calculus I"));
	plan.addCourse(new Course("SP", "2015", "MATH-1720", "Calculus II"));
	plan.addCourse(new Course("SP", "2015", "PHYS-2110", "General Physics I"));
	plan.addCourse(new Course("SP", "2015", "CS-1210", "C++ Programming"));

	plan.addCourse(new Course("SM", "2015", "MATH-2740", "Differential Equations"));
	plan.addCourse(new Course("SM", "2015", "BGE-2730", "Old Testament Literature"));

	plan.addCourse(new Course("FA", "2015", "CS-1220", "OBJ-Oreint Design/C++"));
	plan.addCourse(new Course("FA", "2015", "EGCP-1010", "Digital Logic Design"));
	plan.addCourse(new Course("FA", "2015", "EGME-2750", "Statics & Dynamics"));
	plan.addCourse(new Course("FA", "2015", "PHYS-2120", "General Physics II"));

	plan.addCourse(new Course("SP", "2016", "CS-2210", "Data Struct Using Java"));
	plan.addCourse(new Course("SP", "2016", "EGCP-3210", "Computer Architecture"));
	plan.addCourse(new Course("SP", "2016", "EGEE-2010", "Circuits"));
	plan.addCourse(new Course("SP", "2016", "MATH-2510", "Discrete Math"));

	// year 3
	plan.addCourse(new Course("FA", "2016", "CS-3410", "Algorithms"));
	plan.addCourse(new Course("FA", "2016", "EGCP-2120", "Microcontrollers"));
	plan.addCourse(new Course("FA", "2016", "EGEE-3210", "Electronics I"));
	plan.addCourse(new Course("FA", "2016", "BTGE-2740", "New Testament"));

	plan.addCourse(new Course("SM", "2016", "HUM-1400", "Intro to Humanities"));


	// year 4
	plan.addCourse(new Course("FA", "2017", "BTGE-3755", "Theology I"));
	plan.addCourse(new Course("FA", "2017", "EGCP-4210", "Adv Computer Architecture"));
	plan.addCourse(new Course("FA", "2017", "EGCP-4810", "Sr Design"));
	plan.addCourse(new Course("FA", "2017", "EGGN-4010", "Senior Seminar"));

	plan.addCourse(new Course("SP", "2017", "CS-3310", "Operating Systems"));
	plan.addCourse(new Course("SP", "2017", "EGCP-3010", "Adv Digital Logic Design"));
	plan.addCourse(new Course("SP", "2017", "EGGN-3110", "Professional Ethics"));
	plan.addCourse(new Course("SP", "2017", "EGCP-4250", "CMOS VLSI Design"));

	plan.addCourse(new Course("SM", "2017", "GBIO-1000", "Prin of Biology"));


	plan.addCourse(new Course("SP", "2018", "BTGE-3765", "Theology II"));
	plan.addCourse(new Course("SP", "2018", "MATH-3110", "Prob & Stats"));
	plan.addCourse(new Course("SP", "2018", "EGCP-4820", "Sr Design"));
	plan.addCourse(new Course("SP", "2018", "EGME-3170", "Thermal Systems"));

	return plan;
}

function convertPlan(plan) {
	// iterate over courses
	for (i = 0; i < plan.courses.length; i++) {
		var course = plan.courses[i];
		var index = -1;

		// check to see if year already created
		for (j = 0; j < plan.years.length; j++) {
			if (plan.years[j].year == course.year){
				index = j;
				break;
			}
		}

		// create year if needed
		if (index == -1){
			plan.years.push(new Year(course.year, [], [], []));
			plan.years.sort(function(a, b){return a.year - b.year});
			// get new index
			for (j = 0; j < plan.years.length; j++) {
				if (plan.years[j].year == course.year){
					index = j;
					break;
				}
			}
		}

		// put course in
		if (course.term == "FA") {
			plan.years[index].FA.push(course);
		}
		else if (course.term == "SP") {
			plan.years[index].SP.push(course);
		}
		else {
			plan.years[index].SM.push(course);
		}
	}

	return plan;
}

function loadHtml(plan) {
	var html = "<!-- generated html -->";
	var year = 0;

	// iterate through each year
	for (i = 0; i < plan.years.length; i++){
		year = plan.years[i];




		if(year.SP.length > 0){
		// spring
			html += "<div class=\"grid_3 box\">";
			html += "<label class=\"semester\">Spring  " + year.year + "</label><hr>";
			html += "<ul class=\"small\">";
			for (j = 0; j < year.SP.length; j++) {
				html += "<li>" + year.SP[j].designator + " " + year.SP[j].name + "</li>";
			}
			html += "</ul></div>";
		}


		if(year.SM.length > 0){
			// summer
			html += "<div class=\"grid_3 box\">";
			html += "<label class=\"semester\">Summer " + year.year + "</label><hr>";
			html += "<ul class=\"small\">";
			for (j = 0; j < year.SM.length; j++) {
				html += "<li>" + year.SM[j].designator + " " + year.SM[j].name + "</li>";
			}
			html += "</ul></div>";
		}

		if(year.FA.length > 0){
			// fall
			html += "<div class=\"grid_3 box\">";
			html += "<label class=\"semester\">Fall " + year.year + "</label><hr>";
			html += "<ul class=\"small\">";
			for (j = 0; j < year.FA.length; j++) {
				html += "<li>" + year.FA[j].designator + " " + year.FA[j].name + "</li>";
			}
			html += "</ul></div>";
		}


	}

	return html;
}
