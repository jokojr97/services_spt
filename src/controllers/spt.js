const { validationResult } = require('express-validator')
const path = require('path');
const pdf = require('pdf-creator-node')
const fs = require('fs')
const bcrypt = require('bcrypt');

const saltRounds = 10;

const Spt = require('../models/spt');
// const spt = require('../models/spt');

exports.delete = async (req, res, next) => {
    const id = req.params.id || 0;
    if (id == 0) {
        return res.status(400).json({
            message: "invalid value id",
            data: null
        })
        next()
    }

    const data = {
        _id: id
    }

    try {
        const spt = await spt.findOne(data);
        await spt.remove();
        return res.status(200).json({
            message: "Data dengan id= " + id + " berhasil di hapus",
            data: true
        });
    } catch {
        return res.status(404).json({
            message: "data spt not found",
            eror: "not found"
        });
    }

}
exports.update = async (req, res, next) => {
    const errors = validationResult(req);

    const data = {
        _id: req.body._id
    }

    // cek error validasi
    if (!errors.isEmpty()) {
        const err = new Error("invalid value")
        err.errorStatus = 400;
        err.data = errors.array();
        return res.status(err.errorStatus).json({
            message: "Invalid Value!",
            data: err
        })
    }

    await Spt.findOne(data)
        .then(result => {
            // console.log("id: ", id)
            // console.log("result: ", result)

            if (result) {
                const spt = Object.assign(result, req.body);
                spt.save().then(result => {
                    res.status(200).json({
                        message: "Update Data Success",
                        data: result
                    });
                }).catch(err => {
                    console.log("err: ", err);
                    res.status(400).json({
                        message: "invalid value",
                        eror: err
                    });
                });

            } else {
                return res.status(400).json({
                    message: "data not found",
                    data: null,
                })
            }
        })
        .catch(err => {
            return res.status(404).json({
                message: "data with id = '" + err.value + "' not found",
                eror: err
            });
            next();
        })


}
exports.insert = async (req, res, next) => {
    // inisiasi error validasi
    const errors = validationResult(req);

    const data = {
        nomor_spt: req.body.nomor_spt
    }
    //cek email spt sudah terdaftar
    const carispt = await Spt.findOne(data)
    // console.log(carispt)
    if (carispt != null) {
        return res.status(400).json({
            message: "Nomor spt sudah terdaftar! coba pakai Nomor lain",
            data: carispt
        })
        next()
    }

    // cek error validasi
    if (!errors.isEmpty()) {
        const err = new Error("invalid value")
        err.errorStatus = 400;
        err.data = errors.array();
        return res.status(err.errorStatus).json({
            message: "Invalid Value!",
            data: err
        })
        next()
    }

    // definisi input
    const nomor_spt = req.body.nomor_spt;
    const pejabat_yang_memerintahkan = req.body.pejabat_yang_memerintahkan;
    const pegawai_yang_diperintahkan = req.body.pegawai_yang_diperintahkan;
    const perihal = req.body.perihal;
    const dasar_spt = req.body.dasar_spt;
    const lokasi_kegiatan = req.body.lokasi_kegiatan;
    const tanggal_mulai = req.body.tanggal_mulai;
    const tanggal_spt = req.body.tanggal_spt;
    const tanggal_selesai = req.body.tanggal_selesai;
    const tahun = req.body.tahun;

    const insertspt = new Spt({
        nomor_spt: nomor_spt,
        pejabat_yang_memerintahkan: pejabat_yang_memerintahkan,
        pegawai_yang_diperintahkan: pegawai_yang_diperintahkan,
        perihal: perihal,
        dasar_spt: dasar_spt,
        lokasi_kegiatan: lokasi_kegiatan,
        tanggal_mulai: tanggal_mulai,
        tanggal_spt: tanggal_spt,
        tanggal_selesai: tanggal_selesai,
        tahun: tahun,
        operator: {
            id: 1,
            name: "Jo",
            level: "admin"
        },
    });

    insertspt.save()
        .then(result => {
            res.status(201).json({
                message: "Input spt Success",
                data: result
            });
        }).catch(err => {
            console.log("err: ", err);
            res.status(400).json({
                message: "invalid value",
                eror: err
            });
        });
}

exports.getAll = (req, res, next) => {
    const currentPage = req.query.page || 1;
    const perPage = req.query.perPage || 5;
    let totalItem;
    const currentPageInt = parseInt(currentPage);
    const perPageInt = parseInt(perPage);

    Spt.find().countDocuments()
        .then(count => {
            totalItem = count;
            return Spt.find().skip((currentPageInt - 1) * perPageInt).limit(perPageInt)
        })
        .then(result => {
            if (totalItem == 0) {
                res.status(400).json({
                    message: "Data masih kosong",
                    data: result,
                })
            } else {
                res.status(200).json({
                    message: "Data berhasil ditampilkan",
                    data: result,
                    total_data: totalItem,
                    current_page: currentPageInt,
                    per_page: perPageInt
                })
            }
        })
        .catch(err => {
            return res.status(400).json({
                message: "invalid value",
                eror: err
            });
            next();
        })
}

exports.getById = async (req, res, next) => {
    const id = req.params.id || 0;
    if (id == 0) {
        return res.status(400).json({
            message: "invalid value id",
            data: null
        })
        next()
    }

    const data = {
        _id: id
    }
    await Spt.findOne(data)
        .then(result => {
            // console.log("id: ", id)
            // console.log("result: ", result)
            if (result) {
                return res.status(200).json({
                    message: "Data berhasil ditampilkan",
                    data: result,
                })
            } else {
                return res.status(400).json({
                    message: "data not found",
                    data: null,
                })
            }
        })
        .catch(err => {
            return res.status(404).json({
                message: "data with id = '" + err.value + "' not found",
                eror: err
            });
            next();
        })

}

exports.getSearch = async (req, res, next) => {
    const id = req.params.id || 0;
    if (id == 0) {
        return res.status(400).json({
            message: "invalid value id",
            data: null
        })
        next()
    }

    const data = {
        _id: id
    }
    await Spt.findOne(data)
        .then(result => {
            // console.log("id: ", id)
            // console.log("result: ", result)
            if (result) {
                return res.status(200).json({
                    message: "Data berhasil ditampilkan",
                    data: result,
                })
            } else {
                return res.status(400).json({
                    message: "data not found",
                    data: null,
                })
            }
        })
        .catch(err => {
            return res.status(404).json({
                message: "data with id = '" + err.value + "' not found",
                eror: err
            });
            next();
        })

}

const setPenerimaPerintah = (data) => {
    data.map((v, i) => {
        return v
    })
}

const settext = (e) => {
    if (e == 1) {
        return "satu"
    } else if (e == 2) {
        return "dua"
    } else if (e == 3) {
        return "tiga"
    } else if (e == 4) {
        return "empat"
    } else if (e == 5) {
        return "lima"
    }
}

exports.createPDF = async (req, res, next) => {

    const html = fs.readFileSync('./index.html', 'utf-8')
    const options = {
        format: "A4",
        orientation: "portrait",
    };

    const pegawai = req.body.pegawai_yang_diperintahkan
    // const settextLamaPerjalanan = settext(req.body.lama_perjalanan)
    // console.log("data", pegawai)
    // console.log("data lenght", pegawai.length)
    var datapegawai = []
    pegawai.map((v, i) => {
        if (i < 1) {
            datapegawai = v
        }
    })

    const datainput = [
        {
            nomor_spt: req.body.nomor_spt,
            pejabat_yang_memerintahkan: {
                name: req.body.pejabat_yang_memerintahkan.name,
                jabatan: req.body.pejabat_yang_memerintahkan.jabatan,
                pangkat: req.body.pejabat_yang_memerintahkan.pangkat,
                nip: req.body.pejabat_yang_memerintahkan.nip,
                golongan: req.body.pejabat_yang_memerintahkan.golongan
            },
            pegawai_yang_diperintahkan: [
                {
                    name: datapegawai.name,
                    jabatan: datapegawai.jabatan,
                    pangkat: datapegawai.pangkat,
                    nip: datapegawai.nip,
                    golongan: datapegawai.golongan
                }
            ],
            perihal: req.body.perihal,
            dasar_spt: req.body.dasar_spt,
            tanggal_mulai: req.body.tanggal_mulai,
            tanggal_spt: req.body.tanggal_spt,
            lokasi_kegiatan: req.body.lokasi_kegiatan,
            tanggal_selesai: req.body.tanggal_selesai,
            tahun: req.body.tahun,
        }
    ];
    const document = {
        html: html,
        data: {
            data: datainput,
        },
        path: `./pdf/spt_${req.body.nomor_spt}.pdf`,
        type: "",
    };

    pdf.create(document, options)
        .then((result) => {
            console.log(result);
            return res.status(200).json({
                message: "pdf berhasil dibuat",
                data: result,
                pegawai: datapegawai
            });
        })
        .catch((error) => {
            console.error(error);
            return res.status(404).json({
                message: "data with id = '" + error.value + "' not found",
                eror: error
            });
            next();
        });

}