export function trackEvent(category, action, label) {
    // console.log(category, action, label);

    if (window['dataLayer']) {
        window['dataLayer'].push({
            'gaCategory': category,
            'gaAction': action,
            'gaLabel': label,
            'event': `${category} | ${action} | ${label}`
        })
    }
}

export function trackClickText(clickText, event) {
    console.log(clickText, event);

    if (window['dataLayer']) {
        window['dataLayer'].push({
            'Click Text': clickText,
            'event': `${event}_${clickText}`
        })
    }
}

export function trackPageview(pageview) {
    //console.log(pageview);

    if (window['dataLayer']) {
        window['dataLayer'].push({
            'event': 'pageview',
            'virtualPagePath': pageview,
        })
    }
}
