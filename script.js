//navbar link animation
let isAnimating = false;

function animateLetters(navLink) {
  if (!isAnimating) {
    isAnimating = true;

    gsap.set(navLink.querySelectorAll(".link"), {
      opacity: 0,
    }); // Initial state

    const letters = navLink.textContent.split("");
    navLink.innerHTML = ""; // Clear the navLink

    letters.forEach((letter) => {
      const letterWrapper = document.createElement("span");
      letterWrapper.textContent = letter;
      letterWrapper.classList.add("link");
      navLink.appendChild(letterWrapper);
    });

    const letterElements = navLink.querySelectorAll(".link");
    letterElements.forEach((letter, index) => {
      gsap.to(letter, {
        opacity: 1,
        delay: Math.random() * 0.6, // Random delay for each letter
        duration: 1, // Duration of the animation
        onComplete: () => {
          isAnimating = false; // Reset the animation flag once animation completes
        },
      });
    });
  }
}

const links = document.querySelectorAll("#navLink");

links.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    animateLetters(link);
  });
});

//hero section rotating images

// Define the image elements
const groupImg1 = document.querySelectorAll(
  "section#topPage .images-container img.img1"
);
const groupImg2 = document.querySelectorAll(
  "section#topPage .images-container img.img2"
);
let rotationAngleGroupImg1 = 0;
let rotationAngleGroupImg2 = 0;

// Custom easing function
const easingFunction = "cubic-bezier(0.29, 0, 0.58, 1)";

// Function to rotate the first group of images
const rotateGroupImage1 = () => {
  // Decrement the rotation angle by 15 degrees
  rotationAngleGroupImg1 -= 15;

  // Ensure the rotation angle stays within 0-360 degrees
  rotationAngleGroupImg1 = (rotationAngleGroupImg1 + 360) % 360; // Handle negative values

  // Apply a smooth rotation transition
  groupImg1.forEach((img) => {
    img.style.transition = `transform 0.5s ${easingFunction}`;
    img.style.transform = `rotate(${rotationAngleGroupImg1}deg)`;
  });
};

// Function to rotate the second group of images
const rotateGroupImage2 = () => {
  // Increment the rotation angle by 15 degrees
  rotationAngleGroupImg2 += 15;

  // Ensure the rotation angle stays within 0-360 degrees
  rotationAngleGroupImg2 %= 360;

  // Apply a smooth rotation transition
  groupImg2.forEach((img) => {
    img.style.transition = `transform 0.5s ${easingFunction}`;
    img.style.transform = `rotate(${rotationAngleGroupImg2}deg)`;
  });
};

window.addEventListener("load", () => {
  // Rotate both images once on page load
  rotateGroupImage1();
  rotateGroupImage2();

  // Set intervals to rotate every 4 seconds thereafter
  setInterval(rotateGroupImage1, 3800);
  setInterval(rotateGroupImage2, 3800);
});

// Define the image elements
const img1 = document.querySelector(
  "section#topPage .circle-images-container img.img1"
);
const img2 = document.querySelector(
  "section#topPage .circle-images-container img.img2"
);
const img3 = document.querySelector(
  "section#topPage .circle-images-container img.img3"
);

// Initialize the rotation angles
let rotationAngle1 = 0; // For the first image
let rotationAngle2 = 0; // For the second image
let rotationAngle3 = 0; // For the third image

// Custom easing function
//    const easingFunction = 'cubic-bezier(0.29, 0, 0.58, 1)';

// Functions to rotate each image
const rotateImage1 = () => {
  rotationAngle1 = (rotationAngle1 + 15) % 360;
  img1.style.transition = `transform 0.5s ${easingFunction}`;
  img1.style.transform = `rotate(${rotationAngle1}deg)`;
  img1.style.opacity = "0.6";
  img2.style.opacity = "0.15";
  img3.style.opacity = "0.15";
};

const rotateImage2 = () => {
  rotationAngle2 = (rotationAngle2 - 15 + 360) % 360; // Handle negative values
  img2.style.transition = `transform 0.5s ${easingFunction}`;
  img2.style.transform = `rotate(${rotationAngle2}deg)`;
  img1.style.opacity = "0.4";
  img2.style.opacity = "0.6";
  img3.style.opacity = "0.15";

  rotationAngle1 = (rotationAngle1 + 15) % 360;
  img1.style.transition = `transform 0.5s ${easingFunction}`;
  img1.style.transform = `rotate(${rotationAngle1}deg)`;
  img1.style.opacity = "0.6";
};

const rotateImage3 = () => {
  rotationAngle3 = (rotationAngle3 + 15) % 360;
  img3.style.transition = `transform 0.5s ${easingFunction}`;
  img3.style.transform = `rotate(${rotationAngle3}deg)`;
  img3.style.opacity = "0.6";

  rotationAngle1 = (rotationAngle1 + 15) % 360;
  img1.style.transition = `transform 0.5s ${easingFunction}`;
  img1.style.transform = `rotate(${rotationAngle1}deg)`;
  img1.style.opacity = "0.6";

  rotationAngle2 = (rotationAngle2 - 15 + 360) % 360; // Handle negative values
  img2.style.transition = `transform 0.5s ${easingFunction}`;
  img2.style.transform = `rotate(${rotationAngle2}deg)`;
  img2.style.opacity = "0.6";
};

// Create a list of functions to rotate the images in the desired order
const rotateFunctions = [rotateImage2, rotateImage3, rotateImage1];

// Track the current index in the function list
let currentIndex = 0;

// Function to rotate the current image and move to the next
const rotateNext = () => {
  // Call the current function
  rotateFunctions[currentIndex]();

  // Move to the next index
  currentIndex = (currentIndex + 1) % rotateFunctions.length; // Loop back to the start when reaching the end
};

// Set an interval to rotate images every 4 seconds
window.addEventListener("load", () => {
  // Rotate both images once on page load
  rotateNext();

  setInterval(rotateNext, 3800);
});
//marquee blog animation
let currentScroll = 0;
let isScrollingDown = true;

let tween = gsap
  .to(".marquee-row", {
    xPercent: -100,
    repeat: -1,
    duration: 40,
    ease: "linear",
  })
  .totalProgress(0.5);
gsap.set(".marquee-container", {
  xPercent: -50,
});

window.addEventListener("scroll", function () {
  if (window.pageYOffset > currentScroll) {
    isScrollingDown = true;
  } else {
    isScrollingDown = false;
  }
  gsap.to(tween, {
    timeScale: isScrollingDown ? 1 : -1,
  });
  currentScroll = window.pageYOffset;
});

let currentScrollReverse = 0;
let isScrollingDownReverse = true;

let tweenReverse = gsap
  .to("#marquee-row-reverse", {
    xPercent: 100, // Reverse direction
    repeat: -1,
    duration: 60,
    ease: "linear",
  })
  .totalProgress(0.5);

gsap.set("#marquee-container-reverse", {
  xPercent: 50,
}); // Reverse direction

window.addEventListener("scroll", function () {
  if (window.pageYOffset > currentScrollReverse) {
    isScrollingDownReverse = true;
  } else {
    isScrollingDownReverse = false;
  }
  gsap.to(tweenReverse, {
    timeScale: isScrollingDownReverse ? 1 : -1,
  });

  currentScrollReverse = window.pageYOffset;
});

//work card hover animation starts
document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    const hoverTextElements = card.querySelectorAll(".card-hover-text");
    const originalTexts = Array.from(hoverTextElements).map(
      (element) => element.textContent
    );
    const hoverText = card.getAttribute("data-hover-text");

    card.addEventListener("mouseenter", function () {
      hoverTextElements.forEach((element) => {
        element.textContent = hoverText;
      });
    });

    card.addEventListener("mouseleave", function () {
      hoverTextElements.forEach((element, index) => {
        element.textContent = originalTexts[index];
      });
    });
  });
});
const cards = document.querySelectorAll(".card.active");

// Function to add mousemove event listener to the cards
function addMousemoveListener() {
  cards.forEach((card) => {
    // const image = card.querySelector(".follow-image");
    card.addEventListener("mousemove", mousemoveHandler);
  });
}

// Function to remove mousemove event listener from the cards
function removeMousemoveListener() {
  cards.forEach((card) => {
    card.removeEventListener("mousemove", mousemoveHandler);
  });
}

// Event handler for mousemove event
function mousemoveHandler(e) {
  const card = e.currentTarget;
  const image = card.querySelector(".follow-image");
  const mouseX = e.pageX - card.offsetLeft;
  const mouseY = e.pageY - card.offsetTop;
  image.style.left = `${mouseX}px`;
  image.style.top = `${mouseY}px`;
}

// Function to check screen size and add/remove event listeners accordingly
function checkScreenSize() {
  if (window.innerWidth > 1000) {
    addMousemoveListener();
  } else {
    removeMousemoveListener();
  }
}

// Initial check when the page loads
checkScreenSize();

// Check screen size whenever the window is resized
window.addEventListener("resize", checkScreenSize);
//work card hover animation ends

//expand about-me section
let toggleContent = document.querySelector("#toggle-content");
let hiddenSection = document.querySelector(".hidden-section");
let overlayBg = document.querySelector(
  ".aboutme-blog .info-container .overlay-bg"
);
toggleContent.addEventListener("click", () => {
  hiddenSection.classList.remove("hidden");
  //
  const aboutmeBlog = document.querySelector(
    ".aboutme-container #aboutme-blog"
  );
  const firstColumn = document.querySelector(
    ".aboutme-container #first-column"
  );

  // Function to update the height of the first column based on the height of the aboutme-blog
  function updateFirstColumnHeight() {
    const blogHeight = aboutmeBlog.offsetHeight; // Get the height of the aboutme-blog
    firstColumn.style.height = blogHeight + 400 + "px"; // Set the height of the first column
  }
  updateFirstColumnHeight();

  toggleContent.style.opacity = "0";
  toggleContent.style.transition = "all 0.3s ease";
  overlayBg.style.opacity = "0";
  overlayBg.style.transition = "all 0.3s ease";
});

document.addEventListener("DOMContentLoaded", function () {
  const aboutmeBlog = document.querySelector(
    ".aboutme-container #aboutme-blog"
  );
  const firstColumn = document.querySelector(
    ".aboutme-container #first-column"
  );

  // Function to update the height of the first column based on the height of the aboutme-blog
  function updateFirstColumnHeight() {
    const blogHeight = aboutmeBlog.offsetHeight; // Get the height of the aboutme-blog
    firstColumn.style.height = blogHeight + 400 + "px"; // Set the height of the first column
  }

  // Initial call to update the height of the first column
  updateFirstColumnHeight();

  // Add a resize event listener to update the height of the first column if the window size changes
  window.addEventListener("resize", updateFirstColumnHeight);
});

document.addEventListener("DOMContentLoaded", function () {
  const gradientBlog = document.querySelector("#introduction");
  const firstColumnGradient = document.querySelector(".gradient-section");

  // Function to update the height of the first column based on the height of the aboutme-blog
  function updateFirstColumnGradientHeight() {
    const Blog = gradientBlog.offsetHeight; // Get the height of the aboutme-blog
    firstColumnGradient.style.height = Blog + 400 + "px"; // Set the height of the first column
  }

  // Initial call to update the height of the first column
  updateFirstColumnGradientHeight();

  // Add a resize event listener to update the height of the first column if the window size changes
  window.addEventListener("resize", updateFirstColumnGradientHeight);
});

//random text animation on scroll
// Set initial opacity to 0 for all children of #randomParagraph
gsap.set("#randomParagraph > *", {
  opacity: 0,
});

const paragraph = document.getElementById("randomParagraph");
const htmlContent = paragraph.innerHTML;
paragraph.innerHTML = ""; // Clear the paragraph content

// Function to create a span for each character
const createCharacterSpan = (char) => {
  const span = document.createElement("span");
  span.innerHTML = char === " " ? "&nbsp;" : char; // Use non-breaking space for spaces
  span.classList.add("letter");
  return span;
};

// Function to create a span for each word
const createWordSpan = (word) => {
  const wordSpan = document.createElement("span");
  wordSpan.style.whiteSpace = "nowrap"; // Prevent word breaking
  for (const char of word) {
    const charSpan = createCharacterSpan(char);
    wordSpan.appendChild(charSpan);
  }
  return wordSpan;
};

// Split the HTML content into an array of words
const words = htmlContent.split(" ");

// Append each word wrapped in a span to the paragraph
words.forEach((word, index) => {
  const wordSpan = createWordSpan(word);
  paragraph.appendChild(wordSpan);

  // Add a space between words except for the last one
  if (index < words.length - 1) {
    paragraph.appendChild(createCharacterSpan(" "));
  }
});

const letterElements = document.querySelectorAll(".letter");

// Intersection Observer setup
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Start the animation when the paragraph comes into view
      letterElements.forEach((letter) => {
        gsap.to(letter, {
          opacity: 1,
          delay: Math.random() * 1, // Random delay for each letter
          duration: 1, // Duration of the animation
        });
      });

      // Unobserve the paragraph once animation starts
      observer.unobserve(entry.target);
    }
  });
});

// Observe the paragraph
observer.observe(paragraph);
//random image pop up
let dynamicImages = [];
let images = [
  "./images/emoji/Frame 1181.svg",
  "./images/emoji/Frame 1182.svg",
  "./images/emoji/Group 10.svg",
  "./images/emoji/Group 50.svg",
  "./images/emoji/Group 52.svg",
  "./images/emoji/Group 54.svg",
  "./images/emoji/Group 58.svg",
  "./images/emoji/Group 59.svg",
  "./images/emoji/Group 63.svg",
  "./images/emoji/Group 64.svg",
  "./images/emoji/Group 66.svg",
  "./images/emoji/Group 72.svg",
  "./images/emoji/Omm...Nice!.svg",
  "./images/emoji/Group 61.svg",
];

let imageContainer = document.querySelector(".aboutme-blog .image-container");

// Function to create a new image at the cursor position
function createImage(e) {
  let image = document.createElement("img");

  // Choose a random image path from the images array
  let imagePath = images[Math.floor(Math.random() * images.length)];

  // Set the image source
  image.src = imagePath;

  // Get the relative position within the image container
  let containerRect = imageContainer.getBoundingClientRect();

  // Calculate position relative to the containing element
  let x = e.clientX - containerRect.left;
  let y = e.clientY - containerRect.top;

  // Clamp coordinates to ensure they don't overflow
  let maxX = containerRect.width - 60; // Adjust 60 based on your image width
  let maxY = containerRect.height - 60; // Adjust 60 based on your image height
  x = Math.max(0, Math.min(maxX, x));
  y = Math.max(0, Math.min(maxY, y));

  // Set image position relative to the container
  image.style.position = "absolute";
  image.style.left = `${x}px`;
  image.style.top = `${y}px`;
  image.style.zIndex = "100";
  image.style.width = "80px";
  image.style.height = "80px";
  image.style.objectFit = "contain";

  // Append the image to the container to ensure correct positioning
  imageContainer.appendChild(image);

  // Add to dynamicImages array
  dynamicImages.push(image);
}

// Implement throttle function to limit the rate of event handling
function throttle(func, delay) {
  let lastCall = 0;
  return function (...args) {
    const now = new Date().getTime();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
}

// Use the throttled function for handling mousemove events
imageContainer
  .querySelector("img")
  .addEventListener("mousemove", throttle(createImage, 200));

// Declare the timeout variable outside to avoid scoping issues
let removeImagesTimeout;

imageContainer.addEventListener("mouseleave", () => {
  removeImagesTimeout = setTimeout(() => {
    dynamicImages.forEach((dynamicImage) => {
      dynamicImage.style.transition = "opacity 1s ease";
      dynamicImage.style.opacity = "0";
      setTimeout(() => {
        dynamicImage.remove();
        dynamicImages = dynamicImages.filter((img) => img !== dynamicImage);
      }, 1000);
    });
  }, 3000); // Timeout for removing images after 3 seconds
});

imageContainer.addEventListener("mouseenter", () => {
  // Clear timeout to prevent premature removal
  clearTimeout(removeImagesTimeout);
});

//footer animation mousemove
document.body.addEventListener("mousemove", function (event) {
  const screenWidth = window.innerWidth; // Get the screen width
  const cursorX = event.clientX; // Get the cursor's X position
  const footerImg = document.querySelector("#footer .footer-img");

  // Normalize the cursor position relative to screen width (between -1 and 1)
  const normalizedCursorX = (cursorX - screenWidth / 2) / (screenWidth / 2);

  // Calculate rotation degree based on normalized position (from -10 to +10 degrees)
  const rotationDegree = normalizedCursorX * 5;

  // Apply rotation with smooth transition
  footerImg.style.transform = `translate(-50%, -50%) rotate(${rotationDegree}deg)`;

  let img1 = document.querySelector("#footer .d-flex .image-container div");
  let img2Elements = document.querySelectorAll(
    "#footer .d-flex .image-container div:nth-child(2) img"
  );

  // Increase the rotation factors for a faster animation
  const rotationDegreeFaster = normalizedCursorX * 70; // Increased from 15 to 20
  const rotationDegreeOpposite = -normalizedCursorX * 65; // Increased from 10 to 15

  img1.style.transform = `translate(-50%, -50%) rotate(${rotationDegreeFaster}deg)`;

  img2Elements.forEach(function (img2) {
    img2.style.transform = `rotate(${rotationDegreeOpposite}deg)`;
  });
});

//navbar animation
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navbar");
  const footer = document.querySelector("#footer"); // Assuming your footer is defined with a <footer> tag

  // Function to handle the scroll event
  function handleScroll() {
    const footerPosition = footer.getBoundingClientRect().top; // Footer's position relative to the viewport
    const windowHeight = window.innerHeight; // Height of the viewport

    if (footerPosition <= windowHeight) {
      // If the footer is within the viewport, stick navbar to the bottom
      navbar.classList.add("bottom");
    } else {
      // Otherwise, keep it at the top
      navbar.classList.remove("bottom");
    }
  }

  // Detect when the footer is in view
  window.addEventListener("scroll", function () {
    const viewportWidth = window.innerWidth; // Width of the viewport

    // Only run the scroll event logic if the viewport width is 500px or more
    if (viewportWidth >= 768) {
      handleScroll();
    } else {
      // Ensure the navbar is not stuck to the bottom if viewport width is less than 500px
      navbar.classList.remove("bottom");
    }
  });
});

/* magnetic button animation */

var cerchio = document.querySelectorAll(".cerchio");

cerchio.forEach(function (elem) {
  $(document).on("mousemove touch", function (e) {
    magnetize(elem, e);
  });
});

function magnetize(el, e) {
  var mX = e.pageX,
    mY = e.pageY;
  const item = $(el);

  const customDist = item.data("dist") * 20 || 120;
  const centerX = item.offset().left + item.width() / 2;
  const centerY = item.offset().top + item.height() / 2;

  var deltaX = Math.floor(centerX - mX) * -0.45;
  var deltaY = Math.floor(centerY - mY) * -0.45;

  var distance = calculateDistance(item, mX, mY);

  if (distance < customDist) {
    TweenMax.to(item, 0.5, {
      y: deltaY,
      x: deltaX,
      scale: 1.1,
    });
    item.addClass("magnet");
  } else {
    TweenMax.to(item, 0.6, {
      y: 0,
      x: 0,
      scale: 1,
    });
    item.removeClass("magnet");
  }
}

function calculateDistance(elem, mouseX, mouseY) {
  return Math.floor(
    Math.sqrt(
      Math.pow(mouseX - (elem.offset().left + elem.width() / 2), 2) +
        Math.pow(mouseY - (elem.offset().top + elem.height() / 2), 2)
    )
  );
}

/**
 * SCROLL REVEAL
 */

const revealElements = document.querySelectorAll("[data-reveal]");

const scrollReveal = function () {
  for (let i = 0; i < revealElements.length; i++) {
    const elementIsInScreen =
      revealElements[i].getBoundingClientRect().top < window.innerHeight / 1.15;

    if (elementIsInScreen) {
      revealElements[i].classList.add("revealed");
    } else {
      revealElements[i].classList.remove("revealed");
    }
  }
};

window.addEventListener("scroll", scrollReveal);

scrollReveal();

/* document
  .querySelector("section#featured-works .hover-img")
  .addEventListener("mouseenter", () => {
    document.querySelector(
      "section#featured-works .row .d-flex"
    ).style.opacity = "0";
    document.querySelector(".navbar").style.opacity = "0";
  });

document
  .querySelector("section#featured-works  .hover-img")
  .addEventListener("mouseleave", () => {
    document.querySelector(
      "section#featured-works .row .d-flex"
    ).style.opacity = "1";
    document.querySelector(".navbar").style.opacity = "1";
  });
 */

// Select the h1 element within .background-hover
const textElement = document.querySelector(".background-hover h1");

// Set up the event listener on the image
document
  .querySelector("section#featured-works .hover-img")
  .addEventListener("mouseenter", () => {
    animateLetters(textElement);
    document.querySelector(
      "section#featured-works .row .d-flex"
    ).style.opacity = "0";
    document.querySelector(".navbar").style.opacity = "0";
  });

document
  .querySelector("section#featured-works  .hover-img")
  .addEventListener("mouseleave", () => {
    document.querySelector(
      "section#featured-works .row .d-flex"
    ).style.opacity = "1";
    document.querySelector(".navbar").style.opacity = "1";
  });

const textElement2 = document.querySelector(".background-hover2 h1");

document
  .querySelector("section#featured-works .sec-row .img-container .hover-img2")
  .addEventListener("mouseenter", () => {
    document.querySelector("section#featured-works .row").style.opacity = "0";
    animateLetters(textElement2);
    document.querySelector(
      "section#featured-works .row .d-flex"
    ).style.opacity = "0";
    document.querySelector(".navbar").style.opacity = "0";
  });

document
  .querySelector("section#featured-works .sec-row .img-container .hover-img2")
  .addEventListener("mouseleave", () => {
    document.querySelector("section#featured-works .row").style.opacity = "1";
    document.querySelector(
      "section#featured-works .row .d-flex"
    ).style.opacity = "1";
    document.querySelector(".navbar").style.opacity = "1";
  });

const textElement3 = document.querySelector(".background-hover3 h1");

document
  .querySelector("section#featured-works .row-img-container img")
  .addEventListener("mouseenter", () => {
    animateLetters(textElement3);
    document.querySelector(
      "section#featured-works .row .d-flex"
    ).style.opacity = "0";
    document.querySelector(".navbar").style.opacity = "0";
  });

document
  .querySelector("section#featured-works .row-img-container img")
  .addEventListener("mouseleave", () => {
    document.querySelector(
      "section#featured-works .row .d-flex"
    ).style.opacity = "1";
    document.querySelector(".navbar").style.opacity = "1";
  });

//Changing the background color on scroll
/* 
document.addEventListener("scroll", function () {
  const section = document.getElementById("work-cards");
  const sectionTop = section.offsetTop;
  const sectionHeight = section.offsetHeight;
  const windowHeight = window.innerHeight;
  const scrollPosition = window.scrollY + windowHeight;

  // Start changing background color earlier (e.g., 200px before the section starts)
  const startChangeOffset = 200;

  if (scrollPosition >= sectionTop - startChangeOffset) {
    let scrollProgress =
      (scrollPosition - (sectionTop - startChangeOffset)) /
      (sectionHeight + startChangeOffset);
    scrollProgress = Math.min(scrollProgress * 2, 1); // Increase the rate of change

    const startColor = { r: 232, g: 219, b: 206 };
    const endColor = { r: 0, g: 0, b: 0 };

    const newColor = {
      r: Math.round(
        startColor.r + (endColor.r - startColor.r) * scrollProgress
      ),
      g: Math.round(
        startColor.g + (endColor.g - startColor.g) * scrollProgress
      ),
      b: Math.round(
        startColor.b + (endColor.b - startColor.b) * scrollProgress
      ),
    };

    document.body.style.backgroundColor = `rgb(${newColor.r}, ${newColor.g}, ${newColor.b})`;
  } else {
    document.body.style.backgroundColor = "#E8DBCE";
  }
});
 */
document.addEventListener("scroll", function () {
  const section = document.getElementById("work-cards");
  const sectionTop = section.offsetTop;
  const sectionHeight = section.offsetHeight;
  const windowHeight = window.innerHeight;
  const scrollPosition = window.scrollY + windowHeight;

  // Start changing background color earlier (e.g., 200px before the section starts)
  const startChangeOffset = 200;

  if (scrollPosition >= sectionTop - startChangeOffset) {
    let scrollProgress =
      (scrollPosition - (sectionTop - startChangeOffset)) /
      (sectionHeight + startChangeOffset);
    scrollProgress = Math.min(scrollProgress * 4, 1); // Increase the rate of change (4 times faster)

    const startColor = { r: 232, g: 219, b: 206 };
    const endColor = { r: 10, g: 10, b: 10 };

    const newColor = {
      r: Math.round(
        startColor.r + (endColor.r - startColor.r) * scrollProgress
      ),
      g: Math.round(
        startColor.g + (endColor.g - startColor.g) * scrollProgress
      ),
      b: Math.round(
        startColor.b + (endColor.b - startColor.b) * scrollProgress
      ),
    };

    document.body.style.backgroundColor = `rgb(${newColor.r}, ${newColor.g}, ${newColor.b})`;
  } else {
    document.body.style.backgroundColor = "#E8DBCE";
  }
});
