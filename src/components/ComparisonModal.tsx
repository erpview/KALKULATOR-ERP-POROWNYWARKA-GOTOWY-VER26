import React, { useState, useRef, useEffect } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import { categories } from '../constants/comparisonCategories';
import { System } from '../types/system';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  systems: System[];
}

const ComparisonModal: React.FC<ComparisonModalProps> = ({ isOpen, onClose, systems = [] }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number>(0);
  const touchMoveY = useRef<number>(0);

  useEffect(() => {
    if (isOpen) {
      setExpandedCategories(['general']);
      setIsClosing(false);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchMoveY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchMoveY.current = e.touches[0].clientY;
    const deltaY = touchMoveY.current - touchStartY.current;

    if (deltaY > 0) {
      const scrollTop = modalRef.current?.scrollTop || 0;
      if (scrollTop <= 0) {
        e.preventDefault();
      }
    }
  };

  const handleTouchEnd = () => {
    const deltaY = touchMoveY.current - touchStartY.current;
    if (deltaY > 100) {
      handleClose();
    }
  };

  const formatValue = (value: any): string => {
    if (value === undefined || value === null) return 'Brak danych';
    if (Array.isArray(value)) return value.join(', ') || 'Brak danych';
    return String(value);
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 transition-opacity duration-300 
        ${isClosing ? 'opacity-0' : 'opacity-100'}`}
    >
      <div 
        className="absolute inset-0 bg-[#000000]/30 backdrop-blur-md"
        onClick={handleClose}
      />

      <div 
        ref={modalRef}
        className={`absolute inset-x-0 bottom-0 bg-[#F5F5F7] rounded-t-[20px] shadow-2xl 
          transform transition-transform duration-300 ease-out
          md:relative md:inset-x-auto md:bottom-auto md:mx-auto md:my-8 md:w-[90vw] md:max-w-6xl md:rounded-[20px]
          ${isClosing ? 'translate-y-full md:translate-y-4 md:opacity-0' : 'translate-y-0'}`}
        style={{ maxHeight: 'calc(100vh - env(safe-area-inset-top) - 20px)' }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        role="dialog"
        aria-modal="true"
      >
        <div className="md:hidden w-[36px] h-[5px] mx-auto mt-2 rounded-full bg-[#000000]/10" />

        {/* Header */}
        <div className="sticky top-0 z-20 bg-[#F5F5F7] pt-4 md:pt-6 px-4 md:px-6 pb-4 border-b border-[#d2d2d7]/30">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[22px] font-semibold text-[#1d1d1f] tracking-[-0.01em]">
              Porównanie systemów
            </h2>
            <button
              onClick={handleClose}
              className="w-[30px] h-[30px] flex items-center justify-center rounded-full bg-[#ffffff] shadow-sm active:scale-95 transition-transform"
              aria-label="Zamknij"
            >
              <X className="w-5 h-5 text-[#1d1d1f]" />
            </button>
          </div>

          {/* System headers */}
          <div className="grid gap-x-4" 
            style={{ 
              gridTemplateColumns: `minmax(120px, 1fr) repeat(${systems.length}, minmax(100px, 1fr))` 
            }}>
            <div className="p-2"></div>
            {systems.map((system) => (
              <div 
                key={system.id}
                className="p-2 text-center"
              >
                <h3 className="text-[13px] sm:text-[15px] md:text-[17px] font-semibold text-[#1d1d1f] tracking-[-0.01em] truncate">
                  {system.name}
                </h3>
                <p className="text-[11px] sm:text-[13px] text-[#86868b] mt-1 truncate">
                  {system.vendor}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto overscroll-bounce px-4 md:px-6" 
          style={{ maxHeight: 'calc(100vh - 180px)' }}>
          {categories.map((category) => {
            const isExpanded = expandedCategories.includes(category.id);
            const Icon = category.icon;
            
            return (
              <div key={category.id} className="mb-3">
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full px-4 py-3 bg-white rounded-[14px] shadow-sm flex items-center justify-between 
                    active:bg-[#F5F5F7] transition-colors duration-150"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-[22px] h-[22px] text-[#007AFF]" />
                    <h3 className="text-[15px] md:text-[17px] font-semibold text-[#1d1d1f] tracking-[-0.01em]">
                      {category.title}
                    </h3>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-[#86868b]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#86868b]" />
                  )}
                </button>

                {isExpanded && (
                  <div className="mt-2 bg-white rounded-[14px] shadow-sm overflow-hidden">
                    {category.items.map((item, index) => (
                      <div 
                        key={item.id} 
                        className={`${index !== 0 ? 'border-t border-[#d2d2d7]/30' : ''}`}
                      >
                        <div className="grid gap-x-4" 
                          style={{ 
                            gridTemplateColumns: `minmax(120px, 1fr) repeat(${systems.length}, minmax(100px, 1fr))` 
                          }}>
                          {/* Feature description */}
                          <div className="p-4 border-r border-[#d2d2d7]/30">
                            <h4 className="text-[13px] sm:text-[15px] font-semibold text-[#1d1d1f]">
                              {item.label}
                            </h4>
                            <p className="text-[11px] sm:text-[13px] text-[#86868b] mt-0.5">
                              {item.description}
                            </p>
                          </div>

                          {/* System values */}
                          {systems.map((system, systemIndex) => {
                            const value = item.getValue(system);
                            const formattedValue = formatValue(value);
                            
                            return (
                              <div 
                                key={`${system.id}-${item.id}`}
                                className={`p-4 flex items-center justify-center
                                  ${systemIndex < systems.length - 1 ? 'border-r border-[#d2d2d7]/30' : ''}`}
                              >
                                <div className="text-[11px] sm:text-[13px] md:text-[15px] text-[#1d1d1f] text-center break-words">
                                  {formattedValue === 'Tak' && (
                                    <span className="text-[#34C759]">✓ Tak</span>
                                  )}
                                  {formattedValue === 'Nie' && (
                                    <span className="text-[#FF3B30]">× Nie</span>
                                  )}
                                  {formattedValue !== 'Tak' && formattedValue !== 'Nie' && formattedValue}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          
          <div className="h-[env(safe-area-inset-bottom)]" />
        </div>
      </div>
    </div>
  );
};

export default ComparisonModal;