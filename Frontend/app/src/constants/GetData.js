const url = 'https://rjygvsf0x5.execute-api.us-east-2.amazonaws.com/prod/ngram';
let data;
const GetData = (body,case_sensitive,nGram,length) => {
    if(nGram === 1 && length === 100){
        data = 
        {
            body: body,
            case_sensitive: case_sensitive
        }
    }
    else if(nGram !== 1 && length === 100) {
        data = 
        {
            body: body,
            ngram: nGram,
            case_sensitive: case_sensitive
        }
    }
    else if(length !== 1000 && nGram === 1){
        data = 
        {
            body: body,
            length: length,
            case_sensitive: case_sensitive
        }
    }
    else {
        data = 
        {
            body: body,
            ngram: nGram,
            length: length,
            case_sensitive: case_sensitive
        }
    }
    return fetch(url,{
        method: 'POST',
        body: JSON.stringify(data),
        headers:{ 'Content-Type': 'application/json' }
    });
}

export { GetData };