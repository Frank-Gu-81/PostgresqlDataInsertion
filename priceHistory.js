const fs = require('fs');
const fetch = require('node-fetch');

// Your subscription key from https://rapidapi.com/restyler/api/scrapeninja
const xRapidapiKey = "";  // Replace with your subscription key

// const companies = ["spacex", "tesla", "google"];
const companies = JSON.parse(fs.readFileSync('companyList.txt', 'utf8'));
console.log(companies);

const requests = companies.map(company => 
    fetch('https://scrapeninja.p.rapidapi.com/scrape', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "x-rapidapi-host": "scrapeninja.p.rapidapi.com",
            "x-rapidapi-key": xRapidapiKey
        },
        body: JSON.stringify({
            "url": "https://api.notice.co/graphql",
            "method": "POST",
            "headers": [
                "authority: api.notice.co",
                "accept: */*",
                "accept-language: en-US,en;q=0.9",
                "content-type: application/json",
                "cookie: _ga=GA1.1.348994122.1710138789; cf_clearance=xBw3Zo.PwzEpXf8zlipKOttficu4nH17fWLiwzfRx04-1710138789-1.0.1.1-JvfQbe2NdXQgZX6nIA1WKOs_j1KshBfd6TxQEn.mSoYYd4piw.3akGytwapBxZNMu0MdL9Ei3qBX5lXe32liyA; ajs_anonymous_id=3fb6d34d-3e41-4d7d-928a-12da04f679de; intercom-id-zrvq06g8=43936c2a-3dd9-4498-be2a-f803d86cb137; intercom-device-id-zrvq06g8=15274c37-a6f5-47fb-99e1-0cd9bb6202e6; _stytch_jwt=eyJhbGciOiJSUzI1NiIsImtpZCI6Imp3ay1saXZlLWJmNzAwODgyLWQ3YTEtNGJhOS1iMGM0LTY0NTIwZTA3NjBjZiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsicHJvamVjdC1saXZlLWZmYjMwOTI5LTZjNjctNGU5Zi1hYWViLTY4YTVkNjAyNTRlZCJdLCJleHAiOjE3MTAxMzkwOTMsImh0dHBzOi8vc3R5dGNoLmNvbS9zZXNzaW9uIjp7ImlkIjoic2Vzc2lvbi1saXZlLWU2OTFkZTk3LTRiZjgtNGQxZS05ZjE0LTZlZjI4MGIyYTE1YiIsInN0YXJ0ZWRfYXQiOiIyMDI0LTAzLTExVDA2OjMzOjEzWiIsImxhc3RfYWNjZXNzZWRfYXQiOiIyMDI0LTAzLTExVDA2OjMzOjEzWiIsImV4cGlyZXNfYXQiOiIyMDI0LTA0LTEwVDA2OjMzOjEzWiIsImF0dHJpYnV0ZXMiOnsidXNlcl9hZ2VudCI6IiIsImlwX2FkZHJlc3MiOiIifSwiYXV0aGVudGljYXRpb25fZmFjdG9ycyI6W3sidHlwZSI6Im9hdXRoIiwiZGVsaXZlcnlfbWV0aG9kIjoib2F1dGhfZ29vZ2xlIiwibGFzdF9hdXRoZW50aWNhdGVkX2F0IjoiMjAyNC0wMy0xMVQwNjozMzoxM1oiLCJnb29nbGVfb2F1dGhfZmFjdG9yIjp7ImlkIjoib2F1dGgtdXNlci1saXZlLTk4ZGEyNDVhLTE1NTYtNDk4Yy04MWQ0LTRhZWY0MTQ1YjhhZCIsInByb3ZpZGVyX3N1YmplY3QiOiIxMDg3NDA0MjQ2MzQxOTgwOTE2NTIifX1dfSwiaWF0IjoxNzEwMTM4NzkzLCJpc3MiOiJzdHl0Y2guY29tL3Byb2plY3QtbGl2ZS1mZmIzMDkyOS02YzY3LTRlOWYtYWFlYi02OGE1ZDYwMjU0ZWQiLCJuYmYiOjE3MTAxMzg3OTMsInN1YiI6InVzZXItbGl2ZS0zZWQ1NDY5YS01NmYyLTQ3NWUtYTc2My02Njk2Y2JhZmFiODIifQ.ezOsJ2O2JzsgalhnXYivMZQlA8xbkmZ9RFyYMsdE6NVEUus7_JQVBhyrzZcX5QeW3pXyw9Z-ssDUve04tlo8675k6ojfbtnICjAjMhP7_WhB8diMpap7mQV-vZTc7Fre3ZNemG0jo6RdL89C_kMq4J-H6MNjLqTBOVlno5MKR12xFIx9wygYjxrevmDsMD0_2m7zyrTshrJ4bWpTBrlGvMHa1aEkQrPVPUsY3LPE2lCJ0YhkQiFxvvZEhbkkYk_d6kYyy_GLkRuzexccxT32wkr7g17UAjuSES0zsOJr2oVAw_l_xpyG1bw5A6oX6-8eTkRWzMcPGwph11EbpwD7OA; ajs_user_id=f36a4590-9ecb-44ec-bdba-07100a688a4f; intercom-session-zrvq06g8=eFF1ZENmUjVIUmx0dXo2TmdteU9XUUpCMitZVWRuZkh4MFlEUUV3eTRZRzVmbTVRUHFxSUVZRjRkNlBjSlFHMy0tdU0zTkFzUnJrYUprekRDSnZtL3Vhdz09--dfb6e89e083c1b10e304989525b32ed36bdb4b14; _ga_MR3FZM9JM0=GS1.1.1710138788.1.1.1710138827.21.0.0; _notice_session=FqTgm1VLhpuUd7DBut7IqsTp3w7lpwbqf8Dv93E0OqGRKxBRMoH7dJD8Xxesj1qgP%2BTbdU%2Bm4Ka9n%2Fq89BGebug6H40fRB5asbFk6EPN1S9OwEzTYjIYqy0B8u%2Bjt0a3b7g0Za8PPf8URfgCO0m%2FmZaFi9CkT0A3hAU94B%2FAxUYYMBvWG3tEEtu8oAxjZip4TdkWaWJ79o2NX4TnD2dl6bWKeEJxF1sbx2w8Pxb3XhBf0jvSTHlmkD0Rq2Hgl4bVSz9Wo35mwURsVp95iMjWutIIajGm5oHLAuDWTyAA%2FFN2SllGXY5vSb6lgK0B1mZlLiavtD19egJJ1rM%3D--sdppC0xWlRacl%2FCE--skzYeuKVIIzlzYDcbk2ijw%3D%3D",
                "origin: https://notice.co",
                "referer: https://notice.co/",
                "sec-ch-ua: \"Not A(Brand\";v=\"99\", \"Google Chrome\";v=\"121\", \"Chromium\";v=\"121\"",
                "sec-ch-ua-mobile: ?0",
                "sec-ch-ua-platform: \"macOS\"",
                "sec-fetch-dest: empty",
                "sec-fetch-mode: cors",
                "sec-fetch-site: same-site",
                "user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
                "x-csrf-token: k2HmWmx8gC2U8i_GLLrLsfYZwkhPUn0qtq-4yAhzDXf6u8SYd5GxI0bd3q9rbLhHoM3OY47ztltc4MX7l6RDag",
                "x-notice-client: web",
                "x-stytch-session-jwt: eyJhbGciOiJSUzI1NiIsImtpZCI6Imp3ay1saXZlLWJmNzAwODgyLWQ3YTEtNGJhOS1iMGM0LTY0NTIwZTA3NjBjZiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsicHJvamVjdC1saXZlLWZmYjMwOTI5LTZjNjctNGU5Zi1hYWViLTY4YTVkNjAyNTRlZCJdLCJleHAiOjE3MTAxMzkwOTMsImh0dHBzOi8vc3R5dGNoLmNvbS9zZXNzaW9uIjp7ImlkIjoic2Vzc2lvbi1saXZlLWU2OTFkZTk3LTRiZjgtNGQxZS05ZjE0LTZlZjI4MGIyYTE1YiIsInN0YXJ0ZWRfYXQiOiIyMDI0LTAzLTExVDA2OjMzOjEzWiIsImxhc3RfYWNjZXNzZWRfYXQiOiIyMDI0LTAzLTExVDA2OjMzOjEzWiIsImV4cGlyZXNfYXQiOiIyMDI0LTA0LTEwVDA2OjMzOjEzWiIsImF0dHJpYnV0ZXMiOnsidXNlcl9hZ2VudCI6IiIsImlwX2FkZHJlc3MiOiIifSwiYXV0aGVudGljYXRpb25fZmFjdG9ycyI6W3sidHlwZSI6Im9hdXRoIiwiZGVsaXZlcnlfbWV0aG9kIjoib2F1dGhfZ29vZ2xlIiwibGFzdF9hdXRoZW50aWNhdGVkX2F0IjoiMjAyNC0wMy0xMVQwNjozMzoxM1oiLCJnb29nbGVfb2F1dGhfZmFjdG9yIjp7ImlkIjoib2F1dGgtdXNlci1saXZlLTk4ZGEyNDVhLTE1NTYtNDk4Yy04MWQ0LTRhZWY0MTQ1YjhhZCIsInByb3ZpZGVyX3N1YmplY3QiOiIxMDg3NDA0MjQ2MzQxOTgwOTE2NTIifX1dfSwiaWF0IjoxNzEwMTM4NzkzLCJpc3MiOiJzdHl0Y2guY29tL3Byb2plY3QtbGl2ZS1mZmIzMDkyOS02YzY3LTRlOWYtYWFlYi02OGE1ZDYwMjU0ZWQiLCJuYmYiOjE3MTAxMzg3OTMsInN1YiI6InVzZXItbGl2ZS0zZWQ1NDY5YS01NmYyLTQ3NWUtYTc2My02Njk2Y2JhZmFiODIifQ.ezOsJ2O2JzsgalhnXYivMZQlA8xbkmZ9RFyYMsdE6NVEUus7_JQVBhyrzZcX5QeW3pXyw9Z-ssDUve04tlo8675k6ojfbtnICjAjMhP7_WhB8diMpap7mQV-vZTc7Fre3ZNemG0jo6RdL89C_kMq4J-H6MNjLqTBOVlno5MKR12xFIx9wygYjxrevmDsMD0_2m7zyrTshrJ4bWpTBrlGvMHa1aEkQrPVPUsY3LPE2lCJ0YhkQiFxvvZEhbkkYk_d6kYyy_GLkRuzexccxT32wkr7g17UAjuSES0zsOJr2oVAw_l_xpyG1bw5A6oX6-8eTkRWzMcPGwph11EbpwD7OA"
              ],
            "data": `{"operationName":"PriceTimeline","variables":{"identifier":"${company}"},\"query\":\"query PriceTimeline($identifier: String!, $startDate: String) {\\n  priceTimeline(identifier: $identifier, startDate: $startDate) {\\n    id\\n    prices {\\n      id\\n      date\\n      price\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\"}`
        })
    }).then(res => res.json()).then(json => {
        console.log(company, json);
    }).catch(err => {
        console.error(`Error fetching data for ${company}:`, err);
    })
);

Promise.all(requests).then(() => {
    console.log('All company data fetched');
}).catch(err => {
    console.error('An error occurred:', err);
});




// const fetch = require('node-fetch');

// // get your subscription key at https://rapidapi.com/restyler/api/scrapeninja from "Code generator",
// // copy&paste it to 'x-rapidapi-key' header below 

// const identifierVar = "spacex";

// let req = fetch('https://scrapeninja.p.rapidapi.com/scrape', {
//     method: 'POST',
//     headers: 
//     {
//     "Content-Type": "application/json",
//     "x-rapidapi-host": "scrapeninja.p.rapidapi.com",
//     "x-rapidapi-key": ""
//     },
//     body: JSON.stringify(       {
//     "url": "https://api.notice.co/graphql",
//     "method": "POST",
    // "headers": [
    //     "authority: api.notice.co",
    //     "accept: */*",
    //     "accept-language: en-US,en;q=0.9",
    //     "content-type: application/json",
    //     "cookie: _ga=GA1.1.348994122.1710138789; cf_clearance=xBw3Zo.PwzEpXf8zlipKOttficu4nH17fWLiwzfRx04-1710138789-1.0.1.1-JvfQbe2NdXQgZX6nIA1WKOs_j1KshBfd6TxQEn.mSoYYd4piw.3akGytwapBxZNMu0MdL9Ei3qBX5lXe32liyA; ajs_anonymous_id=3fb6d34d-3e41-4d7d-928a-12da04f679de; intercom-id-zrvq06g8=43936c2a-3dd9-4498-be2a-f803d86cb137; intercom-device-id-zrvq06g8=15274c37-a6f5-47fb-99e1-0cd9bb6202e6; _stytch_jwt=eyJhbGciOiJSUzI1NiIsImtpZCI6Imp3ay1saXZlLWJmNzAwODgyLWQ3YTEtNGJhOS1iMGM0LTY0NTIwZTA3NjBjZiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsicHJvamVjdC1saXZlLWZmYjMwOTI5LTZjNjctNGU5Zi1hYWViLTY4YTVkNjAyNTRlZCJdLCJleHAiOjE3MTAxMzkwOTMsImh0dHBzOi8vc3R5dGNoLmNvbS9zZXNzaW9uIjp7ImlkIjoic2Vzc2lvbi1saXZlLWU2OTFkZTk3LTRiZjgtNGQxZS05ZjE0LTZlZjI4MGIyYTE1YiIsInN0YXJ0ZWRfYXQiOiIyMDI0LTAzLTExVDA2OjMzOjEzWiIsImxhc3RfYWNjZXNzZWRfYXQiOiIyMDI0LTAzLTExVDA2OjMzOjEzWiIsImV4cGlyZXNfYXQiOiIyMDI0LTA0LTEwVDA2OjMzOjEzWiIsImF0dHJpYnV0ZXMiOnsidXNlcl9hZ2VudCI6IiIsImlwX2FkZHJlc3MiOiIifSwiYXV0aGVudGljYXRpb25fZmFjdG9ycyI6W3sidHlwZSI6Im9hdXRoIiwiZGVsaXZlcnlfbWV0aG9kIjoib2F1dGhfZ29vZ2xlIiwibGFzdF9hdXRoZW50aWNhdGVkX2F0IjoiMjAyNC0wMy0xMVQwNjozMzoxM1oiLCJnb29nbGVfb2F1dGhfZmFjdG9yIjp7ImlkIjoib2F1dGgtdXNlci1saXZlLTk4ZGEyNDVhLTE1NTYtNDk4Yy04MWQ0LTRhZWY0MTQ1YjhhZCIsInByb3ZpZGVyX3N1YmplY3QiOiIxMDg3NDA0MjQ2MzQxOTgwOTE2NTIifX1dfSwiaWF0IjoxNzEwMTM4NzkzLCJpc3MiOiJzdHl0Y2guY29tL3Byb2plY3QtbGl2ZS1mZmIzMDkyOS02YzY3LTRlOWYtYWFlYi02OGE1ZDYwMjU0ZWQiLCJuYmYiOjE3MTAxMzg3OTMsInN1YiI6InVzZXItbGl2ZS0zZWQ1NDY5YS01NmYyLTQ3NWUtYTc2My02Njk2Y2JhZmFiODIifQ.ezOsJ2O2JzsgalhnXYivMZQlA8xbkmZ9RFyYMsdE6NVEUus7_JQVBhyrzZcX5QeW3pXyw9Z-ssDUve04tlo8675k6ojfbtnICjAjMhP7_WhB8diMpap7mQV-vZTc7Fre3ZNemG0jo6RdL89C_kMq4J-H6MNjLqTBOVlno5MKR12xFIx9wygYjxrevmDsMD0_2m7zyrTshrJ4bWpTBrlGvMHa1aEkQrPVPUsY3LPE2lCJ0YhkQiFxvvZEhbkkYk_d6kYyy_GLkRuzexccxT32wkr7g17UAjuSES0zsOJr2oVAw_l_xpyG1bw5A6oX6-8eTkRWzMcPGwph11EbpwD7OA; ajs_user_id=f36a4590-9ecb-44ec-bdba-07100a688a4f; intercom-session-zrvq06g8=eFF1ZENmUjVIUmx0dXo2TmdteU9XUUpCMitZVWRuZkh4MFlEUUV3eTRZRzVmbTVRUHFxSUVZRjRkNlBjSlFHMy0tdU0zTkFzUnJrYUprekRDSnZtL3Vhdz09--dfb6e89e083c1b10e304989525b32ed36bdb4b14; _ga_MR3FZM9JM0=GS1.1.1710138788.1.1.1710138827.21.0.0; _notice_session=FqTgm1VLhpuUd7DBut7IqsTp3w7lpwbqf8Dv93E0OqGRKxBRMoH7dJD8Xxesj1qgP%2BTbdU%2Bm4Ka9n%2Fq89BGebug6H40fRB5asbFk6EPN1S9OwEzTYjIYqy0B8u%2Bjt0a3b7g0Za8PPf8URfgCO0m%2FmZaFi9CkT0A3hAU94B%2FAxUYYMBvWG3tEEtu8oAxjZip4TdkWaWJ79o2NX4TnD2dl6bWKeEJxF1sbx2w8Pxb3XhBf0jvSTHlmkD0Rq2Hgl4bVSz9Wo35mwURsVp95iMjWutIIajGm5oHLAuDWTyAA%2FFN2SllGXY5vSb6lgK0B1mZlLiavtD19egJJ1rM%3D--sdppC0xWlRacl%2FCE--skzYeuKVIIzlzYDcbk2ijw%3D%3D",
    //     "origin: https://notice.co",
    //     "referer: https://notice.co/",
    //     "sec-ch-ua: \"Not A(Brand\";v=\"99\", \"Google Chrome\";v=\"121\", \"Chromium\";v=\"121\"",
    //     "sec-ch-ua-mobile: ?0",
    //     "sec-ch-ua-platform: \"macOS\"",
    //     "sec-fetch-dest: empty",
    //     "sec-fetch-mode: cors",
    //     "sec-fetch-site: same-site",
    //     "user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
    //     "x-csrf-token: k2HmWmx8gC2U8i_GLLrLsfYZwkhPUn0qtq-4yAhzDXf6u8SYd5GxI0bd3q9rbLhHoM3OY47ztltc4MX7l6RDag",
    //     "x-notice-client: web",
    //     "x-stytch-session-jwt: eyJhbGciOiJSUzI1NiIsImtpZCI6Imp3ay1saXZlLWJmNzAwODgyLWQ3YTEtNGJhOS1iMGM0LTY0NTIwZTA3NjBjZiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsicHJvamVjdC1saXZlLWZmYjMwOTI5LTZjNjctNGU5Zi1hYWViLTY4YTVkNjAyNTRlZCJdLCJleHAiOjE3MTAxMzkwOTMsImh0dHBzOi8vc3R5dGNoLmNvbS9zZXNzaW9uIjp7ImlkIjoic2Vzc2lvbi1saXZlLWU2OTFkZTk3LTRiZjgtNGQxZS05ZjE0LTZlZjI4MGIyYTE1YiIsInN0YXJ0ZWRfYXQiOiIyMDI0LTAzLTExVDA2OjMzOjEzWiIsImxhc3RfYWNjZXNzZWRfYXQiOiIyMDI0LTAzLTExVDA2OjMzOjEzWiIsImV4cGlyZXNfYXQiOiIyMDI0LTA0LTEwVDA2OjMzOjEzWiIsImF0dHJpYnV0ZXMiOnsidXNlcl9hZ2VudCI6IiIsImlwX2FkZHJlc3MiOiIifSwiYXV0aGVudGljYXRpb25fZmFjdG9ycyI6W3sidHlwZSI6Im9hdXRoIiwiZGVsaXZlcnlfbWV0aG9kIjoib2F1dGhfZ29vZ2xlIiwibGFzdF9hdXRoZW50aWNhdGVkX2F0IjoiMjAyNC0wMy0xMVQwNjozMzoxM1oiLCJnb29nbGVfb2F1dGhfZmFjdG9yIjp7ImlkIjoib2F1dGgtdXNlci1saXZlLTk4ZGEyNDVhLTE1NTYtNDk4Yy04MWQ0LTRhZWY0MTQ1YjhhZCIsInByb3ZpZGVyX3N1YmplY3QiOiIxMDg3NDA0MjQ2MzQxOTgwOTE2NTIifX1dfSwiaWF0IjoxNzEwMTM4NzkzLCJpc3MiOiJzdHl0Y2guY29tL3Byb2plY3QtbGl2ZS1mZmIzMDkyOS02YzY3LTRlOWYtYWFlYi02OGE1ZDYwMjU0ZWQiLCJuYmYiOjE3MTAxMzg3OTMsInN1YiI6InVzZXItbGl2ZS0zZWQ1NDY5YS01NmYyLTQ3NWUtYTc2My02Njk2Y2JhZmFiODIifQ.ezOsJ2O2JzsgalhnXYivMZQlA8xbkmZ9RFyYMsdE6NVEUus7_JQVBhyrzZcX5QeW3pXyw9Z-ssDUve04tlo8675k6ojfbtnICjAjMhP7_WhB8diMpap7mQV-vZTc7Fre3ZNemG0jo6RdL89C_kMq4J-H6MNjLqTBOVlno5MKR12xFIx9wygYjxrevmDsMD0_2m7zyrTshrJ4bWpTBrlGvMHa1aEkQrPVPUsY3LPE2lCJ0YhkQiFxvvZEhbkkYk_d6kYyy_GLkRuzexccxT32wkr7g17UAjuSES0zsOJr2oVAw_l_xpyG1bw5A6oX6-8eTkRWzMcPGwph11EbpwD7OA"
    //   ],
//     "data": "{\"operationName\":\"PriceTimeline\",\"variables\":{\"identifier\":\"" + identifierVar + "\"},\"query\":\"query PriceTimeline($identifier: String!, $startDate: String) {\\n  priceTimeline(identifier: $identifier, startDate: $startDate) {\\n    id\\n    prices {\\n      id\\n      date\\n      price\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n\"}"       
// })

//     });
// req.then((res) => res.json()).then(json => console.log(json))
