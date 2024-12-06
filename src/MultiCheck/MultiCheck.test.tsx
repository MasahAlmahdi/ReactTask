import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import MultiCheck from "./MultiCheck";

const mockOptions = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
  { label: "Option 3", value: "3" },
  { label: "Option 4", value: "4" },
];

describe("MultiCheck", () => {
  describe("initialize", () => {
    it("renders the label if label provided", () => {
      render(<MultiCheck label="Test Label" options={mockOptions} />);
      expect(screen.getByText("Test Label")).toBeInTheDocument();
    });

    it("does not render label if not provided", () => {
      const { container } = render(<MultiCheck options={mockOptions} />);
      const labelElements =
        container.getElementsByClassName("MultiCheck-label");
      expect(labelElements.length).toBe(0);
    });

    it('renders "Select All" checkbox', () => {
      render(<MultiCheck options={mockOptions} />);
      expect(screen.getByLabelText("Select All")).toBeInTheDocument();
    });

    it("renders all options", () => {
      render(<MultiCheck options={mockOptions} />);
      mockOptions.forEach((option) => {
        expect(screen.getByText(option.label)).toBeInTheDocument();
      });
    });
  });

  describe("functionality", () => {
    it("selects and deselects individual options", () => {
      const onChangeMock = jest.fn();
      render(<MultiCheck options={mockOptions} onChange={onChangeMock} />);

      const option1Checkbox = screen.getByLabelText(
        "Option 1"
      ) as HTMLInputElement;
      const option2Checkbox = screen.getByLabelText(
        "Option 2"
      ) as HTMLInputElement;

      // Select Option 1
      fireEvent.click(option1Checkbox);
      expect(option1Checkbox.checked).toBe(true);
      expect(onChangeMock).toHaveBeenCalledWith([
        { label: "Option 1", value: "1" },
      ]);

      // Select Option 2
      fireEvent.click(option2Checkbox);
      expect(option2Checkbox.checked).toBe(true);
      expect(onChangeMock).toHaveBeenCalledWith([
        { label: "Option 1", value: "1" },
        { label: "Option 2", value: "2" },
      ]);

      // Deselect Option 1
      fireEvent.click(option1Checkbox);
      expect(option1Checkbox.checked).toBe(false);
    });

    it("select all functionality", () => {
      const onChangeMock = jest.fn();
      render(<MultiCheck options={mockOptions} onChange={onChangeMock} />);

      const selectAllCheckbox = screen.getByLabelText(
        "Select All"
      ) as HTMLInputElement;

      // Select All
      fireEvent.click(selectAllCheckbox);
      expect(selectAllCheckbox.checked).toBe(true);
      expect(onChangeMock).toHaveBeenCalledWith(mockOptions);

      // Deselect All
      fireEvent.click(selectAllCheckbox);
      expect(selectAllCheckbox.checked).toBe(false);
      expect(onChangeMock).toHaveBeenCalledWith([]);
    });
  });
});
