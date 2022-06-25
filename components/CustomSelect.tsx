import { capitalize, map, reject, words } from "lodash";
import { Key, useState } from "react";

interface CustomSelectProps {
    value: string,
    options: {
        key: string,
        value: string
    }[],
    onChange: (prop: string) => void
}

function CustomSelect({ value, options, onChange }: CustomSelectProps) {
    const [dropDownVisible, setDropDown] = useState(false);

    const toggleDropDown = () => {
        setDropDown(prevValue => !prevValue);
    }

    return (
        <div>
            <label id="listbox-label" className="text-theme-white">Filter:</label>
            <div className="ninja-select font-display" onClick={toggleDropDown} aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">

                <p className="flex justify-between gap-4 text-lg w-full">{words(value).join(' ')} <span className="text-primary-dark font-bold">{dropDownVisible ? '^' : 'v'}</span></p>
                <ul className={`dropdown ${dropDownVisible ? 'block' : 'hidden'}`} role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">
                    {map(reject(options, { key: value }), option => (
                        <li key={option.key} onClick={() => onChange(option.key)} role="option" aria-selected={value === option.key}><p className="dropdown-option">{option.value}</p></li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default CustomSelect;
