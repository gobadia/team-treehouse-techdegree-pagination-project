/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

showPage(data, 1);
addPagination(data);

document.addEventListener('DOMContentLoaded',(e)=>{

  //Get page Header and insert search box
  const header = document.querySelector('.header');
  const searchBox = `<label for="search" class="student-search">
    <input id="search" placeholder="Search by name...">
    <button type="button" class='search'><img src="img/icn-search.svg" alt="Search icon"></button>
  </label>`;

  //append search box to header
  header.insertAdjacentHTML('beforeend',searchBox);

  //get the search field
  let searchField = document.getElementsByClassName('student-search')[0];
  //get pagination div
  let pagination = document.getElementsByClassName('pagination')[0];

  //add click listener on search button. Using full search field.
  searchField.addEventListener('click', (e)=>{
    //get the input value
    let input = searchField.querySelector('input').value;

    //Only search on click if there is an input value
    if(input.length > 0){
      //filter students based on search
      searchStudents(input);
    }
  });
 // add keyup listener to search field to update page as keys are typed
  searchField.addEventListener('keyup', (e)=>{
    //filter student list with input
    searchStudents(e.target.value.toLowerCase());
});

  // update page when new page # in pagination is clicked
  pagination.addEventListener('click', (e)=>{
    //console.log(e.target.parentElement.className);
    const currentPage = document.querySelector('.active');
    // check if click is on button and for precision, filter out clicks that could be the search box
    if(e.target.tagName ==='BUTTON' && e.target.className !=='search' && e.target.parentElement.className!=='search'){
      //get page number from pagination
      const page = e.target.innerText;
      //change the class to remove highlighting on current page, update to new page
      currentPage.className ='';
      e.target.className = 'active';
      //show new page
      showPage(data,page);
    }
  });




}); //ENDS ON LOAD EVENT LISTENER
function searchStudents(input){

  //create an empty array to store list of students matching search input
  let filteredList = [];
  // loop through full student list to filter for input
  for(let i=0; i<data.length; i++){
    // get first name, last name and then combin them
    const firstName = data[i].name.first.toLowerCase();
    const lastName = data[i].name.last.toLowerCase();
    const firstAndLast = `${firstName} ${lastName}`;
    // if input is in firstAndLast then add it to filteredList array
    if(firstAndLast.indexOf(input) >=0){
      filteredList.push(data[i]);
    }
  }
  //if there are matching students return them and update pagination else print not found
  if(filteredList.length >0){
    showPage(filteredList, 1);
    addPagination(filteredList);
  }
  else{
    document.getElementsByClassName('student-list')[0].innerText = 'No results found.';
    addPagination(filteredList);
  }
}

function buildStudentBlock(student){
  //template the student block list to avoid repetition
  const studentBlock = `<li class="student-item cf">
    <div class="student-details">
      <img class="avatar" src="${student.picture.thumbnail}" alt="Profile Picture">
      <h3>${student.name.first} ${student.name.last}</h3>
      <span class="email">${student.email}</span>
    </div>
    <div class="joined-details">
      <span class="date">Joined ${student.registered.date}</span>
    </div>
  </li>`;

  return studentBlock;
}

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page){
  const startIndex = (page *9) - 9 ;
  const endIndex = (page * 9 <= list.length) ? page *9 : list.length;

  //get student-list div from page
  const ul = document.getElementsByClassName('student-list')[0];
  ul.innerHTML = '';

  // for each student, build the student block with template and append to the page
  for(let i = startIndex; i< endIndex; i++){
    let li = buildStudentBlock(list[i]);
    ul.insertAdjacentHTML('beforeend',li);
  }
}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list){
  const countOfStudents = list.length;
  //count number of pages needed by dividing number of students in list by 9
  let countOfPages = Math.floor(countOfStudents / 9);
  //if there's a remainder, add a page with that number of students
  if(countOfStudents%9>0){
    countOfPages+=1;
  }
  //get pagination section
  let linkList = document.getElementsByClassName('link-list')[0];
  //clear pagination section
  linkList.innerHTML = '';

  //use loop to create buttons for pagination based on count of pages needed
  for(let i=0;i<countOfPages;i++){
    let LI = document.createElement('li');
    let paginationButton = document.createElement('button');
    //set the text of the button to the page number
    paginationButton.innerText = i+1;
    //if it's the first page, set class to active to highlight
    if(i===0){
      paginationButton.className = 'active';
    }
    //add the button the to list item
    LI.appendChild(paginationButton);
    //add the list item to the page
    linkList.appendChild(LI);
  }

}



// Call functions
