import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Trash2,
  X,
  Loader2,
  AlertTriangle,
  UtensilsCrossed,
  Upload,
  Edit,
} from 'lucide-react';
import { CatalogService } from '../../services';
import { useSuccessMessage, useCategories } from '../../hooks';
import SuccessMessage from '../SuccessMessage';
import type {
  AddItemRequest,
  UpdateItemRequest,
  UpdateSubcategoryNameRequest,
  UpdateSubsectionNameRequest,
} from '../../types';

type ModalType =
  | 'item'
  | 'editItem'
  | 'editSubcategory'
  | 'editSubsection'
  | null;

interface MenuManagementProps {
  onBack: () => void;
}

const MenuManagement: React.FC<MenuManagementProps> = ({}) => {
  // Usar el hook optimizado de categorías
  const {
    categories,
    isLoading: categoriesLoading,
    error: categoriesError,
    refetch,
  } = useCategories();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const {
    isVisible: successVisible,
    message: successMessage,
    showSuccess,
    hideSuccess,
  } = useSuccessMessage();

  // Modal states
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');

  // Edit states
  const [editingItem, setEditingItem] = useState<{
    categoryId: string;
    subcategoryName: string;
    subsectionName?: string;
    itemName: string;
  } | null>(null);

  const [editingSubcategory, setEditingSubcategory] = useState<{
    categoryId: string;
    oldName: string;
  } | null>(null);

  const [editingSubsection, setEditingSubsection] = useState<{
    categoryId: string;
    subcategoryName: string;
    oldName: string;
  } | null>(null);

  // Form states
  const [itemForm, setItemForm] = useState({
    name: '',
    description: '',
    price: '',
    subcategoryName: '',
    subsectionName: '',
  });

  const [nameForm, setNameForm] = useState({
    newName: '',
  });

  // Autocomplete states
  const [showSubcategoryDropdown, setShowSubcategoryDropdown] = useState(false);
  const [showSubsectionDropdown, setShowSubsectionDropdown] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    subcategory: '',
    subsection: '',
  });

  // Load categories on mount
  useEffect(() => {
    // Las categorías ya se cargan automáticamente con el hook
    // Solo necesitamos manejar errores si los hay
    if (categoriesError) {
      setError(categoriesError);
    }
  }, [categoriesError]);

  // Handle body scroll when modal is open
  useEffect(() => {
    if (modalType) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [modalType]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && modalType) {
        closeModal();
      }
    };

    if (modalType) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [modalType]);

  // Handle body scroll when modal is open
  useEffect(() => {
    if (modalType) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [modalType]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && modalType) {
        closeModal();
      }
    };

    if (modalType) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [modalType]);

  // Validate form fields when they change
  useEffect(() => {
    if (
      selectedCategoryId &&
      (itemForm.subcategoryName || itemForm.subsectionName)
    ) {
      updateValidationErrors();
    }
  }, [selectedCategoryId, itemForm.subcategoryName, itemForm.subsectionName]);

  const showMessage = (message: string, isError = false) => {
    if (isError) {
      setError(message);
      setTimeout(() => setError(''), 5000);
    } else {
      showSuccess(message);
    }
  };

  // Get available subcategories for a category
  const getAvailableSubcategories = (categoryId: string): string[] => {
    const category = categories.find((cat) => cat.id === categoryId);
    if (!category || !category.subcategories) return [];
    return category.subcategories.map((sub) => sub.name);
  };

  // Get available subsections for a subcategory
  const getAvailableSubsections = (
    categoryId: string,
    subcategoryName: string
  ): string[] => {
    const category = categories.find((cat) => cat.id === categoryId);
    if (!category || !category.subcategories) return [];

    const subcategory = category.subcategories.find(
      (sub) => sub.name === subcategoryName
    );
    if (!subcategory || !subcategory.subsections) return [];

    return subcategory.subsections.map((subsec) => subsec.name);
  };

  // Filter options based on search
  const filterOptions = (options: string[], search: string): string[] => {
    if (!search.trim()) return options;
    return options.filter((option) =>
      option.toLowerCase().includes(search.toLowerCase())
    );
  };

  // Validate if subcategory exists
  const validateSubcategory = (
    categoryId: string,
    subcategoryName: string
  ): boolean => {
    const availableSubcategories = getAvailableSubcategories(categoryId);
    return availableSubcategories.includes(subcategoryName);
  };

  // Validate if subsection exists
  const validateSubsection = (
    categoryId: string,
    subcategoryName: string,
    subsectionName: string
  ): boolean => {
    if (!subcategoryName || !subsectionName) return true; // Subsection is optional
    const availableSubsections = getAvailableSubsections(
      categoryId,
      subcategoryName
    );
    return availableSubsections.includes(subsectionName);
  };

  // Handle validation errors
  const updateValidationErrors = () => {
    const errors = { subcategory: '', subsection: '' };

    if (
      selectedCategoryId &&
      itemForm.subcategoryName &&
      itemForm.subcategoryName !== 'General'
    ) {
      if (!validateSubcategory(selectedCategoryId, itemForm.subcategoryName)) {
        errors.subcategory =
          'Esta subcategoría no existe en la categoría seleccionada';
      }
    }

    if (
      selectedCategoryId &&
      itemForm.subcategoryName &&
      itemForm.subsectionName
    ) {
      if (
        !validateSubsection(
          selectedCategoryId,
          itemForm.subcategoryName,
          itemForm.subsectionName
        )
      ) {
        errors.subsection =
          'Esta subsección no existe en la subcategoría seleccionada';
      }
    }

    setValidationErrors(errors);
    return !errors.subcategory && !errors.subsection;
  };

  // Item operations
  const openItemModal = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setItemForm({
      name: '',
      description: '',
      price: '',
      subcategoryName: '',
      subsectionName: '',
    });
    setModalType('item');

    // Reset autocomplete states
    setShowSubcategoryDropdown(false);
    setShowSubsectionDropdown(false);
    setValidationErrors({ subcategory: '', subsection: '' });
  };

  const saveItemHandler = async () => {
    // Validar antes de enviar
    if (!updateValidationErrors()) {
      showMessage('Por favor corrige los errores de validación', true);
      return;
    }

    try {
      setLoading(true);

      const itemData: AddItemRequest = {
        categoryId: selectedCategoryId,
        subcategoryName: itemForm.subcategoryName || 'General',
        subsectionName: itemForm.subsectionName || undefined,
        item: {
          name: itemForm.name,
          description: itemForm.description,
          price: parseFloat(itemForm.price),
        },
      };

      await CatalogService.addItem(itemData, undefined);
      showMessage('Producto agregado exitosamente');
      closeModal();
      await refetch(true);
    } catch (err: any) {
      // Mostrar mensaje específico si la subcategoría o subsección no existe
      const errorMessage = err.message || 'Error al agregar producto';
      if (
        errorMessage.toLowerCase().includes('subcategor') ||
        errorMessage.toLowerCase().includes('subsec') ||
        errorMessage.toLowerCase().includes('no existe')
      ) {
        const location = itemForm.subsectionName
          ? `subcategoría "${
              itemForm.subcategoryName || 'General'
            }" y subsección "${itemForm.subsectionName}"`
          : `subcategoría "${itemForm.subcategoryName || 'General'}"`;
        showMessage(
          `La ${location} no existe. Verifica el nombre o contacta al administrador.`,
          true
        );
      } else {
        showMessage(errorMessage, true);
      }
    } finally {
      setLoading(false);
    }
  };

  // Edit operations
  const openEditItemModal = (
    categoryId: string,
    subcategoryName: string,
    subsectionName: string | undefined,
    item: any
  ) => {
    setSelectedCategoryId(categoryId);
    setEditingItem({
      categoryId,
      subcategoryName,
      subsectionName,
      itemName: item.name,
    });
    setItemForm({
      name: item.name,
      description: item.description || '',
      price: item.price?.toString() || '',
      subcategoryName,
      subsectionName: subsectionName || '',
    });
    setModalType('editItem');

    // Reset autocomplete states
    setShowSubcategoryDropdown(false);
    setShowSubsectionDropdown(false);
    setValidationErrors({ subcategory: '', subsection: '' });
  };

  const openEditSubcategoryModal = (
    categoryId: string,
    subcategoryName: string
  ) => {
    setEditingSubcategory({ categoryId, oldName: subcategoryName });
    setNameForm({ newName: subcategoryName });
    setModalType('editSubcategory');
  };

  const openEditSubsectionModal = (
    categoryId: string,
    subcategoryName: string,
    subsectionName: string
  ) => {
    setEditingSubsection({
      categoryId,
      subcategoryName,
      oldName: subsectionName,
    });
    setNameForm({ newName: subsectionName });
    setModalType('editSubsection');
  };

  const saveEditItemHandler = async () => {
    if (!editingItem) return;

    // Validar antes de enviar
    if (!updateValidationErrors()) {
      showMessage('Por favor corrige los errores de validación', true);
      return;
    }

    try {
      setLoading(true);

      const updateData: UpdateItemRequest = {
        categoryId: editingItem.categoryId,
        subcategoryName: editingItem.subcategoryName,
        subsectionName: editingItem.subsectionName,
        itemName: editingItem.itemName,
        itemData: {
          name: itemForm.name,
          description: itemForm.description,
          price: parseFloat(itemForm.price),
        },
      };

      await CatalogService.updateItem(updateData, undefined);
      showMessage('Producto actualizado exitosamente');
      closeModal();
      await refetch(true);
    } catch (err: any) {
      showMessage(err.message || 'Error al actualizar producto', true);
    } finally {
      setLoading(false);
    }
  };

  const saveEditSubcategoryHandler = async () => {
    if (!editingSubcategory) return;

    try {
      setLoading(true);

      const updateData: UpdateSubcategoryNameRequest = {
        categoryId: editingSubcategory.categoryId,
        oldName: editingSubcategory.oldName,
        newName: nameForm.newName,
      };

      await CatalogService.updateSubcategoryName(updateData);
      showMessage('Subcategoría actualizada exitosamente');
      closeModal();
      await refetch(true);
    } catch (err: any) {
      showMessage(err.message || 'Error al actualizar subcategoría', true);
    } finally {
      setLoading(false);
    }
  };

  const saveEditSubsectionHandler = async () => {
    if (!editingSubsection) return;

    try {
      setLoading(true);

      const updateData: UpdateSubsectionNameRequest = {
        categoryId: editingSubsection.categoryId,
        subcategoryName: editingSubsection.subcategoryName,
        oldName: editingSubsection.oldName,
        newName: nameForm.newName,
      };

      await CatalogService.updateSubsectionName(updateData);
      showMessage('Subsección actualizada exitosamente');
      closeModal();
      await refetch(true);
    } catch (err: any) {
      showMessage(err.message || 'Error al actualizar subsección', true);
    } finally {
      setLoading(false);
    }
  };

  const deleteItemHandler = async (categoryId: string, itemName: string) => {
    if (!confirm(`¿Estás seguro de eliminar el producto "${itemName}"?`)) {
      return;
    }

    try {
      setLoading(true);
      await CatalogService.deleteItem(categoryId, itemName);
      showMessage('Producto eliminado exitosamente');
      await refetch(true);
    } catch (err: any) {
      showMessage(err.message || 'Error al eliminar producto', true);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedCategoryId('');
    setItemForm({
      name: '',
      description: '',
      price: '',
      subcategoryName: '',
      subsectionName: '',
    });

    // Reset edit states
    setEditingItem(null);
    setEditingSubcategory(null);
    setEditingSubsection(null);
    setNameForm({ newName: '' });

    // Reset autocomplete states
    setShowSubcategoryDropdown(false);
    setShowSubsectionDropdown(false);
    setValidationErrors({ subcategory: '', subsection: '' });
  };

  // Autocomplete component
  const AutocompleteInput: React.FC<{
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: string[];
    placeholder: string;
    error?: string;
    required?: boolean;
    onFocus?: () => void;
    onBlur?: () => void;
    showDropdown: boolean;
    onToggleDropdown: (show: boolean) => void;
  }> = ({
    label,
    value,
    onChange,
    options,
    placeholder,
    error,
    required = false,
    showDropdown,
    onToggleDropdown,
  }) => {
    const filteredOptions = filterOptions(options, value);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const blurTimeoutRef = React.useRef<number | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      onChange(newValue);

      // Keep focus on input after value change
      setTimeout(() => {
        if (inputRef.current && document.activeElement !== inputRef.current) {
          inputRef.current.focus();
        }
      }, 0);

      if (filteredOptions.length > 0) {
        onToggleDropdown(true);
      }
    };

    const handleOptionSelect = (option: string) => {
      onChange(option);
      onToggleDropdown(false);

      // Ensure input keeps focus after selection
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 0);
    };

    const handleInputFocus = () => {
      if (blurTimeoutRef.current) {
        clearTimeout(blurTimeoutRef.current);
        blurTimeoutRef.current = null;
      }
      if (filteredOptions.length > 0) {
        onToggleDropdown(true);
      }
    };

    const handleInputBlur = (e: React.FocusEvent) => {
      // Clear any existing timeout
      if (blurTimeoutRef.current) {
        clearTimeout(blurTimeoutRef.current);
      }

      // Set a timeout to close dropdown if focus leaves the container
      blurTimeoutRef.current = setTimeout(() => {
        // Check if the new focused element is within our container
        const relatedTarget = e.relatedTarget as Node;
        if (!containerRef.current?.contains(relatedTarget)) {
          onToggleDropdown(false);
        }
        blurTimeoutRef.current = null;
      }, 150);
    };

    const handleContainerMouseDown = (e: React.MouseEvent) => {
      // Prevent the input from losing focus when clicking on dropdown options
      const target = e.target as HTMLElement;
      if (target !== inputRef.current && target.tagName === 'BUTTON') {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    // Cleanup timeout on unmount
    React.useEffect(() => {
      return () => {
        if (blurTimeoutRef.current) {
          clearTimeout(blurTimeoutRef.current);
        }
      };
    }, []);

    // Maintain focus when value changes externally
    React.useEffect(() => {
      if (
        showDropdown &&
        inputRef.current &&
        document.activeElement !== inputRef.current
      ) {
        inputRef.current.focus();
      }
    }, [value, showDropdown]);

    // Handle click outside to close dropdown
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          onToggleDropdown(false);
        }
      };

      if (showDropdown) {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }
    }, [showDropdown, onToggleDropdown]);

    return (
      <div
        ref={containerRef}
        className="relative"
        onMouseDown={handleContainerMouseDown}
      >
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            className={`w-full px-3 py-2 bg-gray-800 border rounded-lg text-white focus:outline-none focus:ring-1 transition-colors ${
              error
                ? 'border-red-500 focus:border-red-400 focus:ring-red-400'
                : 'border-gray-600 focus:border-yellow-400 focus:ring-yellow-400'
            }`}
            placeholder={placeholder}
          />

          {showDropdown && filteredOptions.length > 0 && (
            <div className="absolute z-50 w-full mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-lg max-h-40 overflow-y-auto">
              {filteredOptions.map((option, index) => (
                <button
                  key={index}
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault(); // Prevent input blur
                    e.stopPropagation(); // Stop event bubbling
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleOptionSelect(option);
                  }}
                  className="w-full px-3 py-2 text-left text-white hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        {error && <p className="mt-1 text-sm text-red-400">{error}</p>}

        {options.length > 0 && !error && (
          <p className="mt-1 text-xs text-gray-500">
            Opciones disponibles: {options.join(', ')}
          </p>
        )}
      </div>
    );
  };

  const renderMessages = () => (
    <>
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center space-x-3"
          >
            <AlertTriangle className="text-red-400" size={20} />
            <span className="text-red-400">{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mb-6">
        <SuccessMessage
          message={successMessage}
          isVisible={successVisible}
          onClose={hideSuccess}
          size="md"
          position="relative"
        />
      </div>
    </>
  );

  const renderItemModal = () => {
    const modalContent = (
      <AnimatePresence>
        {modalType === 'item' && (
          <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={closeModal}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-gray-900 rounded-xl border border-gray-700 p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Nuevo Producto
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Agrega un producto a una subcategoría o subsección
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-gray-800"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nombre del producto
                  </label>
                  <input
                    type="text"
                    value={itemForm.name}
                    onChange={(e) =>
                      setItemForm((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                    placeholder="Nombre del producto"
                    autoFocus
                  />
                </div>

                <AutocompleteInput
                  label="Subcategoría"
                  value={itemForm.subcategoryName}
                  onChange={(value) => {
                    setItemForm((prev) => ({
                      ...prev,
                      subcategoryName: value,
                    }));
                  }}
                  options={getAvailableSubcategories(selectedCategoryId)}
                  placeholder="General"
                  error={validationErrors.subcategory}
                  showDropdown={showSubcategoryDropdown}
                  onToggleDropdown={setShowSubcategoryDropdown}
                />

                <AutocompleteInput
                  label="Subsección"
                  value={itemForm.subsectionName}
                  onChange={(value) => {
                    setItemForm((prev) => ({ ...prev, subsectionName: value }));
                  }}
                  options={getAvailableSubsections(
                    selectedCategoryId,
                    itemForm.subcategoryName || 'General'
                  )}
                  placeholder="Deja vacío si no hay subsección"
                  error={validationErrors.subsection}
                  showDropdown={showSubsectionDropdown}
                  onToggleDropdown={setShowSubsectionDropdown}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Precio (€)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={itemForm.price}
                    onChange={(e) =>
                      setItemForm((prev) => ({
                        ...prev,
                        price: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Descripción
                  </label>
                  <textarea
                    value={itemForm.description}
                    onChange={(e) =>
                      setItemForm((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 resize-none"
                    rows={3}
                    placeholder="Descripción del producto"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Imagen
                  </label>

                  <div className="border-2 border-dashed border-gray-700 rounded-lg p-4 text-center bg-gray-800/30">
                    <div className="flex flex-col items-center space-y-2 opacity-50">
                      <Upload className="text-gray-500" size={32} />
                      <div className="text-gray-500">
                        <p className="text-sm font-medium">
                          Deshabilitado por el momento
                        </p>
                        <p className="text-xs">
                          La carga de imágenes estará disponible próximamente
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={closeModal}
                    className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={saveItemHandler}
                    disabled={
                      loading ||
                      !itemForm.name ||
                      !itemForm.price ||
                      !!validationErrors.subcategory ||
                      !!validationErrors.subsection
                    }
                    className="flex-1 px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {loading ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Plus size={16} />
                    )}
                    <span className="ml-2">Agregar</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );

    return createPortal(modalContent, document.body);
  };

  const renderEditItemModal = () => {
    const modalContent = (
      <AnimatePresence>
        {modalType === 'editItem' && (
          <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={closeModal}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-gray-900 rounded-xl border border-gray-700 p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Editar Producto
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Modifica la información del producto
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-gray-800"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nombre del producto
                  </label>
                  <input
                    type="text"
                    value={itemForm.name}
                    onChange={(e) =>
                      setItemForm((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                    placeholder="Nombre del producto"
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Descripción
                  </label>
                  <textarea
                    value={itemForm.description}
                    onChange={(e) =>
                      setItemForm((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 resize-none"
                    rows={3}
                    placeholder="Descripción del producto"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Precio
                  </label>
                  <input
                    type="number"
                    value={itemForm.price}
                    onChange={(e) =>
                      setItemForm((prev) => ({
                        ...prev,
                        price: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Imagen
                  </label>

                  <div className="border-2 border-dashed border-gray-700 rounded-lg p-4 text-center bg-gray-800/30">
                    <div className="flex flex-col items-center space-y-2 opacity-50">
                      <Upload className="text-gray-500" size={32} />
                      <div className="text-gray-500">
                        <p className="text-sm font-medium">
                          Deshabilitado por el momento
                        </p>
                        <p className="text-xs">
                          La carga de imágenes estará disponible próximamente
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={closeModal}
                    className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={saveEditItemHandler}
                    disabled={loading || !itemForm.name || !itemForm.price}
                    className="flex-1 px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {loading ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Edit size={16} />
                    )}
                    <span className="ml-2">Actualizar</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );

    return createPortal(modalContent, document.body);
  };

  const renderEditNameModal = () => {
    const isSubcategory = modalType === 'editSubcategory';
    const isSubsection = modalType === 'editSubsection';

    if (!isSubcategory && !isSubsection) return null;

    const modalContent = (
      <AnimatePresence>
        {(modalType === 'editSubcategory' ||
          modalType === 'editSubsection') && (
          <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={closeModal}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-gray-900 rounded-xl border border-gray-700 p-6 shadow-2xl"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {isSubcategory
                      ? 'Editar Subcategoría'
                      : 'Editar Subsección'}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {isSubcategory
                      ? 'Modifica el nombre de la subcategoría'
                      : 'Modifica el nombre de la subsección'}
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-gray-800"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nuevo nombre
                  </label>
                  <input
                    type="text"
                    value={nameForm.newName}
                    onChange={(e) =>
                      setNameForm((prev) => ({
                        ...prev,
                        newName: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                    placeholder={
                      isSubcategory
                        ? 'Nombre de la subcategoría'
                        : 'Nombre de la subsección'
                    }
                    autoFocus
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={closeModal}
                    className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={
                      isSubcategory
                        ? saveEditSubcategoryHandler
                        : saveEditSubsectionHandler
                    }
                    disabled={loading || !nameForm.newName.trim()}
                    className="flex-1 px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {loading ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Edit size={16} />
                    )}
                    <span className="ml-2">Actualizar</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );

    return createPortal(modalContent, document.body);
  };

  if (categoriesLoading && categories.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-yellow-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Cargando menú...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 overflow-x-hidden">
      {renderMessages()}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Gestión del Menú
          </h3>
          <p className="text-gray-400 text-sm sm:text-base">
            Administra productos del menú
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 sm:p-6 overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <UtensilsCrossed className="text-yellow-400" size={24} />
                <div>
                  <h4 className="text-xl font-bold text-white">
                    {category.name}
                  </h4>
                  <p className="text-gray-400 text-sm">/{category.slug}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => openItemModal(category.id)}
                  className="p-2 text-green-400 hover:bg-green-500/10 rounded-lg transition-colors"
                  title="Agregar producto"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {category.subcategories?.map((subcategory) => (
                <div
                  key={subcategory.name}
                  className="border-l-2 border-yellow-400/30 pl-4"
                >
                  <div className="flex items-center justify-between mb-3 group">
                    <h5 className="text-lg font-semibold text-white">
                      {subcategory.name}
                    </h5>
                    <button
                      onClick={() =>
                        openEditSubcategoryModal(category.id, subcategory.name)
                      }
                      className="p-1 text-yellow-400 hover:bg-yellow-500/10 rounded opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all"
                      title="Editar subcategoría"
                    >
                      <Edit size={16} />
                    </button>
                  </div>

                  {/* Renderizar items directos de la subcategoría */}
                  {subcategory.items && subcategory.items.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-4">
                      {subcategory.items.map((item) => (
                        <div
                          key={item.name}
                          className="bg-gray-900/50 border border-gray-600 rounded-lg p-2.5 sm:p-3 group hover:border-gray-500 transition-colors min-w-0"
                        >
                          <div className="flex flex-col min-w-0">
                            <div className="flex items-start space-x-2 sm:space-x-3 mb-2 min-w-0">
                              {item.imageUrl && (
                                <img
                                  src={item.imageUrl}
                                  alt={item.name}
                                  className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-md border border-gray-500 shrink-0"
                                />
                              )}
                              <div className="flex-1 min-w-0 overflow-hidden">
                                <h6 className="font-medium text-white text-sm truncate">
                                  {item.name}
                                </h6>
                                {item.description && (
                                  <p className="text-gray-400 text-xs mt-0.5 line-clamp-2 wrap-break-word">
                                    {item.description}
                                  </p>
                                )}
                                <p className="text-yellow-400 font-bold text-sm mt-1.5">
                                  {item.price}€
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center justify-end space-x-1 pt-2 border-t border-gray-700 sm:border-0 sm:pt-0 sm:opacity-0 sm:group-hover:opacity-100 transition-all">
                              <button
                                onClick={() =>
                                  openEditItemModal(
                                    category.id,
                                    subcategory.name,
                                    undefined,
                                    item
                                  )
                                }
                                className="p-1.5 text-blue-400 hover:bg-blue-500/10 rounded"
                                title="Editar producto"
                              >
                                <Edit size={14} />
                              </button>
                              <button
                                onClick={() =>
                                  deleteItemHandler(category.id, item.name)
                                }
                                className="p-1.5 text-red-400 hover:bg-red-500/10 rounded"
                                title="Eliminar producto"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Renderizar subsecciones */}
                  {subcategory.subsections?.map((subsection) => (
                    <div
                      key={subsection.name}
                      className="border-l-2 border-blue-400/30 pl-4 mb-4"
                    >
                      <div className="flex items-center justify-between mb-2 group">
                        <h6 className="text-md font-medium text-blue-300">
                          {subsection.name}
                        </h6>
                        <button
                          onClick={() =>
                            openEditSubsectionModal(
                              category.id,
                              subcategory.name,
                              subsection.name
                            )
                          }
                          className="p-1 text-blue-400 hover:bg-blue-500/10 rounded opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all"
                          title="Editar subsección"
                        >
                          <Edit size={14} />
                        </button>
                      </div>

                      {subsection.items && subsection.items.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                          {subsection.items.map((item) => (
                            <div
                              key={item.name}
                              className="bg-gray-900/50 border border-gray-600 rounded-lg p-2.5 sm:p-3 group hover:border-gray-500 transition-colors min-w-0"
                            >
                              <div className="flex flex-col min-w-0">
                                <div className="flex items-start space-x-2 sm:space-x-3 mb-2 min-w-0">
                                  {item.imageUrl && (
                                    <img
                                      src={item.imageUrl}
                                      alt={item.name}
                                      className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-md border border-gray-500 shrink-0"
                                    />
                                  )}
                                  <div className="flex-1 min-w-0 overflow-hidden">
                                    <h6 className="font-medium text-white text-sm truncate">
                                      {item.name}
                                    </h6>
                                    {item.description && (
                                      <p className="text-gray-400 text-xs mt-0.5 line-clamp-2 wrap-break-word">
                                        {item.description}
                                      </p>
                                    )}
                                    <p className="text-yellow-400 font-bold text-sm mt-1.5">
                                      {item.price}€
                                    </p>
                                    <p className="text-blue-300 text-xs mt-1 truncate">
                                      en {subsection.name}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex items-center justify-end space-x-1 pt-2 border-t border-gray-700 sm:border-0 sm:pt-0 sm:opacity-0 sm:group-hover:opacity-100 transition-all">
                                  <button
                                    onClick={() =>
                                      openEditItemModal(
                                        category.id,
                                        subcategory.name,
                                        subsection.name,
                                        item
                                      )
                                    }
                                    className="p-1.5 text-blue-400 hover:bg-blue-500/10 rounded"
                                    title="Editar producto"
                                  >
                                    <Edit size={14} />
                                  </button>
                                  <button
                                    onClick={() =>
                                      deleteItemHandler(category.id, item.name)
                                    }
                                    className="p-1.5 text-red-400 hover:bg-red-500/10 rounded"
                                    title="Eliminar producto"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-4 text-gray-600">
                          <p className="text-sm">Subsección vacía</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}

              {(!category.subcategories ||
                category.subcategories.length === 0) && (
                <div className="text-center py-8 text-gray-500">
                  <UtensilsCrossed
                    size={32}
                    className="mx-auto mb-2 opacity-50"
                  />
                  <p>No hay productos en esta categoría</p>
                  <p className="text-xs mt-1">
                    Los productos pueden estar en subcategorías o subsecciones
                  </p>
                  <button
                    onClick={() => openItemModal(category.id)}
                    className="mt-2 text-yellow-400 hover:text-yellow-300 text-sm"
                  >
                    Agregar el primer producto
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {categories.length === 0 && !loading && (
          <div className="text-center py-20 text-gray-500">
            <UtensilsCrossed size={48} className="mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold mb-2">No hay categorías</h3>
            <p>Las categorías deben ser creadas desde el backend</p>
          </div>
        )}
      </div>

      {/* Render modals */}
      {renderItemModal()}
      {renderEditItemModal()}
      {renderEditNameModal()}
    </div>
  );
};

export default MenuManagement;
