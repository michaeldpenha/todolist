let searchComponent = (() => {
    return{
        createSearchEl : (id , placeholder) => {
            const el = myApp.createElement("input");
            myApp.addAttributeToEl(el,[{
                key : "type",
                val : "text"
            },{
                key : "id",
                val : id
            },{
                key : "placeholder",
                val : placeholder ? placeholder : "Search"
            }]);

            //searchComponent.addEvents(el);
            return el;
        },
        addEvents : (el) => {
            el.addEventListener('keyup',(e) => {
                this.dispatchEvent(new CustomEvent('inputKeyUp', { bubbles: true, detail: e }));
            })
        }
    }
})();

