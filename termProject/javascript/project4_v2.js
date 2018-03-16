function load() {

  // start up matrix animation
  loadMatrix();

  // load in the rest of the page
  // fade out box
  $("#page").slideUp(1000);
  $("#page").hide();

  // $("#page").load("apeShell.html", validate());
  validate();
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

      // create catalog search
      var catalog = JSON.parse(this.responseText).catalog;
      catalog = Object.values(catalog.courses);
      var cataloghtml = createCatalogSearch(catalog);
      var lrTable = document.getElementById('derp');
      lrTable.innerHTML = cataloghtml;
      settupTable();


      // create plan
      var plan = JSON.parse(this.responseText).plan;
      plan = castPlan(plan);
      plan = convertPlan(plan);
      var planhtml = loadHtml(plan, catalog);
      var classes = document.getElementById('classes');
      classes.innerHTML = planhtml

    }
  };
  xhttp.open("GET", "/~gallaghd/cs3220/termProject/getCombined.php", true);
  xhttp.send();


  var xhttp1 = new XMLHttpRequest();
  xhttp1.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

      // create plan
      var data = JSON.parse(this.responseText);
      var core = data.categories.Core.courses;
      var electives =data.categories.Electives.courses;
      var cognates = data.categories.Cognates.courses;
      var navDiv = document.getElementById("nav");
      var derpHTML = "";
      //derpHTML += "<div id=\"accordion-resizer\" class=\"ui-widget-content\" style = \"height: 100%\">";
      derpHTML += "<div id=\"accordion\"  class = \"stopIt\">";
      derpHTML += "<h3>Core</h3>";
      derpHTML += "<div>";
      derpHTML += "<ul>";
      for(var k = 0; k< core.length; k++){
        derpHTML += "<li>"+ core[k] +"</li>";
      }
      derpHTML += "</ul>";
      derpHTML += "</div>";
      derpHTML += "<h3>Electives</h3>";
      derpHTML += "<div>";
      derpHTML += "<ul>";
      for(var l = 0; l< electives.length; l++){
        derpHTML += "<li>"+ electives[l] +"</li>";
      }
      derpHTML += "</ul>";
      derpHTML += "</div>";
      derpHTML += "<h3>Cognates</h3>";
      derpHTML += "<div>";
      derpHTML += "<ul>";
      for(var m = 0; m< cognates.length; m++){
        derpHTML += "<li>"+ cognates[m] +"</li>";
      }
      derpHTML += "</ul>";
      derpHTML += "</div>";
      derpHTML += "</div>";
      derpHTML += "<div class = \"clearboth\"></div>";


      navDiv.innerHTML = derpHTML;


      $( "#accordion" ).accordion({
        collapsible:true,
        active : 'none',
        heightStyle: "content",
        autoHeight: true,
        navigation: true
        });
    }
  };
  xhttp1.open("GET", "/~gallaghd/cs3220/termProject/getRequirements.php", true);
  xhttp1.send();
}


// ---------------------------- table stuff ------------------------------------
function settupTable() {

  $('catalogTable tr').hover(function() {
    $(this).find('td').addClass('hovered');
  }, function() {
    $(this).find('td').removeClass('hovered');
  });

  //default each row to visible
  $('tbody tr').addClass('visible');

  $('#filter').keyup(function(event) {
      //if esc is pressed or nothing is entered
      if (event.keyCode == 27 || $(this).val() == '') {
        //if esc is pressed we want to clear the value of search box
        $(this).val('');

        //we want each row to be visible because if nothing
        //is entered then all rows are matched.
        $('tbody tr').removeClass('visible').show().addClass('visible');
      }

      //if there is text, lets filter
      else {
        filter('tbody tr', $(this).val());
      }
    });
}

//filter results based on query
function filter(selector, query) {
  query =   $.trim(query); //trim white space
  query = query.replace(/ /gi, '|'); //add OR for regex query

  $(selector).each(function() {
    ($(this).text().search(new RegExp(query, "i")) < 0) ? $(this).hide().removeClass('visible') : $(this).show().addClass('visible');
  });
}



function createCatalogSearch(cat) {
  var html = "";

  html += "<label for=\"filter\">Filter: </label>"
  html += "<input type=\"text\" name=\"filter\" value=\"\" id=\"filter\" />";

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

    // first correct for differing formats
    if (plan.courses[i].term == "Spring" || plan.courses[i].term == "Summer") {
      var convert = parseInt(plan.courses[i].year) - 1;
      convert = convert.toString();
      plan.courses[i].year = convert;
    }

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

function loadHtml(plan , catalog) {
  var html = "<!-- generated html -->";
  var year = 0;


  // iterate through each year
  for (i = 0; i < plan.years.length; i++) {
    year = plan.years[i];

    //find credit hours;
    for (j = 0; j < year.FA.length; j++) {
      for(w = 0; w < catalog.length; w++ ){
        if(catalog[w].id == year.FA[j].designator){
          year.FA[j].name = catalog[w].name;
        }
      }
    }
    for (j = 0; j < year.SP.length; j++) {
      for(w = 0; w < catalog.length; w++ ){
        if(catalog[w].id == year.SP[j].designator){
          year.SP[j].name = catalog[w].name;
        }
      }
    }
    for (j = 0; j < year.SM.length; j++) {
      for(w = 0; w < catalog.length; w++ ){
        if(catalog[w].id == year.SM[j].designator){
          year.SM[j].name = catalog[w].name;
        }
      }
    }





    //if(year.FA.length > 0){
    // fall
    html += "<div class=\"grid_3 box\">";
    //html += "<p class=\"alignleft\"><b>Fall " + year.year + "</p>";
		//html += "<p class=\"alignright\">Hours: xx</p>";
    html += "<label class=\"semester\">Fall " + year.year + "<p class=\"alignright\">Hours: " + year.FA.length*3 + "</p></label><hr>";
    //html += "<lav class=\"semester\"><p class=\"alignright\">Hours: " + year.FA.length*3 + "</p></div><hr>";
    //html += "<label class=\"semester\">Fall " + year.year + "</label><hr>";
    html += "<ul class=\"small\">";
    for (j = 0; j < year.FA.length; j++) {
      for(w = 0; w < catalog.length; w++ ){
        if(catalog[w].id == year.FA[j].designator){
          year.FA[j].name = catalog[w].name;
        }
      }
      html += "<li>" + year.FA[j].designator + " " + year.FA[j].name + "</li>";
    }
    html += "</ul></div>";
    //}

    //if(year.SP.length > 0){
    // spring
    html += "<div class=\"grid_3 box\">";
    html += "<label class=\"semester\">Spring  " + (parseInt(year.year) + 1) + "<p class=\"alignright\">Hours: " + year.SP.length*3 + "</p></label><hr>";
    html += "<ul class=\"small\">";
    for (j = 0; j < year.SP.length; j++) {
      for(w = 0; w < catalog.length; w++ ){
        if(catalog[w].id == year.SP[j].designator){
          year.SP[j].name = catalog[w].name;
        }
      }
      html += "<li>" + year.SP[j].designator + " " + year.SP[j].name + "</li>";
    }
    html += "</ul></div>";
    //}


    //if(year.SM.length > 0){
    // summer
    html += "<div class=\"grid_3 box\">";
    html += "<label class=\"semester\">Summer " + (parseInt(year.year) + 1) + "<p class=\"alignright\">Hours: " + year.SM.length*3 + "</p></label><hr>";
    html += "<ul class=\"small\">";
    for (j = 0; j < year.SM.length; j++) {
      for(w = 0; w < catalog.length; w++ ){
        if(catalog[w].id == year.SM[j].designator){
          year.SM[j].name = catalog[w].name;
        }
      }
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

  // overwrite inner html
  var newPage = document.getElementById("page");
  var html ="";// "<div id =\"header\"><h1 style=\"display:inline-block\">ORACLE</h1><li><a href=\"login/logout.php\">logout<a></li><li>Options<div class=\"dropdown1 \"><ul><li><a style =\"padding: 15px 20 px;\" href=\"http://judah.cedarville.edu\">PCA</a></li><li><a href=\"projects/cornDogsA.html\">Part 2</a></li></ul></div></li><li>Login</li><li>Catalog Year :</li><li>Major :</li><li>Student Name : </li><?php echo '<li>php Name : </li>'?> </div>";
  html += "<div id = \"middle\"><div class=\"nav\" id=\"nav\"><label class=\"semester\">Course Requirements</label></div><div id = \"classes\" class=\"classes\" ></div></div>";
  html += "<div id =\"bottum\"><div class=\"missing\" id=\"LL\"></div><div id=\"derp\" class=\"derp\"><h1>Course Finder</h1></div></div>";

  //newPage.innerHTML = html;


  $( "#accordion-resizer" ).resizable();
  $( "#accordion" ).accordion();
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
