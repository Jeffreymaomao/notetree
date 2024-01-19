class Loader {
    constructor(paranetNode, config = {}) {
        this.full_screen = config.full_screen || false;
        this.paranetNode = paranetNode;
        this.loaderContainer = document.createElement("div");
        this.loader = document.createElement("div");
        this.loader.classList.add("loader");
        this.paranetNode.appendChild(this.loaderContainer);
        this.loaderContainer.appendChild(this.loader);

        this.loaderContainer.style.position = "absolute";
        this.loaderContainer.style.transition = 'all 0.3s ease-in-out';
        this.loaderContainer.style.opacity = '1';
        this.loaderContainer.style.top = "50%";
        this.loaderContainer.style.left = "50%";
        this.loaderContainer.style.transform = "translate(-50%,-50%)";
        this.loaderContainer.style.width = "100%";
        this.loaderContainer.style.height = "100%";

        this.loader.style.position = "absolute";
        this.loader.style.top = "50%";
        this.loader.style.left = "50%";
        this.loader.style.transform = "translate(-50%,-50%)";

        if (this.full_screen) {
            this.loaderContainer.style.zIndex = "1000";
            this.loaderContainer.style.position = "fixed";
            this.loaderContainer.style.backgroundColor = "rgba(220,220,220,0.9)";
        }
    }
    remove() {
        this.loaderContainer.style.opacity = '0';
        this.loaderContainer.style.width = '0';
        this.loaderContainer.style.height = '0';
        this.loaderContainer.style.transform = 'translate(-50%, -50%) scale(0, 0)';
        setTimeout(() => {
            this.loaderContainer.remove();
        }, 300);
    }
}

function createAddInputButton() {
    const addInput = document.createElement("input");
    addInput.classList.add("adding-input");
    addInput.type = "text";
    addInput.placeholder = "new folder";

    return addInput;
}

function getCurrentTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const date = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    // 格式為 "YYYY-MM-DD HH:mm:ss"
    const formattedDateTime = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
    return formattedDateTime;
}

function findPreviousElementSiblingWithClass(element, className) {
    let previousSibling = element.previousElementSibling;
    console.log(previousSibling)

    while (previousSibling) {
        if (previousSibling.classList.contains(className)) {
            return previousSibling;
        }

        previousSibling = previousSibling.previousElementSibling;
    }
    return null;
}

function forEachFolder(array, callback) {
    array.forEach(item => {
        if (item.MimeType && item.MimeType.includes("directory")) {
            callback(item);
        }
    });
}

function forEachImage(array, callback) {
    array.forEach(item => {
        if (item.MimeType && item.MimeType.includes("image")) {
            callback(item);
        }
    });
}

function getLatestImage(files) {
    let latestFile = null;
    let latestTime = null;

    files.forEach((file) => {
        const time = new Date(file.time);
        if (file.MimeType.includes("image")) {
            if (!latestTime || time > latestTime) {
                latestTime = time;
                latestFile = file;
            }
        }
    });

    return latestFile;
}
/* --- */
function findBackgroundImage(page) {
    // background image find order
    // 1. page.name-background
    // 2. page.name-bavkground (lower case)
    // 3. image.name includes background
    // 4. lastest image
    return page.children.find((image) =>
        image.MimeType.includes("image") &&
        (
            image.name.includes(`${page.name}-background`) ||
            image.name.includes(`${page.name.toLowerCase()}-background`) ||
            image.name.includes(page.name) ||
            image.name.includes(page.name.toLowerCase()) ||
            image.name.includes("background") ||
            page.name.includes(image.name) ||
            page.name.toLowerCase().includes(image.name)
        )
    ) || getLatestImage(page.children);
}


/* --- */
function customSort(a, b) {
    const numA = parseInt(a);
    const numB = parseInt(b);

    // 如果两个都是数字，则按数字降序排列
    if (!isNaN(numA) && !isNaN(numB)) {
        return numB - numA;
    }

    // 如果其中一个是数字，数字优先
    if (!isNaN(numA)) {
        return -1;
    }
    if (!isNaN(numB)) {
        return 1;
    }

    // 否则按字母顺序排列
    return a.toString().localeCompare(b.toString());
}

function sortByTime(a, b) {
    if (a.time && b.time) {
        return new Date(a.time) - new Date(b.time);
    }
    return 0;
}

function sortByLength(a, b) {
    if (a.name && b.name) {
        return a.name.length - b.name.length;
    }
    return 0;
}

function sortByUnicode(a, b) {
    if (a.name && b.name) {
        return a.name.localeCompare(b.name);
    }
    return 0;
}

const sortBy = {
    custom: customSort,
    Length: sortByLength,
    Time: sortByTime,
    Unicode: sortByUnicode
}

export {
    Loader,
    getCurrentTime,
    createAddInputButton,
    findPreviousElementSiblingWithClass,
    forEachFolder,
    forEachImage,
    getLatestImage,
    findBackgroundImage,
    sortByTime,
    sortByLength,
    sortBy
};