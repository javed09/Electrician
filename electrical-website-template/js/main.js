(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);
    
    document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('pageSearchInput');
    const searchResults = document.getElementById('searchResults');
    const searchModalElement = document.getElementById('searchModal');
    
    // Initialize the Bootstrap modal properly
    const searchModal = new bootstrap.Modal(searchModalElement, {
        backdrop: true,
        keyboard: true
    });
    
    // Auto-focus search input when modal opens
    searchModalElement.addEventListener('shown.bs.modal', function() {
        searchInput.focus();
        searchInput.select(); // Select any existing text
    });
    
    searchButton.addEventListener('click', function() {
        performSearch();
    });
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        if (searchTerm === '') {
            searchResults.innerHTML = '<div class="alert alert-warning">Please enter a search term</div>';
            searchResults.classList.remove('d-none');
            return;
        }
        
        // Define available pages
        const pages = {
            'home': 'index.html',
            'about': 'about.html',
            'service': 'service.html',
            'services': 'service.html',
            'blog': 'blog.html',
            'contact': 'contact.html',
            'project': 'project.html',
            'projects': 'project.html',
            'team': 'team.html',
            'testimonial': 'testimonial.html',
            'testimonials': 'testimonial.html',
            '404': '404.html'
        };
        
        // Check if search term matches a page name
        if (pages[searchTerm]) {
            searchResults.innerHTML = `
                <div class="alert alert-info">
                    Found page: <strong>${searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1)}</strong>
                </div>
            `;
            searchResults.classList.remove('d-none');
            
            // Close modal and navigate
            if (searchModal) {
                searchModal.hide();
            }
            
            setTimeout(() => {
                window.location.href = pages[searchTerm];
            }, 300);
            return;
        }
        
        // Search through page content
        const pageText = document.body.innerText.toLowerCase();
        const matches = pageText.includes(searchTerm);
        
        if (matches) {
            // Highlight all matches on the page
            highlightSearchTerm(searchTerm);
            
            // Find and scroll to first match
            const firstMatch = findFirstMatch(searchTerm);
            
            searchResults.innerHTML = `
                <div class="alert alert-success">
                    Found results for "<strong>${searchTerm}</strong>". Matches are highlighted on the page.
                </div>
                <button class="btn btn-sm btn-outline-secondary" onclick="clearSearchHighlights()">
                    Clear highlights
                </button>
            `;
            
            searchResults.classList.remove('d-none');
            
            // Close the modal and scroll to the match
            if (searchModal) {
                searchModal.hide();
            }
            
            // Scroll to the match after a delay
            setTimeout(() => {
                if (firstMatch) {
                    firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 500);
        } else {
            searchResults.innerHTML = `
                <div class="alert alert-danger">
                    No results found for "<strong>${searchTerm}</strong>". Try searching for page names like "about", "service", or "contact".
                </div>
            `;
            searchResults.classList.remove('d-none');
        }
    }
    
    function findFirstMatch(term) {
        const regex = new RegExp(term, 'gi');
        
        function searchNodes(node) {
            if (node.nodeType === 3) { // Text node
                if (regex.test(node.textContent)) {
                    return node.parentElement;
                }
                regex.lastIndex = 0; // Reset regex
            } else if (node.nodeType === 1 && node.nodeName !== 'SCRIPT' && node.nodeName !== 'STYLE') { // Element node
                for (let i = 0; i < node.childNodes.length; i++) {
                    const result = searchNodes(node.childNodes[i]);
                    if (result) return result;
                }
            }
            return null;
        }
        
        return searchNodes(document.body);
    }
});

function highlightSearchTerm(term) {
    clearSearchHighlights();
    
    const bodyContent = document.body;
    const regex = new RegExp(`(${term})`, 'gi');
    
    function highlightNodes(node) {
        if (node.nodeType === 3) { // Text node
            if (regex.test(node.textContent)) {
                const span = document.createElement('span');
                span.innerHTML = node.textContent.replace(regex, '<span class="search-highlight bg-warning">$1</span>');
                node.parentNode.replaceChild(span, node);
            }
        } else if (node.nodeType === 1 && node.nodeName !== 'SCRIPT' && node.nodeName !== 'STYLE') { // Element node
            for (let i = 0; i < node.childNodes.length; i++) {
                highlightNodes(node.childNodes[i]);
            }
        }
    }
    
    highlightNodes(bodyContent);
}

function clearSearchHighlights() {
    const highlights = document.querySelectorAll('.search-highlight');
    highlights.forEach(highlight => {
        const parent = highlight.parentNode;
        while (highlight.firstChild) {
            parent.insertBefore(highlight.firstChild, highlight);
        }
        parent.removeChild(highlight);
    });
}

// Language Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const languages = {
        'English': 'en',
        'Bangla': 'bn',
        'French': 'fr',
        'Spanish': 'es',
        'Arabic': 'ar'
    };
    
    const languageToggle = document.getElementById('languageDropdown');
    
    // Store original English text in data attributes on page load
    storeOriginalText();
    
    // Get current language from localStorage or default to English
    const currentLang = localStorage.getItem('selectedLanguage') || 'English';
    if (languageToggle) {
        languageToggle.innerHTML = `<small class="text-muted small"><i class="fas fa-globe-europe text-primary me-2"></i> ${currentLang}</small>`;
    }
    
    // Apply saved language on page load
    const savedLang = localStorage.getItem('currentLanguage') || 'en';
    if (savedLang !== 'en') {
        translatePage(savedLang);
    }
    
    // Use event delegation for language items (works even after DOM changes)
    document.addEventListener('click', function(e) {
        if (e.target.closest('.language-item')) {
            e.preventDefault();
            const selectedLang = e.target.closest('.language-item').getAttribute('data-lang');
            
            // Save selected language
            localStorage.setItem('selectedLanguage', selectedLang);
            
            // Update the dropdown button text
            if (languageToggle) {
                languageToggle.innerHTML = `<small class="text-muted small"><i class="fas fa-globe-europe text-primary me-2"></i> ${selectedLang}</small>`;
            }
            
            // Apply language translation
            translatePage(languages[selectedLang]);
            
            // Close the dropdown manually
            const dropdown = bootstrap.Dropdown.getInstance(languageToggle);
            if (dropdown) {
                dropdown.hide();
            }
        }
    });
});

// Store original English text in data attributes
function storeOriginalText() {
    const navLinks = document.querySelectorAll('.nav-link, .nav-btn a');
    navLinks.forEach(link => {
        if (!link.hasAttribute('data-original-text')) {
            link.setAttribute('data-original-text', link.textContent.trim());
        }
    });
    
    const dropdownItems = document.querySelectorAll('.dropdown-item:not(.language-item)');
    dropdownItems.forEach(item => {
        if (!item.hasAttribute('data-original-text')) {
            item.setAttribute('data-original-text', item.textContent.trim());
        }
    });
}

// Translation function with sample translations
function translatePage(lang) {
    const translations = {
        'en': {
            'Home': 'Home',
            'About': 'About',
            'Service': 'Service',
            'Blog': 'Blog',
            'Pages': 'Pages',
            'Contact': 'Contact',
            'Our projects': 'Our projects',
            'Our team': 'Our team',
            'Testimonial': 'Testimonial',
            '404 Page': '404 Page',
            'Contact on WhatsApp': 'Contact on WhatsApp'
        },
        'bn': {
            'Home': 'বাড়ি',
            'About': 'সম্পর্কে',
            'Service': 'পরিষেবা',
            'Blog': 'ব্লগ',
            'Pages': 'পৃষ্ঠা',
            'Contact': 'যোগাযোগ করুন',
            'Our projects': 'আমাদের প্রকল্প',
            'Our team': 'আমাদের দল',
            'Testimonial': 'প্রশংসাপত্র',
            '404 Page': '404 পৃষ্ঠা',
            'Contact on WhatsApp': 'হোয়াটসঅ্যাপে যোগাযোগ করুন'
        },
        'fr': {
            'Home': 'Accueil',
            'About': 'À propos',
            'Service': 'Service',
            'Blog': 'Blog',
            'Pages': 'Pages',
            'Contact': 'Contact',
            'Our projects': 'Nos projets',
            'Our team': 'Notre équipe',
            'Testimonial': 'Témoignage',
            '404 Page': 'Page 404',
            'Contact on WhatsApp': 'Contactez-nous sur WhatsApp'
        },
        'es': {
            'Home': 'Inicio',
            'About': 'Acerca de',
            'Service': 'Servicio',
            'Blog': 'Blog',
            'Pages': 'Páginas',
            'Contact': 'Contacto',
            'Our projects': 'Nuestros proyectos',
            'Our team': 'Nuestro equipo',
            'Testimonial': 'Testimonio',
            '404 Page': 'Página 404',
            'Contact on WhatsApp': 'Contáctenos en WhatsApp'
        },
        'ar': {
            'Home': 'الرئيسية',
            'About': 'حول',
            'Service': 'خدمة',
            'Blog': 'مدونة',
            'Pages': 'الصفحات',
            'Contact': 'اتصل',
            'Our projects': 'مشاريعنا',
            'Our team': 'فريقنا',
            'Testimonial': 'شهادة',
            '404 Page': 'صفحة 404',
            'Contact on WhatsApp': 'تواصل معنا على WhatsApp'
        }
    };
    
    // First, store original text if not already stored
    storeOriginalText();
    
    // Apply translations using stored original text
    const navLinks = document.querySelectorAll('.nav-link, .nav-btn a');
    navLinks.forEach(link => {
        const originalText = link.getAttribute('data-original-text');
        if (originalText && translations[lang] && translations[lang][originalText]) {
            link.textContent = translations[lang][originalText];
        }
    });
    
    // Translate dropdown items but exclude language items
    const dropdownItems = document.querySelectorAll('.dropdown-item:not(.language-item)');
    dropdownItems.forEach(item => {
        const originalText = item.getAttribute('data-original-text');
        if (originalText && translations[lang] && translations[lang][originalText]) {
            item.textContent = translations[lang][originalText];
        }
    });
    
    // Set document language
    document.documentElement.lang = lang;
    
    // Store the language preference
    localStorage.setItem('currentLanguage', lang);
}

    
    // Initiate the wowjs
    new WOW().init();


    function bindCarouselNav($wrap, $carousel) {
        $wrap.find('.carousel-custom-prev').on('click', function () {
            $carousel.trigger('prev.owl.carousel');
        });
        $wrap.find('.carousel-custom-next').on('click', function () {
            $carousel.trigger('next.owl.carousel');
        });
    }

    function wrapCarouselWithNav($carousel) {
        if ($carousel.parent().hasClass('carousel-wrap')) {
            return $carousel.parent();
        }
        $carousel.wrap('<div class="carousel-wrap position-relative"></div>');
        var $wrap = $carousel.parent();
        $wrap.append(
            '<button type="button" class="carousel-custom-nav carousel-custom-prev" aria-label="Previous slide">' +
                '<i class="fas fa-chevron-left" aria-hidden="true"></i>' +
            '</button>' +
            '<button type="button" class="carousel-custom-nav carousel-custom-next" aria-label="Next slide">' +
                '<i class="fas fa-chevron-right" aria-hidden="true"></i>' +
            '</button>'
        );
        return $wrap;
    }

    // Header carousel
    var $headerCarousel = $(".header-carousel");
    var $headerWrap = $headerCarousel.closest('.header-carousel-wrap');
    $headerCarousel.owlCarousel({
        animateOut: 'fadeOut',
        items: 1,
        margin: 0,
        stagePadding: 0,
        autoplay: true,
        smartSpeed: 1000,
        dots: false,
        loop: true,
        nav: false
    });
    bindCarouselNav($headerWrap, $headerCarousel);


    // Service carousel
    $(".service-carousel").each(function () {
        var $carousel = $(this);
        var $wrap = wrapCarouselWithNav($carousel);
        var owl = $carousel.owlCarousel({
            autoplay: true,
            smartSpeed: 2000,
            center: false,
            dots: false,
            loop: true,
            margin: 25,
            nav: false,
            responsiveClass: true,
            responsive: {
                0: { items: 1 },
                576: { items: 1 },
                768: { items: 2 },
                992: { items: 2 },
                1200: { items: 2 }
            }
        });
        bindCarouselNav($wrap, $carousel);
    });


    // testimonial carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        center: false,
        dots: true,
        loop: true,
        margin: 25,
        nav : false,
        navText : [
            '<i class="fa fa-angle-right"></i>',
            '<i class="fa fa-angle-left"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:1
            },
            992:{
                items:1
            },
            1200:{
                items:2
            }
        }
    });


   // Back to top button
   $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


})(jQuery);

