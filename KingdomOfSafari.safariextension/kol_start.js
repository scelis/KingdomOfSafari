(function() {

// Determine which window is active.
window.SC_isActive = false;
var handleFocusEvent = function(e) {
    window.SC_isActive = true;
};
var handleBlurEvent = function(e) {
    window.SC_isActive = false;
};
window.addEventListener("focus", handleFocusEvent)
window.addEventListener("blur", handleBlurEvent)

// Handle keyboard events.
var handleKeyboardEvent = function(e) {
    var inputIsActive = false;
    var activeElement = document.activeElement;
    if (activeElement && (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA")) {
        inputIsActive = true;
    }
    
    if (e.keyCode === 191 && !inputIsActive) {        // '/'
        top.chatpane.focus();
        top.chatpane.chatform.graf.focus();
        top.chatpane.chatform.graf.value = "/";
    }
    else if (e.keyCode === 190 && !inputIsActive) {   // '.'
        top.chatpane.focus();
        top.chatpane.chatform.graf.focus();
    }
    else if (e.keyCode === 68 && e.ctrlKey) {         // 'd'
        top.mainpane.focus();
    }
};

window.addEventListener("keydown", handleKeyboardEvent)

})();
