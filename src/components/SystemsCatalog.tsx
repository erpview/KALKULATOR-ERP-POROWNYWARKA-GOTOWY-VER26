import React, { useState } from 'react';
import { Search, Building2, Globe, Filter, ChevronDown, X, Loader2, Scale } from 'lucide-react';
import { useSystems } from '../hooks/useSystems';
import { useComparison } from '../context/ComparisonContext';

const SystemsCatalog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSize, setSelectedSize] = useState<string[]>([]);
  const [selectedVendor, setSelectedVendor] = useState<string>('');
  const { systems, loading, error } = useSystems();
  const { selectedSystems, addSystem, removeSystem } = useComparison();

  // Sort vendors alphabetically
  const vendors = Array.from(new Set(systems.map(system => system.vendor))).sort();
  const sizes = Array.from(new Set(systems.flatMap(system => system.size)));

  const filteredSystems = systems.filter(system => {
    const matchesSearch = system.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         system.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         system.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSize = selectedSize.length === 0 || 
                       system.size.some(size => selectedSize.includes(size));
    
    const matchesVendor = !selectedVendor || system.vendor === selectedVendor;

    return matchesSearch && matchesSize && matchesVendor;
  });

  const toggleSize = (size: string) => {
    setSelectedSize(prev =>
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const handleCompareToggle = (system: System) => {
    const isSelected = selectedSystems.some(s => s.id === system.id);
    if (isSelected) {
      removeSystem(system.id);
    } else if (selectedSystems.length < 4) {
      addSystem(system);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-3 text-[#86868b]">
          <Loader2 className="w-6 h-6 animate-spin" />
          <p className="text-[17px]">Ładowanie systemów...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="sf-card p-8 text-center">
        <p className="text-[17px] text-[#FF3B30]">
          Nie udało się załadować listy systemów. Spróbuj odświeżyć stronę.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <div className="space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#86868b] w-5 h-5" />
          <input
            type="text"
            placeholder="Szukaj systemu ERP..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="sf-input pl-10 w-full"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-[#1d1d1f]">
            <Filter className="w-5 h-5" />
            <h3 className="text-[17px] font-medium">Filtry</h3>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-[15px] font-medium text-[#1d1d1f] mb-2">
                Wielkość firmy
              </h4>
              <div className="flex flex-wrap gap-2">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`sf-card px-4 py-2 text-[15px] transition-colors
                      ${selectedSize.includes(size)
                        ? 'bg-[#2c3b67] text-white'
                        : 'hover:border-[#2c3b67]/30'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-[15px] font-medium text-[#1d1d1f] mb-2">
                Dostawca
              </h4>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#86868b] w-5 h-5" />
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#86868b] w-5 h-5 pointer-events-none" />
                <select
                  value={selectedVendor}
                  onChange={(e) => setSelectedVendor(e.target.value)}
                  className="sf-input pl-10 pr-16 w-full appearance-none bg-white cursor-pointer hover:bg-[#F5F5F7] transition-colors duration-200"
                >
                  <option value="">Wszyscy dostawcy</option>
                  {vendors.map(vendor => (
                    <option key={vendor} value={vendor}>
                      {vendor}
                    </option>
                  ))}
                </select>
                {selectedVendor && (
                  <button
                    onClick={() => setSelectedVendor('')}
                    className="absolute right-8 top-1/2 transform -translate-y-1/2 p-1 hover:bg-[#F5F5F7] rounded-full transition-colors duration-200"
                    title="Resetuj wybór dostawcy"
                  >
                    <X className="w-4 h-4 text-[#86868b]" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Systems Grid */}
      <div className="grid grid-cols-1 gap-6">
        {filteredSystems.map((system) => {
          const isSelected = selectedSystems.some(s => s.id === system.id);
          return (
            <div key={system.id} className="sf-card p-6 space-y-4 hover:shadow-md transition-all duration-200">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-[24px] font-semibold text-[#1d1d1f]">
                    {system.name}
                  </h3>
                  <p className="text-[15px] text-[#86868b] mt-1">
                    {system.vendor}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCompareToggle(system)}
                    disabled={!isSelected && selectedSystems.length >= 4}
                    className={`sf-button text-[15px] font-medium
                      ${isSelected 
                        ? 'bg-[#2c3b67] text-white hover:bg-[#2c3b67]/90'
                        : selectedSystems.length >= 4
                          ? 'bg-[#F5F5F7] text-[#86868b] cursor-not-allowed'
                          : 'bg-[#F5F5F7] text-[#1d1d1f] hover:bg-[#E8E8ED]'
                      }`}
                  >
                    <Scale className="w-5 h-5 mr-2" />
                    {isSelected ? 'Usuń z porównania' : 'Dodaj do porównania'}
                  </button>
                  <a
                    href={system.website}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="sf-button bg-[#F5F5F7] text-[#1d1d1f] hover:bg-[#E8E8ED] p-2"
                    aria-label="Strona dostawcy"
                    title="Strona dostawcy"
                  >
                    <Globe className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <p className="text-[17px] leading-relaxed text-[#1d1d1f]">
                {system.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {system.size.map((size) => (
                  <span
                    key={size}
                    className="inline-flex items-center px-3 py-1 rounded-full text-[13px] font-medium bg-[#F5F5F7] text-[#1d1d1f]"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          );
        })}

        {filteredSystems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[17px] text-[#86868b]">
              Nie znaleziono systemów spełniających kryteria wyszukiwania.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SystemsCatalog;