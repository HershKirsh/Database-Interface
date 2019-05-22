<?php
require_once '../handlers/dbConnect.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $first = (mysqli_real_escape_string($db, $_POST['first']));
    $last = (mysqli_real_escape_string($db, $_POST['last']));
    $email = (mysqli_real_escape_string($db, $_POST['email']));
    $password = (mysqli_real_escape_string($db, $_POST['password']));
    $tz = (mysqli_real_escape_string($db, $_POST['tz']));
    $dob = (mysqli_real_escape_string($db, $_POST['dob']));
    $query = "UPDATE `users`
    SET `firstName` = '$first', `lastName` = '$last', `email` = '$email', `password` = '$password', `DOB` = '$dob'
    WHERE `teudatZeut` = $tz;";
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