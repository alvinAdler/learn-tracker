import React from 'react'


export type BaseInputProps = {
  label: string;
  outerClassname?: string;
  placeholder?: string;
}
export type InputProps = BaseInputProps & React.InputHTMLAttributes<HTMLInputElement>
export type InputDateProps = BaseInputProps & React.InputHTMLAttributes<HTMLInputElement>
export type InputTextAreaProps = BaseInputProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>

type UnionInputs = {
  TextArea: React.FC<InputTextAreaProps>
  Date: React.FC<InputDateProps>
}

const Input: React.FC<InputProps> & UnionInputs = ({ label, outerClassname, placeholder, ...rest }) => {

  return (
    <BaseContainer
      label={label}
      outerClassname={outerClassname}
    >
      <input
        className='p-1 border-2 border-solid border-white/50 focus:border-white rounded-md outline-none transition-all' 
        type="text"
        placeholder={placeholder ?? "Enter your text here"}
        {...rest}
      />
    </BaseContainer>
  )
}

const InputTextArea: React.FC<InputTextAreaProps> = ({ label, outerClassname, ...rest }) => {
  return (
    <BaseContainer
      label={label}
      outerClassname={outerClassname}
    >
      <textarea
        className='p-1 border-2 border-solid border-white/50 focus:border-white rounded-md outline-none transition-all h-full'
        {...rest}
      ></textarea>
    </BaseContainer>
  )
}

const InputDate: React.FC<InputDateProps> = ({ label, outerClassname, placeholder, ...rest }) => {
  return (
    <BaseContainer label={label} outerClassname={outerClassname}>
      <input
        className='p-1 border-2 border-solid border-white/50 focus:border-white rounded-md outline-none transition-all dark:[color-scheme:dark]' 
        type="date"
        placeholder={placeholder ?? "Enter your text here"}
        {...rest}
      />
    </BaseContainer>
  )
}

export type BaseContainerType = {
  outerClassname?: string,
  children: React.ReactNode,
  label: string,
}
export const BaseContainer: React.FC<BaseContainerType> = ({ outerClassname, label, children }) => {
  return(
    <div className={`flex flex-col gap-2 ${outerClassname ?? ""}`}>
      <span className='font-bold text-xl'>{label}</span>
      {children}
    </div>
  )
}

Input.TextArea = InputTextArea
Input.Date = InputDate

export default Input