export default function convertHeadings() {
  //convert headings
  const asideHeading = document.querySelectorAll("h5");

  //important! this variable is also declared at list_of_posts.js
  var htmlSelector = document.querySelectorAll("html");

  if (htmlSelector[0].className === "contact-page") {
    asideHeading.forEach(function (h5) {
      // h5.outerHTML = "<h2>" + h5.innerHTML + "</h2>";
      h5.outerHTML = `<h2 class="aside-heading">${h5.innerHTML}</h2>`;
    });
  }

  if (
    htmlSelector[0].className === "about-page" ||
    htmlSelector[0].className === "list-of-posts"
  ) {
    asideHeading.forEach(function (h5) {
      // h5.outerHTML = "<h3>" + h5.innerHTML + "</h3>";
      h5.outerHTML = `<h3 class="aside-heading">${h5.innerHTML}</h3>`;
    });
  }

  if (htmlSelector[0].className === "specific-post") {
    asideHeading.forEach(function (h5) {
      // h5.outerHTML = "<h4>" + h5.innerHTML + "</h4>";
      h5.outerHTML = `<h4 class="aside-heading">${h5.innerHTML}</h4>`;
    });
  }
}
