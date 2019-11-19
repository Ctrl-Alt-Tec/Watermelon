
class AltEditor{
    constructor(data={}, isEditable){
        let scope = this;   
        this.dom = document.createElement("div");
        this.dom.id = "AltPost";

        let postHero = document.createElement('div');
        postHero.id = "PostHero";

        let closeBtn = document.createElement('div');
        closeBtn.id = "PostHero_close";
        closeBtn.addEventListener('click', function(){
            scope.close()
        });

        this.title = document.createElement("h1");
        this.title.innerText = data.title ? data.title : 'Doble click para editar título';
        this.title.contentEditable = true;

        this.subtitle = document.createElement("h2");
        this.subtitle.innerText = data.subtitle ? data.subtitle : 'Doble click para editar subtítulo';
        this.subtitle.contentEditable = true;

        let time = document.createElement('span');
        time.id = "PostHero_time";
        time.innerText = data.time ? new Date(data.time).toLocaleDateString() : new Date().toLocaleDateString()

        postHero.append(closeBtn, time, this.title, this.subtitle);
        this.dom.append(postHero);

        this.HTMLcontents = document.createElement("div");
        this.HTMLcontents.id = "AltEditor";

        this.editor = new EditorJS({
            tools: {
                header: Header,
                image: SimpleImage,
                list: {
                    class: List,
                    inlineToolbar: true,
                },
                paragraph: {
                    class: Paragraph, 
                    inlineToolbar: true
                }, 
                raw: RawTool,
                code: CodeTool, 
                table: Table
            },
            data: data ? data: {},
            placeholder: "Empiece a escribir o presione tab para añadir contenido", 
            holderId: 'AltEditor'
        });        

        let save = document.createElement('button');
        save.addEventListener('click', function(){
            scope.getData().then(data=>{ console.log(data) })
        })

        this.dom.append(save)
        this.dom.append(this.HTMLcontents)

        console.log(this.editor); 
        return this.dom;
    }

    async save(){
        let postObj = await this.editor.save();
        postObj.title = this.title.innerText;
        postObj.subtitle = this.subtitle.innerText;
        return postObj; 
    }

    close(){
        console.log(this.dom)
        this.dom.remove()
        this.editor.destroy()
    }
}

class AltPost extends AltEditor{
    constructor(data={}){
        super(data);
        let content = super.HTMLcontents.querySelector('')
    }
}


class PostCard {
    constructor(postData){
        this.dom = document.createElement("div");
        this.dom.classList.add('alBlog_PostCard');
    }
}

class AltBlog {
    openPost(data){
        return new AltEditor(data, false);
    }
}