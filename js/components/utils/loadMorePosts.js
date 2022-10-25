export default function loadMorePosts(posts) {
  const loadButton = document.querySelector("#load-button");
  const postContainers = document.querySelectorAll(".post-container");

  let num = 10;

  for (let i = 0; i < postContainers.length; i++) {
    if (i < num) {
      postContainers[i].classList.remove("post-container-hide");
    }
  }

  if (posts.length <= 10) {
    loadButton.style.display = "none";
  } else {
    loadButton.style.display = "block";
  }

  loadButton.onclick = function () {
    num = num + 2;

    for (let i = 0; i < postContainers.length; i++) {
      if (i < num) {
        postContainers[i].classList.remove("post-container-hide");
      }

      if (num >= postContainers.length) {
        loadButton.style.display = "none";
      }
    }
  };
}
