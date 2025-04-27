chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        const url = details.url.toLowerCase();
        const blockList = [
            'googlesyndication.com',
            'doubleclick.net',
            'adnxs.com',
            'amazon-adsystem.com',
            'googlesyndication.com',
            'doubleclick.net',
            'adnxs.com',
            'amazon-adsystem.com',
            'analytics.google.com',
            'pagead2.googlesyndication.com',
            'googleads.g.doubleclick.net', 
            'ad.doubleclick.net', 
            'ads.pubmatic.com',
            'advertising.com', 
            'adtechus.com', 
            'fastclick.net', 
            'quantserve.com',
            'scorecardresearch.com',
            'zedo.com', 
            'adbrite.com', 
            'advertising.com',
            'yieldmanager.com', 
            'doubleclick.com'
        ];
        
        return { cancel: blockList.some(domain => url.includes(domain)) };
    },
    { urls: ["<all_urls>"] },
    ["blocking"]
);

chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [],
    addRules: [
        {
            id: 1,
            priority: 1,
            action: { type: "block" },
            condition: {
                urlFilter: "||googlesyndication.com/pagead/",
                resourceTypes: ["script", "image", "xmlhttprequest", "sub_frame"]
            }
        },
        {
            id: 2,
            priority: 1,
            action: { type: "block" },
            condition: {
                urlFilter: "||doubleclick.net/pagead/",
                resourceTypes: ["script", "image", "xmlhttprequest", "sub_frame"]
            }
        },
        {
            id: 3,
            priority: 1,
            action: { type: "allow" },
            condition: {
                urlFilter: "||youtube.com/*",
                resourceTypes: ["main_frame", "sub_frame", "stylesheet", "script", "image", "font"]
            }
        },
        {
            id: 4,
            priority: 2, // Higher priority to ensure it overrides blocking rules
            action: { type: "allow" },
            condition: {
                urlFilter: "||youtube.com/yts/jsbin/",
                resourceTypes: ["script"]
            }
        },
        {
            id: 5,
            priority: 2,
            action: { type: "allow" },
            condition: {
                urlFilter: "||youtube.com/yts/cssbin/",
                resourceTypes: ["stylesheet"]
            }
        }
    ]
});