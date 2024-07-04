import React, { useState } from "react";
import { Controller, Control, useFormContext } from "react-hook-form";
import { EmployeeFormData } from "../EmployeeForm";
import {
  fetchAddressSuggestions,
  fetchPlaceDetails,
} from "../../../api/addressService";

const australianStates = [
  "NSW",
  "VIC",
  "QLD",
  "WA",
  "SA",
  "TAS",
  "ACT",
  "NT",
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

  const handleFetchAddressSuggestions = async (query: string) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      const predictions = await fetchAddressSuggestions(query);
      setSuggestions(predictions);
    } catch (error) {
      console.error("Error fetching address suggestions: ", error);
    }
  };

  const handleFetchPlaceDetails = async (placeId: string) => {
    try {
      const addressComponents = await fetchPlaceDetails(placeId);
      const streetNumberAndName = addressComponents.find((component: any) =>
        component.types.includes("route")
      )?.long_name;
      const streetNumber = addressComponents.find((component: any) =>
        component.types.includes("street_number")
      )?.long_name;
      const suburb = addressComponents.find((component: any) =>
        component.types.includes("locality")
      )?.long_name;
      const postcode = addressComponents.find((component: any) =>
        component.types.includes("postal_code")
      )?.long_name;

      if (streetNumber && streetNumberAndName) {
        setValue(
          "address.streetAddress",
          `${streetNumber} ${streetNumberAndName}`
        );
      }
      if (suburb) {
        setValue("address.suburb", suburb);
      }
      if (postcode) {
        setValue("address.postcode", postcode);
      }
      setSuggestions([]);
    } catch (error) {
      console.error("Error fetching place details: ", error);
    }
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    handleFetchPlaceDetails(suggestion.place_id);
    // Extract and set only the street number and name
    const [streetNumberAndName] = suggestion.description.split(",");
    setValue("address.streetAddress", streetNumberAndName);
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
                  handleFetchAddressSuggestions(e.target.value);
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
                  <option 
                  defaultValue={state === "NSW" ? "selected" : ""}
                  key={state} value={state}>
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
