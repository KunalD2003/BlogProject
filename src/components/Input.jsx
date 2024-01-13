import React, {useId} from 'react'

const Input = React.forwardRef(function Input({
  label,
  type = 'text',
  className = '',
  ...props
}, ref){
    const id = useId()
    return(
        <div>
            <label htmlFor={id}>
                {label}
            </label>
            <input 
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`} 
            {...props} 
            type={type}
            ref= {ref} 
            id={id} />
        </div>
    )
})  

export default Input