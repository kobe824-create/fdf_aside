import Button from "./button";
import FormField from "./formField";
import SelectFormField from "./selectFormField";

interface FilterPopupProps {
  closePopup: () => void;
}

export default function FilterPopup(props: FilterPopupProps) {
  const { closePopup } = props;
  return (
    <div className="filter-pop-up-container"
      onClick={(e) => e.stopPropagation()}
    >
      <h2>Filter</h2>
      <fieldset className="filter-pop-up-fieldset">
        <SelectFormField
          label="Category"
          options={[
            { value: "all", label: "All" },
            { value: "electronics", label: "Electronics" },
            { value: "clothing", label: "Clothing" },
            { value: "furniture", label: "Furniture" },
          ]}
        />
        <SelectFormField
          label="status"
          options={[
            { value: "all", label: "All" },
            { value: "paid", label: "Paid" },
            { value: "unpaid", label: "Unpaid" },
          ]}
        />
        <SelectFormField
          label="member"
          options={[
            { value: "all", label: "All" },
            { value: "member", label: "Member" },
            { value: "non-member", label: "Non-Member" },
          ]}
        />
      </fieldset>
      <fieldset className="parallel-fields">
        <FormField
          label="From"
          type="text"
          placeholder="0.00"
          value=""
          onChange={() => { }}
        />
        <FormField
          label="To"
          type="text"
          placeholder="0.00"
          value=""
          onChange={() => { }}
        />
      </fieldset>
      <div className="parallel-btn">
        <Button
          label="Cancel"
          onClick={closePopup}
          className="button-secondary"
        />
        <Button
          label="Filter"
          onClick={() => { }}
          className="button-primary"
        />
      </div>

    </div>
  );
}