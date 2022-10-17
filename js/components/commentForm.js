const form = document.querySelector("#comment-form");
const name = document.querySelector("#name");
const commentEmail = document.querySelector("#comment-email");
const comment = document.querySelector("#comment-textarea");
const commentNameError = document.querySelector("#comment-name-error");
const commentEmailError = document.querySelector("#comment-email-error");
const commentError = document.querySelector("#comment-error");
// const commentButton = document.querySelector("#comment-button");
const commentSent = document.querySelector(".comment-sent");

export default function commentForm() {
  function checkCommentInput() {
    if (checkLength(name.value, 2)) {
      commentNameError.style.display = "none";
    } else {
      commentNameError.style.display = "block";
    }
    if (validateEmail(commentEmail.value)) {
      commentEmailError.style.display = "none";
    } else {
      commentEmailError.style.display = "block";
    }
    if (checkLength(comment.value, 4)) {
      commentError.style.display = "none";
    } else {
      commentError.style.display = "block";
    }
  }

  name.addEventListener("keyup", checkCommentInput);
  commentEmail.addEventListener("keyup", checkCommentInput);
  comment.addEventListener("keyup", checkCommentInput);

  function validateCommentForm(event) {
    event.preventDefault();

    if (checkLength(name.value, 2)) {
      commentNameError.style.display = "none";
    } else {
      commentNameError.style.display = "block";
    }
    if (validateEmail(commentEmail.value)) {
      commentEmailError.style.display = "none";
    } else {
      commentEmailError.style.display = "block";
    }
    if (checkLength(comment.value, 4)) {
      commentError.style.display = "none";
    } else {
      commentError.style.display = "block";
    }
    if (
      checkLength(name.value, 2) &&
      validateEmail(commentEmail.value) &&
      checkLength(comment.value, 4)
    ) {
      commentSent.innerHTML = `
    <p id="success-message"><strong>Thank you for your comment!</strong> 
    The comment is sent for approval, and will normally appear within a day.</p>`;
      form.reset();
    }
  }

  form.addEventListener("submit", validateCommentForm);

  function checkLength(value, len) {
    if (value.trim().length > len) {
      return true;
    } else {
      return false;
    }
  }

  function validateEmail(contactEmail) {
    const regEx = /\S+@\S+\.\S+/;
    const patternMatches = regEx.test(contactEmail);
    return patternMatches;
  }
}
