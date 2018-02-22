//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++MATRIX CANVIS++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++MATRIX CANVIS++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
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
  var columns = c.width / font_size; //number of columns for the rain
  //an array of drops - one per column
  var drops = [];
  //x below is the x coordinate
  //1 = y co-ordinate of the drop(same for every drop initially)
  for (var x = 0; x < columns; x++)
    drops[x] = 1;

  for (var i = 0; i < drops.length; i++) {
    drops[i] = c.height * font_size;
  }

  function draw() {

    var color = getComputedStyle(document.documentElement).getPropertyValue('--text-color');
    var backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--background-color');

    //Black BG for the canvas
    //translucent BG to show trail
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.fillStyle = color; //green text
    ctx.font = font_size + "px arial";
    //looping over drops
    for (var i = 0; i < drops.length; i++) {
      //a random chinese character to print
      var text = chinese[Math.floor(Math.random() * chinese.length)];
      //x = i*font_size, y = value of drops[i]*font_size
      ctx.fillText(text, i * font_size, drops[i] * font_size);

      //sending the drop back to the top randomly after it has crossed the screen
      //adding a randomness to the reset to make the drops scattered on the Y axis
      if (drops[i] * font_size > c.height && Math.random() > 0.985)
        drops[i] = 0;

      //incrementing Y coordinate
      drops[i]++;
    }
  }

  setInterval(draw, 40);
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++CUSTOM PLAN CLASSES+++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
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
  constructor(term, year, id, name) {
    this.term = term;
    this.year = year;
    this.designator = id;
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

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++SEMESTER BOXES+++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

      // create plan
      var plan = JSON.parse(this.responseText).plan;
      plan = castPlan(plan);
      plan = convertPlan(plan);
      var planhtml = loadHtml(plan);
      var classes = document.getElementById('classes');
      classes.innerHTML = planhtml

      // create catalog search
      var catalog = JSON.parse(this.responseText).catalog;
      catalog = Object.values(catalog.courses);
      var cataloghtml = createCatalogSearch(catalog);
      var lrTable = document.getElementById('derp');
      lrTable.innerHTML = cataloghtml;
    }
  };
  xhttp.open("GET", "/~gallaghd/cs3220/termProject/getCombined.php", true);
  xhttp.send();
}

// ---------------------------- table stuff ------------------------------------
$('catalogTable tr').hover(function() {
  $(this).toggleClass('hover');
});

function createCatalogSearch(cat) {
  var html = "";

  html += "<table cellpadding=\"1\" cellspacing\"1\" id=\"catalogTable\">";

  // header
  html += "<thead><tr>";
  html += "<th>Class</th>";
  html += "<th>Name</th>";
  html += "<th>Description</th>";
  html += "<th>Credits</th>";
  html += "</tr></thead>";

  // table
  html += "<tbody>";
  for (var i = 0; i < cat.length; i++) {
    html += "<tr>";
    html += "<th>" + cat[i].id + "</th>";
    html += "<th>" + cat[i].name + "</th>";
    html += "<th>" + cat[i].description + "</th>";
    html += "<th>" + cat[i].credits + "</th>";
    html += "</tr>";
  }
  html += "</tbody>";

  html += "</table>";

  return html;
}
// ------------------------ end table stuff ------------------------------------

function castPlan(p) {
  var plan = new Plan(p.name, p.currYear, p.major, p.student, p.currTerm, [], []);
  var c = Object.values(p.courses);
  for (var i = 0; i < c.length; i++) {
    plan.addCourse(new Course(c[i].term, c[i].year, c[i].id, ""));
  }
  return plan;
}

function convertPlan(plan) {
  // iterate over courses
  for (i = 0; i < plan.courses.length; i++) {
    var course = plan.courses[i];
    var index = -1

    // check to see if year already created
    for (j = 0; j < plan.years.length; j++) {
      if (plan.years[j].year == course.year) {
        index = j;
        break;
      }
    }

    // create year if needed
    if (index == -1) {
      plan.years.push(new Year(course.year, [], [], []));
      plan.years.sort(function(a, b) {
        return a.year - b.year
      });
      // get new index
      for (j = 0; j < plan.years.length; j++) {
        if (plan.years[j].year == course.year) {
          index = j;
          break;
        }
      }
    }

    // put course in
    if (course.term == "Fall") {
      plan.years[index].FA.push(course);
    } else if (course.term == "Spring") {
      plan.years[index].SP.push(course);
    } else {
      plan.years[index].SM.push(course);
    }
  }

  return plan;
}

function loadHtml(plan) {
  var html = "<!-- generated html -->";
  var year = 0;


  // iterate through each year
  for (i = 0; i < plan.years.length; i++) {
    year = plan.years[i];

    //if(year.FA.length > 0){
    // fall
    html += "<div class=\"grid_3 box\">";
    html += "<label class=\"semester\">Fall " + year.year + "</label><hr>";
    html += "<ul class=\"small\">";
    for (j = 0; j < year.FA.length; j++) {
      html += "<li>" + year.FA[j].designator + " " + year.FA[j].name + "</li>";
    }
    html += "</ul></div>";
    //}

    //if(year.SP.length > 0){
    // spring
    html += "<div class=\"grid_3 box\">";
    html += "<label class=\"semester\">Spring  " + (parseInt(year.year) + 1) + "</label><hr>";
    html += "<ul class=\"small\">";
    for (j = 0; j < year.SP.length; j++) {
      html += "<li>" + year.SP[j].designator + " " + year.SP[j].name + "</li>";
    }
    html += "</ul></div>";
    //}


    //if(year.SM.length > 0){
    // summer
    html += "<div class=\"grid_3 box\">";
    html += "<label class=\"semester\">Summer " + (parseInt(year.year) + 1) + "</label><hr>";
    html += "<ul class=\"small\">";
    for (j = 0; j < year.SM.length; j++) {
      html += "<li>" + year.SM[j].designator + " " + year.SM[j].name + "</li>";
    }
    html += "</ul></div>";
    //}

  }

  return html;
}


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++LOADING THE PAGE+++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function validate() {
  // prevent page reload
  event.preventDefault();

  // fade out box
  $("#page").slideUp(1000);
  $("#page").hide();

  // overwrite inner html
  var newPage = document.getElementById("page");
  var html = "<div id =\"header\"><h1 style=\"display:inline-block\">Better Academic Planning Enivornment</h1><li>Save</li><li>Options<div class=\"dropdown1 \"><ul><li><a style =\"padding: 15px 20 px;\" href=\"projects/cornDogs.html\">Part 1</a></li><li><a href=\"projects/cornDogsA.html\">Part 2</a></li></ul></div></li><li>Login</li></div>";
  html += "<div id = \"middle\"><div class=\"nav\" id=\"nav\"><label class=\"semester\">Course Requirements</label></div><div id = \"classes\" class=\"classes\" ></div></div>";
  html += "<div id =\"bottum\"><div class=\"missing\">Validation Status<ul><li><a href=\"http://judah.cedarville.edu/~lpizarr/cs3220.html\">Home</a></li><!--  <li><a href=\"http://judah.cedarville.edu\">PCA</a></li><li><a href=\"cornDogs.html\">The Truth About Corn Dogs</a></li> --></ul></div><div id=\"derp\" class=\"derp\"><h1>Course Finder</h1></div></div>";

  newPage.innerHTML = html;

  $( function() {
    $( "#accordion" ).accordion({
      collapsible: true
    });
  } );


  var navDiv = document.getElementById("nav");
  var derpHTML = "";

  //derpHTML += "<div id=\"accordion-resizer\" class=\"ui-widget-content\">";
  derpHTML += "<div id=\"accordion\">";
  derpHTML += "<h3>Main</h3>";
  derpHTML += "<div>";
  derpHTML += "<ul>";
  derpHTML += "<li>List item one</li>";
  derpHTML += "<li>List item two</li>";
  derpHTML += "<li>List item three</li>";
  derpHTML += "</ul>";
  derpHTML += "</div>";
  derpHTML += "<h3>Engineering Elective</h3>";
  derpHTML += "<div>";
  derpHTML += "<ul>";
  derpHTML += "<li>List item one</li>";
  derpHTML += "<li>List item two</li>";
  derpHTML += "<li>List item three</li>";
  derpHTML += "</ul>";
  derpHTML += "</div>";
  derpHTML += "<h3>Other stuff</h3>";
  derpHTML += "<div>";
  derpHTML += "<ul>";
  derpHTML += "<li>List item one</li>";
  derpHTML += "<li>List item two</li>";
  derpHTML += "<li>List item three</li>";
  derpHTML += "</ul>";
  derpHTML += "</div>";
  derpHTML += "<h3>Well arent we special</h3>";
  derpHTML += "<div>";
  derpHTML += "<ul>";
  derpHTML += "<li>List item one</li>";
  derpHTML += "<li>List item two</li>";
  derpHTML += "<li>List item three</li>";
  derpHTML += "</ul>";
  derpHTML += "</div>";
  derpHTML += "</div>"
//derpHTML += "</div>";

  navDiv.innerHTML = derpHTML;
  loadDoc();
  //ajaxPlan();

  $("#header").hide();
  $("#bottum").hide();
  $("#middle").hide();

  $("#page").fadeIn();
  $("#header").slideDown(1000).delay(1000);
  $("#bottum").delay(1500).fadeIn(1000);
  $("#middle").delay(2500).slideDown(1000);
}
