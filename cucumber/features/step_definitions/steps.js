const {When, Then} = require('@cucumber/cucumber');
const assert = require('assert');

When('I POST a message to {string}', function (path, dataTable) {
    var body = dataTable.rowsHash()
    const url = `http://localhost:3000${path}`
    let payload = JSON.stringify(body);
    console.log(`Found payload ${payload}`)
    return fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: payload
    })
});

Then('I make a GET against {string}', async function (path, expectedResponse) {
    const url = `http://localhost:3000${path}`
     return fetch(url)
        .then(response => response.json())
        .then((json) => {
            console.log(`Found response ${JSON.stringify(json)}`)
            console.log(`Found expected ${expectedResponse}`)
            assert.deepStrictEqual(json, JSON.parse(expectedResponse));
        })
});

