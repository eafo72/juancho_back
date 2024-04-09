const express = require('express')
const app = express.Router()
const fetch = require("node-fetch");

const enviatoken = process.env.ENVIATOKEN;

app.post('/cotizar', async (req, res) => {

    const { peso,ancho,largo,alto } = req.body 

    const data =  {
        "origin": {
            "name": "Rafael",
            "company": "DIPROQYN",
            "email": "contacto@diproqyn.com",
            "phone": "5556420158",
            "street": "Plan de Ayala",
            "number": "Mza 57 lte 19",
            "district": "other",
            "city": "Ciudad de México",
            "state": "CX",
            "country": "MX",
            "postalCode": "09570",
            "reference": "",
            "coordinates": {
                "latitude": "19.369811",
                "longitude": "-99.007137"
            }
        },
        "destination": {
            "name": "Tulio",
            "company": "",
            "email": "",
            "phone": "5585989082",
            "street": "Rebsamen",
            "number": "333",
            "district": "other",
            "city": "Ciudad de México",
            "state": "CX",
            "country": "MX",
            "postalCode": "03020",
            "reference": "",
            "coordinates": {
                "latitude": "19.393748",
                "longitude": "-99.158869"
            }
        },
        "packages": [
            {
                "content": "zapatos",
                "amount": 1,
                "type": "box",
                "weight": peso,
                "insurance": 0,
                "declaredValue": 0,
                "weightUnit": "KG",
                "lengthUnit": "CM",
                "dimensions": {
                    "length": largo,
                    "width": ancho,
                    "height": alto
                }
            }
        ],
        "shipment": {
            "carrier": "fedex",
            "type": 0
        },
        "settings": {
            "currency": "MXN"
        }
    }


	
    try {
        let response = await fetch(`https://api.envia.com/ship/rate/`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + enviatoken
              },
        });

        let result = await response.json();
        res.json({ result });
    
      } catch (error) {
        res.status(500).json({ msg: 'Hubo un error obteniendo los datos' })
      }
});


module.exports = app 