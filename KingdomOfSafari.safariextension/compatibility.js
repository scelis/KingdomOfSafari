/**
 * Apparently Safari does not allow extensions to access URLEncode. Who knows why...
 * This is the exact same implementation Safari normally uses, pulled right out of the
 * console when printing the function itself.
 */
function URLEncode(x) {
    var SAFECHARS = "0123456789" +					// Numeric
    				"ABCDEFGHIJKLMNOPQRSTUVWXYZ" +	// Alphabetic
    				"abcdefghijklmnopqrstuvwxyz" +
    				"-_.!~*'()";					// RFC2396 Mark characters
	var HEX = "0123456789ABCDEF";

	var plaintext = x;
	var encoded = "";
	for ( var i = 0; i < plaintext.length; i++ ) {
		var ch = plaintext.charAt( i );
		if ( ch=="+" ) {
			encoded+="%2B";
		} else if ( ch == " " ) {
				encoded += "+";				// x-www-urlencoded, rather than %20
		} else if ( SAFECHARS.indexOf( ch ) != -1 ) {
				encoded += ch;
		} else {
				var charCode = ch.charCodeAt( 0 );
			if ( charCode > 255 ) {
					alert( "Unicode Character '" + ch + "' cannot be encoded using standard URL encoding.\n" +
								"( URL encoding only supports 8-bit characters. )\n" +
						"A space ( + ) will be substituted." );
				encoded += "+";
			} else {
				encoded += "%";
				encoded += HEX.charAt( ( charCode >> 4 ) & 0xF );
				encoded += HEX.charAt( charCode & 0xF );
			}
		}
	}

	return encoded;
}
