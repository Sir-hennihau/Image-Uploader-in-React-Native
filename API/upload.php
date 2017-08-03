<?php
// ---FYI---

// Create an upload folder "./upload"
// Control and set your own values for allowed_extensions, max_size

// Check my Simple-PHP-Upload repo (https://github.com/Sir-hennihau/simple-php-upload)
// for an example index.html to test this script and a simplified version of this script.

$upload_folder = 'upload/'; // Your upload folder
$max_size = 100000000; // = 100 Mb
$allowed_extensions = array('png', 'jpg', 'jpeg', 'gif', 'mp4', 'gp3', 'webm');

// Get filename
$filename = pathinfo($_FILES['data']['name'], PATHINFO_FILENAME);
// Get file extension
$extension = strtolower(pathinfo($_FILES['data']['name'], PATHINFO_EXTENSION));

//Check file extension
if(!in_array($extension, $allowed_extensions)) {
 die("Invalid file extension. Only png, jpg, jpeg, gif, mp4, gp3 and webm are allowed.");
}

// Check if file exceeds a maximum file size

if($_FILES['data']['size'] > $max_size) {
 die("File exceeds maximum data size.");
}

// Optional: Check, if the image contains errors
// Only useful if only upload images
/*
if(function_exists('exif_imagetype')) { //Die exif_imagetype-Funktion erfordert die exif-Erweiterung auf dem Server
 $allowed_types = array(IMAGETYPE_PNG, IMAGETYPE_JPEG, IMAGETYPE_GIF);
 $detected_type = exif_imagetype($_FILES['data']['tmp_name']);
 if(!in_array($detected_type, $allowed_types)) {
 die("Nur der Upload von Bilddateien ist gestattet");
 }
}
*/

// Path to upload
$new_path = $upload_folder.$filename.'.'.$extension;

// Chose a new filename if the old one already exists
if(file_exists($new_path)) { //If filename already exists, add a "_number" to the filename
 $id = 1;
 do {
 $new_path = $upload_folder.$filename.'_'.$id.'.'.$extension;
 $id++;
 } while(file_exists($new_path));
}


// All checks passed succesfully, move file to /upload
move_uploaded_file($_FILES['data']['tmp_name'], $new_path);
echo 'File uploaded to: <a href="'.$new_path.'">'.$new_path.'</a>';
?>
