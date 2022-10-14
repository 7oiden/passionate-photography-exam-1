const embed = "?_embed";
const postsPerPage = "&per_page=15";
const orderByDate = "&orderby=date";
const corsFixUrl = "https://noroffcors.herokuapp.com/";

export const baseUrl =
  corsFixUrl + "http://7oiden.com/passionate-photography/wp-json/wp/v2/posts/";
export const postsUrl = baseUrl + embed + postsPerPage + orderByDate;
export const commentsUrl = baseUrl + "comments";
