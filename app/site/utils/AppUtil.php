<?php
importFast("../vendor/autoload.php");

class AppUtil {
    public static function getEmailTemplate() {
        $templateEmail = new Controller(new FileView('../site/email/templateEmail.view'));
        return $templateEmail;
    }

    public static function sendAprovado($email, $data, $debug=false) {
        $templateEmail = AppUtil::getEmailTemplate();

        $c = new Controller(new FileView('../site/email/emailAprovado.view'));
        $c->getView()->data = $data;

        $templateEmail->addChild($c, "TARGET");

        if ($debug){
            return $templateEmail;
        }

        return AppUtil::sendEmailGun($email, '#TEMMEUVOTO - Cadastro Aprovado', $templateEmail->__toString());
    }

    public static function sendReprovado($email, $data, $debug=false) {
        $templateEmail = AppUtil::getEmailTemplate();

        $c = new Controller(new FileView('../site/email/emailReprovado.view'));
        $c->getView()->data = $data;

        $templateEmail->addChild($c, "TARGET");

        if ($debug){
            return $templateEmail;
        }

        return AppUtil::sendEmailGun($email, '#TEMMEUVOTO - Cadastro Reprovado', $templateEmail->__toString());
    }

    public static function sendFeedback($email, $data, $debug=false) {
        $templateEmail = AppUtil::getEmailTemplate();

        $c = new Controller(new FileView('../site/email/emailFeedback.view'));
        $c->getView()->data = $data;

        $templateEmail->addChild($c, "TARGET");

        if ($debug){
            return $templateEmail;
        }

        return AppUtil::sendEmailGun($email, '#TEMMEUVOTO - Aguardando Aprovação', $templateEmail->__toString());
    }

    public static function sendPrimeiroCadastro($email, $data, $debug=false) {
        $templateEmail = AppUtil::getEmailTemplate();

        $c = new Controller(new FileView('../site/email/emailPrimeiroCadastro.view'));
        $c->getView()->data = $data;

        $templateEmail->addChild($c, "TARGET");

        if ($debug){
            return $templateEmail;
        }

        return AppUtil::sendEmailGun($email, '#TEMMEUVOTO - Senha de Acesso', $templateEmail->__toString());
    }

    public static function sendRecoveryPass($email, $data, $debug=false) {
        $templateEmail = AppUtil::getEmailTemplate();

        $c = new Controller(new FileView('../site/email/emailRecovery.view'));
        $c->getView()->data = $data;

        $templateEmail->addChild($c, "TARGET");

        if ($debug){
            return $templateEmail;
        }

        return AppUtil::sendEmailGun($email, 'Recupera Senha de Acesso', $templateEmail->__toString());
    }




    public static function sendEmailGun($to, $subject, $body, $noreply='') {
           $key = App::$instance->getSystemVars("mailgun_key");
           $domain = App::$instance->getSystemVars("mailgun_domain");

           if (!$noreply)
                $noreply = App::$instance->getSystemVars("mailgun_noreply");

           $mg = new Mailgun\Mailgun($key);

           try {
               $result = $mg->sendMessage($domain, array(
                       'from' => 'Temmeuvoto <' . $noreply . '>',
                       'to' => $to,
                       'subject' => $subject,
                       'html' => $body,
                       'text' => strip_tags($body)
                   )
               );
               return 1;
           } catch (Exception $e) {
               var_dump('error', $e->getMessage());
               return 0;
           }
    }

    public static function randPass( $length = 8, $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' ) {
        return substr( str_shuffle( $chars ), 0, $length );
    }

    public static function saltPassword($password)
    {
        $options = [
            'cost' => 11,
        ];

        return password_hash($password, PASSWORD_BCRYPT, $options);
    }

    public static function isPasswordValid($password, $hash)
    {
        return password_verify($password, $hash);
    }

    private static function cleanFormat($str){
        return str_replace(array(" ", "-", "_", "/", "\\", "."), "", $str);
    }
}

?>
