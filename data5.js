document.addEventListener('DOMContentLoaded', function() {
    
    let count = parseInt(localStorage.getItem('cartCount')) || 0;
    const cartIcon = document.querySelector('.fa-cart-shopping');
    const loginForm = document.getElementById('loginForm');
    const btnCheckout = document.getElementById('btnPesan');

    
    const protectedPages = ['belajar5.html', 'payment.html', 'custom.html'];
    const currentPage = window.location.pathname.split("/").pop();
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (protectedPages.includes(currentPage) && isLoggedIn !== 'true') {
        alert("Akses ditolak! Silakan login terlebih dahulu.");
        window.location.href = 'index.html';
        return;
    }

    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const emailInput = document.getElementById('emailInput').value;
            const passwordInput = document.getElementById('passwordInput').value;

            
            if (passwordInput.length < 8) {
                alert("Password gagal! Harus minimal 8 karakter.");
                return;
            }

            const daftarUser = JSON.parse(localStorage.getItem('semuaUserRAG')) || [];
            const userDitemukan = daftarUser.find(u => u.email === emailInput && u.password === passwordInput);

            if (userDitemukan) {
                alert('Selamat datang, ' + (userDitemukan.name || 'User') + '!');
                localStorage.setItem('isLoggedIn', 'true');
                window.location.href = 'belajar5.html';
            } else {
                alert('Email atau password salah!');
            }
        });
    }

    
    if (cartIcon) {
        // Buat badge
        const badge = document.createElement('span');
        badge.id = 'cart-badge';
        badge.style.cssText = `
            position: absolute; top: -8px; right: -10px; background: #ff4757;
            color: white; font-size: 11px; padding: 2px 6px; border-radius: 50%;
            font-weight: bold; display: ${count > 0 ? 'block' : 'none'};
        `;
        badge.innerText = count;
        cartIcon.parentElement.style.position = 'relative';
        cartIcon.parentElement.appendChild(badge);

        
        const addBtns = document.querySelectorAll('.add-to-cart');
        addBtns.forEach((btn) => {
            btn.addEventListener('click', function() {
                count++;
                localStorage.setItem('cartCount', count);
                badge.innerText = count;
                badge.style.display = 'block';

                // Efek visual tombol
                const originalText = this.innerText;
                this.innerText = '✅ Berhasil';
                this.style.background = '#2ed573';
                setTimeout(() => {
                    this.innerText = originalText;
                    this.style.background = '';
                }, 1000);
            });
        });
    }

    
    if (btnCheckout) {
        btnCheckout.addEventListener('click', function() {
            if (count === 0) {
                alert("Keranjang kamu masih kosong. Yuk belanja dulu!");
            } else {
                const detailPesanan = {
                    item: count + " Produk dari Keranjang",
                    total: "Rp " + (count * 150000).toLocaleString('id-ID')
                };
                localStorage.setItem('pesananTerakhir', JSON.stringify(detailPesanan));
                alert("Menuju halaman pembayaran...");
                window.location.href = 'payment.html';
            }
        });
    }
});


function prosesLoginSosial(email, provider) {
    localStorage.setItem('isLoggedIn', 'true');
    alert(`Berhasil masuk via ${provider}!`);
    window.location.href = 'belajar5.html';
}


function logout() {
    if (confirm("Apakah kamu yakin ingin keluar?")) {
        localStorage.removeItem('isLoggedIn');
        localStorage.setItem('cartCount', '0'); 
        window.location.href = 'index.html';
    }
}


const searchInput = document.querySelector('.search-bar input'); 
if (searchInput) {
    searchInput.addEventListener('keyup', function() {
        const keyword = searchInput.value.toLowerCase();
        const products = document.querySelectorAll('.product-card'); 

        products.forEach(product => {
            const title = product.querySelector('h3').innerText.toLowerCase();
            if (title.includes(keyword)) {
                product.style.display = 'block'; // Tampilkan jika cocok
                product.style.animation = 'fadeIn 0.5s';
            } else {
                product.style.display = 'none'; 
            }
        });
    });
}