let tasks = (() => {
  return {
    init: () => {
      myApp.removeChildElement("root");
      dataService.data.list.length === 0 ? dataService.fetchData() : "";
      mixins.createMainContainer("tasks");
      tasks.paintPage();
    },
    paintPage: () => {
      const tree = document.createDocumentFragment();
      const searchEL = mixins.createSearchDiv("Create Tasks");
      const data = dataService.data;
      const listEL = mixins.createListDiv(tasks, data.list);
      const el = document.getElementById("tasks");

      tree.appendChild(searchEL);
      tree.appendChild(listEL);
      myApp.appendChildToParent(el, tree);
      
      //listEL.addEventListener("ondragover", ()=>{console.log('n')});
    
      mixins.listenToEvents(tasks);
    },
    listClick: e => {},
    keyUp: e => {
      console.log(e);
    },
    buttonClick: () => {
      const el = myApp.createElement("div");
      const modalHeader = myApp.createElement("div");
      const modalContent = myApp.createElement("div");
      const titleHeader = myApp.createElement("h2");
      const titleNodeText = document.createTextNode("Create Tasks");
      const inputEl = searchComponent.createSearchEl(
        "createListInput",
        "Title"
      );
      const buttonEl = buttonComponent.createButtonEl("createListId", "Create");

      const expiryDate = searchComponent.createSearchEl(
        "expiryDate",
        "mm/dd/yyyy"
      );

      buttonEl.addEventListener("click", () => {
        inputEl.value.trim() != "" ? tasks.createNewTask(inputEl.value) : "";
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
      modalContent.appendChild(expiryDate);
      modalContent.appendChild(buttonEl);
      el.appendChild(modalHeader);
      el.appendChild(modalContent);
      modal.createModalComponent("createList", el);
    },
    createNewTask: val => {
      let data = dataService.data;

      mixins.appendNestedEl(
        document.getElementById("listId"),
        data.list,
        tasks,
        val
      );
      modal.closeModal(document.getElementById("createList"));
    },
    populateLIstArray: (modArray, element, modVal) => {
      const urlParam = document.location.search.split("?")[1];

      if (element.title === urlParam) {
        if (modVal) {
          element.tasks.push({
            title: modVal,
            status: "todo"
          });
        }
        modArray = element.tasks;
      }

      return modArray;
    },
    onDragStart: event => {
      console.log(event);
    },
    populateNestedDiv: (el, item) => {
      const divEl = myApp.createElement("div");
      myApp.addAttributeToEl(el, [
        {
          key: "draggable",
          val: "true"
        }
      ]);
      myApp.addAttributeToEl(divEl, [
        {
          key: "class",
          val: "flex-container"
        }
      ]);
      const spanEl = myApp.createElement("span");
      const labelEl = myApp.createElement("label");
      myApp.addAttributeToEl(labelEl, [
        {
          key: "class",
          val: "switch"
        }
      ]);
      labelEl.innerHTML = `<input type="checkbox" ${
        item.status == "checked" ? "checked" : ""
      } ><span class="slider"></span>`;
      spanEl.appendChild(document.createTextNode(item.title));
      divEl.appendChild(spanEl);
      divEl.appendChild(labelEl);

      labelEl.addEventListener("change", e => {
        item.status = e.target.value == "on" ? "checked" : "todo";
      });

      el.appendChild(divEl);
    },
    changeStatus: (e, item) => {
      console.log("in");
    }
  };
})();

tasks.init();
