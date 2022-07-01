const API_URL = 'http://localhost:8000/accounts';


function createAccount(){
    let user = {
        name: document.getElementById('user_name').value,
        birthdate: document.getElementById('user_birth').value,
        email: document.getElementById('user_email').value,
        cpf: document.getElementById('user_cpf').value,
        password: document.getElementById('user_password').value,
        id: ""
    };
    
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user),
        mode: 'cors',
    };
    fetch( API_URL, options)
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(err => console.log(err));

}



document.getElementById('submit_user_data').addEventListener('click', createAccount);
document.getElementById('go_back').addEventListener('click', () => window.location = '/');