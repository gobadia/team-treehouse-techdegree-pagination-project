/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/


showPage(data, 1);
addPagination(data);




//document.getElementsByClassName('student-list')[0].innerHTML = output.join('');

document.addEventListener('DOMContentLoaded',(e)=>{
  const header = document.querySelector('.header');
  const searchBox = `<label for="search" class="student-search">
    <input id="search" placeholder="Search by name...">
    <button type="button" class='search'><img src="img/icn-search.svg" alt="Search icon"></button>
  </label>`;

  header.insertAdjacentHTML('beforeend',searchBox);


  let searchInput = document.getElementsByClassName('student-search')[0];

  searchInput.addEventListener('click', (e)=>{
    //e.querySelector('input');
    console.log('search: ' + searchInput.querySelector('input').value);
    searchStudents(searchInput.querySelector('input').value);
  });




  document.addEventListener('click', (e)=>{
    //console.log(e.target.parentElement.className);
    const currentPage = document.querySelector('.active');
    if(e.target.tagName ==='BUTTON' && e.target.className !=='search' && e.target.parentElement.className!=='search'){
      console.log("button clicked");
      const page = e.target.innerText;
      currentPage.className ='';
      e.target.className = 'active';
      showPage(data,page);
    }
  });

  document.addEventListener('keyup', (e)=>{
    searchStudents(e.target.value.toLowerCase());
});


}); //ENDS ON LOAD EVENT LISTENER

function searchStudents(input){
  //let input = e.target.value.toLowerCase();
  console.log(`KeyUp: ${input}`);
//  if(e.target.id ==='search'){
  let filteredList = [];

  for(let i=0; i<data.length; i++){
    if(data[i].name.first.toLowerCase().indexOf(input) >=0 || data[i].name.last.toLowerCase().indexOf(input) >=0){
      filteredList.push(data[i]);
    }
  }
  if(filteredList.length >0){
    showPage(filteredList, 1);
    addPagination(filteredList);
  }
  else{
    document.getElementsByClassName('student-list')[0].innerText = 'No Students Match Your Search. Please restart your search.'
    addPagination(filteredList);
  }

//    }

}

function buildStudentBlock(student){
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

  const ul = document.getElementsByClassName('student-list')[0];
  ul.innerHTML = '';

  let output =[];

  for(let i = startIndex; i< endIndex; i++){
    let li = buildStudentBlock(list[i]);
    ul.insertAdjacentHTML('beforeend',li);
    //output.push(buildStudentBlock(list[i]));
  }

  //ul.innerHTML = output.join('');
}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list){
  const countOfStudents = list.length;
  let countOfPages = Math.floor(countOfStudents / 9);
  if(countOfStudents%9>0){
    countOfPages+=1;
  }
  let linkList = document.getElementsByClassName('link-list')[0];
  linkList.innerHTML = '';

  for(let i=0;i<countOfPages;i++){
    let LI = document.createElement('li');
    let paginationButton = document.createElement('button');
    paginationButton.innerText = i+1;
    if(i===0){
      paginationButton.className = 'active';
    }
    LI.appendChild(paginationButton);
    linkList.appendChild(LI);
    //<button type="button" class="active">1</button>
  }

}



// Call functions
