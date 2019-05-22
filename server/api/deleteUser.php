<?php
require_once '../handlers/dbConnect.php';

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $id = (mysqli_real_escape_string($db, $_GET['id']));
    $query = "DELETE FROM `users`
    WHERE `id` = $id;";
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