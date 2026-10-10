
/*async function login() {
    const userValue = document.getElementById('username').value;
    const messageBox = document.getElementById('message');

    // TƏHLÜKƏLİ: innerHTML gələn mətni kod kimi oxuyur
    messageBox.innerHTML = "Xoş gəldiniz: " + userValue;*/

async function login() {
    const userValue = document.getElementById('username').value;
    const passValue = document.getElementById('password').value;
    const messageBox = document.getElementById('message');

    if (!userValue || !passValue) {
        messageBox.style.color = "orange";
        messageBox.innerText = "Zəhmət olmasa bütün xanaları doldurun.";
        return;
    }

    messageBox.style.color = "#333";
    messageBox.innerText = "Yoxlanılır...";

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: userValue, password: passValue })
        });

        const data = await response.json();

        /*if (data.success) {
            messageBox.style.color = "#2ecc71";
            messageBox.innerText = "✅ " + data.message;*/
            // script.js daxilindəki if (data.success) hissəsini belə dəyiş:

if (data.success) {
    messageBox.style.color = "#2ecc71";
    messageBox.innerText = "Giriş uğurludur! Yönləndirilirsiniz...";
    
    // 1.5 saniyə sonra dashboard-a göndər
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1500);

        } else {
            messageBox.style.color = "#e74c3c";
            messageBox.innerText = "❌ " + data.message;
        }
    } catch (error) {
        messageBox.style.color = "#e74c3c";
        messageBox.innerText = "Bağlantı xətası baş verdi.";
    }
}
