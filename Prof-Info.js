var profName;
var classNum;
var classDesc;
var numArr;

document.addEventListener("click", function(event) {
  var target = event.target;
  console.log(target);
  if (target.matches('td[style="width:800px; text-align:left; "]')){
    classDesc = target.textContent;
    let index = classDesc.indexOf("(");
    classDesc = classDesc.substring(0, index);
    classElem = target.previousElementSibling;
    if(classElem!=null){
      classNum = classElem.textContent.trim();
      numArr = classNum.split(" ");
      console.log(numArr[0] + " " + numArr[numArr.length-1] + classDesc);
    }

  }
  else if (target.matches('td[aria-describedby="search-div-b-table_PERSON_FULL_NAME"]')) {
    profName= target.textContent.trim();
    if(profName== "Instructor" || profName== "Staff" || profName==""){
        profName= null;
    }
    // Perform any other actions or updates based on the hovered professor name
    console.log(profName);
    if(profName){
      var xhttp = new XMLHttpRequest();
      xhttp.open("POST","http://127.0.0.1:5000/scrape", true);
      xhttp.setRequestHeader("Content-Type", "application/json");
      /*xhttp.onreadystatechange = function(){
        if(xhttp.readyState === 4 && xhttp.status === 200) {
          console.log("Data Saved");

        }
      }*/
      var data = JSON.stringify({profName: profName});
      xhttp.send(data);
      setTimeout(() => getResponse(), 2500);

    }

  }
profName= null;
classInfo = null;
});

/*document.addEventListener("mouseout", function(event) {
  // Reset the profNamevariable when the mouse leaves the relevant elements
  profName= null;
  classInfo = null;
});
*/
async function getResponse(){
  var response = await fetch("http://127.0.0.1:5000/scrape");
  var info = await response.json();
  console.log("data: ");
  console.log("Rating: ", info['rating']);
  console.log("WouldTakeAgain: ", info['wouldTakeAgain']);
  console.log("Difficulty: ", info['difficulty']);
}

