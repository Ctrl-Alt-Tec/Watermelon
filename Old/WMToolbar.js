class WMToolbar {
    constructor(options){
        let scope = this;

        this.dom = document.createElement('div');
        this.dom.classList.add("WMToolbar");

        this.dom.style.background = options.background;

        let logo = document.createElement('img');
        logo.src = options.logo.src;
        logo.classList.add("WMToolbar_logo");

        logo.addEventListener('click', options.logo.onclick)

        this.dom.append(logo);

        let searchboxCont = document.createElement('div');
        searchboxCont.classList.add("WMToolbar_searchboxCont");

        let searchboxInput = document.createElement('input', );
        searchboxInput.classList.add("WMToolbar_searchboxInput");
        searchboxInput.placeholder = "Buscar..."; 
        searchboxInput.addEventListener("input", function (){
            options.AltBlog.search(searchboxInput.value);
        })
        searchboxCont.append(searchboxInput);
        
        this.searchboxOptions = document.createElement('div');
        this.searchboxOptions.classList.add("WMToolbar_searchboxOptions");
        this.searchboxOptions.innerHTML = "lorem ipsum"
        searchboxCont.append(this.searchboxOptions);
        this.dom.append(searchboxCont);

        
        let sections = document.createElement('div');
        sections.classList.add("WMToolbar_sections");
        
        options.sections.forEach(element => {
           let section = document.createElement('div');
           section.innerText = element;

            section.addEventListener('click', function(){
                options.sectionsOnClick(element);
            })
           sections.append(section)
        });
        
        this.dom.append(sections)

        searchboxInput.addEventListener('input', function(e){
            scope.toggleSearchboxOptions(true && e.target.value!="");
        })

        document.addEventListener('click', function(e){
            scope.toggleSearchboxOptions((e.target == scope.searchboxOptions || e.target == searchboxInput ) && e.target.value!="")
        })   
        this.toggleSearchboxOptions(false)
    }

    toggleSearchboxOptions(show){
        this.searchboxOptions.style.display = show ? "flex" : "none";
    }

    

}