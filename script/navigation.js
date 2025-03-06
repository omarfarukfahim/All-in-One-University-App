document.addEventListener("DOMContentLoaded", () => {
    // Select all elements that have a data-page attribute.
    const navElements = document.querySelectorAll("[data-page]");
    
    navElements.forEach((navItem) => {
      navItem.addEventListener("click", () => {
        // Get the target page URL from the data attribute.
        const pageUrl = navItem.getAttribute("data-page");
        
        // Redirect to the target page.
        window.location.href = pageUrl;
      });
    });
  });
  