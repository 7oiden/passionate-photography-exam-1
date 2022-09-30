const postWrapper = document.querySelector(".post-wrapper");
const featureWrapper = document.querySelector(".feature-wrapper");

//important! this variable is redeclared at common_scripts.js
var htmlSelector = document.querySelectorAll("html");

console.log(htmlSelector[0]);

const embed = "?_embed";
const perPage = "&per_page=15";
const order = "&orderby=date";

const postsUrl =
  "http://7oiden.com/passionate-photography/wp-json/wp/v2/posts/" +
  embed +
  perPage +
  order;

const corsFixUrl = "https://noroffcors.herokuapp.com/" + postsUrl;

async function fetchPosts() {
  try {
    const response = await fetch(corsFixUrl);
    const results = await response.json();

    console.log(results);

    postWrapper.innerHTML = "";

    if (htmlSelector[0].className === "index-page") {
      featureWrapper.innerHTML = "";
    }

    for (let i = 0; i < results.length; i++) {
      //fetch number of comments
      const repliesArray = results[i]._embedded.replies;

      let numReplies = 0;

      if (repliesArray) {
        for (let y = 0; y < repliesArray.length; y++) {
          numReplies = repliesArray[y].length;
        }
      }

      const categoriesArray = results[i].categories;

      let categoryName;
      let category = results[i].categories[0];

      if (categoriesArray.length === 0) {
        categoryName = "Unspecified";
      } else {
        switch (category) {
          case 5:
            categoryName = "Black & white";
            break;
          case 4:
            categoryName = "Portrait";
            break;
          case 3:
            categoryName = "Landscape";
            break;
          case 2:
            categoryName = "Street";
            break;
          case 1:
            categoryName = "Uncategorized";
            break;
        }
      }

      const mediaArray = results[i]._embedded["wp:featuredmedia"];

      for (let j = 0; j < mediaArray.length; j++) {
        if (i >= 8 && htmlSelector[0].className === "index-page") {
          break;
        }

        postWrapper.innerHTML += `
    <div class="post-container" id="gradient-border">
     <a href="specific_post.html?id=${results[i].id}">
     <figure class="post-image">
     <img class="post-image" src="${mediaArray[j].source_url}" alt="${mediaArray[j].alt_text}"/>
     </figure>
     <h2 class="dynamic-header post-heading">${results[i].title.rendered}</h2>
     <div class="info-container">
     <p class="info">${categoryName}</p>
     <p class="info">${results[i].formatted_date}</p>
     <p>${numReplies} comments</p>
     </div>
     <div class="post-text">${results[i].content.rendered}</div>
     </a>
     </div>
     `;

        const sliderHeading = document.querySelectorAll(".dynamic-header");

        if (htmlSelector[0].className === "index-page") {
          sliderHeading.forEach(function (h2) {
            // h2.outerHTML = "<h4>" + h2.innerHTML + "</h4>";
            h2.outerHTML = `<h4 class="post-heading"> ${h2.innerHTML} </h4>`;
          });
        }
      }

      //main-featured post
      if (
        results[i].tags.length >= 2 &&
        htmlSelector[0].className === "index-page"
      ) {
        featureWrapper.innerHTML += `
     <div class="feature-container">
     <a href="specific_post.html?id=${results[i].id}">
     <figure class="feature-image">
     <img class="feature-image" src="${mediaArray[0].source_url}" alt="${mediaArray[0].alt_text}"/>
     </figure>
     <h4 class="post-heading">${results[i].title.rendered}</h4>
     <div class="info-container">
     <p class="info">${categoryName}</p>
     <p class="info">${results[i].formatted_date}</p>
     <p>${numReplies} comments</p>
     </div>
     <div class="feature-text">${results[i].content.rendered}</div>
     </a>
     </div>`;
      }
    }
  } catch (error) {
    console.log(error);
    postWrapper.innerHTML = displayError(
      "An error has occurred when trying to retrieve the API"
    );
  }
}

fetchPosts();

//load more button
const postLoader = document.querySelector("#load-button");

let currentPosts = 10;

if (htmlSelector[0].className !== "index-page") {
  function loadMorePosts(event) {
    const postList = [
      ...document.querySelectorAll(".post-wrapper .post-container"),
    ];

    for (let u = currentPosts; u < currentPosts + 2; u++) {
      if (postList[u]) {
        postList[u].style.display = "block";
      }
    }

    currentPosts += 2;

    if (currentPosts >= postList.length) {
      event.target.style.display = "none";
    }
  }

  postLoader.addEventListener("click", loadMorePosts);
}

//sort
