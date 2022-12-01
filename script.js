$(function() {
    // @Dev
    // i hate working with a messy code!
    // i hate JQuery!
    function getCurrentPrice(current_balance) {
        const xhr = new XMLHttpRequest();
        const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin-2&vs_currencies=usd';
        xhr.open('GET', url)
        xhr.onload = function(){
            try {
                if (this.status == 200) {
                    data =  JSON.parse(this.responseText);
                    const current_total = data["bitcoin-2"].usd + current_balance
                    $('#price').html(`$${current_total.toFixed(4)}`)
                    return
                }
            } catch(error) {
                $('#price').html('Could not get price BTC2', error)
            }
        }
        xhr.send();
    }
    getCurrentPrice(12.55)

    // Transactions column
    function getAllTransaction(){
        const xhr = new XMLHttpRequest();
        const url = './dummy_transaction.json';
        xhr.open('GET', url)
        xhr.onload = function(){
            try {
                if (this.status == 200) {
                    transactions =  JSON.parse(this.responseText);
                    let html = '';
                    for(let i = 0; i < transactions.length; i++) {
                       html +=  `
                        <div class="bt-0 bg-none list-group-item list-group-item-action flex-column align-items-start">
                            <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1 display-7">${transactions[i].subject}</h5>
                            <small class="text-muted">${transactions[i].date}</small>
                            </div>
                            <p class="font-weight-normal mb-1 text-truncate">${transactions[i].address}</p>
                            <div class="d-flex w-100 justify-content-between ${(transactions[i].subject == 'Sending') ? 'btc2_color': 'text-success'}">
                                <small>${transactions[i].amount} BTC2</small>
                                <small>$15.00</small>
                            </div>
                        </div>
                        `
                    };
                    $('#transactions').html(html)
                    return
                }
            } catch(error) {
                $('#transactions').html('Could not get Transactions', error)
            }
        }
        xhr.send();
    }
    getAllTransaction();
})

// Download file
function download(content, fileName, contentType) {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

// Generate new address
function createNewAddress() {
    Swal.fire({
        title: 'Wallet Created',
        icon: 'success',
        html: `
        <div class="alert alert-warning" role="alert">
            Please copy paste and write down both private keys below. Preferably in different places to increase security. or Download as a file.
        They will only be displayed this one time and no one can help you recover them.
        </div>
        <div class="list-group">
            <div class="list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">Login password:</h5>
                </div>
                <p class="mb-1 text-left">$CYcXbnXWbL3UrMa.orN0HO1TATyDyn/zB2UtegoeXiAv21AvOWSDW</p>
                
            </div>
            <div class="list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">Private key:</h5>
                </div>
                <p class="mb-1 text-left">L3uDe7ZTpW1vXajBFQ7kYXNfNhQqbBf6VhB5pdDHkJd6Ey4MMSen</p>
            </div>
            </div>
        `,
        allowOutsideClick: false,
        confirmButtonText: 'Download File'
    }).then((result) => {
        if(result.isConfirmed){
            // @Dev
            // this jsonData suppost tobe dynamic!
            const jsonData = {
                "Login_password": "$CYcXbnXWbL3UrMa.orN0HO1TATyDyn/zB2UtegoeXiAv21AvOWSDW",
                "Private_key": "L3uDe7ZTpW1vXajBFQ7kYXNfNhQqbBf6VhB5pdDHkJd6Ey4MMSen",
                "Wallet_Address": "14FXJkizjcTYAt4pJ7zB9AUcHdhrSwBhqQ",
                "2Fa": "UGCAY5AGQS3JW4RV"
            }
            
            download(JSON.stringify(jsonData), "BTC2_Wallet.json", "text/plain");

        }
    });
}
createNewAddress();