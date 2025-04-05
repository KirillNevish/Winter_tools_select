window.onload = function () {
    const snowBoards = [
        { title: "TWIN FLYING V", price: "$680", image: "./img/snowboard1.PNG" },
        { title: "CLASH", price: "$730", image: "./img/snowboard2.PNG" },
        { title: "TRICKSTICK AMPTEK", price: "$800", image: "./img/snowboard3.PNG" }
      ];
    
      const jackets = [
        { title: "GREED JACKET", price: "$160", image: "./img/jacket1.PNG" },
        { title: "LA", price: "$130", image: "./img/jacket2.PNG" },
        { title: "DUNMORE", price: "$140", image: "./img/jacket3.PNG" }
      ];

      const helmets = [
        { title: "RIME", price: "$80", image: "./img/helmet1.PNG" },
        { title: "LYNX", price: "$60", image: "./img/helmet2.PNG" },
        { title: "UNDEFEATED TALAN", price: "$70", image: "./img/helmet3.PNG" }
      ];

      const snowBoardsContainer = document.getElementById('snowBoard-container');
      const jacketsContainer = document.getElementById('jacket-container');
      const helmetsContainer = document.getElementById('helmet-container');

      const selectedCountText = document.getElementById('selected-count');
      const checkoutBtn = document.getElementById('checkout-btn');

      const selected = {
        snowboard: null,
        jacket: null,
        helmet: null
      };

      renderItems(snowBoards, snowBoardsContainer, 'snowboard');
  renderItems(jackets, jacketsContainer, 'jacket');
  renderItems(helmets, helmetsContainer, 'helmet');
    
    
      function renderItems(items, container, category) {
        container.innerHTML = '';
        items.forEach((item, index) => {
          const card = document.createElement('div');
          card.classList.add('card', category);
          card.style.cssText = `
            background-color: "white"; width: 100%; max-width: 300px; border: 1px solid grey; 
            display: flex; flex-direction: column; transition: 0.3s;
          `;
    
          card.innerHTML = `
            <div style="height: 260px; background-color: "white";">
              <img src="${item.image}" alt="${item.title}" width="100%" style="background-size: cover; background-position: center;">
            </div>
            <div style="padding: 10px 10px 20px 10px; background-color: #f5f5f5; border-top: 1px solid grey;">
              <p style="font-size: 0.9rem; font-weight: 600; text-align: center;">
                ${item.title}
              </p>
              <p style="text-align: center;">
                ${item.price}
              </p>
              <button class="select-btn" data-index="${index}" data-category="${category}" style="
                border: none; background-color: blue; border-radius: 12px; height: 30px; width: 8vw; min-width: 100px; max-width: 200px; display: flex; justify-content: center; align-items: center; margin: 0 auto; cursor: pointer;
              ">
                <p style="font-size: 0.9rem; font-weight: 600; color: #fff;">SELECT</p>
              </button>
            </div>
          `;
          container.appendChild(card);
        });
    
        const buttons = container.querySelectorAll('.select-btn');
        buttons.forEach(btn => {
          btn.addEventListener('click', function () {
            const cat = this.getAttribute('data-category');
            const index = this.getAttribute('data-index');
            const allCards = document.querySelectorAll(`.card.${cat}`);
            const clickedCard = this.closest('.card');
            const isDisabled = clickedCard.classList.contains('disabled');
    
            if (isDisabled) {
              allCards.forEach(card => {
                card.classList.remove('disabled', 'selected');
                card.style.filter = 'none';
              });
              clickedCard.classList.add('selected');
              allCards.forEach(card => {
                if (!card.classList.contains('selected')) {
                  card.classList.add('disabled');
                  card.style.filter = 'grayscale(100%) opacity(0.5)';
                }
              });
            } else {
              allCards.forEach(card => {
                card.classList.remove('selected');
                card.classList.add('disabled');
                card.style.filter = 'grayscale(100%) opacity(0.5)';
              });
              clickedCard.classList.remove('disabled');
              clickedCard.classList.add('selected');
              clickedCard.style.filter = 'none';
            }
            selected[cat] = items[index];
            updateHeader();
            if (cat === 'snowboard') {
                document.getElementById('step2')?.scrollIntoView({ behavior: 'smooth' });
              } else if (cat === 'jacket') {
                document.getElementById('step3')?.scrollIntoView({ behavior: 'smooth' });
              }
            window.addEventListener('resize', updateHeader);
          });
        });
      }

      function updateHeader() {
        const count = Object.values(selected).filter(Boolean).length;
        const isMobile = window.innerWidth < 768;

  if (isMobile) {
    selectedCountText.textContent = `${count} OF 3`;
  } else {
    selectedCountText.textContent = `${count} OF 3 PRODUCTS SELECTED`;
  }
        if (count === 3) {
          checkoutBtn.removeAttribute('disabled');
          checkoutBtn.style.backgroundColor = 'blue';
          checkoutBtn.style.cursor = 'pointer';
        } else {
          checkoutBtn.setAttribute('disabled', true);
          checkoutBtn.style.backgroundColor = 'gray';
          checkoutBtn.style.cursor = 'not-allowed';
        }
      }
    };
