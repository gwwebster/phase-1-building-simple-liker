const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

let likeButtons = document.getElementsByClassName('like-glyph')

Array.from(document.getElementsByClassName('like-glyph')).forEach( item => {
  item.addEventListener('click', handleHeart)
});


function handleHeart(e) {
    mimicServerCall()
    .then(() => {
      if (e.target.textContent === EMPTY_HEART) {
        e.target.textContent = FULL_HEART
        e.target.className = 'activated-heart'
      } else if (e.target.textContent === FULL_HEART) {
        e.target.textContent = EMPTY_HEART
        e.target.classList.remove('activated-heart')
      }
    })
    .catch((error) => {
      let errorBanner = document.querySelector('#modal')
      let errorMessage = document.querySelector('#modal-message')
      errorBanner.classList.remove('hidden')
      errorMessage.textContent = error
      setTimeout(() => errorBanner.className = 'hidden', 3000)
    })
    
}



//------------------------------------------------------------------------------
// This function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
