function setCookie(name, data, age = 24 * 60 * 60 * 1000) {
    document.cookie = `${name}=${data}; path=/; max-age=${age}; domain=${window.location.hostname}`;
}

//保存指定文本文件   

/**
 * 下载文本
 * @param {string} text 
 * @param {string} filename 
 */
function downloadText(text, filename) {
    let element = document.createElement('a');
    element.style.display = 'none';
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

/**
 * 切换全屏显示
 * @param {document} dom default: document.documentElement 要切换全屏的元素
 */
function toggleFullScreen(dom = document.documentElement) {
    if (!document.fullscreenElement) {
        dom.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

export {
    setCookie,
    downloadText,
    toggleFullScreen
}