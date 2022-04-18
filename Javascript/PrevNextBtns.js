// Next Button on First Carousel
document.querySelector('#carouselFirst .carousel-control-next').addEventListener('click', e => {
    // Finds Where we are now
    let carouselRowNum = document.querySelector('#carouselFirst .carousel-indicators .active').getAttribute('data-bs-slide-to');
    // Removes all active Classes needed
    for (let i of weatherContent.children) {
        i.classList.remove('active');
    }
    document.querySelector("#carouselFirst .carousel-indicators .active").classList.remove('active');
    document.querySelector("#carousel_second_content .active").classList.remove('active');

    // Change Slide
    if (carouselRowNum < document.querySelector("#carouselFirst .carousel-indicators").childElementCount) {
        weatherContent.children.item(carouselRowNum).classList.add('active');
        document.querySelector("#carouselFirst .carousel-indicators").children.item(carouselRowNum).classList.add('active');
        secondCarousel.children.item(carouselRowNum).classList.add('active');
    }else {
        weatherContent.children.item(0).classList.add('active');
        document.querySelector("#carouselFirst .carousel-indicators").children.item(0).classList.add('active');
        secondCarousel.children.item(0).classList.add('active');
    }
} );

// Same Operation But On Previous Button
document.querySelector("#carouselFirst .carousel-control-prev").addEventListener("click", e => {
    let carouselRowNum = document.querySelector("#carouselFirst .carousel-indicators .active").getAttribute("data-bs-slide-to");

    for (let x of weatherContent.children) {
        x.classList.remove("active");
    }
    document.querySelector("#carouselFirst .carousel-indicators .active").classList.remove('active');
    document.querySelector("#carousel_second_content .active").classList.remove('active');

    if (carouselRowNum < 2) {
        weatherContent.children.item(weatherContent.children.length-1).classList.add('active');
        document.querySelector("#carouselFirst .carousel-indicators").children.item(document.querySelector("#carouselFirst .carousel-indicators").children.length-1).classList.add("active");
        secondCarousel.children.item(weatherContent.children.length-1).classList.add('active');
    }else {
        weatherContent.children.item(carouselRowNum-2).classList.add('active');
        document.querySelector("#carouselFirst .carousel-indicators").children.item(carouselRowNum-2).classList.add("active");
        secondCarousel.children.item(carouselRowNum-2).classList.add('active');
    }
} );