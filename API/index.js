const _this = this ;

exports.handler = async (event) => {
    let dataStore;
    let body, ngram, case_sensitive, length;
    const atLeast = 1;       
    let numWords = 1;      
    const REallowedChars = /[^a-zA-Z'\-]+/g;
    let results = [];
    let sorted_results = [];
    
    if(event.context['http-method'] === 'POST'){
        dataStore = event['body-json'];
        /*Get all parameters provides else set default*/
        if(dataStore.hasOwnProperty('body')){
            body = dataStore.body;
            ngram = _this.checkForOtherParameters(dataStore,"ngram");
            case_sensitive = _this.checkForOtherParameters(dataStore, "case_sensitive");
            length = _this.checkForOtherParameters(dataStore, "length");
            
            /*start n-gram logic*/
            let i, j, k, textlen, len, s;
            
            // Prepare key hash
            let keys = [null];
            numWords++; 
            for (i=1; i<=numWords; i++) {
                keys.push({});
            }
            // Remove all irrelevant characters
            body = body.replace(REallowedChars, " ").replace(/^\s+/,"").replace(/\s+$/,"").replace(" ","");
            
            // Create a hash
            if (!case_sensitive) body = body.toLowerCase();
            for (i=0, textlen=body.length; i<textlen; i++) {
                s = body.substr(i, ngram);
                keys[1][s] = (keys[1][s] || 0) + 1;
                for (j=2; j<=numWords; j++) {
                    if(i+j <= textlen) {
                        s += " " + body[i+j-1];
                        keys[j][s] = (keys[j][s] || 0) + 1;
                    }
                    else break;
                }
            }
            
            // Prepares results
            for (let k=1; k<=numWords; k++) {
                results[k] = [];
                const key = keys[k];
                for (let i in key) {
                    if(key[i] >= atLeast) results[k].push({"ngram":i, "count":key[i]});
                }
            }
            
            // sort results
            const ngram_sorting = function(x,y) {return y.count - x.count;};
            for (k=1; k<numWords; k++) {
                results[k].sort(ngram_sorting);
            }
            for(let i=1; i<2; i++){
                sorted_results[i] = results[i].slice(0, length);
            }
        }
        else {
            /*Return error if body parameter not found*/
            const response = {
                statusCode: 400,
                body: JSON.stringify('ERROR! required parmeter not found'),
            };
            return response;
        }
        
    }
    
    const data = Object.assign({}, sorted_results);
    
    return data[1];
};

exports.checkForOtherParameters = function(dataStore, parameter){
     let value;
        if(dataStore.hasOwnProperty(parameter)){
            value = dataStore[parameter];
        }
        else {
            if(parameter === "ngram"){
                value = 1;
            }
            else if(parameter === "case_sensitive"){
                value = true;
            }
            else if(parameter === "length"){
                value = 100;
            }
        }
      return value;  
};
       


