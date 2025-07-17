import React, { useEffect, useState } from 'react'
import { FaCheck, FaTimes } from "react-icons/fa";
import { useDebounce } from "@uidotdev/usehooks";

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
const MultiSelectInput = ({ options, label, placeholder, selectedItems, initialKeyword, renderOption, onChange, onSearch, removeItem}: MultiSelectInputProps) => {

  const [areOptionsVisible, setAreOptionsVisible] = useState(false)
  const [currentSearchValue, setCurrentSearchValue] = useState(initialKeyword)
  const debouncedCurrentSearchValue = useDebounce(currentSearchValue, 500)
  const [localOptionsFiltered, setLocalOptionsFiltered] = useState(options)

  useEffect(() => {
    setCurrentSearchValue(initialKeyword)
  }, [initialKeyword])

  useEffect(() => {
    setLocalOptionsFiltered(options)
  }, [options])

  useEffect(() => {
    onSearch(debouncedCurrentSearchValue)

    setLocalOptionsFiltered(() => [...options].filter((item) => item.label?.toLowerCase().includes(debouncedCurrentSearchValue.toLowerCase())))

  // eslint-disable-next-line
  }, [debouncedCurrentSearchValue])

  return (
    <div className={`${styles["multi-input-main-container"]} relative`}>
      <Input
        value={currentSearchValue}
        onChange={(ev) => setCurrentSearchValue(ev.target.value)}
        label={label}
        placeholder={placeholder}
        className={`${styles["input-holder"]}`}
        onClick={() => {
          setAreOptionsVisible(prevState => !prevState)
        }}
      />
      <div className={`${styles["options-container"]} ${areOptionsVisible ? styles["active"] : ""} transition-all duration-250 p-4 bg-[var(--var-dark)] flex flex-col gap-2 max-h-[12rem] overflow-auto`}>
        {localOptionsFiltered.map((item, index) => (
          <div key={index} className='
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
      {selectedItems.length > 0 &&
        <div className='mt-2 p-2 pl-0 flex gap-2 flex-wrap'>
          {selectedItems.map((item, index) => (
            <Chip
              key={index}
              label={item.label}
              value={item.value}
              onDelete={(tobeDeletedItem) => {
                const targetItem = options.find((item) => item.value === tobeDeletedItem)
                if(!targetItem) return;
                removeItem(targetItem)
              }}
            />
          ))}
        </div>
      }
    </div>
  )
}

export type ChipProps = {
  label: string;
  value: any;
  onDelete: (currentValue: any) => void;
}
export const Chip: React.FC<ChipProps> = ({label, value, onDelete}) => {
  return(
    <div className='flex items-center gap-2 bg-[var(--var-light)]/50 p-1 rounded-md text-sm'>
      <p>{label}</p>
      <button type='button' className='flex items-center justify-center cursor-pointer' onClick={() => onDelete(value)}>{<FaTimes/>}</button>
    </div>
  )
}

export default MultiSelectInput