class Plan {
	constructor(pname, year, major, sname, current, courses, years) {
		this.pname = pname;
		this.year = year;
		this.major = major;
		this.sname = sname;
		this.current = current;
		this.courses = courses;
		this.years = years;
	}
	
	addCourse(newCourse) {
		this.courses.push(newCourse);
	}
		
}

class Course {
	constructor(term, year, designator, name) {
		this.term = term;
		this.year = year;
		this.designator = designator;
		this.name = name;
	}
	
	getTerm() {
		return this.term;
	}
}

class Year {
	constructor(year, FA, SP, SM) {
		this.year = year;
		this.FA = FA;
		this.SP = SP;
		this.SM = SM;
	}
}