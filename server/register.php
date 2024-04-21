<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: *");

$host = 'tcp:' + getenv("UHOST") + '' + getenv("UPORT");
$dbusername = getenv("UID");
$pwd = getenv("UPWD");
$db_name = getenv("UDB_NAME");

$connectionInfo = array("UID" => $dbusername, "pwd" => $pwd, "Database" => $db_name, "LoginTimeout" => 30, "Encrypt" => 1, "TrustServerCertificate" => 0);
$serverName = $host;
$conn = sqlsrv_connect($serverName, $connectionInfo);


$request_body = file_get_contents('php://input');
$data = json_decode($request_body, true);
if ($data != NULL) {
    $username = $data['user'];
    $password = $data['pass'];
    $email = $data['email'];
    $first_name = $data['first_name'];

    $fsql = "SELECT * FROM Users WHERE username='$username'";
    $checkUser= sqlsrv_query($conn, $fsql);
    if ($checkUser == FALSE) {
        echo (sqlsrv_errors());
    } else if (!sqlsrv_has_rows($checkUser)) {
        $qsql = "SELECT * FROM Users WHERE email='$email'";
        $checkEmail = sqlsrv_query($conn, $qsql);
        if ($checkUser == FALSE) {
            echo (sqlsrv_errors());
        } else if (!sqlsrv_has_rows($checkEmail)) {
            echo ("REGISTER");
            $pass_hash = password_hash($password, PASSWORD_DEFAULT);
            $tsql= "INSERT INTO Users (username, pass, email, first_name) VALUES ('$username', '$pass_hash', '$email', '$first_name')";
            $getResults= sqlsrv_query($conn, $tsql);
            if ($getResults == FALSE) {
                echo (sqlsrv_errors());
            } else {
                echo json_encode(array('user' => $username, 'register' => True, 'error' => ""));
            }
        } else {
            echo json_encode(array('user' => $username, 'register' => False, 'error' => "Email"));
        }
    } else {
        echo json_encode(array('user' => $username, 'register' => False, 'error' => "Username"));
    }
}

?>