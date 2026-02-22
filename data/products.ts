import { Product } from '../store/cartSlice';

export const sampleProducts: Product[] = [
  // ============================================
  // ✨ CASHMERE - كشمير
  // ============================================
  {
    id: 'cs1',
    name: 'وشاح كشمير أسود ملكي',
    nameEn: 'Royal Black Cashmere Scarf',
    price: 1200.00,
    image: '/images/Black-Crepe-Shayla-Hijab-600x600.jpg',
    
    category: 'cashmere',
    
    description: 'وشاح من الكشمير الصافي 100% بلون أسود فاخر لمظهر أنيق وجذاب.',
    descriptionEn: '100% pure cashmere scarf in a luxury black color for an elegant and attractive look.',
    brand: 'Taj Scarf',
    stock: 50,
    unit: 'Piece',
    rating: 4.8,
    reviews: 12
  },
  {
    id: 'cs2',
    name: 'وشاح كشمير رمادي فضي',
    nameEn: 'Silver Gray Cashmere Scarf',
    price: 1100.00,
    image: '/images/smoky-hijab-scarf-1new.jpg',
    category: 'cashmere',
    description: 'وشاح كشمير ناعم جداً بدرجة الرمادي الفضي المميزة، مثالي للمناسبات الرسمية.',
    descriptionEn: 'Very soft cashmere scarf in a distinctive silver gray shade, perfect for formal occasions.',
    brand: 'Taj Scarf',
    stock: 35,
    unit: 'Piece',
    rating: 4.9,
    reviews: 8
  },
  {
    id: 'cs3',
    name: 'وشاح كشمير منقوش فاخر',
    nameEn: 'Luxury Printed Cashmere Scarf',
    price: 1350.00,
    image: '/images/voal_scarf_printed.jpg',
    category: 'cashmere',
    description: 'وشاح كشمير مزين بنقوش عربية أصيلة لإطلالة تجمع بين التراث والحداثة.',
    descriptionEn: 'Cashmere scarf decorated with authentic Arabic patterns for a look that combines heritage and modernity.',
    brand: 'Taj Scarf',
    stock: 20,
    unit: 'Piece',
    rating: 4.7,
    reviews: 15
  },

  // ============================================
  // ✨ SILK - حرير
  // ============================================
  {
    id: 'sl1',
    name: 'وشاح حرير أخضر زمردي',
    nameEn: 'Emerald Green Silk Scarf',
    price: 850.00,
    image: '/images/green-scarf-chiffon-1.jpg',
    


    category: 'silk',
    description: 'وشاح من الحرير الطبيعي بلون أخضر زمردي خلاب يضفي لمسة من الحيوية على ملابسك.',
    descriptionEn: 'Natural silk scarf in a stunning emerald green that adds a touch of vitality to your outfits.',
    brand: 'Taj Scarf',
    stock: 45,
    unit: 'Piece',
    rating: 4.6,
    reviews: 20
  },
  {
    id: 'sl2',
    name: 'طرحة حرير لامعة',
    nameEn: 'Shiny Silk Hijab',
    price: 750.00,
    image: '/images/ce40cb388feff703e5edbb8d92c7b89e.jpg',
    category: 'silk',
    description: 'طرحة من الحرير الناعم بلمعة هادئة تعكس الرقي والفخامة.',
    descriptionEn: 'Soft silk hijab with a quiet shine that reflects elegance and luxury.',
    brand: 'Taj Scarf',
    stock: 60,
    unit: 'Piece',
    rating: 4.5,
    reviews: 18
  },

  // ============================================
  // ✨ WOOL - صوف
  // ============================================
  {
    id: 'wl1',
    name: 'سكارف صوف شتوي ثقيل',
    nameEn: 'Heavy Winter Wool Scarf',
    price: 550.00,
    image: '/images/bb8ec105-367f-487a-adab-8b4dd1a63522.jpg',
    category: 'wool',
    description: 'وشاح صوف دافئ جداً مصمم للأجواء الباردة مع لمسات عصرية.',
    descriptionEn: 'Very warm wool scarf designed for cold weather with modern touches.',
    brand: 'Taj Scarf',
    stock: 100,
    unit: 'Piece',
    rating: 4.8,
    reviews: 25
  },

  // ============================================
  // ✨ PASHMINA - باشمينا
  // ============================================
  {
    id: 'ps1',
    name: 'شال باشمينا يدوي فاخر',
    nameEn: 'Luxury Handmade Pashmina Shawl',
    price: 2500.00,
    image: '/images/batch_C.H._Feb_13_2025_65526_6e2a620b-3d08-46fd-a9b5-8158b1561969_1645x.webp',
    category: 'pashmina',
    description: 'شال باشمينا مصنوع يدوياً بكل حب، قطعة فنية فريدة تناسب مقتنيي الفخامة.',
    descriptionEn: 'Handmade pashmina shawl made with love, a unique piece of art for luxury collectors.',
    brand: 'Taj Scarf',
    stock: 10,
    unit: 'Piece',
    rating: 5.0,
    reviews: 5
  },
  {
    id: 'cs1',
    name: 'وشاح كشمير أسود ملكي',
    nameEn: 'Royal Black Cashmere Scarf',
    price: 1200.00,
    image: '/images/Black-Crepe-Shayla-Hijab-600x600.jpg',
    category: 'cashmere',
    description: 'وشاح من الكشمير الصافي 100% بلون أسود فاخر لمظهر أنيق وجذاب.',
    descriptionEn: '100% pure cashmere scarf in a luxury black color for an elegant and attractive look.',
    brand: 'Taj Scarf',
    stock: 50,
    unit: 'Piece',
    rating: 4.8,
    reviews: 12
  },
  {
    id: 'cs2',
    name: 'وشاح كشمير رمادي فضي',
    nameEn: 'Silver Gray Cashmere Scarf',
    price: 1100.00,
    image: '/images/smoky-hijab-scarf-1new.jpg',
    category: 'cashmere',
    description: 'وشاح كشمير ناعم جداً بدرجة الرمادي الفضي المميزة، مثالي للمناسبات الرسمية.',
    descriptionEn: 'Very soft cashmere scarf in a distinctive silver gray shade, perfect for formal occasions.',
    brand: 'Taj Scarf',
    stock: 35,
    unit: 'Piece',
    rating: 4.9,
    reviews: 8
  },
  {
    id: 'cs3',
    name: 'وشاح كشمير منقوش فاخر',
    nameEn: 'Luxury Printed Cashmere Scarf',
    price: 1350.00,
    image: '/images/voal_scarf_printed.jpg',
    category: 'cashmere',
    description: 'وشاح كشمير مزين بنقوش عربية أصيلة لإطلالة تجمع بين التراث والحداثة.',
    descriptionEn: 'Cashmere scarf decorated with authentic Arabic patterns for a look that combines heritage and modernity.',
    brand: 'Taj Scarf',
    stock: 20,
    unit: 'Piece',
    rating: 4.7,
    reviews: 15
  },

  // ============================================
  // ✨ SILK - حرير
  // ============================================
  {
    id: 'sl1',
    name: 'وشاح حرير أخضر زمردي',
    nameEn: 'Emerald Green Silk Scarf',
    price: 850.00,
    image: '/images/green-scarf-chiffon-1.jpg',
    category: 'silk',
    description: 'وشاح من الحرير الطبيعي بلون أخضر زمردي خلاب يضفي لمسة من الحيوية على ملابسك.',
    descriptionEn: 'Natural silk scarf in a stunning emerald green that adds a touch of vitality to your outfits.',
    brand: 'Taj Scarf',
    stock: 45,
    unit: 'Piece',
    rating: 4.6,
    reviews: 20
  },
  {
    id: 'sl2',
    name: 'طرحة حرير لامعة',
    nameEn: 'Shiny Silk Hijab',
    price: 750.00,
    image: '/images/ce40cb388feff703e5edbb8d92c7b89e.jpg',
    category: 'silk',
    description: 'طرحة من الحرير الناعم بلمعة هادئة تعكس الرقي والفخامة.',
    descriptionEn: 'Soft silk hijab with a quiet shine that reflects elegance and luxury.',
    brand: 'Taj Scarf',
    stock: 60,
    unit: 'Piece',
    rating: 4.5,
    reviews: 18
  },

  // ============================================
  // ✨ WOOL - صوف
  // ============================================
  {
    id: 'wl1',
    name: 'سكارف صوف شتوي ثقيل',
    nameEn: 'Heavy Winter Wool Scarf',
    price: 550.00,
    image: '/images/bb8ec105-367f-487a-adab-8b4dd1a63522.jpg',
    category: 'wool',
    description: 'وشاح صوف دافئ جداً مصمم للأجواء الباردة مع لمسات عصرية.',
    descriptionEn: 'Very warm wool scarf designed for cold weather with modern touches.',
    brand: 'Taj Scarf',
    stock: 100,
    unit: 'Piece',
    rating: 4.8,
    reviews: 25
  },

  // ============================================
  // ✨ PASHMINA - باشمينا
  // ============================================
  {
    id: 'ps1',
    name: 'شال باشمينا يدوي فاخر',
    nameEn: 'Luxury Handmade Pashmina Shawl',
    price: 2500.00,
    image: '/images/batch_C.H._Feb_13_2025_65526_6e2a620b-3d08-46fd-a9b5-8158b1561969_1645x.webp',
    category: 'pashmina',
    description: 'شال باشمينا مصنوع يدوياً بكل حب، قطعة فنية فريدة تناسب مقتنيي الفخامة.',
    descriptionEn: 'Handmade pashmina shawl made with love, a unique piece of art for luxury collectors.',
    brand: 'Taj Scarf',
    stock: 10,
    unit: 'Piece',
    rating: 5.0,
    reviews: 5
  }
];

export const categories = [
  { id: 'cashmere', name: 'كشمير', nameEn: 'Cashmere', icon: '🧣' },
  { id: 'silk', name: 'حرير', nameEn: 'Silk', icon: '✨' },
  { id: 'wool', name: 'صوف', nameEn: 'Wool', icon: '🐑' },
  { id: 'pashmina', name: 'باشمينا', nameEn: 'Pashmina', icon: '💎' },
];

export const getProductById = (id: string) => {
  return sampleProducts.find(p => p.id === id);
};

export const getProductsByCategory = (category: string) => {
  return sampleProducts.filter(p => p.category === category);
};
