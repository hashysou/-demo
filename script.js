document.documentElement.classList.add('reveal-active');

function initializeSplash() {
  const finishSplash =
    typeof window.__finishSplashFallback === 'function'
      ? window.__finishSplashFallback
      : null;

  if (document.documentElement.classList.contains('splash-seen') && finishSplash) {
    finishSplash();
  }
}

function initializeMenu() {
  const menuButton = document.querySelector('[data-menu-button]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  const openIcon = document.querySelector('[data-menu-icon="open"]');
  const closeIcon = document.querySelector('[data-menu-icon="close"]');

  if (!menuButton || !mobileMenu) {
    return;
  }

  const closeMenu = () => {
    menuButton.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.add('hidden');
    document.body.classList.remove('menu-open');

    if (openIcon) {
      openIcon.classList.remove('hidden');
      openIcon.classList.add('block');
    }

    if (closeIcon) {
      closeIcon.classList.add('hidden');
      closeIcon.classList.remove('block');
    }
  };

  menuButton.addEventListener('click', () => {
    const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isExpanded));
    mobileMenu.classList.toggle('hidden', isExpanded);
    document.body.classList.toggle('menu-open', !isExpanded);

    if (openIcon) {
      openIcon.classList.toggle('hidden', !isExpanded);
      openIcon.classList.toggle('block', isExpanded);
    }

    if (closeIcon) {
      closeIcon.classList.toggle('hidden', isExpanded);
      closeIcon.classList.toggle('block', !isExpanded);
    }
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      closeMenu();
    }
  });
}

function initializeReveal() {
  const revealItems = Array.from(document.querySelectorAll('.reveal-ready'));
  const markVisible = (item) => {
    item.classList.add('is-visible');
    item.classList.remove('reveal-hidden');
  };

  if (revealItems.length === 0) {
    return;
  }

  if (!('IntersectionObserver' in window)) {
    revealItems.forEach(markVisible);
    return;
  }

  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const observerTargets = [];

  revealItems.forEach((item) => {
    const rect = item.getBoundingClientRect();
    const isInInitialViewport = rect.top <= viewportHeight - 48;

    if (isInInitialViewport) {
      markVisible(item);
      return;
    }

    item.classList.add('reveal-hidden');
    observerTargets.push(item);
  });

  if (observerTargets.length === 0) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        markVisible(entry.target);
        observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1,
    }
  );

  observerTargets.forEach((item) => observer.observe(item));
}

function initializeHeroSlides() {
  const heroSlides = Array.from(document.querySelectorAll('.hero-slide'));

  if (heroSlides.length <= 1) {
    return;
  }

  let currentIndex = 0;

  heroSlides.forEach((image) => {
    image.addEventListener('error', () => {
      const fallback = image.getAttribute('data-fallback');
      if (!fallback || image.src === fallback) {
        return;
      }

      image.src = fallback;
    });
  });

  window.setInterval(() => {
    heroSlides[currentIndex].classList.remove('opacity-100');
    heroSlides[currentIndex].classList.add('opacity-0');

    currentIndex = (currentIndex + 1) % heroSlides.length;

    heroSlides[currentIndex].classList.remove('opacity-0');
    heroSlides[currentIndex].classList.add('opacity-100');
  }, 5000);
}

function getWorksData() {
  return Array.isArray(window.WORKS_DATA) ? window.WORKS_DATA : [];
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };

    return entities[character] || character;
  });
}

function chunkArray(items, size) {
  const chunks = [];

  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }

  return chunks;
}

function renderIndexWorkCard(work) {
  return `
    <a href="works.html" class="group block overflow-hidden rounded-sm bg-white border border-border h-full flex flex-col">
      <div class="relative pt-[75%]">
        <img
          src="${escapeHtml(work.image)}"
          alt="${escapeHtml(work.alt || work.title)}"
          loading="lazy"
          class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div class="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-opacity duration-300"></div>
      </div>
      <div class="p-4 flex-grow">
        <div class="flex items-center justify-between gap-3 text-xs text-text-sub">
          <span>${escapeHtml(work.category)}</span>
          <span class="truncate text-right">${escapeHtml(work.location)}</span>
        </div>
        <h4 class="mt-2 font-semibold text-text-main truncate group-hover:text-accent-a">${escapeHtml(work.title)}</h4>
      </div>
    </a>
  `;
}

function renderWorksSliderContent() {
  const sliderTrack = document.querySelector('[data-works-track]');
  const sliderRoot = document.querySelector('[data-works-slider]');

  if (!sliderTrack || sliderTrack.children.length > 0) {
    return;
  }

  const featuredWorks = getWorksData().slice(0, 6);

  if (featuredWorks.length === 0) {
    if (sliderRoot) {
      sliderRoot.classList.add('hidden');
    }

    return;
  }

  const mobileSlides = featuredWorks
    .map(
      (work) => `
        <div class="works-slide w-full flex-shrink-0 flex justify-center md:hidden" data-works-slide>
          <div class="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-2 sm:px-4">
            ${renderIndexWorkCard(work)}
          </div>
        </div>
      `
    )
    .join('');

  const desktopSlides = chunkArray(featuredWorks, 3)
    .map(
      (group) => `
        <div class="works-slide hidden w-full flex-shrink-0 md:flex justify-center" data-works-slide>
          ${group
            .map(
              (work) => `
                <div class="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-2 sm:px-4">
                  ${renderIndexWorkCard(work)}
                </div>
              `
            )
            .join('')}
        </div>
      `
    )
    .join('');

  sliderTrack.innerHTML = mobileSlides + desktopSlides;
}

function renderWorksGridContent() {
  const worksGrid = document.querySelector('[data-works-grid]');

  if (!worksGrid || worksGrid.querySelector('[data-work-card]')) {
    return;
  }

  const works = getWorksData();

  if (works.length === 0) {
    return;
  }

  worksGrid.innerHTML = works
    .map(
      (work) => `
        <article data-work-card data-category="${escapeHtml(work.category)}" class="group block text-left">
          <div class="relative overflow-hidden bg-border rounded-sm">
            <div class="pt-[75%]"></div>
            <img
              src="${escapeHtml(work.image)}"
              alt="${escapeHtml(work.alt || work.title)}"
              loading="lazy"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
          <div class="mt-4">
            <h4 class="font-semibold text-text-main text-lg group-hover:text-accent-a transition-colors">${escapeHtml(work.title)}</h4>
            <dl class="mt-3 space-y-2 text-sm">
              <div class="grid grid-cols-[4.5rem_1fr] gap-3">
                <dt class="text-text-sub">カテゴリ</dt>
                <dd class="text-text-main">${escapeHtml(work.category)}</dd>
              </div>
              <div class="grid grid-cols-[4.5rem_1fr] gap-3">
                <dt class="text-text-sub">作品説明</dt>
                <dd class="text-text-sub leading-relaxed">${escapeHtml(work.description)}</dd>
              </div>
              <div class="grid grid-cols-[4.5rem_1fr] gap-3">
                <dt class="text-text-sub">施工場所</dt>
                <dd class="text-text-main">${escapeHtml(work.location)}</dd>
              </div>
            </dl>
          </div>
        </article>
      `
    )
    .join('');
}

function initializeWorksContent() {
  renderWorksSliderContent();
  renderWorksGridContent();
}

function initializeWorksSlider() {
  const slider = document.querySelector('[data-works-slider]');

  if (!slider) {
    return;
  }

  const track = slider.querySelector('[data-works-track]');
  const prevButton = slider.querySelector('[data-works-prev]');
  const nextButton = slider.querySelector('[data-works-next]');
  const dotsContainer = slider.querySelector('[data-works-dots]');

  if (!track || !prevButton || !nextButton || !dotsContainer) {
    return;
  }

  let currentIndex = 0;

  const getVisibleSlides = () =>
    Array.from(slider.querySelectorAll('[data-works-slide]')).filter(
      (slide) => window.getComputedStyle(slide).display !== 'none'
    );

  const renderDots = (visibleSlides) => {
    dotsContainer.innerHTML = '';

    visibleSlides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'works-dot';
      dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
      dot.addEventListener('click', () => {
        currentIndex = index;
        update();
      });
      dotsContainer.appendChild(dot);
    });
  };

  const update = () => {
    const visibleSlides = getVisibleSlides();

    if (visibleSlides.length === 0) {
      return;
    }

    if (currentIndex > visibleSlides.length - 1) {
      currentIndex = 0;
    }

    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    Array.from(dotsContainer.children).forEach((dot, index) => {
      dot.classList.toggle('is-active', index === currentIndex);
    });
  };

  const rebuild = () => {
    const visibleSlides = getVisibleSlides();
    renderDots(visibleSlides);
    update();
  };

  prevButton.addEventListener('click', () => {
    const visibleSlides = getVisibleSlides();
    if (visibleSlides.length === 0) {
      return;
    }

    currentIndex = currentIndex === 0 ? visibleSlides.length - 1 : currentIndex - 1;
    update();
  });

  nextButton.addEventListener('click', () => {
    const visibleSlides = getVisibleSlides();
    if (visibleSlides.length === 0) {
      return;
    }

    currentIndex = currentIndex === visibleSlides.length - 1 ? 0 : currentIndex + 1;
    update();
  });

  window.addEventListener('resize', rebuild);
  rebuild();
}

function initializeWorksFilters() {
  const filterRoot = document.querySelector('[data-works-filters]');
  const worksGrid = document.querySelector('[data-works-grid]');
  const emptyState = document.querySelector('[data-works-empty]');
  const paginationRoot = document.querySelector('[data-works-pagination]');

  if (!filterRoot || !worksGrid) {
    return;
  }

  const buttons = Array.from(filterRoot.querySelectorAll('button[data-filter-group]'));
  const workCards = Array.from(worksGrid.querySelectorAll('[data-work-card]'));
  const itemsPerPage = Number(worksGrid.getAttribute('data-items-per-page')) || 0;
  const groups = Array.from(
    new Set(
      buttons
        .map((button) => button.getAttribute('data-filter-group'))
        .filter(Boolean)
    )
  );

  const state = Object.fromEntries(groups.map((group) => [group, 'すべて']));
  let currentPage = 1;
  const getAttributeName = (group) =>
    `data-${group.replace(/[A-Z]/g, (character) => `-${character.toLowerCase()}`)}`;

  const syncButtons = () => {
    buttons.forEach((button) => {
      const group = button.getAttribute('data-filter-group');
      const value = button.getAttribute('data-filter-value');
      const isActive = group && value ? state[group] === value : false;

      button.classList.toggle('text-text-main', isActive);
      button.classList.toggle('after:w-full', isActive);
      button.classList.toggle('text-text-sub', !isActive);
      button.classList.toggle('after:w-0', !isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });
  };

  const getFilteredCards = () =>
    workCards.filter((card) =>
      groups.every((group) => {
        const selectedValue = state[group];

        if (!selectedValue || selectedValue === 'すべて') {
          return true;
        }

        return card.getAttribute(getAttributeName(group)) === selectedValue;
      })
    );

  const createPaginationButton = ({ label, page, disabled = false, isActive = false }) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = label;
    button.disabled = disabled;
    button.className =
      'inline-flex min-w-[2.75rem] items-center justify-center rounded-sm border px-3 py-2 text-sm font-medium transition-colors duration-200';

    if (isActive) {
      button.classList.add('border-accent-a', 'bg-accent-a', 'text-white');
      button.setAttribute('aria-current', 'page');
    } else if (disabled) {
      button.classList.add('border-border', 'text-text-sub', 'opacity-40', 'cursor-not-allowed');
    } else {
      button.classList.add('border-border', 'text-text-sub', 'hover:border-accent-a', 'hover:text-text-main');
    }

    if (!disabled) {
      button.addEventListener('click', () => {
        currentPage = page;
        syncCards();
      });
    }

    return button;
  };

  const syncPagination = (visibleCount, totalPages) => {
    if (!paginationRoot) {
      return;
    }

    paginationRoot.innerHTML = '';

    if (visibleCount === 0 || totalPages <= 1) {
      paginationRoot.classList.add('hidden');
      return;
    }

    paginationRoot.classList.remove('hidden');
    paginationRoot.appendChild(
      createPaginationButton({
        label: '前へ',
        page: Math.max(1, currentPage - 1),
        disabled: currentPage === 1,
      })
    );

    for (let page = 1; page <= totalPages; page += 1) {
      paginationRoot.appendChild(
        createPaginationButton({
          label: String(page),
          page,
          isActive: page === currentPage,
        })
      );
    }

    paginationRoot.appendChild(
      createPaginationButton({
        label: '次へ',
        page: Math.min(totalPages, currentPage + 1),
        disabled: currentPage === totalPages,
      })
    );
  };

  const syncCards = () => {
    const filteredCards = getFilteredCards();
    const visibleCount = filteredCards.length;
    const totalPages = itemsPerPage > 0 ? Math.max(1, Math.ceil(visibleCount / itemsPerPage)) : 1;

    if (currentPage > totalPages) {
      currentPage = 1;
    }

    const pageStart = itemsPerPage > 0 ? (currentPage - 1) * itemsPerPage : 0;
    const pageEnd = itemsPerPage > 0 ? pageStart + itemsPerPage : visibleCount;
    const pagedCards = new Set(filteredCards.slice(pageStart, pageEnd));

    workCards.forEach((card) => {
      card.classList.toggle('hidden', !pagedCards.has(card));
    });

    if (emptyState) {
      emptyState.classList.toggle('hidden', visibleCount > 0);
    }

    syncPagination(visibleCount, totalPages);
  };

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const group = button.getAttribute('data-filter-group');
      const value = button.getAttribute('data-filter-value');

      if (!group || !value) {
        return;
      }

      state[group] = value;
      currentPage = 1;
      syncButtons();
      syncCards();
    });
  });

  syncButtons();
  syncCards();
}

function initializeCurrentYear() {
  document.querySelectorAll('[data-current-year]').forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initializeSplash();
  initializeMenu();
  initializeWorksContent();
  initializeReveal();
  initializeHeroSlides();
  initializeWorksSlider();
  initializeWorksFilters();
  initializeCurrentYear();
});
