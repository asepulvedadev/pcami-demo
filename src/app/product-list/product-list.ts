import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../cart.service';

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  isNew: boolean;
  discount: boolean;
  category: string;
  brand: string;
}

interface Category {
  id: string;
  name: string;
}

interface Brand {
  id: string;
  name: string;
}

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {
  private cartService = inject(CartService);

  isFiltersOpen = false;
  priceRange = { min: 0, max: 2000 };
  minRating = 0;
  sortBy = 'name';
  currentPage = 1;
  itemsPerPage = 12;

  categories: Category[] = [
    { id: 'pcs', name: 'PCs Gaming' },
    { id: 'peripherals', name: 'Periféricos' },
    { id: 'accessories', name: 'Accesorios' },
    { id: 'components', name: 'Componentes' }
  ];

  brands: Brand[] = [
    { id: 'nvidia', name: 'NVIDIA' },
    { id: 'amd', name: 'AMD' },
    { id: 'corsair', name: 'Corsair' },
    { id: 'logitech', name: 'Logitech' },
    { id: 'razer', name: 'Razer' }
  ];

  selectedCategories: { [key: string]: boolean } = {};
  selectedBrands: { [key: string]: boolean } = {};

  products: Product[] = [
    {
      id: 1,
      name: 'NVIDIA RTX 4090',
      price: 1599,
      image: 'https://via.placeholder.com/300x200/bf00ff/ffffff?text=RTX+4090',
      rating: 4.8,
      reviews: 124,
      isNew: true,
      discount: false,
      category: 'components',
      brand: 'nvidia'
    },
    {
      id: 2,
      name: 'Teclado Mecánico RGB',
      price: 129,
      oldPrice: 159,
      image: 'https://via.placeholder.com/300x200/ff00ff/000000?text=Mechanical+Keyboard',
      rating: 5.0,
      reviews: 89,
      isNew: false,
      discount: true,
      category: 'peripherals',
      brand: 'corsair'
    },
    {
      id: 3,
      name: 'Auriculares Gaming Pro',
      price: 89,
      image: 'https://via.placeholder.com/300x200/00d4ff/000000?text=Gaming+Headset',
      rating: 4.7,
      reviews: 156,
      isNew: false,
      discount: false,
      category: 'accessories',
      brand: 'logitech'
    },
    {
      id: 4,
      name: 'Mouse Gaming 16000 DPI',
      price: 79,
      image: 'https://via.placeholder.com/300x200/00ffff/000000?text=Gaming+Mouse',
      rating: 4.9,
      reviews: 203,
      isNew: true,
      discount: false,
      category: 'peripherals',
      brand: 'razer'
    },
    {
      id: 5,
      name: 'Monitor Gaming 144Hz',
      price: 299,
      image: 'https://via.placeholder.com/300x200/39ff14/000000?text=Gaming+Monitor',
      rating: 4.6,
      reviews: 78,
      isNew: false,
      discount: false,
      category: 'accessories',
      brand: 'amd'
    },
    {
      id: 6,
      name: 'PC Gaming Completo',
      price: 1299,
      image: 'https://via.placeholder.com/300x200/00ff41/000000?text=Gaming+PC',
      rating: 4.5,
      reviews: 45,
      isNew: true,
      discount: false,
      category: 'pcs',
      brand: 'nvidia'
    }
  ];

  filteredProducts: Product[] = [];
  paginatedProducts: Product[] = [];
  totalPages = 1;

  ngOnInit() {
    this.filteredProducts = [...this.products];
    this.updatePagination();
  }

  toggleFilters() {
    this.isFiltersOpen = !this.isFiltersOpen;
  }

  setMinRating(rating: number) {
    this.minRating = rating;
  }

  applyFilters() {
    this.filteredProducts = this.products.filter(product => {
      const priceMatch = product.price >= this.priceRange.min && product.price <= this.priceRange.max;
      const ratingMatch = product.rating >= this.minRating;
      const categoryMatch = Object.keys(this.selectedCategories).length === 0 ||
                           this.selectedCategories[product.category];
      const brandMatch = Object.keys(this.selectedBrands).length === 0 ||
                        this.selectedBrands[product.brand];

      return priceMatch && ratingMatch && categoryMatch && brandMatch;
    });

    this.currentPage = 1;
    this.updatePagination();
  }

  clearFilters() {
    this.priceRange = { min: 0, max: 2000 };
    this.minRating = 0;
    this.selectedCategories = {};
    this.selectedBrands = {};
    this.filteredProducts = [...this.products];
    this.currentPage = 1;
    this.updatePagination();
  }

  sortProducts() {
    switch (this.sortBy) {
      case 'price-low':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        this.filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        this.filteredProducts.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    }
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  getPages(): number[] {
    const pages: number[] = [];
    const maxPages = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxPages / 2));
    let endPage = Math.min(this.totalPages, startPage + maxPages - 1);

    if (endPage - startPage + 1 < maxPages) {
      startPage = Math.max(1, endPage - maxPages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  getEmptyStars(rating: number): number[] {
    return Array(5 - Math.floor(rating)).fill(0);
  }

  quickView(product: Product) {
    // Implement quick view modal
    console.log('Quick view:', product);
  }

  addToCart(product: Product) {
    // Implement add to cart
    console.log('Add to cart:', product);
    this.openCart();
  }

  openCart() {
    this.cartService.openCart();
  }
}
