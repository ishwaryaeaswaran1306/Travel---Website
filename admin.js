async function loadData() {

    const response = await fetch("http://localhost:3000/contact");

    const data = await response.json();

    document.getElementById("count").innerHTML =
"Total Inquiries: " + data.length;

    const table = document.getElementById("tableBody");

    table.innerHTML = "";

    data.forEach(item => {

        table.innerHTML += `
        <tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.concern}</td>
            <td>${item.message}</td>
            <td>
                <button onclick="editInquiry(${item.id},
'${item.name}',
'${item.concern}',
'${item.message}')">
Edit
</button>

<button onclick="deleteInquiry(${item.id})">
Delete
</button>
            </td>
        </tr>
        `;

    });

}

async function deleteInquiry(id){

    const response = await fetch(
        `http://localhost:3000/contact/${id}`,
        {
            method:"DELETE"
        }
    );

    alert(await response.text());

    loadData();

    async function editInquiry(id, name, concern, message){

    const newName = prompt("Enter Name", name);

    const newConcern = prompt("Enter Concern", concern);

    const newMessage = prompt("Enter Message", message);

    await fetch(`http://localhost:3000/contact/${id}`,{

        method:"PUT",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            name:newName,

            concern:newConcern,

            message:newMessage

        })

    });

    alert("Inquiry Updated");

    loadData();

}

}

loadData();