
document.querySelector(".btnPagoEfectivo").addEventListener('click',(e) =>{
    e.preventDefault()
    document.querySelector('.reservaciones-1').innerHTML = `
        <div class="reservaciones p-5 mt-5">
            <div class="reservacion__paginado active">
                <h2 class="text-success mb-3 text-lg-center">Reserva obteniada</h2>
                <p class="text-center"></p>
            </div>
        </div>`
    objDatos.pago = "Pay on Arrival (CASH ONLY)"
    //main(false)
})
function main(obj) {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // use TLS
        //FreeMail
        //wihetkheeqvhytza
        auth: {
          user: "loremplayofficial@gmail.com",
          pass: "wihetkheeqvhytza",
        }
      });
    let message = {
      from: "loremplayofficial@gmail.com",
      ...obj
    };
    // send mail with defined transport object
    transporter.sendMail(message, (err, info)=>err?console.log(err):console.log(info));
}

const datos = (idPago)=>{
    objDatos.nombre = document.querySelector('#nombre').value
    objDatos.email = document.querySelector('#email').value
    objDatos.numero = document.querySelector('#numero').value
    objDatos.resort = document.querySelector('#direccionDeViaje').value
    objDatos.passengers = document.querySelector('#passengers').value
    objDatos.oneWay = document.querySelector('#soloIda').checked === "true"?"One Way":"Round Trip"
    objDatos.from__airIda = document.querySelector('#from__airIda').checked === "true"?"From Airport(SJD) to Resort":"From Resort to Airport(SJD)"
    objDatos.arrivalAirlineName = document.querySelector('#arrivalAirlineName').value
    objDatos.arrivalFlightNumber = document.querySelector('#arrivalAirlineName').value
    objDatos.fecha_reserva = document.querySelector('#fecha_reserva').value
    objDatos.time_reserva = document.querySelector('#time_reserva').value
    const obj = {
        
        //editar gmail
        to: "jvrbanquez@gmail.com",
        subject: "Nueva reservacion",
        text: `Nueva reservacion Datos\n`,
        html: `<h2>Nueva reservacion Datos</h2>
            <h3>Nombre Completo: ${objDatos.nombre}</h3>
            <h3>Email: ${objDatos.email}</h3>
            <h3>Numero de telefono: ${objDatos.numero}</h3>
            <h3>Resort: ${objDatos.resort}</h3>
            <h3>Passengers: ${objDatos.passengers}</h3>
            <h3>Arrival Airline Name: ${objDatos.arrivalAirlineName}</h3>
            <h3>Arrival Flight Number: ${objDatos.arrivalFlightNumber}</h3>
            <h3>Fecha a Reservar: ${objDatos.fecha_reserva}</h3>
            <h3>Tiempo en hora de la Reserva: ${objDatos.time_reserva}</h3>
            <h3>Metodo de pago: ${objDatos.pago}</h3>
        `
    }
    idPago?obj.html+=`<h3>ID de pago: ${idPago}</h3>`:""
    main(obj)
}

// Pago con paypal
paypal.Buttons({
    style:{
        color: 'blue',
        shape: 'pill',
        label:'pay'
    },
    createOrder:function(data,actions){
        return actions.order.create({
            purchase_units:[{
                amount: {
                    value: objDatos.amount
                }
            }],
        })
    },
    onApprove:function(data,actions){
    actions.order.capture().then(function(detalles){
        document.querySelector('.reservaciones-1').innerHTML = `
        <div class="reservaciones p-5 mt-5">
            <div class="reservacion__paginado active">
                <h2 class="text-success mb-3">Reserva obteniada</h2>
                <p class="text-center">Pago Realizado</p>
                <p class="text-center">ID del pago: ${detalles.id}</p>
            </div>
        </div>`
        //datos(detalles.id)
    });
    }
    ,onCancel: function(data){
        alert("pago cancelado intente nuevamente")
        console.log(data)
    }
}).render('#paypal__pago')