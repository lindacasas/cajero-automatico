// Selección de botones
const loginButton = document.getElementById('login-btn');
const depositButton = document.getElementById('deposit-btn');
const withdrawButton = document.getElementById('withdraw-btn');
const withdraw100Button = document.getElementById('withdraw-100-btn');
const withdraw200Button = document.getElementById('withdraw-200-btn');
const withdraw500Button = document.getElementById('withdraw-500-btn');
const currentBalanceButton= document.getElementById('balance-btn');
const reinsertCardButton= document.getElementById('reinsert-btn');
const logoutButton = document.getElementById('logout-btn');

// Agregar la funcion event listener para el evento de clic en cada botón
loginButton.addEventListener('click', login);
depositButton.addEventListener('click', deposit);
withdrawButton.addEventListener('click', () => withdraw());
withdraw100Button.addEventListener('click', () => withdraw(100));
withdraw200Button.addEventListener('click', () => withdraw(200));
withdraw500Button.addEventListener('click', () => withdraw(500));
currentBalanceButton.addEventListener('click', currentBalance);
reinsertCardButton.addEventListener('click', reinsertCard);
logoutButton.addEventListener('click', logout);

// Declaración de las variables globales 
let initialBalance = 0;
let amountDeposit = 0;
let amountWithdraw = 0;
let limitDeposit=69600;
let limitWithdraw=5000;

// Creación del objeto cuentas con 3 usuarios
let account = {
    person1: {
        name: "mely",
        password: "12345",
        initialBalance: 200,
    },
    person2: {
        name: "ignacio",
        password: "54321",
        initialBalance: 290,
    },
    person3: {
        name: "manuel",
        password: "67890",
        initialBalance: 67,
    },
};

// Creación de las funciones
function welcome(){  
    document.getElementById('container-main').classList.add('d-none');
    document.getElementById('login-container').classList.remove('d-none');
}

function login(){
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (username === '' || password === '') {
        alert("Ingrese sus datos");
        return;
    }

    const numberOfAccounts = Object.keys(account).length;

    for (let i = 1; i <= numberOfAccounts; i++) {
        const currentPerson = account['person' + i];

        if (username === currentPerson.name && password === currentPerson.password) {
            document.getElementById('login-container').classList.add('d-none');
            document.getElementById('atm-area').classList.remove('d-none');
            document.getElementById('welcome-message').innerText = `Bienvenido/a, ${username}`;
            initialBalance = currentPerson.initialBalance;
            checkBalance();
            return;
        }
    }

    alert("Usuario o contraseña incorrecta");
    document.getElementById('username').value = "";
    document.getElementById('password').value = "";
}

function checkBalance() {
    document.getElementById('balance-display').innerHTML = `<strong>Saldo: $${initialBalance}</strong>`;
}

function currentBalance() {
    alert("Su saldo actual es: $"+initialBalance);
}

function deposit() {
    const amount = parseFloat(document.getElementById('deposit-amount').value);
    if (isNaN(amount) || amount <= 0) {
        alert("Ingrese una cantidad válida para depositar y recuerde que solo se permite depositar hasta $"+ limitDeposit +" por día");
        document.getElementById('deposit-amount').value = "";
        return;
    }
    if (amountDeposit + amount > limitDeposit) {
        alert("Solo puede depositar hasta $"+ limitDeposit +" por día y usted lleva depositado $"+amountDeposit);
        document.getElementById('deposit-amount').value = "";
        return;
    }
    
    initialBalance += amount;
    amountDeposit += amount;
    checkBalance();
    alert("Depósito realizado");

    document.getElementById('deposit-amount').value = "";

    if(amountDeposit===limitDeposit){
        document.getElementById('deposit-amount').disabled = true;
    }
}

function withdraw(amount) {
    if (initialBalance === 0) {
        alert("No hay fondos suficientes para realizar el retiro");
        document.getElementById('withdraw-amount').value = "";
        return;
    }
    if (amount === undefined) {
        amount = parseFloat(document.getElementById('withdraw-amount').value);
        if (isNaN(amount) || amount <= 0) {
            alert("Ingrese una cantidad válida para retirar y recuerde que el monto máximo de retiro es de $"+limitWithdraw);
            document.getElementById('withdraw-amount').value = "";
            return;
        }
    }
    if (initialBalance < amount) {
        alert("No hay fondos suficientes para realizar el retiro");
        document.getElementById('withdraw-amount').value = "";
        return;
    }
    if (amountWithdraw + amount > limitWithdraw) {
        alert("El monto máximo de retiro es de $"+ limitWithdraw +" y usted lleva retirado $"+amountWithdraw+".\nPara retirar más vuelva a ingresar su tarjeta");
        document.getElementById('withdraw-amount').value = "";
        return;
    }
    if (initialBalance >= amount) {
        initialBalance -= amount;
        amountWithdraw += amount;
        checkBalance();
        alert("Retiro exitoso");
        document.getElementById('withdraw-amount').value = "";
        if(amountWithdraw===limitWithdraw){
            document.getElementById('withdraw-amount').disabled = true;
        }
        return;
    }
}

function reinsertCard (){
    amountWithdraw=0;
    document.getElementById('withdraw-amount').disabled = false;
    alert("Proceso exitoso");
}

function logout() {
    document.getElementById('atm-area').classList.add('d-none');
    document.getElementById('container-main').classList.remove('d-none');

    document.getElementById('username').value = "";
    document.getElementById('password').value = "";
    document.getElementById('balance-display').innerText = "";
    document.getElementById('deposit-amount').value = "";
    document.getElementById('withdraw-amount').value = "";

    alert("Sesión cerrada");
}