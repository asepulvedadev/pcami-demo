import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  description: string;
  images: string[];
  features: string[];
  specifications: any[];
  sampleReviews: any[];
}

interface RelatedProduct {
  id: number;
  name: string;
  price: number;
  image: string;
}

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail implements OnInit {
  product: Product = {
    id: 1,
    name: 'NVIDIA RTX 4090 Gaming Graphics Card',
    price: 1599,
    oldPrice: 1799,
    discount: 11,
    rating: 4.8,
    reviews: 124,
    description: 'La tarjeta gráfica definitiva para gaming de ultra alta resolución. Con arquitectura Ada Lovelace de nueva generación, ofrece un rendimiento excepcional en juegos 4K, ray tracing y DLSS 3.',
    images: [
      'https://via.placeholder.com/600x400/bf00ff/ffffff?text=RTX+4090+Front',
      'https://via.placeholder.com/600x400/ff00ff/000000?text=RTX+4090+Back',
      'https://via.placeholder.com/600x400/00d4ff/000000?text=RTX+4090+Side',
      'https://via.placeholder.com/600x400/00ffff/000000?text=RTX+4090+Ports'
    ],
    features: [
      'Arquitectura Ada Lovelace',
      '24GB GDDR6X',
      'Ray Tracing de 3ª generación',
      'DLSS 3 con Frame Generation',
      'AV1 Encode/Decode',
      'Conectores: 3x DisplayPort 1.4a, 1x HDMI 2.1a'
    ],
    specifications: [
      {
        key: 'gpu',
        category: 'GPU',
        items: [
          { label: 'Arquitectura', value: 'Ada Lovelace' },
          { label: 'CUDA Cores', value: '16384' },
          { label: 'Tensor Cores', value: '512' },
          { label: 'RT Cores', value: '128' },
          { label: 'Frecuencia Base', value: '2235 MHz' },
          { label: 'Frecuencia Boost', value: '2520 MHz' }
        ]
      },
      {
        key: 'memory',
        category: 'Memoria',
        items: [
          { label: 'Tipo', value: 'GDDR6X' },
          { label: 'Capacidad', value: '24 GB' },
          { label: 'Bus', value: '384-bit' },
          { label: 'Velocidad', value: '21 Gbps' },
          { label: 'Ancho de banda', value: '1008 GB/s' }
        ]
      },
      {
        key: 'power',
        category: 'Alimentación',
        items: [
          { label: 'Conectores de alimentación', value: '3x 8-pin' },
          { label: 'Consumo recomendado', value: '850W' },
          { label: 'Consumo máximo', value: '450W' }
        ]
      }
    ],
    sampleReviews: [
      {
        author: 'Juan Gamer',
        rating: 5,
        date: '15 dic 2024',
        comment: 'Increíble rendimiento en Cyberpunk 2077 con DLSS activado. Los gráficos son espectaculares.'
      },
      {
        author: 'María Tech',
        rating: 4,
        date: '10 dic 2024',
        comment: 'Excelente tarjeta, pero requiere una buena fuente de alimentación. Recomiendo 1000W mínimo.'
      },
      {
        author: 'Carlos FPS',
        rating: 5,
        date: '5 dic 2024',
        comment: 'Los 144 FPS constantes en 4K son reales. Una bestia para gaming competitivo.'
      }
    ]
  };

  selectedImageIndex = 0;
  selectedImage = '';
  quantity = 1;
  isInWishlist = false;
  isZoomed = false;
  zoomPosition = 'center center';
  expandedSpecs: { [key: string]: boolean } = {};

  relatedProducts: RelatedProduct[] = [
    {
      id: 2,
      name: 'Teclado Mecánico RGB',
      price: 129,
      image: 'https://via.placeholder.com/300x200/ff00ff/000000?text=Mechanical+Keyboard'
    },
    {
      id: 3,
      name: 'Auriculares Gaming Pro',
      price: 89,
      image: 'https://via.placeholder.com/300x200/00d4ff/000000?text=Gaming+Headset'
    },
    {
      id: 4,
      name: 'Mouse Gaming 16000 DPI',
      price: 79,
      image: 'https://via.placeholder.com/300x200/00ffff/000000?text=Gaming+Mouse'
    }
  ];

  ratingBreakdown = [
    { stars: 5, count: 89, percentage: 72 },
    { stars: 4, count: 25, percentage: 20 },
    { stars: 3, count: 8, percentage: 6 },
    { stars: 2, count: 2, percentage: 2 },
    { stars: 1, count: 0, percentage: 0 }
  ];

  ngOnInit() {
    this.selectedImage = this.product.images[0];
  }

  selectImage(index: number) {
    this.selectedImageIndex = index;
    this.selectedImage = this.product.images[index];
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isZoomed) {
      const rect = (event.target as HTMLElement).getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      this.zoomPosition = `${x}% ${y}%`;
    }
  }

  toggleZoom() {
    this.isZoomed = !this.isZoomed;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  increaseQuantity() {
    if (this.quantity < 10) {
      this.quantity++;
    }
  }

  getDiscountPercentage(): number {
    if (this.product.oldPrice && this.product.price) {
      return Math.round(((this.product.oldPrice - this.product.price) / this.product.oldPrice) * 100);
    }
    return 0;
  }

  addToCart() {
    console.log(`Added ${this.quantity} x ${this.product.name} to cart`);
    // Implement cart functionality
  }

  toggleWishlist() {
    this.isInWishlist = !this.isInWishlist;
    console.log(`${this.isInWishlist ? 'Added to' : 'Removed from'} wishlist`);
  }

  toggleSpec(key: string) {
    this.expandedSpecs[key] = !this.expandedSpecs[key];
  }

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  getEmptyStars(rating: number): number[] {
    return Array(5 - Math.floor(rating)).fill(0);
  }

  viewProduct(productId: number) {
    console.log('Navigate to product:', productId);
    // Implement navigation
  }
}
