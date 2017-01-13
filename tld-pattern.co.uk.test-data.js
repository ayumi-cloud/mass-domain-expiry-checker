const tld = '.co.uk';
const expiry = '2025-12-13';

const response = `
    Domain name:
        bbc.co.uk

    Registrant:
        British Broadcasting Corporation

    Registrant type:
        UK Corporation by Royal Charter

    Registrant's address:
        British Broadcasting Corporation
        Broadcasting House
        Portland Place
        London
        W1A 1AA
        United Kingdom

    Data validation:
        Nominet was able to match the registrant's name and address against a 3rd party data source on 12-Jun-2014

    Registrar:
        British Broadcasting Corporation [Tag = BBC]
        URL: http://www.bbc.co.uk

    Relevant dates:
        Registered on: before Aug-1996
        Expiry date:  13-Dec-2025
        Last updated:  29-Oct-2016

    Registration status:
        Registered until expiry date.

    Name servers:
        ns3.bbc.co.uk             156.154.66.17  2610:a1:1015::17
        ns3.bbc.net.uk
        ns4.bbc.co.uk             156.154.67.17  2001:502:4612::17
        ns4.bbc.net.uk

    WHOIS lookup made at 13:30:06 13-Jan-2017

--
This WHOIS information is provided for free by Nominet UK the central registry
for .uk domain names. This information and the .uk WHOIS are:

    Copyright Nominet UK 1996 - 2017.

You may not access the .uk WHOIS or use any data from it except as permitted
by the terms of use available in full at http://www.nominet.uk/whoisterms,
which includes restrictions on: (A) use of the data for advertising, or its
repackaging, recompilation, redistribution or reuse (B) obscuring, removing
or hiding any or all of this notice and (C) exceeding query rate or volume
limits. The data is provided on an 'as-is' basis and may lag behind the
register. Access may be withdrawn or restricted at any time.


`;

module.exports = {
    tld,
    expiry,
    response
}
