export const GALLERY_CATEGORIES = [
  { id: 'todas', name: 'Todas' },
] as const;

export type CategoryId = typeof GALLERY_CATEGORIES[number]['id'];

/**
 * URLs de imágenes de cachimbas organizadas por categoría
 */
export const GALLERY_IMAGES: Record<CategoryId, string[]> = {
  todas: [
    'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180359/_5047250_dzuzyr.jpg',
    'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180358/_5047254_qdhh87.jpg',
    'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180358/_5047259_rkjvzg.jpg',
    'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180358/_5047258_c0oaiv.jpg',
    'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180358/_5047253_xoasws.jpg',
    'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180348/_5047248_c7qx2d.jpg',
    'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180348/_5047239_oiezxq.jpg',
    'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180348/_5047242_fh4wkz.jpg',
    'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180348/_5047244_k8dxki.jpg',
    'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180348/_5047245_rcfmhk.jpg',
    'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180348/_5047241_kflmfg.jpg',
    'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180347/_5047234_w3b0xe.jpg',
    'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180347/_5047235_t5p0ea.jpg',
    'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180347/_5047232_ywdh0u.jpg',
    'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180347/_5047237_yfiscd.jpg',
    'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180347/_5047204_ketf7p.jpg',
    'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180346/_5047180_gvgihc.jpg',
    'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180346/_5047166_m74fes.jpg',
    'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180346/_5047175_ab68ud.jpg',
    'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180346/_5047156_wgscoq.jpg',
    'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180346/_5047147_crgjhf.jpg',
    'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180346/_5047152_f9gb1p.jpg',
    'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180346/_5047143_smczsk.jpg',
    'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180346/_5047136_domezv.jpg',
    'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180346/_5047132_ka1iu3.jpg',
    'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180345/_5047119_hyj7j3.jpg',
    'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180345/_5047121_sotww6.jpg',
    'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180345/_5047113_aiuwvm.jpg',
    'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180345/_5047075_abqa82.jpg',
    'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180345/_5047026_n672uj.jpg',
    'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180345/_5047025_cokcwe.jpg',
    'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180345/_5047067_obgbd1.jpg',
    'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180344/_5047003_txjyf2.jpg',
    'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180344/_5047000_ecautz.jpg',
    'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180344/_5046901_ugfitl.jpg',
    'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180344/_5046984_fvuzw1.jpg',
    'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180344/_5046880_xvuv7k.jpg',
    'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180344/_5046973_igjg8n.jpg',
    'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180343/_5046955_wvoovm.jpg',
    'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180343/_5046787_v76dgu.jpg',
    'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180343/_5046870_mwpqzm.jpg',
    'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180343/_5046845_xaxn9a.jpg',
    'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180343/_5046852_ombifo.jpg',
    'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180343/_5046950_udbpvt.jpg',
    'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180343/_5046819_qekl19.jpg',
    'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180342/_5046815_dhcbaw.jpg',
    'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180342/_5046801_okd6ll.jpg',
    'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180342/_5046939_pm5bhs.jpg',
  ],
};

export const FEATURED_IMAGE = 'https://res.cloudinary.com/dm70hhhnm/image/upload/v1759180347/_5047204_ketf7p.jpg';
