import Controller from "../Controller";

import sortBy from 'lodash/sortBy';

export function getImage(image) {
    if (!image) {
        return 'images/emptyProfile.jpg';
    }

    return image;
}

export function normatizeLink(link, type) {
    try {
        new URL(link);
        return link;
    } catch (e) {
    }

    if (type == 'facebook') {
        return "https://www.facebook.com/search/top/?q="+link;
    } else if (type == 'instagram') {
        return `https://instagram.com/explore/tags/${link}`;
    } else if (type == 'twitter') {
        return `https://twitter.com/search?l=&q=${link}&lang=pt`;
    } else if (type == 'youtube') {
        return `https://www.youtube.com/results?search_query=${link}`;
    } else {
        return `https://${link}`;
    }
}

/*
    [template]
    invite
    candidato
    candidatos
 */
export function shareEmail(template, url, track) {
    const signalOpenModal = Controller.getSignal('app.openModal');
    signalOpenModal({modal: 'send-email', modalData: {template, url, track}});
}

export function shareTwitter(textShare, urlShare) {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(textShare)}&url=${encodeURIComponent(urlShare)}`;
    window.open(url, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=100,width=700,height=400");
}

export function shareFacebook(urlShare) {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${urlShare}`;
    window.open(url, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=100,left=100,width=700,height=400");
}

export function shareWhats(text) {
    return `whatsapp://send?text=${encodeURIComponent(text)}`;
}

export function getCargosList(list, uf) {
    let ret = getCargos(list, uf);

    ret = ret.map((v) => {
        v.name = v.name == 'Senador' ? v.name.replace('Senador', 'Senador 1') : v.name;
        return v;
    })

    ret = ret.concat([
        {name: "Senador 2", id: 5, order: 3, position: 4},
        //{name: "Governador", id: 3, order: 4, position: 5},
        //{name: "Presidente", id: 1, order: 5, position: 6},
    ]);

    return sortBy(ret, ['order', 'desc']);
}

export function getCargos(list, uf) {

    return list.filter((v) => {
        if (uf === 'DF' && v.id == 7)
            return null
        else if (uf !== 'DF' && v.id == 8)
            return null;

        return v
    });
}

export function distance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1 / 180
    var radlat2 = Math.PI * lat2 / 180
    var theta = lon1 - lon2
    var radtheta = Math.PI * theta / 180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
        dist = 1;
    }
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 60 * 1.1515

    if (unit == "K") {
        dist = dist * 1.609344
    }
    if (unit == "N") {
        dist = dist * 0.8684
    }

    return dist
}

export function formatNumber(num, fixed = 0) {
    var decimalPart;

    var array = Math.floor(num).toString().split('');
    var index = -3;
    while (array.length + index > 0) {
        array.splice(index, 0, '.');
        index -= 4;
    }

    if (fixed > 0) {
        decimalPart = num.toFixed(fixed).split(".")[1];
        return array.join('') + "," + decimalPart;
    }
    return array.join('');
};