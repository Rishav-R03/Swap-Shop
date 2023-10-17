function saveToCart(image, product, price){
    alert("save to cart"+image+product+price);
    let products=JSON.parse(window.localStorage.getItem('product')) || [];
    alert(products);
    var found=false;
    const obj={
        img: image,
        prod: product,
        pri: price,
        quantity: 1
    }
    products.forEach(element => {
        alert(element);
        if(element.prod===product && element.img===image && element.pri===price){
            element.quantity=element.quantity+1;
            found=true;
        }
    });
    if(found==false){
        products.push(obj);
    }
    // alert(products);
    window.localStorage.setItem("product", JSON.stringify(products));
}

function addToCart(){
    let products=JSON.parse(window.localStorage.getItem('product')) || [];
    if(products.length>0){
        const list=document.createElement('tbody');
        products.forEach(element=> {
            // alert(element.prod);
            // Create the elements individually
            const newTR = document.createElement("tr");
            const newTD1 = document.createElement("td");
            const newI = document.createElement("i");
            newI.className = "far fa-times-circle";
            newI.onclick = removeFromCart;
            newI.id = JSON.stringify(element)
            newTD1.appendChild(newI);
            const newTD2 = document.createElement("td");
            const newImg = document.createElement("img");
            newImg.src = element.img;
            newImg.alt = element.prod;
            newTD2.appendChild(newImg);
            const newTD3 = document.createElement("td");
            newTD3.textContent = element.prod;
            const newTD4 = document.createElement("td");
            newTD4.textContent = element.pri;
            const newTD5 = document.createElement("td");
            const inc = document.createElement("button");
            newTD5.textContent = element.quantity;
            inc.textContent = " Inc ";
            inc.type="submit";
            inc.onclick = function() {
                CalculateTotal(newTD5, element.pri, 1);
            };
            const desc = document.createElement("button");
            desc.textContent = " Desc ";
            desc.type="submit";
            desc.onclick = function() {
                CalculateTotal(newTD5, element.pri, -1);
            };
            newTD5.appendChild(desc);
            newTD5.appendChild(document.createTextNode(element.quantity)); // Add quantity text node
            newTD5.appendChild(inc);
            const newTD6 = document.createElement("td");
            newTD6.textContent = CalculateTotal(newTD5, element.pri, 0);
            // alert(CalculateTotal(document.getElementById(element.prod), element[2]));
            // Append the TD elements to the TR element
            newTR.appendChild(newTD1);
            newTR.appendChild(newTD2);
            newTR.appendChild(newTD3);
            newTR.appendChild(newTD4);
            newTR.appendChild(newTD5);
            newTR.appendChild(newTD6);
            list.appendChild(newTR);
        });
        document.getElementById("cart-item").innerHTML=list.innerHTML;
    }
    document.getElementById("cart-item").addEventListener('click', function(event){
        // Check if the clicked element is an <i> element with id
        if(event.target.tagName==='I'){
            removeFromCart(event.target.id);
            addToCart();
        }
    });
}

function removeFromCart(iid){
    removeItem=JSON.parse(iid);
    alert(iid);
    let products=JSON.parse(window.localStorage.getItem('product'));
    if(products!=null){
        newProducts=products.filter(item => (JSON.stringify(item)!=iid));
        alert(newProducts.length);
        if(newProducts.length>0){
            window.localStorage.setItem("product", JSON.stringify(newProducts));
        }else{
            window.localStorage.clear();
            window.reload();
        }
    }
}

function CalculateTotal(quantity, price, val){
    // alert(price.split(" ")[1])
    quantity.textContent=parseInt(quantity.textContent)+val;
    return (quantity.textContent) * price.split(" ")[1];
}


window.onload = function() {
    // Your function code here
    addToCart();
    getTotal();
};

function getTotal(){
    let total = 0;
    let shipping = 0;
    let products = JSON.parse(window.localStorage.getItem('product'));
    
    if (products && products.length > 0) {
        products.forEach(element => {
            let quan = parseInt(element.quantity);
            let price = parseInt(element.pri.split(" ")[1]);
            total += price * quan;
        });
    }
    let inp=document.getElementById("coupon").value;
    if(inp.length==0){
        shipping=20;
    }
    document.getElementById("subtotal").innerHTML = "" +(total);
    document.getElementById("shipping").innerHTML = "Free";
    if(shipping!=0){
        document.getElementById("shipping").innerHTML = ""+shipping;
    }
    document.getElementById("total").innerHTML = "" +  (total + shipping);
    
}