export default function loadMoreComments(comments) {
  const commentContainer = document.querySelectorAll(".comment-container");
  const loadButton = document.querySelector("#comments-button");

  let num = 4;

  for (let i = 0; i < commentContainer.length; i++) {
    if (i < num) {
      commentContainer[i].classList.remove("remove-comment");
    }
  }

  if (comments.length <= 4) {
    loadButton.style.display = "none";
  } else {
    loadButton.style.display = "block";
  }

  loadButton.onclick = function () {
    num = num + 4;

    for (let i = 0; i < commentContainer.length; i++) {
      if (i < num) {
        commentContainer[i].classList.remove("remove-comment");
      }

      if (num >= commentContainer.length) {
        loadButton.style.display = "none";
      }
    }
  };
}
