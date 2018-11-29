let dataService = {
  jsonData: [],
  set data(val) {
    this.jsonData = val;
  },
  get data() {
    return this.jsonData;
  },
  fetchData: () => {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "app/assets/json/data.json", false);
    xhttp.send();
    if (xhttp.status >= 200 && xhttp.status < 300) {
        dataService.data = JSON.parse(xhttp.response);
    }
    
  }
};
