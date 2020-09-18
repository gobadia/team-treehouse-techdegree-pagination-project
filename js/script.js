/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/


const countOfStudents = data.length;
let countOfPages = Math.floor(countOfStudents / 9);
if(countOfStudents%9>0){
  countOfPages+=1;
}
addPagination(countOfPages);

let activePage = document.querySelector('.active').innerText;

const output = showPage(activePage);

document.getElementsByClassName('student-list')[0].innerHTML = output.join('');


document.addEventListener('click', (e)=>{
  const currentPage = document.querySelector('.active');
  if(e.target.tagName ==='BUTTON'){
    console.log("button clicked");
    const activePage = e.target.innerText;
    currentPage.className ='';
    e.target.className = 'active';
    document.getElementsByClassName('student-list')[0].innerHTML = showPage(activePage).join('');
  }


})






function buildStudentBlock(student){
  console.log(student);
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
function showPage(activePage){
  const firstStudentPosition = (activePage-1)*9;
  const lastStudentPosition = (firstStudentPosition + 9 < data.length) ? firstStudentPosition + 9 : data.length;

  let output =[];
  for(let x = firstStudentPosition; x<lastStudentPosition; x++){
    output.push(buildStudentBlock(data[x]));
  }

  return output;
}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(countOfPages){
  let linkList = document.getElementsByClassName('link-list')[0];
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
