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





    
    // Initiate the wowjs
    new WOW().init();


    // Header carousel
    $(".header-carousel").owlCarousel({
        animateOut: 'fadeOut',
        items: 1,
        margin: 0,
        stagePadding: 0,
        autoplay: true,
        smartSpeed: 1000,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
    });


   // Service-carousel
   $(".service-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 2000,
    center: false,
    dots: false,
    loop: true,
    margin: 25,
    nav : true,
    navText : [
        '<i class="bi bi-arrow-left"></i>',
        '<i class="bi bi-arrow-right"></i>'
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
            items:2
        },
        992:{
            items:2
        },
        1200:{
            items:2
        }
    }
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

