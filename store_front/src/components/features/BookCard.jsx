import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Loader2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import bookService from '../../services/bookService';
import { formatCurrency } from '../../utils/format';

function BookCard({ book }) {
  const { addToCart } = useCart();
  const toast = useToast();

  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  // Separate loading state for the cart action (includes SKU fetch)
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const imageSrc = book.image || book.imageUrl;

  /*
   * The list API (mapBookList) does NOT return SKUs.
   * We must call getBookById() first to get the default SKU id,
   * then pass that skuId to addToCart — the API requires a skuId, not a bookId.
   */
  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isAddingToCart) return;
    setIsAddingToCart(true);

    try {
      const bookDetail = await bookService.getBookById(book.id);
      const defaultSku = bookDetail.skus.find((s) => s.isDefault) || bookDetail.skus[0];

      if (!defaultSku) {
        toast.info('This book has no purchasable version yet.');
        return;
      }

      if (!defaultSku.inStock) {
        toast.info('This book is currently out of stock.');
        return;
      }

      await addToCart(defaultSku.id, 1);
      toast.success(`"${book.title}" added to cart.`);
    } catch (err) {
      toast.error(err.message || 'Could not add to cart.');
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <Link
      to={`/books/${book.id}`}
      className="group bg-white rounded-2xl border border-slate-100 shadow-sm
                 hover:shadow-lg hover:-translate-y-1
                 transition-all duration-300 flex flex-col overflow-hidden h-full"
    >
      {/* Book cover image */}
      <div className="relative h-56 bg-slate-50 overflow-hidden flex-shrink-0">
        {/* Shimmer placeholder */}
        {!imgLoaded && !imgError && (
          <div className="absolute inset-0 skeleton" />
        )}

        {/* Fallback icon */}
        {imgError && (
          <div className="absolute inset-0 flex items-center justify-center text-slate-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
        )}

        {imageSrc && (
          <img
            src={imageSrc}
            alt={book.title}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            className={`absolute inset-0 w-full h-full object-contain p-2
                        group-hover:scale-[1.04] transition-transform duration-500
                        ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        )}

        {/* Category chip — show first category if available */}
        {book.categories?.[0]?.name && (
          <div className="absolute top-2 left-2">
            <span className="bg-white/90 backdrop-blur-sm text-slate-600 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-slate-100 shadow-sm">
              {book.categories[0].name}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3.5 flex flex-col flex-1">
        <h3 className="font-semibold text-slate-800 text-sm line-clamp-2 leading-snug mb-auto">
          {book.title}
        </h3>

        <div className="flex items-center justify-between gap-2 mt-3 flex-shrink-0">
          <span className="text-blue-600 font-bold text-sm">
            {formatCurrency(book.price ?? book.basePrice ?? 0)}
          </span>

          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            title={isAddingToCart ? 'Adding...' : 'Add to cart'}
            className="p-2 rounded-xl bg-blue-50 text-blue-600
                       hover:bg-blue-600 hover:text-white
                       disabled:opacity-60 disabled:cursor-not-allowed
                       transition-all duration-200 flex-shrink-0 shadow-sm hover:shadow-md"
          >
            {isAddingToCart
              ? <Loader2 className="w-4 h-4 animate-spin" />
              : <ShoppingCart className="w-4 h-4" />
            }
          </button>
        </div>
      </div>
    </Link>
  );
}

export default BookCard;
