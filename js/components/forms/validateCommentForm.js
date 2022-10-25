import { checkLength, validateEmail } from "./formValidators.js";

const name = document.querySelector("#name");
const commentEmail = document.querySelector("#comment-email");
const comment = document.querySelector("#comment-textarea");
const commentNameError = document.querySelector("#comment-name-error");
const commentEmailError = document.querySelector("#comment-email-error");
const commentError = document.querySelector("#comment-error");

let value = "";
let len = 0;

export default function validateCommentForm() {
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

  checkLength(value, len);
  validateEmail(commentEmail);
}
