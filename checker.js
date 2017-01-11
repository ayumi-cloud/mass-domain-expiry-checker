const fs = require('fs');
const async = require('async');
const moment = require('moment');
const whois = require('whois');

const utils = require('./utils');
const tlds = require('./tlds');

// serial - don't want to flood registrars with requests
// small pause between subsequen queries
const execQueue = async.priorityQueue((domain, done) => {
    lookup(domain, () => {
        delayCall(done, 250);
    });
}, 1);

let maxDomainLength = 0; // used for pretty print

fs
.readFileSync('./domains.txt', 'utf-8')
.split('\n')
.forEach(d => {
    d = d.trim();
    
    if (d && d[0] !== '#') {
        maxDomainLength = Math.max(d.length, maxDomainLength);
        execQueue.push(d.toLowerCase());
    }
});

function lookup(domain, done) {
    let tld = domain.substring(domain.indexOf('.')),
        pttn = tlds.patterns[tld];
    
    if (tlds.blacklist.indexOf(tld) > -1) {
        printDomainResult(domain, `!! The registrar for TLD "${tld}" does not provide any expiration information`, true);
        return done();
    }
    
    if (!pttn) {
        printDomainResult(domain, `TLD "${tld}" does not have parser patterns set`, true);
        return done();
    }
    
    whois.lookup(domain, (err, data) => {
        if (err) {
            console.error(err);
            return done();
        }
    
        let expiry;
        data.split('\n').forEach(ln => {
            if (pttn[0].test(ln)) {
                expiry = ln.match(pttn[1])[1];
            }
        });
        
        if (expiry) {
            const date = moment(expiry, pttn[2]);
            printDomainResult(domain, date.format('YYYY-MM-DD') + ' - ' + date.diff(moment(), 'days') + ' days');
        } else {
            printDomainResult(domain, 'No expiry found');
        }
        
        done();
    });
}

function delayCall(fn, t) {
    setTimeout(() => {
        fn();
    }, t || 100);
}

function printDomainResult(domain, message, isError) {
    const msg = domain.padify(maxDomainLength) + ' | ' + message;
    
    if (isError) {
        console.error(msg);
    } else {
        console.log(msg);
    }
}
