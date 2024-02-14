document.addEventListener("DOMContentLoaded", function () {
    // Get the current URL or path to identify the active page
    let path = window.location.pathname;
    // Extract the page name
    path = path.substring(path.lastIndexOf('/') + 1);

    // Set the 'active' class on the corresponding nav link
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        // Check if the href of the link matches the current path
        if (link.getAttribute('href') === path) {
            link.classList.add('active');
        }
    });

});


document.querySelectorAll('.feature-icon i').forEach(item => {
    item.addEventListener('click', () => {
        // Trigger any action, like opening a modal with more info
        alert('More information about ' + item.nextElementSibling.textContent);
    });
});


// Function to open a modal
function openModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = "block";
}

// Function to close a modal
function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = "none";
}

// Close modal when clicking outside of it
window.onclick = function (event) {
    if (event.target.className === 'modal') {
        event.target.style.display = "none";
    }
}


// Select all feature icons
const featureIcons = document.querySelectorAll('.feature-icon');

// Function to enlarge icons
function enlargeIcon() {
    this.style.transform = 'scale(1.5)'; // Enlarge icon more significantly
}

// Function to reset icon size
function resetIconSize() {
    this.style.transform = 'scale(1)'; // Reset icon size
}

// Add mouseover and mouseout event to each icon
featureIcons.forEach(icon => {
    icon.addEventListener('mouseover', enlargeIcon);
    icon.addEventListener('mouseout', resetIconSize);
});


document.querySelectorAll('.member-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.boxShadow = '0px 15px 30px 0px rgba(0, 0, 0, 0.2)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.boxShadow = '0px 8px 16px 0px rgba(0, 0, 0, 0.1)';
    });
});


const discoverButton = document.querySelector('.btn-discover');
if (discoverButton) {
    discoverButton.addEventListener('click', () => {
        window.location.href = '/products-page'; // Adjust the URL to your products page
    });
}
//_______________home page__________________________________________________________________________________________________________________
// Example of using JavaScript to add animations or additional interactivity
document.querySelectorAll('.home-page-featured-solutions .card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        // Animation or interaction logic on mouse enter
    });
    card.addEventListener('mouseleave', () => {
        // Animation or interaction logic on mouse leave
    });
});
//_______________Members page__________________________________________________________________________________________________________________

// Assuming you're using jQuery for Bootstrap modal triggers

//$('.member-page-card').click(function () {
//    var targetModal = $(this).data('target');
//    $(targetModal).modal('show');
//});
// Tooltips for benefits
document.addEventListener('DOMContentLoaded', () => {
    const benefitItems = document.querySelectorAll('.key-benefits-list li');

    benefitItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            // Show tooltip
            const tooltip = item.querySelector('.benefit-description');
            tooltip.style.display = 'block';
        });

        item.addEventListener('mouseleave', () => {
            // Hide tooltip
            const tooltip = item.querySelector('.benefit-description');
            tooltip.style.display = 'none';
        });
    });
});


//_______________Product page__________________________________________________________________________________________________________________
document.addEventListener('DOMContentLoaded', (event) => {
    // Listener for opening modals
    document.querySelectorAll('tr[data-bs-toggle="modal"]').forEach(tr => {
        tr.addEventListener('click', function () {
            var targetModalId = this.getAttribute('data-bs-target');
            var targetModal = new bootstrap.Modal(document.querySelector(targetModalId), {});
            targetModal.show();
        });
    });

    // Listener for closing modals
    document.querySelectorAll('.btn-close-blue').forEach(button => {
        button.addEventListener('click', function () {
            var modal = bootstrap.Modal.getInstance(this.closest('.modal'));
            modal.hide();
        });
    });
});

