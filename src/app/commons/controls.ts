export function tooglePasswordVisibility(object: any) 
{
    const passwordInput = document.getElementById('i_password') as HTMLInputElement;
    if(passwordInput.type === 'password') 
    {
        passwordInput.type = 'text';
    }
    else 
    {
        passwordInput.type = 'password';
    } 
}

export function calcularMinutosTranscurridos(fechaInicial: Date): number 
{
    const ahora = new Date();
    const diferenciaMilisegundos = ahora.getTime() - fechaInicial.getTime();
    const diferenciaMinutos = diferenciaMilisegundos / (1000 * 60);
    return Math.floor(diferenciaMinutos);
}

export function calcularHorasTranscurridas(fechaReferencia: Date): number 
{
    const ahora = new Date();
    const diferenciaMilisegundos = ahora.getTime() - fechaReferencia.getTime();
    const horas = diferenciaMilisegundos / (1000 * 60 * 60);
    return Math.floor(horas);
}

export function calcularDiasTranscurridos(fechaReferencia: Date): number 
{
    const ahora = new Date();
    const diferenciaMilisegundos = ahora.getTime() - fechaReferencia.getTime();
    const dias = diferenciaMilisegundos / (1000 * 60 * 60 * 24);
    return Math.floor(dias);
}

export function convertTimeToLocal(time: string): string 
{
    const date = new Date(time);
    return date.toLocaleString();
}

export function getAlarmTypeText(type: string): string {
    switch(type.toLowerCase())
        {
            case 'sos':
                return 'Llamado SOS';
            case 'powercut':
                return 'GPS Desconectado';
            case 'jamming':
                return 'Interferencia';
            case 'ignitionoff':
                return 'Apagado';
            case 'ignitionon':
                return 'Encendido';
            case 'overspeed':
                return 'Exceso de velocidad';
            case 'accident':
                return 'Accidente';
            case 'low_battery':
                return 'Batería baja';
            case 'low_fuel':
                return 'Combustible bajo';
            case 'door_open':
                return 'Puerta abierta';
            case 'door_closed':
                return 'Puerta cerrada';
            case 'vehicle_moving':
                return 'Vehículo en movimiento';
            case 'vehicle_stopped':
                return 'Vehículo detenido';
            case 'vehicle_parked':
                return 'Vehículo estacionado';
            case 'vehicle_accelerating':
                return 'Vehículo acelerando';
            case 'vehicle_decelerating':
                return 'Vehículo desacelerando';
            case 'hardbraking':
                return 'Frenado brusco';
                

            default:
                return type;
        }
}