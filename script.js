const PANTRY_ID = 'e76bc9c7-92f6-4afe-b546-9d1865ea0fbe';

const messages = document.querySelector('#messages');
const in1 = document.querySelector('#in1');
var data = [];

const messageCard = (user, message) => `
<div class="flex w-full mt-2 space-x-3 max-w-xs">
<div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
<div>
    <div class="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
        <p class="text-sm">${message}</p>
    </div>
    <span class="text-xs text-gray-500 leading-none">${user}</span>
</div>
</div>
`;

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
        messages.innerHTML += messageCard(value.user, value.message);
      }
    console.log(m);
}



in1.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        // Cancel the default action, if needed
        e.preventDefault();
        addMessage(username, in1.value).then(() => {
            reloadMessages().then(() => {
                document.getElementById('messages').scrollIntoView({ behavior: 'smooth', block: 'end' });
                in1.value = '';
            })
        });
      }
    
})


reloadMessages();




