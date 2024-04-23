      const API_TAGS =
        "https://stunning-capybara-1efe1a.netlify.app/.netlify/functions/api/tags";
      // const API_TAGS = "http://localhost:3001/api/tag";

      let hash = {};

      const getTags = async () => {
        const response = await fetch(API_TAGS);
        const data = await response.json();
        console.log(data);
        data.data.forEach((tag) => {
          hash[tag.note] = {
            name: tag.note,
            parent: tag.parent || null,
            children: tag.children || null,
          };
        });
        initializeAwesomplete();
      };

      getTags();

      let tags = getTags();

      var agregaHijos = function () {
        for (var key in hash) {
          var nodo = hash[key];
          if (nodo.parent !== null) {
            if (hash[nodo.parent].children === null)
              hash[nodo.parent].children = [];
            hash[nodo.parent].children.push(nodo.name);
          }
        }
      };

      const initializeAwesomplete = () => {
        new Awesomplete(document.getElementById("labeltext"), {
          list: Object.keys(hash),
          filter: Awesomplete.FILTER_STARTSWITH,
        });
      };
