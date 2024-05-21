new Vue({
    el: '#app',
    data: {
        invoice: {
            noNota: '',
            pelanggan: '',
            tanggal: ''
        },
        items: [
            { id: 'ID-1', nama: 'Kue Tart', harga: 25000 },
            { id: 'ID-2', nama: 'Kue Nastar', harga:  45000},
            { id: 'ID-3', nama: 'Kue Kering', harga: 45000 },
            { id: 'ID-4', nama: 'Pie Buah', harga: 55000 },
            { id: 'ID-5', nama: 'Kue Pukis', harga: 20000 }
        ],
        newProduct: {
            kodeBarang: '',
            namaBarang: '',
            quantity: 1,
            hargaSatuan: 0,
            jumlah: 0
        },
        products: [],
        discountPercent: 0,
        bayar: 0
    },
    computed: {
        subTotal() {
            return this.products.reduce((sum, product) => sum + product.jumlah, 0);
        },
        discountAmount() {
            return (this.subTotal * this.discountPercent) / 100;
        },
        totalHarga() {
            return this.subTotal - this.discountAmount;
        },
        totalPayment() {
            return this.totalHarga;
        },
        kembalian() {
            return this.bayar - this.totalHarga;
        }
    },
    methods: {
        updateProductDetails() {
            const selectedItem = this.items.find(item => item.id === this.newProduct.kodeBarang);
            if (selectedItem) {
                this.newProduct.namaBarang = selectedItem.nama;
                this.newProduct.hargaSatuan = selectedItem.harga;
                this.newProduct.jumlah = selectedItem.harga * this.newProduct.quantity;
            }
        },
        addProduct() {
            const selectedItem = this.items.find(item => item.id === this.newProduct.kodeBarang);
            if (selectedItem) {
                this.newProduct.namaBarang = selectedItem.nama;
                this.newProduct.hargaSatuan = selectedItem.harga;
                this.newProduct.jumlah = selectedItem.harga * this.newProduct.quantity;
                this.products.push({ ...this.newProduct });
                this.newProduct = { kodeBarang: '', namaBarang: '', quantity: 1, hargaSatuan: 0, jumlah: 0 };
            }
        },
        removeProduct(index) {
            this.products.splice(index, 1);
        },
        completeTransaction() {
            alert('Transaksi selesai, Selamat Datang Kembali, Terima Kasih!');
            // Reset data
            this.products = [];
            this.discountPercent = 0;
            this.bayar = 0;
        },
        openCalendar() {
            this.$refs.tanggal._flatpickr.open();
        }
    },
    mounted() {
        flatpickr(this.$refs.tanggal, {
            dateFormat: 'd/m/Y',
            onChange: (selectedDates, dateStr) => {
                this.invoice.tanggal = dateStr;
            }
        });
    }
});