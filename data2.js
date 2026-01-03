const selectAtasan = document.getElementById('atasan');
const selectBawahan = document.getElementById('bawahan');
const textPreview = document.getElementById('hasil-preview');
const btnPesan = document.getElementById('btnPesan');

function updatePreview() {
    const atasan = selectAtasan.value;
    const bawahan = selectBawahan.value;
    textPreview.innerHTML = `Style: <strong>${atasan}</strong> + <strong>${bawahan}</strong>`;
}


selectAtasan.addEventListener('change', updatePreview);
selectBawahan.addEventListener('change', updatePreview);


btnPesan.addEventListener('click', function() {
    const detailPesanan = {
        item: `${selectAtasan.value} & ${selectBawahan.value}`,
        total: "Rp 550.000"
    };
    localStorage.setItem('pesananTerakhir', JSON.stringify(detailPesanan));
    window.location.href = '../HTML/payment.html';
});


updatePreview();