const divClicks = document.querySelectorAll(".gallery-container");
const overlay = document.getElementById("overlay");
const closeButton = overlay.querySelector(".close-button");
const galleries = document.querySelectorAll(".fullscreen-gallery-container");
const slider = document.querySelector(".img-show");
const sliderClose = document.querySelector(".close-button");

divClicks.forEach((divClick) =>
  divClick.addEventListener("click", () => {
    galleries.forEach((gallery) => {
      if (gallery.id === divClick.id) {
        document.querySelector("body").style.overflow = "hidden";
        gallery.style.display = "block";
        photos = gallery.querySelectorAll(".img");
        photos.forEach((photo) => {
          photo.addEventListener("click", showSlider);
        });
      }
    });
    overlay.style.display = "block";
  })
);

function showSlider() {
  //next and previous arrows in slider
  const buttonNext = slider.querySelector(".arrow-right");
  const buttonPrev = slider.querySelector(".arrow-left");
  const thumbnailsList = slider
    .querySelector(".preview")
    .querySelectorAll("img");
  const displayedPhoto = slider.querySelector("img");
  const list = photos;
  let index = parseInt(this.id);
  console.log(thumbnailsList);
  viewThumbnails(thumbnailsList, index, photos);

  displayedPhoto.src = this.querySelector("img").src;
  slider.style.display = "flex";

  buttonPrev.addEventListener("click", () => {
    if (index === 0) index = list.length;
    displayedPhoto.src = list.item((index -= 1)).querySelector("img").src;
    viewThumbnails(thumbnailsList, index, photos);
  });
  buttonNext.addEventListener("click", () => {
    if (index === list.length - 1) index = -1;
    displayedPhoto.src = list.item((index += 1)).querySelector("img").src;
    viewThumbnails(thumbnailsList, index, photos);
  });
  sliderClose.addEventListener("click", () => {
    slider.style.display = "none";
  });
  thumbnailsList.forEach((thumbnail) =>
    thumbnail.addEventListener("click", (e) => {
      index += parseInt(e.target.id);
      if (index < 0) index += list.length;
      else if (index > list.length - 1) {
        index -= list.length;
      }
      console.log(index);
      displayedPhoto.src = list.item(index).querySelector("img").src;
      viewThumbnails(thumbnailsList, index, photos);
    })
  );
}


function viewThumbnails(thumbnailList, id, photoList) {
  id -= 3;
  if (id < 0) {
    id = photoList.length + id;
  }
  thumbnailList.forEach((thumbnail) => {
    if (id === photoList.length - 1) id = -1;
    thumbnail.src = photoList.item((id += 1)).querySelector("img").src;
  });
}

//closing button
closeButton.addEventListener("click", () => {
  galleries.forEach((gallery) => {
    gallery.style.display = "none";
  });
  overlay.style.display = "none";
  document.querySelector("body").style.overflowY = "scroll";
});

//nav bar mobile
const hamburger = document.querySelector(".hamburger");
const navbar = document.getElementById("nav-ul");

hamburger.addEventListener("click", () => navbar.classList.toggle("show"));

function loadGallery(id) {
  var folder = `${id}/`;
  //getting all jpg filenames
  $.ajax({
    url: folder,
    success: function (data) {
      const randPhotosArray = [];
      let index = 0;
      $(data)
        .find("a")
        .attr("href", function (i, val) {
          //assembling galleries
          if (val.match(/\.(jpe?g||png)$/)) {
            //getting values in array
            randPhotosArray.push(val);
            $(`.${id}`).append(
              '<div class="img"  id="' +
                index +
                '"><img src="' +
                folder +
                val.replace(folder, "") +
                '" alt="" /></div> '
            );
            index++;
          }
        });
      const thumbnail = [...divClicks]
        .filter((div) => div.id === id)[0]
        .querySelector("img");
      const randomNumber = Math.floor(Math.random() * randPhotosArray.length);
      thumbnail.src = randPhotosArray[randomNumber];
    },
  });
}

window.addEventListener("load", () => {
  const names = ["kitchen", "livingroom", "wardrobe", "bedroom"];
  names.forEach((name) => {
    loadGallery(name);
  });
});
