let previousBtn = document.getElementById('previousBtn')
let nextBtn = document.getElementById('nextBtn')
// let movieContainer = document.getElementById('movieContainer')
let currentPage = 1,
itemsPerPage = 8;
let categoriesData= []
// categoriesDataLength;
const link = 'https://api.tvmaze.com/shows'
async function fetchApi(){
    const response = await fetch(link)
   const  data = await response.json()
    categoriesData = data

}

let movieContainer = document.getElementById('movieContainer');
async function showMovie(){
    await fetchApi()
    movieContainer.innerHTML = ''
    
    let startIndex = (currentPage - 1) * itemsPerPage;
    let endIndex = startIndex + itemsPerPage;
    let showCategory = categoriesData.slice(startIndex, endIndex)
    showCategory.forEach(movie => {
      let    card=document.createElement('div');
      card.className = 'card'
      //  movieName.className = 'movieName'

        let  movieCont = document.createElement('div')
        let  detailsCont = document.createElement('div')
        let  showsCont = document.createElement('div')
        let  movieName = document.createElement('h2')
        let   picture = document.createElement('img')
         let   likeSpan = document.createElement('span')
         let   commentSpan = document.createElement('span')
         let emptyDiv = document.createElement('div')


//     //  let  desc = document.createElement('p')

    commentSpan.classList.add('fa','fa-comment')
    emptyDiv.classList.add('myDiv')
    likeSpan.classList.add('fa','fa-heart')
    picture.className = 'image'
    showsCont.className = 'showsCont'
     picture.src = movie.image.medium
     movieName.textContent = movie.name
    //  desc.innerHTML = movie.summary

// // Inside your showMovie() function, after creating the likeSpan element
likeSpan.classList.add('fa', 'fa-heart', 'inactive');
likeSpan.textContent = '0'; // Set initial value to 0

// Add a click event listener to the like icon
likeSpan.addEventListener('click', () => {
    if (likeSpan.classList.contains('inactive')) {
        likeSpan.classList.remove('inactive');
        likeSpan.classList.add('active');
        likeSpan.style.color = 'red';
        likeSpan.textContent = parseInt(likeSpan.textContent) + 1;
    } else {
        likeSpan.classList.remove('active');
        likeSpan.classList.add('inactive');
        likeSpan.style.color = 'white';
        likeSpan.textContent = parseInt(likeSpan.textContent) - 1;
    }
});


// Inside your showMovie() function, after creating the commentSpan element
commentSpan.classList.add('fa', 'fa-comment');
commentSpan.addEventListener('click', () => {
    const commentBox = document.createElement('div');
    commentBox.className = 'comment-box';

    const commentInput = document.createElement('input');
    commentInput.type = 'text';
    commentInput.placeholder = 'Type your comment...';

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';

    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';

    closeButton.addEventListener('click', () => {
        movieCont.removeChild(commentBox);
    });

    commentBox.append(commentInput, submitButton, closeButton);
    movieCont.appendChild(commentBox);
});


     movieCont.append(picture)
     detailsCont.append(movieName)
     showsCont.append(movieCont, detailsCont)
     card.append(showsCont)
     emptyDiv.append(likeSpan,commentSpan)
     card.append(emptyDiv)
     movieContainer.append(card)

    });
    hide()
}

nextBtn.addEventListener('click', () =>{
    currentPage++
    showMovie()
  })
  previousBtn.addEventListener('click', ()=>{
    currentPage --;
    showMovie();
  })

function hide (){
    if(currentPage === 1){
       previousBtn.style.display = 'none'
    }
    else{
       previousBtn.style.display = 'inline-block'
    }
    let totalNumberOfPages = Math.ceil(categoriesData.length / itemsPerPage);
    if(currentPage === totalNumberOfPages ) {
       nextBtn.style.display = 'none' 
    }
    else{
       nextBtn.style.display = 'initial'
    }
  }
showMovie()


window.addEventListener('DOMContentLoaded')



