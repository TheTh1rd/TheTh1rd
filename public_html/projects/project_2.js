class Plan {
	constructor(planName, catYear, major, studentName,  currSemester) {
		this.planName = planName;
		this.catYear = catYear;
		this.major = major;
		this.studentName = studentName;
		this.currSemester = currSemester;
		this.courses = [];
		this.years = [];
	}
	addCourse(number, name, term, year) {
        var mycourse = new course(number, name, term, year);
        this.courses.push(mycourse);
	}

    convertPlan() {
		let i = 0;
	    for (i = 0; i < this.courses.length; i++) {
	    	let curCourse = this.courses[i];
            if(this.years[curCourse.year] === undefined || this.years[curCourse.year] === null){
                this.years[curCourse.year] = new year(curCourse.year);    
            }
            if(curCourse.term === "Fall"){
                this.years[curCourse.year].fa.push(curCourse);
            }
            else if(curCourse.term === "Spring"){
                this.years[curCourse.year].sp.push(curCourse);
            }
            else {
                this.years[curCourse.year].su.push(curCourse);
            }
            
	    }
    }
}





class course {
	constructor(number, name, term, year) {
		this.number = number;
		this.name = name;
		this.term = term;
		this.year = year;
	}
}


class year {
	constructor(year) {
		this.year = year;
		this.fa = [];
		this.sp = [];
		this.su = [];
	}
}




function makePlan() {
	var currPlan = new Plan("default", 2014, "Computer Engineering", "Lorenzo Pizarro", "Spring 2018");
	currPlan.addCourse("EGGN-1110", "The Engineering Profession", "Fall", "2014");
    currPlan.addCourse("CHEM-1050", "Chemistry for Engineers", "Fall", "2014");
    currPlan.addCourse("EGCP-1010", "Digital Logic Design", "Fall", "2015");
    currPlan.addCourse("CS-1210", "C++ Programming", "Spring", "2015");
    currPlan.addCourse("MATH-1710", "Calculus I", "Spring", "2015");
    currPlan.addCourse("PHY-2110", "General Physics I", "Spring", "2015");
    currPlan.addCourse("MATH-1720", "Calculus II", "Spring", "2015");
    currPlan.addCourse("CS-1220", "OBJ-Orient Design/C++", "Fall", "2015");
    currPlan.addCourse("EGME-2570", "Statics & Dynamics", "Fall", "2015");
    currPlan.addCourse("CS-2210", "Data Struct Using Java", "Spring", "2016");
    currPlan.addCourse("PHY-2120", "General Physics II", "Fall", "2015");
    currPlan.addCourse("EGCP-3210", "Computer Architecture", "Spring", "2016");
    currPlan.addCourse("EGEE-2010", "Circuits", "Spring", "2016");
    currPlan.addCourse("EGCP-2120", "Microcontrollers", "Fall", "2016");
    currPlan.addCourse("CS-3410", "Algorithms", "Fall", "2016");
    currPlan.addCourse("EGEE-3110", "Linear Systems", "Fall", "2017");
    currPlan.addCourse("EGEE-3210", "Electronics I", "Fall", "2016");
    currPlan.addCourse("BTGE-3755", "Theology I", "Fall", "2017");
    currPlan.addCourse("EGCP-4210", "Adv Computer Architecture", "Fall", "2017");
    currPlan.addCourse("EGCP-4810", "Sr Design", "Fall", "2017");
    currPlan.addCourse("MATH-3110", "Prob & Stats", "Spring", "2018");
    currPlan.addCourse("EGME-3170", "Thermal Systems", "Spring", "2018");
	currPlan.convertPlan();
    
    var html = "";
    var j= 0;
    for( i = 2014; i<currPlan.years.length; i++){
       let curYear =  currPlan.years[i];
	   
	   if(curYear.sp.length != undefined){
		if(curYear.sp.length > 0){
		 // spring
			 html += "<div class=\"grid_3 box\">";
			 html += "<label class=\"semester\">Spring  " + curYear.year + "</label><hr>";
			 html += "<ul class=\"small\">";
			 for (j = 0; j < curYear.sp.length; j++) {
				 html += "<li>" + curYear.sp[j].designator + " " + curYear.sp[j].name + "</li>";
			 }
			 html += "</ul></div>";
		 }
	   }
		if(curYear.su.length != undefined){
		if(curYear.su.length > 0){
			// summer
			html += "<div class=\"grid_3 box\">";
			html += "<label class=\"semester\">Summer " + curYear.year + "</label><hr>";
			html += "<ul class=\"small\">";
			for (j = 0; j < curYear.su.length; j++) {
				html += "<li>" + curYear.su[j].designator + " " + curYear.su[j].name + "</li>";
			}
			html += "</ul></div>";
		}
		}
		
		if(curYear.fa.length != undefined){
		if(curYear.fa.length > 0){
			// fall
			html += "<div class=\"grid_3 box\">";
			html += "<label class=\"semester\">Fall " + curYear.year + "</label><hr>";
			html += "<ul class=\"small\">";
			for (j = 0; j < curYear.fa.length; j++) {
				html += "<li>" + curYear.fa[j].designator + " " + curYear.fa[j].name + "</li>";
			}
			html += "</ul></div>";
		}
		}
    }
    
    
    
    //document.getElementByClass("classes").innerHtml = html;
    let derp2 = document.getElementById("classes");
	derp2.innterHTML = html;
    

}







































//var html = "";
//    for (var index = "2014"; index < myPlan.yearsAndTerms.length-1; index++) {   ///     FIX START VALUE
//        let semester = myPlan.yearsAndTerms[index];
//        var mainDiv = document.getElementById("courses");
//        var incrementIndex = (Number(index) + 1).toString();
//        //add a year and then fall  **************************************** SHOULD BE ONE LESS
//        html += "<div class=\"year\" id=" + incrementIndex + "><div class=\"semester\" id=\"Fall\"><b> Fall " + index + "</b>";
//        for (var i = 0; i < semester.fall.length; i++) {
//            let course = semester.fall[i];
//            html += "<br>" + course.number + " " + course.name;
//        }
//        //add spring
//        if (index < "2018") {
//            semester = myPlan.yearsAndTerms[incrementIndex];
//            html += "</div><div class=\"semester\" id=\"Spring\"><b> Spring " + incrementIndex + "</b>";
//            for (var i = 0; i < semester.spring.length; i++) {
//                let course = semester.spring[i];
//                html += "<br>" + course.number + " " + course.name;
//            }
//            //add summer
//            html += "</div><div class=\"semester\" id=\"Summer\"><b> Summer " + incrementIndex + "</b>";
//            for (var i = 0; i < semester.summer.length; i++) {
//                let course = semester.summer[i];
//                html += "<br>" + course.number + " " + course.name;
//            }
//        }
//        html += "</div>";
//    }
//    mainDiv.innerHTML = html;
//
//
//planObject = {
//    "Plan name" : "whatever that is",
//    "Catalog year" : "2015",
//    "Major" : "Computer Engineering"
//    "Student name" : "stuff",
//    "Current semester" : "Fall 2014",
//    "Course objects": [{
//            "term" : "Fall",
//            "year" : "2014",
//            "course designator" : "EGGN-1110",
//            "course name" : "The Engineering Profession"
//        },{
//            "term" : "Fall",
//            "year" : "2014",
//            "course desognator" : "CHEM-1050",
//            "course name" : "Chemistry for Engineers"       
//        },{
//            "term" : "Fall",
//            "year" : "2014",
//            "course desognator" : "COM-1100",
//            "course name" : "Fundamentals of Speech"             
//        }   
//    ]
//};


//function makePlan() {
//	var currPlan = new Plan("default", 2017, "Computer Science", "Joe Schmoe", 2018, "FA");
//	currPlan.addCourse("CS-2210", "Java", "fa", 2018);
//	currPlan.addCourse("CS-3220", "Web Apps", "sp", 2018);
//	currPlan.addCourse("CS-3510", "Compiler", "sp", 2017);
//
//	currPlan.convertPlan();
//	var curr = document.getElementById("main");
//	var html = currPlan.courses["CS-3220"].name;
//	var html = currPlan.years["2018"].fa["CS-2210"].name;
//	var text = document.createTextNode(html);
//	curr.appendChild(text);	
//}
//
//
//class Plan {
//	constructor(name, catYear, major, student,  currSemester) {
//		this.name = name;
//		this.catYear = catYear;
//		this.major = major;
//		this.student = student;
//		this.currSemester = currSemester;
//		this.courses = [];
//		this.years = [];
//	}
//	addCourse(number, name, term, year) {
//		this.courses[number] = new Course(number, name, term, year);
//
//	}
//	convertPlan() {
//	    for (var key in this.courses) {
//	    	var course = this.courses[key];
//	    	var currYear = course.year;
//	    	if (this.years[currYear] == undefined){
//			this.years[currYear] = new Year(currYear);
//	    	}
//	    	if (course.term == "fa"){
//			this.years[currYear].fa[course.number] = course;
//	    	}
//	    	else if (course.term == "sp"){
//			this.years[currYear].sp[course.number] = course;
//	    	}
//	    	else {
//			this.years[currYear].su[course.number] = course;
//	    	}
//	    }
//	}
//}
//
//class Course {
//	constructor(number, name, term, year) {
//		this.number = number;
//		this.name = name;
//		this.term = term;
//		this.year = year;
//	}
//}
//
//
//class Year {
//	constructor(year) {
//		this.year = year;
//		this.fa = {};
//		this.sp = {};
//		this.su = {};
//	}
//}

