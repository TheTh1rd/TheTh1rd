function loadPlan() {
	var plan = makePlan();
	plan = convertPlan(plan);
	
	// load in html of plan
	var html = loadHtml(plan);
	var upr = document.getElementById("upr");
	upr.innerHTML = html;
}

function makePlan() {
	var plan = new Plan("myPlan", "2014", "Computer Engineering", "Ben Wicker", "FA 2018", [], []);
	
	// add courses
	
	// year 1
	plan.addCourse(new Course("FA", "2014", "FA01", "Class 1"));
	plan.addCourse(new Course("FA", "2014", "FA01", "Class 2"));
	plan.addCourse(new Course("FA", "2014", "FA01", "Class 3"));
	plan.addCourse(new Course("FA", "2014", "FA01", "Class 4"));
	
	plan.addCourse(new Course("SP", "2014", "SP01", "Class 1"));
	plan.addCourse(new Course("SP", "2014", "SP01", "Class 2"));
	plan.addCourse(new Course("SP", "2014", "SP01", "Class 3"));
	plan.addCourse(new Course("SP", "2014", "SP01", "Class 4"));
	
	plan.addCourse(new Course("SM", "2014", "SM01", "Class 1"));
	plan.addCourse(new Course("SM", "2014", "SM01", "Class 2"));
	plan.addCourse(new Course("SM", "2014", "SM01", "Class 3"));
	plan.addCourse(new Course("SM", "2014", "SM01", "Class 4"));
	
	// year 2
	plan.addCourse(new Course("FA", "2015", "FA02", "Class 1"));
	plan.addCourse(new Course("FA", "2015", "FA02", "Class 2"));
	plan.addCourse(new Course("FA", "2015", "FA02", "Class 3"));
	plan.addCourse(new Course("FA", "2015", "FA02", "Class 4"));
	
	plan.addCourse(new Course("SP", "2015", "SP02", "Class 1"));
	plan.addCourse(new Course("SP", "2015", "SP02", "Class 2"));
	plan.addCourse(new Course("SP", "2015", "SP02", "Class 3"));
	plan.addCourse(new Course("SP", "2015", "SP02", "Class 4"));
	
	plan.addCourse(new Course("SM", "2015", "SM02", "Class 1"));
	plan.addCourse(new Course("SM", "2015", "SM02", "Class 2"));
	plan.addCourse(new Course("SM", "2015", "SM02", "Class 3"));
	plan.addCourse(new Course("SM", "2015", "SM02", "Class 4"));
	
	// year 3
	plan.addCourse(new Course("FA", "2016", "FA03", "Class 1"));
	plan.addCourse(new Course("FA", "2016", "FA03", "Class 2"));
	plan.addCourse(new Course("FA", "2016", "FA03", "Class 3"));
	plan.addCourse(new Course("FA", "2016", "FA03", "Class 4"));
	
	plan.addCourse(new Course("SP", "2016", "SP03", "Class 1"));
	plan.addCourse(new Course("SP", "2016", "SP03", "Class 2"));
	plan.addCourse(new Course("SP", "2016", "SP03", "Class 3"));
	plan.addCourse(new Course("SP", "2016", "SP03", "Class 4"));
	
	plan.addCourse(new Course("SM", "2016", "SM03", "Class 1"));
	plan.addCourse(new Course("SM", "2016", "SM03", "Class 2"));
	plan.addCourse(new Course("SM", "2016", "SM03", "Class 3"));
	plan.addCourse(new Course("SM", "2016", "SM03", "Class 4"));
	
	// year 4
	plan.addCourse(new Course("FA", "2017", "FA04", "Class 1"));
	plan.addCourse(new Course("FA", "2017", "FA04", "Class 2"));
	plan.addCourse(new Course("FA", "2017", "FA04", "Class 3"));
	plan.addCourse(new Course("FA", "2017", "FA04", "Class 4"));
	
	plan.addCourse(new Course("SP", "2017", "SP04", "Class 1"));
	plan.addCourse(new Course("SP", "2017", "SP04", "Class 2"));
	plan.addCourse(new Course("SP", "2017", "SP04", "Class 3"));
	plan.addCourse(new Course("SP", "2017", "SP04", "Class 4"));
	
	plan.addCourse(new Course("SM", "2017", "SM04", "Class 1"));
	plan.addCourse(new Course("SM", "2017", "SM04", "Class 2"));
	plan.addCourse(new Course("SM", "2017", "SM04", "Class 3"));
	plan.addCourse(new Course("SM", "2017", "SM04", "Class 4"));
	
	return plan;
}

function convertPlan(plan) {
	// iterate over courses
	for (i = 0; i < plan.courses.length; i++) {
		var course = plan.courses[i];
		var index = -1
		
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
		
		html += "<div class=\"year\">";
		
		// fall
		html += "<div class=\"semester\">";
		html += "<p class=\"alignleft\"><b>Fall " + year.year + "</b></p>";
		html += "<p class=\"alignright\">Hours: xx</p><ul>";
		for (j = 0; j < year.FA.length; j++) {
			html += "<li>- " + year.FA[j].designator + " " + year.FA[j].name + "</li>";
		}
		html += "</ul></div>";
		
		// spring
		html += "<div class=\"semester\">";
		html += "<p class=\"alignleft\"><b>Spring " + (parseInt(year.year) + 1) + "</b></p>";
		html += "<p class=\"alignright\">Hours: xx</p><ul>";
		for (j = 0; j < year.SP.length; j++) {
			html += "<li>- " + year.SP[j].designator + " " + year.SP[j].name + "</li>";
		}
		html += "</ul></div>";
		
		// summer
		html += "<div class=\"semester\">";
		html += "<p class=\"alignleft\"><b>Summer " + (parseInt(year.year) + 1)+ "</b></p>";
		html += "<p class=\"alignright\">Hours: xx</p><ul>";
		for (j = 0; j < year.SM.length; j++) {
			html += "<li>- " + year.SM[j].designator + " " + year.SM[j].name + "</li>";
		}
		html += "</ul></div>";
		
		html += "</div>";
	}
	
	return html;
}

function validateForm() {
	var uname = document.logForm.uname.value;
	var pword = document.logForm.pwd.value;
	
	if (uname.length < 5 || pword.length < 5) {
		alert ("Username must be 5 or more characters");
	}
	
	else {
		alert ("Username and Password successfully submitted");
	}
}