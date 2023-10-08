function Search(){
    const inp=document.getElementById("search").value.toLocaleLowerCase();
    alert(inp);
    if(inp!=""){
        var items = document.getElementsByClassName('pro');
        var cnt=items.length;
        // alert(items[1].getElementsByClassName("des")[0].getElementsByTagName("h5")[0].innerText.toLocaleLowerCase().includes(inp));
        for (var i = 0; i < items.length; i++) {
            if (!((items[i].getElementsByClassName("des")[0].getElementsByTagName("span")[0].innerText.toLocaleLowerCase()).includes(inp) || items[i].getElementsByClassName("des")[0].getElementsByTagName("h5")[0].innerText.toLocaleLowerCase().includes(inp))) { 
                items[i].style.display="none";
                cnt=cnt-1;
            }else{
                items[i].style.display="block";
            }
        }
        document.getElementById("sorry").style.display="none";
        document.getElementById("pagination").style.display="block";
        if(cnt==0){
             //no items found return a sorry div
            document.getElementById("sorry").style.display="block";
            document.getElementById("pagination").style.display="none";
        }
    }else{
        location.reload();
    }
}