import { useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import BookCard from './BookCard';
import { Link } from 'react-router-dom';

export function BookCarousel({
  title,
  subtitle,
  books,
  isLoading,
  error,
  onAddToCart,
  viewAllLink,
}) {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -420, behavior: 'smooth' });
  };

  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 420, behavior: 'smooth' });
  };

  // Hide entire section on error with no books, or done loading with no books
  if (error && (!books || books.length === 0)) return null;
  if (!isLoading && (!books || books.length === 0)) return null;

  return (
    <section className="py-14 even:bg-white odd:bg-slate-50/60">
      <div className="container mx-auto px-4">

        {/* Section header */}
        <div className="flex items-end justify-between mb-8">
          <div className="flex items-start gap-3">
            {/* Accent bar */}
            <div className="w-1 h-10 rounded-full bg-gradient-to-b from-blue-600 to-indigo-600 mt-0.5 flex-shrink-0" />
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight">
                {title}
              </h2>
              {subtitle && (
                <p className="text-slate-500 text-sm mt-1">{subtitle}</p>
              )}
            </div>
          </div>

          {viewAllLink && (
            <Link
              to={viewAllLink}
              className="flex items-center gap-1.5 text-sm font-semibold text-blue-600
                         border border-blue-200 rounded-full px-4 py-1.5
                         hover:bg-blue-600 hover:text-white hover:border-blue-600
                         transition-all duration-200 flex-shrink-0"
            >
              View All
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>

        {/* Carousel */}
        <div className="relative group">
          {/* Left scroll button */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10
                       hidden group-hover:flex items-center justify-center
                       w-10 h-10 bg-white rounded-full shadow-lg border border-slate-100
                       text-slate-600 hover:text-blue-600 hover:shadow-xl
                       transition-all duration-200"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Scroll container — scrollbar hidden */}
          <div
            ref={scrollRef}
            className="flex gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            {isLoading
              ? Array.from({ length: 6 }).map((_, idx) => (
                  <div
                    key={`skeleton-${idx}`}
                    className="min-w-[200px] sm:min-w-[220px] snap-start flex-shrink-0 rounded-2xl overflow-hidden border border-slate-100 bg-white"
                    style={{ height: '352px' }}
                  >
                    {/* Image skeleton */}
                    <div className="h-56 skeleton" />
                    {/* Text skeleton */}
                    <div className="p-3.5 space-y-2">
                      <div className="h-3.5 skeleton rounded-lg" />
                      <div className="h-3.5 w-2/3 skeleton rounded-lg" />
                      <div className="flex justify-between mt-3 items-center">
                        <div className="h-4 w-16 skeleton rounded-lg" />
                        <div className="h-8 w-8 skeleton rounded-xl" />
                      </div>
                    </div>
                  </div>
                ))
              : books && books.length > 0
                ? books.map((book, idx) => (
                    <div
                      key={book?.id || `fallback-${idx}`}
                      className="min-w-[200px] sm:min-w-[210px] w-[200px] sm:w-[210px] snap-start flex-shrink-0"
                      style={{ height: '352px' }}
                    >
                      <BookCard book={book} onAddToCart={onAddToCart} />
                    </div>
                  ))
                : null
            }
          </div>

          {/* Right scroll button */}
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10
                       hidden group-hover:flex items-center justify-center
                       w-10 h-10 bg-white rounded-full shadow-lg border border-slate-100
                       text-slate-600 hover:text-blue-600 hover:shadow-xl
                       transition-all duration-200"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
