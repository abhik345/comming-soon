// Set the opening time (24-hour format)
const openingTime = "09:00:00";

function updateCountdown() {
  // Get the current date and time
  const now = new Date();

  // Set the opening time for today
  const openingTimeToday = new Date(now.toDateString() + " " + openingTime);

  // If the current time is after the opening time, set the opening time for tomorrow
  if (now > openingTimeToday) {
    openingTimeToday.setDate(openingTimeToday.getDate() + 1);
  }

  // Calculate the remaining time until the opening time
  const remainingTime = openingTimeToday - now;

  // Convert the remaining time to hours, minutes, and seconds
  let hours = Math.floor(remainingTime / (1000 * 60 * 60));
  let minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

  // Display the remaining time in the HTML file
  const hourSpan = document.getElementById("hours");
  hourSpan.innerHTML = `${hours} hours`;

  const minutesSpan = document.getElementById("minutes");
  minutesSpan.innerHTML = `${minutes} minutes`;

  const secondsSpan = document.getElementById("seconds");
  secondsSpan.innerHTML = `${seconds} seconds`;
}

// Update the countdown every second
setInterval(updateCountdown, 1000);

const nodemailer = require("nodemailer");
require("dotenv").config();

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  const email = form.email.value;
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      password: process.env.EMAIL_PASSWORD,
    },
  });
  const message = {
    from: "Shop EveryThing",
    to: email,
    subject: "Welcome to Shop Everything!",
    html: "<p>Thank you for subscribing to Shop Everything!</p>",
  };

  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Info send: ${info.response}`);
      location.reload();
    }
  });
  event.preventDefault();
});
