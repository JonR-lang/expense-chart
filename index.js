window.addEventListener('load', () => {
    const progressBar = document.querySelectorAll('.progress-bar')
    
    fetch('./data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('There is something wrong')
        }
        return response.json();
    })

    .then(data => {
        let highestNumber = 0;
        let heightinPixels = 120;

        for (let i = 0; i < progressBar.length; i++) {
            progressBar[i].previousElementSibling.textContent = data[i].amount;
        }

        progressBar.forEach(element => {
            if (Number(element.previousElementSibling.textContent) > highestNumber) {
                highestNumber = Number(element.previousElementSibling.textContent);
                console.log(typeof highestNumber)
            }
        })
        
        progressBar.forEach(item => {
            if (Number(item.previousElementSibling.textContent) === highestNumber) {
                item.style.height = `${heightinPixels}px`;
                item.previousElementSibling.textContent = `$${item.previousElementSibling.textContent}`;
                item.classList.add('active');
            } else {
                let heightofOtherBars = (Number(item.previousElementSibling.textContent) * heightinPixels)/highestNumber;
                item.style.height = `${heightofOtherBars}px`;
                item.previousElementSibling.textContent = `$${item.previousElementSibling.textContent}`;
            }

            item.addEventListener('mouseover', () => {
                item.previousElementSibling.classList.add('active');   
            })
            item.addEventListener('mouseout', () => {
                item.previousElementSibling.classList.remove('active');
            })

        })
    })
})






