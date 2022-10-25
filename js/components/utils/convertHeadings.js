export default function convertHeadings() {
  //convert headings in aside list to fit page heading hierarchy 
  const asideHeading = document.querySelectorAll("h5");

  const htmlSelector = document.querySelectorAll("html");

  if (htmlSelector[0].className === "contact-page") {
    asideHeading.forEach(function (h5) {
      h5.outerHTML = `<h2 class="aside-heading">${h5.innerHTML}</h2>`;
    });
  }

  if (
    htmlSelector[0].className === "about-page" ||
    htmlSelector[0].className === "list-of-posts"
  ) {
    asideHeading.forEach(function (h5) {
      h5.outerHTML = `<h3 class="aside-heading">${h5.innerHTML}</h3>`;
    });
  }

  if (htmlSelector[0].className === "specific-post") {
    asideHeading.forEach(function (h5) {
      h5.outerHTML = `<h4 class="aside-heading">${h5.innerHTML}</h4>`;
    });
  }
}
