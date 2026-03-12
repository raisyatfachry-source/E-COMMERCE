document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');

    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();

            
            const name = document.getElementById('regName').value.trim();
            const email = document.getElementById('regEmail').value.trim();
            const password = document.getElementById('regPassword').value;

            
            
            if (password.length < 8) {
                alert("Pendaftaran Gagal! Password harus minimal 8 karakter agar akunmu aman.");
                return;
            }

            
            let daftarUser = JSON.parse(localStorage.getItem('semuaUserRAG')) || [];

            
            const emailSudahAda = daftarUser.find(user => user.email === email);
            if (emailSudahAda) {
                alert("Email ini sudah terdaftar! Silakan gunakan email lain atau langsung login.");
                return;
            }

            
            const userBaru = {
                name: name,
                email: email,
                password: password, 
                createdAt: new Date().toLocaleString('id-ID')
            };

            
            daftarUser.push(userBaru);
            localStorage.setItem('semuaUserRAG', JSON.stringify(daftarUser));

            
            alert(`Selamat ${name}, akun RAG kamu berhasil dibuat! Silakan login.`);
            window.location.href = 'index.html'; 
        });
    }
});