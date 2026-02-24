import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ 
  currentPage, 
  totalPages, 
  itemsPerPage, 
  totalItems,
  onPageChange,
  onItemsPerPageChange 
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    
    return pages;
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border-t">
      <div className="text-sm text-gray-600">
        Showing <span className="font-semibold">{startItem}-{endItem}</span> of{" "}
        <span className="font-semibold">{totalItems}</span> results
      </div>
      
      <div className="flex items-center gap-4">
        {/* <select 
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className="px-3 py-1.5 border rounded-lg text-sm"
        >
          {/* <option value={10}>10 / page</option>
          <option value={25}>25 / page</option>
          <option value={50}>50 / page</option> }
        </select> */}
        
        <nav className="flex items-center gap-1">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          {getPageNumbers().map((page, index) => (
            page === '...' ? (
              <span key={index} className="px-2 text-gray-400">...</span>
            ) : (
              <button
                key={index}
                onClick={() => onPageChange(page)}
                className={`w-8 h-8 rounded-lg text-sm font-medium ${
                  currentPage === page
                    ? 'bg-indigo-600 text-white'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                {page}
              </button>
            )
          ))}
          
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Pagination;