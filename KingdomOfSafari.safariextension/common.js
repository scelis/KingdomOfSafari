// Create the SC object.
if (typeof SC === "undefined") {
    window.SC = {};
}

/**
 * A helper method for doing a single conversation from a site script to
 * the global HTML page and back. Very useful when asking the global page
 * to do one-off requests, like access extension settings, perform an
 * XMLHttpRequest, or execute some script-specific SQL.
 */
SC.doConversation = function(name, data, callback) {
    var requestId = "callback_" + Math.random();
    var handleMessage = function(e) {
        if (typeof(e.message.requestId) !== "undefined" && e.message.requestId === requestId) {
            safari.self.removeEventListener("message", handleMessage);
            callback(e);
        }
    };
    safari.self.addEventListener("message", handleMessage, false);
    
    data.requestId = requestId;
    safari.self.tab.dispatchMessage(name, data);
}

/**
 * Retrieves a Safari setting and executes callback passing in the value
 * of the setting as a single parameter. If default is defined, that will
 * be passed in if the setting is not set.
 **/
SC.getSetting = function(key, callback) {
    SC.doConversation("getSetting", { "key" : key }, function(e) {
        callback(e.message.value);
    });
};
