import React, { useState } from 'react'
import Input from '../input';

import styles from "./styles.module.css"

export type BaseOption = {label: string; value: string}
export type MultiSelectInputProps<T> = {
  options: (T & BaseOption)[];
  label: string;
  placeholder?: string;
  selectedItems: (T & BaseOption)[];
  keyword: string;
  onChange: (selected: (T & BaseOption)) => void;
  removeItem: (targetItem: (T & BaseOption)) => void;
  onSearch: (keyword: string) => void;
  renderOption: (item: (T & BaseOption), index: number) => React.ReactNode;
}
const MultiSelectInput = <T,>({ options, onChange, label, placeholder, selectedItems, renderOption}: MultiSelectInputProps<T>) => {

  const [areOptionsVisible, setAreOptionsVisible] = useState(false)

  return (
    <div className={`${styles["multi-input-main-container"]} relative`}>
      <Input
        label={label}
        placeholder={placeholder}
        className={`${styles["input-holder"]}`}
        onClick={() => {
          setAreOptionsVisible(prevState => !prevState)
        }}
      />
      <div className={`${styles["options-container"]} ${areOptionsVisible ? styles["active"] : ""} transition-all duration-300 p-4 bg-[var(--var-dark)] flex flex-col gap-2 max-h-[12rem] overflow-auto`}>
        {options.map((item, index) => (
          renderOption(item, index)
        ))}
      </div>
    </div>
  )
}

export default MultiSelectInput