const commentWrapper = document.querySelector(".comment-wrapper");

export function renderComments(comments) {
  commentWrapper.innerHTML = "";

  if (comments.length === 0) {
    commentWrapper.innerHTML = `<p class="comments-default">No comments yet – but feel free to leave one!</p>`;
  } else {
    comments.forEach((comment) => {
      commentWrapper.innerHTML += `
       <div class="comment-container">
       <figure class="comment-image"><img id="myimg" class="comment-image" src="${comment.author_avatar_urls[96]}" alt="image of a generic avatar"/> </figure>
       <div>
       <p id="comment-author">${comment.author_name}</p>
       <div class="info-container"><p>${comment.date}</p></div>
       <p id="comment-text">${comment.content.rendered}</p>
       </div>
       </div> `;
    });
  }
}
