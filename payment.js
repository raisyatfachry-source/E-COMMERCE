document.addEventListener('DOMContentLoaded', function() {
    const displayItem = document.getElementById('display-item');
    const displayTotal = document.getElementById('display-total');
    
    console.log("Display Item:", displayItem);
    console.log("Display Total:", displayTotal);
    const btnBayar = document.getElementById('btnBayar'); 
    const methods = document.querySelectorAll('.method-box');
    
    let selectedMethod = "";
    const data = JSON.parse(localStorage.getItem('pesananTerakhir'));

    
    if (data && displayItem && displayTotal) {
        displayItem.innerText = data.item;
        displayTotal.innerText = data.total;
    }

    
    methods.forEach(m => {
        m.addEventListener('click', function() {
            methods.forEach(x => x.classList.remove('selected'));
            this.classList.add('selected');
            
            selectedMethod = this.getAttribute('data-method') || this.innerText;
        });
    });

    
    if (btnBayar) {
        btnBayar.addEventListener('click', function() {
            if (!selectedMethod) {
                alert("Pilih metode pembayaran terlebih dahulu!");
                return;
            }
            
            
            if (data) {
                data.metode = selectedMethod;
                localStorage.setItem('pesananTerakhir', JSON.stringify(data));
            }
            
            alert("Pembayaran Berhasil via " + selectedMethod);
            localStorage.setItem('cartCount', '0'); 
            window.location.href = 'invoice.html'; 
        });
    }
});