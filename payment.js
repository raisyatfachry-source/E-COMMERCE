const displayItem = document.getElementById('display-item');
const displayTotal = document.getElementById('display-total');
const methodBoxes = document.querySelectorAll('.method-box');
const btnBayar = document.getElementById('btnBayar');

let metodeDipilih = "";


const pesanan = JSON.parse(localStorage.getItem('pesananTerakhir'));
if (pesanan) {
    displayItem.innerText = pesanan.item;
    displayTotal.innerText = pesanan.total;
}


methodBoxes.forEach(box => {
    box.addEventListener('click', function() {
        methodBoxes.forEach(b => b.classList.remove('selected'));
        this.classList.add('selected');
        metodeDipilih = this.getAttribute('data-method');
    });
});

btnBayar.addEventListener('click', function() {
    if (!metodeDipilih) return alert("Pilih metode pembayaran!");
    alert("Sukses! Bayar via " + metodeDipilih);
    localStorage.removeItem('pesananTerakhir'); // Hapus pesanan setelah bayar
    window.location.href = 'belajar5.html'; // Kembali ke Home
});