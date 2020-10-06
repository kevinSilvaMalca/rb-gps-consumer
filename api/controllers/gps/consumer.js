const axios = require("axios");
const log = require("utils/logger.js");
const amqp = require("amqplib/callback_api");
const mdb = require("api/database/mdb");
const moment = require('moment');

const conexionRabbit = process.env.IP_RABBIT ? `amqp://admin:admin@${process.env.IP_RABBIT}/` : `amqp://admin:admin@rabbitmq`;

const consumidorgpstkacr = async () => {
    amqp.connect(`${conexionRabbit}`,
        function (err, conn) {
            if (err) {
                console.log(err);
            }
            let q = "queue_gps";
            conn.createChannel(function (err, ch) {
                if (err) { console.log(err); }
                // ch.prefetch(50);
                ch.consume(q, function (msg) {
                    const dataJson = JSON.parse(msg.content.toString());
                    //======================================================
                    ultimaPosicion(dataJson);
                    //=======================================================

                }, {
                    // noAck: false
                    noAck: true
                });
            });
        }
    );

}

const ultimaPosicion = async dataJson => {
    const fechaInicio = moment().format("YYYY-MM-DDTHH:mm:ss");
    console.log(fechaInicio)
    console.log(dataJson)
    // const jsonMongo = {
    //     imei: dataJson.imei,
    //     fechaGps: dataJson.fechaGps,
    //     fechaServidor: dataJson.fechaServidor,
    //     latitud: dataJson.latitud,
    //     longitud: dataJson.longitud,
    //     velocidad: dataJson.velocidad,
    //     codigoGPS: dataJson.codigoGPS,
    //     bloqueo: dataJson.bloqueo
    // }
    // const ultimaFecha = await mdb.GET_LATEST_TIME(dataJson.imei, "tkacr")
    // if (ultimaFecha == null) {
    //     const InsertGps = await mdb.INSERT_ONE({ imei: dataJson.imei, codigoGPS: dataJson.codigoGPS, ...jsonMongo }, "tkacr");
    //     if (!InsertGps) { return "Error MongoDb (TKACR)" }
    //     return 00
    // } else {
    //     const fechaGpsNuevo = moment(dataJson.fechaGps).format("YYYY-MM-DDTHH:mm:ss");
    //     const latitudNuevo = dataJson.latitud;
    //     const longitudNuevo = dataJson.longitud;
    //     const fechaServidorNuevo = moment(dataJson.fechaServidor).format("YYYY-MM-DDTHH:mm:ss");
    //     const fechaGpsUltimo = moment(ultimaFecha.fechaGps).format("YYYY-MM-DDTHH:mm:ss");
    //     const latitudUltimo = ultimaFecha.latitud;
    //     const longiudUltimo = ultimaFecha.longitud;
    //     const fechaServidorUltimo = moment(ultimaFecha.fechaServidor).format("YYYY-MM-DDTHH:mm:ss");
    //     const NuevaFechaGps = moment(fechaGpsNuevo).isAfter(fechaGpsUltimo);
    //     const igualFechaGps = moment(fechaGpsNuevo).isSame(fechaGpsUltimo);


    //     if (NuevaFechaGps) {
    //         await mdb.UPDATE_ONE({ imei: dataJson.imei }, jsonMongo, "tkacr");
    //         return 00
    //     } else {
    //         if (igualFechaGps) {
    //             if (latitudNuevo == latitudUltimo && longitudNuevo == longiudUltimo) {
    //                 const NuevaFechaServidor = moment(fechaServidorNuevo).isAfter(fechaServidorUltimo);
    //                 if (NuevaFechaServidor) {
    //                     await mdb.UPDATE_ONE({ imei: dataJson.imei }, jsonMongo, "tkacr");
    //                     return 00
    //                 } else {
    //                     return 00
    //                 }
    //             } else {
    //                 await mdb.UPDATE_ONE({ imei: dataJson.imei }, jsonMongo, "tkacr");
    //                 return 00
    //             }
    //         } else {
    //             return 00
    //         }
    //     }
    // }
}

module.exports = {
    consumidorgpstkacr
}