function getFormattedValue(value) {
    var unit = '';
    if (value === 0) {
        return "0";
    }
    else if (!value) {
        return '';
    }
    else {
        try {
            if (value >= 1000000000) {
                unit = 'B';
                value /= 1000000000;
            }
            else if (value >= 1000000) {
                unit = 'M';
                value /= 1000000;
            }
            else if (value >= 1000) {
                unit = 'K';
                value /= 1000;
            }
            //value = (value >= 10000 ? (value >= 1000000 ? (value >= 1000000000 ? (value/1000000000).toFixed(2) + 'B' : (value/1000000).toFixed(1) + 'M'): (value/1000).toFixed(decimal) + 'K') : value+"").toString()
            var decimals = 0;
            if (value.toString().indexOf('.')) {
                var len = value.toString().split('.')[0].length;
                if (len <= 3) {
                    decimals = 3 - len;
                }
            }
            value = value.toFixed(decimals);
            // remove decimal zeros
            if (decimals > 0) {
                value = value.replace(/0+$/, '');
            }
            if (value.indexOf('.') === (value.length - 1)) {
                value = value.substr(0, (value.length - 1));
            }
        }
        catch (err) {
        }
        return value.toString() + unit;
    }
}


function getFormattedTime(timestamp) {
    var time = moment(timestamp);
    if (!time) {
        return '';
    }
    else {
        return time.format("DD-MMM-YYYY");
    }
}
function getFormattedTime_DM(timestamp) {
    var time = moment(timestamp);
    if (!time) {
        return '';
    }
    else {
        return time.format("DD-MMM");
    }
}
function getFormattedTime_TDMY(timestamp) {
    var time = moment(timestamp);
    if (!time) {
        return '';
    }
    else {
        return time.format("hh:mma, DD-MMM-YYYY");
    }
}
function getFormattedTime_T(timestamp) {
    var time = moment(timestamp);
    if (!time) {
        return '';
    }
    else {
        return time.format("hh:mma");
    }
}
function capitalize(value) {
    if (!value)
        value = "";
    return value.toUpperCase();
}
function byString(o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (o === Object(o) && k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
}

function pushValueToArrayInMap(obj, map, value) {
    map = map.split('.');
    for (var i = 0; i < map.length - 1; i++) {
        var item = map[i];
        if (!obj[item]) {
            obj[item] = {};
        }
        obj = obj[item];
    }
    if (!obj[map[i]]) {
        obj[map[i]] = []
    }
    if (!Array.isArray(obj[map[i]])) {
        throw new Error('Whoops! Not an array');
    }
    obj[map[i]].push(value)
}

function doSwap(obj, swap) {
    var name, value, key1, key2;
    _.each(swap, function (order) {
        key1 = order[0];
        key2 = order[1];
        name = obj[key1 + 'name'];
        value = obj[key1];
        obj[key1 + 'name'] = obj[key2 + 'name'];
        obj[key1] = obj[key2];
        obj[key2 + 'name'] = name;
        obj[key2] = value;
    })
}

function getGravatar(email, id) {
    // MD5 (Message-Digest Algorithm) by WebToolkit
    //
    // var MD5=function(s){function L(k,d){return(k<<d)|(k>>>(32-d))}function K(G,k){var I,d,F,H,x;F=(G&2147483648);H=(k&2147483648);I=(G&1073741824);d=(k&1073741824);x=(G&1073741823)+(k&1073741823);if(I&d){return(x^2147483648^F^H)}if(I|d){if(x&1073741824){return(x^3221225472^F^H)}else{return(x^1073741824^F^H)}}else{return(x^F^H)}}function r(d,F,k){return(d&F)|((~d)&k)}function q(d,F,k){return(d&k)|(F&(~k))}function p(d,F,k){return(d^F^k)}function n(d,F,k){return(F^(d|(~k)))}function u(G,F,aa,Z,k,H,I){G=K(G,K(K(r(F,aa,Z),k),I));return K(L(G,H),F)}function f(G,F,aa,Z,k,H,I){G=K(G,K(K(q(F,aa,Z),k),I));return K(L(G,H),F)}function D(G,F,aa,Z,k,H,I){G=K(G,K(K(p(F,aa,Z),k),I));return K(L(G,H),F)}function t(G,F,aa,Z,k,H,I){G=K(G,K(K(n(F,aa,Z),k),I));return K(L(G,H),F)}function e(G){var Z;var F=G.length;var x=F+8;var k=(x-(x%64))/64;var I=(k+1)*16;var aa=Array(I-1);var d=0;var H=0;while(H<F){Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=(aa[Z]|(G.charCodeAt(H)<<d));H++}Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=aa[Z]|(128<<d);aa[I-2]=F<<3;aa[I-1]=F>>>29;return aa}function B(x){var k="",F="",G,d;for(d=0;d<=3;d++){G=(x>>>(d*8))&255;F="0"+G.toString(16);k=k+F.substr(F.length-2,2)}return k}function J(k){k=k.replace(/rn/g,"n");var d="";for(var F=0;F<k.length;F++){var x=k.charCodeAt(F);if(x<128){d+=String.fromCharCode(x)}else{if((x>127)&&(x<2048)){d+=String.fromCharCode((x>>6)|192);d+=String.fromCharCode((x&63)|128)}else{d+=String.fromCharCode((x>>12)|224);d+=String.fromCharCode(((x>>6)&63)|128);d+=String.fromCharCode((x&63)|128)}}}return d}var C=Array();var P,h,E,v,g,Y,X,W,V;var S=7,Q=12,N=17,M=22;var A=5,z=9,y=14,w=20;var o=4,m=11,l=16,j=23;var U=6,T=10,R=15,O=21;s=J(s);C=e(s);Y=1732584193;X=4023233417;W=2562383102;V=271733878;for(P=0;P<C.length;P+=16){h=Y;E=X;v=W;g=V;Y=u(Y,X,W,V,C[P+0],S,3614090360);V=u(V,Y,X,W,C[P+1],Q,3905402710);W=u(W,V,Y,X,C[P+2],N,606105819);X=u(X,W,V,Y,C[P+3],M,3250441966);Y=u(Y,X,W,V,C[P+4],S,4118548399);V=u(V,Y,X,W,C[P+5],Q,1200080426);W=u(W,V,Y,X,C[P+6],N,2821735955);X=u(X,W,V,Y,C[P+7],M,4249261313);Y=u(Y,X,W,V,C[P+8],S,1770035416);V=u(V,Y,X,W,C[P+9],Q,2336552879);W=u(W,V,Y,X,C[P+10],N,4294925233);X=u(X,W,V,Y,C[P+11],M,2304563134);Y=u(Y,X,W,V,C[P+12],S,1804603682);V=u(V,Y,X,W,C[P+13],Q,4254626195);W=u(W,V,Y,X,C[P+14],N,2792965006);X=u(X,W,V,Y,C[P+15],M,1236535329);Y=f(Y,X,W,V,C[P+1],A,4129170786);V=f(V,Y,X,W,C[P+6],z,3225465664);W=f(W,V,Y,X,C[P+11],y,643717713);X=f(X,W,V,Y,C[P+0],w,3921069994);Y=f(Y,X,W,V,C[P+5],A,3593408605);V=f(V,Y,X,W,C[P+10],z,38016083);W=f(W,V,Y,X,C[P+15],y,3634488961);X=f(X,W,V,Y,C[P+4],w,3889429448);Y=f(Y,X,W,V,C[P+9],A,568446438);V=f(V,Y,X,W,C[P+14],z,3275163606);W=f(W,V,Y,X,C[P+3],y,4107603335);X=f(X,W,V,Y,C[P+8],w,1163531501);Y=f(Y,X,W,V,C[P+13],A,2850285829);V=f(V,Y,X,W,C[P+2],z,4243563512);W=f(W,V,Y,X,C[P+7],y,1735328473);X=f(X,W,V,Y,C[P+12],w,2368359562);Y=D(Y,X,W,V,C[P+5],o,4294588738);V=D(V,Y,X,W,C[P+8],m,2272392833);W=D(W,V,Y,X,C[P+11],l,1839030562);X=D(X,W,V,Y,C[P+14],j,4259657740);Y=D(Y,X,W,V,C[P+1],o,2763975236);V=D(V,Y,X,W,C[P+4],m,1272893353);W=D(W,V,Y,X,C[P+7],l,4139469664);X=D(X,W,V,Y,C[P+10],j,3200236656);Y=D(Y,X,W,V,C[P+13],o,681279174);V=D(V,Y,X,W,C[P+0],m,3936430074);W=D(W,V,Y,X,C[P+3],l,3572445317);X=D(X,W,V,Y,C[P+6],j,76029189);Y=D(Y,X,W,V,C[P+9],o,3654602809);V=D(V,Y,X,W,C[P+12],m,3873151461);W=D(W,V,Y,X,C[P+15],l,530742520);X=D(X,W,V,Y,C[P+2],j,3299628645);Y=t(Y,X,W,V,C[P+0],U,4096336452);V=t(V,Y,X,W,C[P+7],T,1126891415);W=t(W,V,Y,X,C[P+14],R,2878612391);X=t(X,W,V,Y,C[P+5],O,4237533241);Y=t(Y,X,W,V,C[P+12],U,1700485571);V=t(V,Y,X,W,C[P+3],T,2399980690);W=t(W,V,Y,X,C[P+10],R,4293915773);X=t(X,W,V,Y,C[P+1],O,2240044497);Y=t(Y,X,W,V,C[P+8],U,1873313359);V=t(V,Y,X,W,C[P+15],T,4264355552);W=t(W,V,Y,X,C[P+6],R,2734768916);X=t(X,W,V,Y,C[P+13],O,1309151649);Y=t(Y,X,W,V,C[P+4],U,4149444226);V=t(V,Y,X,W,C[P+11],T,3174756917);W=t(W,V,Y,X,C[P+2],R,718787259);X=t(X,W,V,Y,C[P+9],O,3951481745);Y=K(Y,h);X=K(X,E);W=K(W,v);V=K(V,g)}var i=B(Y)+B(X)+B(W)+B(V);return i.toLowerCase()};
    return 'https://www.gravatar.com/avatar/' + md5(email) + '?d=' + encodeURIComponent('//s3.amazonaws.com/assets.choice.ai/users/profiles/' + id + '.jpeg');
}
function getQueryParameters(str) {
    str = str || window.location.search;
    if (str.charAt(0) == '?') {
        str = str.substr(1);
    }
    return (str).replace(/(^\?)/, '').split("&").map(function (n) {
        return n = n.split("="), this[n[0]] = n[1], this
    }.bind({}))[0];
}
function getDateFromDuration(duration, date) {
    var fromDate, toDate, days = null;
    if (duration == 'custom') {
        if (!date.fromDate || !date.toDate) {
            days = 7;
        }
        else {
            fromDate = date.fromDate;
            toDate = date.toDate;
        }
    }
    else if (duration) {
        var splits = duration.split('-');
        if (splits[1] == 'days' || splits[1] == 'day') {
            days = parseInt(splits[0]);
        }
        else {
            days = 0;
        }
    }
    else if(duration == 'yesterday'){
        days = 1;
    }

    if (days != null) {
        if(duration != 'yesterday')
            days--;
        toDate = moment(date.dataValidTo).startOf('day').subtract('days', days ? 1 : 0);
        fromDate = toDate.clone().subtract('days', days);
    }
    if (date.dataValidFrom) {
        var dataValidFrom = moment(date.dataValidFrom);
        if (dataValidFrom > fromDate) {
            duration = "custom";
            fromDate = date.dataValidFrom;
        }
        if (dataValidFrom > toDate) {
            duration = "custom";
            toDate = date.dataValidFrom;
        }
    }

    return {fromDate: fromDate, toDate: toDate, duration: duration};
}

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function areObjectsEqual(obj1, obj2) {
    if (Object.keys(obj1) == Object.keys(obj2)) {
        for (var i in obj1) {
            if (obj1[i] != obj2[i]) {
                return false;
            }
        }
        return true;
    }
    return false;
}
function arrayMoveIndices(array, old_index, new_index) {
    if (new_index >= array.length) {
        var k = new_index - array.length;
        while ((k--) + 1) {
            array.push(undefined);
        }
    }
    array.splice(new_index, 0, array.splice(old_index, 1)[0]);
}

function getFormattedUrl(url) {
    return url.split("//")[1].replace(/\./g, '_').replace(/#/g, '');
}
function validateUrl(url) {
    if (url.indexOf('http://') != 0 && url.indexOf('https://') != 0) {
        //Prepend 'http://' in listPageUrl
        if (url.indexOf("//") > -1) {
            url = url.split("//")[1];
            url = 'http://' + url;
        }
        else {
            url = 'http://' + url;
        }
    }
    // return /^(?:(?:(?:(?:https?|ftp):)\/\/)?)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(url);
    return /^(?:(?:(?:(?:https?|ftp):)\/\/)?)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9_]-*)*[a-z\u00a1-\uffff0-9_]+)(?:\.(?:[a-z\u00a1-\uffff0-9_]-*)*[a-z\u00a1-\uffff0-9_]+)*(?:\.(?:[a-z\u00a1-\uffff_]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(url);
}
function getGenericTime(value) {
    if (value.toString().length == 10)
        return moment(parseInt(value) * 1000).fromNow().replace("ago", "").trim();
    else if (value.toString().length == 13)
        return moment(parseInt(value)).fromNow().replace("ago", "").trim();
}
function getGenericTimeInFormat(value) {
    if (value.toString().length == 10)
        return moment(parseInt(value) * 1000).format(Config.displayDateFormat);
    else if (value.toString().length == 13)
        return moment(parseInt(value)).format(Config.displayDateFormat)
}
function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}


function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this,
            args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}
