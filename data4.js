document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');

    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('regName').value;
            const email = document.getElementById('regEmail').value;
            const password = document.getElementById('regPassword').value;

            // 1. Ambil daftar user yang sudah ada, atau buat array kosong jika belum ada
            let daftarUser = JSON.parse(localStorage.getItem('semuaUserRAG')) || [];

            // 2. Cek apakah email sudah pernah didaftarkan sebelumnya
            const sudahAda = daftarUser.find(user => user.email === email);
            if (sudahAda) {
                alert("Email ini sudah terdaftar! Gunakan email lain.");
                return;
            }

 
            daftarUser.push({ name, email, password });

   
            localStorage.setItem('semuaUserRAG', JSON.stringify(daftarUser));

            alert('Pendaftaran Berhasil! Akun kamu sudah tersimpan di database.');
            window.location.href = '../HTML/index.html';
        });
    }

});

