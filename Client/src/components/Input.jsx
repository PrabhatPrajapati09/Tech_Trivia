
import React from 'react';

const Input = ({ label, error, ...props }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
            {label && <label style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{label}</label>}
            <input
                style={{
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--border)',
                    color: 'var(--text)',
                    fontSize: '1rem',
                    width: '100%',
                    transition: 'border-color 0.2s',
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                {...props}
            />
            {error && <span style={{ color: 'var(--error)', fontSize: '0.75rem' }}>{error}</span>}
        </div>
    );
};

export default Input;
