import express from 'express'
import PDFDocument from 'pdfkit' // for pdf generation
import { Donation } from '../models/Donationmodel.js'

// create empty router
const router = express.Router()


// GET the report
router.get('/', async (req, res) => {
    try {
        // get all donations
        const donations = await Donation.find();

        // create a new pdf document
        const doc = new PDFDocument();
        let buffers = [];

        // configure pdf and response object
        doc.on('data', buffers.push.bind(buffers))
        doc.on('end', () => {
            let pdfData = Buffer.concat(buffers)
            res.writeHead(200, {
                'Content-Length': Buffer.byteLength(pdfData),
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment;filename=report.pdf'
            }).end(pdfData)
        })

        // add content (donations) to the pdf
        doc.fontSize(20).text('Acme Food Bank Inventory Report', { align: 'center' })
        doc.moveDown()
        donations.forEach((donation, index) => {
            doc.fontSize(12).text((index + 1) + '. ' + donation.food + ' - Expiration Date: ' + donation.date)
            doc.moveDown()
        })

        doc.end()
    }
    catch (error) {
        // return error if it occurs
        res.status(400).json({error: error.message})
    }
})


// export router to be used in server.js
export default router