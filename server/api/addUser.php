<?php
require_once '../handlers/dbConnect.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $first = (mysqli_real_escape_string($db, $_POST['first']));
    $last = (mysqli_real_escape_string($db, $_POST['last']));
    $email = (mysqli_real_escape_string($db, $_POST['email']));
    $password = (mysqli_real_escape_string($db, $_POST['password']));
    $tz = (mysqli_real_escape_string($db, $_POST['tz']));
    $dob = (mysqli_real_escape_string($db, $_POST['dob']));
    $query = "INSERT INTO `users`(`firstName`, `lastName`, `email`, `password`, `teudatZeut`, `DOB`)
    VALUES ('$first', '$last', '$email', '$password', '$tz', '$dob')";
    $result = mysqli_query($db, $query);
    if ($result) {
        $message = "success";
    } else {
        $message = "error";
    }
    $object = (object) ['message' => $message];
    echo json_encode($object);
    mysqli_close($db);
}
?>