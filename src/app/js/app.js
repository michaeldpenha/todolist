var myApp = (() => {
  return {
    init: () => {
      window.addEventListener("load", myApp.renderFiles());
    },
    renderFiles: () => {
      myApp.renderCssFiles("styles.css");
      myApp.loadMixins();
      myApp.renderServicesFiles();
      myApp.renderComponentFiles();
      myApp.renderJsFiles("router.js");
    },
    loadMixins : () =>{
        ["mixins"].forEach(cmp => {
            myApp.renderJsFiles(`mixins/${cmp}.js`);
        })
    },
    renderComponentFiles: () => {
      ["search", "button", "list", "modal"].forEach(cmp => {
        myApp.renderJsFiles(`components/${cmp}/${cmp}.js`);
      });
    },
    renderServicesFiles: () => {
      ["data.service"].forEach(cmp => {
        myApp.renderJsFiles(`services/${cmp}.js`);
      });
    },
    renderCssFiles: fileName => {
      const renderEl = myApp.createElement("link");
      myApp.addAttributeToEl(renderEl, [
        {
          key: "type",
          val: "text/css"
        },
        {
          key: "rel",
          val: "stylesheet"
        },
        {
          key: "href",
          val: `app/assets/css/${fileName}`
        },
        {
          key: "media",
          val: "all"
        }
      ]);
      myApp.appendChildToParent(
        document.getElementsByTagName("head")[0],
        renderEl
      );
    },
    renderJsFiles: file => {
      const renderEl = myApp.createElement("script");
      myApp.addAttributeToEl(renderEl, [
        {
          key: "src",
          val: `app/js/${file}`
        },
        {
          key: "async",
          val: "false"
        }
      ]);
      myApp.appendChildToParent(
        document.getElementsByTagName("body")[0],
        renderEl
      );
    },
    createElement: htmlTag => {
      const el = document.createElement(htmlTag);
      return el;
    },
    addAttributeToEl: (el, attrObj) => {
      attrObj.forEach(attr => {
        el.setAttribute(attr.key, attr.val);
      });
    },
    appendChildToParent: (parent, child) => {
      parent.appendChild(child);
    },
    renderComponent: htmlPage => {
      document.getElementById("root").innerHTML = `app/js/${htmlPage}`;
    },
    removeChildElement: id => {
      const el = document.getElementById(id);
      el ? el.childNodes.forEach((element, i) => {
        el.removeChild(el.childNodes[i]);
      }) : '';
    },
    renderChildComponent: component => {
      myApp.renderJsFiles(`components/${component}/${component}.js`);
    }
  };
})();

myApp.init();
