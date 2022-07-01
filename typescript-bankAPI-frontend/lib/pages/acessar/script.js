"use strict";
API_URL = 'http://localhost:8000';
function enterAccount() {
    let account = {
        account_number: document.getElementById('account_number').value,
        agency: document.getElementById('agency_number').value,
        password: document.getElementById('user_password').value,
        id: ""
    };
    const options = {
        method: 'POST',
        credentials: "include",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(account),
        mode: 'cors',
    };
    fetch(API_URL + '/login', options)
        .then(response => {
        return response.json();
    })
        .then(data => {
        console.log(data);
        if (data.resp != "user does not found" && data.messages != "unexpected error")
            window.location = '../conta';
    })
        .catch(err => console.log(err));
}
document.getElementById('submit_account_data').addEventListener('click', enterAccount);
document.getElementById('go_back').addEventListener('click', () => window.location = '/');
