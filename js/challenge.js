// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const counter = document.getElementById('counter');
    const plusBtn = document.getElementById('plus');
    const minusBtn = document.getElementById('minus');
    const heartBtn = document.getElementById('heart');
    const pauseBtn = document.getElementById('pause');
    const commentForm = document.getElementById('comment-form');
    const commentInput = document.getElementById('comment-input');
    const commentsList = document.getElementById('list');
    const likesList = document.querySelector('.likes');
  
    // State variables
    let count = 0;
    let timer;
    let isPaused = false;
    const likes = {};
  
    // Initialize timer
    function startTimer() {
      timer = setInterval(() => {
        if (!isPaused) {
          count++;
          counter.textContent = count;
        }
      }, 1000);
    }
  
    // Start timer when page loads
    startTimer();
  
    // Plus button event
    plusBtn.addEventListener('click', () => {
      count++;
      counter.textContent = count;
    });
  
    // Minus button event
    minusBtn.addEventListener('click', () => {
      count--;
      counter.textContent = count;
    });
  
    // Heart button event
    heartBtn.addEventListener('click', () => {
      const currentCount = count;
      
      // Initialize like count if it doesn't exist
      if (!likes[currentCount]) {
        likes[currentCount] = 1;
      } else {
        likes[currentCount]++;
      }
  
      // Update or create like display
      const existingLike = document.querySelector(`[data-num="${currentCount}"]`);
      if (existingLike) {
        existingLike.textContent = `${currentCount} has been liked ${likes[currentCount]} times`;
      } else {
        const newLike = document.createElement('li');
        newLike.dataset.num = currentCount;
        newLike.textContent = `${currentCount} has been liked 1 time`;
        likesList.appendChild(newLike);
      }
    });
  
    // Pause button event
    pauseBtn.addEventListener('click', () => {
      isPaused = !isPaused;
      
      if (isPaused) {
        clearInterval(timer);
        plusBtn.disabled = true;
        minusBtn.disabled = true;
        heartBtn.disabled = true;
        pauseBtn.textContent = 'resume';
      } else {
        startTimer();
        plusBtn.disabled = false;
        minusBtn.disabled = false;
        heartBtn.disabled = false;
        pauseBtn.textContent = 'pause';
      }
    });
  
    // Comment form event
    commentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const commentText = commentInput.value.trim();
      
      if (commentText) {
        const newComment = document.createElement('p');
        newComment.textContent = commentText;
        commentsList.appendChild(newComment);
        commentInput.value = '';
      }
    });
  });