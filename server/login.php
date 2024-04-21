<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: *");

$host = 'tcp:' . getenv('UHOST') . ',' . getenv("UPORT");
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

    $tsql= "SELECT * FROM Users WHERE username='$username'";
    $getResults= sqlsrv_query($conn, $tsql);


    if ($getResults == FALSE) {
        echo (sqlsrv_errors());
    } else {
        if (!sqlsrv_has_rows($getResults)) {
            echo json_encode(array('user' => $username, 'login' => False));
        } else {
            while ($row = sqlsrv_fetch_array($getResults, SQLSRV_FETCH_ASSOC)) {
                if (password_verify($password, $row['pass'])) {
                    echo json_encode(array('user' => $username, 'login' => True));
                } else {
                    echo json_encode(array('user' => $username, 'login' => False));
                }
            
            }
        }   
    }
}
    
?>