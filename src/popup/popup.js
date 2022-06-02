const btn = document.getElementById('toggleContent');
btn.addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        chrome.tabs.sendMessage(tabs[0].id,
            btn.textContent !== 'Enable' ? true : false,
        response => {
            console.log(response);
        });
    });
    if (btn.textContent == 'Enable') {
        btn.textContent = 'Disable';
    } else {
        btn.textContent = 'Enable';
    }
});