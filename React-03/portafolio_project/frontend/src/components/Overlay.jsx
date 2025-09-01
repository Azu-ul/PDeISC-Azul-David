import React from "react";

export default function Overlay({ 
    show, 
    type = 'success', 
    title, 
    message, 
    onClose,
    onConfirm,
    onCancel,
    confirmText = 'Confirmar',
    cancelText = 'Cancelar'
}) {
    if (!show) return null;

    const getTypeConfig = () => {
        switch(type) {
            case 'success':
                return {
                    headerClass: 'bg-success',
                    icon: 'fa-check-circle',
                    buttonClass: 'btn-success',
                    defaultTitle: 'Éxito'
                };
            case 'error':
                return {
                    headerClass: 'bg-danger',
                    icon: 'fa-times-circle',
                    buttonClass: 'btn-danger',
                    defaultTitle: 'Error'
                };
            case 'warning':
                return {
                    headerClass: 'bg-warning text-dark',
                    icon: 'fa-exclamation-triangle',
                    buttonClass: 'btn-warning',
                    defaultTitle: 'Advertencia'
                };
            case 'confirm':
                return {
                    headerClass: 'bg-primary',
                    icon: 'fa-question-circle',
                    buttonClass: 'btn-primary',
                    defaultTitle: 'Confirmación'
                };
            default:
                return {
                    headerClass: 'bg-primary',
                    icon: 'fa-info-circle',
                    buttonClass: 'btn-primary',
                    defaultTitle: 'Información'
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
                        {title || config.defaultTitle}
                    </h5>
                </div>
                <div className="card-body text-center p-4">
                    <p className="mb-4">{message}</p>
                    
                    {type === 'confirm' ? (
                        <div className="d-flex gap-2 justify-content-center">
                            <button 
                                onClick={onConfirm}
                                className="btn btn-danger px-4 py-2 rounded-pill fw-semibold"
                            >
                                <i className="fas fa-check me-2"></i>
                                {confirmText}
                            </button>
                            <button 
                                onClick={onCancel}
                                className="btn btn-secondary px-4 py-2 rounded-pill fw-semibold"
                            >
                                <i className="fas fa-times me-2"></i>
                                {cancelText}
                            </button>
                        </div>
                    ) : (
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