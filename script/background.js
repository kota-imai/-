chrome.runtime.onMessage.addListener(
    function (message, sender, sendResponse) {
        if (message.type === 'settings') {
            // 設定送信用
            const settings = localStorage.getItem("nazotte-settings");
            sendResponse({nazotteSettings: settings});
        }
    })
