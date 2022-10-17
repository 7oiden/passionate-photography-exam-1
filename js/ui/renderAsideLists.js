const recentPosts = document.querySelector(".recent-posts-list");
const featuredPosts = document.querySelector(".featured-posts-list");

export function renderAsideLists(posts) {
  recentPosts.innerHTML = "";
  featuredPosts.innerHTML = "";

  posts.forEach((post) => {
    if (post.tags.length > 0) {
      featuredPosts.innerHTML += `
      <li><a href="specific_post.html?id=${post.id}">${post.title.rendered}</a></li>
      `;
    }
  });

  for (let i = 0; i < posts.length; i++) {
    if (i >= 5) {
      break;
    }
    recentPosts.innerHTML += `
      <li><a href="specific_post.html?id=${posts[i].id}">${posts[i].title.rendered}</a></li>
      `;
  }
}
