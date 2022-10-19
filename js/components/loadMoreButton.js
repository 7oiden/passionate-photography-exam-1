const postLoader = document.querySelector("#load-button");

let currentPosts = 10;

export default function loadMoreButton(posts) {
  let currentPosts = posts;

  console.log(currentPosts);

  function loadMorePosts(event) {
    const postList = [
      ...document.querySelectorAll(".post-wrapper .post-container"),
    ];

    if (currentPosts >= 10) {
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
  }
  postLoader.addEventListener("click", loadMorePosts);
}
