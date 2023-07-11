const inputs = document.querySelectorAll(".input-field");
const toggle_btn = document.querySelectorAll(".toggle");
const main = document.querySelector("main");
const bullets = document.querySelectorAll(".bullets span");
const images = document.querySelectorAll(".image");

inputs.forEach(inp => {
    inp.addEventListener("focus", () => {
        inp.classList.add("active");
    });
    inp.addEventListener("blur", () => {
        if (inp.value != "") return;
        inp.classList.remove("active");
    });
});

toggle_btn.forEach((btn) => {
    btn.addEventListener("click", () => {
        main.classList.toggle("sign-up-mode");
    });
});

function moveSlider(){
    let index = this.dataset.value;
    console.log(index);

    let currentImage = document.querySelector(`.img-${index}`);
    images.forEach((img) => img.classList.remove("show"));
    currentImage.classList.add("show");

    const textSlider = document.querySelector(".text-group");
  textSlider.style.transform = `translateY(${-(index - 1) * 2.2}rem)`;

    bullets.forEach((bull) => bull.classList.remove("active"));
    this.classList.add("active");
}

bullets.forEach((bullet) => {
    bullet.addEventListener("click", moveSlider);
});


////////////////////////////////////////////////////////////////////////////////////////

// function generateOTP() {
//     // Define the length of the OTP
//     const OTP_LENGTH = 6;

//     // Define the possible characters that can be used in the OTP
//     const OTP_CHARS = "0123456789";

//     let otp = "";

//     // Generate a random OTP by selecting random characters from the possible characters
//     for (let i = 0; i < OTP_LENGTH; i++) {
//       otp += OTP_CHARS.charAt(Math.floor(Math.random() * OTP_CHARS.length));
//     }

//     // Return the generated OTP
//     return otp;
//   }

//   function sendOTP() {
//     // Get the user's email address from the form input
//     const email = document.getElementById("email").value;

//     // Generate the OTP
//     const otp = generateOTP();

//     // Send the OTP to the user's email address using an email service provider's API
//     // Replace the placeholders with your own API key, sender email address, and message content
//     const apiUrl = "https://76afcd7854b17d192fe57d4d83cea870-us21.api.mailchimp.com/3.0/" + email + "&message=Your+OTP+is+" + otp;

//     fetch(apiUrl)
//       .then(response => {
//         if (response.ok) {
//           alert("OTP sent successfully!");
//           // Store the generated OTP in local storage for later verification
//           localStorage.setItem("otp", otp);
//         } else {
//           alert("Error sending OTP. Please try again.");
//         }
//       })
//       .catch(error => {
//         alert("Error sending OTP. Please try again.");
//         console.error(error);
//       });
//   }

//   function verifyOTP() {
//     const enteredOTP = document.getElementById("otp").value;
//     const generatedOTP = localStorage.getItem("otp");

//     if (enteredOTP === generatedOTP) {
//       alert("OTP verification successful!");
//     } else {
//       alert("OTP verification failed. Please try again.");
//     }
//   }