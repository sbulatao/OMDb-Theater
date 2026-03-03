// SEND DATA REQUEST TO:
// API 1: "http://www.omdbapi.com/?apikey=[yourkey]&"

// POSTER API REQUEST
// API 2: "http://img.omdbapi.com/?apikey=[yourkey]&"

// http://www.omdbapi.com/?s=${title}
// http://www.omdbapi.com/?t=${title}

// const apiKey = "e687b801"; 
let isModalOpen = false;
let contrastToggle = false;

// for dark theme toggle
document.addEventListener("DOMContentLoaded", () => { 
  const savedTheme = localStorage.getItem("theme"); 
  if (savedTheme === "dark") { 
    document.body.classList.add("dark-theme"); 
  } 
  // else {
  //   document.body.classList.remove("dark-theme");
  // }
});


function showSearchMovies(title) {
  localStorage.setItem("Title", title);
  // window.location.href = `${window.location.origin}`;
  window.location.href = "movies.html"; // opens and goes to movies.html
}

// clicks the poster and shows all the info
function showMovie(poster){
  localStorage.getItem("Poster", poster);
  window.location.href = `${window.location.origin}`;
}

function openMenu() {
  document.body.classList.add("menu--open");
}

function closeMenu() {
  document.body.classList.remove("menu--open");
}

function toggleContrast() {
//   contrastToggle = !contrastToggle;
  document.body.classList.toggle("dark-theme");
//   if (contrastToggle) {
//     document.body.classList += " dark-theme"
//   }
//   else {
//     document.body.classList.remove("dark-theme")
//   }
  if(document.body.classList.contains("dark-theme")){
    localStorage.setItem("theme", "dark");
  }else {
    localStorage.setItem("theme", "light");
  }
}

function contact(event) {
  event.preventDefault();
  const loading = document.querySelector(".modal__overlay--loading");
  const success = document.querySelector(".modal__overlay--success");
  loading.classList += " modal__overlay--visible";
  emailjs
    .sendForm(
    //from emailJS
    //   "service_8p1wgaf", // service id
    //   "template_bhobq48", // template id
    //   event.target,
    //   "r0m8dt0EwtgDRMEXY" // public id
    )
    .then(() => {
      loading.classList.remove("modal__overlay--visible");
      success.classList += " modal__overlay--visible";
    })
    .catch(() => {
      loading.classList.remove("modal__overlay--visible");
      alert(
        "The email service is temporarily unavailable. Please contact me directly on email@email.com"
      );
    });
}

function toggleModal() {
  if (isModalOpen) {
    isModalOpen = false;
    return document.body.classList.remove("modal--open");
  }
  isModalOpen = true;
  document.body.classList += " modal--open";
}
