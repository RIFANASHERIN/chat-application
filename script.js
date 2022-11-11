const PANTRY_ID = 'e76bc9c7-92f6-4afe-b546-9d1865ea0fbe';

const messages = document.querySelector('#messages');
const in1 = document.querySelector('#in1');


const getUser = () => {
    const user = prompt('Enter username');
    localStorage.setItem('user', user);
    return user;
}

const send = document.querySelector('#send');
const username = localStorage.getItem('user') ?? getUser();


const getMessages = async () => {
const response = await axios.get('https://getpantry.cloud/apiv1/pantry/e76bc9c7-92f6-4afe-b546-9d1865ea0fbe/basket/messages');
return response.data;
}

const addMessage = async (user, message) => {
    try{
        const time = Date.now().toString();
        const response = await axios.put('https://getpantry.cloud/apiv1/pantry/e76bc9c7-92f6-4afe-b546-9d1865ea0fbe/basket/messages', {
            [time]: {
                user, message
            }
        });
        return true;
    }
    catch{
        return false;
    }
    
}

const reloadMessages = async () => {
    const m = await getMessages();
    messages.innerHTML = '';
    for (const [key, value] of Object.entries(m)) {
        messages.innerHTML += `<p>${value.user}:${value.message}`;
      }
    console.log(m);
}



send.addEventListener('click', (e) => {
    addMessage(username, in1.value).then(() => {
        reloadMessages();
    })
})


reloadMessages();




