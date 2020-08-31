function getChannelName() {
    var t = window.location.pathname.match(/^\/popout\/([^\/]+)\/chat(\/|$)/) || window.location.pathname.match(/^\/embed\/([^\/]+)\/chat(\/|$)/) || window.location.pathname.match(/^\/([^\/]+)(\/|$)/);
    return t ? t[1].toLowerCase() : null;
}

function inject(t) {
    var e = document.createElement("script");
    Object.assign(e, t), document.body.appendChild(e), document.body.removeChild(e)
}

function relayToEmbeddedChat(t) {
    postman = document.querySelector("#twitch-giveaways-message-passing");
    return postman ? void postman.setAttribute("data-in", JSON.stringify(t)) : void console.log("Twitch Çekilişleri: Can't relay to chat listener, postman not loaded yet.")
}

var channel = getChannelName();
var button = document.createElement("a");
button.className = "tgr-button button button--icon-only float-left";
button.title = "Twitch Çekilişleri";
button.target = "_blank";
button.innerHTML = '<svg class="tw-svg__asset tw-svg__asset--inherit" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><title>Twitch Çekilişleri</title><g><g><path d="m359.801 429.3-103.801-30-103.801 30c-.899 1.8-1.199 3.6-1.199 5.7v62h210v-62c0-2.1-.3-3.9-1.199-5.7z" fill="#646d73"/></g><path d="m361 497v-62c0-2.1-.3-3.9-1.199-5.7l-103.801-30v97.7z" fill="#474f54"/><path d="m497 30h-76.645c.132-5.067.645-9.84.645-15 0-8.401-6.599-15-15-15h-300c-8.401 0-15 6.599-15 15 0 5.16.513 9.933.643 15h-76.643c-8.291 0-15 6.709-15 15v37.998c0 83.754 67.092 151.791 149.773 156.171 17.225 23.716 37.668 41.316 60.927 51.231-3.6 72.9-45.3 123.6-55.199 134.101-1.501 1.199-2.701 2.999-3.301 4.799h207.601c-.601-1.8-1.8-3.6-3.301-4.799-10.2-10.501-51.6-60.901-55.2-134.101 23.264-9.917 43.83-27.521 61.069-51.246 82.61-4.451 149.631-72.449 149.631-156.156v-37.998c0-8.291-6.709-15-15-15zm-467 52.998v-22.998h62.93c3.893 49.578 14.644 102.086 37.24 146.708-56.64-12.755-100.17-63.265-100.17-123.71zm452 0c0 60.414-43.491 110.9-100.089 123.684 22.417-44.621 33.228-96.621 37.159-146.682h62.93z" fill="#fed843"/><path d="m497 30h-76.645c.132-5.067.645-9.84.645-15 0-8.401-6.599-15-15-15h-150v429.3h103.801c-.601-1.8-1.8-3.6-3.301-4.799-10.2-10.501-51.6-60.901-55.2-134.101 23.264-9.917 43.83-27.521 61.069-51.246 82.61-4.451 149.631-72.449 149.631-156.156v-37.998c0-8.291-6.709-15-15-15zm-15 52.998c0 60.414-43.491 110.9-100.089 123.684 22.419-44.621 33.23-96.621 37.159-146.682h62.93z" fill="#fabe2c"/><g id="Trophy_31_"><g><path d="m279.936 190.796-23.936-12.437-23.936 12.437c-5.01 2.578-11.133 2.153-15.732-1.172-4.6-3.34-6.914-8.994-5.977-14.59l4.395-26.646-19.189-18.94c-4.177-4.072-5.454-10.109-3.75-15.322 1.758-5.391 6.416-9.346 12.041-10.195l26.66-4.014 12.07-24.126c5.098-10.166 21.738-10.166 26.836 0l12.07 24.126 26.66 4.014c5.625.85 10.283 4.805 12.041 10.195 1.758 5.405.322 11.338-3.75 15.322l-19.189 18.94 4.395 26.646c.938 5.596-1.377 11.25-5.977 14.59-4.569 3.311-10.681 3.8-15.732 1.172z" fill="#fabe2c"/></g></g><path d="m279.936 190.796c5.052 2.628 11.164 2.139 15.732-1.172 4.6-3.34 6.914-8.994 5.977-14.59l-4.395-26.646 19.189-18.94c4.072-3.984 5.508-9.917 3.75-15.322-1.758-5.391-6.416-9.346-12.041-10.195l-26.66-4.014-12.07-24.126c-2.549-5.083-7.983-7.625-13.418-7.625v110.193z" fill="#ff9100"/><g><path d="m376 512h-240c-8.291 0-15-6.709-15-15s6.709-15 15-15h240c8.291 0 15 6.709 15 15s-6.709 15-15 15z" fill="#474f54"/></g><path d="m376 482h-120v30h120c8.291 0 15-6.709 15-15s-6.709-15-15-15z" fill="#32393f"/></g></svg>';
if ("tgr-embedded-chat" === window.name) {
    inject({
        src: chrome.extension.getURL("send-message.js")
    });
    chrome.runtime.onMessage.addListener(function (e) {
        if ("send-message" === e.type) {
            relayToEmbeddedChat(e);
        }
    });
} else {
    ["www.twitch.tv", "twitch.tv", "go.twitch.tv"].indexOf(window.location.hostname) > -1 && setInterval(function (t) {
        var e = document.querySelector(".chat-buttons-container");
        e || (e = document.querySelector(".chat-input__buttons-container"));
        e && (channel = getChannelName(), channel && ("tw-flex tw-flex-row" === e.children[0].className ? (e = e.children[0], button.className = "tw-button-icon", button.style.padding = "0 4px") : button.style.padding = "4px", button.href = chrome.extension.getURL("main.html?channel=" + channel), button.parentNode !== e && e.appendChild(button)))
    }, 1e3);
}