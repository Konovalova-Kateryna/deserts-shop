"use client";

import { useRef } from "react";
import { Autocomplete, LoadScript } from "@react-google-maps/api";
import { ClearBtn } from "./clear-btn";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
const GOOGLE_MAPS_LIBRARIES: "places"[] = ["places"];

type AddressAutocompleteProps = {
  onSelect: (address: string) => void;
  value?: string;
};

export const AddressAutocompleteComponent = ({
  onSelect,
  value,
}: AddressAutocompleteProps) => {
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const handlePlaceSelect = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.formatted_address) {
        onSelect(place.formatted_address);
      }
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={GOOGLE_MAPS_API_KEY}
      libraries={GOOGLE_MAPS_LIBRARIES}
    >
      <div className="relative">
        <Autocomplete
          onLoad={(autocomplete) => {
            autocompleteRef.current = autocomplete;
          }}
          onPlaceChanged={handlePlaceSelect}
          className="text-lg lg:text-xl"
        >
          <input
            className="w-full h-full text-lg lg:text-xl px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            type="text"
            value={value}
            onChange={(e) => onSelect(e.target.value)}
            placeholder="Введіть адресу доставки"
          />
        </Autocomplete>
        {value && <ClearBtn onClick={() => onSelect("")} />}
      </div>
    </LoadScript>
  );
};
