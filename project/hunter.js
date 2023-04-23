const showMoreBtn = document.getElementById('show-more-btn');
let apiJson = '';
function foundPhone(e) {
    spinier(true)
    const urlKey = e.target.previousElementSibling;
    fetch(`https://openapi.programming-hero.com/api/phones?search=${urlKey.value}`)
        .then(res => res.json())
        .then(data => lodeCard(data.data))
    urlKey.value = '';
}

function foundPhoneByEnter(e, value) {
    if (e.key === 'Enter') {
        spinier(true);
        fetch(`https://openapi.programming-hero.com/api/phones?search=${value}`)
            .then(res => res.json())
            .then(data => lodeCard(data.data))
        e.target.value = '';
    }
}
function firstView(urlKey) {
    spinier(true)
    fetch(`https://openapi.programming-hero.com/api/phones?search=${urlKey}`)
        .then(res => res.json())
        .then(data => lodeCard(data.data))
}

// display card 
const displayCard = (cardArr) => {
    const cardContener = document.getElementById('card-contener');
    cardContener.innerHTML = '';
    cardArr.forEach(produce => {
        const card = document.createElement('div');
        card.innerHTML = `<div class="card card-side bg-base-100 shadow-xl h-full">
        <figure><img class="ml-5" src="${produce.image}" alt="Movie"/></figure>
        <div class="card-body">
          <h2 class="card-title">${produce.phone_name}</h2>
          <p>Click the button to view specification.</p>
          <div class="card-actions justify-end">
            <label onclick="viewSpecification('${produce.slug}')" for="my-modal-3" class="btn btn-primary"  >Specification</label>
          </div>
        </div>
      </div>`
        cardContener.appendChild(card)
    });
}
const lodeCard = apiData => {
    apiJson = apiData
    if (apiData.length > 9) {
        const ninePhone = apiData.slice(0, 12);
        displayCard(ninePhone);
        showMoreBtn.classList.remove('hidden');
    } else {
        displayCard(apiData)
        showMoreBtn.classList.add('hidden');
    }
    spinier(false)
}

showMoreBtn.addEventListener('click', () => {
    displayCard(apiJson);
    showMoreBtn.classList.add('hidden');
})

//------------------ modal ---------------------
function viewSpecification(id) {
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
        .then(res => res.json())
        .then(data => viewModal(data.data))
}

function viewModal(data) {
    console.log(data);
    const modalBox = document.getElementById('modal-box');
    modalBox.innerHTML = `
    <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
    <div class="badge badge-primary badge-outline">${data.brand}</div>
    <img class="mx-auto mb-3"  src="${data.image}"/>
    <h2 class="font-semibold text-2xl">${data.name}</h2>
    <p class="mb-3">${data.releaseDate ? data.releaseDate : 'Release date not available'}</p>
     <p>storage : ${data.mainFeatures.storage}</p>
     <p>chipSet : ${data.mainFeatures.chipSet}</p>
     <p>sensors : ${data.mainFeatures.sensors.join(' , ')}</p>
      `;


}

// spinier
function spinier(view) {
    const spinier = document.getElementById('loading');
    if (view) {
        spinier.classList.remove('hidden');
    } else { spinier.classList.add('hidden'); }
}