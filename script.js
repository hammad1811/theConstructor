
document.addEventListener('DOMContentLoaded', function () {
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const mobileMenu = document.querySelector('.mobile-menu-links');


  hamburgerMenu.addEventListener('click', function (e) {
    e.stopPropagation();
    mobileMenu.classList.toggle('active');
  });


  document.addEventListener('click', function () {
    mobileMenu.classList.remove('active');
  });


  mobileMenu.addEventListener('click', function (e) {
    e.stopPropagation();
  });
});




const navLinks = document.querySelectorAll('.nav-links a');
const currentPath = window.location.pathname.split('/').pop() || 'index.html';

navLinks.forEach(link => {
 
  const linkPath = link.getAttribute('href')
    .replace(/^\.?\//, '')
    .toLowerCase();

  // Special case for home link
  if ((currentPath === '' || currentPath === 'index.html') && 
      (linkPath === '' || linkPath === 'index.html')) {
    link.classList.add('active-link');
  } else {
    link.classList[linkPath === currentPath ? 'add' : 'remove']('active-link');
  }
});

// Repeat the same logic for mobile links
const MobileNavLinks = document.querySelectorAll('.mobile-active-links a');

MobileNavLinks.forEach(link => {
  const linkPath = link.getAttribute('href')
    .replace(/^\.?\//, '')
    .toLowerCase();

  if ((currentPath === '' || currentPath === 'index.html') && 
      (linkPath === '' || linkPath === 'index.html')) {
    link.classList.add('mobile-active-link');
  } else {
    link.classList[linkPath === currentPath ? 'add' : 'remove']('mobile-active-link');
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const filters = document.querySelectorAll(".filter-item");
  const projectCards = document.querySelectorAll(".project-card");

  filters.forEach(filter => {
    filter.addEventListener("click", () => {
      filters.forEach(f => f.classList.remove("active"));
      filter.classList.add("active");

      const category = filter.getAttribute("data-category");

      projectCards.forEach(card => {
        if (category === "all" || card.getAttribute("data-category") === category) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
});


document.addEventListener("DOMContentLoaded", ()=> {
  const btn = document.querySelector(".view-all-btn");
  const projectCards = document.querySelectorAll(".project-card");
  btn.addEventListener("click", ()=>{
    projectCards.forEach(card => {
        card.style.display = "block";
    });
  })
  

})



document.querySelector('.hamburger-menu').addEventListener('click', function () {
  document.querySelector('.nav-links').classList.toggle('active');
});



document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.querySelector(".projects-gallery");
  const projectCards = Array.from(gallery.querySelectorAll(".project-card"));
  const forwardBtn = document.querySelector(".forward");
  const backwardBtn = document.querySelector(".backward");
  const filterItems = Array.from(document.querySelectorAll(".filter-item"));

  let currentIndex = 0;
  let activeFilter = "all";
  let cardsPerPage = window.innerWidth <= 550 ? 2 : 4; // Dynamic cards per page

  const getFilteredCards = () => {
    return projectCards.filter((card) => {
      return activeFilter === "all" || card.dataset.category === activeFilter;
    });
  };

  const updateCardsPerPage = () => {
    cardsPerPage = window.innerWidth <= 550 ? 2 : 4;
  };

  const updateGallery = () => {
    updateCardsPerPage();
    const filteredCards = getFilteredCards();

    projectCards.forEach((card) => {
      card.style.display = "none";
    });

    filteredCards.forEach((card, index) => {
      if (index >= currentIndex && index < currentIndex + cardsPerPage) {
        card.style.display = "block";
      }
    });

    
    backwardBtn.classList.toggle("disabled", currentIndex === 0);
    forwardBtn.classList.toggle(
      "disabled",
      currentIndex + cardsPerPage >= filteredCards.length
    );
  };

  window.addEventListener("resize", () => {
    const prevCardsPerPage = cardsPerPage;
    updateCardsPerPage();
    
    
    if (prevCardsPerPage !== cardsPerPage) {
      currentIndex = Math.floor(currentIndex / cardsPerPage) * cardsPerPage;
      updateGallery();
    }
  });

  
  filterItems.forEach((filterItem) => {
    filterItem.addEventListener("click", (event) => {
      activeFilter = event.target.dataset.category;
      currentIndex = 0;
      filterItems.forEach((item) => item.classList.remove("active"));
      filterItem.classList.add("active");
      updateGallery();
    });
  });


  forwardBtn.addEventListener("click", () => {
    const filteredCards = getFilteredCards();
    if (currentIndex + cardsPerPage < filteredCards.length) {
      currentIndex += cardsPerPage;
      updateGallery();
    }
  });

  backwardBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex -= cardsPerPage;
      updateGallery();
    }
  });

  
  updateGallery();
});







document.addEventListener("DOMContentLoaded", () => {
  const carouselImages = [
    "./images/projectPic1.png",
    "./images/projectPic2.png",
    "./images/projectPic3.png",
  ];
  let currentImageIndex = 0;

  const imgElement = document.querySelector(".about-project-image img");
  const prevBtn = document.querySelector(".pagination-i-btn:first-child");
  const nextBtn = document.querySelector(".pagination-i-btn:last-child");

  const updateImage = () => {
    imgElement.src = carouselImages[currentImageIndex];
    imgElement.alt = `Project image ${currentImageIndex + 1}`;
  };

  prevBtn.addEventListener("click", () => {
    currentImageIndex =
      (currentImageIndex - 1 + carouselImages.length) % carouselImages.length;
    updateImage();
  });

  nextBtn.addEventListener("click", () => {
    currentImageIndex = (currentImageIndex + 1) % carouselImages.length;
    updateImage();
  });

  
  updateImage();
});







document.addEventListener("DOMContentLoaded", () => {
  const testimonialCards = Array.from(document.querySelectorAll(".testimonial-card"));
  const testimonialDots = Array.from(document.querySelectorAll(".testimonial-dot"));

  const cardsPerSlide = 4; // Number of cards to display at a time
  let currentSlide = 0;

  const updateSlider = () => {
    // Hide all testimonial cards
    testimonialCards.forEach((card) => {
      card.style.display = "none";
    });

    // Show cards for the current slide
    const start = currentSlide * cardsPerSlide;
    const end = start + cardsPerSlide;
    testimonialCards.slice(start, end).forEach((card) => {
      card.style.display = "block";
    });

    // Update active dot
    testimonialDots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide);
    });
  };

  // Event listener for dots
  testimonialDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlide = index;
      updateSlider();
    });
  });

  // Initialize slider
  updateSlider();
});

document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".testimonial-carousel");
  const dotsContainer = document.querySelector(".testimonial-dots");
  const cards = Array.from(carousel.children);

  // Create dots dynamically
  cards.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("testimonial-dot");
    if (index === 0) dot.classList.add("active");
    
    dot.addEventListener("click", () => {
      const card = cards[index];
      const scrollLeft = card.offsetLeft - carousel.offsetLeft;
      carousel.scrollTo({ left: scrollLeft, behavior: "smooth" });
    });
    
    dotsContainer.appendChild(dot);
  });

  // Configure Intersection Observer
  const observerOptions = {
    root: carousel,
    rootMargin: "0px",
    threshold: 0.6 // Trigger when 60% of card is visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeIndex = cards.indexOf(entry.target);
        dotsContainer.querySelectorAll(".testimonial-dot").forEach((dot, index) => {
          dot.classList.toggle("active", index === activeIndex);
        });
      }
    });
  }, observerOptions);

  // Observe each card
  cards.forEach(card => observer.observe(card));
});


document.addEventListener("DOMContentLoaded", () => {
  const serviceItems = Array.from(document.querySelectorAll(".more-service-item"));
  const prevButton = document.querySelector(".pagination-btn:first-child");
  const nextButton = document.querySelector(".pagination-btn:last-child");

  const itemsPerSlide = 4; // Number of items visible in one slide
  let currentSlide = 0;

  const updateSlider = () => {
    // Hide all service items
    serviceItems.forEach((item) => {
      item.style.display = "none";
    });

    // Show items for the current slide
    const start = currentSlide * itemsPerSlide;
    const end = start + itemsPerSlide;
    serviceItems.slice(start, end).forEach((item) => {
      item.style.display = "flex";
    });

    // Update button states
    prevButton.disabled = currentSlide === 0;
    nextButton.disabled = currentSlide === Math.ceil(serviceItems.length / itemsPerSlide) - 1;
  };

  // Event listeners for buttons
  prevButton.addEventListener("click", () => {
    if (currentSlide > 0) {
      currentSlide--;
      updateSlider();
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentSlide < Math.ceil(serviceItems.length / itemsPerSlide) - 1) {
      currentSlide++;
      updateSlider();
    }
  });

  // Initialize slider
  updateSlider();
});


document.addEventListener("DOMContentLoaded", () => {
  const featureItems = document.querySelectorAll(".feature-item");

  featureItems.forEach((item) => {
    item.addEventListener("click", () => {
      // Remove 'active' class from all feature items
      featureItems.forEach((el) => el.classList.remove("activeDF"));

      // Add 'active' class to the clicked item
      item.classList.add("activeDF");

      // Get the associated description
      const description = item.nextElementSibling;

      // Toggle visibility of the clicked item's description
      if (description && description.classList.contains("feature-description")) {
        description.style.display = description.style.display === "flex" ? "none" : "flex";

        // Collapse other descriptions
        document.querySelectorAll(".feature-description").forEach((desc) => {
          if (desc !== description) {
            desc.style.display = "none";
          }
        });
      }
    });
  });
});





// List of sections to apply modal functionality
const sections = [".projects-section", ".project-catagory"];

// Iterate over each section
sections.forEach((sectionSelector) => {
  const section = document.querySelector(sectionSelector);

  if (section) {
    // Get all project-info-icon elements within this section
    const projectIcons = section.querySelectorAll(".project-info-icon");

    // Create a shared modal if not already created
    let modal = document.querySelector(".modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.className = "modal";
      modal.innerHTML = `
        <div class="modal-content">
          <button class="modal-close">&times;</button>
          <img src="" alt="Full Project Image">
        </div>
      `;
      document.body.appendChild(modal);
    }

 
    const modalImage = modal.querySelector("img");
    const modalClose = modal.querySelector(".modal-close");

    // Show Modal on Icon Click
    projectIcons.forEach((icon) => {
      icon.addEventListener("click", (e) => {
        const imgSrc = e.target.closest(".project-card").querySelector("img").src;
        modalImage.src = imgSrc; // Set the image source
        modal.style.display = "flex"; // Show modal
      });
    });


    // Close Modal on Close Button Click
    modalClose.addEventListener("click", () => {
      modal.style.display = "none";
    });

    // Close Modal on Background Click
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }
});

