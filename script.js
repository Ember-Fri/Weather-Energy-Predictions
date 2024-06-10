// setting image and paragraph size
   const img = document.getElementById("windmill");
   img.width = (22.7 / 100) * screen.width;
   img.height = (17.6/100)*screen.height;
const p = document.querySelector("p.ex1");
   p.style.fontSize = (img.height*16)/135 + "px";

// code for the pie chart
var ctx1 = document.getElementById('myChart1').getContext('2d');

var chart2 = new Chart(ctx1, {
  type: "pie",

  data: {
    labels: ["fossil fuels", "others"],
    datasets: [{
      backgroundColor: ["red", "green"],
      data: [60, 40]
    }]
  },
  options: {

    title: {
      display: true,
      text: "dirty energy source percentage for this hour"
    },
    legend: {
      display: false,
    }
  }
});

// code for the line graph
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {

  type: 'line',


  data: {
    labels: ["0:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
    datasets: [{
      label: "fossil fuel source percentage ",
      borderColor: 'rgb(0, 99, 132)',
      data: [0, 10, 5, 2, 20, 30, 45, 15, 7, 22, 18, 35, 12, 40, 25, 11, 33, 8, 19, 29, 50, 42, 27, 13],
    }]
  },

  
 options: {

  }
});
// code to read and write csv files 
let monthColor;
let hourColor;
let dataPredictions;
let monthData = [];
let hourData = [];
let lineGraphData = [];
function preload () 
  {
    monthColor = loadTable("monthColor.csv","csv","noheader");
    hourColor = loadTable("hourColor.csv","csv","noheader");
    dataPredictions = loadTable("predictions.csv","csv","header");
  }

// declaring required variables  
let i = 1;
let y = (330*screen.height)/768;
let todoList = [];
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let days = [];
let monthCode = [6, 2, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4]
let month31 = [1, 3, 5, 7, 8, 10, 12];
let insideCalendarScene = false;

// reading from calendar csv files and storing the data into arrays
function setup() {

  for (let i = 0 ; i < monthColor.getRowCount(); i++)
  {
    let row = monthColor.getRow(i);

    for (let j = 0; j < monthColor.getColumnCount(); j++)
      {
        monthData[j]  = row.getString(j);
      }
    
  }

  for (let i =0; i < hourColor.getRowCount(); i++)
    {
      hourData[i] = [];
      let hourRow = hourColor.getRow(i);
      for (let j = 0; j < hourColor.getColumnCount(); j++)
        {
          hourData[i][j] = hourRow.getString(j);
        }
    }
  print(hourData);
  print(monthData);

  for (let i = 0; i < 24; i++ )
    {
      let r = dataPredictions.getRow(i);
      let rowData =[]
      for (let j = 0; j < dataPredictions.getColumnCount(); j++)
        {
          rowData.push(r.getString(j));
        }
      lineGraphData.push(rowData);
    }
  print(lineGraphData);
  //code for reminder
  input1 = createInput('Type a todo here');
  input1.position((72.5/100)*screen.width,(35.8/100)*screen.height);
  input1.size(180, 15);
  from = createElement('h4', "From");
  from.position((72.5/100)*screen.width, (36.45/100)*screen.height);
  time1 = createInput('00:00');
  time1.position((1030*screen.width)/1366, (300*screen.height)/768);
  time1.size(35, 15);
  sel1 = createSelect();
  sel1.position((1077*screen.width)/1366, (301*screen.height)/768);
  sel1.option('AM');
  sel1.option('PM');
  to = createElement('h4', "To");
  to.position((1127*screen.width)/1366, (280*screen.height)/768);
  time2 = createInput('00:00');
  time2.position((1147*screen.width)/1366, (300*screen.height)/768);
  time2.size(35, 15);
  sel2 = createSelect();
  sel2.position((1194*screen.width)/1366, (301*screen.height)/768);
  sel2.option('AM');
  sel2.option('PM');
  button = createButton('Add');
  clear = createButton('Clear');
  button.position(input1.x + input1.width, (275*screen.height)/768);
  clear.position(button.x + button.width, (275*screen.height)/768);
  button.mousePressed(addItem);
  clear.mousePressed(clearList);

  textFont('Arial');

  //stores the current month, day and year into variables 
  let m = month();
  let d = day();
  let y = year();

  // checks for leap year
  if (y % 4 == 0) {
    print("yes");

    monthCode[0] = 5;
    monthCode[1] = 1;
  }

  print(dayInWeek(m, 1, y));
  print(numberOfDays(m));
  // creates new Day objects and stores it into an array
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      days.push(new Day(j * (6.5/100)*screen.height + (20/100)*((6.5/100)*screen.height), ((80*(6.5/100)*screen.height)/50) + i * (6.5/100)*screen.height));
    }
  }
// setting colors for the days in the calender 
  let currentDays = dayInWeek(m, 1, y);
  for (let k = 0; k < numberOfDays(m) ; k++)
    {
      
      if (monthData[k] == "r")
      {
        days[currentDays].r = 255;
        days[currentDays].g = 0;
        days[currentDays].b = 0;
      }
      else if (monthData[k] == "g")
      {
         days[currentDays].r = 0;
        days[currentDays].g = 255;
        days[currentDays].b = 0;
      }
      else
      {
         days[currentDays].r = 255;
        days[currentDays].g = 255;
        days[currentDays].b = 0;
      }
      currentDays++;
    }

  // labelling the calender
  if (dayInWeek(m, 1, y) == 0 || m == 2) {
    for (let k = dayInWeek(m, 1, y); k < numberOfDays(m) + dayInWeek(m, 1, y); k++) {

      days[k].label = (k + 1) - dayInWeek(m, 1, y);
      if (k == d + (dayInWeek(m, 1, y) - 1)) {
        days[k].stroke = (8/100)*days[k].w;
      }
    }
  }
  else {
    for (let k = dayInWeek(m, 1, y); k <= numberOfDays(m) + dayInWeek(m, 1, y); k++) {
      days[k].label = (k + 1) - dayInWeek(m, 1, y);
      if (k == d + (dayInWeek(m, 1, y) - 1)) {
        days[k].stroke = (8/100)*days[k].w;
      }
    }
  }

  calendarScene();

}

function draw() {

}

function mouseClicked() {
  // code that changes the scene from calendar to hourly 
  if (dayInWeek(month(), 1, year()) == 0 || month() == 2) {
    
    for (let i = dayInWeek(month(), 1, year()); i < numberOfDays(month()) + dayInWeek(month(), 1, year()); i++) {
      let currentHour = (i - dayInWeek(month(), 1, year()));
      if (insideCalendarScene) {
        if (days[i].isMouseInside()) {
          days[i].hourlyScene();
          
          for (let k = 0; k < 12; k++)
            {  if (k == 0)
                {
                  print(hourData[currentHour][k]);
                  if (hourData[currentHour][k] == "r")
                  {
                    days[i].amHour(12,255,0,0);
                  }
                  else if (hourData[currentHour][k] == "g")
                  {
                    days[i].amHour(12,0,255,0);
                  }
                  else
                  {
                    days[i].amHour(12,255,255,0);
                  }
                }
              else
              {
                if (hourData[currentHour][k] == "r")
                {
                  days[i].amHour(k,255,0,0);
                }
                else if (hourData[currentHour][k] == "g")
                {
                  days[i].amHour(k,0,255,0);
                }
                else
                {
                  days[i].amHour(k,255,255,0);
                }
              }
            }

           for (let k = 12; k < 24; k++)
            {  if (k == 12)
                {
                  if (hourData[currentHour][k] == "r")
                  {
                    days[i].pmHour(12,255,0,0);
                  }
                  else if (hourData[currentHour][k] == "g")
                  {
                    days[i].pmHour(12,0,255,0);
                  }
                  else
                  {
                    days[i].pmHour(12,255,255,0);
                  }
                }
              else
              {
                if (hourData[currentHour][k] == "r")
                {
                  days[i].pmHour(k-12,255,0,0);
                }
                else if (hourData[currentHour][k] == "g")
                {
                  days[i].pmHour(k-12,0,255,0);
                }
                else
                {
                  days[i].pmHour(k-12,255,255,0);
                }
              }
            }

    // draws the outline for the hourly scene
    fill(255, 255, 255);
    strokeWeight(1.5);
    noFill();
    ellipse((100*screen.width)/1366,(210*screen.height)/768, (19.5/100)*screen.height, (19.5/100)*screen.height);
    ellipse((300*screen.width)/1366,(210*screen.height)/768, (19.5/100)*screen.height, (19.5/100)*screen.height);
      for (let i = 0; i < 12; i++) {
      fill(0, 0, 0);
      textSize((2.6/100)*screen.height);
      push();
      translate((100*screen.width)/1366, (210*screen.height)/768);
      rotate(30 * i);
      line(0, 0, ((19.5/100)*screen.height)/2, 0);

      translate((60/100)*(19.5/100)*screen.height, 0);
      rotate(-(30 * i));


      if (i >= 10) {
        text(i - 9, -7, 3);
      }
      else {
        text(i + 3, -7, 3);
      }
      pop();

    }
  
    for (let i = 0; i < 12; i++) {
      fill(0, 0, 0);
      textSize((2.6/100)*screen.height);
      push();
      translate((300*screen.width)/1366, (210*screen.height)/768);
      rotate(30 * i);
      line(0, 0, ((19.5/100)*screen.height)/2, 0);

      translate((60/100)*(19.5/100)*screen.height, 0);
      rotate(-(30 * i));


      if (i >= 10) {
        text(i - 9, (-4.6/100)*((19.5/100)*screen.height), (2/100)*((19.5/100)*screen.height));
      }
      else {
        text(i + 3, (-4.6/100)*((19.5/100)*screen.height), (2/100)*((19.5/100)*screen.height));
      }
      pop();
    }
          
          currentHour++;
          insideCalendarScene = false;

        }
      }

    }
  }
  else {
     
    for (let i = dayInWeek(month(), 1, year()); i <= numberOfDays(month()) + dayInWeek(month(), 1, year()); i++) {
      currentHour = (i - dayInWeek(month(), 1, year()));
      if (insideCalendarScene) {
        if (days[i].isMouseInside()) {
          days[i].hourlyScene();
                
          for (let k = 0; k < 12; k++)
            {  if (k == 0)
                {
                  if (hourData[currentHour][k] == "r")
                  {
                    days[i].amHour(12,255,0,0);
                  }
                  else if (hourData[currentHour][k] == "g")
                  {
                    days[i].amHour(12,0,255,0);
                  }
                  else
                  {
                    days[i].amHour(12,255,255,0);
                  }
                }
              else
              {
                if (hourData[currentHour][k] == "r")
                {
                  days[i].amHour(k,255,0,0);
                }
                else if (hourData[currentHour][k] == "g")
                {
                  days[i].amHour(k,0,255,0);
                }
                else
                {
                  days[i].amHour(k,255,255,0);
                }
              }
            }

           for (let k = 0; k < 12; k++)
            {  if (k == 12)
                {
                  if (hourData[currentHour][k] == "r")
                  {
                    days[i].pmHour(12,255,0,0);
                  }
                  else if (hourData[currentHour][k] == "g")
                  {
                    days[i].pmHour(12,0,255,0);
                  }
                  else
                  {
                    days[i].pmHour(12,255,255,0);
                  }
                }
              else
              {
                if (hourData[currentHour][k] == "r")
                {
                  days[i].pmHour(k-12,255,0,0);
                }
                else if (hourData[currentHour][k] == "g")
                {
                  days[i].pmHour(k-12,0,255,0);
                }
                else
                {
                  days[i].pmHour(k-12,255,255,0);
                }
              }
            }

           
    fill(255, 255, 255);
    strokeWeight(1.5);
    noFill();
    ellipse((100*screen.width)/1366,(210*screen.height)/768, (19.5/100)*screen.height, (19.5/100)*screen.height);
    ellipse((300*screen.width)/1366,(210*screen.height)/768, (19.5/100)*screen.height, (19.5/100)*screen.height);
      for (let i = 0; i < 12; i++) {
      fill(0, 0, 0);
      textSize((2.6/100)*screen.height);
      push();
      translate((100*screen.width)/1366, (210*screen.height)/768);
      rotate(30 * i);
      line(0, 0, ((19.5/100)*screen.height)/2, 0);

      translate((60/100)*(19.5/100)*screen.height, 0);
      rotate(-(30 * i));


      if (i >= 10) {
        text(i - 9, -7, 3);
      }
      else {
        text(i + 3, -7, 3);
      }
      pop();

    }

    for (let i = 0; i < 12; i++) {
      fill(0, 0, 0);
      textSize((2.6/100)*screen.height);
      push();
      translate((300*screen.width)/1366, (210*screen.height)/768);
      rotate(30 * i);
      line(0, 0, ((19.5/100)*screen.height)/2, 0);

      translate((60/100)*(19.5/100)*screen.height, 0);
      rotate(-(30 * i));


      if (i >= 10) {
        text(i - 9, (-4.6/100)*((19.5/100)*screen.height), (2/100)*((19.5/100)*screen.height));
      }
      else {
        text(i + 3, (-4.6/100)*((19.5/100)*screen.height), (2/100)*((19.5/100)*screen.height));
      }
      pop();
    }
          
          currentHour++;
          insideCalendarScene = false;

        }
      }

    }
  }
// code for back button to the calender scene

  if (mouseX > (300*screen.width)/1366 &&
    mouseX < ((300*screen.width)/1366) + ((6.6/100)*screen.width) &&
    mouseY > (350*screen.height)/768 &&
    mouseY < ((350*screen.height)/768 )+ ((5.2/100)*screen.height)) {
    calendarScene();
  }

}
// Writes reminder title
function reminder() {
  fill(0, 0, 0);
  textSize((2.2/100)*screen.width);
  text("Reminders", (screen.width*410)/1366, (screen.height*40)/768);

}
// adds item to the todo list
function addItem() {
  let item = input1.value();
  let startTime = time1.value();
  let amOrPm1 = sel1.value();
  let endTime = time2.value();
  let amOrPm2 = sel2.value();

  let todo = {
    list: createCheckbox(i + '.' + ' ' + item, false),
    time: createElement('h4', ""),
    changeColor: function() {
      if (this.list.checked()) {
        this.list.style('color', '#008000');
        this.time.style('color', '#008000');
      }
      else {
        this.list.style('color', '#FF0000');
        this.time.style('color', '#FF0000');
      }
    }
  };

  todo.list.style('color', '#FF0000');
  todo.time.style('color', '#FF0000');
  todo.list.position((990*screen.width)/1366, y);
  todo.time.position((1005*screen.width)/1366, y);
  todo.time.html('From ' + startTime + ' ' + amOrPm1 + ' To ' + endTime + ' ' + amOrPm2);

  todo.list.changed(todo.changeColor.bind(todo));

  i = i + 1;
  y = y + 40;
  todoList.push(todo);
}
// clears the todo list 
function clearList() {

  for (let i = 0; i < todoList.length; i++) {
    todoList[i].list.remove();
    todoList[i].time.remove();
  }
  todoList = [];
  i = 1;
  y = (330*screen.height)/768;
}

// draws the calendar scene
function calendarScene() {

  let c = createCanvas((54.9/100)*screen.width, (69/100)*screen.height);
  
  
  c.position((42.45/100)*screen.width, (28.64/100)*screen.height);
  textFont('Arial');
  background(220);
  reminder();

  fill(255,0,0);
  rect((2/100)*c.width,(79.2/100)*c.height,(3.77/100)*c.height,(3.77/100)*c.height);
  fill(0,0,0)
  textSize((2/100)*c.width);
  text("More than 40% fossil fuel energy source",(6/100)*c.width,(82.07/100)*c.height);

  fill(255,255,0);
  rect((2/100)*c.width,(85/100)*c.height,(3.77/100)*c.height,(3.77/100)*c.height);
  fill(0,0,0)
  textSize((2/100)*c.width);
  text("More than 25% fossil fuel energy source",(6/100)*c.width,(87.73/100)*c.height);

  fill(0,255,0);
  rect((2/100)*c.width,(90.56/100)*c.height,(3.77/100)*c.height,(3.77/100)*c.height);
  fill(0,0,0)
  textSize((2/100)*c.width);
  text("Less than 25% fossil fuel energy source",(6/100)*c.width,(93.39/100)*c.height);
  
  fill(0, 0, 0);
  textSize((3.3/100)*c.width);
  text(months[month() - 1] + " " + year(), (16/100)*c.width, (7.5/100)*c.height);
  text(" Su    M    Tu    W   Th    F   Sa", (1.3/100)*c.width,(13.2/100)*c.height);

  for (let i = 0; i < 42; i++) {

    textFont('Arial');
    days[i].drawBox();
  }

  days[day() + (dayInWeek(month(), 1, year()) - 1)].drawBox();
  insideCalendarScene = true;
}
// calculates yearCode required for Calendar algorithm 
function yearCode(year) {
  let l = year - 2000;
  let t = (int)((25 / 100) * l);
  return (l + t) % 7;
}

// calculates the day in the week from the current month , date and year
function dayInWeek(month, date, year) {

  let mc = monthCode[month - 1];
  let yc = yearCode(year);
  let r = (mc + date + yc) % 7;
  if (r == 7) {
    return 0;
  }
  else {
    return r;
  }
}

//gives the number of days for current month
function numberOfDays(month) {
  for (let p = 0; p < month31.length; p++) {
    if (month == month31[p]) {
      return 31;
    }
    else if (month == 2) {
      if (year() % 4 == 0) {
        return 29;
      }
      else {
        return 28;
      }
    }
    else {
      return 30;
    }
  }
}
// class for the days in the calendar
class Day {
  constructor(x, y, label, stroke, r, g, b) {
    this.x = x;
    this.y = y;
    this.label = label || "";
    this.stroke = stroke || 1.5;
    this.r = r || 255;
    this.g = g || 255;
    this.b = b || 255;
    this.w =  (6.5/100)*screen.height;
    this.h = (6.5/100)*screen.height;
  }

  drawBox() {

    fill(this.r, this.g, this.b);
    strokeWeight(this.stroke);
    rect(this.x, this.y, this.w, this.h);
    fill(0, 0, 0);
    text(this.label, this.x + ((30/100)*this.w), this.y + ((70/100)*this.h));
  }

  isMouseInside() {
    return mouseX > this.x &&
      mouseX < (this.x + 50) &&
      mouseY > this.y &&
      mouseY < (this.y + 50);

  }
  
  amHour(hour, r, g, b) {

    angleMode(DEGREES);
    
    let startAngle = hour * 30;
    push();
    translate((100*screen.width)/1366,(210*screen.height)/768);
    rotate(startAngle);
    stroke(r, g, b);

    line(0, 0, 0, -(((19.5/100)*screen.height)/2));


    for (let i = 0; i < 30; i++) {
      rotate(1);
      stroke(r, g, b);
      line(0, 0, 0, -((19.5/100)*screen.height)/2);
    }
    pop();

    fill(255, 255, 255);
    strokeWeight(1.5);
    noFill();
    ellipse((100*screen.width)/1366,(210*screen.height)/768, (19.5/100)*screen.height, (19.5/100)*screen.height);
    ellipse((300*screen.width)/1366,(210*screen.height)/768, (19.5/100)*screen.height, (19.5/100)*screen.height);

  }

  pmHour(hour, r, g, b) {
    angleMode(DEGREES);
    
    let startAngle = hour * 30;
    push();
    translate((300*screen.width)/1366,(210*screen.height)/768, (19.5/100)*screen.height);
    rotate(startAngle);
    stroke(r, g, b);

    line(0, 0, 0, -((19.5/100)*screen.height)/2);


    for (let i = 0; i < 30; i++) {
      rotate(1);
      stroke(r, g, b);
      line(0, 0, 0, -((19.5/100)*screen.height)/2);
    }
    pop();
  }

// draws the hourly scene
  hourlyScene() {
    createCanvas((54.9/100)*screen.width, (69/100)*screen.height);
    //750, 530 1366,768
    angleMode(DEGREES);
    background(220);

    reminder();

    fill(255,0,0);
    rect((2/100)*(54.9/100)*screen.width,(79.2/100)*(69/100)*screen.height,(3.77/100)*(69/100)*screen.height,(3.77/100)*(69/100)*screen.height);
    fill(0,0,0)
    textSize((2/100)*(54.9/100)*screen.width);
    text("More than 40% fossil fuel energy source",(6/100)*(54.9/100)*screen.width,(82.07/100)*(69/100)*screen.height);
  
    fill(255,255,0);
    rect((2/100)*(54.9/100)*screen.width,(85/100)*(69/100)*screen.height,(3.77/100)*(69/100)*screen.height,(3.77/100)*(69/100)*screen.height);
    fill(0,0,0)
    textSize((2/100)*(54.9/100)*screen.width);
    text("More than 25% fossil fuel energy source",(6/100)*(54.9/100)*screen.width,(87.73/100)*(69/100)*screen.height);
  
    fill(0,255,0);
    rect((2/100)*(54.9/100)*screen.width,(90.56/100)*(69/100)*screen.height,(3.77/100)*(69/100)*screen.height,(3.77/100)*(69/100)*screen.height);
    fill(0,0,0)
    textSize((2/100)*(54.9/100)*screen.width);
    text("Less than 25% fossil fuel energy source ",(6/100)*(54.9/100)*screen.width,(93.39/100)*(69/100)*screen.height);

    fill(0, 0, 0);
    textSize((3.3/100)*(54.9/100)*screen.width);
    text(month() + "/" + this.label + "/" + year(), (16/100)*(54.9/100)*screen.width, (7.5/100)*(69/100)*screen.height);

    fill(255, 255, 255);
    strokeWeight(4);
    rect((300*screen.width)/1366, (350*screen.height)/768, (6.6/100)*screen.width, (5.2/100)*screen.height);
    fill(0, 0, 0);
    text("BACK",(310*screen.width)/1366,(380*screen.height)/768 );

    textSize((2.6/100)*screen.width);
    textFont('Georgia');
    fill(255, 0, 0);
    text("AM", (4.75/100)*screen.width, (13/100)*screen.height);
    fill(0, 0, 0);
    text("PM", (19.4/100)*screen.width, (13/100)*screen.height);



  }
}

