import React from "react";

export default function Overlay({ 
    show, 
    type = 'success', 
    title, 
    message, 
    confirmText = 'Confirmar', 
    cancelText = 'Cancelar', 
    onClose, 
    onConfirm, 
    onCancel 
}) {
    if (!show) return null;

    const isConfirm = type === 'confirm';
    
    // Configuración de iconos y colores según el tipo
    const getTypeConfig = () => {
        switch(type) {
            case 'success':
                return {
                    headerClass: 'bg-success',
                    icon: 'fa-check-circle',
                    buttonClass: 'btn-success'
                };
            case 'error':
                return {
                    headerClass: 'bg-danger',
                    icon: 'fa-times-circle',
                    buttonClass: 'btn-danger'
                };
            case 'warning':
            case 'confirm':
                return {
                    headerClass: 'bg-warning text-dark',
                    icon: 'fa-exclamation-triangle',
                    buttonClass: 'btn-warning'
                };
            default:
                return {
                    headerClass: 'bg-primary',
                    icon: 'fa-info-circle',
                    buttonClass: 'btn-primary'
                };
        }
    };

    const config = getTypeConfig();

    return (
        <div 
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999 }}
        >
            <div className="card shadow-lg border-0" style={{ minWidth: '300px', maxWidth: '500px' }}>
                <div className={`card-header text-white text-center py-3 ${config.headerClass}`}>
                    <h5 className="mb-0">
                        <i className={`fas ${config.icon} me-2`}></i>
                        {title}
                    </h5>
                </div>
                <div className="card-body text-center p-4">
                    <p className="mb-4">{message}</p>
                    
                    {isConfirm ? (
                        // Botones para confirmación
                        <div className="d-flex gap-3 justify-content-center">
                            <button 
                                onClick={onCancel}
                                className="btn btn-outline-secondary px-4 py-2 rounded-pill fw-semibold"
                            >
                                <i className="fas fa-times me-2"></i>
                                {cancelText}
                            </button>
                            <button 
                                onClick={onConfirm}
                                className="btn btn-danger px-4 py-2 rounded-pill fw-semibold"
                            >
                                <i className="fas fa-trash me-2"></i>
                                {confirmText}
                            </button>
                        </div>
                    ) : (
                        // Botón simple para cerrar
                        <button 
                            onClick={onClose}
                            className={`btn ${config.buttonClass} px-4 py-2 rounded-pill fw-semibold`}
                        >
                            <i className="fas fa-times me-2"></i>
                            Cerrar
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}