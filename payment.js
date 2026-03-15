document.addEventListener("DOMContentLoaded", function () {
  // Ambil data pesanan dari localStorage
  const pesanan = JSON.parse(localStorage.getItem("pesananTerakhir"));

  // Jika tidak ada data pesanan, kembalikan ke halaman belanja
  if (!pesanan) {
    alert("Tidak ada pesanan untuk dibayar. Silakan belanja dulu.");
    window.location.href = "belajar5.html";
    return;
  }

  // Tampilkan detail pesanan di halaman
  document.getElementById("display-item").innerText = pesanan.item;
  document.getElementById("display-total").innerText = pesanan.total;

  const methodBoxes = document.querySelectorAll(".method-box");
  let metodeTerpilih = null;

  // Logika untuk memilih metode pembayaran
  methodBoxes.forEach((box) => {
    box.addEventListener("click", function () {
      // Hapus kelas 'selected' dari semua pilihan
      methodBoxes.forEach((b) => b.classList.remove("selected"));
      // Tambahkan kelas 'selected' pada yang diklik
      this.classList.add("selected");
      metodeTerpilih = this.getAttribute("data-method");
    });
  });

  // Logika untuk tombol "Konfirmasi Bayar"
  document.getElementById("btnBayar").addEventListener("click", function () {
    if (!metodeTerpilih) {
      alert("Silakan pilih metode pembayaran terlebih dahulu.");
      return;
    }

    // Simpan metode yang dipilih dan lanjutkan ke invoice
    pesanan.metode = metodeTerpilih;
    localStorage.setItem("pesananTerakhir", JSON.stringify(pesanan));

    alert("Pembayaran berhasil! Menuju halaman invoice...");
    window.location.href = "invoice.html";
  });
});
