/*--------- Buscamos todos html que vamos a utilizar en js ---------*/

const contenedorProductos= document.querySelector(".main");
const categoriaProductos= document.querySelectorAll(".boton-categoria");
const tema= document.querySelector(".tema");
let agregarProducto= document.querySelectorAll(".boton-agregar");
const numero= document.querySelector(".number");
const titulos= document.querySelector("#titulo-principal");

/*-------- Cargamos todas las tarjetas de los productos dentro de una funcion -----------*/

function cargarProductos(productosElejisdos){

    contenedorProductos.innerHTML= "";

    productosElejisdos.forEach(producto => {
        const div= document.createElement("div");
        div.classList.add("cosas");
        div.innerHTML = `<div id="tarjet">
                            <img src="${producto.imagen}" alt="${producto.categoria}" class="img">
                                <h3 class="text-nombre">${producto.categoria}</h3>
                                    <p class="precio">$${producto.precio}</p>
                                        <button class="boton-agregar" id="${producto.id}">AGREGAR</button>
                        </div> `;

        contenedorProductos.append(div);
    })
    carrrito();

}

cargarProductos(productos);

/*-------- Creamos un evento para cada boton de las categorias ---------*/

function categoriasDeProductos(){
    categoriaProductos.forEach(boton => {

        boton.addEventListener("click", (e) => {

        if(e.currentTarget.id != "todos"){
            const productoscategoria = productos.find(producto => producto.id === e.currentTarget.id);
            titulos.innerText= productoscategoria.nombre;

            const productosSeleccionados= productos.filter(producto => producto.id === e.currentTarget.id);
            cargarProductos(productosSeleccionados); 
        }else{
            titulos.innerHTML="--TODOS LOS PRODUCTOS--";
            cargarProductos(productos);
        }

        })
    })
}

categoriasDeProductos();

/*------- Creamos un tema claro y otro oscuro para nuestra pagina-----*/

function cambiarTema(){

    tema.addEventListener("click" ,() =>{
        let temaNav= document.querySelector(".nav");
        let temaMain= document.querySelector(".main");
        let temaFooter= document.querySelector(".footer");
        let temaCategorias= document.querySelector(".categorias");
        let temaHeader= document.querySelector(".header");
        temaHeader.classList.toggle("tema-header");
        temaNav.classList.toggle("tema-nav");
        temaCategorias.classList.toggle("tema-categorias");
        temaMain.classList.toggle("tema-main");
        temaFooter.classList.toggle("tema-footer");

       if(temaCategorias.classList.contains("tema-categorias")){
        tema.innerHTML="Claro";
       }else{
        tema.innerHTML="Oscuro";
       }
            
    })
}

cambiarTema();


/*-------- Usamos eventos para cargar nuestros productos en el carrito----*/

function carrrito(){
    agregarProducto= document.querySelectorAll(".boton-agregar")
    let num= document.querySelector(".number")

    agregarProducto.forEach(boton => {
        boton.addEventListener("click" , (e) =>{
            const idBoton= e.currentTarget.id;
            const productoAgregados=productos.find(producto => producto.id === idBoton);

            if(productosCarrito.some(producto => producto.id === idBoton)){
               const index = productosCarrito.findIndex(producto => producto.id === idBoton);
               productosCarrito[index].cantidad++;
            }else{
                productoAgregados.cantidad= 1;
                productosCarrito.push(productoAgregados);     
            }

            actualizarNumero();

            localStorage.setItem("productos-carrito", JSON.stringify(productosCarrito));
        })
        
    });
}

function actualizarNumero(){
        let number= productosCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
        numero.innerText = number;
}


/*---- En este array vacio se van a cargar nuestros productos----*/


let productosCarrito;

let productosEnCarritoLS= localStorage.getItem("productos-carrito");

if (productosEnCarritoLS) {
    productosCarrito = JSON.parse(productosEnCarritoLS)
    actualizarNumero();
}else{
    productosCarrito= [];
}