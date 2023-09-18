var cart = [];
    var tot = 0;

    function aggiungiAlCarrello(prodotto, prezzo) {
      cart.push(prodotto);
      tot += prezzo;
      
      var lista = document.getElementById("cart-list");
      var listItem = document.createElement("li");
      listItem.textContent = prodotto;
      lista.appendChild(listItem);
    }
    
    function acquista() {
      var totalDiv = document.getElementById("total-price");
    
      totalDiv.textContent =tot + "€";
      cart = [];
      tot = 0;
      var lista = document.getElementById("cart-list");
      lista.innerHTML = "";
      const username = localStorage.getItem('username');

      const saluto = document.getElementById('saluto');
      saluto.textContent = 'Buongiorno ' + username;
    }
    const username = localStorage.getItem('username');
    const saluto = document.getElementById('saluto');
    saluto.textContent = 'Buongiorno ' + username; 
    

    fetch('username')
  .then(response => response.text())
  .then(data => {
    const username = data.trim();
    const saluto = document.getElementById('saluto');
    saluto.textContent = 'Buongiorno ' + username;
  })
  .catch(error => {
    console.error(error);
  });
