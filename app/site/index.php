<?
    mb_internal_encoding('utf8');

    $importPathWeb = '../lib/auxteam/core/coding/Import.fw';
    $classPathWeb = array("../lib/", "./", '../adminbase/');

    //RODANDO LOCAL
    $importPathLocal = '../../../../frameworks/php/lib/auxteam/core/coding/Import.fw';
    $classPathLocal = array("../../../../frameworks/php/lib/", "./", '../../../../frameworks/php/adminbase/');

    if (file_exists($importPathWeb)) {
        include($importPathWeb);
        Import::setClasspath($classPathWeb);
    } else {
        include($importPathLocal);
        Import::setClasspath($classPathLocal);
    }

    include('../config.php');
    Import::setRelativePath("../", "site/");

    importFast("auxteam/core/App.fw");
    importFast('auxteam/core/utils/ArrayUtil.fw');
    importFast("template/Template.site");
    importFast("utils/AppUtil.php");
    importFast("utils/JWTUtil.php");

    Log::$enabled = false;

    $app = new App($configs);
    $app->cacheAllSystemVars(array(), true, 5 * 60);

    $app->clearAllJS();
    $app->clearAllCSS();

    $app->registerDefaultDocument('home', 'modules/home/HomeDocument.site');
    $app->registerDocument('api', 'modules/api/ApiDocument.site');
    $app->registerDocument('share', 'modules/share/ShareDocument.site');

    $template = new Template();
    $app->setTemplate($template);

    $app->initGoByURL();

    echo $app->render();
?>
