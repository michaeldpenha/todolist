let listComponent = (() => {
    return {
        createListComponent : (id) => {
            const el = myApp.createElement("div");
            myApp.addAttributeToEl(el,[{
                key : "id",
                val : id
            }]);
            //listComponent.addEvents(el);
            return el;
        },
        createChildListElement : () => {
            const el = myApp.createElement("div");
            return el;
        }
    }
})();