<?php
importFast('auxteam/core/security/Config.fw');

date_default_timezone_set('America/Sao_Paulo');

$config = new Config();
$config->server = 'temmeuvoto.com';
$config->path = 'https://@SERVER@/';

$config->useFriendlyURLS = true;
$config->dbCrypt = false;

$config->dbEncoding = 'utf8';
$config->cacheScale = 0;
$config->dbType = 'mysql';
$config->debug = 1;
$config->isMultiLanguage = false;
$config->useRemoveAccents = false;
$config->uploadsPath = '../upload/';

$config->dateFormatPHP = 'm/d/Y';
$config->dateFormatJS = 'mm/dd/yy';

$config->domain = 'site';

$config->extra = ['basehref' => '/'];

$configs = array($config);
?>
