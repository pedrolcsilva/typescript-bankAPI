
function goToOpenAcountPage(){
    window.location.href = "../cadastrar";
}

function goToAcessAcountPage(){
    window.location.href = "../acessar";
}




document.getElementById('openAcc_button').addEventListener('click', goToOpenAcountPage);
document.getElementById('acessAcc_button').addEventListener('click', goToAcessAcountPage);