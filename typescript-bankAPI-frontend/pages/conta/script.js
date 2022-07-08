API_URL = 'http://localhost:8000';
let USER_DATA;
let ACCOUNT_DATA;

try {
    const options = {
        method: 'POST',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        mode: 'cors',
    };

    fetch(API_URL + '/access', options)
    .then(response => {
        return response.json();
    })
    .then(data =>{
        console.log(data);
        USER_DATA = data.data.user.resp;
        console.log(USER_DATA)
        ACCOUNT_DATA = data.data.account.resp;
        document.getElementById("welcome_message").innerHTML = `Seja Bem Vindo ${USER_DATA.name}`;
        document.getElementById("balance").innerHTML = `R$${ACCOUNT_DATA.balance}`;
    })
    .catch(err => {
        console.log(err);
    })

    

} catch (err) {
    console.log(err)
}

function logout() {
    const options = {
        method: 'POST',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        mode: 'cors',
    };

    fetch(API_URL + '/logout', options)
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
        window.location = '/'
    });

}


function sendDeposit(){
    const amount = Number(document.getElementById('deposit_value').value);
    
    const options = {
        method: 'PUT',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({amount}),
        mode: 'cors',
    };

    fetch(API_URL + '/makeDeposit', options)
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data)
    })
}

function makeWithdraw(){
    const withdrawValue = Number(document.getElementById('withdraw_value').value);

    const options = {
        method: 'PUT',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({withdrawValue}),
        mode: 'cors',
    };

    fetch(API_URL + '/makeWithdraw', options)
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data)
    })
    .catch(err => console.log(err))
}

function sendTransfer(){
    const DESTINATION_ACCOUNT = {
        destination_account_number: document.getElementById('dest_account_number').value,
        destination_agency: document.getElementById('dest_account_agency').value,
        amount: document.getElementById('transfer_value').value
    };

    const options = {
        method: 'PUT',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({...DESTINATION_ACCOUNT}),
        mode: 'cors',
    };
    fetch(API_URL + '/transfer', options)
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data)
    })
    .catch(err => console.log(err))

}

function returnOperations(){
    document.getElementsByTagName('input')[0].value = ''
    document.getElementsByTagName('input')[1].value = ''
    
    document.getElementById('deposit_modal').style.display= 'none';
    document.getElementById('deposit_modal').style.pointerEvents= 'none';
    document.getElementById('transfer_modal').style.display= 'none';
    document.getElementById('transfer_modal').style.pointerEvents= 'none';
    document.getElementById('withdraw_modal').style.display= 'none';
    document.getElementById('withdraw_modal').style.pointerEvents= 'none';
    document.getElementById('extract_modal').style.display= 'none';
    document.getElementById('extract_modal').style.pointerEvents= 'none';
}

function openDepositModal(){
    document.getElementById('deposit_modal').style.display= 'flex';
    document.getElementById('deposit_modal').style.pointerEvents= 'auto';
}

function openTransferModal(){
    document.getElementById('transfer_modal').style.display= 'flex';
    document.getElementById('transfer_modal').style.pointerEvents= 'auto';
}

function openWithdrawModal(){
    document.getElementById('withdraw_modal').style.display= 'flex';
    document.getElementById('withdraw_modal').style.pointerEvents= 'auto';
}

function openExtractModal(){
    document.getElementById('extract_modal').style.display= 'flex';
    document.getElementById('extract_modal').style.pointerEvents= 'auto';
    document.getElementById('extract_list').innerHTML = '';
    let extract_list = []
    const options = {
        method: 'POST',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        mode: 'cors',
    };
    
    fetch(API_URL + '/extract', options)
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
        extract_list = data.data

        extract_list.reverse().forEach((item, index) => {
            item.created_at = new Date(item.created_at);
            document.getElementById('extract_list').innerHTML+= `
            <div>
            <h2>${item.type.replace('transfer', 'Transferência').replace('deposit', 'Depósito').replace('withdraw', 'Saque')}: R$${item.amount} Data:${item.created_at.getDate()}/${item.created_at.getMonth()+1}/${item.created_at.getFullYear()}

            </div>
            `
        })
        
    })
    .catch(err => console.log(err))

}

document.getElementById('open_deposit_modal').addEventListener('click', openDepositModal);
document.getElementById('open_transfer_modal').addEventListener('click', openTransferModal);
document.getElementById('open_withdraw_modal').addEventListener('click', openWithdrawModal);
document.getElementById('open_extract_modal').addEventListener('click', openExtractModal);

document.getElementById('send_deposit').addEventListener('click', sendDeposit);

document.getElementById('make_withdraw').addEventListener('click', makeWithdraw);

document.getElementById('send_transfer').addEventListener('click', sendTransfer);

document.querySelectorAll('.close_modals').forEach(go_back_button => {
    go_back_button.addEventListener('click', returnOperations);
});



document.getElementById('logout').addEventListener('click', logout);
