import loadMoreComments from "../components/loadMoreComments.js";

const commentWrapper = document.querySelector(".comment-wrapper");

export function renderComments(comments) {
  commentWrapper.innerHTML = "";

  let renderedComments = comments;

  // matches the max amount of 10 objects in the API array
  if (comments.length >= 10) {
    renderedComments = comments.slice(0, 10);
  }

  // console.log(renderedComments);

  if (comments.length === 0) {
    commentWrapper.innerHTML = `<p class="comments-default">No comments yet – but feel free to leave one!</p>`;
  } else {
    renderedComments.forEach((comment) => {
      let initialDate = comment.date;
      let formattedDate = new Date(initialDate).toLocaleDateString("da-DK", {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      commentWrapper.innerHTML += `
       <div class="remove-comment comment-container">
       <figure class="comment-image"><img id="myimg" class="comment-image" src="${comment.author_avatar_urls[96]}" alt="image of a generic avatar"/> </figure>
       <div>
       <p id="comment-author">${comment.author_name}</p>
       <div class="info-container"><p>${formattedDate}</p></div>
       <p id="comment-text">${comment.content.rendered}</p>
       </div>
       </div> `;
    });
    loadMoreComments(renderedComments);
  }
}
