import React, { createContext, useContext, useState } from 'react'

const UsuarioContext = createContext()

/**
 * Proveedor de contexto para el usuario.
 * 
 * Este componente envuelve a sus hijos y proporciona el estado del usuario
 * y una función para actualizarlo a través del contexto de Usuario.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Componentes hijos que tendrán acceso al contexto.
 * @returns {JSX.Element} Proveedor de contexto de usuario.
 */
export const UsuarioProvider = ({ children }) => {
  const [usuario, setUsuario] = useState('')

  return (
    <UsuarioContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </UsuarioContext.Provider>
  )
}

export const useUsuario = () => useContext(UsuarioContext)
