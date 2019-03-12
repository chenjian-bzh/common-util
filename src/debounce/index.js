function debounce(fn, wait) {
    let timer = null;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.call(this, arguments);
        }, wait);
    }
}

function throttle(fn, interval) {
    let canRun = true;
    return function () {
        if (!canRun) return;
        canRun = false;
        setTimeout(() => {
            fn.call(this, arguments);
            canRun = true;
        }, interval);
    }
}
