
<?php
  // Get values from the POST request and escape special characters
  $name = htmlspecialchars($_POST['name']);
  $email = htmlspecialchars($_POST['email']);
  $phone = htmlspecialchars($_POST['phone']);
  $message = htmlspecialchars($_POST['message']);

  // Check if both email and message are not empty
  if (!empty($name) && !empty($email) && !empty($phone) && !empty($message)  ) {
    // Validate the email format
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
      // Set the recipient's email address
      $receiver = "harikamanapurapu1010@gmail.com"; // Enter the email address where you want to receive messages

      // Construct the email subject
      $subject = "From: $name <$email>";

      // Construct the email body
      $body = "Name: $name\nEmail: $email\nPhone: $phone\n\nMessage:\n$message\n\nRegards,\n$name";

      // Set the sender's email address
      $sender = "From: $email";

      // Attempt to send the email
      if (mail($receiver, $subject, $body, $sender)) {
         echo "Thank you for contacting us"; // Success message
      } else {
         echo "Sorry, failed to send your message!"; // Failure message
      }
    } else {
      echo "Enter a valid email address!"; // Invalid email format message
    }
  } else {
    echo "Email and message field is required!"; // Empty fields message
  }
?>
