import React, { useEffect, useState } from 'react'
import { FaCheck } from "react-icons/fa";

import styles from "./styles.module.css"

import Input from '../input';

export type OptionType = {label: string; value: any}
export type MultiSelectInputProps = {
  options: OptionType[];
  label: string;
  placeholder?: string;
  selectedItems: OptionType[];
  initialKeyword: string;
  removeItem: (targetItem: OptionType) => void;
  onSearch: (keyword: string) => void;
  onChange: (item: OptionType) => void;
  renderOption: (item: OptionType, index: number) => React.ReactNode;
}
const MultiSelectInput = ({ options, label, placeholder, selectedItems, initialKeyword, renderOption, onChange, onSearch}: MultiSelectInputProps) => {

  const [areOptionsVisible, setAreOptionsVisible] = useState(false)
  const [currentSearchValue, setCurrentSearchValue] = useState(initialKeyword)

  useEffect(() => {
    setCurrentSearchValue(initialKeyword)
  }, [initialKeyword])

  return (
    <div className={`${styles["multi-input-main-container"]} relative`}>
      <Input
        value={currentSearchValue}
        onChange={(ev) => onSearch(ev.target.value)}
        label={label}
        placeholder={placeholder}
        className={`${styles["input-holder"]}`}
        onClick={() => {
          setAreOptionsVisible(prevState => !prevState)
        }}
      />
      <div className={`${styles["options-container"]} ${areOptionsVisible ? styles["active"] : ""} transition-all duration-250 p-4 bg-[var(--var-dark)] flex flex-col gap-2 max-h-[12rem] overflow-auto`}>
        {options.map((item, index) => (
          <div className='
            transition-all hover:text-lg cursor-pointer py-1 px-4 hover:bg-[var(--var-light)] hover:text-[var(--var-dark))] rounded-md
            flex items-center gap-4 justify-stretch
            '
            onClick={() => onChange(item)}
          >
            {selectedItems.map(item => item.value).includes(item.value) &&
              <FaCheck/>
            }
            {renderOption(item, index)}
          </div>
        ))}
      </div>
    </div>
  )
}

export default MultiSelectInput