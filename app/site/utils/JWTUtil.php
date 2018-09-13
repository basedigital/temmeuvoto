<?
use \Firebase\JWT\JWT;

class JWTUtil
{
    private static $key = '@@@@@@@@@@@@@@@@@@@@';

    public static function generateToken($data)
    {
        $tokenId = base64_encode(bin2hex(openssl_random_pseudo_bytes(32)));
        $issuedAt = time();
        $notBefore = $issuedAt - 5;             //Remove 5 seconds
        $expire = $notBefore + 60 * 60 * 24 * 30;            // Adicionando 30 dias

        $data = [
            'iat' => $issuedAt,         // Issued at: time when the token was generated
            'jti' => $tokenId,          // Json Token Id: an unique identifier for the token
            'iss' => '@@@@@@@@@@@@',       // Issuer
            'nbf' => $notBefore,        // Not before
            'exp' => $expire,           // Expire
            'data' => $data
        ];

        return JWT::encode($data, JWTUtil::$key, 'HS512');
    }

    public static function isValidToken()
    {
        $data = JWTUtil::getDataToken();

        return $data ? true : false;
    }

    public static function getDataToken()
    {
        $headers = getallheaders();
        $headerAuth = @$headers['authorization'] ?: @$headers['Authorization'];

        if ($headerAuth) {
            list($jwt) = sscanf($headerAuth, 'Bearer %s');

            if ($jwt) {
                try {
                    $token = JWT::decode($jwt, JWTUtil::$key, array('HS512'));
                    return $token;
                } catch (Exception $e) {
                    //var_dump($e->getMessage());
                }
            }
        }

        return null;
    }
}

?>
