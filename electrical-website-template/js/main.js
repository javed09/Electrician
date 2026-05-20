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
        
        // Search through page content
        const pageText = document.body.innerText.toLowerCase();
        const matches = pageText.includes(searchTerm);
        
        if (matches) {
            // Highlight all matches on the page
            highlightSearchTerm(searchTerm);
            
            searchResults.innerHTML = `
                <div class="alert alert-success">
                    Found results for "${searchTerm}". Matches are highlighted on the page.
                </div>
                <button class="btn btn-sm btn-outline-secondary" onclick="clearSearchHighlights()">
                    Clear highlights
                </button>
            `;
        } else {
            searchResults.innerHTML = `
                <div class="alert alert-danger">
                    No results found for "${searchTerm}"
                </div>
            `;
        }
        
        searchResults.classList.remove('d-none');
        searchModal.hide();
    }
});

function highlightSearchTerm(term) {
    clearSearchHighlights();
    
    const bodyText = document.body.innerHTML;
    const regex = new RegExp(term, 'gi');
    const newText = bodyText.replace(regex, match => 
        `<span class="search-highlight bg-warning">${match}</span>`
    );
    
    document.body.innerHTML = newText;
}

function clearSearchHighlights() {
    const highlights = document.querySelectorAll('.search-highlight');
    highlights.forEach(highlight => {
        highlight.outerHTML = highlight.innerHTML;
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

