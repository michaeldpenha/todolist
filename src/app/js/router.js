let router = (() => {
  return {
    init: () => {
      router.loadDynamicJsFile();
      window.onpopstate = function(event) {
        console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
      };
    },
    loadDynamicJsFile: () => {
      const path = router.fetchLocation();
      switch (path) {
        case path.indexOf("tasks") > -1:
          router.loadFiles("pages/tasks/tasks.js");
          break;
        case "":
        default:
          router.loadFiles("pages/home/home.js");
          break;
      }
    },
    fetchLocation: () => {
      return location.pathname;
    },
    loadFiles: filePath => {
      myApp.renderJsFiles(filePath);
    }
  };
})();

router.init();
