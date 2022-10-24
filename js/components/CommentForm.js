import displayAlert from "./displayAlert.js";
import validateCommentForm from "./validateCommentForm.js";
import { checkLength, validateEmail } from "./formValidators.js";
import { postCommentUrl } from "../settings/api.js";

const commentForm = document.querySelector("#comment-form");
const name = document.querySelector("#name");
const commentEmail = document.querySelector("#comment-email");
const comment = document.querySelector("#comment-textarea");
const alertContainer = document.querySelector(".alert-container");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

export default function CommentForm() {
  function submitCommentForm(event) {
    event.preventDefault();

    alertContainer.innerHTML = "";

    const nameValue = name.value.trim();
    const emailValue = commentEmail.value.trim();
    const commentValue = comment.value.trim();

    validateCommentForm();

    if (
      checkLength(nameValue, 2) &&
      validateEmail(emailValue) &&
      checkLength(commentValue, 4)
    ) {
      addComment(nameValue, emailValue, commentValue);
    } else {
      displayAlert(
        "warning",
        "Please attend to input errors",
        ".alert-container"
      );
    }

    async function addComment(name, email, comment) {
      const jsonData = {
        author_name: name,
        author_email: email,
        content: comment,
        post: id,
      };

      const addData = JSON.stringify(jsonData);

      const options = {
        method: "POST",
        body: addData,
        headers: {
          "Content-Type": "application/json",
        },
      };

      try {
        const response = await fetch(postCommentUrl, options);
        const json = await response.json();

        console.log(json);

        if (json.status === "approved") {
          displayAlert(
            "success",
            "Comment sent successfully. Thank you for your contribution!",
            ".alert-container"
          );

          setTimeout(function () {
            alertContainer.innerHTML = "";
          }, 3000);

          commentForm.reset();
        }

        if (json.code) {
          displayAlert("error", json.message, ".alert-container");
        }
      } catch (error) {
        console.log(error);
        displayAlert("error", "Something went wrong!", ".alert-container");
      }

      console.log(addData);
    }
  }

  commentForm.addEventListener("submit", submitCommentForm);
}
