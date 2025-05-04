document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    const userList = document.getElementById('user-list');
  
    // Mostrar usuarios al cargar
    fetch('/Personas')
      .then(res => res.json())
      .then(users => {
        userList.innerHTML = '';
        users.forEach(u => {
            console.log(users);
          const li = document.createElement('li');
          li.textContent = `${u.username} - ${u.password}`;
          userList.appendChild(li);
        });
      });
  
    // Enviar formulario sin recargar
    form.addEventListener('submit', e => {
      e.preventDefault();
  
      const formData = new FormData(form);
      const data = {
        username: formData.get('username'),
        password: formData.get('password')
      };
  
      fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        
      .then(res => res.json())
      .then(updatedList => {
        form.reset();
        userList.innerHTML = '';
        updatedList.forEach(u => {
          const li = document.createElement('li');
          li.textContent = `${u.username} - ${u.password}`;
          li.classList.add('animated-user');
          userList.appendChild(li);
        });
      });      
    });
  });
  