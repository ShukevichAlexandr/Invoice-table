document.addEventListener("DOMContentLoaded", function() {
    const data = { 
        carts: [],
        render() {
            const cartsListContainer = document.querySelector('.carts-list');
            cartsListContainer.innerHTML = ''; 

            for (let cart of this.carts) { 
                const li = document.createElement('li'); 
                const form = document.createElement('form');
                const containerDiv = document.createElement('div'); 
                const titleName = document.createElement('p'); 
                const titleNickname = document.createElement('p'); 
                const containerStats = document.createElement('div'); 
                const plusPoint = document.createElement('button'); 
                const minusPoint = document.createElement('button');
                const titleScores = document.createElement('p'); 
                const scores = document.createElement('p'); 

                titleName.dataset.cartId = cart.id;
                titleName.className = 'title-name';
                titleName.textContent = cart.title || '';

                titleNickname.className = 'title-nickname';
                titleNickname.textContent = cart.content || '';

                plusPoint.className = 'plus';
                plusPoint.dataset.cartId = cart.id;

                minusPoint.className = 'minus';
                minusPoint.dataset.cartId = cart.id;

                titleScores.className = 'scoresZ';
                titleScores.textContent = 'Счёт:';

                scores.className = 'current-scores';
                scores.textContent = `${cart.score || 0}`; // Текущий счёт (или 0, если его нет)

                // Прикрепляем обработчики прямо к кнопкам при создании!
                plusPoint.addEventListener('click', () => {
                    const index = data.carts.findIndex(c => c.id === parseInt(plusPoint.dataset.cartId));
                    if(index !== -1){
                        data.carts[index].score++;
                        data.render(); // Ререндерим страницу
                    }
                });

                minusPoint.addEventListener('click', () => {
                    const index = data.carts.findIndex(c => c.id === parseInt(minusPoint.dataset.cartId));
                    if(index !== -1 ){ // Не позволяем уменьшать ниже нуля
                        data.carts[index].score--;
                        data.render(); // Ререндерим страницу
                    }
                });

                containerStats.className = 'stats';
                containerStats.appendChild(plusPoint);
                containerStats.appendChild(minusPoint);
                containerStats.appendChild(titleScores);
                containerStats.appendChild(scores);

                containerDiv.className = 'cart';
                containerDiv.appendChild(titleName);
                containerDiv.appendChild(titleNickname);
                containerDiv.appendChild(containerStats);

                form.appendChild(containerDiv);
                li.appendChild(form); 
                cartsListContainer.appendChild(li);
            }   
        },

        addCart(cartData) {
            const newCart = {
                id: Date.now(), // Уникальный ID
                title: cartData.title || '', 
                content: cartData.content || '',
                score: 0 // Начальный счёт
            };
            this.carts.push(newCart);
            this.render();
        }
    };

    data.render();

    const createButton = document.querySelector('.create_elem');

    createButton.addEventListener('click', function(event) {
        event.preventDefault();
    
        const titleNameInput = document.querySelector('#title-name-input');
        const titleNameValue = titleNameInput.value.trim();
    
        const titleNicknameInput = document.querySelector('#title-nickname-input');
        const titleNicknameValue = titleNicknameInput.value.trim();
    
        if (!titleNameValue ) {
            return alert('Введите имя участника спора');
        }
    
        data.addCart({
            title: titleNameValue,
            content: titleNicknameValue
        });
    
        titleNameInput.value = '';
        titleNicknameInput.value = '';
    });
});