import bcrypt from 'bcryptjs'

import { Category, Product, User, SubCategory } from "@/interfaces";
import { AuthProvider, Size, UserRole } from '@/constants'

export const users: Omit<User, '_id' | 'favoriteProductIds' | 'cartProducts'>[] = [
  {
    email: 'developaul@gmail.com',
    firstName: 'developaul',
    lastName: 'developaul',
    password: bcrypt.hashSync('123456'),
    provider: AuthProvider.Credentials,
    role: UserRole.Admin
  }
]

export const categories: Category[] = [
  {
    _id: '651b753810d9e656c8a1b1b3',
    title: 'Damas',
    icon: '/assets/icons/category/women.svg',
    slug: 'mujer',
    image: '/assets/images/products/8765115-00-A_0_2000.jpg'
  },
  {
    _id: '651b7558caf530c9616e3829',
    title: 'Caballeros',
    icon: '/assets/icons/category/men.svg',
    slug: 'hombre',
    image: '/assets/images/category/pantalones.svg'
  },
  {
    _id: '651b755ed396a85c52addd07',
    title: 'Niños',
    icon: '/assets/icons/category/kid.svg',
    slug: 'ninos',
    image: '/assets/images/products/1473809-00-A_1_2000.jpg'
  },
  {
    _id: '651b7562ab11d642cd24c945',
    title: 'Bebés',
    icon: '/assets/icons/category/baby.svg',
    slug: 'bebes',
    image: '/assets/images/products/1740417-00-A_0_2000.jpg'
  }
]

export const subCategories: SubCategory[] = [
  {
    _id: '651b75732b1d8326798aeb5b',
    title: 'Medias',
    slug: 'medias',
    image: '/assets/images/subCategory/medias.jpg'
  },
  {
    _id: '651b7576fa976e7f116ff427',
    title: 'Camisetas',
    slug: 'camisetas',
    image: '/assets/images/subCategory/camiseta.jpg'
  },
  {
    _id: '651b757bb472b340cf38c81a',
    title: 'Gorras',
    slug: 'gorras',
    image: '/assets/images/subCategory/gorra.jpg'
  },
  {
    _id: '651b81252f07d89b7d021584',
    title: 'Sudadera con capucha',
    slug: 'sudadera-con-capucha',
    image: '/assets/images/subCategory/gorra.jpg'
  }
]

export const products: Omit<Product, '_id' | 'category' | 'subCategory'>[] = [
  {
    description: "Introducing the Tesla Chill Collection. The Men’s Chill Crew Neck Sweatshirt has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The sweatshirt features a subtle thermoplastic polyurethane T logo on the chest and a Tesla wordmark below the back collar. Made from 60% cotton and 40% recycled polyester.",
    images: [
      '/assets/images/products/1740176-00-A_0_2000.jpg',
      '/assets/images/products/1740176-00-A_1.jpg',
    ],
    inStock: 7,
    price: 75,
    sizes: [Size.XS, Size.S, Size.M, Size.L, Size.XL, Size.XXL],
    slug: "mens_chill_crew_neck_sweatshirt",
    title: "Men’s Chill Crew Neck Sweatshirt",
    categoryId: '651b7558caf530c9616e3829',
    subCategoryId: '651b7576fa976e7f116ff427',
  },
  {
    description: "The Men's Quilted Shirt Jacket features a uniquely fit, quilted design for warmth and mobility in cold weather seasons. With an overall street-smart aesthetic, the jacket features subtle silicone injected Tesla logos below the back collar and on the right sleeve, as well as custom matte metal zipper pulls. Made from 87% nylon and 13% polyurethane.",
    images: [
      '/assets/images/products/1740507-00-A_0_2000.jpg',
      '/assets/images/products/1740507-00-A_1.jpg',
    ],
    inStock: 5,
    price: 200,
    sizes: [Size.XS, Size.S, Size.M, Size.XL, Size.XXL],
    slug: "men_quilted_shirt_jacket",
    title: "Men's Quilted Shirt Jacket",
    categoryId: '651b7558caf530c9616e3829',
    subCategoryId: '651b7576fa976e7f116ff427'
  },

  {
    description: "Introducing the Tesla Raven Collection. The Men's Raven Lightweight Zip Up Bomber has a premium, modern silhouette made from a sustainable bamboo cotton blend for versatility in any season. The hoodie features subtle thermoplastic polyurethane Tesla logos on the left chest and below the back collar, a concealed chest pocket with custom matte zipper pulls and a french terry interior. Made from 70% bamboo and 30% cotton.",
    images: [
      '/assets/images/products/1740250-00-A_0_2000.jpg',
      '/assets/images/products/1740250-00-A_1.jpg'
    ],
    inStock: 10,
    price: 130,
    sizes: [Size.XS, Size.L, Size.XL, Size.XXL],
    slug: "men_raven_lightweight_zip_up_bomber_jacket",
    title: "Men's Raven Lightweight Zip Up Bomber Jacket",
    categoryId: '651b7558caf530c9616e3829',
    subCategoryId: '651b7576fa976e7f116ff427'
  },

  {
    description: "Introducing the Tesla Turbine Collection. Designed for style, comfort and everyday lifestyle, the Men's Turbine Long Sleeve Tee features a subtle, water-based T logo on the left chest and our Tesla wordmark below the back collar. The lightweight material is double-dyed, creating a soft, casual style for ideal wear in any season. Made from 50% cotton and 50% polyester.",
    images: [
      '/assets/images/products/1740280-00-A_0_2000.jpg',
      '/assets/images/products/1740280-00-A_1.jpg',
    ],
    inStock: 50,
    price: 45,
    sizes: [Size.XS, Size.S, Size.M, Size.XL, Size.XXL],
    slug: "men_turbine_long_sleeve_tee",
    title: "Men's Turbine Long Sleeve Tee",
    categoryId: '651b7558caf530c9616e3829',
    subCategoryId: '651b7576fa976e7f116ff427'
  },
  {
    description: "Introducing the Tesla Turbine Collection. Designed for style, comfort and everyday lifestyle, the Men's Turbine Short Sleeve Tee features a subtle, water-based Tesla wordmark across the chest and our T logo below the back collar. The lightweight material is double-dyed, creating a soft, casual style for ideal wear in any season. Made from 50% cotton and 50% polyester.",
    images: [
      '/assets/images/products/1741416-00-A_0_2000.jpg',
      '/assets/images/products/1741416-00-A_1.jpg',
    ],
    inStock: 50,
    price: 40,
    sizes: [Size.XS, Size.S, Size.M, Size.XL, Size.XXL],
    slug: "men_turbine_short_sleeve_tee",
    title: "Men's Turbine Short Sleeve Tee",
    categoryId: '651b7558caf530c9616e3829',
    subCategoryId: '651b7576fa976e7f116ff427'
  },
  {
    description: "Designed for comfort, the Cybertruck Owl Tee is made from 100% cotton and features our signature Cybertruck icon on the back.",
    images: [
      '/assets/images/products/7654393-00-A_2_2000.jpg',
      '/assets/images/products/7654393-00-A_3.jpg',
    ],
    inStock: 0,
    price: 35,
    sizes: [Size.XS, Size.S, Size.M, Size.XL, Size.XXL],
    slug: "men_cybertruck_owl_tee",
    title: "Men's Cybertruck Owl Tee",
    categoryId: '651b7558caf530c9616e3829',
    subCategoryId: '651b7576fa976e7f116ff427'
  },
  {
    description: "Inspired by our fully integrated home solar and storage system, the Tesla Solar Roof Tee advocates for clean, sustainable energy wherever you go. Designed for fit, comfort and style, the tee features an aerial view of our seamless Solar Roof design on the front with our signature T logo above 'Solar Roof' on the back. Made from 100% Peruvian cotton.",
    images: [
      '/assets/images/products/1703767-00-A_0_2000.jpg',
      '/assets/images/products/1703767-00-A_1.jpg',
    ],
    inStock: 15,
    price: 35,
    sizes: [Size.XS, Size.S, Size.M, Size.XL, Size.XXL],
    slug: "men_solar_roof_tee",
    title: "Men's Solar Roof Tee",
    categoryId: '651b7558caf530c9616e3829',
    subCategoryId: '651b7576fa976e7f116ff427'
  },
  {
    description: "Inspired by the world’s most unlimited resource, the Let the Sun Shine Tee highlights our fully integrated home solar and storage system. Designed for fit, comfort and style, the tee features a sunset graphic along with our Tesla wordmark on the front and our signature T logo printed above 'Solar Roof' on the back. Made from 100% Peruvian cotton.",
    images: [
      '/assets/images/products/1700280-00-A_0_2000.jpg',
      '/assets/images/products/1700280-00-A_1.jpg',
    ],
    inStock: 17,
    price: 35,
    sizes: [Size.XS, Size.S, Size.M, Size.XL, Size.XXL],
    slug: "men_let_the_sun_shine_tee",
    title: "Men's Let the Sun Shine Tee",
    categoryId: '651b7558caf530c9616e3829',
    subCategoryId: '651b7576fa976e7f116ff427'
  },
  {
    description: "Designed for fit, comfort and style, the Men's 3D Large Wordmark Tee is made from 100% Peruvian cotton with a 3D silicone-printed Tesla wordmark printed across the chest.",
    images: [
      '/assets/images/products/8764734-00-A_0_2000.jpg',
      '/assets/images/products/8764734-00-A_1.jpg',
    ],
    inStock: 12,
    price: 35,
    sizes: [Size.XS, Size.S, Size.M, Size.XL, Size.XXL],
    slug: "men_3d_large_wordmark_tee",
    title: "Men's 3D Large Wordmark Tee",
    categoryId: '651b7558caf530c9616e3829',
    subCategoryId: '651b7576fa976e7f116ff427'
  },
  {
    description: "Designed for fit, comfort and style, the Tesla T Logo Tee is made from 100% Peruvian cotton and features a silicone-printed T Logo on the left chest.",
    images: [
      '/assets/images/products/7652426-00-A_0_2000.jpg',
      '/assets/images/products/7652426-00-A_1.jpg',
    ],
    inStock: 5,
    price: 35,
    sizes: [Size.XS, Size.S, Size.M, Size.XL, Size.XXL],
    slug: "men_3d_t_logo_tee",
    title: "Men's 3D T Logo Tee",
    categoryId: '651b7558caf530c9616e3829',
    subCategoryId: '651b7576fa976e7f116ff427'
  },
  {
    description: "Designed for comfort and style in any size, the Tesla Small Wordmark Tee is made from 100% Peruvian cotton and features a 3D silicone-printed wordmark on the left chest.",
    images: [
      '/assets/images/products/8528839-00-A_0_2000.jpg',
      '/assets/images/products/8528839-00-A_2.jpg',
    ],
    inStock: 2,
    price: 35,
    sizes: [Size.XS, Size.S, Size.M, Size.XL, Size.XXL],
    slug: "men_3d_small_wordmark_tee",
    title: "Men’s 3D Small Wordmark Tee",
    categoryId: '651b7558caf530c9616e3829',
    subCategoryId: '651b7576fa976e7f116ff427'
  },
  {
    description: "Designed to celebrate Tesla's incredible performance mode, the Plaid Mode Tee features great fit, comfort and style. Made from 100% cotton, it's the next best thing to riding shotgun at the Nürburgring.",
    images: [
      '/assets/images/products/1549268-00-A_0_2000.jpg',
      '/assets/images/products/1549268-00-A_2.jpg',
    ],
    inStock: 82,
    price: 35,
    sizes: [Size.XS, Size.S, Size.M, Size.XL, Size.XXL],
    slug: "men_plaid_mode_tee",
    title: "Men's Plaid Mode Tee",
    categoryId: '651b7558caf530c9616e3829',
    subCategoryId: '651b7576fa976e7f116ff427'
  },
  {
    description: "Inspired by our popular home battery, the Tesla Powerwall Tee is made from 100% cotton and features the phrase 'Pure Energy' under our signature logo in the back. Designed for fit, comfort and style, the exclusive tee promotes sustainable energy in any environment.",
    images: [
      '/assets/images/products/9877034-00-A_0_2000.jpg',
      '/assets/images/products/9877034-00-A_2.jpg',
    ],
    inStock: 24,
    price: 35,
    sizes: [Size.XL, Size.XXL],
    slug: "men_powerwall_tee",
    title: "Men's Powerwall Tee",
    categoryId: '651b7558caf530c9616e3829',
    subCategoryId: '651b7576fa976e7f116ff427'
  },
  {
    description: "Inspired by Tesla Battery Day and featuring the unveiled tabless battery cell, Battery Day Tee celebrates the future of energy storage and cell manufacturing. Designed for fit, comfort and style, Battery Day Tee is made from 100% cotton with a stylized cell printed across the chest. Made in Peru.",
    images: [
      '/assets/images/products/1633802-00-A_0_2000.jpg',
      '/assets/images/products/1633802-00-A_2.jpg',
    ],
    inStock: 5,
    price: 30,
    sizes: [Size.XS, Size.S, Size.M],
    slug: "men_battery_day_tee",
    title: "Men's Battery Day Tee",
    categoryId: '651b7558caf530c9616e3829',
    subCategoryId: '651b7576fa976e7f116ff427'
  },
  {
    description: "Designed for exceptional comfort and inspired by the Cybertruck unveil event, the Cybertruck Bulletproof Tee is made from 100% cotton and features our signature Cybertruck icon on the back.",
    images: [
      '/assets/images/products/7654399-00-A_0_2000.jpg',
      '/assets/images/products/7654399-00-A_1.jpg',
    ],
    inStock: 150,
    price: 30,
    sizes: [Size.M, Size.L],
    slug: "men_cybertruck_bulletproof_tee",
    title: "Men’s Cybertruck Bulletproof Tee",
    categoryId: '651b7558caf530c9616e3829',
    subCategoryId: '651b7576fa976e7f116ff427'
  },
  {
    description: "Inspired by the Model Y order confirmation graphic, the limited edition Haha Yes Tee is designed for comfort and style. Made from 100% Peruvian cotton and featuring the Tesla wordmark across the chest, the exclusive tee will commemorate your order for years to come.",
    images: [
      '/assets/images/products/7652410-00-A_0.jpg',
      '/assets/images/products/7652410-00-A_1_2000.jpg',
    ],
    inStock: 10,
    price: 35,
    sizes: [Size.XS, Size.S, Size.M, Size.XL, Size.XXL],
    slug: "men_haha_yes_tee",
    title: "Men's Haha Yes Tee",
    categoryId: '651b7558caf530c9616e3829',
    subCategoryId: '651b7576fa976e7f116ff427'
  },
  {
    description: "Designed for fit, comfort and style, the limited edition S3XY Tee is made from 100% cotton with a 3D silicone-printed “S3XY” logo across the chest. Made in Peru. Available in black.",
    images: [
      '/assets/images/products/8764600-00-A_0_2000.jpg',
      '/assets/images/products/8764600-00-A_2.jpg',
    ],
    inStock: 34,
    price: 35,
    sizes: [Size.XS, Size.S, Size.M, Size.XXL],
    slug: "men_s3xy_tee",
    title: "Men's S3XY Tee",
    categoryId: '651b7558caf530c9616e3829',
    subCategoryId: '651b7576fa976e7f116ff427'
  },
  {
    description: "Designed for fit, comfort and style, the Men's 3D Wordmark Long Sleeve Tee is made from 100% cotton and features an understated wordmark logo on the left chest.",
    images: [
      '/assets/images/products/8764813-00-A_0_2000.jpg',
      '/assets/images/products/8764813-00-A_1.jpg',
    ],
    inStock: 15,
    price: 40,
    sizes: [Size.XL, Size.XXL],
    slug: "men_3d_wordmark_long_sleeve_tee",
    title: "Men's 3D Wordmark Long Sleeve Tee",
    categoryId: '651b7558caf530c9616e3829',
    subCategoryId: '651b7576fa976e7f116ff427'
  },
  {
    description: "Designed for fit, comfort and style, the Men's 3D T Logo Long Sleeve Tee is made from 100% cotton and features an understated T logo on the left chest.",
    images: [
      '/assets/images/products/8529198-00-A_0_2000.jpg',
      '/assets/images/products/8529198-00-A_1.jpg',
    ],
    inStock: 12,
    price: 40,
    sizes: [Size.XL, Size.XXL],
    slug: "men_3d_t_logo_long_sleeve_tee",
    title: "Men's 3D T Logo Long Sleeve Tee",
    categoryId: '651b7558caf530c9616e3829',
    subCategoryId: '651b7576fa976e7f116ff427'
  },
  {
    description: "Introducing the Tesla Raven Collection. The Men's Raven Lightweight Hoodie has a premium, relaxed silhouette made from a sustainable bamboo cotton blend. The hoodie features subtle thermoplastic polyurethane Tesla logos across the chest and on the sleeve with a french terry interior for versatility in any season. Made from 70% bamboo and 30% cotton.",
    images: [
      '/assets/images/products/1740245-00-A_0_2000.jpg',
      '/assets/images/products/1740245-00-A_1.jpg',
    ],
    inStock: 10,
    price: 115,
    sizes: [Size.XS, Size.S, Size.M, Size.XL, Size.XXL],
    slug: "men_raven_lightweight_hoodie",
    title: "Men's Raven Lightweight Hoodie",
    categoryId: '651b7558caf530c9616e3829',
    subCategoryId: '651b81252f07d89b7d021584'
  },
  {
    description: "Introducing the Tesla Chill Collection. The Chill Pullover Hoodie has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The unisex hoodie features subtle thermoplastic polyurethane Tesla logos across the chest and on the sleeve, a double layer single seam hood and pockets with custom matte zipper pulls. Made from 60% cotton and 40% recycled polyester.",
    images: [
      '/assets/images/products/1740051-00-A_0_2000.jpg',
      '/assets/images/products/1740051-00-A_1.jpg',
    ],
    inStock: 10,
    price: 130,
    sizes: [Size.XS, Size.S, Size.M, Size.XL, Size.XXL],
    slug: "chill_pullover_hoodie",
    title: "Chill Pullover Hoodie",
    categoryId: '651b7562ab11d642cd24c945',
    subCategoryId: '651b81252f07d89b7d021584'
  },
  {
    description: "Introducing the Tesla Chill Collection. The Men's Chill Full Zip Hoodie has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The hoodie features subtle thermoplastic polyurethane Tesla logos on the left chest and sleeve, a double layer single seam hood and pockets with custom matte zipper pulls. Made from 60% cotton and 40% recycled polyester.",
    images: [
      '/assets/images/products/1741111-00-A_0_2000.jpg',
      '/assets/images/products/1741111-00-A_1.jpg',
    ],
    inStock: 100,
    price: 85,
    sizes: [Size.XS, Size.S, Size.M, Size.XL, Size.XXL],
    slug: "men_chill_full_zip_hoodie",
    title: "Men's Chill Full Zip Hoodie",
    categoryId: '651b7558caf530c9616e3829',
    subCategoryId: '651b81252f07d89b7d021584'
  },
  {
    description: "Introducing the Tesla Chill Collection. The Men’s Chill Quarter Zip Pullover has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The pullover features subtle thermoplastic polyurethane Tesla logos on the left chest and below the back collar, as well as a custom matte zipper pull. Made from 60% cotton and 40% recycled polyester.",
    images: [
      '/assets/images/products/1740140-00-A_0_2000.jpg',
      '/assets/images/products/1740140-00-A_1.jpg',
    ],
    inStock: 7,
    price: 85,
    sizes: [Size.XS, Size.S, Size.M, Size.XL, Size.XXL],
    slug: "men_chill_quarter_zip_pullover_-_gray",
    title: "Men's Chill Quarter Zip Pullover - Gray",
    categoryId: '651b7558caf530c9616e3829',
    subCategoryId: '651b7576fa976e7f116ff427'
  },
  {
    description: "Introducing the Tesla Chill Collection. The Men’s Chill Quarter Zip Pullover has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The pullover features subtle thermoplastic polyurethane Tesla logos on the left chest and below the back collar, as well as a custom matte zipper pull. Made from 60% cotton and 40% recycled polyester.",
    images: [
      '/assets/images/products/1740145-00-A_2_2000.jpg',
      '/assets/images/products/1740145-00-A_1.jpg',
    ],
    inStock: 15,
    price: 85,
    sizes: [Size.XS, Size.S, Size.M, Size.XL, Size.XXL],
    slug: "men_chill_quarter_zip_pullover_-_white",
    title: "Men's Chill Quarter Zip Pullover - White",
    categoryId: '651b7558caf530c9616e3829',
    subCategoryId: '651b7576fa976e7f116ff427'
  },
  {
    description: "The Unisex 3D Large Wordmark Pullover Hoodie features soft fleece and an adjustable, jersey-lined hood for comfort and coverage. Designed in a unisex style, the pullover hoodie includes a tone-on-tone 3D silicone-printed wordmark across the chest.",
    images: [
      '/assets/images/products/8529107-00-A_0_2000.jpg',
      '/assets/images/products/8529107-00-A_1.jpg',
    ],
    inStock: 15,
    price: 70,
    sizes: [Size.XS, Size.S, Size.M, Size.XL, Size.XXL],
    slug: "3d_large_wordmark_pullover_hoodie",
    title: "3D Large Wordmark Pullover Hoodie",
    categoryId: '651b7562ab11d642cd24c945',
    subCategoryId: '651b7576fa976e7f116ff427'
  },
  {
    description: "As with the iconic Tesla logo, the Cybertruck Graffiti Hoodie is a classic in the making. Unisex style featuring soft fleece and an adjustable, jersey-lined hood for comfortable coverage.",
    images: [
      '/assets/images/products/7654420-00-A_0_2000.jpg',
      '/assets/images/products/7654420-00-A_1_2000.jpg',
    ],
    inStock: 13,
    price: 60,
    sizes: [Size.XS, Size.S, Size.M, Size.XL, Size.XXL],
    slug: "cybertruck_graffiti_hoodie",
    title: "Cybertruck Graffiti Hoodie",
    categoryId: '651b7562ab11d642cd24c945',
    subCategoryId: '651b7576fa976e7f116ff427'
  },
  {
    description: "The Relaxed T Logo Hat is a classic silhouette combined with modern details, featuring a 3D T logo and a custom metal buckle closure. The ultrasoft design is flexible and abrasion resistant, while the inner sweatband includes quilted padding for extra comfort and moisture wicking. The visor is fully made from recycled plastic bottles. 100% Cotton.",
    images: [
      '/assets/images/products/1657932-00-A_0_2000.jpg',
      '/assets/images/products/1657932-00-A_1.jpg',
    ],
    inStock: 11,
    price: 30,
    sizes: [Size.XS, Size.S, Size.M, Size.XL, Size.XXL],
    slug: "relaxed_t_logo_hat",
    title: "Relaxed T Logo Hat",
    categoryId: '651b7562ab11d642cd24c945',
    subCategoryId: '651b7576fa976e7f116ff427'
  },
  {
    description: "The Relaxed T Logo Hat is a classic silhouette combined with modern details, featuring a 3D T logo and a custom metal buckle closure. The ultrasoft design is flexible and abrasion resistant, while the inner sweatband includes quilted padding for extra comfort and moisture wicking. The visor is fully made from recycled plastic bottles. 100% Cotton.",
    images: [
      '/assets/images/products/1740417-00-A_0_2000.jpg',
      '/assets/images/products/1740417-00-A_1.jpg',
    ],
    inStock: 13,
    price: 35,
    sizes: [Size.XS, Size.S, Size.M, Size.XL, Size.XXL],
    slug: "thermal_cuffed_beanie",
    title: "Thermal Cuffed Beanie",
    categoryId: '651b7562ab11d642cd24c945',
    subCategoryId: '651b7576fa976e7f116ff427'
  },
  {
    description: "The Women's Cropped Puffer Jacket features a uniquely cropped silhouette for the perfect, modern style while on the go during the cozy season ahead. The puffer features subtle silicone injected Tesla logos below the back collar and on the right sleeve, custom matte metal zipper pulls and a soft, fleece lined collar. Made from 87% nylon and 13% polyurethane.",
    images: [
      '/assets/images/products/1740535-00-A_0_2000.jpg',
      '/assets/images/products/1740535-00-A_1.jpg',
    ],
    inStock: 85,
    price: 225,
    sizes: [Size.XS, Size.S, Size.M, Size.XL, Size.XXL],
    slug: "women_cropped_puffer_jacket",
    title: "Women's Cropped Puffer Jacket",
    categoryId: '651b753810d9e656c8a1b1b3',
    subCategoryId: '651b7576fa976e7f116ff427'
  },
  {
    description: "Introducing the Tesla Chill Collection. The Women's Chill Half Zip Cropped Hoodie has a premium, soft fleece exterior and cropped silhouette for comfort in everyday lifestyle. The hoodie features an elastic hem that gathers at the waist, subtle thermoplastic polyurethane Tesla logos along the hood and on the sleeve, a double layer single seam hood and a custom ring zipper pull. Made from 60% cotton and 40% recycled polyester.",
    images: [
      '/assets/images/products/1740226-00-A_0_2000.jpg',
      '/assets/images/products/1740226-00-A_1.jpg',
    ],
    inStock: 10,
    price: 130,
    sizes: [Size.XS, Size.S, Size.XXL],
    slug: "women_chill_half_zip_cropped_hoodie",
    title: "Women's Chill Half Zip Cropped Hoodie",
    categoryId: '651b753810d9e656c8a1b1b3',
    subCategoryId: '651b7576fa976e7f116ff427'
  },
  {
    description: "Introducing the Tesla Raven Collection. The Women's Raven Slouchy Crew Sweatshirt has a premium, relaxed silhouette made from a sustainable bamboo cotton blend. The slouchy crew features a subtle thermoplastic polyurethane Tesla wordmark on the left sleeve and a french terry interior for a cozy look and feel in every season. Pair it with your Raven Joggers or favorite on the go fit. Made from 70% bamboo and 30% cotton.",
    images: [
      '/assets/images/products/1740260-00-A_0_2000.jpg',
      '/assets/images/products/1740260-00-A_1.jpg',
    ],
    inStock: 9,
    price: 110,
    sizes: [Size.XS, Size.S, Size.XXL],
    slug: "women_raven_slouchy_crew_sweatshirt",
    title: "Women's Raven Slouchy Crew Sweatshirt",
    categoryId: '651b753810d9e656c8a1b1b3',
    subCategoryId: '651b7576fa976e7f116ff427'
  },
  {
    description: "Introducing the Tesla Turbine Collection. Designed for style, comfort and everyday lifestyle, the Women's Turbine Cropped Long Sleeve Tee features a subtle, water-based Tesla wordmark across the chest and our T logo below the back collar. The lightweight material is double-dyed, creating a soft, casual style with a cropped silhouette. Made from 50% cotton and 50%",
    images: [
      '/assets/images/products/1740290-00-A_0_2000.jpg',
      '/assets/images/products/1740290-00-A_1.jpg',
    ],
    inStock: 10,
    price: 45,
    sizes: [Size.XS, Size.S, Size.XXL],
    slug: "women_turbine_cropped_long_sleeve_tee",
    title: "Women's Turbine Cropped Long Sleeve Tee",
    categoryId: '651b753810d9e656c8a1b1b3',
    subCategoryId: '651b7576fa976e7f116ff427'
  },
  {
    description: "ntroducing the Tesla Turbine Collection. Designed for style, comfort and everyday lifestyle, the Women's Turbine Cropped Short Sleeve Tee features a subtle, water-based Tesla wordmark across the chest and our T logo below the back collar. The lightweight material is double-dyed, creating a soft, casual style with a cropped silhouette. Made from 50% cotton and 50% polyester.",
    images: [
      '/assets/images/products/1741441-00-A_0_2000.jpg',
      '/assets/images/products/1741441-00-A_1.jpg',
    ],
    inStock: 0,
    price: 40,
    sizes: [Size.XS, Size.S, Size.M, Size.XL, Size.XXL],
    slug: "women_turbine_cropped_short_sleeve_tee",
    title: "Women's Turbine Cropped Short Sleeve Tee",
    categoryId: '651b753810d9e656c8a1b1b3',
    subCategoryId: '651b7576fa976e7f116ff427'
  },
  {
    description: "Designed for style and comfort, the ultrasoft Women's T Logo Short Sleeve Scoop Neck Tee features a tonal 3D silicone-printed T logo on the left chest. Made of 50% Peruvian cotton and 50% Peruvian viscose.",
    images: [
      '/assets/images/products/8765090-00-A_0_2000.jpg',
      '/assets/images/products/8765090-00-A_1.jpg',
    ],
    inStock: 30,
    price: 35,
    sizes: [Size.XS, Size.S, Size.XXL],
    slug: "women_t_logo_short_sleeve_scoop_neck_tee",
    title: "Women's T Logo Short Sleeve Scoop Neck Tee",
    categoryId: '651b753810d9e656c8a1b1b3',
    subCategoryId: '651b7576fa976e7f116ff427'
  },
  {
    description: "Designed for style and comfort, the ultrasoft Women's T Logo Long Sleeve Scoop Neck Tee features a tonal 3D silicone-printed T logo on the left chest. Made of 50% Peruvian cotton and 50% Peruvian viscose.",
    images: [
      '/assets/images/products/8765100-00-A_0_2000.jpg',
      '/assets/images/products/8765100-00-A_1.jpg',
    ],
    inStock: 16,
    price: 40,
    sizes: [Size.XS, Size.S, Size.XXL],
    slug: "women_t_logo_long_sleeve_scoop_neck_tee",
    title: "Women's T Logo Long Sleeve Scoop Neck Tee",
    categoryId: '651b753810d9e656c8a1b1b3',
    subCategoryId: '651b7576fa976e7f116ff427'
  },
  {
    description: "Designed for style and comfort, the Women's Small Wordmark Short Sleeve V-Neck Tee features a tonal 3D silicone-printed wordmark on the left chest. Made of 100% Peruvian cotton.",
    images: [
      '/assets/images/products/8765120-00-A_0_2000.jpg',
      '/assets/images/products/8765120-00-A_1.jpg',
    ],
    inStock: 18,
    price: 35,
    sizes: [Size.XS, Size.S, Size.XXL],
    slug: "women_small_wordmark_short_sleeve_v-neck_tee",
    title: "Women's Small Wordmark Short Sleeve V-Neck Tee",
    categoryId: '651b753810d9e656c8a1b1b3',
    subCategoryId: '651b7576fa976e7f116ff427'
  },
  {
    description: "Designed for style and comfort, the Women's Large Wordmark Short Sleeve Crew Neck Tee features a tonal 3D silicone-printed wordmark across the chest. Made of 100% Peruvian pima cotton.",
    images: [
      '/assets/images/products/8765115-00-A_0_2000.jpg',
      '/assets/images/products/8765115-00-A_1.jpg',
    ],
    inStock: 5,
    price: 35,
    sizes: [Size.XS, Size.S, Size.XXL],
    slug: "women_large_wordmark_short_sleeve_crew_neck_tee",
    title: "Women's Large Wordmark Short Sleeve Crew Neck Tee",
    categoryId: '651b753810d9e656c8a1b1b3',
    subCategoryId: '651b7576fa976e7f116ff427'
  },
  {
    description: "Designed to celebrate Tesla's incredible performance mode, the Plaid Mode Tee features great fit, comfort and style. Made from 100% cotton, it's the next best thing to riding shotgun at the Nürburgring.",
    images: [
      '/assets/images/products/1549275-00-A_0_2000.jpg',
      '/assets/images/products/1549275-00-A_1.jpg',
    ],
    inStock: 16,
    price: 35,
    sizes: [Size.XS, Size.S, Size.XXL],
    slug: "women_plaid_mode_tee",
    title: "Women's Plaid Mode Tee",
    categoryId: '651b753810d9e656c8a1b1b3',
    subCategoryId: '651b7576fa976e7f116ff427'
  },
  {
    description: "Inspired by our popular home battery, the Tesla Powerwall Tee is made from 100% cotton and features the phrase 'Pure Energy' under our signature logo in the back. Designed for fit, comfort and style, the exclusive tee promotes sustainable energy in any",
    images: [
      '/assets/images/products/9877040-00-A_0_2000.jpg',
      '/assets/images/products/9877040-00-A_1.jpg',
    ],
    inStock: 10,
    price: 130,
    sizes: [Size.XS, Size.S, Size.XXL],
    slug: "women_powerwall_tee",
    title: "Women’s Powerwall Tee",
    categoryId: '651b753810d9e656c8a1b1b3',
    subCategoryId: '651b7576fa976e7f116ff427'
  },
  {
    description: "Fully customized and uniquely styled, the Women's Corp Jacket features a silicone-printed 'T' logo on the left chest and prominent Tesla wordmark across the back.",
    images: [
      '/assets/images/products/5645680-00-A_0_2000.jpg',
      '/assets/images/products/5645680-00-A_3.jpg',
    ],
    inStock: 3,
    price: 90,
    sizes: [Size.XS, Size.S, Size.XXL],
    slug: "women_corp_jacket",
    title: "Women's Corp Jacket",
    categoryId: '651b753810d9e656c8a1b1b3',
    subCategoryId: '651b7576fa976e7f116ff427'
  },
  {
    description: "Introducing the Tesla Raven Collection. The Women's Raven Joggers have a premium, relaxed silhouette made from a sustainable bamboo cotton blend. The joggers feature a subtle thermoplastic polyurethane Tesla wordmark and T logo and a french terry interior for a cozy look and feel in every season. Pair them with your Raven Slouchy Crew Sweatshirt, Raven Lightweight Zip Up Jacket or other favorite on the go fit. Made from 70% bamboo and 30% cotton.",
    images: [
      '/assets/images/products/1740270-00-A_0_2000.jpg',
      '/assets/images/products/1740270-00-A_1.jpg',
    ],
    inStock: 162,
    price: 100,
    sizes: [Size.XS, Size.S, Size.XXL],
    slug: "women_raven_joggers",
    title: "Women's Raven Joggers",
    categoryId: '651b753810d9e656c8a1b1b3',
    subCategoryId: '651b7576fa976e7f116ff427'
  },
  {
    description: "Designed for fit, comfort and style, the Kids Cybertruck Graffiti Long Sleeve Tee features a water-based Cybertruck graffiti wordmark across the chest, a Tesla wordmark down the left arm and our signature T logo on the back collar. Made from 50% cotton and 50% polyester.",
    images: [
      '/assets/images/products/1742694-00-A_1_2000.jpg',
      '/assets/images/products/1742694-00-A_3.jpg',
    ],
    inStock: 10,
    price: 30,
    sizes: [Size.XS, Size.S, Size.M, Size.XL, Size.XXL],
    slug: "kids_cybertruck_long_sleeve_tee",
    title: "Kids Cybertruck Long Sleeve Tee",
    categoryId: '651b755ed396a85c52addd07',
    subCategoryId: '651b7576fa976e7f116ff427'
  },
  {
    description: "The Kids Scribble T Logo Tee is made from 100% Peruvian cotton and features a Tesla T sketched logo for every young artist to wear.",
    images: [
      '/assets/images/products/8529312-00-A_0_2000.jpg',
      '/assets/images/products/8529312-00-A_1.jpg',
    ],
    inStock: 0,
    price: 25,
    sizes: [Size.XS, Size.S, Size.M, Size.XL, Size.XXL],
    slug: "kids_scribble_t_logo_tee",
    title: "Kids Scribble T Logo Tee",
    categoryId: '651b755ed396a85c52addd07',
    subCategoryId: '651b7576fa976e7f116ff427'
  },
  {
    description: "The Kids Cybertruck Tee features the iconic Cybertruck graffiti wordmark and is made from 100% Peruvian cotton for maximum comfort.",
    images: [
      '/assets/images/products/8529342-00-A_0_2000.jpg',
      '/assets/images/products/8529342-00-A_1.jpg',
    ],
    inStock: 10,
    price: 25,
    sizes: [Size.XS, Size.S, Size.M, Size.XL, Size.XXL],
    slug: "kids_cybertruck_tee",
    title: "Kids Cybertruck Tee",
    categoryId: '651b755ed396a85c52addd07',
    subCategoryId: '651b7576fa976e7f116ff427'
  },
  {
    description: "The refreshed Kids Racing Stripe Tee is made from 100% Peruvian cotton, featuring a newly enhanced racing stripe with a brushed Tesla wordmark that's perfect for any speed racer.",
    images: [
      '/assets/images/products/8529354-00-A_0_2000.jpg',
      '/assets/images/products/8529354-00-A_1.jpg',
    ],
    inStock: 10,
    price: 30,
    sizes: [Size.XS, Size.S, Size.M, Size.XL, Size.XXL],
    slug: "kids_racing_stripe_tee",
    title: "Kids Racing Stripe Tee",
    categoryId: '651b755ed396a85c52addd07',
    subCategoryId: '651b7576fa976e7f116ff427'
  },
  {
    description: "Designed for fit, comfort and style, the Tesla T Logo Tee is made from 100% Peruvian cotton and features a silicone-printed T Logo on the left chest.",
    images: [
      '/assets/images/products/7652465-00-A_0_2000.jpg',
      '/assets/images/products/7652465-00-A_1.jpg',
    ],
    inStock: 10,
    price: 30,
    sizes: [Size.XS, Size.S, Size.M, Size.XL, Size.XXL],
    slug: "kids_3d_t_logo_tee",
    title: "Kids 3D T Logo Tee",
    categoryId: '651b755ed396a85c52addd07',
    subCategoryId: '651b7576fa976e7f116ff427'
  },
  {
    description: "The checkered tee is made from long grain, GMO free Peruvian cotton. Peru is the only country in the world where cotton is picked by hand on a large scale. The 4,500-year-old tradition prevents damage to the fiber during the picking process and removes the need to use chemicals to open the cotton plants before harvest. This environmentally friendly process results in cotton that is soft, strong, and lustrous – and the tee will get even softer with every wash.",
    images: [
      '/assets/images/products/100042307_0_2000.jpg',
      '/assets/images/products/100042307_alt_2000.jpg',
    ],
    inStock: 10,
    price: 30,
    sizes: [Size.XS, Size.S, Size.M, Size.XL, Size.XXL],
    slug: "kids_checkered_tee",
    title: "Kids Checkered Tee",
    categoryId: '651b755ed396a85c52addd07',
    subCategoryId: '651b7576fa976e7f116ff427'
  },
  {
    description: "For the future space traveler with discerning taste, a soft, cotton onesie with snap closure bottom. Clear labeling provided in case of contact with a new spacefaring civilization. 100% Cotton. Made in Peru",
    images: [
      '/assets/images/products/1473809-00-A_1_2000.jpg',
      '/assets/images/products/1473809-00-A_alt.jpg',
    ],
    inStock: 16,
    price: 25,
    sizes: [Size.XS, Size.S, Size.M, Size.XL, Size.XXL],
    slug: "made_on_earth_by_humans_onesie",
    title: "Made on Earth by Humans Onesie",
    categoryId: '651b755ed396a85c52addd07',
    subCategoryId: '651b7576fa976e7f116ff427'
  },
  {
    description: "The Kids Scribble T Logo Onesie is made from 100% Peruvian cotton and features a Tesla T sketched logo for every little artist to wear.",
    images: [
      '/assets/images/products/8529387-00-A_0_2000.jpg',
      '/assets/images/products/8529387-00-A_1.jpg',
    ],
    inStock: 0,
    price: 30,
    sizes: [Size.XS, Size.S, Size.M, Size.XL, Size.XXL],
    slug: "scribble_t_logo_onesie",
    title: "Scribble T Logo Onesie",
    categoryId: '651b755ed396a85c52addd07',
    subCategoryId: '651b7576fa976e7f116ff427'
  },
  {
    description: "Show your commitment to sustainable energy with this cheeky onesie for your young one. Note: Does not prevent emissions. 100% Cotton. Made in Peru.",
    images: [
      '/assets/images/products/1473834-00-A_2_2000.jpg',
      '/assets/images/products/1473829-00-A_2_2000.jpg',
    ],
    inStock: 10,
    price: 30,
    sizes: [Size.XS, Size.S, Size.M, Size.XL, Size.XXL],
    slug: "zero_emissions_(almost)_onesie",
    title: "Zero Emissions (Almost) Onesie",
    categoryId: '651b755ed396a85c52addd07',
    subCategoryId: '651b7576fa976e7f116ff427'
  },
  {
    description: "Wear your Kids Cyberquad Bomber Jacket during your adventures on Cyberquad for Kids. The bomber jacket features a graffiti-style illustration of our Cyberquad silhouette and wordmark. With three zippered pockets and our signature T logo and Tesla wordmark printed along the sleeves, Kids Cyberquad Bomber Jacket is perfect for wherever the trail takes you. Made from 60% cotton and 40% polyester.",
    images: [
      '/assets/images/products/1742702-00-A_0_2000.jpg',
      '/assets/images/products/1742702-00-A_1.jpg',
    ],
    inStock: 10,
    price: 65,
    sizes: [Size.XS, Size.S, Size.M, Size.XL, Size.XXL],
    slug: "kids_cyberquad_bomber_jacket",
    title: "Kids Cyberquad Bomber Jacket",
    categoryId: '651b755ed396a85c52addd07',
    subCategoryId: '651b7576fa976e7f116ff427'
  },
  {
    description: "Cruise the playground in style with the Kids Corp Jacket. Modeled after the original Tesla Corp Jacket, the Kids Corp Jacket features the same understated style and high-quality materials but at a pint-sized scale.",
    images: [
      '/assets/images/products/1506211-00-A_0_2000.jpg',
      '/assets/images/products/1506211-00-A_1_2000.jpg',
    ],
    inStock: 10,
    price: 30,
    sizes: [Size.XS, Size.S, Size.M, Size.XL, Size.XXL],
    slug: "kids_corp_jacket",
    title: "Kids Corp Jacket",
    categoryId: '651b755ed396a85c52addd07',
    subCategoryId: '651b7576fa976e7f116ff427'
  },
]