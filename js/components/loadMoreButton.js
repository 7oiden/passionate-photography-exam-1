let currentPosts = 10;
const postLoader = document.querySelector("#load-button");

export default function loadMorePosts(event) {
  const postList = [
    ...document.querySelectorAll(".post-wrapper .post-container"),
  ];

  for (let i = currentPosts; i < currentPosts + 2; i++) {
    if (postList[i]) {
      postList[i].style.display = "block";
    }
  }

  currentPosts += 2;

  if (currentPosts >= postList.length) {
    event.target.style.display = "none";
  }
}

postLoader.addEventListener("click", loadMorePosts);
