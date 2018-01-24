    
function showpage(idpage){
    //alert(idpage);

    if (idpage==0)
    {
        $("#home").show();
        $("#customer").hide();
        
        $("#car").hide();
        $("#payment").hide();
    }
    if (idpage==1)
    {
        $("#customer").show();
        $("#home").hide();
        $("#car").hide();
        $("#payment").hide();
    }
    if (idpage==2)
    {
        $("#car").show();
        $("#customer").hide();
        $("#home").hide();
        
        $("#payment").hide();
    }

    if (idpage==3)
    {
        $("#payment").show();
        $("#car").hide();
        $("#customer").hide();
        $("#home").hide();
        
        
    }
}