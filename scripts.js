document.getElementById('post-tweet-btn').addEventListener('click', () => {
    const tweetContent = document.getElementById('tweet-input').value;
    if (tweetContent) {
      alert('Tweet posted: ' + tweetContent);
      document.getElementById('tweet-input').value = ''; // Clear input
    } else {
      alert('Please enter a tweet!');
    }
  });
  