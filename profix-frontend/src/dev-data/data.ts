export const mockCategories = [
    { id: 1, name: "Plumbing", slug: "plumbing", imageUrl: "https://images.unsplash.com/photo-1573689705342-99840c10a8ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", providersCount: 48 },
    { id: 2, name: "Electrical", slug: "electrical",  imageUrl: "https://images.unsplash.com/photo-1580893246395-52aead8960dc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", providersCount: 36 },
    { id: 3, name: "Carpentry", slug: "carpentery",  imageUrl: "https://images.unsplash.com/photo-1615529328331-f8917597711f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", providersCount: 29 },
    { id: 4, name: "Painting", slug: "painting",  imageUrl: "https://images.unsplash.com/photo-1590479773265-7464e5d48118?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", providersCount: 41 },
    { id: 5, name: "HVAC", slug: "hvac",  imageUrl: "https://images.unsplash.com/photo-1565093795280-62e6cf60a622?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", providersCount: 22 },
    { id: 6, name: "Cleaning", slug: "cleaning",  imageUrl: "https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", providersCount: 53 }
];

export const mockProviders = [
    {
      id: 1,
      name: "Roberto Mendez",
      profileImageUrl: "https://images.unsplash.com/photo-1574144113084-b6f450cc5e2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      categoryId: 1,
      category: "Plumbing",
      description: "Professional plumber with 12+ years of experience in residential and commercial repairs.",
      hourlyRate: 40,
      rating: 4.9,
      reviewsCount: 48,
      location: "Zapopan, Jalisco",
      experience: "12+ years experience",
      verified: true,
      gallery: [
        "https://images.unsplash.com/photo-1573689705342-99840c10a8ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1551133989-6a6512ad3915?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1603969867644-c083acaf1757?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1580038302798-25e687c69e91?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1572231782990-3b75adb4d316?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
      ]
    },
    {
      id: 2,
      name: "Ana Gutiérrez",
      profileImageUrl: "https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      categoryId: 2,
      category: "Electrical",
      description: "Certified electrician specializing in modern electrical systems and smart home installations.",
      hourlyRate: 35,
      rating: 4.8,
      reviewsCount: 36,
      location: "Guadalajara Centro",
      experience: "8+ years experience",
      verified: true,
      gallery: [
        "https://images.unsplash.com/photo-1587407627257-27b7127c868c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1614633836648-fd5897c37aa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
      ]
    },
    {
      id: 3,
      name: "Miguel Hernández",
      profileImageUrl: "https://images.unsplash.com/photo-1615529328331-f8917597711f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      categoryId: 3,
      category: "Carpentry",
      description: "Master craftsman with expertise in custom furniture, cabinetry, and architectural woodwork.",
      hourlyRate: 45,
      rating: 5.0,
      reviewsCount: 29,
      location: "Tlaquepaque",
      experience: "15+ years experience",
      verified: true,
      gallery: [
        "https://images.unsplash.com/photo-1617850687395-620757feb1f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1618075801985-c9b4799d7e3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1582731098031-5a85109016ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
      ]
    },
    {
      id: 4,
      name: "Carlos Vega",
      profileImageUrl: "https://images.unsplash.com/photo-1590479773265-7464e5d48118?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      categoryId: 4,
      category: "Painting",
      description: "Skilled house painter offering interior and exterior painting services with premium materials.",
      hourlyRate: 30,
      rating: 4.7,
      reviewsCount: 41,
      location: "Tonalá, Jalisco",
      experience: "10+ years experience",
      verified: true,
      gallery: [
        "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1595883032530-7ad3c4c88452?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1591768779171-5ee07c3708ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
      ]
    }
  ];

