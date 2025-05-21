const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove' , e => {
    cursor.setAttribute("style" , "top: " + (e.pageY + 55)+"px; left: "+(e.pageX + 55)+"px;")
})