import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Search, X } from 'lucide-react';

interface AddressAutocompleteProps {
  value: string;
  onChange: (address: string) => void;
  onSelect?: (address: string, placeId?: string, coordinates?: { lat: number; lng: number }) => void;
  placeholder?: string;
  className?: string;
  error?: string;
  disabled?: boolean;
}

interface AddressSuggestion {
  id: string;
  display_name: string;
  address: {
    road?: string;
    house_number?: string;
    postcode?: string;
    city?: string;
    state?: string;
    country?: string;
  };
  lat: string;
  lon: string;
}

const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({
  value,
  onChange,
  onSelect,
  placeholder = "Escribe tu dirección...",
  className = "",
  error,
  disabled = false
}) => {
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Debounce para las búsquedas
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (value.length > 3) {
        searchAddresses(value);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [value]);

  const searchAddresses = async (query: string) => {
    setLoading(true);
    try {
      // Usar Nominatim API (gratuita) para geocodificación
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=5&countrycodes=es&q=${encodeURIComponent(query + ' Madrid España')}`
      );
      
      if (response.ok) {
        const data = await response.json();
        setSuggestions(data);
        setShowSuggestions(data.length > 0);
        setActiveSuggestion(-1);
      } else {
        console.warn('Error en la búsqueda de direcciones');
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } catch (error) {
      console.error('Error buscando direcciones:', error);
      setSuggestions([]);
      setShowSuggestions(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (suggestion: AddressSuggestion) => {
    const formattedAddress = formatAddress(suggestion);
    onChange(formattedAddress);
    setShowSuggestions(false);
    setSuggestions([]);
    
    if (onSelect) {
      onSelect(
        formattedAddress, 
        suggestion.id, 
        { lat: parseFloat(suggestion.lat), lng: parseFloat(suggestion.lon) }
      );
    }
  };

  const formatAddress = (suggestion: AddressSuggestion): string => {
    const { address } = suggestion;
    const parts = [];
    
    if (address.road) {
      let road = address.road;
      if (address.house_number) {
        road += ` ${address.house_number}`;
      }
      parts.push(road);
    }
    
    if (address.postcode && address.city) {
      parts.push(`${address.postcode} ${address.city}`);
    } else if (address.city) {
      parts.push(address.city);
    }
    
    if (address.state && address.state !== address.city) {
      parts.push(address.state);
    }
    
    return parts.join(', ');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveSuggestion(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveSuggestion(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (activeSuggestion >= 0) {
          handleSelect(suggestions[activeSuggestion]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setActiveSuggestion(-1);
        break;
    }
  };

  const clearInput = () => {
    onChange('');
    setShowSuggestions(false);
    setSuggestions([]);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (suggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          className={`w-full pl-10 pr-16 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all ${
            error ? 'border-red-500' : 'border-gray-600 focus:border-yellow-400'
          } ${className}`}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete="off"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
          {loading && (
            <Search className="animate-pulse text-gray-400" size={16} />
          )}
          {value && !loading && (
            <button
              type="button"
              onClick={clearInput}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>
      
      {showSuggestions && suggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          {suggestions.map((suggestion, index) => {
            const isActive = index === activeSuggestion;
            return (
              <div
                key={suggestion.id}
                onClick={() => handleSelect(suggestion)}
                className={`px-4 py-3 cursor-pointer transition-colors ${
                  isActive
                    ? 'bg-yellow-400/10 text-yellow-400 border-l-2 border-yellow-400'
                    : 'text-gray-300 hover:bg-gray-700/50'
                }`}
              >
                <div className="flex items-start space-x-2">
                  <MapPin size={14} className="text-gray-400 mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">
                      {formatAddress(suggestion)}
                    </div>
                    <div className="text-xs text-gray-400 truncate">
                      {suggestion.display_name}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AddressAutocomplete;