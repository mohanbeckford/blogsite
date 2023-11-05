document.addEventListener("DOMContentLoaded", () => {
    const $navbarTogglers = Array.prototype.slice.call(
        document.querySelectorAll(".navbar-toggler"),
        0
    );

    // Check if there are any navbar togglers
    if ($navbarTogglers.length > 0) {
        // Add a click event on each of them
        $navbarTogglers.forEach((el) => {
            el.addEventListener("click", () => {
                // Get the target from the "data-target" attribute
                const target = el.getAttribute("data-target");
                const $target = document.querySelector(target);

                // Toggle the "show" class on the target 
                $target.classList.toggle("show");
            });
        });
    }
});
