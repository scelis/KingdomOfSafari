// Focus the main pane. Fixes a KoL bug in Safari where the main pane done not
// have focus after a page has loaded. Thus, you can not adventure using only
// the keyboard.
(function() {
    if (window.name === "mainpane") {
        var activeElement = document.activeElement;
        if (activeElement && (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA")) {
            return;
        }
        if (top.chatpane.SC_isActive) {
            activeElement = top.chatpane.document.activeElement;
            if (activeElement && (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA")) {
                return;
            }
        }
        window.focus();
    }
})();
