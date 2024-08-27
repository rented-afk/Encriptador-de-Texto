// Seleccionar elementos del DOM
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const encryptBtn = document.getElementById('encryptBtn');
const decryptBtn = document.getElementById('decryptBtn');
const copyBtn = document.getElementById('copyBtn');
const validationMessage = document.getElementById('validationMessage');
const outputContent = document.getElementById('outputContent');

// Objeto con las reglas de encriptación
const encryptRules = {
    'e': 'enter',
    'i': 'imes',
    'a': 'ai',
    'o': 'ober',
    'u': 'ufat'
};

// Función para encriptar
function encrypt(text) {
    return text.replace(/[aeiou]/g, match => encryptRules[match]);
}

// Función para desencriptar
function decrypt(text) {
    let decrypted = text;
    Object.entries(encryptRules).forEach(([key, value]) => {
        decrypted = decrypted.split(value).join(key);
    });
    return decrypted;
}

// Función mejorada para validar el texto de entrada
function validateInput(text) {
    return /^[a-z\s]*$/.test(text);
}

// Función para mostrar u ocultar elementos
function toggleElements(show) {
    outputText.style.display = show ? 'block' : 'none';
    copyBtn.style.display = show ? 'block' : 'none';
    outputContent.style.display = show ? 'none' : 'block';
}

// Función para mostrar mensajes de error
function showError(message) {
    alert(message);
    console.error(message);
}

// Evento para el botón de encriptar
encryptBtn.addEventListener('click', () => {
    const text = inputText.value.toLowerCase();
    if (validateInput(text)) {
        const encryptedText = encrypt(text);
        outputText.value = encryptedText;
        toggleElements(true);
    } else {
        showError('Por favor, ingrese solo letras minúsculas sin acentos ni caracteres especiales.');
    }
});

// Evento para el botón de descifrar
decryptBtn.addEventListener('click', () => {
    const text = inputText.value.toLowerCase();
    if (validateInput(text)) {
        const decryptedText = decrypt(text);
        outputText.value = decryptedText;
        toggleElements(true);
    } else {
        showError('Por favor, ingrese solo letras minúsculas sin acentos ni caracteres especiales.');
    }
});

// Evento para el botón de copiar
copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(outputText.value)
        .then(() => {
            alert('Texto copiado al portapapeles');
            copyBtn.textContent = 'Copiado!';
            setTimeout(() => {
                copyBtn.textContent = 'Copiar';
            }, 2000);
        })
        .catch(err => showError('Error al copiar: ' + err));
});

// Validación de entrada en tiempo real
inputText.addEventListener('input', () => {
    const text = inputText.value;
    validationMessage.style.color = validateInput(text) ? 'initial' : 'red';
});

// Inicialización
toggleElements(false);

// Pruebas unitarias simples
function runTests() {
    console.assert(encrypt('hola') === 'hoberlai', 'Test de encriptación fallido');
    console.assert(decrypt('hoberlai') === 'hola', 'Test de desencriptación fallido');
    console.assert(validateInput('hola mundo') === true, 'Validación de entrada correcta fallida');
    console.assert(validateInput('Hola Mundo') === false, 'Validación de entrada incorrecta fallida');
    console.log('Todas las pruebas pasaron');
}

runTests();