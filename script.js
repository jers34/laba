const auth = {
    users: JSON.parse(localStorage.getItem('fc-users') || '{}'),
    current: null,
};

function saveUsers() {
    localStorage.setItem('fc-users', JSON.stringify(auth.users));
}

function register() {
    const username = document.getElementById('reg-username').value.trim();
    const password = document.getElementById('reg-password').value;
    if (!username || !password || auth.users[username]) {
        alert('Invalid or existing user');
        return;
    }
    auth.users[username] = { password, friends: [] };
    saveUsers();
    alert('Registered!');
}

function login() {
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;
    if (auth.users[username]?.password !== password) {
        alert('Invalid credentials');
        return;
    }
    auth.current = username;
    document.getElementById('current-user').textContent = username;
    document.getElementById('auth').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    renderFriends();
}

function addFriend() {
    const friendName = document.getElementById('friend-name').value.trim();
    const privacy = document.getElementById('privacy-level').value;
    if (!friendName) {
        alert('Enter a friend name');
        return;
    }
    const friends = auth.users[auth.current].friends;
    friends.push({ name: friendName, privacy });
    saveUsers();
    renderFriends();
    document.getElementById('friend-name').value = '';
}

function renderFriends() {
    const list = document.getElementById('friend-list');
    list.innerHTML = '';
    const friends = auth.users[auth.current].friends;
    friends.forEach((f, idx) => {
        const li = document.createElement('li');
        li.textContent = `${f.name} - ${f.privacy}`;
        const btn = document.createElement('button');
        btn.textContent = 'Remove';
        btn.onclick = () => {
            friends.splice(idx, 1);
            saveUsers();
            renderFriends();
        };
        li.appendChild(btn);
        list.appendChild(li);
    });
}

function logout() {
    auth.current = null;
    document.getElementById('auth').classList.remove('hidden');
    document.getElementById('dashboard').classList.add('hidden');
}

document.getElementById('register').onclick = register;
document.getElementById('login').onclick = login;
document.getElementById('add-friend').onclick = addFriend;
document.getElementById('logout').onclick = logout;
