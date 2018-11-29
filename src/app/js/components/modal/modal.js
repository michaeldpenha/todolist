let modal = (() => {
  return {
    createModalComponent: (id, innerEl) => {
      let modalEl = myApp.createElement("div");
      myApp.addAttributeToEl(modalEl, [
        {
          key: "id",
          val: id
        },
        {
          key: "class",
          val: "modal"
        }
      ]);

      let modalContentEl = myApp.createElement("div");
      myApp.addAttributeToEl(modalContentEl, [
        {
          key: "class",
          val: "modal-body"
        }
      ]);

      modalContentEl.appendChild(innerEl);
      modalEl.appendChild(modalContentEl);

      myApp.appendChildToParent(
        document.getElementsByTagName("body")[0],
        modalEl
      );
      const modalElement = document.getElementById(id);
      window.onclick = event => {
        event.target == modalElement ? modal.closeModal(modalElement): "";
      };
    },
    closeModal: modal => {
      document.getElementsByTagName("body")[0].removeChild(modal);
    }
  };
})();
