const row = document.querySelector('.row');
const selectElem = document.getElementsByTagName('select')[0];

getData = () => {
    return fetch('personList.json')
    .then(result => {return result.json()})
    .then(result => {
        return result;
    })
}

addDataHtml = (maxResult) => {
    row.innerHTML = '';
    getData().then(data => {
        if (!maxResult || maxResult == 'allData') {
            maxResult = data.length;
        }
        for (let key = 0; key < maxResult; key++) {
                row.innerHTML += `
                    <div class="col-md-3 col-12 mt-3">
                    <div class="card">
                        <img src="${data[key].avatar}" class="card-img-top" alt="...">
                        <div class="card-body">
                        <h5 class="card-title">${data[key].first_name} ${data[key].last_name}</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">${data[key].email}</li>
                                <li class="list-group-item">${data[key].gender}</li>
                                <li class="list-group-item">${data[key].company_name}</li>
                                <li class="list-group-item">${data[key].job_title}</li>
                                <li class="list-group-item">${data[key].department}</li>
                                <li class="list-group-item">${data[key].country}</li>
                                <li class="list-group-item">${data[key].phone_number}</li>
                                <li class="list-group-item">${data[key].university}</li>
                            </ul>
                        </div>
                    </div>
                `;
        }
    })
} 

addDataHtml();


selectItems = () => {
    getData().then(data => {
        selectElem.innerHTML = `<option value="allData" selected>All Data</option>`
        for (let i = 5; i < data.length; i+=5) {
           selectElem.innerHTML += `<option value="${i}">${i}</option>`
        }
    })
}
selectItems();

selectElem.addEventListener('change', (event) => {
    addDataHtml(event.target.value);
});

