
// // Select the form element and the status text element
// const form = document.querySelector("form"),
//       statusText = form.querySelector("span");

// // When the form is submitted...
// form.onsubmit = (e) => {
//   // Prevent the default form submission behavior
//   e.preventDefault();

//   // Set initial status text appearance
//   statusText.style.color = "#0D6EFD";
//   statusText.style.display = "block";
//   statusText.innerText = "Sending your message...";
//   form.classList.add("disabled");

//   // Create a new XMLHttpRequest object
//   let xhr = new XMLHttpRequest();

//   // Configure the request with the POST method and URL
//   xhr.open("POST", "message.php", true);

//   // When the request has completed...
//   xhr.onload = () => {
//     if (xhr.readyState == 4 && xhr.status == 200) {
//       // Get the response from the server
//       let response = xhr.response;

//       // Check if the response contains specific keywords to determine success or failure
//       if (response.indexOf("required") != -1 || response.indexOf("valid") != -1 || response.indexOf("failed") != -1) {
//         // If there are errors, set status text color to red
//         statusText.style.color = "red";
//       } else {
//         // If successful, reset the form and hide the status text after a delay
//         form.reset();
//         setTimeout(() => {
//           statusText.style.display = "none";
//         }, 3000);
//       }

//       // Set the status text content to the response
//       statusText.innerText = response;
//       form.classList.remove("disabled");
//     }
//   }

//   // Create a new FormData object to gather form data
//   let formData = new FormData(form);

//   // Send the form data via the XMLHttpRequest
//   xhr.send(formData);
// }



// Select the form element and the status text element
const form = document.querySelector("form"),
  statusText = form.querySelector("span");

// When the form is submitted...
form.onsubmit = async (e) => {
  // Prevent the default form submission behavior
  e.preventDefault();

  // Set initial status text appearance
  statusText.style.color = "#0D6EFD";
  statusText.style.display = "block";
  statusText.innerText = "Sending your message...";
  form.classList.add("disabled");

  // Create a new FormData object to gather form data
  let formData = new FormData(form);

  try {
    // Send the form data via a fetch POST request
    let response = await fetch("message.php", {
      method: "POST",
      body: formData,
    });

    // Get the response text
    let responseText = await response.text();

    // Check if the response contains specific keywords to determine success or failure
    if (responseText.indexOf("Thank you") !== -1) {
      // If successful, reset the form and hide the status text after a delay
      form.reset();
      setTimeout(() => {
        statusText.style.display = "none";
      }, 3000);
    } else {
      // If there are errors, set status text color to red
      statusText.style.color = "red";
    }

    // Set the status text content to the response
    statusText.innerText = responseText;
    form.classList.remove("disabled");
  } catch (error) {
    // If there's an error with the fetch request, display a failure message
    statusText.style.color = "red";
    statusText.innerText = "Failed to send your message!";
    form.classList.remove("disabled");
  }
};

