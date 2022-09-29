<?php

//making site headless
define( 'HEADLESS_MODE_CLIENT_URL', 'https://passionate-photography.netlify.app' );
/**

 * The base configuration for WordPress

 *

 * The wp-config.php creation script uses this file during the

 * installation. You don't have to use the web site, you can

 * copy this file to "wp-config.php" and fill in the values.

 *

 * This file contains the following configurations:

 *

 * * MySQL settings

 * * Secret keys

 * * Database table prefix

 * * ABSPATH

 *

 * @link https://wordpress.org/support/article/editing-wp-config-php/

 *

 * @package WordPress

 */


// ** MySQL settings - You can get this info from your web host ** //

/** The name of the database for WordPress */

define( 'DB_NAME', "7oiden_com_pp" );


/** MySQL database username */

define( 'DB_USER', "7oiden_com_pp" );


/** MySQL database password */

define( 'DB_PASSWORD', "RaZ0fiel_" );


/** MySQL hostname */

define( 'DB_HOST', "localhost" );


/** Database Charset to use in creating database tables. */

define( 'DB_CHARSET', 'utf8mb4' );


/** The Database Collate type. Don't change this if in doubt. */

define( 'DB_COLLATE', '' );


/**#@+

 * Authentication Unique Keys and Salts.

 *

 * Change these to different unique phrases!

 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}

 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.

 *

 * @since 2.6.0

 */

define( 'AUTH_KEY',         '#G<!mP$@Jl&N`h0uexg)IDDEgZ{=7pD[M5A71sZ-z$t]`iIMr}SsL.(2*>c;fEE|' );

define( 'SECURE_AUTH_KEY',  '= XE9A)9P;{#}e05P3xA96:iUnt*z7#m<U1$Crd[gisd%W sYprY#RTr![g.^>(8' );

define( 'LOGGED_IN_KEY',    '2V-CTrsyva(|(a$[V7|)OSR1+ciEifa/ =:5Upw&FVoWpHKQEZRnpJ]FHyf!Sg$w' );

define( 'NONCE_KEY',        'T%]hyBnZ6Q3jUs=@ 2Ywo>|O^r8yB?oD)ls9b$lOKFQraxY72S^@>$<APKI7/F:!' );

define( 'AUTH_SALT',        'y/}^z[+L_c1kq~n&j~_w>c}@s8)Sv!FQ~<igO{!R>!dQ~C?Hc~Z~y?iS^3iT>XD4' );

define( 'SECURE_AUTH_SALT', '?B($ob0ksg>qU>9MU8l~A-6^r,}C,1Y_[r/W`Q=m M.!R +fIH6QxP<;#PAaBvjw' );

define( 'LOGGED_IN_SALT',   '`|?vsh9as~e.O/~Uf63jR0)MZi|BYv8]RR&Hi)P[T1:]2v;o+vv_9=:BMGlEL>.d' );

define( 'NONCE_SALT',       'QewMbk7nRK,?p&sZ-@snf02b*F?(B7S+iEWqZ<8:JL;6s9kcLTXnROIgXw0vozT}' );


/**#@-*/


/**

 * WordPress Database Table prefix.

 *

 * You can have multiple installations in one database if you give each

 * a unique prefix. Only numbers, letters, and underscores please!

 */

$table_prefix = 'wp_';


/**

 * For developers: WordPress debugging mode.

 *

 * Change this to true to enable the display of notices during development.

 * It is strongly recommended that plugin and theme developers use WP_DEBUG

 * in their development environments.

 *

 * For information on other constants that can be used for debugging,

 * visit the documentation.

 *

 * @link https://wordpress.org/support/article/debugging-in-wordpress/

 */

define( 'WP_DEBUG', false );


/* That's all, stop editing! Happy publishing. */


/** Absolute path to the WordPress directory. */

if ( ! defined( 'ABSPATH' ) ) {

	define( 'ABSPATH', __DIR__ . '/' );

}


/** Sets up WordPress vars and included files. */

require_once ABSPATH . 'wp-settings.php';



