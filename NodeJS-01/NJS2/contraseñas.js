export function generarContraseña(longitud = 12) {
    const letras = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numeros = "0123456789";
    const simbolos = "!@#$%^&*()_+-=[]{}|;:,.<>?";
  
    // concatenamos todos los caracteres posibles
    const caracteres = letras + numeros + simbolos;
  
    let contraseña = '';
    for (let i = 0; i < longitud; i++) {
      const indice = Math.floor(Math.random() * caracteres.length);
      contraseña += caracteres[indice];
    }
  
    return contraseña;
  }
  