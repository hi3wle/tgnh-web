// components/navigation-menu/navigation-menu.js
(() => {
  const menu = document.querySelector('[data-navigation-menu]');
  if (!menu) return;

  const triggers = [...document.querySelectorAll('[data-menu-target]')];
  const panels = [...menu.querySelectorAll('[data-menu-panel]')];
  const backdrop = menu.querySelector('[data-menu-backdrop]');
  const navigationShell = menu.closest('.navigation-shell');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobileTrigger = document.querySelector('[data-mobile-brands]');
  const brandPanel = panels.find((panel) => panel.dataset.menuPanel === 'brands');
  let mobileOpen = false;
  let inertBackground = [];
  let activeName = null;
  let closeTimer = null;

  const panelFor = (name) => panels.find((panel) => panel.dataset.menuPanel === name);

  function positionMobilePanel() {
    const promoHeight = document.querySelector('.promo-bar').getBoundingClientRect().height;
    const headerHeight = document.querySelector('.header-navbar').getBoundingClientRect().height;
    const bottomHeight = document.querySelector('.mobile-navigation').getBoundingClientRect().height;
    document.body.style.setProperty('--brand-promo-height', `${promoHeight}px`);
    document.body.style.setProperty('--brand-panel-top', `${promoHeight + headerHeight}px`);
    document.body.style.setProperty('--brand-panel-bottom', `${bottomHeight}px`);
  }

  function closeMobileBrands(restoreFocus = true) {
    if (!mobileOpen) return;
    mobileOpen = false;
    document.body.classList.remove('mobile-brands-open');
    menu.classList.remove('is-open');
    brandPanel.classList.remove('is-active');
    brandPanel.hidden = true;
    mobileTrigger.setAttribute('aria-expanded', 'false');
    inertBackground.forEach((element) => { element.inert = false; });
    inertBackground = [];
    if (restoreFocus) mobileTrigger.focus({ preventScroll: true });
  }

  mobileTrigger?.addEventListener('click', () => {
    if (mobileOpen) return closeMobileBrands();
    closeMenu();
    window.clearTimeout(closeTimer);
    positionMobilePanel();
    mobileOpen = true;
    document.body.classList.add('mobile-brands-open');
    inertBackground = [...document.querySelectorAll('main, footer, .mobile-shortcuts, .hero-carousel, .benefit-bar')].filter((element) => !element.inert);
    inertBackground.forEach((element) => { element.inert = true; });
    brandPanel.hidden = false;
    brandPanel.classList.add('is-active');
    menu.classList.add('is-open');
    brandPanel.scrollTop = 0;
    mobileTrigger.setAttribute('aria-expanded', 'true');
    brandPanel.querySelector('[data-brand-close]').focus({ preventScroll: true });
  });
  brandPanel.querySelector('[data-brand-close]').addEventListener('click', () => closeMobileBrands());
  brandPanel.querySelector('[data-brand-all]').addEventListener('click', () => brandPanel.scrollTo({ top: 0, behavior: reducedMotion.matches ? 'auto' : 'smooth' }));
  brandPanel.querySelectorAll('[data-brand-letter]').forEach((button) => {
    button.addEventListener('click', () => {
      const group = brandPanel.querySelector(`#brand-letter-${button.dataset.brandLetter}`);
      const top = group.getBoundingClientRect().top - brandPanel.getBoundingClientRect().top + brandPanel.scrollTop - 14;
      brandPanel.scrollTo({ top, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
    });
  });
  brandPanel.querySelectorAll('.navigation-menu__brand-grid a').forEach((link) => link.addEventListener('click', () => closeMobileBrands(false)));

  function closeMenu({ restoreFocus = false } = {}) {
    if (!activeName) return;
    const activeTrigger = triggers.find((trigger) => trigger.dataset.menuTarget === activeName);
    const activePanel = panelFor(activeName);

    window.clearTimeout(closeTimer);
    menu.classList.remove('is-open');
    activePanel?.classList.remove('is-active');
    triggers.forEach((trigger) => trigger.setAttribute('aria-expanded', 'false'));
    activeName = null;

    const finish = () => panels.forEach((panel) => { panel.hidden = true; });
    if (reducedMotion.matches) finish();
    else closeTimer = window.setTimeout(finish, 180);
    if (restoreFocus) activeTrigger?.focus();
  }

  function openMenu(name) {
    const targetPanel = panelFor(name);
    if (!targetPanel) return;
    if (activeName === name) return;

    window.clearTimeout(closeTimer);
    panels.forEach((panel) => {
      panel.hidden = panel !== targetPanel;
      panel.classList.remove('is-active');
    });
    void targetPanel.offsetHeight;
    targetPanel.classList.add('is-active');
    triggers.forEach((trigger) => {
      trigger.setAttribute('aria-expanded', String(trigger.dataset.menuTarget === name));
    });
    activeName = name;
    menu.classList.add('is-open');
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener('mouseenter', () => openMenu(trigger.dataset.menuTarget));
    trigger.addEventListener('focus', () => openMenu(trigger.dataset.menuTarget));
    trigger.addEventListener('click', () => openMenu(trigger.dataset.menuTarget));
  });
  navigationShell.querySelectorAll('.category-nav a').forEach((link) => {
    link.addEventListener('mouseenter', () => closeMenu());
  });
  navigationShell.addEventListener('mouseleave', () => closeMenu());
  backdrop.addEventListener('mouseenter', () => closeMenu());
  backdrop.addEventListener('click', () => closeMenu());
  document.addEventListener('click', (event) => {
    if (!activeName || event.target.closest('[data-menu-target], [data-navigation-menu]')) return;
    closeMenu();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mobileOpen) closeMobileBrands();
    if (event.key === 'Escape') closeMenu({ restoreFocus: true });
  });
  window.addEventListener('resize', () => {
    if (mobileOpen && window.innerWidth >= 992) closeMobileBrands(false);
    else if (mobileOpen) positionMobilePanel();
    if (window.innerWidth < 992) closeMenu();
  });
})();


// components/perfume-knowledge/perfume-knowledge.js
document.querySelectorAll('.perfume-knowledge__details').forEach((details) => {
  const close = details.querySelector('.perfume-knowledge__close');
  if (!close) return;
  details.classList.add('is-enhanced');
  close.hidden = false;
  close.addEventListener('click', () => {
    details.open = false;
    details.querySelector('summary').focus({ preventScroll: true });
    details.querySelector('summary').scrollIntoView({ block: 'nearest' });
  });
});


// assets/js/mock-data.js
window.TGNH_MOCK_DATA = {
  "products": [
    {
      "slug": "signorina-misteriosa",
      "name": "Signoria",
      "brand": "Salvatore Ferragamo",
      "description": "Hương thơm nữ tính nổi bật trong bộ sưu tập ưu đãi 20.10.",
      "price": 1190000,
      "image": "assets/images/desktop/hfxkscv7_expires_30_days.png",
      "original_price": 2500000,
      "discount_percent": 39
    },
    {
      "slug": "paco-rabanne",
      "name": "Paco Rabanne",
      "brand": "Paco Rabanne",
      "description": "Nước hoa chính hãng trong chương trình ưu đãi tháng 10.",
      "price": 1190000,
      "image": "assets/images/desktop/b7njyh23_expires_30_days.png",
      "original_price": 2500000,
      "discount_percent": 39
    },
    {
      "slug": "moschino-toy-2",
      "name": "Moschino",
      "brand": "Moschino",
      "description": "Thiết kế trẻ trung với hương thơm ngọt ngào nổi bật.",
      "price": 1190000,
      "image": "assets/images/desktop/3ofvctat_expires_30_days.png",
      "original_price": 2500000,
      "discount_percent": 39
    },
    {
      "slug": "michael-kors-gorgeous",
      "name": "Michael Kors Gorgeous",
      "brand": "Michael Kors",
      "description": "Hương hoa trắng hiện đại dành cho phong cách thanh lịch.",
      "price": 1190000,
      "image": "assets/images/desktop/v9bfz2nr_expires_30_days.png",
      "original_price": 2500000,
      "discount_percent": 39
    },
    {
      "slug": "ferragamo-uomo",
      "name": "Salvatore Ferragamo Uomo Signature",
      "brand": "Salvatore Ferragamo",
      "description": "Hương thơm nam tính với cà phê, da thuộc và gia vị.",
      "price": 1190000,
      "image": "assets/images/desktop/sz17nqrr_expires_30_days.png",
      "original_price": 2500000,
      "discount_percent": 39
    },
    {
      "slug": "miss-saigon-elegance",
      "name": "BST Miss Saigon Elegance 15ml",
      "brand": "Miss Saigon",
      "description": "Bộ sưu tập nước hoa mini lấy cảm hứng từ vẻ đẹp Sài Gòn.",
      "price": 1035000,
      "image": "assets/images/desktop/wfymoxwt_expires_30_days.png",
      "original_price": 1150000,
      "discount_percent": 10
    },
    {
      "slug": "lomani-blanca-fantasy",
      "name": "Lomani Private Collection Blanca Fantasy",
      "brand": "Parour",
      "description": "Hương thơm thanh lịch thuộc Private Collection.",
      "price": 1064000,
      "image": "assets/images/desktop/wb571nbe_expires_30_days.png",
      "original_price": 1329000,
      "discount_percent": 20
    },
    {
      "slug": "lomani-silver-bloom",
      "name": "Lomani Private Collection Silver Bloom EDP",
      "brand": "Parour",
      "description": "Phiên bản Silver Bloom mới thuộc Private Collection.",
      "price": 1064000,
      "image": "assets/images/desktop/il97068b_expires_30_days.png",
      "original_price": 1329000,
      "discount_percent": 20
    },
    {
      "slug": "miss-saigon-elegance-cam",
      "name": "Miss Saigon Elegance Cam 50ml Eau de Parfum",
      "brand": "Miss Saigon",
      "description": "Nước hoa 50ml với thiết kế thanh lịch và sắc cam nổi bật.",
      "price": 648000,
      "image": "assets/images/desktop/kd0gy827_expires_30_days.png",
      "original_price": 720000,
      "discount_percent": 10
    },
    {
      "slug": "parour-milas-secret",
      "name": "Parour Mila's Secret Find Your Way",
      "brand": "Parour",
      "description": "Mùi hương hiện đại giúp thể hiện dấu ấn cá nhân.",
      "price": 952000,
      "image": "assets/images/desktop/4608ryf9_expires_30_days.png",
      "original_price": 1190000,
      "discount_percent": 20
    }
  ],
  "collections": {
    "flash-sale": [
      {
        "slug": "signorina-misteriosa",
        "image": "assets/images/desktop/7igr3gmj_expires_30_days.png",
        "mobile_image": "assets/images/mobile/vv0ybm55_expires_30_days.png",
        "alt": "Signoria",
        "badge": "Chỉ còn 5 sp"
      },
      {
        "slug": "paco-rabanne",
        "image": "assets/images/desktop/o9k05qka_expires_30_days.png",
        "mobile_image": "assets/images/mobile/c35m131y_expires_30_days.png",
        "alt": "Paco Rabanne"
      },
      {
        "slug": "moschino-toy-2",
        "image": "assets/images/desktop/q9lypfo0_expires_30_days.png",
        "mobile_image": "assets/images/mobile/mh8sonn3_expires_30_days.png",
        "alt": "Moschino",
        "badge": "Chỉ còn 1 ngày"
      },
      {
        "slug": "michael-kors-gorgeous",
        "image": "assets/images/desktop/j1pkks81_expires_30_days.png",
        "mobile_image": "assets/images/mobile/xnnp1fij_expires_30_days.png",
        "alt": "Michael Kors Gorgeous"
      },
      {
        "slug": "ferragamo-uomo",
        "image": "assets/images/desktop/sz17nqrr_expires_30_days.png",
        "alt": "Salvatore Ferragamo Uomo Signature"
      },
      {
        "slug": "miss-saigon-elegance",
        "image": "assets/images/desktop/wfymoxwt_expires_30_days.png",
        "alt": "BST Miss Saigon Elegance 15ml"
      }
    ],
    "favorites": [
      {
        "slug": "miss-saigon-elegance",
        "image": "assets/images/desktop/wfymoxwt_expires_30_days.png"
      },
      {
        "slug": "lomani-blanca-fantasy",
        "image": "assets/images/desktop/wb571nbe_expires_30_days.png"
      },
      {
        "slug": "lomani-silver-bloom",
        "image": "assets/images/desktop/il97068b_expires_30_days.png",
        "badge": "New"
      },
      {
        "slug": "miss-saigon-elegance-cam",
        "image": "assets/images/desktop/kd0gy827_expires_30_days.png"
      },
      {
        "slug": "parour-milas-secret",
        "image": "assets/images/desktop/4608ryf9_expires_30_days.png"
      },
      {
        "slug": "miss-saigon-elegance-cam",
        "image": "assets/images/desktop/kd0gy827_expires_30_days.png"
      },
      {
        "slug": "signorina-misteriosa",
        "image": "assets/images/mobile/vv0ybm55_expires_30_days.png",
        "badge": "Chỉ còn 5 sp"
      },
      {
        "slug": "paco-rabanne",
        "image": "assets/images/mobile/c35m131y_expires_30_days.png"
      },
      {
        "slug": "moschino-toy-2",
        "image": "assets/images/mobile/mh8sonn3_expires_30_days.png",
        "badge": "Chỉ còn 1 ngày"
      },
      {
        "slug": "michael-kors-gorgeous",
        "image": "assets/images/mobile/xnnp1fij_expires_30_days.png"
      },
      {
        "slug": "ferragamo-uomo",
        "image": "assets/images/desktop/sz17nqrr_expires_30_days.png"
      },
      {
        "slug": "signorina-misteriosa",
        "image": "assets/images/mobile/vv0ybm55_expires_30_days.png",
        "badge": "Chỉ còn 5 sp",
        "name": "Calvin Klein Eternity Amber Essence Intense Parfum 30ml Eau de parfum"
      },
      {
        "slug": "paco-rabanne",
        "image": "assets/images/mobile/c35m131y_expires_30_days.png",
        "name": "Nước hoa Ralph Lauren Romance EDP Intense 30ml Eau de parfum"
      },
      {
        "slug": "moschino-toy-2",
        "image": "assets/images/mobile/mh8sonn3_expires_30_days.png",
        "badge": "Chỉ còn 1 ngày",
        "name": "Nước hoa Parour Cigar Mystic Scent EDT For Men 75ml Eau de toilette"
      },
      {
        "slug": "michael-kors-gorgeous",
        "image": "assets/images/mobile/xnnp1fij_expires_30_days.png"
      },
      {
        "slug": "ferragamo-uomo",
        "image": "assets/images/desktop/sz17nqrr_expires_30_days.png"
      },
      {
        "slug": "miss-saigon-elegance",
        "image": "assets/images/desktop/wfymoxwt_expires_30_days.png"
      },
      {
        "slug": "lomani-blanca-fantasy",
        "image": "assets/images/desktop/wb571nbe_expires_30_days.png"
      }
    ],
    "exclusive": [
      {
        "slug": "signorina-misteriosa",
        "image": "assets/images/desktop/4s9bf3fo_expires_30_days.png",
        "mobile_image": "assets/images/mobile/51z7b4g4_expires_30_days.png",
        "alt": "Signoria",
        "badge": "Chỉ còn 5 sp",
        "eyebrow": "Sale"
      },
      {
        "slug": "paco-rabanne",
        "image": "assets/images/desktop/muwy6icq_expires_30_days.png",
        "mobile_image": "assets/images/mobile/rkcmd5jt_expires_30_days.png",
        "alt": "Paco Rabanne",
        "eyebrow": "Sale"
      },
      {
        "slug": "moschino-toy-2",
        "image": "assets/images/desktop/6ohjl08z_expires_30_days.png",
        "mobile_image": "assets/images/mobile/e0cwaz0z_expires_30_days.png",
        "alt": "Moschino",
        "badge": "Chỉ còn 1 ngày",
        "eyebrow": "Sale"
      },
      {
        "slug": "michael-kors-gorgeous",
        "image": "assets/images/desktop/5etrz60b_expires_30_days.png",
        "mobile_image": "assets/images/mobile/equpryx1_expires_30_days.png",
        "alt": "Michael Kors Gorgeous",
        "eyebrow": "Sale"
      },
      {
        "slug": "ferragamo-uomo",
        "image": "assets/images/desktop/oawrwabo_expires_30_days.png",
        "mobile_image": "assets/images/mobile/297g19c1_expires_30_days.png",
        "alt": "Salvatore Ferragamo Uomo Signature",
        "eyebrow": "Sale"
      },
      {
        "slug": "signorina-misteriosa",
        "image": "assets/images/desktop/hkaem47o_expires_30_days.png",
        "mobile_image": "assets/images/mobile/4mes3ihj_expires_30_days.png",
        "alt": "Signoria phiên bản hoa hồng",
        "badge": "Chỉ còn 5 sp",
        "eyebrow": "Sale"
      },
      {
        "slug": "paco-rabanne",
        "image": "assets/images/desktop/pe621wlc_expires_30_days.png",
        "alt": "Paco Rabanne phiên bản hoa hồng",
        "eyebrow": "Sale"
      },
      {
        "slug": "moschino-toy-2",
        "image": "assets/images/desktop/ah6rky18_expires_30_days.png",
        "alt": "Moschino phiên bản hoa hồng",
        "badge": "Chỉ còn 1 ngày",
        "eyebrow": "Sale"
      },
      {
        "slug": "michael-kors-gorgeous",
        "image": "assets/images/desktop/kkd0sbb6_expires_30_days.png",
        "alt": "Michael Kors Gorgeous phiên bản hoa hồng",
        "eyebrow": "Sale"
      },
      {
        "slug": "ferragamo-uomo",
        "image": "assets/images/desktop/1gcn7mq4_expires_30_days.png",
        "alt": "Salvatore Ferragamo Uomo Signature phiên bản hoa hồng",
        "eyebrow": "Sale"
      }
    ],
    "elegance": [
      {
        "slug": "miss-saigon-elegance",
        "image": "assets/images/desktop/vaaybvi3_expires_30_days.png",
        "mobile_image": "assets/images/mobile/anrji083_expires_30_days.png",
        "alt": "BST Miss Saigon Elegance 15ml"
      },
      {
        "slug": "miss-saigon-elegance",
        "image": "assets/images/desktop/m7m9lef0_expires_30_days.png",
        "mobile_image": "assets/images/mobile/4rptr4ok_expires_30_days.png",
        "alt": "BST Miss Saigon Elegance 15ml màu hồng"
      },
      {
        "slug": "miss-saigon-elegance",
        "image": "assets/images/desktop/6wzm1j3j_expires_30_days.png",
        "mobile_image": "assets/images/mobile/gxgyyquc_expires_30_days.png",
        "alt": "BST Miss Saigon Elegance 15ml màu đỏ"
      },
      {
        "slug": "miss-saigon-elegance",
        "image": "assets/images/desktop/976ubbef_expires_30_days.png",
        "mobile_image": "assets/images/mobile/fe4to0p7_expires_30_days.png",
        "alt": "BST Miss Saigon Elegance 15ml màu vàng"
      },
      {
        "slug": "miss-saigon-elegance",
        "image": "assets/images/desktop/ycdjisc8_expires_30_days.png",
        "mobile_image": "assets/images/mobile/t564g1ff_expires_30_days.png",
        "alt": "BST Miss Saigon Elegance 15ml màu trắng"
      },
      {
        "slug": "miss-saigon-elegance",
        "image": "assets/images/desktop/man80isk_expires_30_days.png",
        "mobile_image": "assets/images/mobile/580co9qp_expires_30_days.png",
        "alt": "BST Miss Saigon Elegance phiên bản 6"
      },
      {
        "slug": "miss-saigon-elegance",
        "image": "assets/images/desktop/bxjlipz5_expires_30_days.png",
        "alt": "BST Miss Saigon Elegance phiên bản 7"
      },
      {
        "slug": "miss-saigon-elegance",
        "image": "assets/images/desktop/9wirlgoa_expires_30_days.png",
        "alt": "BST Miss Saigon Elegance phiên bản 8"
      },
      {
        "slug": "miss-saigon-elegance",
        "image": "assets/images/desktop/70wcythb_expires_30_days.png",
        "alt": "BST Miss Saigon Elegance phiên bản 9"
      },
      {
        "slug": "miss-saigon-elegance",
        "image": "assets/images/desktop/0b2n8eew_expires_30_days.png",
        "alt": "BST Miss Saigon Elegance phiên bản 10"
      }
    ]
  }
};


// assets/js/product-carousel.js
document.querySelectorAll('[data-product-carousel]').forEach((carousel) => {
  const track = carousel.querySelector('[data-product-carousel-track]');
  const previous = carousel.querySelector('[data-product-carousel-prev]');
  const next = carousel.querySelector('[data-product-carousel-next]');

  if (!track || !previous || !next) return;

  const updateControls = () => {
    const maxScroll = track.scrollWidth - track.clientWidth;
    const hasOverflow = maxScroll > 1;
    previous.hidden = !hasOverflow || track.scrollLeft <= 1;
    next.hidden = !hasOverflow || track.scrollLeft >= maxScroll - 1;
  };

  const scrollDistance = () => {
    if (carousel.hasAttribute('data-carousel-page-step')) return track.clientWidth;

    const cards = track.querySelectorAll(':scope > .product-card');
    const isFlashSaleTablet = carousel.closest('.flash-sale')
      && window.matchMedia('(min-width: 700px) and (max-width: 1199.98px)').matches;

    return isFlashSaleTablet && cards.length > 3
      ? cards[3].offsetLeft - cards[0].offsetLeft
      : track.clientWidth * 0.8;
  };

  previous.addEventListener('click', () => {
    track.scrollBy({ left: -scrollDistance(), behavior: 'smooth' });
  });
  next.addEventListener('click', () => {
    track.scrollBy({ left: scrollDistance(), behavior: 'smooth' });
  });
  track.addEventListener('scroll', updateControls, { passive: true });
  window.addEventListener('resize', updateControls);
  updateControls();
});

document.querySelectorAll('.product-card').forEach((card) => {
  const media = card.querySelector(':scope > img, :scope > .product-picture');
  const productLink = card.querySelector('.product-link');
  if (!media || !productLink) return;

  const mediaFrame = document.createElement('div');
  mediaFrame.className = 'product-media';
  media.replaceWith(mediaFrame);
  mediaFrame.append(media);

  const quicklook = document.createElement('a');
  quicklook.className = 'product-quicklook';
  quicklook.href = productLink.getAttribute('href');
  quicklook.textContent = 'Xem chi tiết';
  quicklook.setAttribute('aria-label', `Xem chi tiết ${card.querySelector('p')?.textContent.trim() || 'sản phẩm'}`);
  mediaFrame.append(quicklook);
});


// assets/js/filter-dropdowns.js
(() => {
  const brands = [
    ['Azzaro', 17], ['Birkholz', 965], ['Burberry', 24], ['Bvlgari', 25],
    ['Calvin Klein', 27], ['Carolina Herrera', 28], ['Chloe', 533], ['Coach', 899],
    ['Creed', 35], ['Dolce & Gabbana', 41], ['Franck Muller', 959],
    ['Giorgio Armani', 48], ['Gucci', 51], ['Hugo Boss', 55], ['Issey Miyake', 167],
    ['Jean Paul Gaultier', 59], ['Jimmy Choo', 866], ['Kilian', 894], ['Lancôme', 68],
    ['Lolita Lempicka', 71], ['Marc Jacobs', 75], ['MCM', 964], ['Michael Kors', 921],
    ['Minus 417', 935], ['Monotheme', 973], ['Mont Blanc', 78], ['Moschino', 79],
    ['Narciso Rodriguez', 575], ['Paco Rabanne', 82], ['Parfums De Marly', 942],
    ['Parour', 951], ["Penhaligon's", 968], ['Pinesoo', 969], ['Prada', 88],
    ['Ralph Lauren', 89], ['Rochas', 972], ['Salvatore Ferragamo', 861],
    ['Thierry Mugler', 96], ['Valentino', 98], ['Versace', 100],
    ['Viktor & Rolf', 886], ['Yves Saint Laurent', 213]
  ].map(([label, id]) => ({ label, id }));

  const filters = [
    { key: 'brand', label: 'Thương hiệu', items: brands },
    { key: 'gender', label: 'Giới tính', items: ['Nam', 'Nữ', 'Unisex'] },
    { key: 'price', label: 'Giá KM', items: ['Dưới 1.000.000đ', '1.000.000đ – 2.000.000đ', '2.000.000đ – 3.000.000đ', 'Trên 3.000.000đ'] },
    { key: 'sort', label: 'Sắp xếp', items: ['Mới nhất', 'Bán chạy nhất', 'Giá tăng dần', 'Giá giảm dần'] }
  ];

  document.querySelectorAll('.exclusive__filters, .elegance__filters').forEach((container) => {
    if (container.querySelector('.filter-bar--overlay')) return;

    const bar = document.createElement('nav');
    bar.className = 'filter-bar filter-bar--overlay';
    bar.setAttribute('aria-label', 'Bộ lọc sản phẩm');

    filters.forEach(({ key, label, items }) => {
      const dropdown = document.createElement('div');
      dropdown.className = `dropdown filter-dropdown filter-dropdown--${key}`;

      const toggle = document.createElement('button');
      toggle.type = 'button';
      toggle.className = 'btn dropdown-toggle custom-select text-main filter-dropdown__toggle';
      toggle.setAttribute('data-bs-toggle', 'dropdown');
      toggle.setAttribute('data-bs-display', 'static');
      toggle.setAttribute('aria-expanded', 'false');

      const labelNode = document.createElement('span');
      labelNode.className = 'filter-dropdown__label';
      labelNode.textContent = label;
      toggle.append(labelNode);

      const icon = document.createElement('span');
      icon.className = 'filter-control__icon filter-chevron';
      icon.setAttribute('aria-hidden', 'true');
      icon.innerHTML = '<svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"><path d="M1 3h8L5 8z" fill="currentColor"/></svg>';
      toggle.append(icon);

      dropdown.append(toggle);

      const panel = document.createElement('ul');
      panel.className = 'dropdown-menu custom-select-dropdown filter-dropdown__panel';
      panel.setAttribute('role', 'menu');

      items.forEach((item) => {
        const data = typeof item === 'string' ? { label: item } : item;
        const listItem = document.createElement('li');
        const option = document.createElement('button');
        option.type = 'button';
        option.className = 'dropdown-item ajax custom-option filter-dropdown__option';
        option.setAttribute('role', 'menuitem');
        option.textContent = data.label;

        if (data.id) {
          option.dataset.href = '/api/ajax-selling-item?objId=322';
          option.dataset.param = JSON.stringify({ f: `i33-o322-c${data.id}` });
          option.dataset.method = 'post';
        }

        listItem.append(option);
        panel.append(listItem);
      });

      dropdown.append(panel);
      bar.append(dropdown);
    });

    container.append(bar);
  });

})();


// assets/js/header-search.js
(() => {
  const searchToggle = document.querySelector('.desktop-search');
  const searchPopover = document.querySelector('#desktop-search-popover');
  const searchInput = searchPopover?.querySelector('input');
  const searchClear = searchPopover?.querySelector('[data-header-search-clear]');

  if (!searchToggle || !searchPopover || !searchInput || !searchClear) return;

  const closeSearch = (restoreFocus = false) => {
    searchPopover.hidden = true;
    searchToggle.setAttribute('aria-expanded', 'false');
    if (restoreFocus) searchToggle.focus();
  };

  searchToggle.addEventListener('click', () => {
    const isOpening = searchPopover.hidden;
    searchPopover.hidden = !isOpening;
    searchToggle.setAttribute('aria-expanded', String(isOpening));
    if (isOpening) searchInput.focus();
  });

  searchClear.addEventListener('click', () => {
    searchInput.value = '';
    searchInput.focus();
  });

  document.addEventListener('pointerdown', (event) => {
    if (!searchPopover.hidden && !searchPopover.contains(event.target) && !searchToggle.contains(event.target)) closeSearch();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !searchPopover.hidden) closeSearch(true);
  });

  window.matchMedia('(min-width: 992px)').addEventListener('change', (event) => {
    if (!event.matches) closeSearch();
  });
})();


// assets/js/mobile-header.js
(() => {
  const navbar = document.querySelector('.header-navbar');
  const space = document.querySelector('.header-navbar-space');
  const promo = document.querySelector('.promo-bar');
  const mobile = window.matchMedia('(max-width: 991.98px)');
  let previousY = Math.max(0, window.scrollY);
  let travel = 0;

  function update() {
    const y = Math.max(0, window.scrollY);
    const delta = y - previousY;
    const fixed = mobile.matches && y > promo.offsetHeight;
    if (fixed && !navbar.classList.contains('is-fixed')) space.style.height = `${navbar.offsetHeight}px`;
    if (!fixed) space.style.height = '';
    navbar.classList.toggle('is-fixed', fixed);

    travel = Math.sign(delta) === Math.sign(travel) ? travel + delta : delta;
    const keepVisible = y <= promo.offsetHeight + navbar.offsetHeight
      || document.body.classList.contains('mobile-sidebar-open')
      || (navbar.contains(document.activeElement) && document.activeElement?.tagName === 'INPUT');
    if (!fixed || keepVisible) navbar.classList.remove('is-hidden');
    else if (Math.abs(travel) >= 8) navbar.classList.toggle('is-hidden', travel > 0);
    previousY = y;
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', () => {
    space.style.height = '';
    navbar.classList.remove('is-fixed', 'is-hidden');
    travel = 0;
    previousY = Math.max(0, window.scrollY);
    update();
  });
  update();
})();


// assets/js/mobile-sidebar.js
(() => {
  const dialog = document.querySelector('#mobile-sidebar');
  const toggle = document.querySelector('.mobile-menu-toggle');
  if (!dialog || !toggle) return;

  const main = dialog.querySelector('[data-sidebar-main]');
  const sub = dialog.querySelector('[data-sidebar-sub]');
  const content = dialog.querySelector('[data-sidebar-content]');
  const title = dialog.querySelector('[data-sidebar-title]');
  const back = dialog.querySelector('[data-sidebar-back]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let closeTimer;
  let subTrigger;

  function showMain() {
    dialog.classList.remove('has-sub');
    main.inert = false;
    sub.inert = true;
    subTrigger?.focus();
  }

  function close() {
    if (!dialog.open) return;
    dialog.classList.remove('is-visible');
    clearTimeout(closeTimer);
    closeTimer = setTimeout(() => {
      dialog.close();
      document.body.classList.remove('mobile-sidebar-open');
      toggle.setAttribute('aria-expanded', 'false');
      dialog.classList.remove('has-sub');
      main.inert = false;
      sub.inert = true;
      toggle.focus({ preventScroll: true });
    }, reducedMotion.matches ? 0 : 220);
  }

  toggle.addEventListener('click', () => {
    clearTimeout(closeTimer);
    if (dialog.open) return;
    dialog.showModal();
    document.body.classList.add('mobile-sidebar-open');
    toggle.setAttribute('aria-expanded', 'true');
    void dialog.offsetWidth;
    requestAnimationFrame(() => dialog.classList.add('is-visible'));
  });

  dialog.querySelectorAll('[data-sidebar-close]').forEach((button) => button.addEventListener('click', close));
  dialog.addEventListener('cancel', (event) => { event.preventDefault(); close(); });
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog || event.target.closest('a')) close();
  });
  back.addEventListener('click', showMain);
  dialog.querySelectorAll('[data-sidebar-open]').forEach((button) => button.addEventListener('click', () => {
    const name = button.dataset.sidebarOpen;
    const source = document.querySelector(name === 'categories' || name === 'brands'
      ? '#navigation-menu-brands .navigation-menu__brand-grid'
      : `#navigation-menu-${name} .navigation-menu__links`);
    if (!source) return;
    const copy = source.cloneNode(true);
    copy.querySelectorAll('[id], [aria-labelledby], [tabindex]').forEach((element) => {
      element.removeAttribute('id');
      element.removeAttribute('aria-labelledby');
      element.removeAttribute('tabindex');
    });
    content.replaceChildren(copy);
    title.textContent = button.textContent;
    sub.scrollTop = 0;
    subTrigger = button;
    main.inert = true;
    sub.inert = false;
    dialog.classList.add('has-sub');
    back.focus();
  }));
  window.addEventListener('resize', () => { if (window.innerWidth >= 992) close(); });
})();


// assets/js/hero-carousel.js
(() => {
  const carousel = document.querySelector("#heroCarousel");
  const track = carousel?.querySelector(".carousel-inner");
  const slides = track ? [...track.querySelectorAll(".carousel-item")] : [];

  if (slides.length < 3) return;

  const previous = carousel.querySelector("[data-hero-carousel-prev]");
  const next = carousel.querySelector("[data-hero-carousel-next]");
  const indicators = [...carousel.querySelectorAll("[data-hero-carousel-indicator]")];
  const interval = Number(carousel.dataset.carouselInterval) || 5000;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let moving = false;
  let timer;

  const activeIndex = Math.max(0, slides.findIndex((slide) => slide.classList.contains("active")));
  const orderedSlides = slides.map((_, index) => slides[(activeIndex + index) % slides.length]);
  const cloneSlide = (slide) => {
    const clone = slide.cloneNode(true);
    clone.classList.remove("active");
    clone.dataset.carouselClone = "";
    clone.setAttribute("aria-hidden", "true");
    clone.inert = true;
    return clone;
  };
  const leadingClones = orderedSlides.slice(-2).map(cloneSlide);
  const trailingClones = orderedSlides.slice(0, 2).map(cloneSlide);
  const firstOriginalIndex = leadingClones.length;
  const lastOriginalIndex = firstOriginalIndex + slides.length - 1;
  track.replaceChildren(...leadingClones, ...orderedSlides, ...trailingClones);
  let currentIndex = firstOriginalIndex;

  function setPosition(index, animate = false) {
    track.classList.toggle("is-animating", animate);
    const slide = track.children[index];
    const offset = carousel.clientWidth / 2 - slide.offsetLeft - slide.offsetWidth / 2;
    track.style.transform = `translate3d(${offset}px, 0, 0)`;
  }

  function updateActiveSlide() {
    const activePosition = (currentIndex - firstOriginalIndex + slides.length) % slides.length;
    [...track.children].forEach((slide, index) => {
      const active = !slide.hasAttribute("data-carousel-clone") && index === currentIndex;
      slide.classList.toggle("active", active);
      slide.inert = !active;
    });
    indicators.forEach((indicator, index) => indicator.classList.toggle("is-active", index === activePosition));
  }

  function startAutoplay() {
    clearInterval(timer);
    timer = setInterval(() => move(1), interval);
  }

  function move(direction) {
    if (moving) return;

    moving = true;
    clearInterval(timer);
    const targetIndex = currentIndex + direction;

    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      track.classList.remove("is-animating");
      currentIndex = targetIndex < firstOriginalIndex
        ? targetIndex + slides.length
        : targetIndex > lastOriginalIndex ? targetIndex - slides.length : targetIndex;
      if (currentIndex !== targetIndex) setPosition(currentIndex);
      updateActiveSlide();
      moving = false;
      startAutoplay();
    };

    setPosition(targetIndex, true);
    track.addEventListener("transitionend", finish, { once: true });
    if (reducedMotion.matches) finish();
    else setTimeout(finish, 650);
  }

  previous?.addEventListener("click", () => move(-1));
  next?.addEventListener("click", () => move(1));
  let gesture;
  let suppressClick = false;
  carousel.addEventListener("pointerdown", (event) => {
    if (window.innerWidth >= 992 || !event.isPrimary) return;
    suppressClick = false;
    gesture = { x: event.clientX, y: event.clientY, id: event.pointerId };
    clearInterval(timer);
  });
  carousel.addEventListener("pointerup", (event) => {
    if (!gesture || gesture.id !== event.pointerId) return;
    const dx = event.clientX - gesture.x;
    const dy = event.clientY - gesture.y;
    gesture = null;
    if (Math.abs(dx) >= 40 && Math.abs(dx) > Math.abs(dy)) {
      suppressClick = true;
      move(dx < 0 ? 1 : -1);
    } else startAutoplay();
  });
  carousel.addEventListener("pointercancel", () => { gesture = null; startAutoplay(); });
  carousel.addEventListener("click", (event) => {
    if (!suppressClick) return;
    event.preventDefault();
    suppressClick = false;
  }, true);
  carousel.addEventListener("mouseenter", () => clearInterval(timer));
  carousel.addEventListener("mouseleave", startAutoplay);
  window.addEventListener("resize", () => !moving && setPosition(currentIndex));

  updateActiveSlide();
  setPosition(currentIndex);
  startAutoplay();
})();


// assets/js/brand-carousel.js
document.querySelectorAll('[data-brand-carousel]').forEach((carousel) => {
  const scroller = carousel.querySelector('[data-brand-carousel-track]');
  const track = scroller?.querySelector('.brand-carousel__track');
  const cloud = scroller?.querySelector('.brand-cloud');
  const previous = carousel.querySelector('[data-brand-carousel-prev]');
  const next = carousel.querySelector('[data-brand-carousel-next]');

  if (!scroller || !track || !cloud || !previous || !next) return;

  const leadingCloud = cloud.cloneNode(true);
  leadingCloud.setAttribute('aria-hidden', 'true');
  leadingCloud.inert = true;
  leadingCloud.querySelectorAll('a').forEach((link) => { link.tabIndex = -1; });
  leadingCloud.querySelectorAll('img').forEach((image) => { image.alt = ''; });
  track.prepend(leadingCloud);
  track.querySelectorAll('.brand-cloud[aria-hidden="true"]').forEach((duplicate) => {
    duplicate.inert = true;
    duplicate.querySelectorAll('a').forEach((link) => { link.tabIndex = -1; });
  });

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = window.matchMedia('(max-width: 575.98px)');
  const dragThreshold = 6;
  let hovered = false;
  let focused = false;
  let pointerDown = false;
  let suppressClick = false;
  let pointerId;
  let startX = 0;
  let startScroll = 0;
  let previousFrame;
  let cloudWidth = cloud.offsetWidth;
  let inViewport = true;
  let moving = false;

  const loopWidth = () => cloudWidth;
  const normalizePosition = () => {
    const width = loopWidth();
    if (!width) return;
    const currentScroll = scroller.scrollLeft;
    if (currentScroll > width * 1.5) scroller.scrollLeft = currentScroll - width;
    else if (currentScroll < width * 0.5) scroller.scrollLeft = currentScroll + width;
  };
  const paused = () => hovered || focused || pointerDown || moving || reducedMotion.matches || !inViewport || document.hidden;

  const updateLoopWidth = () => {
    const nextWidth = cloud.offsetWidth;
    if (!nextWidth || nextWidth === cloudWidth) return;
    const position = cloudWidth ? scroller.scrollLeft / cloudWidth : 1;
    cloudWidth = nextWidth;
    scroller.scrollLeft = position * cloudWidth;
  };

  if ('ResizeObserver' in window) new ResizeObserver(updateLoopWidth).observe(cloud);
  else window.addEventListener('resize', updateLoopWidth);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => { inViewport = entry.isIntersecting; }).observe(carousel);
  }

  const autoplay = (timestamp) => {
    if (previousFrame === undefined) previousFrame = timestamp;
    const elapsed = Math.min(timestamp - previousFrame, 50);
    previousFrame = timestamp;
    if (!paused()) {
      const duration = mobile.matches ? 76000 : 64000;
      scroller.scrollLeft += loopWidth() * elapsed / duration;
      normalizePosition();
    }
    requestAnimationFrame(autoplay);
  };

  const move = (direction) => {
    if (moving) return;
    const distance = direction * carousel.clientWidth * 0.5;
    if (reducedMotion.matches) {
      scroller.scrollLeft += distance;
      normalizePosition();
      return;
    }

    moving = true;
    let previousProgress = 0;
    const startedAt = performance.now();
    const animateMove = (timestamp) => {
      const progress = Math.min((timestamp - startedAt) / 320, 1);
      const eased = 1 - (1 - progress) ** 3;
      scroller.scrollLeft += distance * (eased - previousProgress);
      previousProgress = eased;
      normalizePosition();
      if (progress < 1) requestAnimationFrame(animateMove);
      else moving = false;
    };
    requestAnimationFrame(animateMove);
  };

  carousel.addEventListener('pointerenter', (event) => {
    if (event.pointerType === 'mouse') hovered = true;
  });
  carousel.addEventListener('pointerleave', (event) => {
    if (event.pointerType === 'mouse') hovered = false;
  });
  carousel.addEventListener('focusin', () => { focused = true; });
  carousel.addEventListener('focusout', (event) => {
    focused = carousel.contains(event.relatedTarget);
  });

  scroller.addEventListener('pointerdown', (event) => {
    if (event.target.closest('button')) return;
    pointerDown = true;
    suppressClick = false;
    pointerId = event.pointerId;
    startX = event.clientX;
    startScroll = scroller.scrollLeft;
    scroller.classList.add('is-dragging');
    if (event.pointerType === 'mouse') scroller.setPointerCapture(pointerId);
  });

  scroller.addEventListener('pointermove', (event) => {
    if (!pointerDown || event.pointerId !== pointerId) return;
    const movement = event.clientX - startX;
    if (Math.abs(movement) >= dragThreshold) suppressClick = true;
    if (event.pointerType === 'mouse') {
      event.preventDefault();
      scroller.scrollLeft = startScroll - movement;
      normalizePosition();
    }
  });

  const finishDrag = (event) => {
    if (!pointerDown || event.pointerId !== pointerId) return;
    pointerDown = false;
    scroller.classList.remove('is-dragging');
    if (event.pointerType === 'mouse' && scroller.hasPointerCapture(pointerId)) {
      scroller.releasePointerCapture(pointerId);
    }
  };

  scroller.addEventListener('pointerup', finishDrag);
  scroller.addEventListener('pointercancel', finishDrag);
  scroller.addEventListener('click', (event) => {
    if (!suppressClick) return;
    event.preventDefault();
    event.stopPropagation();
    suppressClick = false;
  }, true);
  scroller.addEventListener('scroll', normalizePosition, { passive: true });
  scroller.querySelectorAll('img').forEach((image) => { image.draggable = false; });
  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));

  scroller.scrollLeft = loopWidth();
  requestAnimationFrame(autoplay);
});


// assets/js/flash-sale-countdown.js
(() => {
  const timer = document.querySelector("[data-countdown-to]");
  if (!timer) return;

  const deadline = Date.parse(timer.dataset.countdownTo);
  if (Number.isNaN(deadline)) return;

  const daysLabel = timer.querySelector("[data-countdown-days]");
  const hoursLabel = timer.querySelector("[data-countdown-hours]");
  const minutesLabel = timer.querySelector("[data-countdown-minutes]");
  const secondsLabel = timer.querySelector("[data-countdown-seconds]");
  const pad = (value) => String(value).padStart(2, "0");

  function updateCountdown() {
    const totalSeconds = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const seconds = totalSeconds % 60;

    daysLabel.textContent = totalSeconds
      ? days ? `Chỉ còn ${days} ngày` : "Sắp diễn ra"
      : "Đang diễn ra";
    hoursLabel.textContent = pad(hours);
    minutesLabel.textContent = pad(minutes);
    secondsLabel.textContent = pad(seconds);
    timer.setAttribute(
      "aria-label",
      totalSeconds
        ? `Còn ${hours} giờ ${minutes} phút ${seconds} giây đến khi Flash Sale bắt đầu`
        : "Flash sale đang diễn ra",
    );

    if (!totalSeconds) clearInterval(intervalId);
  }

  const intervalId = setInterval(updateCountdown, 1000);
  updateCountdown();
})();
