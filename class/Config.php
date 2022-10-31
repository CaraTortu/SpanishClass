<?php

/*
    Created by: Javier Díaz.
    https://javier.ie!
*/

namespace Chat;

class ClassConfig {

    // General settings.
    public $server_hostname = "http://class.local";   // Server hostname. (with http:// || https://)
    public $server_port = "80";                       // Port in which the server on. (Normally 80 for http and 443 for https.)

    // Database settings.
    public $db_path = "db/class.db";                 // Path to the database file. 
    public $db_type = "sqlite";                     // Database type.

    // Mail configuration. (*) means required.
    public $smtp_server = "";                       // SMTP server *
    public $smtp_port = 465;                        // SMTP port *
    public $smtp_auth = true;                       // SMTP authentication *
    public $smtp_username = "";                     // SMTP username
    public $smtp_password = "";                     // SMTP password
    public $smtp_ssl = true;                        // SMTP SSL 
    public $smtp_tls = false;                       // SMTP TLS 
    public $smtp_ehlo = "";                         // SMTP HELO

}
