/**
 * Archivo de Configuración Central.
 * Aquí se definen las variables globales que controlan el comportamiento de la aplicación.
 */

/**
 * Controla el modo de operación de la aplicación.
 * 
 * - `true`: Modo Demo/Prueba.
 *   - La autenticación de Firebase se SIMULA con un usuario de prueba.
 *   - Se muestra una insignia "DEMO" en la interfaz.
 *   - Permite probar la funcionalidad de la base de datos SIN necesidad de configurar el login de Google.
 * 
 * - `false`: Modo Conectado/Real.
 *   - Se utiliza la autenticación REAL de Firebase con Google.
 *   - La insignia "DEMO" se oculta.
 *   - Requiere que la pantalla de consentimiento de OAuth esté configurada en Google Cloud.
 */
export const IS_DEMO_MODE = true;
