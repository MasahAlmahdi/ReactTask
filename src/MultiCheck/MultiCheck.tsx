import "./MultiCheck.css";

import React, { useEffect, useMemo, useState, useRef } from "react";

export type Option = {
  label: string;
  value: string;
};

/**
 * Notice:
 * 1. There should be a special `Select All` option with checkbox to control all passing options
 * 2. If columns > 1, the options should be placed from top to bottom in each column
 *
 * @param {string} label - the label text of this component
 * @param {Option[]} options - options
 * @param {string[]} values - default checked option values
 * @param {number} columns - default value is 1
 * @param {Function} onChange - when checked options are changed,
 *                             they should be passed to outside
 */
type Props = {
  label?: string;
  options: Option[];
  columns?: number;
  values?: string[];
  onChange?: (options: Option[]) => void;
};

const MultiCheck: React.FunctionComponent<Props> = ({
  label,
  options,
  columns = 1,
  values = [],
  onChange,
}): JSX.Element => {
  const [selectedValues, setSelectedValues] = useState<string[]>(values);
  const prevSelectedValues = useRef(selectedValues);

  const isAllSelected = useMemo(
    () => selectedValues.length === options.length,
    [selectedValues, options]
  );

  const toggleSelectAll = () => {
    const newSelectedValues = isAllSelected
      ? []
      : options.map((opt) => opt.value);
    setSelectedValues(newSelectedValues);
  };

  const toggleOption = (value: string) => {
    setSelectedValues((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  useEffect(() => {
    if (onChange && prevSelectedValues.current !== selectedValues) {
      const selectedOptions = options.filter((opt) =>
        selectedValues.includes(opt.value)
      );
      onChange(selectedOptions);
      prevSelectedValues.current = selectedValues;
    }
  }, [selectedValues, options, onChange]);

  const columnedOptions = useMemo(() => {
    const columnCount = Math.min(columns, options.length);
    const rowsPerColumn = Math.ceil(options.length / columnCount);
    return Array.from({ length: columnCount }, (_, col) =>
      options.slice(col * rowsPerColumn, (col + 1) * rowsPerColumn)
    );
  }, [options, columns]);

  return (
    <div className="MultiCheck">
      {label && <label className="MultiCheck-label">{label}</label>}
      <div className="MultiCheck-columns">
        <div className="MultiCheck-column">
          <label>
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={toggleSelectAll}
            />
            Select All
          </label>
        </div>
        {columnedOptions.map((column, colIdx) => (
          <div key={colIdx} className="MultiCheck-column">
            {column.map((option) => (
              <label key={option.value}>
                <input
                  type="checkbox"
                  checked={selectedValues.includes(option.value)}
                  onChange={() => toggleOption(option.value)}
                />
                {option.label}
              </label>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
export default MultiCheck;
