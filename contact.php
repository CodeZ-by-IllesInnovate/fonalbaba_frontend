<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $phone = strip_tags(trim($_POST["phone"]));
    $message = trim($_POST["message"]);
    $privacy = isset($_POST["privacy"]);

    if (empty($name) || !filter_var($email, FILTER_VALIDATE_EMAIL) || empty($message) || !$privacy) {
        http_response_code(400);
        echo "Kérjük, töltsön ki minden mezőt, adjon meg egy érvényes email címet, és fogadja el az adatvédelmi nyilatkozatot.";
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        // SMTP konfiguráció
        $mail->isSMTP();
        $mail->Host = 'mail.dugulas.net'; // Állítsd be az SMTP szervert
        $mail->SMTPAuth = true;
        $mail->Username = 'info@dugulas.net'; // SMTP felhasználónév
        $mail->Password = 'um_!am!]D2QW'; // SMTP jelszó
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port = 465;

        // Címzett és feladó beállítása
        $mail->setFrom('info@fonalbaba.hu', 'Fonalbaba Amigurumi - Gondár Ibolya');
        // $mail->addAddress('profidugulas@gmail.com'); // A saját e-mail címed, ahová az üzenet érkezik

        // Tárgy és tartalom
        $mail->isHTML(true);
        $mail->CharSet = 'UTF-8'; // UTF-8 karakterkódolás beállítása
        $mail->Subject = "Új kapcsolatfelvétel: $name";
        $mail->Body = "
        <div style=\"font-family: Arial, sans-serif; color: #333; background-color: #f4f4f4; padding: 20px;\">
            <div style=\"max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;\">
                <div style=\"background-color: #1a202c; color: #ffffff; padding: 20px; text-align: center;\">
                    <h1 style=\"margin: 0; font-size: 24px;\">Új kapcsolatfelvételi üzenet érkezett</h1>
                </div>
                <div style=\"padding: 20px;\">
                    <h2 style=\"margin-top: 0; font-size: 20px; color: #1a202c;\">Részletek</h2>
                    <p style=\"margin: 0 0 10px;\"><strong>Név:</strong> $name</p>
                    <p style=\"margin: 0 0 10px;\"><strong>Email:</strong> $email</p>
                    <p style=\"margin: 0 0 10px;\"><strong>Telefonszám:</strong> $phone</p>
                    <p style=\"margin: 0 0 10px;\"><strong>Üzenet:</strong></p>
                    <p style=\"margin: 0 0 10px; color: #555;\">$message</p>
                </div>
                <div style=\"background-color: #e2e8f0; padding: 20px; text-align: center;\">
                    <p style=\"margin: 0; color: #4a5568;\">Ez egy automatikus visszaigazolás. Kérjük, ne válaszoljon erre az emailre.</p>
                </div>
            </div>
        </div>
        ";
        $mail->AltBody = "Név: $name\nEmail: $email\nTelefonszám: $phone\n\nÜzenet:\n$message\n";


        $mail->send();

        // 2. Üzenet küldése a felhasználónak (a formban megadott e-mail címre)
        $mail->clearAddresses(); // Korábbi címzettek törlése
        $mail->addAddress($email); // A felhasználó e-mail címe

        $mail->Subject = "Köszönjük, hogy kapcsolatba lépett velünk!";
        $mail->Body = "
        <div style=\"font-family: Arial, sans-serif; color: #333; background-color: #f4f4f4; padding: 20px;\">
            <div style=\"max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;\">
                <div style=\"background-color: #1a202c; color: #ffffff; padding: 20px; text-align: center;\">
                    <h1 style=\"margin: 0; font-size: 24px;\">Köszönjük üzenetét!</h1>
                </div>
                <div style=\"padding: 20px;\">
                    <h2 style=\"margin-top: 0; font-size: 20px; color: #1a202c;\">Kedves $name!</h2>
                    <p style=\"margin: 0 0 10px;\">Köszönjük, hogy kapcsolatba lépett velünk. Az alábbiakban megismételjük az Ön által küldött üzenet részleteit:</p>
                    <p style=\"margin: 0 0 10px;\"><strong>Üzenet:</strong></p>
                    <p style=\"margin: 0 0 10px; color: #555;\">$message</p>
                    <p style=\"margin: 0 0 10px;\">Hamarosan felvesszük Önnel a kapcsolatot.</p>
                </div>
                <div style=\"background-color: #e2e8f0; padding: 20px; text-align: center;\">
                    <p style=\"margin: 0; color: #4a5568;\">Ez egy automatikus visszaigazolás. Kérjük, ne válaszoljon erre az emailre.</p>
                </div>
            </div>
        </div>
        ";
        $mail->AltBody = "Kedves $name!\n\nKöszönjük, hogy kapcsolatba lépett velünk. Hamarosan felvesszük Önnel a kapcsolatot.\n\nÜzenet:\n$message";

        $mail->send();
        
        // Sikeres üzenetküldés visszatérés
        header("Location: success.html");
        exit;
    } catch (Exception $e) {
        header("Location: error.html");
        exit;
    }
} else {
    http_response_code(403);
    echo "Ez az oldal csak POST kéréseket fogad el.";
}
?>