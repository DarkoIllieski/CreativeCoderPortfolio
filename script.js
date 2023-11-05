document.addEventListener("DOMContentLoaded", () => {
  const langBtn = document.getElementById("langBtn");
  let currentLang = "en";

  langBtn.addEventListener("click", () => {
    if (currentLang === "en") {
      currentLang = "de";
      langBtn.style.backgroundImage = "url('./public/english.jpg')";
      langBtn.textContent = " "; // This will hide the text, making space for the flag image
    } else {
      currentLang = "en";
      langBtn.style.backgroundImage = "url('./public/german.jpg')";
      langBtn.textContent = " "; // This will hide the text, making space for the flag image
    }

    const elementsWithData = document.querySelectorAll("[data-en], [data-de]");
    elementsWithData.forEach((el) => {
      if (currentLang === "en") {
        if (el.hasAttribute("data-en"))
          el.textContent = el.getAttribute("data-en");
      } else {
        if (el.hasAttribute("data-de"))
          el.textContent = el.getAttribute("data-de");
      }
    });
  });

  //to top button

  const toTopButton = document.getElementById("toTop");

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 100) {
      toTopButton.style.display = "block";
    } else {
      toTopButton.style.display = "none";
    }
  });

  toTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

//navbar

document.addEventListener("DOMContentLoaded", function () {
  let menuIcon = document.querySelector(".menu-icon");
  let navbar = document.querySelector(".navbar");
  let navbarLinks = document.querySelectorAll(".navbar-link");

  // Open the navbar dropdown on hover over the menu icon
  menuIcon.addEventListener("mouseenter", function () {
    navbar.classList.add("responsive");
  });

  // Close the navbar dropdown when the mouse leaves the navbar area
  navbar.addEventListener("mouseleave", function () {
    navbar.classList.remove("responsive");
  });

  // Close the navbar dropdown after a navbar link is clicked
  navbarLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navbar.classList.remove("responsive");
    });
  });
});

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    console.log("Form submitted. Fetching values...");

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    console.log(`Fetched values - Name: ${name}, Email: ${email}, Message: ${message}`);

    fetch('https://your-backend-service.com/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            email,
            message,
        }),
    })
    .then(response => response.json())  // <-- Add this line to parse the response as JSON
    .then(data => {
        console.log(`Server responded with:`, data);
        if (data.status === 'success') {  // <-- Change this line to check the 'status' property
            alert('Email sent successfully!');
        } else {
            alert('Error sending email. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error during the fetch:', error.message);
        alert('Error sending email. Please check the console for more details.');
    });
});

