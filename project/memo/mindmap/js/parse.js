function replaceKeysWithUnderscore(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(replaceKeysWithUnderscore);
    }

    const newObj = {};

    Object.keys(obj).forEach((key) => {
        const newKey = key.replace(/[ \/]/g, '_');
        newObj[newKey] = replaceKeysWithUnderscore(obj[key]);
    });

    return newObj;
}

function parseSymbol(string){
    return string.replace(/[ \/\(\)]/g, '_');
}

function parseObject2Data(content){
    var data = [
        { id: null, text: "Change Mao Yang" },
        { id:"center", parentId: null, text: "<a id='center' href='#!'>Project</a>"},
    ];

    Object.keys(content).forEach((page)=>{
        var page_ = parseSymbol(page);
        data.push({
            id: page_,
            parentId: "center",
            text: `<a href='#!'>${page}</a>`
        })

        Object.keys(content[page]).forEach((subpage)=>{
            var subpage_ = parseSymbol(subpage);
            data.push({
                id: page_ + subpage_,
                parentId: page_,
                text: `<a href='#!'>${subpage}</a>`
            })
            Object.keys(content[page][subpage]).forEach((subsubpage)=>{
                var subsubpage_ = parseSymbol(subsubpage);
                data.push({
                    id: page_ + subpage_ + subsubpage_,
                    parentId: page_ + subpage_,
                    text: `<a href='#!'>${subsubpage}</a>`
                })
                content[page][subpage][subsubpage].forEach((subsubsubpage)=>{
                    const title = subsubsubpage["title"].replace(/[ \/\(\)]/g, '_');
                    const link = subsubsubpage["link"]
                    data.push({
                        id: page_ + subpage_ + subsubpage_ + title,
                        parentId: page_ + subpage_ + subsubpage_,
                        text: `
                            <a href='${link}'>${subsubsubpage["title"]}</a> 
                            `
                    })
                })
            })
        })

    })
    return data;
}