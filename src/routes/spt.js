const express = require('express')

const { body } = require('express-validator')
const router = express.Router();

const sptController = require('../controllers/spt');


// [POST] : /v1/pegawai/insert
router.post('/insert', [
    body('nomor_spt').notEmpty().withMessage("nomor_spt tidak boleh kosong"),
    body('dasar_spt').notEmpty().withMessage("dasar_spt tidak boleh kosong"),
    body('perihal').notEmpty().withMessage("perihal tidak boleh kosong"),
    body('tanggal_mulai').notEmpty().withMessage("tanggal_mulai tidak boleh kosong"),
    body('tanggal_selesai').notEmpty().withMessage("tanggal_selesai tidak boleh kosong"),
    body('lokasi_kegiatan').notEmpty().withMessage("lokasi_kegiatan tidak boleh kosong"),
    body('pegawai_yang_diperintahkan').notEmpty().withMessage("pegawai_yang_diperintahkan tidak boleh kosong"),
    body('tanggal_spt').notEmpty().withMessage("tanggal_spt tidak boleh kosong"),
    body('pejabat_yang_memerintahkan').notEmpty().withMessage("pejabat_yang_memerintahkan tidak boleh kosong"),
    body('tahun').notEmpty().withMessage("tahun tidak boleh kosong"),],
    sptController.insert);


// [PATCH] : /v1/pegawai/edit
router.patch('/update', [
    body('_id').notEmpty().withMessage("Id tidak boleh kosong"),
    body('nomor_spt').notEmpty().withMessage("nomor_spt tidak boleh kosong"),
    body('dasar_spt').notEmpty().withMessage("dasar_spt tidak boleh kosong"),
    body('perihal').notEmpty().withMessage("perihal tidak boleh kosong"),
    body('tanggal_mulai').notEmpty().withMessage("tanggal_mulai tidak boleh kosong"),
    body('tanggal_selesai').notEmpty().withMessage("tanggal_selesai tidak boleh kosong"),
    body('lokasi_kegiatan').notEmpty().withMessage("lokasi_kegiatan tidak boleh kosong"),
    body('pegawai_yang_diperintahkan').notEmpty().withMessage("pegawai_yang_diperintahkan tidak boleh kosong"),
    body('tanggal_spt').notEmpty().withMessage("tanggal_spt tidak boleh kosong"),
    body('pejabat_yang_memerintahkan').notEmpty().withMessage("pejabat_yang_memerintahkan tidak boleh kosong"),
    body('tahun').notEmpty().withMessage("tahun tidak boleh kosong"),],
    sptController.update);

// [GET]: /v1/pegawai/ID
router.get('/:id', sptController.getById)

router.post('/pdf/create', sptController.createPDF)

// [GET]: /v1/pegawai/ID
router.get('/search/:id', sptController.getSearch)

// [DELETE]: /v1/pegawai/ID
router.delete('/:id', sptController.delete)

// [GET]: /v1/pegawai
router.get('/', sptController.getAll)


module.exports = router;