document.addEventListener('DOMContentLoaded', function() {
    
    let count = 0; 
    const cartIcon = document.querySelector('.fa-cart-shopping'); 
    

    const badge = document.createElement('span');
    badge.style.cssText = `
        position: absolute;
        top: -8px;
        right: -10px;
        background: #ff4757;
        color: white;
        font-size: 11px;
        padding: 2px 6px;
        border-radius: 50%;
        font-weight: bold;
        display: none; /* Sembunyikan dulu kalau masih 0 */
    `;
    

    cartIcon.parentElement.style.position = 'relative';
    cartIcon.parentElement.appendChild(badge);


    const addBtns = document.querySelectorAll('.add-to-cart');

    addBtns.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            count++; 
            

            badge.innerText = count;
            badge.style.display = 'block';


            const productCard = this.closest('.product-info');
            const productName = productCard.querySelector('h3').innerText;


            this.innerText = '✅ Berhasil';
            this.style.background = '#2ed573';


            setTimeout(() => {
                this.innerText = 'Tambah ke Keranjang';
                this.style.background = ''; 
            }, 1500);

            console.log(productName + " masuk keranjang!");
        });
    });


});
    

    function goToHome() {
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = '../HTML/belajar5.html'; 
    }


 
const googleBtn = document.querySelector('.social-btn.google');
if (googleBtn) {
    googleBtn.addEventListener('click', function() {
        // Minta input email dari user
        const emailGoogle = prompt("Masukkan Email Google Anda:");
        
        if (emailGoogle) {
            prosesLoginSosial(emailGoogle, "Google");
        }
    });
}


const fbBtn = document.querySelector('.social-btn.facebook');
if (fbBtn) {
    fbBtn.addEventListener('click', function() {
        // Minta input ID atau Email Facebook
        const emailFB = prompt("Masukkan Email atau ID Facebook Anda:");
        
        if (emailFB) {
            prosesLoginSosial(emailFB, "Facebook");
        }
    });
}

function prosesLoginSosial(email, provider) {
    let daftarUser = JSON.parse(localStorage.getItem('semuaUserRAG')) || [];
    
    // Cari apakah email ini sudah pernah login/daftar sebelumnya
    let userDitemukan = daftarUser.find(u => u.email === email);

    if (!userDitemukan) {
        
        const userBaru = {
            email: email,
            password: "login-" + provider.toLowerCase() 
        };
        daftarUser.push(userBaru);
        localStorage.setItem('semuaUserRAG', JSON.stringify(daftarUser));
        alert(`Akun ${provider} baru berhasil dibuat untuk: ${userBaru.name}`);
    }

    alert(`Berhasil masuk via ${provider}!`);
    localStorage.setItem('isLoggedIn', 'true');
    window.location.href = '../HTML/belajar5.html';
}

 

const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault(); 

        const emailInput = document.getElementById('emailInput').value;
        const passwordInput = loginForm.querySelector('input[type="password"]').value;

        // 1. Ambil seluruh daftar user yang ada
        const daftarUser = JSON.parse(localStorage.getItem('semuaUserRAG')) || [];

      
        const userDitemukan = daftarUser.find(u => u.email === emailInput && u.password === passwordInput);

        if (userDitemukan) {
            alert('Selamat datang, ' + userDitemukan.name + '!');
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = '../HTML/belajar5.html'; 
        } else {
            alert('Email atau password salah!');
        }
    });
}

   
    if (window.location.pathname.includes('belajar5.html')) {
        if (localStorage.getItem('isLoggedIn') !== 'true') {
            alert("Akses ditolak! Silakan login terlebih dahulu.");
            window.location.href = '../HTML/index.html';
        }
    }


function logout() {
    if (confirm("Apakah kamu yakin ingin keluar?")) {
        localStorage.removeItem('isLoggedIn');
        window.location.href = '../HTML/index.html';
    }

}


