import React from 'react'

export type InputProps = {
  label: string;
  outerClassname?: string;
  placeholder?: string;
  currentInputType: "text" | "date"
} & React.InputHTMLAttributes<HTMLInputElement>

const Input: React.FC<InputProps> = ({ label, outerClassname, placeholder, currentInputType, ...rest }) => {

  const InputText = () => {
    return (
      <input
        className='p-1 border-2 border-solid border-white/50 focus:border-white rounded-md outline-none transition-all' 
        type="text"
        placeholder={placeholder ?? "Enter your text here"}
        {...rest}
      />
    )
  }

  const InputDate = () => {
    return (
      <input
        className='p-1 border-2 border-solid border-white/50 focus:border-white rounded-md outline-none transition-all dark:[color-scheme:dark]' 
        type="date"
        placeholder={placeholder ?? "Enter your text here"}
        {...rest}
      />
    )
  }

  const renderInput = () => {
    switch(currentInputType){
      case "date":
        return <InputDate/>
      case "text":
      default:
        return <InputText/>
    }
  }

  return (
    <div className={`flex flex-col gap-2 ${outerClassname ?? ""}`}>
      <span className='font-bold text-xl'>{label}</span>
      {renderInput()}
    </div>
  )
}

export default Input