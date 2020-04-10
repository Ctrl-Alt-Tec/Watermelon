class AltBlog{
    static isLogged = false;
    static container = document.createElement('div');



    async getPosts(){
        let scope = this;
        db.collection("posts").get().then(function(posts){
            scope.posts = posts;
            scope.showByType("Inicio"); 
        })
    }

    showByType(type){
        let scope = this;
        AltBlog.container.innerHTML = ""
        if(type == "Inicio"){
            scope.posts.forEach(function(item){
                AltBlog.container.append(new Post(item.id, item.data()).dom)
            }) 
        }else{
            scope.posts.docs.filter(function(item){ return item.data().section==type }).forEach(function(item){
                AltBlog.container.append(new Post(item.id, item.data()).dom)   
            })
        } 
        if(AltBlog.isLogged){AltBlog.container.append( this.newPostBtn );}
    }

    search(str) {
        let scope = this; 
        AltBlog.container.innerHTML = ""
        let results = scope.posts.docs.filter(function(item){ return item.data().title.toLowerCase().includes(str.toLowerCase()) || item.data().subtitle.toLowerCase().includes(str.toLowerCase()) || item.data().author.toLowerCase().includes(str.toLowerCase())  })
        AltBlog.container.style.padding = "0px";

        results.forEach(function(item){
            AltBlog.container.append(new Post(item.id, item.data(), {
                onClick: function(id){ console.log(id); window.location.href = 'editor.html?post='+id }
            }).dom)   
        })

        if(results.length == 0){
            AltBlog.container.append("¿Ves? Está vacío, no hay ningún post para: " + str);
            AltBlog.container.style.color = "white"; 
            AltBlog.container.style.padding = "10%"; 
        }
        if(AltBlog.isLogged){AltBlog.container.append( this.newPostBtn );}

    }

    login(){
        AltBlog.container.innerHTML = "";
        //AltBlog.container.style.padding = "10%"; 

        let title = document.createElement('h1');
        title.innerText = "Inicia sesión";
        title.style.color = "white"; 
        title.style.textAlign = "center"; 
        title.style.width = "100%"; 

        let username = document.createElement('input');
        username.name = "username";
        username.placeholder = "Usuario"; 
        let password = document.createElement('input');
        password.type = "password"; 
        password.placeholder = "Contraseña";
        password.name = "password";

        let buttonlog = document.createElement('input');
        buttonlog.type = "submit"; 
        buttonlog.value = "Ingresar"; 

        buttonlog.addEventListener('click', function(){
            firebase.auth().signInWithEmailAndPassword(username.value, password.value).catch(function(error){
                alert("Ocurrió un error")
            })
        })
        
        AltBlog.container.append(title, username, password, buttonlog)

    }

    constructor() {
        let scope = this;
        AltBlog.container.classList.add("container_posts");
        
        this.newPostBtn = document.createElement('div');
        this.newPostBtn.classList.add('addPost');
        this.newPostBtn.innerText = '+';
        this.newPostBtn.addEventListener('click', function(){
            window.location.href = 'editor.html'
        })
        document.body.prepend( new WMToolbar({
            sections: [
                'Inicio', 'Blog', 'Retos', 'Talleres', 'Recursos'
            ],
            sectionsOnClick: function(section){
                scope.showByType(section)
            },
            logo: {
                src: "https://ctrl-alt-tec.hackclub.com/watermelon/logo.png",
            }, 
            background: "black",
            AltBlog: scope
        }).dom )
        
        document.body.append(AltBlog.container)
        this.getPosts();
        firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            AltBlog.isLogged = true;
        } else {
            AltBlog.isLogged = false;
        }
        });
    }
}


class Post {
    constructor(id, data, options){
        this.dom = document.createElement('div');
        this.dom.classList.add("post");

        let img = document.createElement('div');
        img.style.background = "url('"+data.image+"')";
        img.classList.add('post_image');

        let title = document.createElement('h1');
        title.classList.add("post_title");
        title.innerText = data.title;
        
        let author = document.createElement('div');
        author.classList.add("post_author");
        author.innerText = data.author;
        
        let date = document.createElement('div');
        date.classList.add("post_date");
        //date.innerText = data.date.toLocaleDateString();
        
        let subtitle = document.createElement('h3'); 
        subtitle.classList.add("post_subtitle"); 
        subtitle.innerText = data.subtitle; 

        this.dom.append(img, title, subtitle, author, date);

        this.dom.addEventListener('click', function(){
            AltBlog.container.innerHTML = "";
            AltBlog.container.append( new Editor(id).dom )
        })

    }
}

class Editor{
    async loadData(){
        let scope = this;
        
        let data = await db.collection("posts").doc(scope.postId).get();

        scope.postTitle.innerText = data.data()['title'];
        scope.postSubtitle.innerText = data.data()['subtitle'];
        scope.postHeader.style.backgroundImage="url('"+ data.data().image +"')";
        scope._editor = new EditorJS({
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
                //raw: RawTool,
                code: CodeTool, 
                table: Table,
                embed: {
                    class: Embed, 
                    inlineToolbar: true,
                },
            },
            placeholder: "Empiece a escribir o presione tab para añadir contenido", 
            holder: scope.postEditor,
            data: data.data(),
            onReady: function(){
                if(AltBlog.isLogged){
                    scope.readOnly()
                }    
            }
        });
    }  

    loadEmpty(){
        let scope = this;
        scope._editor = new EditorJS({
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
                //raw: RawTool,
                code: CodeTool, 
                table: Table,
                embed: {
                    class: Embed, 
                    inlineToolbar: true,
                },
            },
            placeholder: "Empiece a escribir o presione tab para añadir contenido", 
            holder: scope.postEditor,
            
        });
    } 

    update(){
        let scope = this;
        this._editor.save().then(function(data){
            console.log(data)
            if(postID){
                db.collection("posts").doc(scope.postId).update({
                    title: scope.postTitle.innerText, 
                    subtitle: scope.postSubtitle.innerText,
                    ...data
                })
                .then(function(){
                    console.log("Doument updated")
                })
                .catch(function(){
                    console.log("Document not updated")
                })
            } else {
                db.collection("posts").add({
                    title: scope.postTitle.innerText, 
                    subtitle: scope.postSubtitle.innerText,
                    ...data
                })
                .then(function(docRef){
                    //console.log("Doument updated")
                    window.location.href = 'editor.html?post='+docRef.id
                })
                .catch(function(){
                    console.log("Document not updated")
                })
            }
        })
    }

    readOnly(){
        let content = this.postEditor.innerHTML;
        console.log("a", content)
        this._editor.destroy();
        this.postEditor.innerHTML = content;
        this.postEditor.querySelectorAll('[contenteditable]').forEach(function(i){
            i.contentEditable = "false";
        })
        
    }

    constructor(postId){
        let scope = this;
        this.postId = postId;
        this.dom = document.createElement('div');
        this.dom.id = "AltEditor";   
        this.postHeader = document.createElement('div');
        this.postHeader.id="PostHeader";

        this.postTitle = document.createElement('h1');
        this.postTitle.id = "PostTitle";
        this.postTitle.innerText = "Título";
        this.postTitle.contentEditable = "true";
        this.postSubtitle = document.createElement('h2');
        this.postSubtitle.id = "PostSubtitle";
        this.postSubtitle.innerText = "Subtitulo";
        this.postSubtitle.contentEditable = "true";

        this.postBtn = document.createElement('button');
        this.postBtn.id = "PostUpdate";

        this.postHeader.append(this.postBtn, this.postTitle, this.postSubtitle);

        this.postEditor = document.createElement('div');
        this.postEditor.id="PostEditor";
        
        this.dom.append(this.postHeader, this.postEditor);
        if(postId){
            this.loadData();
            this.postBtn.innerText = "Update";

        }else{
            this.loadEmpty();
            this.postBtn.innerText = "Publish";
        }              
        scope.postBtn.addEventListener('click', function(){
            scope.update(postID)
        }); 


        if(!AltBlog.isLogged){
            //no editar
        }

    }
}