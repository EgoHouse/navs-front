import type { Category } from '../types';

/**
 * Carta completa hardcodeada.
 *
 * Los datos del menú se sirven de forma estática desde el frontend; ya no se
 * realizan peticiones a ningún backend. Para modificar la carta, edita este
 * archivo directamente.
 */
export const MENU_CATEGORIES: Category[] = [
  {
    id: "68f0ef44845466491b7b2cee",
    name: "Batidos",
    slug: "batidos",
    subcategories: [
      {
        name: "Batidos",
        items: [
          {
            name: "Batido de Oreo",
            price: 7,
            description: "Explosión de sabor con la galleta más famosa del mundo: base cremosa de vainilla mezclada con trozos crujientes de Oreo y nata.",
            imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/OREO_n7xkb2",
            variants: []
          },
          {
            name: "Batido de Kinder Bueno",
            price: 7,
            description: "Pura tentación para los amantes de la avellana; un batido suave con el sabor inconfundible del chocolate y la crema Kinder.",
            imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/KINDER_BUENO_NEGRO_oauu15",
            variants: []
          },
          {
            name: "Batido de KitKat",
            price: 7,
            description: "El equilibrio perfecto entre el barquillo crujiente y el chocolate con leche, batido hasta lograr una textura irresistible.",
            imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/KIT_KAT_ph9mnp",
            variants: []
          },
          {
            name: "Batido de Filipinos blancos",
            price: 7,
            description: "Dulzura en estado puro. Batido artesano con auténticos Filipinos de chocolate blanco para un acabado sedoso y dulce.",
            imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/FILIPINO_h1ynyz",
            variants: []
          },
          {
            name: "Batido de Huesitos",
            price: 7,
            description: "Sabor clásico a chocolate y barquillo crujiente con un ligero toque de avellana que te hará repetir.",
            imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/HUESITOS_gpkxsk",
            variants: []
          },
          {
            name: "Batido de Donut",
            price: 7,
            description: "La merienda de siempre hecha batido; captura el sabor original del donut clásico con su toque justo de glaseado.",
            imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/DONUT_lmyanz",
            variants: []
          },
          {
            name: "Batido de Pantera Rosa",
            price: 7,
            description: "Un viaje directo a la infancia con el sabor del mítico pastelito rosa: nata, bizcocho y esa cobertura única.",
            imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/PANTERA_ROSA_e17u1s",
            variants: []
          }
        ],
        subsections: []
      }
    ],
    createdAt: "2025-10-16T13:12:36.344Z",
    updatedAt: "2025-10-16T13:12:36.344Z"
  },
  {
    id: "68f0ef44845466491b7b2cf1",
    name: "Entrantes",
    slug: "entrantes",
    subcategories: [
      {
        name: "Entrantes",
        items: [
          {
            name: "Bacon cheese fries",
            price: 10,
            description: "Patatas fritas crujientes cubiertas con una fundente salsa de queso y lluvia de bacon ahumado.",
            imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/PATATAS_BACON_Y_QUESO_lnibyb",
            variants: []
          },
          {
            name: "Fingers",
            price: 8.5,
            description: "Tiras de pechuga de pollo empanadas en panko para un extra de crujiente, acompañadas de nuestra salsa artesana de mostaza y miel.",
            imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/TIRAS_DE_POLLO_kbtuvf",
            variants: []
          },
          {
            name: "Tequeños",
            price: 9,
            description: "Palitos de queso fundente envueltos en masa tradicional, servidos con un toque dulce de sirope de fresa.",
            imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/TEQUEÑOS_vftqlw",
            variants: []
          },
          {
            name: "Croquetas de jamón",
            price: 9,
            description: "Croquetas clásicas de jamón, cremosas por dentro y doradas por fuera.",
            imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/CROQUETAS_e4c25k",
            variants: []
          },
          {
            name: "Quesadillas",
            price: 7,
            description: "Tortillas de trigo rellenas de jamón y una mezcla de quesos fundidos, acompañadas de dip de crema de queso.",
            imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/COMIDA_2_2_a3nssr",
            variants: []
          },
          {
            name: "Alitas tailandesas",
            price: 8,
            description: "Alitas de pollo glaseadas con salsa sweet chili para un equilibrio perfecto entre dulce y picante.",
            imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/ALITAS_2_i2q313",
            variants: []
          },
          {
            name: "Ensalada de burrata con tomate",
            price: 9,
            description: "Corazón de burrata cremosa sobre una base de tomates seleccionados y un toque aromático de pesto de albahaca.",
            imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/BURRATA_a5u73h",
            variants: []
          },
          {
            name: "Ensalada Cesar",
            price: 12,
            description: "Hojas frescas de lechuga, pollo a la plancha, croutons crujientes y nuestra genuina salsa César con queso parmesano.",
            imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/ENSALADA_CESAR_dv7pp6",
            variants: []
          }
        ],
        subsections: []
      }
    ],
    createdAt: "2025-10-16T13:12:36.589Z",
    updatedAt: "2025-10-16T13:12:36.589Z"
  },
  {
    id: "68f0ef44845466491b7b2cf4",
    name: "Comidas",
    slug: "comidas",
    subcategories: [
      {
        name: "Comidas principales",
        items: [
          {
            name: "Cheese burger",
            price: 13.5,
            description: "Doble carne (180g) con queso fundido, bacon crujiente y nuestra salsa burger secreta. Servida con patatas fritas.",
            imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/v1759172140/HAMBURGUESA_1_kpeok1.jpg",
            variants: []
          },
          {
            name: "Lady BBQ",
            price: 13.5,
            description: "Doble carne (180g) con el contraste perfecto de cebolla a la plancha y cebolla frita crujiente, bañada en salsa barbacoa. Acompañada de patatas.",
            imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/v1759172140/HAMBURGUESA_2_cjpkzb.jpg",
            variants: []
          },
          {
            name: "Egocentrica",
            price: 14.5,
            description: "Pechuga de pollo crujiente en panko con mayonesa suave, bacon, tomate y lechuga fresca. Incluye guarnición de patatas.",
            imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/v1759172141/HAMBURGUESA_3_nixycj.jpg",
            variants: []
          },
          {
            name: "Club sandwich",
            price: 13,
            description: "El clásico de tres pisos con pollo a la plancha, jamón cocido, queso, bacon, lechuga y tomate. Servido con patatas.",
            imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/COMIDA_3_jo8flu",
            variants: []
          },
          {
            name: "Entrecot",
            price: 21,
            description: "Corte selecto de entrecot de 300g cocinado a su punto y acompañado de patatas fritas.",
            imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/ENTRECOT_gwlgu2",
            variants: []
          },
          {
            name: "Poke de pollo",
            price: 12,
            description: "Base de arroz de sushi acompañada de jugoso pollo a la plancha, aguacate cremoso y un toque de salsa yakiniku.",
            imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/COMIDA_1_lp57cc",
            variants: []
          },
          {
            name: "Poke de salmon",
            price: 12,
            description: "Base de arroz con láminas de salmón ahumado de primera calidad y aderezo de salsa yakiniku.",
            imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/COMIDA_2_lizzfn",
            variants: []
          }
        ],
        subsections: []
      }
    ],
    createdAt: "2025-10-16T13:12:36.854Z",
    updatedAt: "2025-10-16T13:12:36.854Z"
  },
  {
    id: "68f0ef45845466491b7b2cf7",
    name: "Postres",
    slug: "postres",
    subcategories: [
      {
        name: "Postres",
        items: [
          {
            name: "Brownie",
            price: 5.5,
            description: "Bizcocho artesano de chocolate intenso con hilos de caramelo y una bola de helado de vainilla premium.",
            imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/POSTRE_2_l0zycj",
            variants: []
          },
          {
            name: "Coulant",
            price: 5.5,
            description: "Volcán de bizcocho con corazón de chocolate fundido, servido con helado de vainilla y sirope de chocolate.",
            imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/POSTRE_1_l4plzo",
            variants: []
          }
        ],
        subsections: []
      }
    ],
    createdAt: "2025-10-16T13:12:37.076Z",
    updatedAt: "2025-10-16T13:12:37.076Z"
  },
  {
    id: "69b9ea42bb938fcefa20ddc8",
    name: "Bebidas",
    slug: "bebidas",
    subcategories: [
      {
        name: "Cocktails",
        items: [],
        subsections: [
          {
            name: "Clásicos",
            items: [
              {
                name: "Mojito clásico",
                price: 9,
                description: "Refrescante combinación de ron blanco, lima fresca, azúcar de caña y hojas de menta, terminado con un toque de soda.",
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/v1761675312/DSC08973_pg9u83.jpg",
                variants: []
              },
              {
                name: "Mojito de sabores",
                price: 9,
                description: "Nuestra versión clásica del mojito infusionada con purés de frutas naturales (fresa, mango o maracuyá).",
                notes: "Sabores varios",
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/Mojito_de_sabores_whiz0m",
                variants: []
              },
              {
                name: "Piña colada",
                price: 9,
                description: "Un viaje al trópico con ron, crema de coco cremosa y zumo de piña natural.",
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/PIÑA_COLADA_iuojwr",
                variants: []
              },
              {
                name: "Daiquiri clásico",
                price: 9,
                description: "Elegante y equilibrada mezcla de ron blanco, zumo de lima recién exprimido y un toque de azúcar.",
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/Daiquiri_clásico_m2cqc0",
                variants: []
              },
              {
                name: "Daiquiri de frutas",
                price: 9,
                description: "La frescura del daiquiri tradicional batida con frutas seleccionadas para un acabado tipo granizado.",
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/v1761675312/DSC08935_bta67a.jpg",
                variants: []
              },
              {
                name: "Sex on the Beach",
                price: 9,
                description: "El clásico veraniego con vodka, licor de melocotón, zumo de naranja y zumo de arándanos.",
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/v1761675312/DSC08954_zzc6oz.jpg",
                variants: []
              },
              {
                name: "Margarita",
                price: 9,
                description: "Equilibrio perfecto entre tequila reposado, licor de naranja y zumo de lima, servido con el tradicional borde de sal.",
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/v1759172218/MARGARITA_wqvxko.jpg",
                variants: []
              },
              {
                name: "San Francisco",
                price: 9,
                description: "Combinado sin alcohol a base de zumos de naranja, limón, piña y melocotón con un toque dulce de granadina.",
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/v1759172219/SAN_FRANCISCO_ikkbl9.jpg",
                variants: []
              },
              {
                name: "Caipirinha",
                price: 9,
                description: "El alma de Brasil: Cachaça, trozos de lima fresca y azúcar macerados con hielo pilé.",
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/v1759172217/CAIPIRIÑA_lozz49.jpg",
                variants: []
              }
            ]
          },
          {
            name: "Autor",
            items: [
              {
                name: "Umi Oriental",
                price: 11,
                description: "yuzu, melón, albahaca, blue curaçao, lima y ginebra",
                tagline: "minimalista y delicado",
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/v1759521341/7_ux3ynh.jpg",
                variants: []
              },
              {
                name: "Rosé de minuit",
                price: 11,
                description: "naranja, fresa y cava",
                tagline: "sofisticado y misterioso",
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/v1759521341/3_gwof66.jpg",
                variants: []
              },
              {
                name: "Baobab Dreams",
                price: 11,
                description: "piña, plátano, coco y ron",
                tagline: "exótico y evocador",
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/v1759521340/1_dgrzey.jpg",
                variants: []
              },
              {
                name: "Smoky Tennessee",
                price: 11,
                description: "naranja, limón, granadina y Jack Daniel's",
                tagline: "dulzura ahumada",
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/v1759521342/10_iwabkx.jpg",
                variants: []
              },
              {
                name: "Rojo Zar",
                price: 11,
                description: "zumo de granada, limón, azúcar, agua con gas y vodka",
                tagline: "Desde Rusia con amor",
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/v1759521341/5_dcvebf.jpg",
                variants: []
              }
            ]
          }
        ]
      },
      {
        name: "Destilados",
        items: [],
        subsections: [
          {
            name: "Vodka",
            items: [
              {
                name: "Absolut",
                price: 10,
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/ABSOLUT_VODKA_fgu1ru",
                variants: [
                  {
                    name: "Copa",
                    price: 10
                  },
                  {
                    name: "Chupito",
                    price: 5
                  }
                ]
              },
              {
                name: "Ciroc piña",
                price: 13,
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/CIROC_PINEAPPLE_fnwbvo",
                variants: [
                  {
                    name: "Copa",
                    price: 13
                  },
                  {
                    name: "Chupito",
                    price: 5
                  }
                ]
              },
              {
                name: "Ciroc frutos rojos",
                price: 13,
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/CIROC_RED_BERRY_tdvprz",
                variants: [
                  {
                    name: "Copa",
                    price: 13
                  },
                  {
                    name: "Chupito",
                    price: 5
                  }
                ]
              },
              {
                name: "Ciroc manzana",
                price: 13,
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/CIROC_APPLE_tizlru",
                variants: [
                  {
                    name: "Copa",
                    price: 13
                  },
                  {
                    name: "Chupito",
                    price: 5
                  }
                ]
              },
              {
                name: "Ciroc normal",
                price: 13,
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/CIROC_VODKA_fxytqv",
                variants: [
                  {
                    name: "Copa",
                    price: 13
                  },
                  {
                    name: "Chupito",
                    price: 5
                  }
                ]
              },
              {
                name: "Belvedere",
                price: 13,
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/BELVEDERE_plqh4n",
                variants: [
                  {
                    name: "Copa",
                    price: 13
                  },
                  {
                    name: "Chupito",
                    price: 5
                  }
                ]
              },
              {
                name: "Grey goose",
                price: 13,
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/GREY_GOOSE_w0tf3e",
                variants: [
                  {
                    name: "Copa",
                    price: 13
                  },
                  {
                    name: "Chupito",
                    price: 5
                  }
                ]
              }
            ]
          },
          {
            name: "Ginebra",
            items: [
              {
                name: "Martin miller's",
                price: 13,
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/MARTIN_MILLERS_tnow7c",
                variants: [
                  {
                    name: "Copa",
                    price: 13
                  },
                  {
                    name: "Chupito",
                    price: 5
                  }
                ]
              },
              {
                name: "Seagram's",
                price: 10,
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/SEAGRAMS_DRY_i2jhyu",
                variants: [
                  {
                    name: "Copa",
                    price: 10
                  },
                  {
                    name: "Chupito",
                    price: 5
                  }
                ]
              },
              {
                name: "Tanqueray",
                price: 10,
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/TANQUERAY_exdr1h",
                variants: [
                  {
                    name: "Copa",
                    price: 10
                  },
                  {
                    name: "Chupito",
                    price: 5
                  }
                ]
              },
              {
                name: "Larios 12",
                price: 10,
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/LARIOS_12_ua6ezv",
                variants: [
                  {
                    name: "Copa",
                    price: 10
                  },
                  {
                    name: "Chupito",
                    price: 5
                  }
                ]
              },
              {
                name: "Puerto indias fresa",
                price: 10,
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/PUERTO_DE_INDIAS_ihvxih",
                variants: [
                  {
                    name: "Copa",
                    price: 10
                  },
                  {
                    name: "Chupito",
                    price: 5
                  }
                ]
              },
              {
                name: "Nordés",
                price: 13,
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/NORDES_kxtgdj",
                variants: [
                  {
                    name: "Copa",
                    price: 13
                  },
                  {
                    name: "Chupito",
                    price: 5
                  }
                ]
              },
              {
                name: "Masters Gin",
                price: 10,
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/MASTERS_GIN_ygkcyu",
                variants: [
                  {
                    name: "Copa",
                    price: 10
                  },
                  {
                    name: "Chupito",
                    price: 5
                  }
                ]
              },
              {
                name: "G'vine",
                price: 13,
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/v1759172283/GVINE_GIN_DE_TRANCE_wfeh1x.jpg",
                variants: [
                  {
                    name: "Copa",
                    price: 13
                  },
                  {
                    name: "Chupito",
                    price: 5
                  }
                ]
              },
              {
                name: "Bulldog",
                price: 10,
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/BULLDOG_h71zmp",
                variants: [
                  {
                    name: "Copa",
                    price: 10
                  },
                  {
                    name: "Chupito",
                    price: 5
                  }
                ]
              },
              {
                name: "Citadelle",
                price: 10,
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/CITADELLE_ezpjoj",
                variants: [
                  {
                    name: "Copa",
                    price: 10
                  },
                  {
                    name: "Chupito",
                    price: 5
                  }
                ]
              },
              {
                name: "London Number 1",
                price: 10,
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/THE_LONDON_ngb1dh",
                variants: [
                  {
                    name: "Copa",
                    price: 10
                  },
                  {
                    name: "Chupito",
                    price: 5
                  }
                ]
              },
              {
                name: "Ginmare",
                price: 10,
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/GIN_MARE_qv4o3m",
                variants: [
                  {
                    name: "Copa",
                    price: 10
                  },
                  {
                    name: "Chupito",
                    price: 5
                  }
                ]
              },
              {
                name: "Tanqueray 0'0",
                price: 10,
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/TANQUERAY_00_qv2itc",
                variants: [
                  {
                    name: "Copa",
                    price: 10
                  },
                  {
                    name: "Chupito",
                    price: 5
                  }
                ]
              },
              {
                name: "Hendrick's",
                price: 13,
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/HENDRICKS_pbayx3",
                variants: [
                  {
                    name: "Copa",
                    price: 13
                  },
                  {
                    name: "Chupito",
                    price: 5
                  }
                ]
              }
            ]
          },
          {
            name: "Whisky",
            items: [
              {
                name: "Johnnie Walker red label",
                price: 10,
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/RED_LABEL_v4k69u",
                variants: [
                  {
                    name: "Copa",
                    price: 10
                  },
                  {
                    name: "Chupito",
                    price: 5
                  }
                ]
              },
              {
                name: "Johnnie Walker black label",
                price: 10,
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/BLACK_LABEL_gj3ov2",
                variants: [
                  {
                    name: "Copa",
                    price: 10
                  },
                  {
                    name: "Chupito",
                    price: 5
                  }
                ]
              },
              {
                name: "Johnnie Walker green label",
                price: 13,
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/GREEN_LABEL_og1ajs",
                variants: [
                  {
                    name: "Copa",
                    price: 13
                  },
                  {
                    name: "Chupito",
                    price: 5
                  }
                ]
              },
              {
                name: "Johnnie Walker Blue Label",
                price: 28,
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/BLUE_LABEL_wp0e6k",
                variants: [
                  {
                    name: "Copa",
                    price: 28
                  },
                  {
                    name: "Chupito",
                    price: 15
                  }
                ]
              },
              {
                name: "Macallan 12 años",
                price: 25,
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/v1759172300/MCALLAN_alijbr.jpg",
                variants: [
                  {
                    name: "Copa",
                    price: 25
                  },
                  {
                    name: "Chupito",
                    price: 12
                  }
                ]
              },
              {
                name: "Dewar's 15 años",
                price: 13,
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/v1759172274/DEWARS_nhxafd.jpg",
                variants: [
                  {
                    name: "Copa",
                    price: 13
                  },
                  {
                    name: "Chupito",
                    price: 5
                  }
                ]
              },
              {
                name: "DYC 8 años",
                price: 13,
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/DYC_uzyjiv",
                variants: [
                  {
                    name: "Copa",
                    price: 13
                  },
                  {
                    name: "Chupito",
                    price: 5
                  }
                ]
              },
              {
                name: "Cutty sark 12 años",
                price: 10,
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/CUTTY_SARK_inukfj",
                variants: [
                  {
                    name: "Copa",
                    price: 10
                  },
                  {
                    name: "Chupito",
                    price: 5
                  }
                ]
              },
              {
                name: "J&B",
                price: 10,
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/JB_dinago",
                variants: [
                  {
                    name: "Copa",
                    price: 10
                  },
                  {
                    name: "Chupito",
                    price: 5
                  }
                ]
              },
              {
                name: "Jack Daniels",
                price: 13,
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/JACK_DANIELS_dmynw7",
                variants: [
                  {
                    name: "Copa",
                    price: 13
                  },
                  {
                    name: "Chupito",
                    price: 5
                  }
                ]
              }
            ]
          },
          {
            name: "Ron",
            items: [
              {
                name: "Barceló añejo",
                price: 10,
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/BARCELO_zfmecg",
                variants: [
                  {
                    name: "Copa",
                    price: 10
                  },
                  {
                    name: "Chupito",
                    price: 5
                  }
                ]
              },
              {
                name: "Brugal añejo",
                price: 10,
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/Brugal_rnbgsh",
                variants: [
                  {
                    name: "Copa",
                    price: 10
                  },
                  {
                    name: "Chupito",
                    price: 5
                  }
                ]
              },
              {
                name: "Legendario",
                price: 10,
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/Legendario_cluljd",
                variants: [
                  {
                    name: "Copa",
                    price: 10
                  },
                  {
                    name: "Chupito",
                    price: 5
                  }
                ]
              },
              {
                name: "Havana club 7 años",
                price: 13,
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/HAVANA_ielo5y",
                variants: [
                  {
                    name: "Copa",
                    price: 13
                  },
                  {
                    name: "Chupito",
                    price: 5
                  }
                ]
              },
              {
                name: "Zacapa",
                price: 13,
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/v1759521333/Zacapa_wjavgd.png",
                variants: [
                  {
                    name: "Copa",
                    price: 13
                  },
                  {
                    name: "Chupito",
                    price: 6
                  }
                ]
              },
              {
                name: "Ron Santa Teresa 1796",
                price: 13,
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/SANTA_TERESA_i7dqnk",
                variants: [
                  {
                    name: "Copa",
                    price: 13
                  },
                  {
                    name: "Chupito",
                    price: 6
                  }
                ]
              }
            ]
          },
          {
            name: "Tequila",
            items: [
              {
                name: "Don julio Reposado",
                price: 13,
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/DON_JULIO_v5jhp0",
                variants: [
                  {
                    name: "Copa",
                    price: 13
                  },
                  {
                    name: "Chupito",
                    price: 5
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        name: "Refrescos",
        items: [
          {
            name: "Agua",
            price: 3,
            imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/f_auto,q_auto,w_600/v1759413205/Agua_demd03.png",
            variants: []
          },
          {
            name: "Agua con gas",
            price: 3.5,
            imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/v1759413205/Agua_demd03.png",
            variants: []
          },
          {
            name: "Refresco pequeño",
            price: 3,
            imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/v1759420149/Refresco_peque%C3%B1o_fyulcy.png",
            variants: []
          },
          {
            name: "CocaCola",
            price: 3.5,
            imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/v1759413206/Coca_cola_neoe67.png",
            variants: []
          },
          {
            name: "CocaCola Zero",
            price: 3.5,
            imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/v1759413206/Coca_cola_zero_ayzngu.png",
            variants: []
          },
          {
            name: "Sprite",
            price: 3.5,
            imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/v1759413212/Sprite_aburvy.png",
            variants: []
          },
          {
            name: "Fanta de naranja",
            price: 3.5,
            imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/v1759413206/Fanta_naranja_bf6n6a.png",
            variants: []
          },
          {
            name: "Fanta de limón",
            price: 3.5,
            imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/v1759413206/Fanta_limon_ibrrte.png",
            variants: []
          },
          {
            name: "Nestea sin azúcar",
            price: 3.5,
            imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/v1759413211/Nestea_sin_azucar_sq1ttg.png",
            variants: []
          },
          {
            name: "Nestea de maracuyá",
            price: 3.5,
            imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/v1759413211/Nestea_de_maracuyá_qfdwdy.png",
            variants: []
          },
          {
            name: "Aquarius de limón",
            price: 3.5,
            imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/v1759413205/Aquarius_limon_wzhz8a.png",
            variants: []
          },
          {
            name: "Aquarius de naranja",
            price: 3.5,
            imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/v1759413205/Aquarius_naranja_hykvig.png",
            variants: []
          },
          {
            name: "Monsters",
            price: 4,
            imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/v1759413206/Monsters_npjrwc.png",
            variants: []
          },
          {
            name: "Red Bulls",
            price: 3.5,
            imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/v1759413211/Redbull_pvnclm.png",
            variants: []
          }
        ],
        subsections: []
      },
      {
        name: "Vinos",
        items: [],
        subsections: [
          {
            name: "Tintos",
            items: [
              {
                name: "Rioja (Rama Corta Crianza)",
                price: 4,
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/RAMA_CORTA_j6tz3a",
                variants: []
              },
              {
                name: "Ribera del Duero (La planta)",
                price: 4,
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/v1759172290/LA_PLANTA_RIBERA_DEL_DUERO_dzucnd.jpg",
                variants: []
              }
            ]
          },
          {
            name: "Blancos",
            items: [
              {
                name: "Semidulce (Alma)",
                price: 4,
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/ALMA_rmvygx",
                variants: []
              },
              {
                name: "Albariño (Márquez de Vizhoja)",
                price: 4,
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/MARQUES_DE_VIZHOJA_zfmwby",
                variants: []
              }
            ]
          },
          {
            name: "Botellas",
            items: [
              {
                name: "Rama Corta Crianza",
                price: 20,
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/RAMA_CORTA_j6tz3a",
                variants: []
              },
              {
                name: "La planta",
                price: 20,
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/v1759172290/LA_PLANTA_RIBERA_DEL_DUERO_dzucnd.jpg",
                variants: []
              },
              {
                name: "Alma",
                price: 18,
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/ALMA_rmvygx",
                variants: []
              },
              {
                name: "Márquez de Vizhoja",
                price: 20,
                imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/MARQUES_DE_VIZHOJA_zfmwby",
                variants: []
              }
            ]
          }
        ]
      },
      {
        name: "Cafés y tés",
        items: [],
        subsections: [
          {
            name: "Cafés",
            items: [
              {
                name: "Próximamente",
                price: 0,
                description: "Próximamente",
                imageUrl: "",
                variants: []
              }
            ]
          },
          {
            name: "Tés",
            items: [
              {
                name: "Próximamente",
                price: 0,
                description: "Próximamente",
                imageUrl: "",
                variants: []
              }
            ]
          }
        ]
      },
      {
        name: "Cervezas",
        items: [
          {
            name: "Tercio de Mahou",
            price: 3.5,
            imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/v1759413215/Tercio_Mahou_wmgbmt.png",
            variants: []
          },
          {
            name: "Alhambra",
            price: 3.5,
            imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/v1759413205/Alhambra_owcjdu.png",
            variants: []
          },
          {
            name: "Radler",
            price: 3.5,
            imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/v1759413211/Radler_trkkpz.png",
            variants: []
          },
          {
            name: "Cerveza 0,0",
            price: 3.5,
            imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/v1759413205/Cerveza_0.0_x9xmvb.png",
            variants: []
          },
          {
            name: "Coronita",
            price: 3.5,
            imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/v1759413206/Coronita_wtala8.png",
            variants: []
          }
        ],
        subsections: []
      },
      {
        name: "Zumos",
        items: [
          {
            name: "Zumo de naranja",
            price: 2.5,
            imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/v1759416344/Zumo_naranja_byq7cc.png",
            variants: []
          },
          {
            name: "Zumo de piña",
            price: 2.5,
            imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/v1759416343/Zumo_piña_e4edq1.png",
            variants: []
          },
          {
            name: "Zumo de melocotón",
            price: 2.5,
            imageUrl: "https://res.cloudinary.com/dm70hhhnm/image/upload/v1759416343/Zumo_melocoton_jtyq1q.png",
            variants: []
          }
        ],
        subsections: []
      }
    ],
    createdAt: "2025-10-15T13:12:36.082Z",
    updatedAt: "2025-10-30T00:52:12.476Z"
  }
];
