var informacionDeLAZona = {}
const zonaValor = ()=>document.querySelector('#zonaDeViaje')
const directionValor = ()=>document.querySelector('#direccionDeViaje')
const passengers = ()=>document.querySelector('#passengers')
const nombreDeZonasArray = []
const precioOneWayArray = []
const precioRoundTripArray = []
var precios = []

// variables de todos los dom que se usaran para enviar los datos
const soloIda = () => document.querySelector('#soloIda').checked

// variables de todos los dom que se usaran para enviar los datos

// Buscar las zonas y precios
fetch('/datos.json').then(async res=>{
    const data = await res.json()
    informacionDeLAZona = await data
    informacionDeLAZona.zona1.zona.map(item => {
        directionValor().innerHTML += `<option value="${item}">--- ${item} ---</option>`
    });
    actualizarArray()
})
function actualizarArray(){
    nombreDeZonasArray.push(informacionDeLAZona.zona1.zona)
    nombreDeZonasArray.push(informacionDeLAZona.zona2.zona)
    nombreDeZonasArray.push(informacionDeLAZona.zona3.zona)
    nombreDeZonasArray.push(informacionDeLAZona.zona4.zona)
    precioOneWayArray.push(informacionDeLAZona.zona1.precio_one_way)
    precioOneWayArray.push(informacionDeLAZona.zona2.precio_one_way)
    precioOneWayArray.push(informacionDeLAZona.zona3.precio_one_way)
    precioOneWayArray.push(informacionDeLAZona.zona4.precio_one_way)
    precioRoundTripArray.push(informacionDeLAZona.zona1.price_round_trip)
    precioRoundTripArray.push(informacionDeLAZona.zona2.price_round_trip)
    precioRoundTripArray.push(informacionDeLAZona.zona3.price_round_trip)
    precioRoundTripArray.push(informacionDeLAZona.zona4.price_round_trip)
}

function cambiarZona(){
    directionValor().innerHTML = `<option value="" disabled="disabled" selected="selected">--- Direction ---</option>`
    nombreDeZonasArray[zonaValor().value-1].map(item=>{
        directionValor().innerHTML += `<option value="${item}">--- ${item} ---</option>`
    })
    document.querySelector('.amountAll').textContent = `$${precios[zonaValor().value-1]}.00`
}


//limites a la fecha
const fechaDelDia = new Date()        
const fechaDelDiaEdit = fechaDelDia.getFullYear()+"-"+((fechaDelDia.getMonth()+1)+"".length===1?"0"+(fechaDelDia.getMonth()+1):fechaDelDia.getMonth()+1)+"-"+(fechaDelDia.getDate()+"".length ===1?"0"+fechaDelDia.getDate():fechaDelDia.getDate())
window.addEventListener('load',function(){
    document.querySelector('#fecha_reserva').min = fechaDelDiaEdit
})
//checked
document.querySelector('#soloIda').addEventListener('change',function(){
    document.getElementsByClassName('reserva_ID')[0].classList.toggle('active')
    document.getElementsByClassName('reserva_ID')[1].classList.toggle('active')

})
document.querySelector('#idaMasVuelta').addEventListener('change',function(){
    document.getElementsByClassName('reserva_ID')[0].classList.toggle('active')
    document.getElementsByClassName('reserva_ID')[1].classList.toggle('active')
})
document.querySelector('#from__airIda').addEventListener('change',function(){
    document.getElementsByClassName('reserva_From_ID')[0].classList.toggle('active')
    document.getElementsByClassName('reserva_From_ID')[1].classList.toggle('active')

})
document.querySelector('#from__air_Vuelta').addEventListener('change',function(){
    document.getElementsByClassName('reserva_From_ID')[0].classList.toggle('active')
    document.getElementsByClassName('reserva_From_ID')[1].classList.toggle('active')
})
// limites a la fechas de reservas
//variables necesarias

const objDatos = {}




//valores de reservar y manejos del dom de reserva
const BotonAtras = document.querySelector('.reservacion__botones__back')
const BotonSiguiente = document.querySelector('.reservacion__botones__next')
var cambioDeNumeroDeReserva = 1;

function cambioDeNumeroA_UN_Mas(){
    cambioDeNumeroDeReserva++
    objDatos.amount = (precios[zonaValor().value-1])*Number(passengers().value)
    soloIda()?precios = precioOneWayArray:precios = precioRoundTripArray;
    document.querySelector('.amountAll').textContent = `$${(precios[zonaValor().value-1])}.00`
    document.querySelector('.amountAll-1').textContent = `$${objDatos.amount}.00`

    switch(cambioDeNumeroDeReserva){
        case 1:{
            document.getElementsByClassName('reservacion__paginado')[0].classList.toggle('active')
            document.getElementsByClassName('reservacion__paginado')[1].classList.toggle('active')
            break;
        }
        case 2:{
            
            BotonAtras.classList.toggle('active')
            document.getElementsByClassName('reservacion__paginado')[1].classList.toggle('active')
            document.getElementsByClassName('reservacion__paginado')[0].classList.toggle('active')
            break;
            
        }
        case 3: {
            document.getElementsByClassName('reservacion__paginado')[2].classList.toggle('active')
            document.getElementsByClassName('reservacion__paginado')[1].classList.toggle('active')
            break;
            
        }
        case 4: {
            const nombre = document.querySelector('#nombre')
            const email = document.querySelector('#email')
            const numero = document.querySelector('#numero')

            if(nombre.value && email.value && numero.value){
                document.getElementsByClassName('reservacion__paginado')[2].classList.toggle('active')
                document.getElementsByClassName('reservacion__paginado')[3].classList.toggle('active')
                break;
            }else{
                if(!nombre.value){
                    nombre.style.border = "2px solid #f00"
                }else{
                    nombre.style.border = "2px solid var(--color-1)"
                }
                if(!email.value){
                    email.style.border = "2px solid #f00"   
                }
                else{
                    email.style.border = "2px solid var(--color-1)"
                }
                if(!numero.value){
                    numero.style.border = "2px solid #f00"
                }
                else{
                    numero.style.border = "2px solid var(--color-1)"
                }
                cambioDeNumeroDeReserva--
                break;
            }
        }
        case 5: {
            const arrivalAirlineName = document.querySelector('#arrivalAirlineName')
            const arrivalFlightNumber = document.querySelector('#arrivalFlightNumber')
            const fecha_reserva = document.querySelector('#fecha_reserva')
            const time_reserva = document.querySelector('#time_reserva')

            if(arrivalAirlineName.value && arrivalFlightNumber.value && fecha_reserva.value && time_reserva.value){
                document.getElementsByClassName('reservacion__paginado')[3].classList.toggle('active')
                document.getElementsByClassName('reservacion__paginado')[4].classList.toggle('active')
                BotonSiguiente.classList.toggle('active')
                break;
            }else{
                if(!arrivalAirlineName.value){
                    arrivalAirlineName.style.border = "2px solid #f00"
                }
                else{
                    arrivalAirlineName.style.border = "2px solid var(--color-1)"
                }
                if(!arrivalFlightNumber.value){
                    arrivalFlightNumber.style.border = "2px solid #f00"   
                }else{
                    arrivalFlightNumber.style.border = "2px solid var(--color-1)"
                }
                if(!fecha_reserva.value){
                    fecha_reserva.style.border = "2px solid #f00"
                }else{
                    fecha_reserva.style.border = "2px solid var(--color-1)"
                }
                if(!time_reserva.value){
                    time_reserva.style.border = "2px solid #f00"
                }else{
                    time_reserva.style.border = "2px solid var(--color-1)"
                }
                cambioDeNumeroDeReserva--
                break;
            }
        }
    }

    document.getElementById('pasoID').innerHTML=`Step ${cambioDeNumeroDeReserva}/5`
}

function cambioDeNumeroA_UN_Menos(){
    cambioDeNumeroDeReserva--
    soloIda?precios = precioOneWayArray:precios = precioRoundTripArray;
    document.querySelector('.amountAll').textContent = `$${precios[zonaValor().value-1]}.00`
    document.querySelector('.amountAll-1').textContent = `$${objDatos.amount}.00`
    switch(cambioDeNumeroDeReserva){
        case 1:{
            BotonAtras.classList.toggle('active')
            document.getElementsByClassName('reservacion__paginado')[0].classList.toggle('active')
            document.getElementsByClassName('reservacion__paginado')[1].classList.toggle('active')
            break;
        }
        case 2:{
            document.getElementsByClassName('reservacion__paginado')[1].classList.toggle('active')
            document.getElementsByClassName('reservacion__paginado')[2].classList.toggle('active')
            break;
        }
        case 3: {
            document.getElementsByClassName('reservacion__paginado')[2].classList.toggle('active')
            document.getElementsByClassName('reservacion__paginado')[3].classList.toggle('active')
            break;
        }
        case 4: {
            document.getElementsByClassName('reservacion__paginado')[3].classList.toggle('active')
            document.getElementsByClassName('reservacion__paginado')[4].classList.toggle('active')
            BotonSiguiente.classList.toggle('active')
            break;
        }
        case 5: {
            document.getElementsByClassName('reservacion__paginado')[3].classList.toggle('active')
            document.getElementsByClassName('reservacion__paginado')[4].classList.toggle('active')
            break;
        }
    }
    document.getElementById('pasoID').textContent=`Step ${cambioDeNumeroDeReserva}/5`
}


