let buttonComponent = (() => {
    return{
        createButtonEl : (id,text) => {
            const el = myApp.createElement("button");
            myApp.addAttributeToEl(el,[{
                key : "id",
                val : id
            }]);
            el.appendChild(document.createTextNode(text));
            //buttonComponent.addEvents(el);
            return el;
        },

        addEvents : (el) => {
            el.addEventListener('click',(e) => {
                this.dispatchEvent(new CustomEvent('buttonClick', { bubbles: true, detail: e }));
            })
        }
    }
})();

