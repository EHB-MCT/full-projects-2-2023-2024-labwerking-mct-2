<?php
  // Configuration
  $to = 'seppe.ghekiere@gmail.com';
  $subject = 'Contact Form Submission';

  // Get the form data
  $name = $_POST['name'];
  $email = $_POST['email'];
  $description = $_POST['description'];

  // Create the email message
  $message = "Naam: $name\n";
  $message .= "E-mail: $email\n";
  $message .= "Bericht: $description\n";

  // Send the email
  if (mail($to, $subject, $message)) {
    echo 'Email sent successfully';
  } else {
    echo 'Error sending email';
  }
?>