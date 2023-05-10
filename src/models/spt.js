const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Spt = new Schema({
    nomor_spt: {
        type: String,
        require: true
    },
    dasar_spt: {
        type: String,
        require: true
    },
    perihal: {
        type: String,
        require: true
    },
    tanggal_mulai: {
        type: Date,
        require: true
    },
    tanggal_selesai: {
        type: Date,
        require: true
    },
    lokasi_kegiatan: {
        type: String,
        require: true
    },
    pegawai_yang_diperintahkan: {
        type: Object,
        require: true
    },
    tanggal_spt: {
        type: String,
        require: true
    },
    pejabat_yang_memerintahkan: {
        type: Object,
        require: true
    },
    tahun: {
        type: Number,
        require: true
    },
    operator: {
        type: Object,
        require: true
    },
    file: {
        type: String,
        require: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Spt', Spt)