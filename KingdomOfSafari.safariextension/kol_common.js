// Create the SC object.
if (typeof SC === "undefined") {
    window.SC = {};
}

// Create the SC object.
if (typeof SC.KOL === "undefined") {
    SC.KOL = {};
}

SC.KOL.serverUrlPrefix = function() {
    return window.location.protocol + '//' + window.location.host + '/';
}
