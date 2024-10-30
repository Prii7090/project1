$(document).ready(function() {
    // Keep the navigation bar fixed
    $(window).scroll(function() {
        if ($(window).scrollTop() > 0) {
            $('header').addClass('fixed');
        } else {
            $('header').removeClass('fixed');
        }
    });

    // Lightbox slideshow for gallery
    var currentSlideIndex = 0;
    var $galleryItems = $('.gallery-item img, .gallery-item video');

    $galleryItems.click(function() {
        currentSlideIndex = $(this).data('slide-index');
        showLightbox();
    });

    function showLightbox() {
        var $currentSlide = $galleryItems.eq(currentSlideIndex);
        var src = $currentSlide.attr('src');
        
        // Ensure previous lightbox (if any) is removed
        $('.lightbox').remove();

        // Create a lightbox container
        var $lightbox = $('<div class="lightbox"></div>');
        var $image = $('<img src="' + src + '" alt="Gallery Image">');
        var $closeBtn = $('<button class="close-btn">×</button>');
        var $prevBtn = $('<button class="prev-btn">‹</button>');
        var $nextBtn = $('<button class="next-btn">›</button>');

        // Append elements to the lightbox
        $lightbox.append($prevBtn, $image, $nextBtn, $closeBtn);
        $('body').append($lightbox);

        // Center and fit the lightbox image
        $lightbox.css({
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            zIndex: 1000
        }).fadeIn(400);

        $image.css({
            maxWidth: '90%',
            maxHeight: '90%',
            objectFit: 'contain'
        });

        // Close the lightbox on close button click
        $closeBtn.click(function() {
            $lightbox.fadeOut(400, function() {
                $(this).remove();
            });
        });

        // Close lightbox when clicking outside of the image
        $lightbox.click(function(e) {
            if (e.target === this) {
                $(this).fadeOut(400, function() {
                    $(this).remove();
                });
            }
        });

        // Show previous image
        $prevBtn.click(function(e) {
            e.stopPropagation(); // Prevent closing the lightbox
            currentSlideIndex = (currentSlideIndex > 0) ? currentSlideIndex - 1 : $galleryItems.length - 1;
            updateLightboxImage();
        });

        // Show next image
        $nextBtn.click(function(e) {
            e.stopPropagation(); // Prevent closing the lightbox
            currentSlideIndex = (currentSlideIndex < $galleryItems.length - 1) ? currentSlideIndex + 1 : 0;
            updateLightboxImage();
        });

        // Function to update lightbox image
        function updateLightboxImage() {
            var newSrc = $galleryItems.eq(currentSlideIndex).attr('src');
            $image.attr('src', newSrc);
        }
    }
});
