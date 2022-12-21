// write your code here
// details
const ramenMenuImg = document.getElementById("ramen-menu");
const ramenImage = document.querySelector(".detail-image");
const ramenDetail = document.getElementById("ramen-detail");

// name and restaurant

// button and form

const fetchData = async () => {
  const response = await fetch("http://localhost:3000/ramens");

  const data = await response.json();
  data.forEach((item) => handleRamenImg(item));
};

const handleRamenImg = (data) => {
  const ramenName = document.querySelector(".name");
  const ramenResto = document.querySelector(".restaurant");

  //rating and comments
  const rating = document.getElementById("rating-display");
  const comments = document.getElementById("comment-display");
  const ImagesRamen = document.createElement("img");
  ImagesRamen.src = data.image;

  ImagesRamen.addEventListener("click", (e) => {
    ramenImage.src = data.image;
    ramenName.textContent = data.name;
    rating.textContent = data.rating;
    comments.textContent = data.comment;
    ramenResto.textContent = data.restaurant;
  });
  ramenMenuImg.appendChild(ImagesRamen);
};

const ramenForm = document.querySelector("#new-ramen");

ramenForm.addEventListener("submit", (e) => {
  console.log("form-submitted");
  e.preventDefault();
  const newName = document.querySelector("#new-name").value;
  const newResto = document.querySelector("#new-restaurant").value;
  const newImage = document.querySelector("#new-image").value;
  const newRating = document.querySelector("#new-rating").value;
  const newComment = document.querySelector("#new-comment").value;

  const ramen = {
    name: newName,
    restaurant: newResto,
    image: newImage,
    rating: newRating,
    comment: newComment,
  };

  handleRamenImg(ramen);
  ramenForm.reset();
});

fetchData();
