document.getElementById('fetchButton').addEventListener('click', async function () {
    const username = document.getElementById('username').value.trim();
    const fields = Array.from(document.querySelectorAll('.form-check-input:checked')).map(cb => cb.value);
    const url = `https://api.github.com/users/${username}`;
    const userInfoDiv = document.getElementById('userInfo');
    
    userInfoDiv.innerHTML = ''; // Clear previous user info

    if (username === "") {
        userInfoDiv.innerHTML = `<p>Please enter a GitHub username.</p>`;
        return;
    }

    if (fields.length === 0) {
        userInfoDiv.innerHTML = `<p>Please select at least one data field.</p>`;
        return;
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('User not found');
        }
        const data = await response.json();

        fields.forEach(field => {
            if (data[field] !== undefined) {
                userInfoDiv.innerHTML += `<p><strong>${field.charAt(0).toUpperCase() + field.slice(1)}:</strong> ${data[field]}</p>`;
            } else {
                userInfoDiv.innerHTML += `<p>Field "${field}" not found</p>`;
            }
        });
    } catch (error) {
        userInfoDiv.innerHTML = `<p>${error.message}</p>`;
    }
});

