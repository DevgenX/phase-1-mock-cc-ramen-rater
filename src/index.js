// ramen details
const ramenName = document.querySelector(".name");
const ramenResto = document.querySelector(".restaurant");
const ramenImage = document.querySelector(".detail-image");
// ramen form rating and comment
const rating = document.getElementById("rating-display");
const comments = document.getElementById("comment-display");

// ramen form and menu
const ramenMenu = document.getElementById("ramen-menu");
const ramenForm = document.querySelector("#new-ramen");

const deleteBtn = document.getElementById("delete");

let dataList = [];

const fetchData = async () => {
  try {
    const response = await fetch("http://localhost:3000/ramens");
    dataList = await response.json();
    dataList.forEach((item) => handleRamenData(item));
    renderData(dataList[0]);
  } catch (err) {
    console.log(err);
  }
};

// create image for every ramen, set src as the image on db.json

// append the images into the ramen menu section

const handleRamenData = (data) => {
  const ImagesRamen = document.createElement("img");
  ImagesRamen.src = data.image;

  ImagesRamen.addEventListener("click", () => {
    renderData(data);
  });
  ramenMenu.appendChild(ImagesRamen);
};

// render the data and assign the values to be the values from the database
// ramen image is the image in the middle
const renderData = (data) => {
  ramenImage.src = data.image;
  ramenName.textContent = data.name;
  rating.textContent = data.rating;
  comments.textContent = data.comment;
  ramenResto.textContent = data.restaurant;
  deleteBtn.textContent = "x";

  //deleteBtn.id = data.id;
};
// set the values of the ramen form
// get the values and input them in the object
// call the handleRamenData to the data in the object to assign the values of every new input ramen

ramenForm.addEventListener("submit", (e) => {
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
  handleRamenData(ramen);
  ramenForm.reset();
});

const setRating = async (id) => {
  const currData = dataList.find((data) => data.id === id);
  //console.log(currData);
  const config = {
    method: "PATCH",
    body: JSON.stringify({
      rating: currData.rating,
    }),
  };

  await fetch(`http://localhost:3000/ramens/${id}`, config);
};

const updateForm = document.querySelector("#update-ramen");

updateForm.addEventListener("submit", (e) => {
  const setNewRating = document.querySelector("#set-rating").value;
  e.preventDefault();
  setRating(setNewRating, dataList.id);
});

fetchData();

deleteBtn.addEventListener("click", (e) => {
  e.target.remove();
});
