var object_Utils = {
getValueFromMap: function (obj, map) {
    map = map.split('.');
    var value = obj || {};
    for (var i = 0; i < map.length; i++) {
      var item = map[i];
      value = value[item];
      if (!value) {
        value = null;
        break;
      }
    }
    return value;
  },
  setValueToMap: function (obj, map, value) {
    map = map.split('.');
    for (var i = 0; i < map.length - 1; i++) {
      var item = map[i];
      if (!obj[item]) {
        obj[item] = {};
      }
      obj = obj[item];
    }
    obj[map[i]] = value;
  },
  mergeObject: function (source, extras) {
    if (extras) {
      Object.keys(extras).forEach(function (extraKey) {
        if (typeof extras[extraKey] === "object" && source[extraKey]) {
          _.extend(source[extraKey], extras[extraKey]);
        } else {
          source[extraKey] = extras[extraKey];
        }
      });
    }
    return source;
  },
  htmlEscape: function (str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  },
  htmlUnescape: function (value) {
    return String(value)
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&');
  },
  getSplitUrl: function(u) {
    if(u) {
      var l = document.createElement('a');
      l.href = u;
      return {
        'protocol': l.protocol,
        'host': l.host,
        'path': l.pathname,
      }
    }
    return {};
  },
  simpleClone : function (val) {
    return JSON.parse(JSON.stringify(val))
  },
  getLastPath : function (url) {
    url = url.replace(/\/$/, '')
    var array = url.split('/')
    var lastsegment = array[array.length - 1]
    return lastsegment
  },
  getQueryParameters : function (str) {
    str = str || ''
    if (str.charAt(0) == '?') {
      str = str.substr(1)
    }
    return (str).replace(/(^\?)/, '').split('&').map(function (n) {return n = n.split('='), this[n[0]] = n[1], this}.bind({}))[0]
  },
  delValueInMap : function (obj, map) {
    map = map.split('.')
    for (var i = 0; i < map.length - 1; i++) {
      var item = map[i]
      if (!obj[item]) {
        obj[item] = {}
      }
      obj = obj[item]
    }
    delete obj[map[i]];
  },
  readableStringFromArray : function(arr) {
    var substr = arr
    var commaList = ''

    var i
    if (substr.length > 0) {
      for (i = 0; i < substr.length; ++i) {
        if (substr.length > 1) {
          if (i == substr.length - 1 && substr.length > 1) {
            commaList += ' and ' + substr[i]
          }
          else {
            commaList += ', ' + substr[i]
          }
        } else {
          commaList += substr[i]
        }
      }
    }

    return (substr.length > 1) ? commaList.substr(2, commaList.length) : commaList
  },
  getURLParsed : function (href) {
    var l = document.createElement('a')
    l.href = href
    return l
  },
  arrayMoveIndices : function (array, old_index, new_index) {
    if (new_index >= array.length) {
        var k = new_index - array.length;
        while ((k--) + 1) {
            array.push(undefined);
        }
    }
    array.splice(new_index, 0, array.splice(old_index, 1)[0]);
  }
};
