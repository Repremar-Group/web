window.addEventListener('scroll', function() {
    var header = document.querySelector('header');
    var logo = document.getElementById('whatsapp-logo');

    if (window.scrollY > 0) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});