
function onSubmit(e) {
    e.preventDefault();

    document.querySelector('.msg').textContent = ''
    document.querySelector('#image').src = ''

    const prompt = document.querySelector('#prompt').value
    const size = document.querySelector('#size').value

    if (prompt === '') {
        alert('Please Write what type image you want to generate.')
        return
    }

    generateImageRequest(prompt, size)
}

function showSpinner() {
    document.querySelector('.spinner').classList.add('show')
}
    
function removeSpinner() {
    document.querySelector('.spinner').classList.remove('show')
}

async function generateImageRequest(prompt, size) {
    try {
        showSpinner()

        const response = await fetch('/openai/generateimage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt,
                size,
            })
        })

        if (!response.ok) {
            removeSpinner()
            throw new Error('That image could not be generated')
        }

        const data = await response.json()
        removeSpinner()
        // console.log(data)
        const imageUrl = data.data
        document.querySelector('#image').src = imageUrl

    } catch (error) {
        document.querySelector('.msg').textContent = error
    }
}


document.querySelector('#image-form').addEventListener('submit', onSubmit)