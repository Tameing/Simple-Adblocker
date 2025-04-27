// Common ad-related class names and IDs
const adSelectors = [
    '.advertisement', '.advert', '.ad', '.ads', '.ad-container',
    '.banner-ads', '.google-ad', '.sponsored-content', '.promoted-content',
    '.affiliate-content', '.social-share-ad', '.native-ad', '.paid-content',
    '[id*="google_ads"]', '[id*="banner"]', '[class*="adsbox"]',
  
    'ins.adsbygoogle', '.advertising', '[data-ad]', '[data-ads]',
    'div[aria-label*="advertisement"]',
    'iframe[src*="doubleclick"]', 'iframe[src*="ad-delivery"]',
    'iframe[src*="ads"]', 'iframe[id*="google_ads"]'
];

// Enhanced blocklist with more ad networks
const blockList = [
    'googlesyndication.com', 'doubleclick.net', 'adnxs.com',
    'amazon-adsystem.com', 'analytics.google.com', 'pagead2.googlesyndication.com',
    'googleads.g.doubleclick.net', 'ad.doubleclick.net', 'ads.pubmatic.com',
    'advertising.com', 'adtechus.com', 'fastclick.net', 'quantserve.com',
    'scorecardresearch.com', 'zedo.com', 'adbrite.com', 'advertising.com',
    'yieldmanager.com', 'doubleclick.com'
];

// Style to hide ad elements
const hideAdsStyle = `
    ${adSelectors.join(', ')} {
        display: none !important;
        opacity: 0 !important;
        pointer-events: none !important;
        height: 0 !important;
        position: absolute !important;
        z-index: -999 !important;
    }
`;

// Function to inject CSS
function injectBlockingCSS() {
    const style = document.createElement('style');
    style.textContent = hideAdsStyle;
    document.head.appendChild(style);
}

// Enhanced function to remove ad elements
function removeAds() {
    const combinedSelectors = adSelectors.join(', ');
    const adElements = document.querySelectorAll(combinedSelectors);
    
    adElements.forEach(element => {
        element.remove();
    });

    // Remove hidden ads
    const allElements = document.getElementsByTagName('*');
    for (const element of allElements) {
        const computedStyle = window.getComputedStyle(element);
        if (computedStyle.display === 'none' && element.id.toLowerCase().includes('ad')) {
            element.remove();
        }
    }
}

// Function to observe DOM changes
function observePageChanges() {
    const observer = new MutationObserver((mutations) => {
        removeAds();
        handleIframes();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['src', 'style', 'class']
    });
}

// Function to handle iframes
function handleIframes() {
    const iframes = document.getElementsByTagName('iframe');
    for (const iframe of iframes) {
        const src = iframe.src.toLowerCase();
        if (blockList.some(domain => src.includes(domain))) {
            iframe.remove();
        }
    }
}

// Initialize blocking
function initializeAdBlocking() {
    injectBlockingCSS();
    removeAds();
    observePageChanges();
    handleIframes();
}

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAdBlocking);
} else {
    initializeAdBlocking();
}