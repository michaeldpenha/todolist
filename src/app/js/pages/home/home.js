let home = (() => {
  return {
    init: () => {
      myApp.removeChildElement("root");
      dataService.data.length === 0 || dataService.data.list.length === 0
        ? dataService.fetchData()
        : "";
      mixins.createMainContainer("home");
      home.paintPage();
    },
    paintPage: () => {
      const tree = document.createDocumentFragment();
      const searchEL = mixins.createSearchDiv("Create Lists");
      const data = dataService.data;
      const listEL = mixins.createListDiv(home,data.list);
      const el = document.getElementById("home");

      tree.appendChild(searchEL);
      tree.appendChild(listEL);
      myApp.appendChildToParent(el, tree);
      mixins.listenToEvents(home);
    },
    populateNestedDiv : (el,title) => {
        el.appendChild(document.createTextNode(title));
    },
    keyUp: e => {
      console.log(e);
    },
    buttonClick: () => {
      const el = myApp.createElement("div");
      const modalHeader = myApp.createElement("div");
      const modalContent = myApp.createElement("div");
      const titleHeader = myApp.createElement("h2");
      const titleNodeText = document.createTextNode("Create List");
      const inputEl = searchComponent.createSearchEl(
        "createListInput",
        "Title"
      );
      const buttonEl = buttonComponent.createButtonEl("createListId", "Create");

      buttonEl.addEventListener("click", () => {
        inputEl.value.trim() != "" ? home.createNewList(inputEl.value) : "";
      });
      myApp.addAttributeToEl(modalContent, [
        {
          key: "class",
          val: "modal-content"
        }
      ]);

      myApp.addAttributeToEl(modalHeader, [
        {
          key: "class",
          val: "modal-header"
        }
      ]);

      titleHeader.appendChild(titleNodeText);
      modalHeader.appendChild(titleHeader);
      modalContent.appendChild(inputEl);
      modalContent.appendChild(buttonEl);
      el.appendChild(modalHeader);
      el.appendChild(modalContent);
      modal.createModalComponent("createList", el);
    },
    createNewList: val => {
      let title = val;
      let dataValue = dataService.data;
      dataValue.list.push({
        title: title,
        tasks: []
      });
      dataService.data = dataValue;
      modal.closeModal(document.getElementById("createList"));
      history.pushState(null, null, `tasks?${title}`);
      router.loadFiles("pages/tasks/tasks.js");
    },
    listClick: e => {
      history.pushState(null, null, `tasks?${e.target.innerText}`);
      router.loadFiles("pages/tasks/tasks.js");
    },
    populateLIstArray : (array , element) =>{
        array.push(element.title);
        return array;
    }
  };
})();

home.init();
