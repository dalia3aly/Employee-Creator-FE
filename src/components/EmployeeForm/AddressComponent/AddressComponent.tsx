import React, { useState } from "react";
import { Controller, Control, useFormContext } from "react-hook-form";
import { EmployeeFormData } from "../EmployeeForm";

const australianStates = [
  "New South Wales",
  "Victoria",
  "Queensland",
  "Western Australia",
  "South Australia",
  "Tasmania",
  "Australian Capital Territory",
  "Northern Territory",
];

interface AddressComponentProps {
  control: Control<EmployeeFormData>;
  errors: any;
}

interface Suggestion {
  description: string;
  place_id: string;
}

const AddressComponent: React.FC<AddressComponentProps> = ({
  control,
  errors,
}) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const { setValue } = useFormContext<EmployeeFormData>();

  const fetchAddressSuggestions = async (query: string) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    const response = await fetch(
      `http://localhost:8080/api/address/autocomplete?input=${query}`
    );
    const data = await response.json();

    setSuggestions(data.predictions);
  };

  const fetchPlaceDetails = async (placeId: string) => {
    const response = await fetch(
      `http://localhost:8080/api/address/details?placeId=${placeId}`
    );
    const data = await response.json();

    return data.result.address_components;
  };

  const handleSuggestionClick = async (suggestion: Suggestion) => {
    const addressComponents = await fetchPlaceDetails(suggestion.place_id);

    const suburb = addressComponents.find((component: any) =>
      component.types.includes("locality")
    )?.long_name;
    const postcode = addressComponents.find((component: any) =>
      component.types.includes("postal_code")
    )?.long_name;

    if (suburb) {
      setValue("address.suburb", suburb);
    }
    if (postcode) {
      setValue("address.postcode", postcode);
    }
    setSuggestions([]);
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 mt-8">Permanent Address</h3>
      <div className="mb-4">
        <label className="block text-gray-700">Unit/Suite Number</label>
        <Controller
          name="address.unitNumber"
          control={control}
          render={({ field }) => (
            <div>
              <input {...field} className="w-full mt-1 p-2 border rounded" />
            </div>
          )}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Street Address</label>
        <Controller
          name="address.streetAddress"
          control={control}
          render={({ field }) => (
            <div>
              <input
                {...field}
                className="w-full mt-1 p-2 border rounded"
                onChange={(e) => {
                  field.onChange(e);
                  fetchAddressSuggestions(e.target.value);
                }}
              />
              {suggestions.length > 0 && (
                <ul className="bg-white border border-gray-300 rounded shadow-md mt-2">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="p-2 cursor-pointer hover:bg-gray-200"
                      onClick={() => handleSuggestionClick(suggestion)}>
                      {suggestion.description}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        />
        {errors.streetAddress && (
          <p className="text-red-600">{errors.streetAddress.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Suburb: </label>
        <Controller
          name="address.suburb"
          control={control}
          render={({ field }) => (
            <div>
              <input {...field} className="w-full mt-1 p-2 border rounded" />
            </div>
          )}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">State/Territory</label>
        <Controller
          name="address.state"
          control={control}
          render={({ field }) => (
            <div>
              <select {...field} className="w-full mt-1 p-2 border rounded">
                {australianStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
          )}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Postcode: </label>
        <Controller
          name="address.postcode"
          control={control}
          render={({ field }) => (
            <div>
              <input {...field} className="w-full mt-1 p-2 border rounded" />
            </div>
          )}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Country:</label>
        <Controller
          name="address.country"
          control={control}
          render={({ field }) => (
            <div>
              <input
                {...field}
                className="w-full mt-1 p-2 border rounded"
                readOnly
                value="Australia"
              />
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default AddressComponent;
