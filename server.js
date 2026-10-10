/*const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Frontend (index.html) faylını birbaşa server üzərindən açmaq üçün
app.use(express.static(__dirname));

// PostgreSQL ilə əlaqə tənzimləmələri
const pool = new Pool({
    user: 'postgres',          
    host: 'localhost',
    database: 'testdb',        
    password: 'gulay', 
    port: 5432,
});*/
/*
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        // Zəif kod (Hücum üçün)
        const query = "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'";
        console.log("İcra olunan SQL:", query); 
        
        const result = await pool.query(query);

        if (result.rows.length > 0) {
            res.json({ success: true, message: 'Giriş uğurludur!' });
        } else {
            res.json({ success: false, message: 'İstifadəçi adı və ya şifrə səhvdir.' });
        }
    } catch (err) {
    
        console.error("!!! SQL XƏTASI BAŞ VERDİ !!!:", err.message);
        
        // Frontend-in "Yoxlanılır"da qalmaması üçün xəta cavabı qaytarırıq
        res.status(500).json({ success: false, message: 'Serverdə SQL xətası yarandı!' });
    }
});*/
/*app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
       
        const query = "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'";
        console.log("İcra olunan SQL:", query); // 
        
        const result = await pool.query(query); // Parametr yoxdur ($1, $2 yoxdur)

        if (result.rows.length > 0) {
            res.json({ success: true, message: 'Sistemə sızıldı! (SQL Injection)' });
        } else {
            res.json({ success: false, message: 'Uğursuz giriş.' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server xətası!' });
    }
});*/
// Login marşrutu (Route)
/*app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await pool.query(
            'SELECT * FROM users WHERE username = $1 AND password = $2',
            [username, password]
        );

        if (result.rows.length > 0) {
            res.json({ success: true, message: 'Sistemə uğurla daxil oldunuz!' });
        } else {
            res.json({ success: false, message: 'İstifadəçi adı və ya şifrə səhvdir!' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Serverdə xəta baş verdi!' });
    }
});*/
/*app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        // Zəif kod (Hücum üçün)
        const query = "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'";
        console.log("İcra olunan SQL:", query); 
        
        const result = await pool.query(query);

        if (result.rows.length > 0) {
            res.json({ success: true, message: 'Giriş uğurludur!' });
        } else {
            res.json({ success: false, message: 'İstifadəçi adı və ya şifrə səhvdir.' });
        }
    } catch (err) {
        // BAX BU SƏTİR ÇOX VACİBDİR:
        console.error("!!! SQL XƏTASI BAŞ VERDİ !!!:", err.message);
        
        // Frontend-in "Yoxlanılır"da qalmaması üçün xəta cavabı qaytarırıq
        res.status(500).json({ success: false, message: 'Serverdə SQL xətası yarandı!' });
    }
});

// Serverin dinlədiyi port
app.listen(3000, () => {
    console.log('Server işləyir: http://localhost:3000');
});
// server.js daxilində
const path = require('path');

// Dashboard səhifəsini göstərmək üçün
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});
/*app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});*/
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');
const crypto = require('crypto'); // Kriptoqrafik alqoritmlər üçün Node.js daxili modulu

const app = express();
app.use(express.json());
app.use(cors());

// Frontend fayllarını birbaşa server üzərindən açmaq üçün
app.use(express.static(__dirname));

// PostgreSQL ilə əlaqə tənzimləmələri
const pool = new Pool({
    user: 'postgres',          
    host: 'localhost',
    database: 'testdb',         
    password: 'gulay', 
    port: 5432,
});

/* ==========================================================
   1. ZƏİF KOD (SQL Injection nümayişi üçün)
   Müəllimə hücumu göstərmək üçün BU BLOQU AKTİV EDİN, 
   təhlükəsiz bloku isə şərhə alın.
   (Bu aktiv olanda admin' -- yazaraq sızmağı göstərə bilərsiniz)
   ========================================================== */
/*
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const query = "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'";
        console.log("İcra olunan ZƏİF SQL:", query); 
        
        const result = await pool.query(query);

        if (result.rows.length > 0) {
            res.json({ success: true, message: 'Giriş uğurludur! (Zəif kod - Sızıldı)' });
        } else {
            res.json({ success: false, message: 'İstifadəçi adı və ya şifrə səhvdir.' });
        }
    } catch (err) {
        console.error("!!! SQL XƏTASI BAŞ VERDİ !!!:", err.message);
        res.status(500).json({ success: false, message: 'Serverdə SQL xətası yarandı!' });
    }
});
*/


/* ==========================================================
   2. TƏHLÜKƏSİZ KOD (Parametrli sorğu + Kriptoqrafiya nümunəsi)
   Müəllimə təhlükəsizliyi göstərmək üçün BU BLOQ AKTİV OLMALIDIR.
   (Bazadakı parollarla problem yaratmır, birbaşa düzgün yoxlayır)
   ========================================================== */
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Parametrləşdirilmiş sorğu: SQL Injection-ı tam bloklayır!
        const result = await pool.query(
            'SELECT * FROM users WHERE username = $1 AND password = $2',
            [username, password]
        );

        if (result.rows.length > 0) {
            // Nümunə: Kriptoqrafik alqoritm (AES-256) ilə həssas məlumatın şifrələnməsi (Müəllim üçün)
            const secretData = "GulBoutique-Admin-Token-123";
            const algorithm = 'aes-256-cbc';
            const secretKey = crypto.randomBytes(32);
            const iv = crypto.randomBytes(16);

            const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
            let encryptedData = cipher.update(secretData, 'utf8', 'hex');
            encryptedData += cipher.final('hex');

            console.log("Kriptoqrafik Şifrələnmiş Məlumat (AES-256):", encryptedData);

            res.json({ 
                success: true, 
                message: 'Təhlükəsiz giriş uğurludur!',
                cryptoDemo: encryptedData // Kriptoqrafiyanın işlədiyini sübut edən token
            });
        } else {
            res.json({ success: false, message: 'İstifadəçi adı və ya şifrə səhvdir!' });
        }
    } catch (err) {
        console.error("Server xətası:", err);
        res.status(500).json({ success: false, message: 'Serverdə xəta baş verdi!' });
    }
});


// Səhifə marşrutları
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index2.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

app.listen(3000, () => {
    console.log('Server işləyir: http://localhost:3000');
});