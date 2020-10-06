class Human
{
    Id;
    Name;
    Surname;
    Age;
    Mail;

    constructor(name,surname,age,mail)
    {
        this.Name = name;
        this.Surname = surname;
        this.Age = age;
        this.Mail = mail;
    }
}

class ViewController
{
    renderDataTable(datas)
    {
        var tbody = document.querySelector(".table-data-area");
        tbody.innerHTML = "";
        datas.forEach(item => {
            tbody.innerHTML += this.getTableRow(item);
        });
    }

    getDataToCreateHuman(){
        var nameInpValue = document.querySelector("#nameInp").value;
        var surnameInpValue = document.querySelector("#surnameInp").value;
        var ageInpValue = document.querySelector("#ageInp").value;
        var mailInpValue = document.querySelector("#mailInp").value;
        return new Human(nameInpValue,surnameInpValue,Number(ageInpValue),mailInpValue);
    }

    getDataToUpdateHuman(){
        var idInpValue = document.querySelector("#idUpdateInp").value;
        var nameInpValue = document.querySelector("#nameUpdateInp").value;
        var surnameInpValue = document.querySelector("#surnameUpdateInp").value;
        var ageInpValue = document.querySelector("#ageUpdateInp").value;
        var mailInpValue = document.querySelector("#mailUpdateInp").value;
        var tmp =  new Human(nameInpValue,surnameInpValue,Number(ageInpValue),mailInpValue);
        tmp.Id = Number(idInpValue);
        return tmp;
    }


    getTableRow(item)
    {
        return `<tr>
                    <th scope="row">${item.id}</th>
                    <td>${item.name}</td>
                    <td>${item.surname}</td>
                    <td>${item.age}</td>
                    <td>${item.mail}</td>
                </tr>`
    }

    getDeleteItemId(){
        var deleteInp = document.querySelector('#deleteItemInp');
        return deleteInp.value;
    }
}

class WebWorker
{
    static apiBaseUrl = 'https://localhost:44331/api/Humen';
    static viewService = new ViewController();
    //HttpGet
    static getDataFromApi(){
        var httpClient = new XMLHttpRequest();
        httpClient.open("GET",WebWorker.apiBaseUrl,true);
        httpClient.onloadend = function(){
            var jsontext = httpClient.responseText;
            var data = JSON.parse(jsontext);
            WebWorker.viewService.renderDataTable(data);
        }
        httpClient.send();
    }

    //HttpPost
    static createDataOnServer(){
        var httpClient = new XMLHttpRequest();
        httpClient.open("POST",WebWorker.apiBaseUrl,true);
        httpClient.setRequestHeader('content-type','application/json');
        httpClient.onloadend = function(){
            var jsontext = httpClient.responseText;
            console.log(JSON.parse(jsontext));
        }
        var humanCreate = WebWorker.viewService.getDataToCreateHuman();
        httpClient.send(JSON.stringify(humanCreate));
    }


    //HttpPut
    static updateDataOnServer()
    {
        var humanPut = WebWorker.viewService.getDataToUpdateHuman();
        var httpClient = new XMLHttpRequest();
        httpClient.open("PUT",`${WebWorker.apiBaseUrl}/${humanPut.Id}`,true);
        httpClient.setRequestHeader('content-type','application/json');
        httpClient.onloadend = function(){
            var responseText = httpClient.responseText;
            console.log(JSON.parse(responseText));
        }
        httpClient.send(JSON.stringify(humanPut));
    }

    //HttpDelete
    static deleteDataOnServer()
    {
        var itemId = WebWorker.viewService.getDeleteItemId();
        var api = `${WebWorker.apiBaseUrl}/${itemId}`;
        var httpClient = new XMLHttpRequest();
        httpClient.open("DELETE",api,true);
        httpClient.onloadend = function(){
            console.log(JSON.parse(httpClient.responseText));
        }
        httpClient.send();
    }
}
