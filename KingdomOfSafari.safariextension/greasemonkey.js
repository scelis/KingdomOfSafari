(function() {
    
    var scriptName = null;
    var scriptStorage = {};
    window.unsafeWindow = window;
    
    window.GM_init = function(name, callback) {
        scriptName = name;
        SC.doConversation("initGreasemonkeyScript", { "scriptName" : scriptName }, function(e) {
            var data = e.message.scriptStorage;
            for (var key in data) {
                scriptStorage[key] = data[key];
            }
            callback();
        });
    };
    
    window.GM_log = function(text) {
        console.log(text);
    }

    window.GM_getValue = function(key) {
        var value = scriptStorage[key];
        if (value === "SC_TRUE_VALUE") {
            value = true;
        }
        else if (value === "SC_FALSE_VALUE") {
            value = false;
        }
        else if (value === undefined) {
            value = null;
        }
        else if (value.indexOf("SC_NUMBER_VALUE_") === 0) {
            value = parseInt(value.substring("SC_NUMBER_VALUE_".length));
        }
        return value;
    };

    window.GM_setValue = function(key, val) {
        if (val === true) {
            val = "SC_TRUE_VALUE";
        }
        else if (val === false) {
            val = "SC_FALSE_VALUE";
        }
        else if (typeof val === "number") {
            val = "SC_NUMBER_VALUE_" + val;
        }
        
        scriptStorage[key] = val;
        
        var data = {
            "scriptName" : scriptName,
            "key" : key,
            "value" : val
        };
        safari.self.tab.dispatchMessage("setGreasemonkeyValue", data);
    };

    window.GM_deleteValue = function(key) {
        delete scriptStorage[key];
        
        var data = {
            "scriptName" : scriptName,
            "key" : key
        };
        safari.self.tab.dispatchMessage("deleteGreasemonkeyValue", data);
    };

    window.GM_xmlhttpRequest = function(data) {
        var requestId = "callback_" + Math.random();
        data.requestId = requestId;
        var httpRequestReadyStateChanged = function(e) {
            if (e.name === "httpRequestOnReadyStateChange" && e.message.requestId === requestId) {
                if (e.message.readyState === 4) {
                    if (e.message.responseText) {
                        if (data.onload) {
                            data.onload(e.message);
                        }
                    }
                    else if (data.onerror) {
                        data.onerror(e.message);
                    }
                    safari.self.removeEventListener("message", httpRequestReadyStateChanged, false);
                }
                else if (data.onreadystatechange) {
                    data.onreadystatechange(e.message);
                }
            }
        };
        safari.self.addEventListener("message", httpRequestReadyStateChanged, false);
        safari.self.tab.dispatchMessage("performHttpRequest", data);
    };

})();
