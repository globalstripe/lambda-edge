'use strict';
const path = require("path");
const querystring = require('querystring');

exports.handler = (event, context, callback) => {
    // Get the incoming request object from CF
     const request = event.Records[0].cf.request;
     //const origin = request.origin;
     const uri = request.uri;
     // console.log(origin);
     // console.log(uri);
     // console.log(path.basename(uri));
     let filename = path.basename(uri);
     let contentid = path.parse(filename).name;
     console.log('ads.contentID='+ contentid);
    
    // Now add this to the origin request as a query param
    // this query param is passed my mediatailor to the ads server to select the vast file you want.
    // the vast file then returns the promo sequence which is defined for this programme asset.
    
    
    // Get the DRM Country and Affiliate Codes
    var pattern = "l3olv.......01";
    
    var myarray = uri.match( pattern );
    
    console.log(myarray[0]);
    
    const resultstr=myarray[0]; console.log("Pattern Matched: " + resultstr);
    const drmsystem = resultstr.substring(5, 7); console.log("DRM Type: " + drmsystem );
    const affiliate = resultstr.substring(7, 9); console.log("Affiliate: " +  affiliate);
    const countrycode = resultstr.substring(9, 11); console.log("Country: " +  countrycode);
    
    // These are the object values to constuct the new querystring
    
    const params = { 'ads.contentid': contentid, 'ads.country': countrycode, 'ads.affilliate': affiliate};
    
    // console.log(qstring);
     
    console.log('Old Query String: ', request.querystring);

    /* Parse request query string to get javascript object */
    // Only required if you expect some values to already be passed ?
    // Need some logic to add this to the params we are adding.  Do not need this now.
    //const params = querystring.parse(request.querystring.toLowerCase());

    // Probably done need this sort! - leaving it here incase we want ot add it again
    // const sortedParams = {};    
    /* Sort param keys */
    // Object.keys(params).sort().forEach(key => {
    //        sortedParams[key] = params[key];
    // });
    
    /* Update request querystring with normalized  */
    //request.querystring = querystring.stringify(sortedParams);
    
    // Here querystring.stringify() creates a querystring formatted string from the params object
    
    request.querystring = querystring.stringify(params);
    
    // Log the updated QueryString
    
    console.log('New Query String: ', request.querystring);
    
    // console.log(request)

    callback(null, request);
};
