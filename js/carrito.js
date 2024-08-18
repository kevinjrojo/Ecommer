let productosEnCarrito= localStorage.getItem("productos-carrito");
productosEnCarrito= JSON.parse(productosEnCarrito);

const tarjetasCarrito= document.querySelector("#tarjetaCompra");
const carritoVacio= document.querySelector("#carrito-vacio");
const precioTotal= document.querySelector(".total");
let botonEliminar = document.querySelector(".quitar");
const comprarTotal = document.querySelector(".compra-total");
const botonComprar = document.querySelector(".btn-comprar");



function productoCargados(){

    tarjetasCarrito.innerHTML="";

    if(productosEnCarrito && productosEnCarrito.length > 0){

        carritoVacio.classList.add("vacio");
    
        productosEnCarrito.forEach(producto => {
            const div= document.createElement("div");
            div.innerHTML= `            
                <aside class="tarjet-carrito">
                    <div>
                        <img src=".${producto.imagen}" alt="${producto.categoria}" class="img-carrito">
                    </div>
                    <div>
                        <p>CATEGORIA</p>
                            <p>${producto.categoria}</p>
                    </div>
                    <div>
                        <p>CANTIDAD</p>
                            <p>${producto.cantidad}</p>
                    </div>
                    <div>
                        <p>PRECIO</p>
                            <p>$${producto.precio}</p>
                    </div>
                    <div>
                        <button class="quitar" id="${producto.id}">X</button>
                    </div>
                </aside>`;
    
            tarjetasCarrito.append(div);
    
        })
    
    }else{
        precioTotal.classList.toggle("comprar");
        carritoVacio.classList.remove("vacio");
        tarjetasCarrito.classList.toggle("tarjeta-carrito");
        botonComprar.classList.toggle("comprar");

    }

    actualizarBotones();
    actualizarTotal();
}

productoCargados();

function actualizarBotones(){
    botonEliminar = document.querySelectorAll(".quitar");

    botonEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;
    const index= productosEnCarrito.findIndex(producto => producto.id === idBoton);

    productosEnCarrito.splice(index, 1);

    productoCargados();

    localStorage.setItem("productos-carrito", JSON.stringify(productosEnCarrito));
    
}


function actualizarTotal(){
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    precioTotal.innerText= `TOTAL =$${totalCalculado}`;
}

botonComprar.addEventListener("click", () =>{

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-carrito", JSON.stringify(productosEnCarrito));

    comprarTotal.classList.add("comprar");
    carritoVacio.classList.add("vacio");
    tarjetasCarrito.classList.add("tarjeta-carrito");
});

