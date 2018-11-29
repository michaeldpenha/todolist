let mixins = (() => {
  return {
    createMainContainer: mainId => {
      const el = myApp.createElement("div");

      myApp.addAttributeToEl(el, [
        {
          key: "id",
          val: mainId
        },
        {
          key: "class",
          val: "container"
        }
      ]);

      myApp.appendChildToParent(document.getElementById("root"), el);
    },
    createListDiv: (obj, data) => {
      const containerEl = myApp.createElement("div");
      const list = listComponent.createListComponent("listId");

      myApp.addAttributeToEl(containerEl, [
        {
          key: "class",
          val: "row-container-flex"
        },
        {
          key: "id",
          val: "list-div"
        }
      ]);
      mixins.appendNestedEl(list, data, obj);
      containerEl.appendChild(list);
      list.addEventListener("click", e => {
        obj.listClick(e);
      });
      return containerEl;
    },
    listenToEvents: obj => {
      const searchEl = document.getElementById("searchEl");
      const buttonEl = document.getElementById("buttonEl");

      searchEl.addEventListener("keyup", e => {
        obj.keyUp(e);
      });

      buttonEl.addEventListener("click", () => {
        obj.buttonClick();
      });
    },
    appendNestedEl: (el, data, obj, appendVal) => {
      while (el && el.hasChildNodes()) {
        el.removeChild(el.lastChild);
      }

      const tree = document.createDocumentFragment();
      let listArray = [];
      data.forEach(element => {
        listArray = obj.populateLIstArray(listArray, element, appendVal);
      });

      listArray.forEach(item => {
        const el = listComponent.createChildListElement();
        obj.populateNestedDiv(el, item);
        tree.appendChild(el);
      });

      el.appendChild(tree);
    },
    createSearchDiv: buttonText => {
      const containerEl = myApp.createElement("div");
      const search = searchComponent.createSearchEl("searchEl");
      const button = buttonComponent.createButtonEl("buttonEl", buttonText);

      myApp.addAttributeToEl(containerEl, [
        {
          key: "class",
          val: "row-container-flex"
        },
        {
          key: "id",
          val: "search-bar"
        }
      ]);

      containerEl.appendChild(search);
      containerEl.appendChild(button);

      return containerEl;
    }
  };
})();
