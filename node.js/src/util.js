#!/usr/local/bin/node

// Little Utilites

var yaml = require('js-yaml');
var fs = require('fs');

module.exports = {
    
    config: undefined,
    getConfig: function() {
        if (typeof this.config !== 'undefined') return this.config;
        this.config = yaml.safeLoad(fs.readFileSync('config.yaml'));
        return this.config;
    },
    
    getPath: function(dir, file) {
        var config = this.getConfig();
        if (!!file) {
            return config.path[dir] + '/' + file;
        }
        return config.path[dir] + '/';
    },
    
    /*
        Usage: strftime('%Y-%m-%d %H:%M:%S', new Date());
        %Y: FullYear
        %m: 01-12
        %mon: 'Jan'-'Dec'
        %month: 'January'-'December'
        %d: 01-28/29/30/31 (day of month)
        %D: 0-6 (day of week)
        %w: 'Sun'-'Sat'
        %W: 'Sunday'-'Saturday'
        %H: 00-23 (hours)
        %M: 00-59 (minutes)
        %S: 00-59 (seconds)
    */
    strftime: function(pattern, time) {
    
        var mons = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            w = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        var addZero = function (num) {
            return num < 10 ? '0' + num : num;
        };
    
        return pattern.replace(/%\w+/g, function(type) {
            switch(type.slice(1)) {
                case "Y":
                    return time.getFullYear();
                case "m":
                    return addZero(time.getMonth() + 1);
                case "mon":
                    return mons[time.getMonth()];
                case "month":
                    return months[time.getMonth()];
                case "d":
                    return addZero(time.getDate());
                case "D":
                    return time.getDay();
                case "w":
                    return w[time.getDay()];
                case "W":
                    return week[time.getDay()];
                case "H":
                    return addZero(time.getHours());
                case "M":
                    return addZero(time.getMinutes());
                case "S":
                    return addZero(time.getSeconds());
                default:
                    return type;
            }
        });
    }
}