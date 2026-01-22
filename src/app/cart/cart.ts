import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  rating?: number;
  reviews?: number;
}

@Component({
  selector: 'app-cart',
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  constructor(private router: Router) {}

  cartItems: CartItem[] = [
    {
      id: 1,
      name: 'CABLE CYBERLINK MK-IV',
      price: 45,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQ27UHWCLRwgBYRaQ-JYOIogfNvQiKlkegpmoHR4OddwlFur6HoI3y-AqtgP8_N7fUUN3NsL2BNwaObvotq4ps_HXxV1SIKTykx6B-tWTNtZlOvHMN6HZc4oHNZ5QeP62nWaxblHdBPnpGLgBIPytzr41Q7avJC_1mqKQf63OU7el28iZmWg5UzGlbkvUmg6Pqs9yW73gqk7jvsrP7X0RkeB1sY40szCaS81_EFdwLO01jv3jBCBTJTt9j_k3SP_hdaR2fYuMQlEc',
      quantity: 1
    },
    {
      id: 2,
      name: 'POTENCIADOR NEURAL X8',
      price: 120,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtng0HZjs6YZ17p7ymixsyrNYX90aBKKo_qkQMQ_TYy5Lz0vMU-qC2O0cnYNSgrV2-NapCWTjo34gYrftEcKBS0qrgc-C19xQntRwKx2eZBj5jbKFwZnwUi6wM8HwZ5XUu1EpHfMDxVDkwMrXl9nBsJgziZW82mKDMiD6pAmsplQtwHJdW_GZbL7UFQuZ7eNNKA5znAW2mUIe-7XyCPG7IxJJ1B06vgFiDuilIClm4P7FjNRTxlnKrMC9TdMFO1iYmdkGzA6Mc0RU',
      quantity: 2
    },
    {
      id: 3,
      name: 'HOJA VOID-RUNNER',
      price: 850,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChLj-XOY7hIv1V_hoi79T3qBv9SoKQzK5f5oOrgWuXrdmIQGPwftBDfOmxePGee1paa6UJ1jxPn-M5lviqpLGLiyxTl2EGpJtekc7bhtmHRoeYVCi1I7CcOvPI4tocQmQcIw5VkaCpx49ZFHNyYJJKZAZN4YbMFNop3pd1YwksMxfHwhDTpTr4m6wKU82MNgqepKljc0HGuRReWF9CnU06pXbNtbOFL38TYNGFvDIhFzu4m1OKXkmuWB2b6Ax0ED8WGL_HAn2nIcA',
      quantity: 1
    }
  ];

  promoCode = '';
  promoApplied = false;
  promoDiscount = 0;

  ngOnInit() {
    // Initialize cart from service/storage
  }

  trackByItemId(index: number, item: CartItem): number {
    return item.id;
  }

  decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  increaseQuantity(item: CartItem) {
    if (item.quantity < 10) {
      item.quantity++;
    }
  }

  getItemTotal(item: CartItem): number {
    return item.price * item.quantity;
  }

  removeItem(item: CartItem) {
    const index = this.cartItems.indexOf(item);
    if (index > -1) {
      this.cartItems.splice(index, 1);
    }
  }

  getTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  getSubtotal(): number {
    return this.cartItems.reduce((total, item) => total + this.getItemTotal(item), 0);
  }

  getShippingCost(): number {
    const subtotal = this.getSubtotal();
    return subtotal >= 100 ? 0 : 15; // Free shipping over $100
  }

  getTotal(): number {
    const subtotal = this.getSubtotal();
    const shipping = this.getShippingCost();
    const discount = this.promoApplied ? subtotal * (this.promoDiscount / 100) : 0;
    return subtotal + shipping - discount;
  }

  applyPromoCode() {
    if (this.promoCode.toLowerCase() === 'gaming10') {
      this.promoApplied = true;
      this.promoDiscount = 10;
    } else if (this.promoCode.toLowerCase() === 'cyber20') {
      this.promoApplied = true;
      this.promoDiscount = 20;
    } else {
      this.promoApplied = false;
      this.promoDiscount = 0;
      alert('Código de promoción inválido');
    }
  }

  proceedToCheckout() {
    console.log('Proceeding to checkout...');
    // For now, just alert
    alert('Funcionalidad de pago próximamente');
  }

  continueShopping() {
    console.log('Continue shopping...');
    // Implement navigation to shop
  }

  goToShop() {
    console.log('Go to shop...');
    // Implement navigation to shop
  }

  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  getEmptyStars(rating: number): number[] {
    return Array(5 - Math.floor(rating)).fill(0);
  }
}
