 // Function to sort products based on the selected option
//  sortProducts();
//  filterItems();

        function sortProducts() {
            const sortOption = document.getElementById("sort-option").value;
            const productsContainer = document.querySelector(".products");
            const rows = Array.from(productsContainer.getElementsByClassName("row"));

            rows.sort((a, b) => {
                const priceA = parseFloat(a.querySelector(".price p").textContent.replace("$", "").replace(',', ""));
                const priceB = parseFloat(b.querySelector(".price p").textContent.replace("$", "").replace(',', ""));
                return sortOption === "priceLowToHigh" ? priceA - priceB : priceB - priceA;
            });

            rows.forEach(row => productsContainer.appendChild(row));
        }

        // Event listener for the sort option change
        document.getElementById("sort-option").addEventListener("change", sortProducts);

        function filterItems(category) {
          // Get all product rows
          const productRows = document.querySelectorAll('.products .row');
          
          // Loop through each product row
          productRows.forEach(row => {
            // Get the product category for each row
            const productCategory = row.querySelector('.product-text h6').textContent;
            
            // Show or hide the row based on the category
            if (category === 'All' || productCategory === category) {
              row.style.display = 'block';
            } else {
              row.style.display = 'none';
            }
          });
        }