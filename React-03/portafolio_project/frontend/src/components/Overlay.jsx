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
                    borderColor: '#28a745',
                    titleColor: '#28a745',
                    defaultTitle: 'Éxito'
                };
            case 'error':
                return {
                    borderColor: '#dc3545',
                    titleColor: '#dc3545',
                    defaultTitle: 'Error'
                };
            case 'warning':
                return {
                    borderColor: '#ffc107',
                    titleColor: '#856404',
                    defaultTitle: 'Advertencia'
                };
            case 'confirm':
                return {
                    borderColor: '#333',
                    titleColor: '#333',
                    defaultTitle: 'Confirmación'
                };
            default:
                return {
                    borderColor: '#333',
                    titleColor: '#333',
                    defaultTitle: 'Información'
                };
        }
    };

    const config = getTypeConfig();

    return (
        <div 
            style={{ 
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(248, 249, 250, 0.95)',
                zIndex: 9999,
                fontFamily: 'Georgia, serif'
            }}
        >
            <div style={{
                backgroundColor: 'white',
                minWidth: '320px',
                maxWidth: '500px',
                border: `2px solid ${config.borderColor}`,
                boxShadow: 'none'
            }}>
                {/* Header */}
                <div style={{
                    padding: '30px 40px 20px 40px',
                    borderBottom: `1px solid ${config.borderColor}`,
                    textAlign: 'center'
                }}>
                    <h3 style={{
                        margin: '0',
                        fontSize: '20px',
                        fontWeight: '400',
                        color: config.titleColor,
                        letterSpacing: '0.5px'
                    }}>
                        {title || config.defaultTitle}
                    </h3>
                </div>

                {/* Body */}
                <div style={{
                    padding: '30px 40px',
                    textAlign: 'center'
                }}>
                    <p style={{
                        margin: '0 0 30px 0',
                        fontSize: '16px',
                        color: '#666',
                        lineHeight: '1.6',
                        letterSpacing: '0.3px'
                    }}>
                        {message}
                    </p>
                    
                    {type === 'confirm' ? (
                        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                            <button 
                                onClick={onConfirm}
                                style={{
                                    padding: '12px 30px',
                                    backgroundColor: '#dc3545',
                                    color: 'white',
                                    border: 'none',
                                    fontSize: '14px',
                                    letterSpacing: '1px',
                                    textTransform: 'uppercase',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    fontWeight: '400'
                                }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#c82333'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = '#dc3545'}
                            >
                                {confirmText}
                            </button>
                            <button 
                                onClick={onCancel}
                                style={{
                                    padding: '12px 30px',
                                    backgroundColor: 'transparent',
                                    color: '#666',
                                    border: '1px solid #ddd',
                                    fontSize: '14px',
                                    letterSpacing: '1px',
                                    textTransform: 'uppercase',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    fontWeight: '400'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = '#f8f9fa';
                                    e.target.style.borderColor = '#999';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = 'transparent';
                                    e.target.style.borderColor = '#ddd';
                                }}
                            >
                                {cancelText}
                            </button>
                        </div>
                    ) : (
                        <button 
                            onClick={onClose}
                            style={{
                                padding: '12px 30px',
                                backgroundColor: '#333',
                                color: 'white',
                                border: 'none',
                                fontSize: '14px',
                                letterSpacing: '1px',
                                textTransform: 'uppercase',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                fontWeight: '400'
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#555'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = '#333'}
                        >
                            Cerrar
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}